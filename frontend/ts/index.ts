import { createSite } from "./components/Site.js";
import { get_veiculos, verificar_imagens } from "./services.js";

import Site from "./components/Veiculo.js";

const divFilter = document.getElementById("filter");
const teste = document.getElementById("accordionFlush");
const btn: HTMLElement | null = document.getElementById("btn-teste");
let sites: any = [];

function setCheckBoxChangeStatusEvent() {
    const checkbox_list = document.querySelectorAll("input.veiculo-status");

    checkbox_list.forEach((checkbox: any) => {
        checkbox.addEventListener("change", function () {
            fetch("/api/veiculo/" + checkbox.dataset.veiculo_id + "/status", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    status: checkbox.checked ? "ativo" : "inativo",
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                });
        });
    });
}

function orderByString(property: any) {
    sites = sites.sort((a: any, b: any) => {
        const nameA = a[property].toUpperCase(); // ignore upper and lowercase
        const nameB = b[property].toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }

        // names must be equal
        return 0;
    });
}

function orderByFloat(array: any[], property: any) {
    array = array.sort((a, b) => {
        const nameA = parseFloat(a[property]); // ignore upper and lowercase
        const nameB = parseFloat(b[property]); // ignore upper and lowercase
        return nameA - nameB;
    });
}

if (btn)
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
                const veiculo = site.veiculos.find(
                    (veiculo: any) => veiculo.id === historico.veiculo_id
                );
                if (!veiculos.find((xveiculo) => xveiculo.id === veiculo.id)) {
                    veiculos.push(veiculo);
                }
            }

            site.veiculos = veiculos;
        }
        render();
    };

async function render() {
    let _html = "";

    console.log("start");
    for (const site of sites) {
        _html += createSite(site);
    }
    console.log("end");

    console.log("start innerHTML");
    if (teste) teste.innerHTML = _html;
    console.log("end innerHTML");

    addImageSrc();
    setCheckBoxChangeStatusEvent();
}

function onVisible(element: HTMLElement, callback: any) {
    new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.intersectionRatio > 0) {
                callback(element);
                observer.disconnect();
            }
        });
    }).observe(element);
}

async function addImageSrc() {
    console.log("start image");

    const carousel_list = [...document.getElementsByClassName("carousel")];
    console.log(carousel_list);

    carousel_list.map((carousel: any) => {
        onVisible(carousel, () => {
            const image_list = [...carousel.getElementsByTagName("img")];
            image_list.map((img) => (img.src = img.getAttribute("data-src")));
        });
    });

    console.log("end image");
}

/////
get_veiculos().then((data) => {
    sites = data;

    let _html = "";
    sites.map((site: any) => {
        _html += `${Site(site)}`;
    });
    if (teste) teste.innerHTML = _html;

    // console.log("finish");

    // render();

    // Make filters
});

// window.onload = async () => await render();