import requests
from fastapi import Depends, FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from sqlalchemy import desc
from sqlalchemy.orm import Session, aliased

from app.database import BaseDeclarativeList, engine, get_db
from app.enums import VeiculoImagemStatus, VeiculoStatus
from app.models.veiculo import VeiculoHistoricoModel, VeiculoImagemModel, VeiculoModel
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


@app.post('/verificarimagens')
async def verificar_imagens(db: Session = Depends(get_db)):
    imagens = (
        db.query(VeiculoImagemModel)
        .filter(VeiculoImagemModel.status == VeiculoImagemStatus.ativo)
        .filter(VeiculoImagemModel.url.like('%fbcdn%'))
        .all()
    )

    for imagem in imagens:
        response = requests.get(imagem.url)
        print(imagem.url, imagem.status, response.status_code)
        status = imagem.status
        if response.status_code == 403:
            status = VeiculoImagemStatus.token_invalido
        elif response.status_code == 404:
            status = VeiculoImagemStatus.inativo

        imagem.status = status
        db.commit()

    imagens = (
        db.query(VeiculoImagemModel)
        .filter(VeiculoImagemModel.status != VeiculoImagemStatus.ativo)
        .all()
    )

    return {'status': 'ok', 'imagens': imagens}


@app.get('/')
async def read_root(request: Request, db: Session = Depends(get_db)):
    order = desc(VeiculoModel.id)
    # order = VeiculoHistoricoModel.valor

    veiculos = (
        db.query(VeiculoModel)
        .join(VeiculoHistoricoModel)
        .filter(VeiculoModel.status == VeiculoStatus.ativo)
        .filter(VeiculoModel.id == -1)
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


@app.get('/veiculolista')
async def veiculo_lista(db: Session = Depends(get_db)):
    order = desc(VeiculoModel.id)
    # order = VeiculoModel.id
    # order = VeiculoHistoricoModel.valor
    order = desc(VeiculoHistoricoModel.datahora)

    veiculos = (
        db.query(VeiculoModel)
        .join(VeiculoHistoricoModel)
        .filter(VeiculoModel.status == VeiculoStatus.ativo)
        .order_by(order)
    )
    # .outerjoin(VeiculoImagemModel, onclause=( (VeiculoModel.id == VeiculoImagemModel.veiculo_id) & (VeiculoImagemModel.status != VeiculoImagemStatus.ativo) ))
    # .filter(VeiculoImagemModel.status != VeiculoImagemStatus.ativo)

    sites = [
        {
            'id': 1,
            'nome': 'Olx',
            'veiculos': veiculos.filter(
                VeiculoModel.site == 'https://www.olx.com.br'
            ).all(),
        },
        {
            'id': 2,
            'nome': 'Facebook',
            'veiculos': veiculos.filter(
                VeiculoModel.site == 'https://www.facebook.com'
            ).all(),
        },
        {
            'id': 3,
            'nome': 'SoCarrao',
            'veiculos': veiculos.filter(
                VeiculoModel.site == 'https://www.socarrao.com.br'
            ).all(),
        },
    ]

    # return []
    return sites
