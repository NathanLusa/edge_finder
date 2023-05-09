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
