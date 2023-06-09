import enum


class VeiculoStatus(enum.Enum):
    ativo = 'ativo'
    inativo = 'inativo'
    vendido = 'vendido'
    indisponivel = 'indisponivel'
    duplicado = 'duplicado'


class VeiculoImagemStatus(enum.Enum):
    ativo = 'ativo'
    inativo = 'inativo'
    token_invalido = 'token_invalido'


class ContaTipoEnum(enum.IntEnum):
    CORRENTE = 0
    POUPANCA = 1


class ContaStatusEnum(enum.IntEnum):
    CADASTRADO = 0
    ATIVO = 1
    CANCELADO = 2
    AG_MODIFICACAO = 3
    ENCERRADO = 4
