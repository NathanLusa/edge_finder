import { createSite } from "./components/Site.js";

async function get_veiculos() {
  const response = await fetch("http://127.0.0.1:8000/veiculolista");
  const json = await response.json();
  return json;
}

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

const teste = document.getElementById("accordionFlush");

async function load() {
  const sites = await get_veiculos();

  let _html = "";

  for (const site of sites) {
    _html += createSite(site);
  }

  teste.innerHTML = _html;

  setCheckBoxChangeStatusEvent();
}

window.onload = async () => await load();
