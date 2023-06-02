// import { useEffect, useState } from 'react'
// import { SiteSchema } from './schemas'
// import { getVeiculos } from "./services"
// import Site from './components_old/Site'

function App() {
    // const [sites, useSite] = useState<SiteSchema[]>([])

    // useEffect(() => { GetVeiculosAxios() }, [])

    // const GetVeiculosAxios = async () => {
    //   const sites = await getVeiculos()
    //   useSite(sites)
    // }

    const veiculos = [
        {
            id: 1,
            marca: "Ford",
            modelo: "Edge",
            ano: 2013,
            url: "https://pr.olx.com.br/regiao-de-curitiba-e-paranagua/autos-e-pecas/carros-vans-e-utilitarios/edge-limited-awd-1107289912",
            titulo: "Edge Limited AWD",
            site: "https://www.olx.com.br",
            status: "indisponivel",
        },
        {
            id: 2,
            marca: "Ford",
            modelo: "Edge",
            ano: 2013,
            url: "https://pr.olx.com.br/regiao-de-curitiba-e-paranagua/autos-e-pecas/carros-vans-e-utilitarios/ford-edge-limited-3-5-v6-24v-awd-aut-1151311492",
            titulo: "FORD EDGE LIMITED 3.5 V6 24V AWD Aut.",
            site: "https://www.olx.com.br",
            status: "ativo",
        },
        {
            id: 3,
            marca: "Ford",
            modelo: "Edge",
            ano: 2013,
            url: "https://pr.olx.com.br/regiao-de-curitiba-e-paranagua/autos-e-pecas/carros-vans-e-utilitarios/ford-edge-limited-3-5-v6-24v-awd-aut-2013-1174652575",
            titulo: "FORD EDGE LIMITED 3.5 V6 24V AWD AUT 2013",
            site: "https://www.olx.com.br",
            status: "indisponivel",
        },
        {
            id: 4,
            marca: "Ford",
            modelo: "Edge",
            ano: 2013,
            url: "https://pr.olx.com.br/regiao-de-curitiba-e-paranagua/autos-e-pecas/carros-vans-e-utilitarios/ford-edge-revisada-segundo-dono-1171372088",
            titulo: "Ford Edge Revisada Segundo Dono",
            site: "https://www.olx.com.br",
            status: "indisponivel",
        },
        {
            id: 5,
            marca: "Ford",
            modelo: "Edge",
            ano: 2012,
            url: "https://pr.olx.com.br/regiao-de-curitiba-e-paranagua/autos-e-pecas/carros-vans-e-utilitarios/ford-edege-limited-2012-awd-1180872331",
            titulo: "Ford Edege Limited 2012 AWD",
            site: "https://www.olx.com.br",
            status: "ativo",
        },
    ];

    return (
        <div className="container row-auto flex-row h-screen bg-sky-800 border">
            {/* TITLE */}
            <h1 className="text-center bg-blue-500">Edge finder</h1>

            {/* MAIN */}
            <main className="grid grid-flow-row grid-cols-1 md:grid-cols-2 pt-2 gap-4 px-4 h-screen justify-center bg-red-600">
                {veiculos.map((veiculo, key) => (
                    <div
                        key={key}
                        className="flex-col rounded-lg max-w-md px-1 bg-yellow-300"
                    >
                        <div className="h-40 bg-green-400">
                            <p>Imagem</p>
                        </div>
                        <div className="col-span-2 h-14 text-slate-100 bg-blue-400">
                            <a href={veiculo.url}>
                                {veiculo.marca} {veiculo.modelo}{" "}
                                {veiculo.status}
                            </a>
                            <p>Preço: 12.000</p>
                        </div>

                        <div className="grid grid-flow-col justify-between items-center h-10 px-4 bg-red-400">
                            <h6>
                                <span className="badge">
                                    <i className="fa-solid fa-sack-dollar"></i>
                                </span>{" "}
                                {veiculo.ano}
                            </h6>
                            <h6>
                                <span className="badge">
                                    <i className="fa-regular fa-gauge"></i>
                                </span>{" "}
                                12000
                            </h6>
                            <h6>
                                <span className="badge">
                                    <i className="fa-solid fa-clock"></i>
                                </span>{" "}
                                Pato Branco - PR
                            </h6>
                        </div>
                    </div>
                ))}
            </main>
        </div>
    );
}

export default App;
