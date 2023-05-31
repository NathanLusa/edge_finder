import { SiteSchema } from "../schemas"
import Site from "./Site"

function Accordion(sites: SiteSchema[]) {
  return (
    <div className="accordion accordion-flush">
      {sites.map((site, key) =>
        <Site key={key} site={site} />
      )}
    </div>
  )

}

export default Accordion