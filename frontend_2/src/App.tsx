import { useEffect, useState } from 'react'
import { SiteSchema } from './schemas'
import { getVeiculos } from "./services"
import Veiculo from './components/Veiculo'

function App() {
  const [sites, useSite] = useState<SiteSchema[]>([])
  
  useEffect(() => {getVeiculosAxios()}, [])

  const getVeiculosAxios = async () => {
    const sites = await getVeiculos()
    useSite(sites)
  }


  return (
    <>
      {sites.map((site, key) => {

        return (
          <div key={key} className="accordion-item">

          <h2 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                  data-bs-target={"#accordion-"+site.nome} aria-expanded="false"
                  aria-controls={"accordion-"+site.nome}>
                  <h5>
                      <span className="badge rounded-pill bg-danger">{site.veiculos?.length}</span>
                      {site.nome}
                  </h5>
              </button>
          </h2>

          <div id={"accordion-"+site.nome} className="accordion-collapse collapse" data-bs-parent="#accordionFlush">
              <div className="accordion-body">
                  {site.veiculos?.map((veiculo) => Veiculo(veiculo))}
              </div>
          </div>
          </div>       
          ) 
      })}
    </>
  )
}

export default App
