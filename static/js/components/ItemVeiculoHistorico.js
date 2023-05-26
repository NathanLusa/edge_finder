function createItemVeiculoHistorico(historico) {
    return `
    <h6>${historico.descricao}</h6>
    <h6><span class="badge bg-primary"><i class="fa-solid fa-sack-dollar"></i></span> ${historico.valor}</h6>
    <h6><span class="badge bg-primary"><i class="fa-regular fa-gauge"></i></span> ${historico.quilometragem}</h6>
    <h6><span class="badge bg-primary"><i class="fa-solid fa-clock"></i></span> ${historico.datahora}</h6>
    <hr class="hr" />
`;
}
export function createItemVeiculoHistoricoList(veiculo) {
    return veiculo.historicos
        .map((historico) => createItemVeiculoHistorico(historico))
        .join("");
}
