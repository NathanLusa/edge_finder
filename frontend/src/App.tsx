import { useEffect, useState } from 'react'
import { SiteSchema } from './schemas'
import { getVeiculos } from "./services"
import Site from './components/Site'

function App() {
  const [sites, useSite] = useState<SiteSchema[]>([])

  useEffect(() => { GetVeiculosAxios() }, [])

  const GetVeiculosAxios = async () => {
    const sites = await getVeiculos()
    useSite(sites)
  }

  return (
    <div className="container p-5">
      <h1>Edge finder</h1>

      <div id="filter">
        <button id="btn-teste">TESTE</button>
      </div>

      <div className="accordion accordion-flush">
        {/* {sites.map((site, key) => Site(site, key))} */}
        {/* {sites.map((site, key) => <Site key={key} id={site.id} nome={site.nome} veiculos={site.veiculos} />)} */}
        {sites.map((site, key) => <Site key={key} {...site} />)}
      </div>

    </div>
  )
}

export default App
