from typing import Any, Dict

from fastapi import FastAPI

from app.database import BaseDeclarativeList, engine, get_db
from app.router.usuario import router as UsuarioRouter

app = FastAPI()

app.include_router(UsuarioRouter)

for base_declarative in BaseDeclarativeList:
    base_declarative.metadata.create_all(bind=engine)


@app.get('/')
def read_root() -> Dict[Any, Any]:
    return {'Hello': 'World'}
