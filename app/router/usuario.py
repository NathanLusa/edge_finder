# from fastapi_crudrouter import SQLAlchemyCRUDRouter as CRUDRouter

from fastapi import Depends, HTTPException

from app.database import get_db
from app.models.usuario import UsuarioModel
from app.schemas.usuario import Usuario
from core.routes import StatusCRUDRouter as CRUDRouter

def get_all_route_dep(user: str):
    print('User' + user)
    # raise HTTPException(401, "Invalid token")

router = CRUDRouter(
    db=get_db,
    db_model=UsuarioModel,
    schema=Usuario,
    paginate=25,
    delete_all_route=False,
    get_all_route=[Depends(get_all_route_dep)],
)
