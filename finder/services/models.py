from datetime import datetime
from typing import List


class VeiculoHistorico:
    id: int
    valor: float
    quilometragem: int
    descricao: str
    datahora: datetime

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


class VeiculoImagem:
    id: int
    url: str

    def load_from_json(self, imagem):
        self.id = imagem['id']
        self.url = imagem['url']


class VeiculoImagemList(List[VeiculoImagem]):
    def get_imagem(self, url):
        for imagem in self:
            if imagem.url == url:
                return imagem

        return None


class Veiculo:
    id: int
    marca: str
    modelo: str
    ano: int
    url: str
    titulo: str
    site: str
    historicos = VeiculoHistoricoList()
    imagens = VeiculoImagemList()

    def load_from_json(self, veiculo, historicos, imagens):
        self.id = veiculo['id']
        self.marca = veiculo['marca']
        self.modelo = veiculo['modelo']
        self.ano = veiculo['ano']
        self.url = veiculo['url']
        self.titulo = veiculo['titulo']
        self.site = veiculo['site']

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
        imagem = VeiculoImagem()
        imagem.load_from_json(imagem_json)
        self.imagens.append(imagem)

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
