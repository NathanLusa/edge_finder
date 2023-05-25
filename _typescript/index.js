System.register([], function (exports_1) {
    var SiteSchema, VeiculoSchema, VeiculoHistoricoSchema, VeiculoImagemSchema;

    function LoadFromObject(object, props, exclude_keys) {
        if (exclude_keys === void 0) {
            exclude_keys = [];
        }
        Object.keys(props)
            .slice()
            .map(function (key) {
                if (!exclude_keys.includes(key)) {
                    object[key] = props[key];
                }
            });
    }

    function LoadArrayFromObject(object, props, key, schema) {
        if (key in props) {
            props[key].map(function (item) {
                return object[key].push(new schema(item));
            });
        }
    }

    return {
        setters: [],
        execute: function () {
            SiteSchema = (function () {
                function SiteSchema(props) {
                    this.id = 0;
                    this.nome = "";
                    this.veiculos = [];
                    LoadFromObject(this, props, ["veiculos"]);
                    LoadArrayFromObject(this, props, "veiculos", VeiculoSchema);
                }
                return SiteSchema;
            })();

            exports_1("SiteSchema", SiteSchema);

            VeiculoSchema = (function () {
                function VeiculoSchema(props) {
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
                    LoadArrayFromObject(
                        this,
                        props,
                        "historicos",
                        VeiculoHistoricoSchema
                    );
                    LoadArrayFromObject(
                        this,
                        props,
                        "imagens",
                        VeiculoImagemSchema
                    );
                }
                return VeiculoSchema;
            })();

            exports_1("VeiculoSchema", VeiculoSchema);

            VeiculoHistoricoSchema = (function () {
                function VeiculoHistoricoSchema(props) {
                    this.id = 0;
                    this.valor = 0.0;
                    this.quilometragem = 0;
                    this.descricao = "";
                    this.datahora = "";
                    this.veiculo_id = 0;
                    LoadFromObject(this, props);
                }
                return VeiculoHistoricoSchema;
            })();

            exports_1("VeiculoHistoricoSchema", VeiculoHistoricoSchema);

            VeiculoImagemSchema = (function () {
                function VeiculoImagemSchema(props) {
                    this.id = 0;
                    this.url = "";
                    this.veiculo_id = 0;
                    LoadFromObject(this, props);
                }
                return VeiculoImagemSchema;
            })();

            exports_1("VeiculoImagemSchema", VeiculoImagemSchema);
        },
    };
});
