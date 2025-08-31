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
    post_veiculo_status,
)
from utils import get_content

SITE = 'https://seminovos.breitkopf.com.br'



def _find(veiculo, force):
    status_code, content, file_name = get_content(veiculo.url, force=force)
    print(status_code, veiculo.url, file_name)

    if status_code == 404:
        post_veiculo_status(veiculo.id, 'indisponivel')
        return

    soup = BeautifulSoup(content, 'html5lib')
    main = soup

    img = main.find('div', class_='slide-gallery-car')
    if img:
        img = img.img['data-src']
        imagem = veiculo.get_imagem(img)
        if not imagem:
            imagem_schema = VeiculoImagemSchema(
                veiculo_id=veiculo.id, url=img, status='ativo'
            )
            imagem_json = post_veiculo_imagem(imagem_schema.to_json())
            veiculo.add_imagem(imagem_json)

    price = main.find('p', class_='card-about-price')
    if price:
        price = price.strong.text
        price = float(price.split(' ')[-1].replace('.', '').replace(',', '.'))

    km = None
    km_list = main.find_all('div', class_='card-about-icon')
    for km in km_list:
        if not 'Km' in km.small.text:
            continue

        km = km.small.text.strip().split(' ')[-1]
        km = int(km)
        break

    description = ''

    hist = VeiculoHistoricoSchema(
        veiculo_id=veiculo.id,
        datahora=datetime.now().isoformat(),
        valor=price if price else 0,
        quilometragem=km if km else 0,
        descricao=description[:50],
    )
    breakpoint()
    historico = veiculo.get_historico(hist.to_json())
    if not historico:
        historico_json = post_veiculo_historico(hist.to_json())
        veiculo.add_historico(historico_json)


def find_form(force):
    veiculo_list = get_veiculos()
    historicos = get_historicos()
    imagens = get_imagens()

    veiculo_list = [
        x for x in veiculo_list if x['site'] == SITE and x['status'] == 'ativo'
    ]

    veiculos = VeiculoList()
    veiculos.load_from_json(veiculo_list, historicos, imagens)

    for veiculo in veiculos:
        _find(veiculo, force)
