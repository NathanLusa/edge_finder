from datetime import datetime
import os
import re

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


def save_veiculo(veiculo):
    response = requests.post(VEICULO_ENDPOINT, json=veiculo)
    veiculos.append(response.json())
    return response.json()


def save_veiculo_historico(veiculo_historico):
    response = requests.post(HISTORICO_ENDPOINT, json=veiculo_historico)
    print(response.json())


def get_veiculo(url):
    for veiculo in veiculos:
        if veiculo['url'] == url:
            return veiculo

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
                }
            )

        save_veiculo_historico(
            {
                'veiculo_id': veiculo['id'],
                'datahora': datetime.now().isoformat(),
                'valor': price,
                'quilometragem': km,
                'descricao': title,
            }
        )
        


if __name__ == '__main__':
    veiculos = load_veiculos()
    # print(veiculos)
    __uf = 'pr'
    find(
        f'https://{__uf}.olx.com.br/autos-e-pecas/carros-vans-e-utilitarios/ford/edge?pe=80000&re=33&rs=29'
    )
