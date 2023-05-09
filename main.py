from fastapi import Depends, FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from sqlalchemy import desc
from sqlalchemy.orm import Session, aliased

from app.database import BaseDeclarativeList, engine, get_db
from app.enums import VeiculoStatus
from app.models.veiculo import VeiculoHistoricoModel, VeiculoModel
from app.router.usuario import router as UsuarioRouter
from app.router.veiculo import historico_router, imagem_router, veiculo_router

templates = Jinja2Templates(directory='templates')

app = FastAPI()
app.mount('/static', StaticFiles(directory='static'), name='static')

# app.include_router(UsuarioRouter)
app.include_router(veiculo_router)
app.include_router(historico_router)
app.include_router(imagem_router)

for base_declarative in BaseDeclarativeList:
    base_declarative.metadata.create_all(bind=engine)


@app.get('/')
async def read_root(request: Request, db: Session = Depends(get_db)):
    order = desc(VeiculoModel.id)
    order = VeiculoHistoricoModel.valor

    veiculos = (
        db.query(VeiculoModel)
        .join(VeiculoHistoricoModel)
        .filter(VeiculoModel.status == VeiculoStatus.ativo)
        .order_by(order)
    )

    return templates.TemplateResponse(
        'index.html',
        {
            'request': request,
            'sites': [
                {
                    'nome': 'Olx',
                    'veiculos': list(
                        veiculos.filter(
                            VeiculoModel.site == 'https://www.olx.com.br'
                        )
                    ),
                },
                {
                    'nome': 'Facebook',
                    'veiculos': list(
                        veiculos.filter(
                            VeiculoModel.site == 'https://www.facebook.com'
                        )
                    ),
                },
            ],
            'colunas': range(1, 13),
        },
    )
