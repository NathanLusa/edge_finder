import re

from bs4 import BeautifulSoup
from services.models import Veiculo, VeiculoList
from services.schemas import VeiculoSchema
from services.services import get_veiculos, post_veiculo, update_veiculo
from utils import get_content

SITE = 'https://seminovos.breitkopf.com.br'


def _find(veiculos, url, force):
    print(url)
    status_code, content, _ = get_content(url, force=force)
    soup = BeautifulSoup(content, 'html5lib')
    breakpoint()

    main_list = soup.find_all('div', class_='card-car')

    for card in main_list:
        url = card.a['href']

        adiv = card.a.find('p', class_='card-car-name')

        title = adiv.find('strong').text or ''
        title += adiv.find('small').text or ''

        breakpoint()

        year = adiv.find('span', class_='c-stock-card__year')
        if year:
            year = year.text.split('/')[1]

        city = adiv.find('p', class_='c-stock-card__location').text or ''

        try:
            veiculo = veiculos.get_veiculo(url)
            if not veiculo:
                veiculo_schema = VeiculoSchema(
                    marca='Citroen',
                    modelo='C4 Cactus',
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

    for page in range(1,3):
        _find(
            veiculos,
            f'https://seminovos.breitkopf.com.br/seminovos/citroën/c4%20cactus?busca=&brand=Citroën&model=C4+Cactus&limit=48&page={page}',
            force,
        )
