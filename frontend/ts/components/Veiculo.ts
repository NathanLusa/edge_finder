import {
    SiteSchema,
    VeiculoSchema,
    VeiculoHistoricoSchema,
    VeiculoImagemSchema,
} from "../schemas.js";

export default function Site(site: SiteSchema) {
    console.log(site);
    return site.veiculos
        ?.map(
            (veiculo) =>
                `<p><a href="${veiculo.url}" target="_blank"> ${veiculo.titulo}</a></p>`
        )
        .join("");
}
