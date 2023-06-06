import { useEffect, useState } from "react";
import { SiteSchema, VeiculoSchema } from "./schemas";
import { getVeiculos } from "./services";
// import Site from './components_old/Site'

function App() {
    const [sites, useSite] = useState<SiteSchema[]>([]);
    const [veiculos, useVeiculos] = useState<VeiculoSchema[]>([]);

    useEffect(() => {
        GetVeiculosAxios();
    }, []);

    const GetVeiculosAxios = async () => {
        const sites = await getVeiculos();
        useSite(sites);

        const _veiculos: VeiculoSchema[] = [];

        sites.map((site: SiteSchema) => {
            site.veiculos?.map((veiculo) => _veiculos.push(veiculo));
        });

        useVeiculos(_veiculos);
        console.log(_veiculos);
    };

    // const veiculos = [
    //     {
    //         id: 1,
    //         marca: "Ford",
    //         modelo: "Edge",
    //         ano: 2013,
    //         url: "https://pr.olx.com.br/regiao-de-curitiba-e-paranagua/autos-e-pecas/carros-vans-e-utilitarios/edge-limited-awd-1107289912",
    //         titulo: "Edge Limited AWD",
    //         site: "https://www.olx.com.br",
    //         status: "indisponivel",
    //     },
    //     {
    //         id: 2,
    //         marca: "Ford",
    //         modelo: "Edge",
    //         ano: 2013,
    //         url: "https://pr.olx.com.br/regiao-de-curitiba-e-paranagua/autos-e-pecas/carros-vans-e-utilitarios/ford-edge-limited-3-5-v6-24v-awd-aut-1151311492",
    //         titulo: "FORD EDGE LIMITED 3.5 V6 24V AWD Aut.",
    //         site: "https://www.olx.com.br",
    //         status: "ativo",
    //     },
    //     {
    //         id: 3,
    //         marca: "Ford",
    //         modelo: "Edge",
    //         ano: 2013,
    //         url: "https://pr.olx.com.br/regiao-de-curitiba-e-paranagua/autos-e-pecas/carros-vans-e-utilitarios/ford-edge-limited-3-5-v6-24v-awd-aut-2013-1174652575",
    //         titulo: "FORD EDGE LIMITED 3.5 V6 24V AWD AUT 2013",
    //         site: "https://www.olx.com.br",
    //         status: "indisponivel",
    //     },
    //     {
    //         id: 4,
    //         marca: "Ford",
    //         modelo: "Edge",
    //         ano: 2013,
    //         url: "https://pr.olx.com.br/regiao-de-curitiba-e-paranagua/autos-e-pecas/carros-vans-e-utilitarios/ford-edge-revisada-segundo-dono-1171372088",
    //         titulo: "Ford Edge Revisada Segundo Dono",
    //         site: "https://www.olx.com.br",
    //         status: "indisponivel",
    //     },
    //     {
    //         id: 5,
    //         marca: "Ford",
    //         modelo: "Edge",
    //         ano: 2012,
    //         url: "https://pr.olx.com.br/regiao-de-curitiba-e-paranagua/autos-e-pecas/carros-vans-e-utilitarios/ford-edege-limited-2012-awd-1180872331",
    //         titulo: "Ford Edege Limited 2012 AWD",
    //         site: "https://www.olx.com.br",
    //         status: "ativo",
    //     },
    // ];

    return (
        <div className="container row-auto flex-row h-screen mx-auto border bg-gray-200">
            {/* TITLE */}
            <h1 className="text-center text-3xl m-4">Edge finder</h1>

            {/* <h1 className="text-center collapse sm:visible bg-blue-500">
                Edge finder sm
            </h1>
            <h1 className="text-center collapse md:visible bg-blue-500">
                Edge finder md
            </h1>
            <h1 className="text-center collapse lg:visible bg-blue-500">
                Edge finder lg
            </h1>
            <h1 className="text-center collapse xl:visible bg-blue-500">
                Edge finder xl
            </h1>
            <h1 className="text-center collapse 2xl:visible bg-blue-500">
                Edge finder 2xl
            </h1>
            <h1 className="text-center collapse 3xl:visible bg-blue-500">
                Edge finder 3xl
            </h1> */}

            {/* MAIN */}
            <main className="flex flex-wrap justify-center gap-y-4 gap-x-2 pt-4 xl:px-0">
                {veiculos.map((veiculo, key) => (
                    <div
                        key={key}
                        className="flex-col rounded-lg max-w-md px-1 basis-full xl:basis-3/12 bg-white shadow-2xl border"
                    >
                        <div className="h-80 rounded-lg">
                            <img
                                className="max-h-80 w-fist m-auto rounded-md"
                                src={
                                    veiculo.imagens &&
                                    veiculo.imagens.length > 0
                                        ? veiculo.imagens[0].url
                                        : ""
                                }
                                alt=""
                                loading="lazy"
                            />
                        </div>
                        <div className="col-span-2 h-28 p-2 rounded-sm bg-slate-200 ">
                            <a href={veiculo.url} target="_blank">
                                {veiculo.marca} {veiculo.modelo}{" "}
                                {veiculo.status}
                            </a>
                            <div className="flex flex-col">
                                {veiculo.historicos?.map((historico, index) => (
                                    <div
                                        key={index}
                                        className="flex gap-2 xl:gap-1"
                                    >
                                        <p className="">
                                            {new Date(
                                                historico.datahora
                                            ).toLocaleDateString("sv")}
                                        </p>
                                        <p>Preço: {historico.valor}</p>
                                        <p>KM: {historico.quilometragem}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-flow-col justify-between items-center h-10 px-4 rounded-sm bg-blue-400">
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
