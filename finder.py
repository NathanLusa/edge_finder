import os
import re
from datetime import datetime

import requests
from bs4 import BeautifulSoup

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'
}
FILE_PATH = 'files/'
FILE_NAME = 'olx.html'

ENDPOINT = 'http://localhost:8000'
VEICULO_ENDPOINT = ENDPOINT + '/veiculo'
HISTORICO_ENDPOINT = ENDPOINT + '/veiculohistorico'
IMAGEM_ENDPOINT = ENDPOINT + '/veiculoimagem'

veiculos = []


def load_veiculos():
    response = requests.get(VEICULO_ENDPOINT)
    return response.json()


def load_historicos():
    response = requests.get(HISTORICO_ENDPOINT)
    return response.json()


def load_imagens():
    response = requests.get(IMAGEM_ENDPOINT)
    return response.json()


def load_veiculo_historicos(veiculos, historicos):
    for veiculo in veiculos:
        veiculo['historicos'] = []
        for historico in historicos:
            if historico['veiculo_id'] == veiculo['id']:
                veiculo['historicos'].append(historico)


def load_veiculo_imagens(veiculos, imagens):
    for veiculo in veiculos:
        veiculo['imagens'] = []
        for imagem in imagens:
            if imagem['veiculo_id'] == veiculo['id']:
                veiculo['imagens'].append(imagem)


def save_veiculo(veiculo):
    response = requests.post(VEICULO_ENDPOINT, json=veiculo)
    veiculos.append(response.json())
    veiculo = response.json()
    veiculo['historicos'] = []
    veiculo['imagens'] = []
    return veiculo


def save_veiculo_historico(veiculo, veiculo_historico):
    response = requests.post(HISTORICO_ENDPOINT, json=veiculo_historico)
    historico = response.json()
    veiculo['historicos'].append(historico)


def save_veiculo_imagem(veiculo, veiculo_imagem):
    response = requests.post(IMAGEM_ENDPOINT, json=veiculo_imagem)
    imagem = response.json()
    veiculo['imagens'].append(imagem)


def get_veiculo(url):
    for veiculo in veiculos:
        if veiculo['url'] == url:
            return veiculo

    return None


def get_veiculo_historico(veiculo, historico):
    for hist in veiculo['historicos']:
        if (hist['valor'] == historico['valor']) and (
            hist['quilometragem'] == historico['quilometragem']
        ):
            return hist

    return None


def get_veiculo_imagem(veiculo, url):
    for imagem in veiculo['imagens']:
        if imagem['url'] == url:
            return imagem

    return None


def get_content(url):
    if not os.path.exists(FILE_PATH):
        os.makedirs(FILE_PATH)

    if not os.path.exists(FILE_PATH + FILE_NAME):
        print('Download')
        response = requests.get(url, headers=HEADERS)
        content = response.content
        with open(FILE_PATH + FILE_NAME, 'wb') as f:
            f.write(response.content)
    else:
        with open(FILE_PATH + FILE_NAME, 'rb') as f:
            content = f.read()

    return content


def find(url):
    print(url)
    content = get_content(url)
    soup = BeautifulSoup(content, 'html5lib')
    main_list = soup.find(id='ad-list')
    item_list = main_list.find_all('li') if main_list else []

    for li in item_list:
        if not li.a:
            continue

        url = li.a['href']
        title = li.find('h2').text
        img = li.find('img')['src']

        span_price = li.find('span', class_='main-price')
        price = (
            round(float(span_price.text.split(' ')[1]) * 1000, 2)
            if span_price
            else 0
        )

        km_span = li.find('span', {'aria-label': re.compile(r'quil')})
        km = km_span.text.split(' ')[1] if km_span else ''

        year_span = li.find('span', {'aria-label': re.compile(r'Ano')})
        year = year_span.text if year_span else ''

        veiculo = get_veiculo(url)
        if not veiculo:
            veiculo = save_veiculo(
                {
                    'marca': 'Ford',
                    'modelo': 'Edge',
                    'ano': year,
                    'url': url,
                    'titulo': title,
                }
            )

        hist = {
            'veiculo_id': veiculo['id'],
            'datahora': datetime.now().isoformat(),
            'valor': price,
            'quilometragem': int(km.replace('.', '').replace(',', ''))
            if km
            else 0,
            'descricao': title,
        }
        historico = get_veiculo_historico(veiculo, hist)
        if not historico:
            # breakpoint()
            save_veiculo_historico(veiculo, hist)

        imagem = get_veiculo_imagem(veiculo, img)
        if not imagem:
            save_veiculo_imagem(
                veiculo,
                {
                    'veiculo_id': veiculo['id'],
                    'url': img,
                },
            )


if __name__ == '__main__':
    veiculos = load_veiculos()
    historicos = load_historicos()
    imagens = load_imagens()

    load_veiculo_historicos(veiculos, historicos)
    load_veiculo_imagens(veiculos, imagens)

    # print(veiculos)
    __uf = 'pr'
    find(
        f'https://www.olx.com.br/autos-e-pecas/carros-vans-e-utilitarios/ford/edge/estado-{__uf}?pe=80000&re=33&rs=29'
    )
