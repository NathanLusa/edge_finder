export function ItemVeiculoCarousel(veiculo) {
    var _a;
    function createImagens(imagens) {
        return imagens
            .map((imagem, index) => `
                <div class="carousel-item ${index == 0 ? " active" : ""}">
                        <img data-src="${imagem.url}" class="d-block w-100" alt="..." style="max-height: 300px; max-width: 400px;" loading="lazy">
                    </div>`)
            .join("");
    }
    function semImagem() {
        return `
        <div class="carousel-item active">
            <svg class="bd-placeholder-img bd-placeholder-img-lg d-block w-100"
                width="800" height="400" xmlns="http://www.w3.org/2000/svg" role="img"
                aria-label="Placeholder: First slide"
                preserveAspectRatio="xMidYMid slice" focusable="false">
                <rect width="100%" height="100%" fill="#777"></rect><text x="50%"
                    y="50%" fill="#555" dy=".3em"></text>
            </svg>
        </div>
        `;
    }
    const imagens = ((_a = veiculo === null || veiculo === void 0 ? void 0 : veiculo.imagens) === null || _a === void 0 ? void 0 : _a.filter((imagem) => imagem.status == "ativo")) || [];
    return `
        <div id="carousel-${veiculo.id}-x" class="carousel slide">
            <div class="carousel-inner">
                ${imagens.length > 0 ? createImagens(imagens) : semImagem()}
            </div>
            <button class="carousel-control-prev" type="button"
                data-bs-target="#carousel-${veiculo.id}-x" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button"
                data-bs-target="#carousel-${veiculo.id}-x" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    `;
}
