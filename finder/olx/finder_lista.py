import re
from datetime import datetime

from bs4 import BeautifulSoup
from finder.models import Veiculo, VeiculoList
from finder.services import (
    get_historicos,
    get_imagens,
    get_veiculos,
    post_veiculo,
    post_veiculo_historico,
    post_veiculo_imagem,
)
from finder.utils import get_content

veiculos = VeiculoList()


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

        veiculo = veiculos.get_veiculo(url)
        if not veiculo:
            veiculo_json = post_veiculo(
                {
                    'marca': 'Ford',
                    'modelo': 'Edge',
                    'ano': year,
                    'url': url,
                    'titulo': title,
                }
            )
            veiculo = Veiculo()
            veiculo.load_from_json(veiculo_json, [], [])
            veiculos.append(veiculo)

        hist = {
            'veiculo_id': veiculo.id,
            'datahora': datetime.now().isoformat(),
            'valor': price,
            'quilometragem': int(km.replace('.', '').replace(',', ''))
            if km
            else 0,
            'descricao': title,
        }
        historico = veiculo.get_historico(hist)
        if not historico:
            historico_json = post_veiculo_historico(hist)
            veiculo.add_historico(historico_json)

        imagem = veiculo.get_imagem(img)
        if not imagem:
            imagem_json = post_veiculo_imagem(
                {
                    'veiculo_id': veiculo.id,
                    'url': img,
                },
            )
            veiculo.add_imagem(imagem_json)


if __name__ == '__main__':
    veiculo_list = get_veiculos()
    historicos = get_historicos()
    imagens = get_imagens()

    veiculos.load_from_json(veiculo_list, historicos, imagens)

    __uf = 'pr'
    find(
        f'https://www.olx.com.br/autos-e-pecas/carros-vans-e-utilitarios/ford/edge/estado-{__uf}?pe=80000&re=33&rs=29'
    )
