import {
  SiteSchema,
  VeiculoSchema,
  VeiculoHistoricoSchema,
  VeiculoImagemSchema,
} from "../schemas.js";

export default function Site(props) {
  const site = new SiteSchema(props);

  console.log(site);

  return site.veiculos
    .map((veiculo) => {
      const _veiculo = new VeiculoSchema(veiculo);
      return `<p>${_veiculo.titulo}</p>`;
    })
    .join("");
}
