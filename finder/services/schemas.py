import json
from datetime import datetime


class BaseSchema:
    def __init__(self, **kwargs):
        for key, value in kwargs.items():
            setattr(self, key, value)

    def to_json(self):
        return json.loads(
            json.dumps(
                self,
                default=lambda o: o.__dict__,
            )
        )


class VeiculoHistoricoSchema(BaseSchema):
    id: int
    valor: float
    quilometragem: int
    descricao: str
    datahora: datetime
    veiculo_id: int


class VeiculoImagemSchema(BaseSchema):
    id: int
    url: str
    veiculo_id: int


class VeiculoSchema(BaseSchema):
    id: int
    marca: str
    modelo: str
    ano: int
    url: str
    titulo: str
    site: str
    status: str = 'ativo'
    favorito: bool = False

    # def __init__(self, **kwargs):
    #     super().__init__(**kwargs)
    #     self.url = self.url.split('?')[0]
