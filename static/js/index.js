var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Site } from "./components/Site.js";
import { get_veiculos } from "./services.js";
import { arrayHasValue, orderByNumber, orderByString, orderByFloat, } from "./utils.js";
const divFilter = document.getElementById("filter");
const teste = document.getElementById("accordionFlush");
const btn = document.getElementById("btn-teste");
let sites = [];
if (btn) {
    btn.onclick = (e) => {
        // fetch("/verificarimagens", {
        //     method: "POST",
        // });
        // return;
        render();
        return;
        for (const site of sites) {
            const historicos = [];
            console.log(site.veiculos);
            //coloca todos os históricos em um único array
            for (const veiculo of site.veiculos) {
                for (const historico of veiculo.historicos) {
                    historicos.push(historico);
                }
            }
            //ordena esse array
            orderByFloat(historicos, "valor");
            //cria um novo array de veiculos, incluindo pelo veiculo_id do histórico
            const veiculos = [];
            for (const historico of historicos) {
                const veiculo = site.veiculos.find((veiculo) => veiculo.id === historico.veiculo_id);
                if (!veiculos.find((xveiculo) => xveiculo.id === veiculo.id)) {
                    veiculos.push(veiculo);
                }
            }
            site.veiculos = veiculos;
        }
        render();
    };
}
function render() {
    return __awaiter(this, void 0, void 0, function* () {
        let _html = "";
        console.log("start");
        for (const site of sites) {
            _html += Site(site);
        }
        console.log("end");
        console.log("start innerHTML");
        if (teste)
            teste.innerHTML = _html;
        console.log("end innerHTML");
        addImageSrc();
        // setCheckBoxChangeStatusEvent();
    });
}
function onVisible(element, callback) {
    new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.intersectionRatio > 0) {
                callback(element);
                observer.disconnect();
            }
        });
    }).observe(element);
}
function addImageSrc() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("start image");
        const carousel_list = [...document.getElementsByClassName("carousel")];
        console.log(carousel_list);
        carousel_list.map((carousel) => {
            onVisible(carousel, () => {
                const image_list = [...carousel.getElementsByTagName("img")];
                image_list.map((img) => (img.src = img.getAttribute("data-src")));
            });
        });
        console.log("end image");
    });
}
function makeFilters(_sites) {
    console.log("start makeFilter");
    let sites = [];
    let marcas = [];
    let modelos = [];
    let anos = [];
    _sites.map((site) => {
        var _a;
        if (!arrayHasValue(sites, site.nome))
            sites.push(site.nome);
        (_a = site.veiculos) === null || _a === void 0 ? void 0 : _a.map((veiculo) => {
            if (!arrayHasValue(marcas, veiculo.marca))
                marcas.push(veiculo.marca);
            if (!arrayHasValue(modelos, veiculo.modelo))
                modelos.push(veiculo.modelo);
            if (!arrayHasValue(anos, veiculo.ano))
                anos.push(veiculo.ano);
        });
    });
    // console.log(_sites);
    // console.log(sites);
    // console.log(marcas);
    // console.log(modelos);
    // console.log(anos);
    // Create filters
    function filterHTML(nome, lista) {
        return `
    <div class="btn-group">
        <button class="btn btn-primary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            ${nome}
        </button>
        <ul class="dropdown-menu">
            ${lista
            .map((item) => `<li><a class="dropdown-item" href="#">${item}</a></li>`)
            .join("")}
        </ul>
    </div>    
    `;
    }
    orderByString(sites);
    orderByString(marcas);
    orderByString(modelos);
    orderByNumber(anos);
    const filterElement = document.getElementById("filter");
    filterElement
        ? (filterElement.innerHTML =
            filterElement.innerHTML +
                filterHTML("Sites", sites) +
                filterHTML("Marcas", marcas) +
                filterHTML("Modelos", modelos) +
                filterHTML("Anos", anos))
        : null;
    console.log("end makeFilter");
}
/////
get_veiculos().then((data) => {
    sites = data;
    console.log("finish");
    render();
    makeFilters(sites);
});
// window.onload = async () => await render();
