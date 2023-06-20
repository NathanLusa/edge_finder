import requests

ENDPOINT = 'http://localhost:8000'
ENDPOINT_API = ENDPOINT + '/api'
VEICULO_ENDPOINT = ENDPOINT_API + '/veiculo'
HISTORICO_ENDPOINT = ENDPOINT_API + '/veiculohistorico'
IMAGEM_ENDPOINT = ENDPOINT_API + '/veiculoimagem'


def _post(url, json):
    response = requests.post(url, json=json)
    if response.status_code != 200:
        print(response.status_code, response)

    return response


def get_veiculos():
    response = requests.get(VEICULO_ENDPOINT)
    return response.json()


def get_historicos():
    response = requests.get(HISTORICO_ENDPOINT)
    return response.json()


def get_imagens():
    response = requests.get(IMAGEM_ENDPOINT)
    return response.json()


def post_veiculo(veiculo):
    response = _post(VEICULO_ENDPOINT, json=veiculo)
    return response.json()


def post_veiculo_historico(veiculo_historico):
    response = _post(HISTORICO_ENDPOINT, json=veiculo_historico)
    res = response
    return response.json()


def post_veiculo_imagem(veiculo_imagem):
    response = _post(IMAGEM_ENDPOINT, json=veiculo_imagem)
    return response.json()


def post_veiculo_status(veiculo_id, status):
    response = _post(
        f'{VEICULO_ENDPOINT}/{veiculo_id}/status', json={'status': status}
    )
    return response.json()


def update_veiculo(veiculo):
    response = requests.put(
        f'{VEICULO_ENDPOINT}/{veiculo["id"]}', json=veiculo
    )
    return response.json()


def update_veiculo_historico(veiculo_historico):
    response = requests.put(
        f'{HISTORICO_ENDPOINT}/{veiculo_historico["id"]}',
        json=veiculo_historico,
    )
    return response.json()


def update_veiculo_imagem(veiculo_imagem):
    response = requests.put(
        f'{IMAGEM_ENDPOINT}/{veiculo_imagem["id"]}', json=veiculo_imagem
    )
    return response.json()
