export default function Site(site) {
    var _a;
    console.log(site);
    return (_a = site.veiculos) === null || _a === void 0 ? void 0 : _a.map((veiculo) => `<p><a href="${veiculo.url}" target="_blank"> ${veiculo.titulo}</a></p>`).join("");
}
