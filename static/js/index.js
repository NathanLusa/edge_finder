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

async function load() {
  const veiculos = await get_veiculos();

  for (const veiculoX of veiculos) {
    teste.innerHTML += await get_item(veiculoX);
  }
}

window.onload = async () => await load();
