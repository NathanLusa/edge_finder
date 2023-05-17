import { createSite } from "./components/Site.js";
import { get_veiculos, verificar_imagens } from "./services.js";

const divFilter = document.getElementById("filter");
const teste = document.getElementById("accordionFlush");
const btn = document.getElementById("btn-teste");
let sites = [];

function setCheckBoxChangeStatusEvent() {
  const checkbox_list = document.querySelectorAll("input.veiculo-status");

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
}

function orderByString(property) {
  sites = sites.sort((a, b) => {
    const nameA = a[property].toUpperCase(); // ignore upper and lowercase
    const nameB = b[property].toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });
}

function orderByFloat(array, property) {
  array = array.sort((a, b) => {
    const nameA = parseFloat(a[property]); // ignore upper and lowercase
    const nameB = parseFloat(b[property]); // ignore upper and lowercase
    return nameA - nameB;
  });
}

btn.onclick = (e) => {
  for (const site of sites) {
    const historicos = [];
    console.log(site.veiculos);

    //coloca todos os históricos em um único array
    for (const veiculo of site.veiculos) {
      for (const historico of veiculo.historicos) {
        historicos.push(historico);
      }
    }

    //ordena esse array
    orderByFloat(historicos, "valor");

    //cria um novo array de veiculos, incluindo pelo veiculo_id do histórico
    const veiculos = [];

    for (const historico of historicos) {
      const veiculo = site.veiculos.find(
        (veiculo) => veiculo.id === historico.veiculo_id
      );
      if (!veiculos.find((xveiculo) => xveiculo.id === veiculo.id)) {
        veiculos.push(veiculo);
      }
    }

    site.veiculos = veiculos;
  }
  render();
};

async function render() {
  let _html = "";

  for (const site of sites) {
    _html += createSite(site);
  }

  teste.innerHTML = _html;

  setCheckBoxChangeStatusEvent();
}

/////
get_veiculos().then((data) => {
  sites = data;
  render();

  // Make filters
});

// window.onload = async () => await render();
