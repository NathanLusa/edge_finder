import { ItemVeiculo } from "./ItemVeiculo.js";
import { SiteSchema } from "../schemas.js";

export function Site(site: SiteSchema) {
    return `
    <div class="accordion-item">

        <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                data-bs-target="#accordion-${site.nome}" aria-expanded="false"
                aria-controls="accordion-${site.nome}">
                <h5>
                    <span class="badge rounded-pill bg-danger">${
                        site.veiculos?.length
                    }</span>
                    ${site.nome}
                </h5>
            </button>
        </h2>

        <!-- ITEM DO SITE | CORPO (LISTA) -->
        <div id="accordion-${
            site.nome
        }" class="accordion-collapse collapse" data-bs-parent="#accordionFlush">
            <div class="accordion-body">
                ${site.veiculos
                    ?.map((veiculo) => ItemVeiculo(veiculo))
                    .join("")}
            </div>
        </div>
    </div>
`;
}
