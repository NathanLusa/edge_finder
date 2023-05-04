from typing import List

from fastapi import Depends, HTTPException
from fastapi_crudrouter import SQLAlchemyCRUDRouter as CRUDRouter
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.veiculo import VeiculoHistoricoModel, VeiculoImagemModel, VeiculoModel
from app.schemas.veiculo import Veiculo, VeiculoHistorico, VeiculoImagem


def get_veiculo(veiculo_id: int) -> int:
    return veiculo_id


veiculo_router = CRUDRouter(
    db=get_db,
    db_model=VeiculoModel,
    schema=Veiculo,
    paginate=100,
    delete_all_route=False,
)

historico_router = CRUDRouter(
    db=get_db,
    db_model=VeiculoHistoricoModel,
    schema=VeiculoHistorico,
    paginate=25,
    get_all_route=False,
    delete_all_route=False,
)

imagem_router = CRUDRouter(
    db=get_db,
    db_model=VeiculoImagemModel,
    schema=VeiculoImagem,
    paginate=25,
    get_all_route=False,
    delete_all_route=False,
)
