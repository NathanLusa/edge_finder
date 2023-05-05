from datetime import datetime
from typing import List

from core.schemas import BaseSchema


class VeiculoHistorico(BaseSchema):
    valor: float
    quilometragem: int
    descricao: str
    datahora: datetime
    veiculo_id: int

    class Config:
        orm_mode = True


class VeiculoImagem(BaseSchema):
    url: str
    veiculo_id: int

    class Config:
        orm_mode = True


class Veiculo(BaseSchema):
    marca: str
    modelo: str
    ano: int
    url: str
    titulo: str
    # historicos: List[VeiculoHistorico] = []
    # imagens: List[VeiculoImagem] = []

    class Config:
        orm_mode = True
