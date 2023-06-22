import re

from bs4 import BeautifulSoup
from services.models import Veiculo, VeiculoList
from services.schemas import VeiculoSchema
from services.services import get_veiculos, post_veiculo, update_veiculo
from utils import get_content

SITE = 'https://www.olx.com.br'


def _find(veiculos, url, force):
    print(url)
    status_code, content, _ = get_content(url, force=force)
    soup = BeautifulSoup(content, 'html5lib')
    main_list = soup.find(id='ad-list')
    item_list = main_list.find_all('li') if main_list else []

    for li in item_list:
        if not li.a:
            continue

        url = li.a['href']
        title = li.find('h2').text
        year_span = li.find('span', {'aria-label': re.compile(r'Ano')})
        year = year_span.text.strip() if year_span else 0
        city = li.find('div', class_='horizontal sc-dREXXX foFQDs').find('p').text or ''
        city = city.split(',')[0] if city else ''

        try:
            url = url.split('?')[0]
            veiculo = veiculos.get_veiculo(url)
            if not veiculo:
                veiculo_schema = VeiculoSchema(
                    marca='Ford',
                    modelo='Edge',
                    ano=year,
                    url=url,
                    titulo=title,
                    site=SITE,
                    status='ativo',
                    favorito=False,
                    cidade=city,
                )
                veiculo_json = post_veiculo(veiculo_schema.to_json())
                veiculo = Veiculo()
                veiculo.load_from_json(veiculo_json, [], [])
                veiculos.append(veiculo)

            if str(veiculo.ano) != year:
                veiculo.ano = year
                veiculo_json = update_veiculo(veiculo.to_json())

            if veiculo.cidade != city:
                veiculo.cidade = city
                veiculo_json = update_veiculo(veiculo.to_json())

        except:
            print('URL :', url)
            print('JSON: ', veiculo_json if veiculo_json else '')
            print('SCHEMA: ', veiculo_schema if veiculo_schema else '')
            raise


def find_lista(force):
    veiculo_list = get_veiculos()
    veiculo_list = [x for x in veiculo_list if x['site'] == SITE]

    veiculos = VeiculoList()
    veiculos.load_from_json(veiculo_list, [], [])

    _ufs = ['pr', 'sc']
    for _uf in _ufs:
        for page in range(1,3):
            _find(
                veiculos,
                # f'https://www.olx.com.br/autos-e-pecas/carros-vans-e-utilitarios/ford/edge/estado-{_uf}?pe=80000&re=33&rs=29',
                f'https://www.olx.com.br/autos-e-pecas/carros-vans-e-utilitarios/ford/edge/estado-{_uf}?rs=29&o={page}',
                force,
            )
