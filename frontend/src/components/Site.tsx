// import { useState } from 'react'
// import { getVeiculos } from "../services"
import { SiteSchema } from '../schemas'
import Veiculo from './Veiculo'


// function Site({nome, veiculos}: SiteSchema) {
function Site({ ...site }: SiteSchema) {
  // const [site, setSite] = useState()

  return (
    <div className="accordion-item" >
      <h2 className="accordion-header">
        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
          data-bs-target={"#accordion-" + site.nome} aria-expanded="false"
          aria-controls={"accordion-" + site.nome}>
          <h5>
            <span className="badge rounded-pill bg-danger">{site.veiculos?.length}</span>
            {site.nome}
          </h5>
        </button>
      </h2>

      <div id={"accordion-" + site.nome} className="accordion-collapse collapse" data-bs-parent="#accordionFlush">
        <div className="accordion-body">
          {site.veiculos?.map((veiculo) => <Veiculo key={veiculo.id} {...veiculo} />)}
        </div>
      </div>
    </div>
  )
}

export default Site
