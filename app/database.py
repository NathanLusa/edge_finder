import os
from datetime import datetime, timezone
from typing import Any

from sqlalchemy import Column, DateTime, Integer, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

engine = create_engine(
    os.getenv('DATABASE_URL', 'sqlite:///./edge.db')
    # 'postgresql+psycopg2://postgres:Nathan251410*@192.168.0.112:5432/edge_finder',
    # 'sqlite:///./edge.db', 
    # connect_args={'check_same_thread': False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class BaseModels(object):
    def __tablename__(cls) -> str:
        return str(cls.__name__.lower())

    id = Column(Integer, primary_key=True, autoincrement=True)
    created_at = Column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )


class BaseStatusModels(BaseModels):
    status = Column(Integer)


Base = declarative_base(cls=(BaseModels))
BaseStatus = declarative_base(cls=(BaseStatusModels))

BaseDeclarativeList = (Base, BaseStatus)


def get_db() -> Any:
    session = SessionLocal()
    try:
        yield session
        session.commit()
    finally:
        session.close()
