import {
  SiteSchema,
  VeiculoSchema,
  VeiculoHistoricoSchema,
  VeiculoImagemSchema,
} from "../schemas.js";

export default function Veiculo(props) {
  let site = new SiteSchema(props);
  // site = Object.assign(props);

  console.log(site);

  return site.veiculos.map((veiculo) => `<p>${veiculo.titulo}</p>`).join("");
}
