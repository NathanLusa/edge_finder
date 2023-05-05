from fastapi import Depends, FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from sqlalchemy import desc
from sqlalchemy.orm import Session, aliased

from app.database import BaseDeclarativeList, engine, get_db
from app.models.veiculo import VeiculoHistoricoModel, VeiculoModel
from app.router.usuario import router as UsuarioRouter
from app.router.veiculo import historico_router, imagem_router, veiculo_router

templates = Jinja2Templates(directory='templates')

app = FastAPI()
# app.mount('/static', StaticFiles(directory='static'), name='static')

# app.include_router(UsuarioRouter)
app.include_router(veiculo_router)
app.include_router(historico_router)
app.include_router(imagem_router)

for base_declarative in BaseDeclarativeList:
    base_declarative.metadata.create_all(bind=engine)


@app.get('/')
async def read_root(request: Request, db: Session = Depends(get_db)):
    veiculos = []
    veiculos = list(
        db.query(VeiculoModel).join(VeiculoHistoricoModel).order_by(VeiculoHistoricoModel.valor)
    )

    # print(veiculos[0].historicos[0].datahora)
    return templates.TemplateResponse(
        'index.html',
        {'request': request, 'veiculos': veiculos, 'colunas': range(1, 13)},
    )
