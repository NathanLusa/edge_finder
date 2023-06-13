import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8000",
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

export async function updateStatusveiculo(id: number, status: string) {
    const response = await instance.post(`api/veiculo/${id}/status`, { status: status }, { headers: { "Content-Type": "application/json" } });
    return response;
}
