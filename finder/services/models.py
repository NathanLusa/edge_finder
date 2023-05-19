import json
from datetime import datetime
from typing import List


class BaseModel:
    # def __init__(self, **kwargs):
    #     for key, value in kwargs.items():
    #         setattr(self, key, value)

    def to_json(self):
        # breakpoint()
        # print((lambda o: o.__dict__))
        return json.loads(json.dumps(self, default=lambda o: o.__dict__,))


class VeiculoHistorico(BaseModel):
    id: int
    valor: float
    quilometragem: int
    descricao: str
    datahora: datetime
    veiculo_id: int

    def load_from_json(self, historico):
        self.id = historico['id']
        self.valor = historico['valor']
        self.quilometragem = historico['quilometragem']
        self.descricao = historico['descricao']
        self.datahora = historico['datahora']


class VeiculoHistoricoList(List[VeiculoHistorico]):
    def get_historico(self, historico):
        for hist in self:
            if (hist.valor == historico['valor']) and (
                hist.quilometragem == historico['quilometragem']
            ):
                return hist

        return None


class VeiculoImagem(BaseModel):
    id: int
    url: str
    status: str
    veiculo_id: int

    def load_from_json(self, imagem):
        self.id = imagem['id']
        self.url = imagem['url']
        self.status = imagem['status']


class VeiculoImagemList(List[VeiculoImagem]):
    def get_imagem(self, url):
        for imagem in self:
            if imagem.url == url:
                return imagem

        return None


class Veiculo(BaseModel):
    id: int
    marca: str
    modelo: str
    ano: int
    url: str
    titulo: str
    site: str
    status: str
    historicos: VeiculoHistoricoList
    imagens: VeiculoImagemList
    
    def __init__(self) -> None:
        self.historicos = VeiculoHistoricoList()
        self.imagens = VeiculoImagemList()

    def load_from_json(self, veiculo, historicos, imagens):
        self.id = veiculo['id']
        self.marca = veiculo['marca']
        self.modelo = veiculo['modelo']
        self.ano = veiculo['ano']
        self.url = veiculo['url']
        self.titulo = veiculo['titulo']
        self.site = veiculo['site']
        self.status = veiculo['status']

        # self.url = self.url.split('?')[0]

        for historico in historicos:
            if self.id == historico['veiculo_id']:
                hist = VeiculoHistorico()
                hist.load_from_json(historico)
                self.historicos.append(hist)

        for imagem in imagens:
            if self.id == imagem['veiculo_id']:
                img = VeiculoImagem()
                img.load_from_json(imagem)
                self.imagens.append(img)

    def add_historico(self, historico_json):
        historico = VeiculoHistorico()
        historico.load_from_json(historico_json)
        self.historicos.append(historico)

    def add_imagem(self, imagem_json):
        try:
            imagem = VeiculoImagem()
            imagem.load_from_json(imagem_json)
            self.imagens.append(imagem)
        except:
            print(imagem_json)
            raise

    def get_historico(self, historico):
        return self.historicos.get_historico(historico)

    def get_imagem(self, imagem):
        return self.imagens.get_imagem(imagem)


class VeiculoList(List[Veiculo]):
    def load_from_json(self, veiculos, historicos, imagens):
        for item in veiculos:
            veiculo = Veiculo()
            veiculo.load_from_json(item, historicos, imagens)
            self.append(veiculo)

    def get_veiculo(self, url):
        for veiculo in self:
            if veiculo.url == url:
                return veiculo

        return None

    def get_veiculo_url(self, url):
        _url = url.split('?')[0]
        for veiculo in self:
            if veiculo.url.split('?')[0] == _url:
                return veiculo

        return None
