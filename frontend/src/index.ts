// import { Site } from "./components/Site.js";
// import { SiteSchema } from "./schemas.js";
// import { getVeiculos, verificarStatusImagens } from "./services.js";
// import {
//     arrayHasValue,
//     orderByNumber,
//     orderByString,
//     orderByFloat,
// } from "./utils.js";

// const divFilter = document.getElementById("filter");
// const teste = document.getElementById("accordionFlush");
// const btn: HTMLElement | null = document.getElementById("btn-teste");
// let sites: any = [];

// if (btn) {
//     btn.onclick = (e) => {
//         // fetch("/verificarimagens", {
//         //     method: "POST",
//         // });
//         // return;

//         render();
//         return;

//         for (const site of sites) {
//             const historicos = [];
//             console.log(site.veiculos);

//             //coloca todos os históricos em um único array
//             for (const veiculo of site.veiculos) {
//                 for (const historico of veiculo.historicos) {
//                     historicos.push(historico);
//                 }
//             }

//             //ordena esse array
//             orderByFloat(historicos, "valor");

//             //cria um novo array de veiculos, incluindo pelo veiculo_id do histórico
//             const veiculos = [];

//             for (const historico of historicos) {
//                 const veiculo = site.veiculos.find(
//                     (veiculo: any) => veiculo.id === historico.veiculo_id
//                 );
//                 if (!veiculos.find((xveiculo) => xveiculo.id === veiculo.id)) {
//                     veiculos.push(veiculo);
//                 }
//             }

//             site.veiculos = veiculos;
//         }
//         render();
//     };
// }

// async function render() {
//     let _html = "";

//     console.log("start");
//     for (const site of sites) {
//         _html += Site(site);
//     }
//     console.log("end");

//     console.log("start innerHTML");
//     if (teste) teste.innerHTML = _html;
//     console.log("end innerHTML");

//     addImageSrc();
//     // setCheckBoxChangeStatusEvent();
// }

// function onVisible(element: HTMLElement, callback: any) {
//     new IntersectionObserver((entries, observer) => {
//         entries.forEach((entry) => {
//             if (entry.intersectionRatio > 0) {
//                 callback(element);
//                 observer.disconnect();
//             }
//         });
//     }).observe(element);
// }

// async function addImageSrc() {
//     console.log("start image");

//     const carousel_list = [...document.getElementsByClassName("carousel")];
//     console.log(carousel_list);

//     carousel_list.map((carousel: any) => {
//         onVisible(carousel, () => {
//             const image_list = [...carousel.getElementsByTagName("img")];
//             image_list.map((img) => (img.src = img.getAttribute("data-src")));
//         });
//     });

//     console.log("end image");
// }

// function makeFilters(_sites: SiteSchema[]) {
//     console.log("start makeFilter");
//     let sites: string[] = [];

//     let marcas: string[] = [];

//     let modelos: string[] = [];

//     let anos: Number[] = [];

//     _sites.map((site) => {
//         if (!arrayHasValue<string>(sites, site.nome)) sites.push(site.nome);

//         site.veiculos?.map((veiculo) => {
//             if (!arrayHasValue<string>(marcas, veiculo.marca))
//                 marcas.push(veiculo.marca);

//             if (!arrayHasValue<string>(modelos, veiculo.modelo))
//                 modelos.push(veiculo.modelo);

//             if (!arrayHasValue<Number>(anos, veiculo.ano))
//                 anos.push(veiculo.ano);
//         });
//     });

//     // console.log(_sites);
//     // console.log(sites);
//     // console.log(marcas);
//     // console.log(modelos);
//     // console.log(anos);

//     // Create filters
//     function filterHTML<T>(nome: string, lista: Array<T>) {
//         return `
//     <div class="btn-group">
//         <button class="btn btn-primary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
//             ${nome}
//         </button>
//         <ul class="dropdown-menu">
//             ${lista
//                 .map(
//                     (item) =>
//                         `<li><a class="dropdown-item" href="#">${item}</a></li>`
//                 )
//                 .join("")}
//         </ul>
//     </div>
//     `;
//     }

//     orderByString(sites);
//     orderByString(marcas);
//     orderByString(modelos);
//     orderByNumber(anos);

//     const filterElement = document.getElementById("filter");
//     filterElement
//         ? (filterElement.innerHTML =
//               filterElement.innerHTML +
//               filterHTML("Sites", sites) +
//               filterHTML("Marcas", marcas) +
//               filterHTML("Modelos", modelos) +
//               filterHTML("Anos", anos))
//         : null;
//     console.log("end makeFilter");
// }

// /////
// get_veiculos().then((data) => {
//     sites = data;

//     console.log("finish");

//     render();

//     makeFilters(sites);

//     // if (teste) teste.innerHTML = teste.innerHTML + Hello("Olá mundo");
// });

// // window.onload = async () => await render();

// // const App = () => (
// //     <div>
// //       <Button onClick={() => alert(1)}>Click 11</Button>
// //       <Button onClick={() => alert(2)}>Click 12</Button>
// //       <Button onClick={() => alert(3)}>Click 13</Button>
// //     </div>
// //   );

// //   const rootElement = document.getElementById("root");
// //   rootElement.appendChild(<App />);
