function LoadFromObject(object: any, props: any, exclude_keys: any = []) {
    [...Object.keys(props)].map((key: any) => {
        if (!exclude_keys.includes(key)) {
            object[key] = props[key];
        }
    });
}

function LoadArrayFromObject(object: any, props: any, key: string, schema: any) {
    if (key in props) {
        props[key].map((item: any) => object[key].push(new schema(item)));
    }
}

type propSiteSchema = {
    id: Number
    nome: String
    veiculos?: VeiculoSchema[]
}

export class SiteSchema {
    id = 0;
    nome = "";
    veiculos: VeiculoSchema[] = [];
    
    constructor(props: propSiteSchema) {
        LoadFromObject(this, props, ["veiculos"]);
        LoadArrayFromObject(this, props, "veiculos", VeiculoSchema);
    }
}

export class VeiculoSchema {
    id = 0;
    marca = "";
    modelo = "";
    ano = 0;
    url = "";
    titulo = "";
    site = "";
    status = "";
    historicos = [];
    imagens = [];

    constructor(props: any) {
        LoadFromObject(this, props, ["historicos", "imagens"]);
        LoadArrayFromObject(this, props, "historicos", VeiculoHistoricoSchema);
        LoadArrayFromObject(this, props, "imagens", VeiculoImagemSchema);
    }
}

export class VeiculoHistoricoSchema {
    id = 0;
    valor = 0.0;
    quilometragem = 0;
    descricao = "";
    datahora = "";
    veiculo_id = 0;

    constructor(props: any) {
        LoadFromObject(this, props);
    }
}

export class VeiculoImagemSchema {
    id = 0;
    url = "";
    veiculo_id = 0;

    constructor(props: any) {
        LoadFromObject(this, props);
    }
}
