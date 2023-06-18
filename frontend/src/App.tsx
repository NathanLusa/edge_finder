import { useEffect, useState } from "react";
import Checkbox from "./components/Checkbox";
import DropdownButton from "./components/DropdownButton";
import { SiteSchema, VeiculoSchema } from "./schemas";
import { getVeiculos, updateStatusveiculo } from "./services";
import { orderByString } from "./utils";

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

        this.list.map(item => {
            if (item.id === id) {
                item.checked = !item.checked;
            }

            _allChecked = _allChecked && item.checked;
        });
        this.allChecked = _allChecked;
    }

    add({ ...props }: FilterItem<T>) {
        let _hasId = false;
        this.list.map(item => (_hasId = _hasId || item.id === props.id));
        if (!_hasId) this.list?.push(props);
    }

    getList(): T[] {
        const _list: T[] = [];
        this.list.map(item => _list.push(item.id));
        return _list;
    }
}

export default function App() {
    const [filterSites, setFilterSites] = useState<Filter<string>>(new Filter<string>());
    const [filterMarca, setFilterMarca] = useState<Filter<string>>(new Filter<string>());
    const [filterModelo, setFilterModelo] = useState<Filter<string>>(new Filter<string>());
    const [filterAno, setFilterAno] = useState<Filter<string>>(new Filter<string>());

    const [veiculosReadOnly, setVeiculosReadOnly] = useState<VeiculoSchema[]>([]);
    const [veiculos, setVeiculos] = useState<VeiculoSchema[]>([]);

    useEffect(() => {
        loadVeiculosAxios();
    }, []);

    async function loadVeiculosAxios() {
        const _sites: SiteSchema[] = await getVeiculos();
        afterLoadVeiculosAxios(_sites);
        // setSite(_sites);
    }

    function afterLoadVeiculosAxios(_sites: SiteSchema[]) {
        console.log("setSite");
        const _veiculos: VeiculoSchema[] = [];
        const _filterSites = new Filter<string>();
        const _filterMarca = new Filter<string>();
        const _filterModelo = new Filter<string>();
        const _filterAno = new Filter<string>();

        _sites.map(site => {
            _filterSites.add({ id: site.url, title: site.nome, checked: false });
            site.veiculos?.map(veiculo => {
                _filterMarca.add({ id: veiculo.marca, title: veiculo.marca, checked: false });
                _filterModelo.add({ id: veiculo.modelo, title: veiculo.modelo, checked: false });
                _filterAno.add({ id: veiculo.ano.toString(), title: veiculo.ano.toString(), checked: false });
                _veiculos.push(veiculo);
            });
        });

        setVeiculosReadOnly(_veiculos);
        setVeiculos(_veiculos);
        setFilterSites(_filterSites);
        setFilterMarca(_filterMarca);
        setFilterModelo(_filterModelo);
        setFilterAno(_filterAno);
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

    function handleCheckFiltro(filter: Filter<string>, item: string) {
        filter.toggleItem(item);
        filtrar();
    }

    function getItemsDropdownButtonFilter(filter: Filter<string>) {
        orderByString(filter.list, "title");
        return [
            filter.list.map((item, key) => (
                <li key={key} className="w-auto py-1 px-2 hover:bg-gray-200">
                    {/* <Checkbox name={item.toString() + "-" + key.toString()} title={item.toString()} onChange={_ => handleCheckFiltro(filter, item.toString())} /> */}
                    <Checkbox name={item.title + "-" + key.toString()} title={item.title} onChange={_ => handleCheckFiltro(filter, item.id.toString())} />
                </li>
            )),
        ];
    }

    function filtrar() {
        let _veiculos = veiculosReadOnly;

        const _sites = [...filterSites.list.filter(_site => _site.checked).map(_site => _site.id)];
        const _marcas = [...filterMarca.list.filter(_marca => _marca.checked).map(_marca => _marca.id)];
        const _modelos = [...filterModelo.list.filter(_modelo => _modelo.checked).map(_modelo => _modelo.id)];
        const _anos = [...filterAno.list.filter(_ano => _ano.checked).map(_ano => _ano.id)];

        // console.log(_sites, filterSites);
        if (!filterSites.allChecked && _sites.length > 0) {
            _veiculos = _veiculos.filter(veiculo => _sites.indexOf(veiculo.site) >= 0);
        }

        if (!filterMarca.allChecked && _marcas.length > 0) {
            _veiculos = _veiculos.filter(veiculo => _marcas.indexOf(veiculo.marca) >= 0);
        }

        if (!filterModelo.allChecked && _modelos.length > 0) {
            _veiculos = _veiculos.filter(veiculo => _modelos.indexOf(veiculo.modelo) >= 0);
        }

        if (!filterAno.allChecked && _anos.length > 0) {
            _veiculos = _veiculos.filter(veiculo => _anos.indexOf(veiculo.ano.toString()) >= 0);
        }

        setVeiculos(_veiculos);
    }

    console.log("Render");
    return (
        <div className="container row-auto flex-row h-auto mx-auto">
            {/* TITLE */}
            <h1 className="text-center text-3xl p-4">Edge finder</h1>

            {/* FILTER */}
            <div className="flex justify-center border">
                <DropdownButton title="Site" items={getItemsDropdownButtonFilter(filterSites)} />
                <DropdownButton title="Marca" items={getItemsDropdownButtonFilter(filterMarca)} />
                <DropdownButton title="Modelo" items={getItemsDropdownButtonFilter(filterModelo)} />
                <DropdownButton title="Ano" items={getItemsDropdownButtonFilter(filterAno)} />
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
