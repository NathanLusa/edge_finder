function LoadFromObject(object, props, exclude_keys: string[] = []) {
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
    id: Number
    nome: string
    veiculos: VeiculoSchema[]

    constructor(props) {
        this.id = 0;
        this.nome = "";
        this.veiculos = [];

        LoadFromObject(this, props, ["veiculos"]);
        LoadArrayFromObject(this, props, "veiculos", VeiculoSchema);
    }
}

export class VeiculoSchema {
    id: Number
    marca: string
    modelo: string
    ano: Number    
    url: string
    titulo: string
    site: string
    status: string
    historicos: VeiculoHistoricoSchema[];
    imagens: VeiculoImagemSchema[];

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
    id: Number
    valor: Number
    quilometragem: Number
    descricao: string
    datahora: string
    veiculo_id: Number

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
    id: Number
    url: string
    veiculo_id: Number

    constructor(props) {
        this.id = 0;
        this.url = "";
        this.veiculo_id = 0;

        LoadFromObject(this, props);
    }
}
