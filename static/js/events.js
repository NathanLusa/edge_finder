"use strict";
function setCheckBoxChangeStatusEvent(checkbox) {
    // const checkbox_list = document.querySelectorAll("input.veiculo-status");
    // checkbox_list.forEach((checkbox: any) => {
    // checkbox.addEventListener("change", function () {
    fetch("/api/veiculo/" + checkbox.dataset.veiculo_id + "/status", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            status: checkbox.checked ? "ativo" : "inativo",
        }),
    })
        .then((response) => response.json())
        .then((data) => {
        // console.log(data);
    });
    // });
    // });
}
