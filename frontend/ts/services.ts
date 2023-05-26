export async function get_veiculos() {
    console.log("load");
    const response = await fetch("http://127.0.0.1:8000/veiculolista");
    console.log("end load");
    const json = await response.json();
    // return json;
    return new Promise((resolve) => resolve(json));
}

export function verificar_imagens(element: HTMLElement) {
    const response = fetch("http://127.0.0.1:8000/verificarimagens", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });
    // .then((response) => response.json())
    // .then((json) => {
    //   element.innerHTML = "";
    //   for (const imagen of json.imagens) {
    //     console.log(imagen.url);
    //     // element.innerHTML += `<img src="${imagen.url}" alt="imagem" width="200px" height="200px">`;
    //   }
    // });
}
