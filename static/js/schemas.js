function LoadFromObject(object, props, exclude_keys = []) {
  [...Object.keys(props)].map((key) => {
    if (!exclude_keys.includes(key)) {
      object[key] = props[key];
    }
  });
}

function LoadArrayFromObject(object, props, key, schema) {
  if (key in props) {
    props[key].map((item) => object[key].push(new schema(item)));
  }
}

export class SiteSchema {
  constructor(props) {
    this.id = 0;
    this.nome = "";
    this.veiculos = [];

    LoadFromObject(this, props, ["veiculos"]);
    LoadArrayFromObject(this, props, "veiculos", VeiculoSchema);
  }
}

export class VeiculoSchema {
  constructor(props) {
    this.id = 0;
    this.marca = "";
    this.modelo = "";
    this.ano = 0;
    this.url = "";
    this.titulo = "";
    this.site = "";
    this.status = "";
    this.historicos = [];
    this.imagens = [];

    LoadFromObject(this, props, ["historicos", "imagens"]);
    LoadArrayFromObject(this, props, "historicos", VeiculoHistoricoSchema);
    LoadArrayFromObject(this, props, "imagens", VeiculoImagemSchema);
  }
}

export class VeiculoHistoricoSchema {
  constructor(props) {
    this.id = 0;
    this.valor = 0.0;
    this.quilometragem = 0;
    this.descricao = "";
    this.datahora = "";
    this.veiculo_id = 0;

    LoadFromObject(this, props);
  }
}

export class VeiculoImagemSchema {
  constructor(props) {
    this.id = 0;
    this.url = "";
    this.veiculo_id = 0;

    LoadFromObject(this, props);
  }
}
