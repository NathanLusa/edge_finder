from datetime import datetime
from typing import List

from app.enums import VeiculoImagemStatus, VeiculoStatus
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
    status: VeiculoImagemStatus

    class Config:
        orm_mode = True


class Veiculo(BaseSchema):
    marca: str
    modelo: str
    ano: int
    url: str
    titulo: str
    site: str
    favorito: bool
    status: VeiculoStatus
    # historicos: List[VeiculoHistorico] = []
    # imagens: List[VeiculoImagem] = []

    class Config:
        orm_mode = True
