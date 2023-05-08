import json
import time
from datetime import datetime

from bs4 import BeautifulSoup
from services.models import Veiculo, VeiculoList
from services.services import (
    get_historicos,
    get_imagens,
    get_veiculos,
    post_veiculo_historico,
    post_veiculo_imagem,
)
from utils import get_content


def _find(veiculo):
    content, file_name = get_content(veiculo.url)
    print(veiculo.url, file_name)

    soup = BeautifulSoup(content, 'html5lib')
    main_list = soup.find(id='initial-data')

    if not main_list:
        print(f'Page not found?')
        return

    json_data = json.loads(main_list['data-json'])

    for img in json_data['ad']['images']:
        imagem = veiculo.get_imagem(img['original'])
        if not imagem:
            imagem_json = post_veiculo_imagem(
                {
                    'veiculo_id': veiculo.id,
                    'url': img['original'],
                },
            )
            veiculo.add_imagem(imagem_json)

    description = json_data['ad']['body']
    price = round(float(json_data['ad']['priceValue'].split(' ')[1]) * 1000, 2)

    km = 0
    for prop in json_data['ad']['properties']:
        if prop['name'] == 'mileage':
            km = prop['value']
            km = int(km) * 1000 if int(km) <= 1000 else int(km)
            break

    hist = {
        'veiculo_id': veiculo.id,
        'datahora': datetime.now().isoformat(),
        'valor': price,
        'quilometragem': km,
        'descricao': description,
    }

    historico = veiculo.get_historico(hist)
    if not historico:
        historico_json = post_veiculo_historico(hist)
        veiculo.add_historico(historico_json)


def find_form():
    veiculo_list = get_veiculos()
    historicos = get_historicos()
    imagens = get_imagens()

    veiculos = VeiculoList()
    veiculos.load_from_json(veiculo_list, historicos, imagens)

    for veiculo in veiculos:
        _find(veiculo)
