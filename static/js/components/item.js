async function get_veiculos() {
  const response = await fetch("http://127.0.0.1:8000/veiculolista");
  const json = await response.json();
  return json;
}

async function get_imagens(imagens) {
  const _html2 = `
    <div class="carousel-item active">
        <svg class="bd-placeholder-img bd-placeholder-img-lg d-block w-100" width="800" height="400" xmlns="http://www.w3.org/2000/svg" role="img"
            aria-label="..." preserveAspectRatio="xMidYMid slice" focusable="false">
            <rect width="100%" height="100%" fill="#777"></rect><text x="50%" y="50%" fill="#555" dy=".3em"></text>
        </svg>
    </div>
    `;
  return imagens.forEach((imagem) => {
    return `
        <div class="carousel-item active">
            <img src="${imagem.url}" class="d-block w-100" alt="..." style="max-height: 300px; max-width: 400px;">
        </div>
        `;
  });
}

async function get_item(veiculo) {
  const _html = `
    <div class="row mb-3 border">

        <!-- ESQUREDA | IMAGEM -->
        <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12 m-3">

            <div id="carousel-${veiculo.id}" class="carousel slide">
                <div class="carousel-inner">
                    ${veiculo.imagens
                      .map(
                        (imagem, index) => `
                        <div class="carousel-item${
                          index == 0 ? " active" : ""
                        }">
                            <img srXc="${
                              imagem.url
                            }" class="d-block w-100" alt="..." style="max-height: 300px; max-width: 400px;" loading="lazy">
                        </div>            
                        `
                      )
                      .join("")}
                </div>
                <button class="carousel-control-prev" type="button"
                    data-bs-target="#carousel-${
                      veiculo.id
                    }" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button"
                    data-bs-target="#carousel-${
                      veiculo.id
                    }" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </div>

        <!-- DIREITA | DESCRICAO -->
        <div class="col-xl-7 col-lg-7 col-md-12 col-sm-12 mt-3">
            <div class="overflow-scroll" style="max-height: 400px">
                <div class="d-flex justify-content-between">
                    <h5><a href="${veiculo.url}" target="_blank">
                        ${veiculo.id} - ${veiculo.titulo}</a>
                    </h5>

                    <div class="form-check form-switch">
                        <input class="form-check-input veiculo-status" type="checkbox" data-veiculo_id="${
                          veiculo.id
                        }" checked>
                    </div>
                </div>

                <div mb-3 bg-body-tertiary w-100">
                    <hr class="hr"/>
                    ${veiculo.historicos
                      .map(
                        (historico) =>
                          `
                        <h6>${historico.descricao}</h6>
                        <h6><span class="badge bg-primary"><i class="fa-solid fa-sack-dollar"></i></span> ${historico.valor}</h6>
                        <h6><span class="badge bg-primary"><i class="fa-regular fa-gauge"></i></span> ${historico.quilometragem}</h6>
                        <h6><span class="badge bg-primary"><i class="fa-solid fa-clock"></i></span> ${historico.datahora}</h6>
                        <hr class="hr" />
                       `
                      )
                      .join("")}
                </div>
            </div>
        </div>
    </div>
    `;

  return _html;
}

// const Sites = function () {};

// Sites.prototype.get_template() = async function() {
//   const site = {'nome': 'Teste', 'veiculos': []}
//   let template = `
//     <div class="accordion-item">

//       <!-- ITEM DO SITE | CABECALHO -->
//       <h2 class="accordion-header">
//           <button class="accordion-button " type="button" data-bs-toggle="collapse"
//               data-bs-target="#Xaccordion-${site.nome}" aria-expanded="true" aria-controls="accordion-${site.nome}">
//               <h5>
//                   <span class="badge rounded-pill bg-danger">${0}</span>
//                   ${site.nome}
//               </h5>
//           </button>
//       </h2>

//       <!-- ITEM DO SITE | CORPO (LISTA) -->
//       <div id="Xaccordion-${site.nome}" class="accordion-collapse collapse show" data-bs-parent="#accordionFlushExample">
//           <div class="accordion-body">
//             ${site.veiculos.map((veiculoX) =>
//               get_item(veiculoX).then((data) => data)
//             )}}
//           </div>
//           </div>
//       </div>
//     `;
//   return template;
// };

class SiteItem {
  constructor(site) {
    this.site = site;
    this.veiculo_item = new VeiculoItem();
  }

  async get_template() {
    return `
    <div class="accordion-item">

      <!-- ITEM DO SITE | CABECALHO -->
      <h2 class="accordion-header">
          <button class="accordion-button " type="button" data-bs-toggle="collapse"
              data-bs-target="#Xaccordion-${
                this.site.nome
              }" aria-expanded="true" aria-controls="accordion-${
      this.site.nome
    }">
              <h5>
                  <span class="badge rounded-pill bg-danger">${
                    this.site.veiculos.length
                  }</span>
                  ${this.site.nome}
              </h5>
          </button>
      </h2>

      <!-- ITEM DO SITE | CORPO (LISTA) -->
      <div id="Xaccordion-${
        this.site.nome
      }" class="accordion-collapse collapse show" data-bs-parent="#accordionFlushExample">
          <div class="accordion-body">
            ${await this.veiculo_item.get_template(this.site.veiculos)}
          </div>
          </div>
      </div>
    `;
  }
}

class VeiculoItem {
  constructor() {}

  async get_template(veiculos) {
    let template = "";

    for (const veiculo of veiculos) {
      template += await get_item(veiculo);
    }
    return template;
  }
}

class ContentPane {
  constructor(site) {
    this.site = site;
  }

  async getTemplate() {
    const filmsTemplate = await new Films().render();
    let template = `
        <div class="contentPane" id="contentPane">
        ${filmsTemplate}
        ${this.site}
        </div>
    `;
    return template;
  }
}

class Films {
  constructor() {}

  async render() {
    var template = this.getTemplate();
    const val = await template;
    return val;
    //based on the value resolved by promise,
    //appropriate template should be returned to parent
  }

  async getTemplate() {
    //make network call
    //create template based on server response
    return await new Promise((resolve) => {
      resolve("123");
    });
  }
}
