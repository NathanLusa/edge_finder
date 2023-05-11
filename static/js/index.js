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
  let veiculos = "";
  for (const veiculoX of site.veiculos) {
    veiculos += await get_item(veiculoX);
  }

  return `
    <div class="accordion-item">

    <!-- ITEM DO SITE | CABECALHO -->
    <h2 class="accordion-header">
        <button class="accordion-button " type="button" data-bs-toggle="collapse"
            data-bs-target="#Xaccordion-${
              site.nome
            }" aria-expanded="true" aria-controls="accordion-${site.nome}">
            <h5>
                <span class="badge rounded-pill bg-danger">${0}</span>
                ${site.nome}
            </h5>
        </button>
    </h2>

    <!-- ITEM DO SITE | CORPO (LISTA) -->
    <div id="Xaccordion-${
      site.nome
    }" class="accordion-collapse collapse show" data-bs-parent="#accordionFlushExample">
        <div class="accordion-body">
          ${veiculos}
        </div>
        </div>
    </div>
  `;
}

async function load() {
  const sites = await get_veiculos();

  let _html = "";

  // new ContentPane("Teste 123").getTemplate().then((template) => {
  //   console.log(template);
  // });
  for (const site of sites) {
    new SiteItem(site)
      .get_template()
      .then((template) => (teste.innerHTML += template));
    // new Sites().get_template().then((template) => console.log(template));
    // _html += await get_site(site);
    // for (const veiculoX of site.veiculos) {
    //   _html += await get_item(veiculoX);
    // }
  }

  // teste.innerHTML = _html;
}

window.onload = async () => await load();
