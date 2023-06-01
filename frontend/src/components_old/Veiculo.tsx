import { VeiculoSchema } from "../schemas"
import VeiculoCarousel from "./VeiculoCarousel"
import VeiculoHistorico from "./VeiculoHistorico"

function Veiculo({ ...veiculo }: VeiculoSchema) {
  return (
    <div className="row mb-3 border">

      <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 m-3">
        <VeiculoCarousel {...veiculo} />
      </div>

      <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12 mt-3">
        {/* <div className="overflow-scroll" style={"max-height": "400px"}}> */}
        <div className="overflow-scroll">
          <div className="d-flex justify-content-between">
            <h5>
              <a href={"/veiculo/" + veiculo.id} target="_blank">{veiculo.id} - {veiculo.titulo}</a>
              <a href={veiculo.url} target="_blank"><i className="fa-solid fa-up-right-from-square"></i></a>
            </h5>

            <div className="form-check form-switch">
              <input className="form-check-input veiculo-status" type="checkbox" data-veiculo_id={veiculo.id} /*checked*/ />
            </div>
          </div>

          <div className="mb-3 bg-body-tertiary w-100">
            <hr className="hr" />
            {veiculo.historicos?.map((historico) => <VeiculoHistorico key={historico.id} {...historico} />)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Veiculo