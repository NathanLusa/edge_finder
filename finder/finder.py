from facebook.find_lista import find_facebook
from olx.finder_form import find_form as find_olx_form
from olx.finder_lista import find_lista as find_olx
from services.models import *
from services.schemas import *

##
from services.services import *
from socarrao.finder import find_socarrao


def ajustar_duplicados():
    veiculo_list = get_veiculos()
    historicos = get_historicos()
    imagens = get_imagens()

    veiculo_list = [x for x in veiculo_list if x['status'] == 'ativo']

    veiculos = VeiculoList()
    veiculos.load_from_json(veiculo_list, historicos, imagens)

    atualizados = VeiculoList()
    duplicados = VeiculoList()
    print(len(veiculos))

    for veiculo in veiculos:
        _url = veiculo.url.split('?')[0]
        dup = [
            v
            for v in veiculos
            if v.url.split('?')[0] == _url and v.id != veiculo.id
        ]
        for veiculo_duplicado in dup:
            for historico in veiculo_duplicado.historicos:
                veiculo.historicos.append(historico)

            for imagem in veiculo_duplicado.imagens:
                veiculo.imagens.append(imagem)

            atualizados.append(veiculo) if not veiculo in atualizados else None
            duplicados.append(veiculo_duplicado)
            veiculos.remove(veiculo_duplicado)

    for v in duplicados:
        if v.status != 'duplicado':
            v.status = 'duplicado'
            response = update_veiculo(v.to_json())
            print(response)

    for v in atualizados:
        for h in v.historicos:
            # if h.veiculo_id != v.id:
            h.veiculo_id = v.id
            response = update_veiculo_historico(h.to_json())
            print(response)

        for i in v.imagens:
            # if i.veiculo_id != v.id:
            i.veiculo_id = v.id
            response = update_veiculo_imagem(i.to_json())
            print(response)

        if len(v.url.split('?')) > 1:
            v.url = v.url.split('?')[0]
            response = update_veiculo(v.to_json())
            print(response)

    print(len(atualizados))
    print(len(duplicados))
    print(len(veiculos))


if __name__ == '__main__':
    _force = False
    _force = True

    find_socarrao(_force)
    find_olx(_force)
    find_olx_form(_force)
    find_facebook(_force)

    # ajustar_duplicados()
