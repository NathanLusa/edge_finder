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

    const range = Array.from(Array(5).keys()).map((x) => x + 1);

    return (
        <div className="container row-auto flex-row h-screen border">
            {/* TITLE */}
            <h1 className="text-center bg-blue-500">Edge finder</h1>

            {/* MAIN */}
            <main className="container flex-row h-screen pt-2 bg-slate-200">
                {range.map((_, key) => (
                    <div key={key}>
                        {/* <h5 className="bg-success border" key={key}>Teste {value}</h5> */}

                        <div className="container bg-yellow-300 mb-3 border">
                            <div className="grid grid-flow-col auto-cols-fr bg-blue-300">
                                <div className=" bg-green-400">
                                    <svg
                                        className="d-block"
                                        // width="400" height="200"
                                        // xmlns="http://www.w3.org/2000/svg"
                                        // role="img"
                                        // aria-label="Placeholder: First slide"
                                        // preserveAspectRatio="xMidYMid slice"
                                        // focusable="false"
                                    >
                                        <rect
                                            width="100%"
                                            height="100%"
                                            fill="#777"
                                        ></rect>
                                        <text
                                            x="50%"
                                            y="50%"
                                            fill="#555"
                                            dy=".3em"
                                        ></text>
                                    </svg>
                                </div>
                                <div className=" bg-blue-700">
                                    <p>teste</p>
                                </div>
                            </div>

                            <div className="grid grid-flow-col bg-red-400">
                                <p className="">Ano: 2022</p>
                                <p className="">KM: 186000</p>
                                <p className="">Pato Branco - PR</p>
                            </div>
                        </div>
                    </div>
                ))}
            </main>
        </div>
    );
}

export default App;
