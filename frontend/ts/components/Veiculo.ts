import {
    SiteSchema,
    VeiculoSchema,
    VeiculoHistoricoSchema,
    VeiculoImagemSchema,
} from "../schemas.js";

// import "../schemas.js";

export default function Site(props: any) {
    const site = new SiteSchema(props);

    console.log(site);

    return site.veiculos.map((veiculo) => `<p>${veiculo.titulo}</p>`).join("");
}
