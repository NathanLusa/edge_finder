import json
from datetime import datetime

from services.models import Veiculo, VeiculoList
from services.schemas import VeiculoHistoricoSchema, VeiculoImagemSchema, VeiculoSchema
from services.services import (
    get_historicos,
    get_imagens,
    get_veiculos,
    post_veiculo,
    post_veiculo_historico,
    post_veiculo_imagem,
)
from unidecode import unidecode
from utils import get_content

SITE = 'https://www.socarrao.com.br'
URL_FOTOS = 'https://fotos.socarrao.com.br'
URL = 'https://www.socarrao.com.br/api/vehicles/by-search?aggs=1&pag=1&por-pagina=100&termo=/ano.2011-2014/regiao.18/particular.0.1/marca.140/modelo.20733'


def remove_accents(input_str):
    return unidecode(input_str)


def _find(veiculos, url, force):
    content, _ = get_content(url, force=force)
    content = json.loads(content)

    for _veiculo in content['veiculos']:
        url = f'{SITE}/{_veiculo["regiao_url"]}/{_veiculo["cidade_nome"]}/{_veiculo["modelo_nome_pai"]}/{_veiculo["veiculo_cor"]}/{_veiculo["veiculo_id"]}'
        url = remove_accents(url).lower()
        url = url.replace(' ', '-')

        year = _veiculo['ano_modelo']
        title = _veiculo['veiculo_modelo']

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
            )
            veiculo_json = post_veiculo(veiculo_schema.to_json())
            veiculo = Veiculo()
            veiculo.load_from_json(veiculo_json, [], [])
            veiculos.append(veiculo)

        for img in _veiculo['veiculo_foto']:
            img_url = f'{URL_FOTOS}/{_veiculo["revenda_id"]}/{_veiculo["veiculo_id"]}/{img}'
            imagem = veiculo.get_imagem(img_url)
            if not imagem:
                imagem_schema = VeiculoImagemSchema(
                    veiculo_id=veiculo.id, url=img_url, status='ativo'
                )
                imagem_json = post_veiculo_imagem(imagem_schema.to_json())
                veiculo.add_imagem(imagem_json)

        description = _veiculo['veiculo_observacao']
        price = round(float(_veiculo['veiculo_valor']), 2)
        km = _veiculo['veiculo_km']
        km = int(km) * 1000 if int(km) <= 1000 else int(km)

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


def find_socarrao(force):
    veiculo_list = get_veiculos()
    historicos = get_historicos()
    imagens = get_imagens()

    veiculo_list = [x for x in veiculo_list if x['site'] == SITE]

    veiculos = VeiculoList()
    veiculos.load_from_json(veiculo_list, historicos, imagens)

    _find(veiculos, URL, force)
