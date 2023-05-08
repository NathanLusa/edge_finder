import re

from bs4 import BeautifulSoup
from services.models import Veiculo, VeiculoList
from services.services import get_veiculos, post_veiculo
from utils import get_content


def _find(veiculos, url):
    print(url)
    content, _ = get_content(url)
    soup = BeautifulSoup(content, 'html5lib')
    main_list = soup.find(id='ad-list')
    item_list = main_list.find_all('li') if main_list else []

    for li in item_list:
        if not li.a:
            continue

        url = li.a['href']
        title = li.find('h2').text
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


def find_lista():
    veiculo_list = get_veiculos()

    veiculos = VeiculoList()
    veiculos.load_from_json(veiculo_list, [], [])

    _uf = 'pr'
    _find(
        veiculos,
        f'https://www.olx.com.br/autos-e-pecas/carros-vans-e-utilitarios/ford/edge/estado-{_uf}?pe=80000&re=33&rs=29',
    )
