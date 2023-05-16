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

btn.onclick = (e) => {
  // verificar_imagens(teste);
  return;
  console.log(sites);
  sites = sites.sort((a, b) => {
    const nameA = a.nome.toUpperCase(); // ignore upper and lowercase
    const nameB = b.nome.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });
  console.log(sites);
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
