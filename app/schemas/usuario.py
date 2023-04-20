from typing import Union

from core.schemas import BaseStatusSchema


class Usuario(BaseStatusSchema):
    name: str
    price: float
    is_offer: Union[bool, None] = None
