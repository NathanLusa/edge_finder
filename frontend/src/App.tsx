import { useEffect, useState } from "react";
import Checkbox from "./components/Checkbox";
import DropdownButton from "./components/DropdownButton";
import { SiteSchema, VeiculoSchema } from "./schemas";
import { getVeiculos, updateStatusveiculo } from "./services";

interface FilterItem<T> {
    id: T;
    title: string;
    checked: boolean;
}

class Filter<T> {
    list: FilterItem<T>[] = [];
    allChecked = false;

    toggleItem(id: T) {
        let _allChecked = true;
        this.list = this.list.map(item => {
            if (item.id === id) {
                item.checked = !item.checked;
            }

            _allChecked = _allChecked && item.checked;
            return item;
        });
        this.allChecked = _allChecked;
    }

    add({ ...props }: FilterItem<T>) {
        this.list?.push(props);
    }
}

export default function App() {
    let anoFilter = new Filter<string>();

    const [filterSites, setFilterSites] = useState<string[]>([]);
    const [filterMarca, setFilterMarca] = useState<string[]>([]);
    const [filterModelo, setFilterModelo] = useState<string[]>([]);
    const [filterAno, setFilterAno] = useState<number[]>([]);

    const [sites, setSite] = useState<SiteSchema[]>([]);
    const [veiculos, setVeiculos] = useState<VeiculoSchema[]>([]);

    useEffect(() => {
        loadVeiculosAxios();
    }, []);

    useEffect(() => {
        console.log("useEffect sites");
        const _veiculos: VeiculoSchema[] = [];
        const filterSites = new Set<string>();
        const filterMarca = new Set<string>();
        const filterModelo = new Set<string>();
        const filterAno = new Set<number>();

        sites.map(site => {
            filterSites.add(site.nome);
            site.veiculos?.map(veiculo => {
                filterMarca.add(veiculo.marca);
                filterModelo.add(veiculo.modelo);
                filterAno.add(veiculo.ano);
                _veiculos.push(veiculo);
            });
        });

        setVeiculos(_veiculos);
        setFilterSites([...filterSites]);
        setFilterMarca([...filterMarca]);
        setFilterModelo([...filterModelo]);
        setFilterAno([...filterAno]);
    }, [sites]);

    useEffect(() => {
        console.log("mudando o filtro do ano");
        anoFilter.list = [];

        filterAno.map(item => anoFilter.add({ id: item.toString(), title: item.toString(), checked: false }));

        console.log("useEffect filterAno", anoFilter);
    }, [filterAno]);

    async function loadVeiculosAxios() {
        const sites = await getVeiculos();
        setSite(sites);
    }

    function handleCheckVeiculo(id: number) {
        const newList = veiculos.map(veiculo => {
            if (veiculo.id === id) {
                const updatedItem = {
                    ...veiculo,
                    status: veiculo.status != "ativo" ? "ativo" : "inativo",
                };
                updateStatusveiculo(updatedItem.id, updatedItem.status).then(response => console.log(response));
                return updatedItem;
            }
            return veiculo;
        });

        setVeiculos(newList);
    }

    function handleCheckFiltro(item: string) {
        anoFilter.toggleItem(item);
        console.log("handleCheckFiltro", anoFilter);
        filtrar();
    }

    function getItemsDropdownButton(list: string[] | number[]) {
        return [
            list.map((item, key) => (
                <li key={key} className="w-auto py-1 px-2 hover:bg-gray-200">
                    <Checkbox name={item.toString() + "-" + key.toString()} title={item.toString()} onChange={_ => handleCheckFiltro(item.toString())} />
                </li>
            )),
        ];
    }

    function filtrar() {
        let _veiculos = veiculos.filter(item => {
            let _ehAno = false;
            anoFilter.list.map(_ano => (_ehAno = _ehAno || (_ano.checked && _ano.id === item.ano.toString())));
            return _ehAno;
        });
        setVeiculos(_veiculos);
    }

    return (
        <div className="container row-auto flex-row h-auto mx-auto">
            {/* TITLE */}
            <h1 className="text-center text-3xl p-4">Edge finder</h1>

            {/* FILTER */}
            <div className="flex justify-center border">
                <DropdownButton title="Site" items={getItemsDropdownButton(filterSites)} />
                <DropdownButton title="Marca" items={getItemsDropdownButton(filterMarca)} />
                <DropdownButton title="Modelo" items={getItemsDropdownButton(filterModelo)} />
                <DropdownButton title="Ano" items={getItemsDropdownButton(filterAno)} />
            </div>

            {/* MAIN */}
            <main className="flex flex-wrap justify-center gap-y-4 gap-x-2 pt-4 xl:px-0">
                {veiculos.map((veiculo, key) => (
                    <div key={key} className="flex-col rounded-lg max-w-md p-1 basis-full xl:basis-3/12 bg-white shadow-2xl border">
                        {/* Image */}
                        <div className="flex items-center h-80 rounded-lg">
                            <img
                                className="flex-shrink-0 mx-auto max-h-80 w-fist m-auto rounded-md"
                                alt=""
                                src={veiculo.imagens && veiculo.imagens.length > 0 ? veiculo.imagens[0].url : ""}
                                loading="lazy"
                            />
                        </div>

                        {/* Content */}
                        <div className="col-span-2 h-28 mt-1 p-2 rounded-sm bg-slate-200 ">
                            <div className="flex text-lg font-medium place-content-between">
                                <a href={veiculo.url} target="_blank">
                                    {veiculo.marca} {veiculo.modelo} {veiculo.status}
                                </a>
                                <div onClick={() => handleCheckVeiculo(veiculo.id)} className="hover:cursor-pointer">
                                    <i className={(veiculo.status != "ativo" ? "fa-regular" : "fa-solid") + " fa-circle-check"} />
                                </div>
                            </div>
                            <div className="flex flex-col pt-0.5 border-t border-gray-400">
                                {veiculo.historicos?.map((historico, index) => (
                                    <div key={index} className="flex place-content-between">
                                        <p className="">{new Date(historico.datahora).toLocaleDateString("sv")}</p>
                                        <p>KM: {historico.quilometragem}</p>
                                        <p>Preço: {historico.valor}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Footer */}
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
