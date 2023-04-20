from typing import Any, List, Optional, Type, Union

from fastapi import Depends
from fastapi_crudrouter import SQLAlchemyCRUDRouter
from fastapi_crudrouter.core.sqlalchemy import (
    CALLABLE,
    DEPENDENCIES,
    NOT_FOUND,
    SCHEMA,
    Model,
    Session,
)


class StatusCRUDRouter(SQLAlchemyCRUDRouter):
    def __init__(
        self,
        schema: Type[SCHEMA],
        db_model: Model,
        db: 'Session',
        create_schema: Optional[Type[SCHEMA]] = None,
        update_schema: Optional[Type[SCHEMA]] = None,
        prefix: Optional[str] = None,
        tags: Optional[List[str]] = None,
        paginate: Optional[int] = None,
        get_all_route: Union[bool, DEPENDENCIES] = True,
        get_one_route: Union[bool, DEPENDENCIES] = True,
        create_route: Union[bool, DEPENDENCIES] = True,
        update_route: Union[bool, DEPENDENCIES] = True,
        delete_one_route: Union[bool, DEPENDENCIES] = True,
        delete_all_route: Union[bool, DEPENDENCIES] = True,
        cancelar_route: Union[bool, DEPENDENCIES] = True,
        liberar_route: Union[bool, DEPENDENCIES] = True,
        voltar_route: Union[bool, DEPENDENCIES] = True,
        **kwargs: Any,
    ) -> None:
        super().__init__(
            schema=schema,
            db_model=db_model,
            db=db,
            create_schema=create_schema,
            update_schema=update_schema,
            prefix=prefix,
            tags=tags,
            paginate=paginate,
            get_all_route=get_all_route,
            get_one_route=get_one_route,
            create_route=create_route,
            update_route=update_route,
            delete_one_route=delete_one_route,
            delete_all_route=delete_all_route,
            **kwargs,
        )

        if cancelar_route:
            self._add_api_route(
                '/{item_id}/cancelar',
                self._cancelar,
                methods=['POST'],
                response_model=self.schema,
                summary='Cancelar',
                dependencies=True,
                error_responses=[NOT_FOUND],
            )

        if liberar_route:
            self._add_api_route(
                '/{item_id}/liberar',
                self._liberar,
                methods=['POST'],
                response_model=self.schema,
                summary='Liberar',
                dependencies=True,
                error_responses=[NOT_FOUND],
            )

        if voltar_route:
            self._add_api_route(
                '/{item_id}/voltar',
                self._voltar,
                methods=['POST'],
                response_model=self.schema,
                summary='Voltar',
                dependencies=True,
                error_responses=[NOT_FOUND],
            )

    def _cancelar(self, *args: Any, **kwargs: Any) -> CALLABLE:
        def route(
            item_id: self._pk_type,  # type: ignore
            db: Session = Depends(self.db_func),
        ) -> str:
            return f'{item_id} foi cancelado'
            # try:
            #     db_model: Model = self._get_one()(item_id, db)
            #     db.commit()
            #     db.refresh(db_model)

            #     return db_model
            # except IntegrityError as e:
            #     db.rollback()
            #     self._raise(e)

        return route

    def _liberar(self, *args: Any, **kwargs: Any) -> CALLABLE:
        def route(
            item_id: self._pk_type,  # type: ignore
            db: Session = Depends(self.db_func),
        ) -> str:
            return f'{id} foi liebrado'

        return route

    def _voltar(self, *args: Any, **kwargs: Any) -> CALLABLE:
        def route(
            item_id: self._pk_type,  # type: ignore
            db: Session = Depends(self.db_func),
        ) -> str:
            return f'{id} foi retornado'

        return route
