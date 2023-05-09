from fastapi import Depends, HTTPException
from fastapi_crudrouter import SQLAlchemyCRUDRouter as CRUDRouter
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import get_db
from app.enums import VeiculoStatus
from app.models.veiculo import VeiculoHistoricoModel, VeiculoImagemModel, VeiculoModel
from app.schemas.veiculo import Veiculo, VeiculoHistorico, VeiculoImagem


def get_veiculo(veiculo_id: int) -> int:
    return veiculo_id


veiculo_router = CRUDRouter(
    db=get_db,
    db_model=VeiculoModel,
    schema=Veiculo,
    paginate=1000,
    delete_all_route=False,
)

historico_router = CRUDRouter(
    db=get_db,
    db_model=VeiculoHistoricoModel,
    schema=VeiculoHistorico,
    paginate=2500,
    # get_all_route=False,
    delete_all_route=False,
)

imagem_router = CRUDRouter(
    db=get_db,
    db_model=VeiculoImagemModel,
    schema=VeiculoImagem,
    paginate=2500,
    # get_all_route=False,
    delete_all_route=False,
)


class VeiculoStatusRequest(BaseModel):
    status: VeiculoStatus

@veiculo_router.post('/{item_id}/status', response_model=Veiculo)
def update_status(item_id: int, status: VeiculoStatusRequest, db: Session = Depends(get_db)):
    veiculo = db.query(VeiculoModel).filter(VeiculoModel.id == item_id).first()
    if veiculo is None:
        raise HTTPException(status_code=404, detail="Veiculo não encontrado")
    veiculo.status = status.status
    db.commit()
    return veiculo