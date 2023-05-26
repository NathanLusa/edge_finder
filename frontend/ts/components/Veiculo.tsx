import { SiteSchema } from "../schemas";

export default function Site(site: SiteSchema) {
    console.log(site);
    return site.veiculos
        ?.map(
            (veiculo) =>
                `<p><a href="${veiculo.url}" target="_blank"> ${veiculo.titulo}</a></p>`
        )
        .join("");
}

// export default function Paragrafo() {
//     return (
//         <div>
//             <p> 'Teste' </p>
//         </div>
//     );
// }
