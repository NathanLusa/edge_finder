export interface SiteSchema {
    id: Number;
    nome: String;
    veiculos?: VeiculoSchema[];
}

export interface VeiculoSchema {
    id: Number;
    marca: String;
    modelo: String;
    ano: Number;
    url: String;
    titulo: String;
    site: String;
    status: String;
    historicos?: VeiculoHistoricoSchema[];
    imagens?: VeiculoImagemSchema[];
}

export interface VeiculoHistoricoSchema {
    id: Number;
    valor: Number;
    quilometragem: Number;
    descricao: String;
    datahora: String;
    veiculo_id: Number;
}

export interface VeiculoImagemSchema {
    id: Number;
    url: String;
    veiculo_id: Number;
}
