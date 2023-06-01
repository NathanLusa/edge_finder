export interface SiteSchema {
    id: number;
    nome: string;
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
    status: string;
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
}

export interface VeiculoImagemSchema {
    id: number;
    url: string;
    status: string;
    veiculo_id: number;
}