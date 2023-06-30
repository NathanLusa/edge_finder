import requests
from typing import List
from fastapi import Depends, HTTPException
from fastapi_crudrouter import SQLAlchemyCRUDRouter as CRUDRouter
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import get_db
from app.enums import VeiculoStatus, VeiculoImagemStatus
from app.models.veiculo import VeiculoHistoricoModel, VeiculoImagemModel, VeiculoModel
from app.schemas.veiculo import Veiculo, VeiculoHistorico, VeiculoImagem


def get_veiculo(veiculo_id: int) -> int:
    return veiculo_id


veiculo_router = CRUDRouter(
    db=get_db,
    db_model=VeiculoModel,
    schema=Veiculo,
    paginate=10000,
    delete_all_route=False,
)

historico_router = CRUDRouter(
    db=get_db,
    db_model=VeiculoHistoricoModel,
    schema=VeiculoHistorico,
    paginate=25000,
    # get_all_route=False,
    delete_all_route=False,
)

imagem_router = CRUDRouter(
    db=get_db,
    db_model=VeiculoImagemModel,
    schema=VeiculoImagem,
    paginate=250000,
    # get_all_route=False,
    delete_all_route=False,
)


class VeiculoStatusRequest(BaseModel):
    status: VeiculoStatus

class VeiculoFavoritoRequest(BaseModel):
    favorito: bool


@veiculo_router.post('/{item_id}/status', response_model=Veiculo)
def update_status(
    item_id: int, status: VeiculoStatusRequest, db: Session = Depends(get_db)
):
    veiculo = db.query(VeiculoModel).filter(VeiculoModel.id == item_id).first()
    if veiculo is None:
        raise HTTPException(status_code=404, detail='Veiculo não encontrado')
    veiculo.status = status.status
    db.commit()
    return veiculo


@veiculo_router.post('/{item_id}/favorito', response_model=Veiculo)
def update_favorito(
    item_id: int, favorito: VeiculoFavoritoRequest, db: Session = Depends(get_db)
):
    veiculo = db.query(VeiculoModel).filter(VeiculoModel.id == item_id).first()
    if veiculo is None:
        raise HTTPException(status_code=404, detail='Veiculo não encontrado')
    veiculo.favorito = favorito.favorito
    db.commit()
    return veiculo


@veiculo_router.get('/{veiculo_id}/historicos', response_model=List[VeiculoHistorico])
def get_historicos(veiculo_id: int, db: Session = Depends(get_db)):
    historicos = db.query(VeiculoHistoricoModel).filter(VeiculoHistoricoModel.veiculo_id == veiculo_id).all()
    return historicos


@veiculo_router.get('/{veiculo_id}/imagens', response_model=List[VeiculoImagem])
def get_imagens(veiculo_id: int, db: Session = Depends(get_db)):
    imagens = db.query(VeiculoImagemModel).filter(VeiculoImagemModel.veiculo_id == veiculo_id).filter(VeiculoImagemModel.status == VeiculoImagemStatus.ativo).all()
    return imagens


@veiculo_router.post('/{item_id}/verificarimagens')
def verificar_imagens_veiculo(item_id: int, db: Session = Depends(get_db)):
    imagens = (
        db.query(VeiculoImagemModel)
        .filter(VeiculoImagemModel.veiculo_id == item_id)
        .filter(VeiculoImagemModel.status == VeiculoImagemStatus.ativo)
        .filter(VeiculoImagemModel.url.like('%fbcdn%'))
        .all()
    )

    for imagem in imagens:
        response = requests.get(imagem.url)
        status = imagem.status
        if response.status_code == 403:
            status = VeiculoImagemStatus.token_invalido
        elif response.status_code == 404:
            status = VeiculoImagemStatus.inativo

        print(imagem.id, imagem.status, status, response.status_code)

        imagem.status = status
        db.commit()

    imagens = (
        db.query(VeiculoImagemModel)
        .filter(VeiculoImagemModel.veiculo_id == item_id)
        .filter(VeiculoImagemModel.status != VeiculoImagemStatus.ativo)
        .all()
    )

    return {'status': 'ok', 'imagens': imagens}