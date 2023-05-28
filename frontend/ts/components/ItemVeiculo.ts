import { VeiculoSchema } from "../schemas";
import { ItemVeiculoCarousel } from "./ItemVeiculoCarousel.js";
import { ItemVeiculoHistorico } from "./ItemVeiculoHistorico.js";

export function ItemVeiculo(veiculo: VeiculoSchema) {
    return `
    <div class="row mb-3 border">

        <!-- ESQUREDA | IMAGEM -->
        <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12 m-3">
            ${ItemVeiculoCarousel(veiculo)}            
        </div>

        <!-- DIREITA | DESCRICAO -->
        <div class="col-xl-7 col-lg-7 col-md-12 col-sm-12 mt-3">
            <div class="overflow-scroll" style="max-height: 400px">
                <div class="d-flex justify-content-between">
                    <h5>
                    <a href="/veiculo/${veiculo.id}" target="_blank">
                        ${veiculo.id} - ${veiculo.titulo}</a>
                    <a href="${
                        veiculo.url
                    }" target="_blank"><i class="fa-solid fa-up-right-from-square"></i></a>
                    </h5>

                    <div class="form-check form-switch">
                        <input class="form-check-input veiculo-status" type="checkbox" data-veiculo_id="${
                            veiculo.id
                        }" checked
                        onchange="setCheckBoxChangeStatusEvent()"
                        >
                    </div>
                </div>

                <div mb-3 bg-body-tertiary w-100">
                    <hr class="hr"/>
                    ${veiculo.historicos
                        ?.map((historico) => ItemVeiculoHistorico(historico))
                        .join("")}
                </div>
            </div>
        </div>
    </div>
    `;
}

// export function createItemVeiculoList(veiculos: any) {
//   return veiculos.map((veiculo: any) => createItemVeiculo(veiculo)).join("");
// }
