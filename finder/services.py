import requests

ENDPOINT = 'http://localhost:8000'
VEICULO_ENDPOINT = ENDPOINT + '/veiculo'
HISTORICO_ENDPOINT = ENDPOINT + '/veiculohistorico'
IMAGEM_ENDPOINT = ENDPOINT + '/veiculoimagem'


def get_veiculos():
    response = requests.get(VEICULO_ENDPOINT)
    return response.json()


def get_historicos():
    response = requests.get(HISTORICO_ENDPOINT)
    return response.json()


def get_imagens():
    response = requests.get(IMAGEM_ENDPOINT)
    return response.json()


def save_veiculo(veiculo):
    response = requests.post(VEICULO_ENDPOINT, json=veiculo)
    veiculo = response.json()
    veiculo['historicos'] = []
    veiculo['imagens'] = []
    return veiculo


def save_veiculo_historico(veiculo, veiculo_historico):
    response = requests.post(HISTORICO_ENDPOINT, json=veiculo_historico)
    historico = response.json()
    veiculo['historicos'].append(historico)


def save_veiculo_imagem(veiculo, veiculo_imagem):
    response = requests.post(IMAGEM_ENDPOINT, json=veiculo_imagem)
    imagem = response.json()
    veiculo['imagens'].append(imagem)
