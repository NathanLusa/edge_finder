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

SITE = 'https://www.bariguiseminovos.com.br'



def _find(veiculo, force):
    status_code, content, file_name = get_content(veiculo.url, force=force)
    print(status_code, veiculo.url, file_name)

    if status_code == 404:
        post_veiculo_status(veiculo.id, 'indisponivel')
        return

    soup = BeautifulSoup(content, 'html5lib')
    main = soup.find(id='main-body')

    img = main.find('div', class_='img-carousel-stock')
    if img:
        img = main.find('div', class_='img-carousel-stock').img['data-src']
        imagem = veiculo.get_imagem(img)
        if not imagem:
            imagem_schema = VeiculoImagemSchema(
                veiculo_id=veiculo.id, url=img, status='ativo'
            )
            imagem_json = post_veiculo_imagem(imagem_schema.to_json())
            veiculo.add_imagem(imagem_json)

    price = main.find('p', class_='vehicle-detail-price')
    if price:
        price = main.find('p', class_='vehicle-detail-price').text
        price = float(price.split(' ')[1].replace('.', '').replace(',', '.'))

    km = main.find('div', class_='char-info-mileage')
    if km:
        km = main.find('div', class_='char-info-mileage').div
        km = km.find_all('span')[1].text.replace('km', '').replace('.', '')
        km = int(km) * 1000 if int(km) <= 1000 else int(km)

    description = ''

    hist = VeiculoHistoricoSchema(
        veiculo_id=veiculo.id,
        datahora=datetime.now().isoformat(),
        valor=price if price else 0,
        quilometragem=km if km else 0,
        descricao=description[:50],
    )
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
