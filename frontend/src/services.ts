import axios from "axios";

const instance = axios.create({
    baseURL: "http://127.0.0.1:8000",
});

export async function getVeiculos() {
    const response = await instance.get("veiculolista");
    return response.data;
}

export async function verificarStatusImagens() {
    const response = await instance.post("verificarimagens", {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response;
}
