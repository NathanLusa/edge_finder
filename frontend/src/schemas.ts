export enum VeiculoStatus {
    ativo = "ativo",
    inativo = "inativo",
    vendido = "vendido",
    indisponivel = "indisponivel",
    duplicado = "duplicado",
}
// class VeiculoStatus(enum.Enum):
//     ativo = 'ativo'
//     inativo = 'inativo'
//     vendido = 'vendido'
//     indisponivel = 'indisponivel'
//     duplicado = 'duplicado'

export interface SiteSchema {
    id: number;
    nome: string;
    url: string;
    veiculos?: VeiculoSchema[];
}

export interface VeiculoSchema {
    id: number;
    marca: string;
    modelo: string;
    ano: number;
    url: string;
    titulo: string;
    site: string;
    status: VeiculoStatus;
    created_at: string;
    favorito: boolean;
    cidade: string;
    historicos?: VeiculoHistoricoSchema[];
    imagens?: VeiculoImagemSchema[];
}

export interface VeiculoHistoricoSchema {
    id: number;
    valor: number;
    quilometragem: number;
    descricao: string;
    datahora: string;
    veiculo_id: number;
    created_at: string;
}

export interface VeiculoImagemSchema {
    id: number;
    url: string;
    status: string;
    veiculo_id: number;
    created_at: string;
}
