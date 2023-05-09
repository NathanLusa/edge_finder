import enum


class VeiculoStatus(enum.Enum):
    ativo = 'ativo'
    inativo = 'inativo'


class ContaTipoEnum(enum.IntEnum):
    CORRENTE = 0
    POUPANCA = 1


class ContaStatusEnum(enum.IntEnum):
    CADASTRADO = 0
    ATIVO = 1
    CANCELADO = 2
    AG_MODIFICACAO = 3
    ENCERRADO = 4
