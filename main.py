import requests
from fastapi import Depends, FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from sqlalchemy import desc
from sqlalchemy.orm import Session, aliased, joinedload

from app.database import BaseDeclarativeList, engine, get_db
from app.enums import VeiculoImagemStatus, VeiculoStatus
from app.models.veiculo import VeiculoHistoricoModel, VeiculoImagemModel, VeiculoModel
from app.router.usuario import router as UsuarioRouter
from app.router.veiculo import historico_router, imagem_router, veiculo_router

templates = Jinja2Templates(directory='frontend/dist')
templatesBackend = Jinja2Templates(directory='templates')

app = FastAPI()

origins = [
    # "http://localhost",
    # "http://localhost:8080",
    # "http://localhost:5173"
    
    # "http://127.0.0.1",
    # "http://127.0.0.1:8080",
    # "http://127.0.0.1:5173"
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.mount('/static', StaticFiles(directory='static'), name='static')
app.mount('/assets', StaticFiles(directory='frontend/dist/assets'), name='assets')

# app.include_router(UsuarioRouter)
app.include_router(veiculo_router, prefix='/api')
app.include_router(historico_router, prefix='/api')
app.include_router(imagem_router, prefix='/api')

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
        .filter(VeiculoModel.id >= 1050)
        .order_by(order)
    )
    # .outerjoin(VeiculoImagemModel, onclause=( (VeiculoModel.id == VeiculoImagemModel.veiculo_id) & (VeiculoImagemModel.status != VeiculoImagemStatus.ativo) ))
    # .filter(VeiculoImagemModel.status != VeiculoImagemStatus.ativo)

    sites = [
        {
            'id': 1,
            'nome': 'Olx',
            'url': 'https://www.olx.com.br',
            'veiculos': veiculos.filter(
                VeiculoModel.site == 'https://www.olx.com.br'
            ).all(),
        },
        {
            'id': 2,
            'nome': 'Facebook',
            'url': 'https://www.facebook.com',
            'veiculos': veiculos.filter(
                VeiculoModel.site == 'https://www.facebook.com'
            ).all(),
        },
        {
            'id': 3,
            'nome': 'SoCarrao',
            'url': 'https://www.socarrao.com.br',
            'veiculos': veiculos.filter(
                VeiculoModel.site == 'https://www.socarrao.com.br'
            ).all(),
        },
    ]

    # return []
    return sites


@app.get('/veiculo/{item_id}')
async def veiculo_view(request: Request, item_id: int, db: Session = Depends(get_db)):
    veiculo = (
        db.query(VeiculoModel)
        .filter(VeiculoModel.id == item_id)
        # .join(VeiculoImagemModel)
        # .options(joinedload(VeiculoModel.imagens, innerjoin=True))
        # .filter(VeiculoImagemModel.veiculo_id == VeiculoModel.id)
        # .where(VeiculoImagemModel.status == VeiculoImagemStatus.ativo)
        .first()
    )

    # print(veiculo.statement)
    # veiculo = veiculo.all()
    # print(veiculo)
    # veiculo = veiculo.first()
    # print(len(veiculo.imagens.where(VeiculoImagemModel.status == VeiculoImagemStatus.ativo)))
    # veiculo.imagens = [x for x in veiculo.imagens if x.status == VeiculoImagemStatus.ativo]
    # print(len(veiculo.imagens))
    
    return templatesBackend.TemplateResponse(
        'veiculo.html',
        {
            'request': request,
            'veiculo': veiculo
        }
    )
    