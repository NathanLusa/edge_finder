import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8000",
});

export async function getVeiculos() {
    const response = await instance.get("veiculolista");
    return response.data;
}

export async function getVeiculo(id: string) {
    const response = await instance.get(`api/veiculo/${id}`);
    return response.data;
}

export async function getVeiculoHistoricos(id: string) {
    const response = await instance.get(`api/veiculo/${id}/historicos`);
    return response.data;
}

export async function getVeiculoImagens(id: string) {
    const response = await instance.get(`api/veiculo/${id}/imagens`);
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

export async function updateVeiculoFavorito(id: number, _favorito: boolean) {
    console.log(_favorito);
    const response = await instance.post(`api/veiculo/${id}/favorito`, { favorito: _favorito }, { headers: { "Content-Type": "application/json" } });
    return response;
}

export async function verificarImagensVeiculo(id: number) {
    const response = await instance.post(
        `api/veiculo/${id}/verificarimagens`
        // { headers: { "Content-Type": "application/json" } }
    );
    return response;
}
