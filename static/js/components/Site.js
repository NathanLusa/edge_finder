import { ItemVeiculo } from "./ItemVeiculo.js";
export function Site(site) {
    var _a, _b;
    return `
    <div class="accordion-item">

        <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                data-bs-target="#accordion-${site.nome}" aria-expanded="false"
                aria-controls="accordion-${site.nome}">
                <h5>
                    <span class="badge rounded-pill bg-danger">${(_a = site.veiculos) === null || _a === void 0 ? void 0 : _a.length}</span>
                    ${site.nome}
                </h5>
            </button>
        </h2>

        <!-- ITEM DO SITE | CORPO (LISTA) -->
        <div id="accordion-${site.nome}" class="accordion-collapse collapse" data-bs-parent="#accordionFlush">
            <div class="accordion-body">
                ${(_b = site.veiculos) === null || _b === void 0 ? void 0 : _b.map((veiculo) => ItemVeiculo(veiculo)).join("")}
            </div>
        </div>
    </div>
`;
}
