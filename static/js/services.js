var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function get_veiculos() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("load");
        const response = yield fetch("http://127.0.0.1:8000/veiculolista");
        console.log("end load");
        const json = yield response.json();
        // return json;
        return new Promise((resolve) => resolve(json));
    });
}
export function verificar_imagens(element) {
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
