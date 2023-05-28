export interface SiteSchema {
    id: Number;
    nome: string;
    veiculos?: VeiculoSchema[];
}

export interface VeiculoSchema {
    id: Number;
    marca: string;
    modelo: string;
    ano: Number;
    url: string;
    titulo: string;
    site: string;
    status: string;
    historicos?: VeiculoHistoricoSchema[];
    imagens?: VeiculoImagemSchema[];
}

export interface VeiculoHistoricoSchema {
    id: Number;
    valor: Number;
    quilometragem: Number;
    descricao: string;
    datahora: string;
    veiculo_id: Number;
}

export interface VeiculoImagemSchema {
    id: Number;
    url: string;
    status: string;
    veiculo_id: Number;
}
