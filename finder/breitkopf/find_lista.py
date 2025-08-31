import json
import re

from bs4 import BeautifulSoup
from breitkopf.endpoint import url, headers, data
from services.models import Veiculo, VeiculoList
from services.schemas import VeiculoSchema
from services.services import get_veiculos, post_veiculo, update_veiculo
from utils import post_content

SITE = 'https://seminovos.breitkopf.com.br'


def _find(veiculos, url, force):
    print(url)
    status_code, content, _ = post_content(url, headers, data, force=force)

    content = json.loads(content)

    soup = BeautifulSoup(content['#listCars'], 'html5lib')
    for card in soup.find_all('div', class_='card-car'):
        card_body = card.find('div', class_='card-car-body')

        url = card_body.parent['href']

        adiv = card_body.find('p', class_='card-car-name')

        title = adiv.find('strong').text or ''
        title += adiv.find('small').text or ''

        year = card_body.find('p', class_='card-car-icon')
        if year:
            year = year.small.strong.text.split('/')[1]

        city = card_body.find('p', class_='card-car-location').text or ''
        city = city.split(':')
        city = city[1].strip() if len(city) > 0 else ''

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

    _find(veiculos, url, force, )
