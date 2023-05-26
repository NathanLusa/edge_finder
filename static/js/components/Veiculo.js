import { SiteSchema, } from "../schemas.js";
export default function Site(props) {
    const site = new SiteSchema(props);
    console.log(site);
    return site.veiculos.map((veiculo) => `<p><a href="${veiculo.url}" target="_blank"> ${veiculo.titulo}</a></p>`).join("");
}
