import json
import time
from datetime import datetime

from bs4 import BeautifulSoup
from services.models import Veiculo, VeiculoList
from services.schemas import VeiculoHistoricoSchema, VeiculoImagemSchema
from services.services import (
    get_historicos,
    get_imagens,
    get_veiculos,
    post_veiculo_historico,
    post_veiculo_imagem,
    post_veiculo_status
)
from utils import get_content

SITE = 'https://www.olx.com.br'


def _find(veiculo, force):
    status_code, content, file_name = get_content(veiculo.url, force=force)
    print(status_code, veiculo.url, file_name)

    if status_code == 404:
        post_veiculo_status(veiculo.id, 'indisponivel')
        return

    soup = BeautifulSoup(content, 'html5lib')
    main_list = soup.find(id='initial-data')

    if not main_list:
        print(f'Page not found?')
        return

    # print(main_list['data-json'])
    # breakpoint()
    json_data = json.loads(main_list['data-json'])
    if not 'images' in json_data['ad']: print(json_data)

    for img in json_data['ad']['images'] if 'images' in json_data['ad'] else []:
        imagem = veiculo.get_imagem(img['original'])
        if not imagem:
            imagem_schema = VeiculoImagemSchema(
                veiculo_id=veiculo.id, url=img['original'], status='ativo'
            )
            imagem_json = post_veiculo_imagem(imagem_schema.to_json())
            veiculo.add_imagem(imagem_json)

    description = json_data['ad']['body'] if 'body' in json_data['ad'] else ''
    price = round(float(json_data['ad']['priceValue'].split(' ')[1]) * 1000, 2) if 'priceValue' in json_data['ad'] else 0.0

    km = 0
    for prop in json_data['ad']['properties'] if 'properties' in json_data['ad'] else []:
        if prop['name'] == 'mileage':
            km = prop['value']
            km = int(km) * 1000 if int(km) <= 1000 else int(km)
            break

    hist = VeiculoHistoricoSchema(
        veiculo_id=veiculo.id,
        datahora=datetime.now().isoformat(),
        valor=price,
        quilometragem=km,
        descricao=description,
    )
    historico = veiculo.get_historico(hist.to_json())
    if not historico:
        historico_json = post_veiculo_historico(hist.to_json())
        veiculo.add_historico(historico_json)


def find_form(force):
    veiculo_list = get_veiculos()
    historicos = get_historicos()
    imagens = get_imagens()

    veiculo_list = [x for x in veiculo_list if x['site'] == SITE and x['status'] == 'ativo']

    veiculos = VeiculoList()
    veiculos.load_from_json(veiculo_list, historicos, imagens)

    for veiculo in veiculos:
        _find(veiculo, force)
