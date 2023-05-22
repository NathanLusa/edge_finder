// export class SiteSchema extends Object {
export class SiteSchema {
  constructor(props) {
    // super();
    this.id = 0;
    this.nome = "";
    this.veiculos = [];

    // console.log(Object.keys(this));
    // console.log(Object.keys(props));

    [Object.keys(props)].map((key) => (this[key] = props[key]));

    // this.id = id;
    // this.nome = nome;
    // this.veiculos = veiculos;
  }
}

export class VeiculoSchema {
  constructor(
    id,
    marca,
    modelo,
    ano,
    url,
    titulo,
    site,
    status,
    historicos,
    imagens
  ) {
    this.id = id;
    this.marca = marca;
    this.modelo = modelo;
    this.ano = ano;
    this.url = url;
    this.titulo = titulo;
    this.site = site;
    this.status = status;
    this.historicos = historicos;
    this.imagens = imagens;
  }
}

export class VeiculoHistoricoSchema {
  constructor(id, valor, quilometragem, descricao, datahora, veiculo_id) {
    this.id = id;
    this.valor = valor;
    this.quilometragem = quilometragem;
    this.descricao = descricao;
    this.datahora = datahora;
    this.veiculo_id = veiculo_id;
  }
}

export class VeiculoImagemSchema {
  constructor(id, url, veiculo_id) {
    this.id = id;
    this.url = url;
    this.veiculo_id = veiculo_id;
  }
}
