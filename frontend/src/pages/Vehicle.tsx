import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { VeiculoSchema } from "../schemas";
import { getVeiculo, getVeiculoHistoricos, getVeiculoImagens, verificarImagensVeiculo } from "../services";

export default function VehiclePage() {
    const [veiculo, setVeiculo] = useState<VeiculoSchema>();
    const { id } = useParams();

    useEffect(() => {
        loadVeiculosAxios();
    }, []);

    async function loadVeiculosAxios() {
        if (id) {
            const _veiculo: VeiculoSchema = await getVeiculo(id);
            _veiculo.imagens = await getVeiculoImagens(id);
            _veiculo.historicos = await getVeiculoHistoricos(id);

            console.log(_veiculo);
            setVeiculo(_veiculo);
        }
    }

    function handleCheckImages(id: number) {
        verificarImagensVeiculo(id).then(response => console.log(response.data));
    }

    return (
        <>
            {veiculo ? (
                <div className="container row-auto flex-row h-auto mx-auto text-center">
                    {/* HEADER */}
                    <div className="flex text-center text-3xl gap-1 items-center justify-center">
                        <h1 className="p-4">Veículo {id}</h1>
                        <div className="hover:cursor-pointer">
                            <i className={veiculo.status != "ativo" ? "fa-regular fa-circle-xmark text-red-700" : "fa-solid fa-circle-check text-green-700"} />
                        </div>
                        <div className="hover:cursor-pointer">
                            <i className={(veiculo.favorito ? "fa-solid" : "fa-regular") + " fa-star text-yellow-500"} />
                        </div>

                        <div onClick={() => handleCheckImages(veiculo.id)} className="hover:cursor-pointer">
                            <i className={"fa-solid fa-circle-check text-green-700"} />
                        </div>
                    </div>

                    {/* DESCRICAO */}
                    <ul>
                        <li>{veiculo.titulo}</li>
                        <li>
                            {veiculo.marca} {veiculo.modelo} {veiculo.ano}
                            {"  "}
                        </li>
                        <li>{veiculo.cidade}</li>
                        <li>
                            <a href={veiculo.url} target="_blank">
                                Link
                            </a>
                        </li>
                    </ul>

                    {/* HISTÓRICO */}
                    <div className="flex flex-col pt-0.5 border-t mb-5 border-gray-400">
                        {veiculo.historicos?.map((historico, index) => (
                            <div key={index} className="flex place-content-between gap-5 px-4 sm:place-content-center border-b border-gray-400">
                                <p className="">{new Date(historico.datahora).toLocaleDateString("sv")}</p>
                                <p>KM: {historico.quilometragem}</p>
                                <p>Preço: {historico.valor}</p>
                                <p className="text-gray-400">{historico.descricao}</p>
                            </div>
                        ))}
                    </div>

                    {/* IMAGENS */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-2 border-2 border-gray-600">
                        {veiculo.imagens?.map(imagem => (
                            <img key={imagem.id} className="w-auto" src={imagem.url} />
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    <h1>Veiculo não encontrado</h1>
                </div>
            )}
        </>
    );
}
