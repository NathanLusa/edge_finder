import { VeiculoImagemSchema, VeiculoSchema } from "../schemas";

function VeiculoCarousel(veiculo: VeiculoSchema) {

    function semImagem() {
        return (
            <div className="carousel-item active">
                <svg className="bd-placeholder-img bd-placeholder-img-lg d-block w-100"
                    width="800" height="400" xmlns="http://www.w3.org/2000/svg" role="img"
                    aria-label="Placeholder: First slide"
                    preserveAspectRatio="xMidYMid slice" focusable="false">
                    <rect width="100%" height="100%" fill="#777"></rect><text x="50%"
                        y="50%" fill="#555" dy=".3em"></text>
                </svg>
            </div>
        )
    }

    const imagens = veiculo?.imagens?.filter((imagem: VeiculoImagemSchema) => imagem.status == "ativo") || [];

    return (
        <div id={"carousel-"+veiculo.id} className="carousel slide">
            <div className="carousel-inner">
                {imagens.length > 0 ? 
                    imagens.map( (imagem, index) => (
                        <div className={"carousel-item " + (index == 0 ? "active" : "")}>
                            <img data-src={imagem.url} className="d-block w-100" alt="..." loading="lazy" />
                            {/* <img data-src={imagem.url} className="d-block w-100" alt="..." style="max-height: 300px; max-width: 400px;" loading="lazy"> */}
                        </div>)
                    )
                    : semImagem()}
            </div>
            <button className="carousel-control-prev" type="button"
                data-bs-target={"#carousel-"+veiculo.id} data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button"
                data-bs-target={"#carousel-"+veiculo.id} data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
        )
}

export default VeiculoCarousel