checkbox_list = document.querySelectorAll("input.veiculo-status");

checkbox_list.forEach((checkbox) => {
  checkbox.addEventListener("change", function () {
    fetch("/veiculo/" + this.dataset.veiculo_id + "/status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: this.checked ? "ativo" : "inativo" }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  });
});

const teste = document.getElementById("teste");

async function get_site(site) {
  return `
    <div class="accordion-item">

    <!-- ITEM DO SITE | CABECALHO -->
    <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
            data-bs-target="#Xaccordion-${
              site.nome
            }" aria-expanded="false" aria-controls="accordion-${site.nome}">
            <h5>
                <span class="badge rounded-pill bg-danger">${0}</span>
                ${site.nome}
            </h5>
        </button>
    </h2>

    <!-- ITEM DO SITE | CORPO (LISTA) -->
    <div id="Xaccordion-${
      site.nome
    }" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
        <div class="accordion-body">
          ${() => {
            for (const veiculoX of site.veiculos) {
              get_item(veiculoX);
            }
          }}
        </div>
        </div>
    </div>
  `;
}

async function load() {
  const sites = await get_veiculos();

  let _html = "";

  for (const site of sites) {
    _html += await get_site(site);
    // for (const veiculoX of site.veiculos) {
    //   _html += await get_item(veiculoX);
    // }
  }

  teste.innerHTML = _html;
}

window.onload = async () => await load();
