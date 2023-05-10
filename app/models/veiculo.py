from sqlalchemy import (
    Column,
    DateTime,
    Enum,
    Float,
    ForeignKey,
    Integer,
    String,
    UniqueConstraint,
)
from sqlalchemy.orm import relationship

from app.database import Base
from app.enums import VeiculoStatus


class VeiculoModel(Base):
    __tablename__ = 'veiculo'

    marca = Column(String(50))
    modelo = Column(String(50))
    ano = Column(Integer)
    url = Column(String(500), unique=True)
    titulo = Column(String(500))
    site = Column(String(500))
    status = Column(Enum(VeiculoStatus), default=VeiculoStatus.ativo)
    historicos = relationship('VeiculoHistoricoModel', backref='veiculo', lazy='joined')
    imagens = relationship('VeiculoImagemModel', backref='veiculo', lazy='joined')

    def is_ativo(self):
        return self.status == VeiculoStatus.ativo


class VeiculoHistoricoModel(Base):
    __tablename__ = 'veiculohistorico'

    valor = Column(Float)
    quilometragem = Column(Integer)
    descricao = Column(String(500))
    datahora = Column(DateTime)
    veiculo_id = Column(Integer, ForeignKey('veiculo.id'))


class VeiculoImagemModel(Base):
    __tablename__ = 'veiculoimagem'

    url = Column(String(500))
    veiculo_id = Column(Integer, ForeignKey('veiculo.id'))

    __table_args__ = (UniqueConstraint('url', 'veiculo_id'),)
