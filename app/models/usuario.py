from sqlalchemy import Boolean, Column, Float, String

from app.database import BaseStatus


class UsuarioModel(BaseStatus):
    __tablename__ = 'usuario'

    name = Column(String)
    price = Column(Float)
    is_offer = Column(Boolean, default=False)
