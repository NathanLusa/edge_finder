from facebook.find_lista import find_facebook
from olx.finder_form import find_form as find_olx_form
from olx.finder_lista import find_lista as find_olx
from socarrao.finder import find_socarrao

##
from services.services import *
from services.models import *
from services.schemas import *


if __name__ == '__main__':
    _force = False
    # _force = True

    # find_socarrao(_force)
    # find_olx(_force)
    # find_olx_form(_force)
    # find_facebook(_force)

    veiculo_list = get_veiculos()
    historicos = get_historicos()
    imagens = get_imagens()

    veiculos = VeiculoList()
    veiculos.load_from_json(veiculo_list, historicos, imagens)

    for veiculo in veiculos:
        veiculo.url = veiculo.url.split('?')[0]

    duplicados = []
    print(len(veiculos))
    for _ in range(10):
        for veiculo in veiculos:
            veiculo_duplicado = veiculos.get_veiculo(veiculo.url)
            if veiculo_duplicado and veiculo_duplicado.id != veiculo.id:
                for historico in veiculo_duplicado.historicos:
                    veiculo.historicos.append(historico)

                for imagem in veiculo_duplicado.imagens:
                    veiculo.imagens.append(imagem)

                duplicados.append(veiculo_duplicado)
                veiculos.remove(veiculo_duplicado)

    print(len(veiculos))
    for x in duplicados:
        print(x)