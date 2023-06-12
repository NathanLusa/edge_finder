// import { VeiculoSchema } from "./schemas";
import DropdownButton from "./components/DropdownButton";
import { useEffect, useState } from "react";
import { SiteSchema, VeiculoSchema } from "./schemas";
import {
    getVeiculos,
    updateStatusveiculo,
    verificarStatusImagens,
} from "./services";
// import Site from './components_old/Site'
import { generateArray } from "./utils";

function App() {
    let filterSites = new Set<string>();
    let filterMarca = new Set<string>();
    let filterModelo = new Set<string>();
    let filterAno = new Set<number>();

    const [sites, setSite] = useState<SiteSchema[]>([]);
    const [veiculos, setVeiculos] = useState<VeiculoSchema[]>([]);

    useEffect(() => {
        GetVeiculosAxios();
    }, []);

    const GetVeiculosAxios = async () => {
        const carregar = true;
        let _veiculos: VeiculoSchema[] = [];

        filterSites.clear();
        filterMarca.clear();
        filterModelo.clear();
        filterAno.clear();

        if (carregar) {
            const sites = await getVeiculos();
            setSite(sites);

            sites.map((site: SiteSchema) => {
                filterSites.add(site.nome);
                site.veiculos?.map((veiculo) => {
                    filterMarca.add(veiculo.marca);
                    filterModelo.add(veiculo.modelo);
                    filterAno.add(veiculo.ano);
                    _veiculos.push(veiculo);
                });
            });
        } else {
            _veiculos = [
                {
                    modelo: "Edge",
                    marca: "Ford",
                    url: "https://pr.olx.com.br/regiao-de-curitiba-e-paranagua/autos-e-pecas/carros-vans-e-utilitarios/ford-edge-3-0-v6-1194576233",
                    site: "https://www.olx.com.br",
                    id: 1014,
                    ano: 2013,
                    titulo: "Ford Edge 3.0 V6",
                    status: "ativo",
                    created_at: "2023-06-06T09:06:58.987843",
                    historicos: [
                        {
                            quilometragem: 146000,
                            descricao:
                                "Vendo Edge completa AWD 3.0 V6, com teto solar!! 100% revisada!! Tudo funcionando perfeitamente!!",
                            veiculo_id: 1014,
                            created_at: "2023-06-06T09:09:14.992126",
                            datahora: "2023-06-06T06:09:14.989384",
                            valor: 71500,
                            id: 374,
                        },
                    ],
                    imagens: [
                        {
                            id: 5344,
                            url: "https://img.olx.com.br/images/14/141385897312521.jpg",
                            status: "ativo",
                            created_at: "2023-06-06T09:09:14.987043",
                            veiculo_id: 1014,
                        },
                        {
                            id: 5342,
                            url: "https://img.olx.com.br/images/14/142343055835840.jpg",
                            status: "ativo",
                            created_at: "2023-06-06T09:09:14.975206",
                            veiculo_id: 1014,
                        },
                        {
                            id: 5343,
                            url: "https://img.olx.com.br/images/14/144351294444638.jpg",
                            status: "ativo",
                            created_at: "2023-06-06T09:09:14.980477",
                            veiculo_id: 1014,
                        },
                    ],
                },
                {
                    modelo: "Edge",
                    marca: "Ford",
                    url: "https://pr.olx.com.br/regiao-de-curitiba-e-paranagua/autos-e-pecas/carros-vans-e-utilitarios/ford-edge-v6-1193368210",
                    site: "https://www.olx.com.br",
                    id: 1007,
                    ano: 2012,
                    titulo: "Ford EDGE v6 ",
                    status: "ativo",
                    created_at: "2023-06-05T09:31:14.396551",
                    historicos: [
                        {
                            quilometragem: 160000,
                            descricao:
                                "?  FORD / EDGE <br>? ANO: 2011/2012 <br>? Placa: O**-**5 <br>? Motor: 3.5 V6 <br>? Câmbio: AUTOMÁTICO <br>? Km: 169MIL <br>? Combust: GASOLINA <br><br>? COMPLETO <br>? AR CONDICIONADO <br>? VIDROS ELÉTRICOS <br>? AIRBAG <br>? PILOTO AUTOMÁTICO <br>? BANCO ELÉTRICO<br>? BANCOS EM COURO <br>? FAROL DE NEBLINA <br>? COMPUTADOR DE BORDO <br>? PORTA MALAS ELÉTRICOS <br>? MULTIMÍDIA <br>? VOLANTE MULTIFUNCIONAL <br>? PAINEL DIGITAL <br>? STRAT/STOP <br>? CHAVE PRESENCIAL <br>?RETROVISOR ELÉTRICO <br>? AROS DE LIGA LEVE <br>? E MUITO MAIS <br><br><br>?ENTRADA + PARCELAS?<br><br><br>? CONSULTE SEU CPF ?<br><br><br>?  R$ 52.900,00$ <br><br><br>? Garanto  a melhor avaliação no seu usado;<br>? As melhores taxas para financiamento;<br>? Aceito carro e moto como parte do pagamento; mesmo com dívida;<br>? Cartão de crédito em até 18x;<br><br>? DanCAR MULTIMARCAS ?<br><br>? RUA OSMARIO DE LIMA 690 CAPÃO DA IMBUIA",
                            veiculo_id: 1007,
                            created_at: "2023-06-05T09:33:43.044865",
                            datahora: "2023-06-05T06:33:43.042246",
                            valor: 52900,
                            id: 367,
                        },
                    ],
                    imagens: [
                        {
                            id: 5187,
                            url: "https://img.olx.com.br/images/10/100319414922176.jpg",
                            status: "ativo",
                            created_at: "2023-06-05T09:33:43.029956",
                            veiculo_id: 1007,
                        },
                        {
                            id: 5185,
                            url: "https://img.olx.com.br/images/10/103318179165998.jpg",
                            status: "ativo",
                            created_at: "2023-06-05T09:33:43.020287",
                            veiculo_id: 1007,
                        },
                        {
                            id: 5186,
                            url: "https://img.olx.com.br/images/10/104319417689317.jpg",
                            status: "ativo",
                            created_at: "2023-06-05T09:33:43.025086",
                            veiculo_id: 1007,
                        },
                        {
                            id: 5188,
                            url: "https://img.olx.com.br/images/10/105327411936541.jpg",
                            status: "ativo",
                            created_at: "2023-06-05T09:33:43.035150",
                            veiculo_id: 1007,
                        },
                        {
                            id: 5184,
                            url: "https://img.olx.com.br/images/10/109306777353684.jpg",
                            status: "ativo",
                            created_at: "2023-06-05T09:33:43.015277",
                            veiculo_id: 1007,
                        },
                        {
                            id: 5189,
                            url: "https://img.olx.com.br/images/10/109323299066390.jpg",
                            status: "ativo",
                            created_at: "2023-06-05T09:33:43.039935",
                            veiculo_id: 1007,
                        },
                    ],
                },
                {
                    modelo: "Edge",
                    marca: "Ford",
                    url: "https://pr.olx.com.br/regiao-de-curitiba-e-paranagua/autos-e-pecas/carros-vans-e-utilitarios/ford-edge-v6-1193387801",
                    site: "https://www.olx.com.br",
                    id: 1006,
                    ano: 2012,
                    titulo: "FORD EDGE V6",
                    status: "ativo",
                    created_at: "2023-06-05T09:31:14.380643",
                    historicos: [
                        {
                            quilometragem: 160000,
                            descricao: "<br>- Publicado por Revenda Mais.",
                            veiculo_id: 1006,
                            created_at: "2023-06-05T09:33:40.122649",
                            datahora: "2023-06-05T06:33:40.120073",
                            valor: 52900,
                            id: 366,
                        },
                    ],
                    imagens: [
                        {
                            id: 5181,
                            url: "https://img.olx.com.br/images/10/100301891922535.jpg",
                            status: "ativo",
                            created_at: "2023-06-05T09:33:40.107790",
                            veiculo_id: 1006,
                        },
                        {
                            id: 5177,
                            url: "https://img.olx.com.br/images/10/100364175243803.jpg",
                            status: "ativo",
                            created_at: "2023-06-05T09:33:40.086940",
                            veiculo_id: 1006,
                        },
                        {
                            id: 5173,
                            url: "https://img.olx.com.br/images/10/101318538430922.jpg",
                            status: "ativo",
                            created_at: "2023-06-05T09:33:40.067681",
                            veiculo_id: 1006,
                        },
                        {
                            id: 5182,
                            url: "https://img.olx.com.br/images/10/101360410445854.jpg",
                            status: "ativo",
                            created_at: "2023-06-05T09:33:40.112607",
                            veiculo_id: 1006,
                        },
                        {
                            id: 5167,
                            url: "https://img.olx.com.br/images/10/102303772574002.jpg",
                            status: "ativo",
                            created_at: "2023-06-05T09:33:40.039892",
                            veiculo_id: 1006,
                        },
                        {
                            id: 5172,
                            url: "https://img.olx.com.br/images/10/103350172439853.jpg",
                            status: "ativo",
                            created_at: "2023-06-05T09:33:40.062947",
                            veiculo_id: 1006,
                        },
                        {
                            id: 5176,
                            url: "https://img.olx.com.br/images/10/104319179052384.jpg",
                            status: "ativo",
                            created_at: "2023-06-05T09:33:40.082221",
                            veiculo_id: 1006,
                        },
                        {
                            id: 5168,
                            url: "https://img.olx.com.br/images/10/104326290963172.jpg",
                            status: "ativo",
                            created_at: "2023-06-05T09:33:40.044478",
                            veiculo_id: 1006,
                        },
                        {
                            id: 5178,
                            url: "https://img.olx.com.br/images/10/104383895713585.jpg",
                            status: "ativo",
                            created_at: "2023-06-05T09:33:40.092144",
                            veiculo_id: 1006,
                        },
                        {
                            id: 5180,
                            url: "https://img.olx.com.br/images/10/104385419486491.jpg",
                            status: "ativo",
                            created_at: "2023-06-05T09:33:40.101737",
                            veiculo_id: 1006,
                        },
                        {
                            id: 5165,
                            url: "https://img.olx.com.br/images/10/104393774521599.jpg",
                            status: "ativo",
                            created_at: "2023-06-05T09:33:40.029048",
                            veiculo_id: 1006,
                        },
                        {
                            id: 5166,
                            url: "https://img.olx.com.br/images/10/105348292003478.jpg",
                            status: "ativo",
                            created_at: "2023-06-05T09:33:40.035230",
                            veiculo_id: 1006,
                        },
                        {
                            id: 5183,
                            url: "https://img.olx.com.br/images/10/106304537725115.jpg",
                            status: "ativo",
                            created_at: "2023-06-05T09:33:40.117993",
                            veiculo_id: 1006,
                        },
                        {
                            id: 5175,
                            url: "https://img.olx.com.br/images/10/106372653061315.jpg",
                            status: "ativo",
                            created_at: "2023-06-05T09:33:40.077501",
                            veiculo_id: 1006,
                        },
                        {
                            id: 5174,
                            url: "https://img.olx.com.br/images/10/106398410526797.jpg",
                            status: "ativo",
                            created_at: "2023-06-05T09:33:40.072644",
                            veiculo_id: 1006,
                        },
                        {
                            id: 5179,
                            url: "https://img.olx.com.br/images/10/107302534252167.jpg",
                            status: "ativo",
                            created_at: "2023-06-05T09:33:40.096991",
                            veiculo_id: 1006,
                        },
                        {
                            id: 5171,
                            url: "https://img.olx.com.br/images/10/107339059523300.jpg",
                            status: "ativo",
                            created_at: "2023-06-05T09:33:40.058495",
                            veiculo_id: 1006,
                        },
                        {
                            id: 5170,
                            url: "https://img.olx.com.br/images/10/107366051584634.jpg",
                            status: "ativo",
                            created_at: "2023-06-05T09:33:40.053882",
                            veiculo_id: 1006,
                        },
                        {
                            id: 5169,
                            url: "https://img.olx.com.br/images/10/108365652104220.jpg",
                            status: "ativo",
                            created_at: "2023-06-05T09:33:40.049234",
                            veiculo_id: 1006,
                        },
                    ],
                },
                {
                    modelo: "Edge",
                    marca: "Ford",
                    url: "https://pr.olx.com.br/regiao-de-ponta-grossa-e-guarapuava/autos-e-pecas/carros-vans-e-utilitarios/edge-limited-awd-3-5-v6-2-1189461348",
                    site: "https://www.olx.com.br",
                    id: 966,
                    ano: 2012,
                    titulo: "Edge Limited AWD 3.5 V6 2",
                    status: "ativo",
                    created_at: "2023-05-24T16:07:08.603255",
                    historicos: [
                        {
                            quilometragem: 165000,
                            descricao:
                                "EDGE LIMITED AWD 3.5 V6 24V AUT, ano 2012.<br>Todo revisado de 10mil em 10mil kls.<br>4 Pneus novos, todo original!",
                            veiculo_id: 966,
                            created_at: "2023-06-05T09:33:09.351790",
                            datahora: "2023-06-05T06:33:09.348882",
                            valor: 57000,
                            id: 365,
                        },
                        {
                            quilometragem: 165000,
                            descricao:
                                "EDGE LIMITED AWD 3.5 V6 24V AUT, ano 2012.<br>Todo revisado de 10mil em 10mil kls.<br>4 Pneus novos, todo original!",
                            veiculo_id: 966,
                            created_at: "2023-05-24T16:10:11.228425",
                            datahora: "2023-05-24T13:10:11.224492",
                            valor: 64000,
                            id: 310,
                        },
                        {
                            quilometragem: 165000,
                            descricao:
                                "EDGE LIMITED AWD 3.5 V6 24V AUT, ano 2012.<br>Todo revisado de 10mil em 10mil kls.<br>4 Pneus novos, todo original!",
                            veiculo_id: 966,
                            created_at: "2023-05-29T09:37:57.591565",
                            datahora: "2023-05-29T06:37:57.588764",
                            valor: 65000,
                            id: 329,
                        },
                    ],
                    imagens: [
                        {
                            id: 4583,
                            url: "https://img.olx.com.br/images/01/010351162364761.jpg",
                            status: "ativo",
                            created_at: "2023-05-24T16:10:11.153090",
                            veiculo_id: 966,
                        },
                        {
                            id: 4585,
                            url: "https://img.olx.com.br/images/01/011319049573285.jpg",
                            status: "ativo",
                            created_at: "2023-05-24T16:10:11.188038",
                            veiculo_id: 966,
                        },
                        {
                            id: 4591,
                            url: "https://img.olx.com.br/images/01/011388522022324.jpg",
                            status: "ativo",
                            created_at: "2023-05-24T16:10:11.222068",
                            veiculo_id: 966,
                        },
                        {
                            id: 4588,
                            url: "https://img.olx.com.br/images/01/012312762912084.jpg",
                            status: "ativo",
                            created_at: "2023-05-24T16:10:11.204078",
                            veiculo_id: 966,
                        },
                        {
                            id: 4590,
                            url: "https://img.olx.com.br/images/01/012321524405162.jpg",
                            status: "ativo",
                            created_at: "2023-05-24T16:10:11.215908",
                            veiculo_id: 966,
                        },
                        {
                            id: 4586,
                            url: "https://img.olx.com.br/images/01/012327401048832.jpg",
                            status: "ativo",
                            created_at: "2023-05-24T16:10:11.193669",
                            veiculo_id: 966,
                        },
                        {
                            id: 4584,
                            url: "https://img.olx.com.br/images/01/012398285209443.jpg",
                            status: "ativo",
                            created_at: "2023-05-24T16:10:11.182085",
                            veiculo_id: 966,
                        },
                        {
                            id: 4587,
                            url: "https://img.olx.com.br/images/01/014374163667695.jpg",
                            status: "ativo",
                            created_at: "2023-05-24T16:10:11.199083",
                            veiculo_id: 966,
                        },
                        {
                            id: 4589,
                            url: "https://img.olx.com.br/images/01/016352168867478.jpg",
                            status: "ativo",
                            created_at: "2023-05-24T16:10:11.210165",
                            veiculo_id: 966,
                        },
                    ],
                },
                {
                    modelo: "Edge",
                    marca: "Ford",
                    url: "https://pr.olx.com.br/regiao-de-curitiba-e-paranagua/autos-e-pecas/carros-vans-e-utilitarios/ford-edge-limited-awd-2013-aceito-propostas-1176665789",
                    site: "https://www.olx.com.br",
                    id: 15,
                    ano: 2013,
                    titulo: "Ford Edge Limited AWD 2013 - Aceito Propostas",
                    status: "ativo",
                    created_at: "2023-05-05T17:31:04.650802",
                    historicos: [
                        {
                            quilometragem: 138000,
                            descricao:
                                "***  OPORTUNIDADE ÚNICA***  <br>   *** 12k ABAIXO DA FIPE ***<br><br>Vendo Edge Limited 2012/2013 AWD<br><br>MARCA: Ford<br>MODELO: Edge Limited AWD<br>ANO FABRICAÇÃO/ANO MODELO: 2012/2013<br>COR: Branco Sibéria<br>PORTAS: 4<br>QUILOMETRAGEM: 138.000<br>OCUPANTES: 5<br><br>MECÂNICA E SEGURANÇA<br>COMBUSTÍVEL: Gasolina<br>MOTOR: 3.5 V6<br>POTÊNCIA: 289 CV<br>VELOCIDADE MÁXIMA: 180 km/h<br>CÂMBIO: Automático - 6 Velocidades<br>TRAÇÃO: 4x4 Permanente<br>CONTROLE DE TRAÇÃO/ESTABILIDADE: Sim<br>ACELERAÇÃO 0-100KM/H: 9,5 Segundos<br>FREIOS: Disco nas 4 Rodas com ABS + EBD + BAS<br>RODAS: Liga Leve R20<br>AIRBAG: 6<br>DIREÇÃO HIDRÁULICA: Sim<br><br>ACESSÓRIOS/OPCIONAIS<br>BANCOS: Couro com Ajuste Elétrico<br>AR CONDICIONADO: Digital Dual Zone<br>TRIO ELÉTRICO (VIDRO, TRAVA E ESPELHO ELÉTRICO): Sim<br>SISTEMA DE SOM: Rádio AM/FM + CD Player + MP3 Sony<br>VOLANTE: Comandos do Som<br>COMPUTADOR DE BORDO: Sim<br>PILOTO AUTOMÁTICO: Sim<br>CAMERA DE RÉ: Sim<br>BLUETOOTH: Sim<br>SENSOR DE CHUVA: Sim<br>SENSOR DE ESTACIONAMENTO: Traseiro<br><br><br>* Venda apenas para cliente Particular<br>* Não sou lojista<br>* Dispenso lojas e trocas<br>",
                            veiculo_id: 15,
                            created_at: "2023-06-05T09:31:34.801899",
                            datahora: "2023-06-05T06:31:34.798823",
                            valor: 60000,
                            id: 364,
                        },
                        {
                            quilometragem: 138000,
                            descricao:
                                "***  PRA VENDER RÁPIDO ***  10k ABAIXO DA FIPE - Vendo Edge Limited 2012/2013 AWD<br><br>MARCA: Ford<br>MODELO: Edge Limited AWD<br>ANO FABRICAÇÃO/ANO MODELO: 2012/2013<br>COR: Branco Sibéria<br>PORTAS: 4<br>QUILOMETRAGEM: 138.000<br>OCUPANTES: 5<br><br>MECÂNICA E SEGURANÇA<br>COMBUSTÍVEL: Gasolina<br>MOTOR: 3.5 V6<br>POTÊNCIA: 289 CV<br>VELOCIDADE MÁXIMA: 180 km/h<br>CÂMBIO: Automático - 6 Velocidades<br>TRAÇÃO: 4x4 Permanente<br>CONTROLE DE TRAÇÃO/ESTABILIDADE: Sim<br>ACELERAÇÃO 0-100KM/H: 9,5 Segundos<br>FREIOS: Disco nas 4 Rodas com ABS + EBD + BAS<br>RODAS: Liga Leve R20<br>AIRBAG: 6<br>DIREÇÃO HIDRÁULICA: Sim<br><br>ACESSÓRIOS/OPCIONAIS<br>BANCOS: Couro com Ajuste Elétrico<br>AR CONDICIONADO: Digital Dual Zone<br>TRIO ELÉTRICO (VIDRO, TRAVA E ESPELHO ELÉTRICO): Sim<br>SISTEMA DE SOM: Rádio AM/FM + CD Player + MP3 Sony<br>VOLANTE: Comandos do Som<br>COMPUTADOR DE BORDO: Sim<br>PILOTO AUTOMÁTICO: Sim<br>CAMERA DE RÉ: Sim<br>BLUETOOTH: Sim<br>SENSOR DE CHUVA: Sim<br>SENSOR DE ESTACIONAMENTO: Traseiro<br><br><br>* Venda apenas para cliente Particular<br>* Não sou lojista<br>* Dispenso lojas e trocas<br>",
                            veiculo_id: 15,
                            created_at: "2023-06-01T09:01:33.474708",
                            datahora: "2023-06-01T06:01:33.470098",
                            valor: 61900,
                            id: 345,
                        },
                        {
                            quilometragem: 138000,
                            descricao:
                                "***  PRA VENDER RÁPIDO *** Vendo Edge Limited 2012/2013 AWD<br><br>MARCA: Ford<br>MODELO: Edge Limited AWD<br>ANO FABRICAÇÃO/ANO MODELO: 2012/2013<br>COR: Branco Sibéria<br>PORTAS: 4<br>QUILOMETRAGEM: 138.000<br>OCUPANTES: 5<br><br>MECÂNICA E SEGURANÇA<br>COMBUSTÍVEL: Gasolina<br>MOTOR: 3.5 V6<br>POTÊNCIA: 289 CV<br>VELOCIDADE MÁXIMA: 180 km/h<br>CÂMBIO: Automático - 6 Velocidades<br>TRAÇÃO: 4x4 Permanente<br>CONTROLE DE TRAÇÃO/ESTABILIDADE: Sim<br>ACELERAÇÃO 0-100KM/H: 9,5 Segundos<br>FREIOS: Disco nas 4 Rodas com ABS + EBD + BAS<br>RODAS: Liga Leve R20<br>AIRBAG: 6<br>DIREÇÃO HIDRÁULICA: Sim<br><br>ACESSÓRIOS/OPCIONAIS<br>BANCOS: Couro com Ajuste Elétrico<br>AR CONDICIONADO: Digital Dual Zone<br>TRIO ELÉTRICO (VIDRO, TRAVA E ESPELHO ELÉTRICO): Sim<br>SISTEMA DE SOM: Rádio AM/FM + CD Player + MP3 Sony<br>VOLANTE: Comandos do Som<br>COMPUTADOR DE BORDO: Sim<br>PILOTO AUTOMÁTICO: Sim<br>CAMERA DE RÉ: Sim<br>BLUETOOTH: Sim<br>SENSOR DE CHUVA: Sim<br>SENSOR DE ESTACIONAMENTO: Traseiro<br><br><br>* Venda apenas para cliente Particular<br>* Não sou lojista<br>* Dispenso lojas e trocas<br>",
                            veiculo_id: 15,
                            created_at: "2023-05-30T08:58:54.999240",
                            datahora: "2023-05-30T05:58:54.993021",
                            valor: 62900,
                            id: 334,
                        },
                        {
                            quilometragem: 138000,
                            descricao:
                                "***  PRA VENDER RÁPIDO *** Vendo Edge Limited 2012/2013 AWD<br><br>MARCA: Ford<br>MODELO: Edge Limited AWD<br>ANO FABRICAÇÃO/ANO MODELO: 2012/2013<br>COR: Branco Sibéria<br>PORTAS: 4<br>QUILOMETRAGEM: 138.000<br>OCUPANTES: 5<br><br>MECÂNICA E SEGURANÇA<br>COMBUSTÍVEL: Gasolina<br>MOTOR: 3.5 V6<br>POTÊNCIA: 289 CV<br>VELOCIDADE MÁXIMA: 180 km/h<br>CÂMBIO: Automático - 6 Velocidades<br>TRAÇÃO: 4x4 Permanente<br>CONTROLE DE TRAÇÃO/ESTABILIDADE: Sim<br>ACELERAÇÃO 0-100KM/H: 9,5 Segundos<br>FREIOS: Disco nas 4 Rodas com ABS + EBD + BAS<br>RODAS: Liga Leve R20<br>AIRBAG: 6<br>DIREÇÃO HIDRÁULICA: Sim<br><br>ACESSÓRIOS/OPCIONAIS<br>BANCOS: Couro com Ajuste Elétrico<br>AR CONDICIONADO: Digital Dual Zone<br>TRIO ELÉTRICO (VIDRO, TRAVA E ESPELHO ELÉTRICO): Sim<br>SISTEMA DE SOM: Rádio AM/FM + CD Player + MP3 Sony<br>VOLANTE: Comandos do Som<br>COMPUTADOR DE BORDO: Sim<br>PILOTO AUTOMÁTICO: Sim<br>CAMERA DE RÉ: Sim<br>BLUETOOTH: Sim<br>SENSOR DE CHUVA: Sim<br>SENSOR DE ESTACIONAMENTO: Traseiro<br><br><br>* Venda apenas para cliente Particular<br>* Não sou lojista<br>* Dispenso lojas e trocas<br>",
                            veiculo_id: 15,
                            created_at: "2023-05-25T09:01:58.359216",
                            datahora: "2023-05-25T06:01:58.353168",
                            valor: 63900,
                            id: 313,
                        },
                        {
                            quilometragem: 138000,
                            descricao:
                                "***  BAIXOU *** Vendo Edge Limited 2012/2013 AWD<br><br>MARCA: Ford<br>MODELO: Edge Limited AWD<br>ANO FABRICAÇÃO/ANO MODELO: 2012/2013<br>COR: Branco Sibéria<br>PORTAS: 4<br>QUILOMETRAGEM: 138.000<br>OCUPANTES: 5<br><br>MECÂNICA E SEGURANÇA<br>COMBUSTÍVEL: Gasolina<br>MOTOR: 3.5 V6<br>POTÊNCIA: 289 CV<br>VELOCIDADE MÁXIMA: 180 km/h<br>CÂMBIO: Automático - 6 Velocidades<br>TRAÇÃO: 4x4 Permanente<br>CONTROLE DE TRAÇÃO/ESTABILIDADE: Sim<br>ACELERAÇÃO 0-100KM/H: 9,5 Segundos<br>FREIOS: Disco nas 4 Rodas com ABS + EBD + BAS<br>RODAS: Liga Leve R20<br>AIRBAG: 6<br>DIREÇÃO HIDRÁULICA: Sim<br><br>ACESSÓRIOS/OPCIONAIS<br>BANCOS: Couro com Ajuste Elétrico<br>AR CONDICIONADO: Digital Dual Zone<br>TRIO ELÉTRICO (VIDRO, TRAVA E ESPELHO ELÉTRICO): Sim<br>SISTEMA DE SOM: Rádio AM/FM + CD Player + MP3 Sony<br>VOLANTE: Comandos do Som<br>COMPUTADOR DE BORDO: Sim<br>PILOTO AUTOMÁTICO: Sim<br>CAMERA DE RÉ: Sim<br>BLUETOOTH: Sim<br>SENSOR DE CHUVA: Sim<br>SENSOR DE ESTACIONAMENTO: Traseiro<br><br><br>* Venda apenas para cliente Particular<br>* Não sou lojista<br>* Dispenso lojas e trocas<br>",
                            veiculo_id: 15,
                            created_at: "2023-05-17T09:36:28.296868",
                            datahora: "2023-05-17T06:36:28.292405",
                            valor: 66000,
                            id: 161,
                        },
                        {
                            quilometragem: 138000,
                            descricao:
                                "***  BAIXOU *** Vendo Edge Limited 2012/2013 AWD<br><br>MARCA: Ford<br>MODELO: Edge Limited AWD<br>ANO FABRICAÇÃO/ANO MODELO: 2012/2013<br>COR: Branco Sibéria<br>PORTAS: 4<br>QUILOMETRAGEM: 138.000<br>OCUPANTES: 5<br><br>MECÂNICA E SEGURANÇA<br>COMBUSTÍVEL: Gasolina<br>MOTOR: 3.5 V6<br>POTÊNCIA: 289 CV<br>VELOCIDADE MÁXIMA: 180 km/h<br>CÂMBIO: Automático - 6 Velocidades<br>TRAÇÃO: 4x4 Permanente<br>CONTROLE DE TRAÇÃO/ESTABILIDADE: Sim<br>ACELERAÇÃO 0-100KM/H: 9,5 Segundos<br>FREIOS: Disco nas 4 Rodas com ABS + EBD + BAS<br>RODAS: Liga Leve R20<br>AIRBAG: 6<br>DIREÇÃO HIDRÁULICA: Sim<br><br>ACESSÓRIOS/OPCIONAIS<br>BANCOS: Couro com Ajuste Elétrico<br>AR CONDICIONADO: Digital Dual Zone<br>TRIO ELÉTRICO (VIDRO, TRAVA E ESPELHO ELÉTRICO): Sim<br>SISTEMA DE SOM: Rádio AM/FM + CD Player + MP3 Sony<br>VOLANTE: Comandos do Som<br>COMPUTADOR DE BORDO: Sim<br>PILOTO AUTOMÁTICO: Sim<br>CAMERA DE RÉ: Sim<br>BLUETOOTH: Sim<br>SENSOR DE CHUVA: Sim<br>SENSOR DE ESTACIONAMENTO: Traseiro<br><br><br>* Venda apenas para cliente Particular<br>* Não sou lojista<br>* Dispenso lojas e trocas<br>",
                            veiculo_id: 15,
                            created_at: "2023-05-09T02:13:21.953969",
                            datahora: "2023-05-08T23:13:21.948306",
                            valor: 67500,
                            id: 94,
                        },
                        {
                            quilometragem: 138000,
                            descricao:
                                "Ford Edge Limited AWD 2013 - Aceito Propostas",
                            veiculo_id: 15,
                            created_at: "2023-05-05T17:31:04.655379",
                            datahora: "2023-05-05T14:31:04.653009",
                            valor: 71000,
                            id: 15,
                        },
                    ],
                    imagens: [
                        {
                            id: 209,
                            url: "https://img.olx.com.br/images/79/790302162406308.jpg",
                            status: "ativo",
                            created_at: "2023-05-08T09:51:47.742233",
                            veiculo_id: 15,
                        },
                        {
                            id: 204,
                            url: "https://img.olx.com.br/images/79/790365401648429.jpg",
                            status: "ativo",
                            created_at: "2023-05-08T09:51:47.718266",
                            veiculo_id: 15,
                        },
                        {
                            id: 208,
                            url: "https://img.olx.com.br/images/79/790387402452710.jpg",
                            status: "ativo",
                            created_at: "2023-05-08T09:51:47.737235",
                            veiculo_id: 15,
                        },
                        {
                            id: 212,
                            url: "https://img.olx.com.br/images/79/790390640977163.jpg",
                            status: "ativo",
                            created_at: "2023-05-08T09:51:47.756549",
                            veiculo_id: 15,
                        },
                        {
                            id: 221,
                            url: "https://img.olx.com.br/images/79/791338402422705.jpg",
                            status: "ativo",
                            created_at: "2023-05-08T09:51:47.801127",
                            veiculo_id: 15,
                        },
                        {
                            id: 216,
                            url: "https://img.olx.com.br/images/79/792397166547120.jpg",
                            status: "ativo",
                            created_at: "2023-05-08T09:51:47.775795",
                            veiculo_id: 15,
                        },
                        {
                            id: 207,
                            url: "https://img.olx.com.br/images/79/793323403594892.jpg",
                            status: "ativo",
                            created_at: "2023-05-08T09:51:47.732186",
                            veiculo_id: 15,
                        },
                        {
                            id: 214,
                            url: "https://img.olx.com.br/images/79/793345048380367.jpg",
                            status: "ativo",
                            created_at: "2023-05-08T09:51:47.766494",
                            veiculo_id: 15,
                        },
                        {
                            id: 206,
                            url: "https://img.olx.com.br/images/79/794324881313930.jpg",
                            status: "ativo",
                            created_at: "2023-05-08T09:51:47.727843",
                            veiculo_id: 15,
                        },
                        {
                            id: 213,
                            url: "https://img.olx.com.br/images/79/794364529015437.jpg",
                            status: "ativo",
                            created_at: "2023-05-08T09:51:47.761455",
                            veiculo_id: 15,
                        },
                        {
                            id: 217,
                            url: "https://img.olx.com.br/images/79/794382285155918.jpg",
                            status: "ativo",
                            created_at: "2023-05-08T09:51:47.780521",
                            veiculo_id: 15,
                        },
                        {
                            id: 218,
                            url: "https://img.olx.com.br/images/79/795303043176048.jpg",
                            status: "ativo",
                            created_at: "2023-05-08T09:51:47.785088",
                            veiculo_id: 15,
                        },
                        {
                            id: 205,
                            url: "https://img.olx.com.br/images/79/795391643025502.jpg",
                            status: "ativo",
                            created_at: "2023-05-08T09:51:47.722865",
                            veiculo_id: 15,
                        },
                        {
                            id: 215,
                            url: "https://img.olx.com.br/images/79/796349883157383.jpg",
                            status: "ativo",
                            created_at: "2023-05-08T09:51:47.770882",
                            veiculo_id: 15,
                        },
                        {
                            id: 203,
                            url: "https://img.olx.com.br/images/79/796381161132245.jpg",
                            status: "ativo",
                            created_at: "2023-05-08T09:51:47.713050",
                            veiculo_id: 15,
                        },
                        {
                            id: 219,
                            url: "https://img.olx.com.br/images/79/798380045359670.jpg",
                            status: "ativo",
                            created_at: "2023-05-08T09:51:47.790226",
                            veiculo_id: 15,
                        },
                        {
                            id: 220,
                            url: "https://img.olx.com.br/images/79/798395524300699.jpg",
                            status: "ativo",
                            created_at: "2023-05-08T09:51:47.795734",
                            veiculo_id: 15,
                        },
                        {
                            id: 15,
                            url: "https://img.olx.com.br/images/79/798398764451245.jpg",
                            status: "ativo",
                            created_at: "2023-05-05T17:31:04.659956",
                            veiculo_id: 15,
                        },
                        {
                            id: 211,
                            url: "https://img.olx.com.br/images/79/799365402453844.jpg",
                            status: "ativo",
                            created_at: "2023-05-08T09:51:47.752158",
                            veiculo_id: 15,
                        },
                        {
                            id: 210,
                            url: "https://img.olx.com.br/images/79/799365520457577.jpg",
                            status: "ativo",
                            created_at: "2023-05-08T09:51:47.746908",
                            veiculo_id: 15,
                        },
                    ],
                },
                {
                    modelo: "Edge",
                    marca: "Ford",
                    url: "https://pr.olx.com.br/regiao-de-curitiba-e-paranagua/autos-e-pecas/carros-vans-e-utilitarios/ford-edege-limited-2012-awd-1180872331",
                    site: "https://www.olx.com.br",
                    id: 5,
                    ano: 2012,
                    titulo: "Ford Edege Limited 2012 AWD",
                    status: "ativo",
                    created_at: "2023-05-05T17:31:04.498326",
                    historicos: [
                        {
                            quilometragem: 156000,
                            descricao: "Versão top de linha. 4x4 único dono",
                            veiculo_id: 5,
                            created_at: "2023-06-05T09:31:20.470298",
                            datahora: "2023-06-05T06:31:20.466152",
                            valor: 61000,
                            id: 363,
                        },
                        {
                            quilometragem: 156000,
                            descricao: "Ford Edege Limited 2012 AWD",
                            veiculo_id: 5,
                            created_at: "2023-05-05T17:31:04.503457",
                            datahora: "2023-05-05T14:31:04.500881",
                            valor: 63000,
                            id: 5,
                        },
                    ],
                    imagens: [
                        {
                            id: 109,
                            url: "https://img.olx.com.br/images/81/811322760818402.jpg",
                            status: "ativo",
                            created_at: "2023-05-08T09:45:27.220935",
                            veiculo_id: 5,
                        },
                        {
                            id: 112,
                            url: "https://img.olx.com.br/images/81/813394765867639.jpg",
                            status: "ativo",
                            created_at: "2023-05-08T09:45:27.236957",
                            veiculo_id: 5,
                        },
                        {
                            id: 113,
                            url: "https://img.olx.com.br/images/81/814319529396061.jpg",
                            status: "ativo",
                            created_at: "2023-05-08T09:45:27.241874",
                            veiculo_id: 5,
                        },
                        {
                            id: 5,
                            url: "https://img.olx.com.br/images/81/815362405298249.jpg",
                            status: "ativo",
                            created_at: "2023-05-05T17:31:04.508296",
                            veiculo_id: 5,
                        },
                        {
                            id: 111,
                            url: "https://img.olx.com.br/images/81/815393287919380.jpg",
                            status: "ativo",
                            created_at: "2023-05-08T09:45:27.232125",
                            veiculo_id: 5,
                        },
                        {
                            id: 110,
                            url: "https://img.olx.com.br/images/81/819396764159469.jpg",
                            status: "ativo",
                            created_at: "2023-05-08T09:45:27.226521",
                            veiculo_id: 5,
                        },
                    ],
                },
                {
                    modelo: "Edge",
                    marca: "Ford",
                    url: "https://pr.olx.com.br/regiao-de-curitiba-e-paranagua/autos-e-pecas/carros-vans-e-utilitarios/ford-edge-2012-awd-1193018472",
                    site: "https://www.olx.com.br",
                    id: 998,
                    ano: 2012,
                    titulo: "FORD EDGE 2012 AWD",
                    status: "ativo",
                    created_at: "2023-06-02T09:07:06.982713",
                    historicos: [
                        {
                            quilometragem: 133000,
                            descricao:
                                "Vendo Ford Edge 2012 AWD Limited.<br><br>Vendo ou troco por terreno ou outro veículo de maior valor..<br><br>A mais completa da categoria, está a mais de 7 anos comigo nunca deu manutenção. <br><br>",
                            veiculo_id: 998,
                            created_at: "2023-06-02T09:09:34.555353",
                            datahora: "2023-06-02T06:09:34.552950",
                            valor: 65000,
                            id: 354,
                        },
                    ],
                    imagens: [
                        {
                            id: 5051,
                            url: "https://img.olx.com.br/images/09/090390414619849.jpg",
                            status: "ativo",
                            created_at: "2023-06-02T09:09:34.534986",
                            veiculo_id: 998,
                        },
                        {
                            id: 5053,
                            url: "https://img.olx.com.br/images/09/093315173331657.jpg",
                            status: "ativo",
                            created_at: "2023-06-02T09:09:34.546043",
                            veiculo_id: 998,
                        },
                        {
                            id: 5052,
                            url: "https://img.olx.com.br/images/09/096386291569147.jpg",
                            status: "ativo",
                            created_at: "2023-06-02T09:09:34.540408",
                            veiculo_id: 998,
                        },
                        {
                            id: 5054,
                            url: "https://img.olx.com.br/images/09/097392416920610.jpg",
                            status: "ativo",
                            created_at: "2023-06-02T09:09:34.550838",
                            veiculo_id: 998,
                        },
                    ],
                },
                {
                    modelo: "Edge",
                    marca: "Ford",
                    url: "https://pr.olx.com.br/regiao-de-curitiba-e-paranagua/autos-e-pecas/carros-vans-e-utilitarios/ford-edge-entra-parc-r-1-099-00-1184394635",
                    site: "https://www.olx.com.br",
                    id: 991,
                    ano: 2012,
                    titulo: "Ford Edge  *Entra+Parc R$ 1,099,00*",
                    status: "ativo",
                    created_at: "2023-06-01T09:01:13.096084",
                    historicos: [
                        {
                            quilometragem: 131000,
                            descricao:
                                "BEM VINDO A REPUBLICA VEICULOS !!!<br><br>*OPORTUNIDADE  FORD EDGE *<br><br>TRABALHAMOS COM MAIS DE 200 VEICULOS EM ESTOQUE PARA MELHOR ATENDE LO<br>FINANCIAMENTO SEM ENTRADA<br>TRABALHAMOS COM TODOS OS BANCOS DE FINANCIAMENTO<br>APROVAÇÃO SEM CNH<br>FINANCIAMOS PARA SCORE BAIXO<br>APROVAÇÃO FACILITADA PARA APOSENTADOS OU PENSIONISTAS<br>ENTREGAMOS NO CONFORTO DO SEU LAR!<br><br>JA TENTOU APROVAÇAO EM OUTRA LOJA E NAO CONSEGUIU ? ENTRE EM CONTATO CONOSCO,<br><br>-ACEITAMOS SEU USADO NA TROCA COM A MELHOR AVALIAÇÃO DA REGIÃO.<br><br>-PARCELAMOS A ENTRADA EM ATÉ 24X NO CARTÃO DE CREDITO.<br>VENHA VOCE TAMBEM PARA A REPUBLICA VEICULOS A LOJA QUE VAI ACELERAR SEUS SONHOS!!!<br><br>** A Republica veículos trabalha com as principais marcas de veículos, sendo elas: Audi, BMW, Caoa Chery, GM Chevrolet, Chrysler, Citroen, Dodge, Fiat, Ford, Honda, Hyundai, Jac, Jac Motors, Jeep, Kia, Kia Motors, Land Rover, Lexus, Lifan, Maserati, Mercedes Benz, Mercedes-Benz, Mini, Mitsubishi, Nissan, Peugeot, Porsche, Ram, Renault, Smart, SsangYoung, Subaru, Suzuki, Toyota, Triumph, Troller, Vw Volkswagen, Volvo, Yamaha<br><br>** Dentre os principais modelos de veículos temos: Camaro Captiva Celta Classic Cobalt Corsa Sedan Cruze Sport6 Malibu Meriva Montana Omega Onix Prisma S10 Sonic Spin Tracker Trailblazer Vectra GT Zafira Citroen Aircross C3 Picasso C4 Lounge Pallas Picasso Jumper Xsara Dodge Dacota Chalinger Fiat 500 Bravo 147 Brava Doblo Cargo Ducato Fiorino Freemont Grand Siena Idea Linea Uno Mille Palio Adventure Weekend Punto Siena Strada Ford Courier Edge F-250 Fiesta Rocam Focus Fusion Ka New Ranger Honda Accord CR-V City Civic Fit Azera Equus HB20 HR Santa Fe Sonata Tucson Veloster Veracruz I30 CW Ix35 J2 J3 Turin J5 Coupé XF XJ Supersport XKR Cherokee Grand Wrangler Bongo Cadenza Sorento Soul Choque Sportage X60 Ghibli Gran Cabrio CLA Classe A B C Cl 250 Turbo Sport 63 AMG Touring CLS 63 AMG E G Gl Glk Galaxi Landau LTD Puma Gtb Gte Opala Omega 6 Cilindros Subaru Ssangyong Financiamento Seguro Concessionaria Loja Auto Shopping Global Shopping Automotivo Agile Astra Conversível Utilitário S10 Tracker 500 Stilo Uno Fiesta Flex Gasolina Alcool Focus Fusion Ka Power Shift Ranger Civic Crv Azera Elantra Hb20 I30 Ix35 Lancer L200 Pajero 206 207 307 Sw Hoggar Cb 300 Honda Duster Fluence Kangoo Logan Megane Sandero Scenic Corolla Etios Fielder Hilux Amarok Bora Crossfox Fox Fusca Gol Golf Jetta Parati Polo Saveiro Spacefox Tiguan Voyage G4 G5 G6 A3 A4 A6 120i 125i 130i 320i 300c Pt Cruiser Aircross C3 C4 Picasso Xsara Journey Commander Cerato Picanto Sorento Soul Sportage Freelander Evoque Classe A Fortwo Actyon Kyron Impreza Grand Vitara A1 A3 A4 A5 Q3 Q5 Q7 SQ5 TT TTS 1M 116i 118i 120i 125i 328i 330i 335i 420i 118 120 318 320 Cadillac CTS CTS-V Escalade SRX Chevrolet Gran Blazer Bonanza GMC Hummer H1 H2 H3 Lincoln Lobini Caravan Cheyenne Corvette Grand Sport Coupé Cruze Impala Malibu Omega C4 Lounge Picasso C5 C6 C8 DS3 DS4 DS5 Jumper Xantia Xsara Dodge Challenger Charger Dakota Dart Durango Journey Ram Viper Scuderia GTB Cinquecento Freemont Ford Edge Explorer F-1 F-100 F-1000 F-150 F-250 F-350 Focus Fusion Honda Accord CRV Fit HR-V Prelude Hyunday Atos Azera Elantra Equus Galloper Genesis H1 H100 HB20 HB20S HB20X HR I30 IX35 Sonata Terracan Infiniti EX35 FX35 FX37 FX45 FX50 QX56 QX60 QX70 T6 T8 Xterra X-Trail Boxster RCZ Porsche Renault Nne Cayman R S Macan Panamera Spyder Renault Subaru Forester Imprenza Legacy Outback SVX Tribeca XV Camry Corolla Fj Cruiser Hilux SW4 Land Prado Paseo Previa Prius RAV4 Tundra Venza Volkswagen Amarok Eos Fusca Golf Jetta Variant New Beetle Passat Touareg C30 S40 S60 S70 S80 V40 V50 V60 V70 XC60 XC70 XC90 428i Aircross C3 C4 Picasso Captur Kicks March Onix Sandero HRV CRV Versa Kwid Duster Fluence Kangoo Logan Land Rover Siena City Megane Sonata Elantra Escort Fiesta Frontier Blazer Mobi C3 Evoque Santana Ford Ka Celta Passat Jmk5 Mk6 Mk7 Tsi Renegade Montana Strada Pick-Up Caminhonete Moto X1 X6 Virtus Up Boxster S Cayenne Macan Panamera Ram Forester Impreza Legacy Outback Tribeca Camry Etios Prius Rav4 Sw4 Troller T4 Crossfox Fox Variant Polo Saveiro Space Tiguan Tuareg Up Brasilia Tl Volvo Galaxi Gtb Gte Opala Omega Classic L200 Triton Hilux Srv Srx Challenge C180 C200 Ecosport Prisma Cbr1000 Cbr600 R1 Ducati Panigale",
                            veiculo_id: 991,
                            created_at: "2023-06-01T09:03:36.787384",
                            datahora: "2023-06-01T06:03:36.784864",
                            valor: 57900,
                            id: 347,
                        },
                    ],
                    imagens: [
                        {
                            id: 4963,
                            url: "https://img.olx.com.br/images/89/890381645447581.jpg",
                            status: "ativo",
                            created_at: "2023-06-01T09:03:36.772943",
                            veiculo_id: 991,
                        },
                        {
                            id: 4959,
                            url: "https://img.olx.com.br/images/89/891393041824087.jpg",
                            status: "ativo",
                            created_at: "2023-06-01T09:03:36.754488",
                            veiculo_id: 991,
                        },
                        {
                            id: 4965,
                            url: "https://img.olx.com.br/images/89/892318043252098.jpg",
                            status: "ativo",
                            created_at: "2023-06-01T09:03:36.782636",
                            veiculo_id: 991,
                        },
                        {
                            id: 4960,
                            url: "https://img.olx.com.br/images/89/892321643119083.jpg",
                            status: "ativo",
                            created_at: "2023-06-01T09:03:36.759039",
                            veiculo_id: 991,
                        },
                        {
                            id: 4956,
                            url: "https://img.olx.com.br/images/89/892364047395178.jpg",
                            status: "ativo",
                            created_at: "2023-06-01T09:03:36.738563",
                            veiculo_id: 991,
                        },
                        {
                            id: 4957,
                            url: "https://img.olx.com.br/images/89/896359649728212.jpg",
                            status: "ativo",
                            created_at: "2023-06-01T09:03:36.744867",
                            veiculo_id: 991,
                        },
                        {
                            id: 4961,
                            url: "https://img.olx.com.br/images/89/897340643200026.jpg",
                            status: "ativo",
                            created_at: "2023-06-01T09:03:36.763858",
                            veiculo_id: 991,
                        },
                        {
                            id: 4962,
                            url: "https://img.olx.com.br/images/89/897374049339373.jpg",
                            status: "ativo",
                            created_at: "2023-06-01T09:03:36.768428",
                            veiculo_id: 991,
                        },
                        {
                            id: 4964,
                            url: "https://img.olx.com.br/images/89/898328521723345.jpg",
                            status: "ativo",
                            created_at: "2023-06-01T09:03:36.778210",
                            veiculo_id: 991,
                        },
                        {
                            id: 4958,
                            url: "https://img.olx.com.br/images/89/899340768335876.jpg",
                            status: "ativo",
                            created_at: "2023-06-01T09:03:36.749840",
                            veiculo_id: 991,
                        },
                    ],
                },
                {
                    modelo: "Edge",
                    marca: "Ford",
                    url: "https://pr.olx.com.br/regiao-de-curitiba-e-paranagua/autos-e-pecas/carros-vans-e-utilitarios/edge-limited-awd-4x4-2012-urg-a-completa-valor-abaixo-fipe-placa-a-original-1192002427",
                    site: "https://www.olx.com.br",
                    id: 989,
                    ano: 2012,
                    titulo: "Edge Limited AWD 4x4 / 2012- URG./ a + Completa, ''Valor abaixo Fipe''/ Placa A / Original",
                    status: "ativo",
                    created_at: "2023-05-30T16:57:44.981041",
                    historicos: [
                        {
                            quilometragem: 160000,
                            descricao:
                                "FORD EDGE  LIMITED <br>3.5 V6  24V<br>AWD  AUTOMATICA<br>2012<br>BRANCA PEROLIZADO<br><br>COMPLETA<br>TETO SOLAR <br>BANCOS ELETRICOS / COURO<br>RODAS LIGA-LEVE ARO 20''<br>PNEUS NOVOS<br><br>PLACA A - CURITIBA<br>MANUAL DO PROPRIETARIO<br>REVISADO<br><br>NAO TEM LEILAO<br>NAO TEM RS<br>NAO TEM SINISTRO<br>NAO TEM DEBITOS NEM RESTRIÇOES<br>PROCEDENCIA 100%<br>IPVA 2023 QUITADO<br><br>VALOR: $57.990,00 PARA VENDA <br>ESTUDO TROCAS (FIPE: $63.071<br>E/OU FINANCIAMENTOS<br><br>TRATAR VIA <br>FONE OU <br>WHATS:<br>99972-3615",
                            veiculo_id: 989,
                            created_at: "2023-05-30T17:00:01.374216",
                            datahora: "2023-05-30T14:00:01.371294",
                            valor: 57990,
                            id: 343,
                        },
                    ],
                    imagens: [
                        {
                            id: 4946,
                            url: "https://img.olx.com.br/images/07/070315641552880.jpg",
                            status: "ativo",
                            created_at: "2023-05-31T09:09:09.057474",
                            veiculo_id: 989,
                        },
                        {
                            id: 4936,
                            url: "https://img.olx.com.br/images/07/070329880748599.jpg",
                            status: "ativo",
                            created_at: "2023-05-31T09:09:09.004893",
                            veiculo_id: 989,
                        },
                        {
                            id: 4941,
                            url: "https://img.olx.com.br/images/07/070334282073600.jpg",
                            status: "ativo",
                            created_at: "2023-05-31T09:09:09.031123",
                            veiculo_id: 989,
                        },
                        {
                            id: 4935,
                            url: "https://img.olx.com.br/images/07/071329166261948.jpg",
                            status: "ativo",
                            created_at: "2023-05-31T09:09:09.000102",
                            veiculo_id: 989,
                        },
                        {
                            id: 4933,
                            url: "https://img.olx.com.br/images/07/072302049449067.jpg",
                            status: "ativo",
                            created_at: "2023-05-31T09:09:08.986778",
                            veiculo_id: 989,
                        },
                        {
                            id: 4945,
                            url: "https://img.olx.com.br/images/07/072304645126570.jpg",
                            status: "ativo",
                            created_at: "2023-05-31T09:09:09.052839",
                            veiculo_id: 989,
                        },
                        {
                            id: 4934,
                            url: "https://img.olx.com.br/images/07/073383164170609.jpg",
                            status: "ativo",
                            created_at: "2023-05-31T09:09:08.994403",
                            veiculo_id: 989,
                        },
                        {
                            id: 4944,
                            url: "https://img.olx.com.br/images/07/074344640877078.jpg",
                            status: "ativo",
                            created_at: "2023-05-31T09:09:09.046270",
                            veiculo_id: 989,
                        },
                        {
                            id: 4943,
                            url: "https://img.olx.com.br/images/07/074374769741700.jpg",
                            status: "ativo",
                            created_at: "2023-05-31T09:09:09.041579",
                            veiculo_id: 989,
                        },
                        {
                            id: 4937,
                            url: "https://img.olx.com.br/images/07/075360768936285.jpg",
                            status: "ativo",
                            created_at: "2023-05-31T09:09:09.010555",
                            veiculo_id: 989,
                        },
                        {
                            id: 4942,
                            url: "https://img.olx.com.br/images/07/076363884792071.jpg",
                            status: "ativo",
                            created_at: "2023-05-31T09:09:09.037064",
                            veiculo_id: 989,
                        },
                        {
                            id: 4940,
                            url: "https://img.olx.com.br/images/07/077351885358059.jpg",
                            status: "ativo",
                            created_at: "2023-05-31T09:09:09.026198",
                            veiculo_id: 989,
                        },
                        {
                            id: 4947,
                            url: "https://img.olx.com.br/images/07/079332048260483.jpg",
                            status: "ativo",
                            created_at: "2023-05-31T09:09:09.063592",
                            veiculo_id: 989,
                        },
                        {
                            id: 4939,
                            url: "https://img.olx.com.br/images/07/079380406414762.jpg",
                            status: "ativo",
                            created_at: "2023-05-31T09:09:09.021216",
                            veiculo_id: 989,
                        },
                        {
                            id: 4938,
                            url: "https://img.olx.com.br/images/07/079382049556613.jpg",
                            status: "ativo",
                            created_at: "2023-05-31T09:09:09.015708",
                            veiculo_id: 989,
                        },
                        {
                            id: 4932,
                            url: "https://static.olx.com.br/cd/vi/images/ic_no-photo-placeholder.png",
                            status: "ativo",
                            created_at: "2023-05-30T17:00:01.366942",
                            veiculo_id: 989,
                        },
                    ],
                },
                {
                    modelo: "Edge",
                    marca: "Ford",
                    url: "https://pr.olx.com.br/regiao-de-curitiba-e-paranagua/autos-e-pecas/carros-vans-e-utilitarios/ford-edge-1181487590",
                    site: "https://www.olx.com.br",
                    id: 44,
                    ano: 2013,
                    titulo: "Ford Edge",
                    status: "ativo",
                    created_at: "2023-05-08T09:09:10.029005",
                    historicos: [
                        {
                            quilometragem: 100000,
                            descricao:
                                "Ford Edge 2013 <br>Modelo Limited o mais completo <br>Teto solar panorâmico <br>Traçao integral AWD<br>Manual do proprietário <br>WhatsApp (41)9 9805-8201<br>Consigo passar financiamento ",
                            veiculo_id: 44,
                            created_at: "2023-05-30T08:59:38.731624",
                            datahora: "2023-05-30T05:59:38.727886",
                            valor: 72900,
                            id: 336,
                        },
                        {
                            quilometragem: 100000,
                            descricao:
                                "Ford Edge 2013 <br>Modelo Limited o mais completo <br>Teto solar panorâmico <br>Traçao integral AWD<br>Manual do proprietário <br>WhatsApp (41)9 9805-8201<br>Consigo passar financiamento ",
                            veiculo_id: 44,
                            created_at: "2023-05-16T10:12:18.190416",
                            datahora: "2023-05-16T07:12:18.186187",
                            valor: 74900,
                            id: 146,
                        },
                        {
                            quilometragem: 110000,
                            descricao: "Ford Edge",
                            veiculo_id: 44,
                            created_at: "2023-05-08T09:09:10.034962",
                            datahora: "2023-05-08T06:09:10.032322",
                            valor: 78900,
                            id: 44,
                        },
                    ],
                    imagens: [
                        {
                            id: 491,
                            url: "https://img.olx.com.br/images/82/821315526611688.jpg",
                            status: "ativo",
                            created_at: "2023-05-08T10:07:53.473932",
                            veiculo_id: 44,
                        },
                        {
                            id: 490,
                            url: "https://img.olx.com.br/images/82/822331765135007.jpg",
                            status: "ativo",
                            created_at: "2023-05-08T10:07:53.469335",
                            veiculo_id: 44,
                        },
                        {
                            id: 44,
                            url: "https://img.olx.com.br/images/82/822373407264289.jpg",
                            status: "ativo",
                            created_at: "2023-05-08T09:09:10.041165",
                            veiculo_id: 44,
                        },
                        {
                            id: 489,
                            url: "https://img.olx.com.br/images/82/823398766175313.jpg",
                            status: "ativo",
                            created_at: "2023-05-08T10:07:53.464307",
                            veiculo_id: 44,
                        },
                        {
                            id: 493,
                            url: "https://img.olx.com.br/images/82/825304403893217.jpg",
                            status: "ativo",
                            created_at: "2023-05-08T10:07:53.483102",
                            veiculo_id: 44,
                        },
                        {
                            id: 492,
                            url: "https://img.olx.com.br/images/82/825340525907015.jpg",
                            status: "ativo",
                            created_at: "2023-05-08T10:07:53.478600",
                            veiculo_id: 44,
                        },
                        {
                            id: 498,
                            url: "https://img.olx.com.br/images/82/826347289098241.jpg",
                            status: "ativo",
                            created_at: "2023-05-08T10:07:53.505522",
                            veiculo_id: 44,
                        },
                        {
                            id: 494,
                            url: "https://img.olx.com.br/images/82/827306404056942.jpg",
                            status: "ativo",
                            created_at: "2023-05-08T10:07:53.487667",
                            veiculo_id: 44,
                        },
                        {
                            id: 496,
                            url: "https://img.olx.com.br/images/82/827366765000429.jpg",
                            status: "ativo",
                            created_at: "2023-05-08T10:07:53.496509",
                            veiculo_id: 44,
                        },
                        {
                            id: 495,
                            url: "https://img.olx.com.br/images/82/827392407395741.jpg",
                            status: "ativo",
                            created_at: "2023-05-08T10:07:53.492065",
                            veiculo_id: 44,
                        },
                        {
                            id: 497,
                            url: "https://img.olx.com.br/images/82/828341767111046.jpg",
                            status: "ativo",
                            created_at: "2023-05-08T10:07:53.501098",
                            veiculo_id: 44,
                        },
                        {
                            id: 499,
                            url: "https://img.olx.com.br/images/82/829392884442379.jpg",
                            status: "ativo",
                            created_at: "2023-05-08T10:07:53.509945",
                            veiculo_id: 44,
                        },
                    ],
                },
                {
                    modelo: "Edge",
                    marca: "Ford",
                    url: "https://pr.olx.com.br/regiao-de-curitiba-e-paranagua/autos-e-pecas/carros-vans-e-utilitarios/vendo-caminhonete-ford-ranger-1191221101",
                    site: "https://www.olx.com.br",
                    id: 979,
                    ano: 2011,
                    titulo: "VENDO CAMINHONETE FORD RANGER ",
                    status: "ativo",
                    created_at: "2023-05-29T09:35:55.224591",
                    historicos: [
                        {
                            quilometragem: 220000,
                            descricao:
                                "Ano 2011 modelo 2012<br>Completa , 4x4 motor 3.0 <br>Em perfeito estado de conservação revisão em dia.<br>Doc 2023 pago.<br><br>Somente venda.<br><br>41995914758<br><br>",
                            veiculo_id: 979,
                            created_at: "2023-05-29T09:38:14.730637",
                            datahora: "2023-05-29T06:38:14.728035",
                            valor: 72000,
                            id: 330,
                        },
                    ],
                    imagens: [
                        {
                            id: 4776,
                            url: "https://img.olx.com.br/images/05/050319163700715.jpg",
                            status: "ativo",
                            created_at: "2023-05-29T09:38:14.714264",
                            veiculo_id: 979,
                        },
                        {
                            id: 4777,
                            url: "https://img.olx.com.br/images/05/050331883295479.jpg",
                            status: "ativo",
                            created_at: "2023-05-29T09:38:14.720425",
                            veiculo_id: 979,
                        },
                        {
                            id: 4774,
                            url: "https://img.olx.com.br/images/05/052383406718623.jpg",
                            status: "ativo",
                            created_at: "2023-05-29T09:38:14.703550",
                            veiculo_id: 979,
                        },
                        {
                            id: 4778,
                            url: "https://img.olx.com.br/images/05/052395884635743.jpg",
                            status: "ativo",
                            created_at: "2023-05-29T09:38:14.725441",
                            veiculo_id: 979,
                        },
                        {
                            id: 4773,
                            url: "https://img.olx.com.br/images/05/055304163764127.jpg",
                            status: "ativo",
                            created_at: "2023-05-29T09:38:14.696356",
                            veiculo_id: 979,
                        },
                        {
                            id: 4775,
                            url: "https://img.olx.com.br/images/05/058349769049389.jpg",
                            status: "ativo",
                            created_at: "2023-05-29T09:38:14.708986",
                            veiculo_id: 979,
                        },
                    ],
                },
                {
                    modelo: "Edge",
                    marca: "Ford",
                    url: "https://pr.olx.com.br/regiao-de-curitiba-e-paranagua/autos-e-pecas/carros-vans-e-utilitarios/ford-edge-awd-limited-1188919916",
                    site: "https://www.olx.com.br",
                    id: 959,
                    ano: 2012,
                    titulo: "Ford Edge Awd Limited",
                    status: "ativo",
                    created_at: "2023-05-24T13:47:59.806150",
                    historicos: [
                        {
                            quilometragem: 95000,
                            descricao:
                                "Torro no dinhero FONE =4199664-9074<br>Carro impecável em perfeito estado<br>''50.000.00 a vista abaixo da FIPE   tudo funcionando já com kit GVN com vistoria já toda paga  chave reserva. <br>IPVA 2023 pago <br>pneus 90%    Na troca considera fip",
                            veiculo_id: 959,
                            created_at: "2023-05-29T09:37:54.972302",
                            datahora: "2023-05-29T06:37:54.968099",
                            valor: 50000,
                            id: 328,
                        },
                        {
                            quilometragem: 95000,
                            descricao:
                                "FONE =4199664-9074<br>Carro impecável em perfeito estado<br>''55.000 a vista abaixo da FIPE  único dono tudo funcionando já com kit GVN com vistoria já toda paga <br>IPVA 2023 pago <br>pneus 90% carro perfeito para sua família",
                            veiculo_id: 959,
                            created_at: "2023-05-24T13:50:57.173596",
                            datahora: "2023-05-24T10:50:57.171014",
                            valor: 55000,
                            id: 303,
                        },
                    ],
                    imagens: [
                        {
                            id: 4465,
                            url: "https://img.olx.com.br/images/00/000330646255774.jpg",
                            status: "ativo",
                            created_at: "2023-05-24T13:50:57.168269",
                            veiculo_id: 959,
                        },
                        {
                            id: 4462,
                            url: "https://img.olx.com.br/images/00/000386286689881.jpg",
                            status: "ativo",
                            created_at: "2023-05-24T13:50:57.151515",
                            veiculo_id: 959,
                        },
                        {
                            id: 4461,
                            url: "https://img.olx.com.br/images/00/002338407040256.jpg",
                            status: "ativo",
                            created_at: "2023-05-24T13:50:57.146485",
                            veiculo_id: 959,
                        },
                        {
                            id: 4460,
                            url: "https://img.olx.com.br/images/00/004336888096959.jpg",
                            status: "ativo",
                            created_at: "2023-05-24T13:50:57.141270",
                            veiculo_id: 959,
                        },
                        {
                            id: 4464,
                            url: "https://img.olx.com.br/images/00/004375887946413.jpg",
                            status: "ativo",
                            created_at: "2023-05-24T13:50:57.162594",
                            veiculo_id: 959,
                        },
                        {
                            id: 4463,
                            url: "https://img.olx.com.br/images/00/005346763281479.jpg",
                            status: "ativo",
                            created_at: "2023-05-24T13:50:57.157622",
                            veiculo_id: 959,
                        },
                        {
                            id: 4459,
                            url: "https://img.olx.com.br/images/00/005368762760759.jpg",
                            status: "ativo",
                            created_at: "2023-05-24T13:50:57.135281",
                            veiculo_id: 959,
                        },
                    ],
                },
                {
                    modelo: "Edge",
                    marca: "Ford",
                    url: "https://pr.olx.com.br/regiao-de-maringa/autos-e-pecas/carros-vans-e-utilitarios/edge-3-5-awd-limited-2013-km-baixo-1190387205",
                    site: "https://www.olx.com.br",
                    id: 978,
                    ano: 2013,
                    titulo: "EDGE 3.5 AWD LIMITED 2013 KM BAIXO!!!!!!",
                    status: "ativo",
                    created_at: "2023-05-26T18:10:57.053344",
                    historicos: [
                        {
                            quilometragem: 79000,
                            descricao:
                                "EDGE 3.5 LIMITED V6 AWD 2013 <br>Excelente estado de conservação, carro completo, pericia aprovada<br><br>PARTIDA START STOP<br>AR CONDICIONADO<br>DIREÇÃO HIDRÁULICA<br>RETROVISOR ELETRICO<br>VIDRO E TRAVAS ELÉTRICAS<br>RODAS DE LIGA<br>BANCOS EM COURO<br>CAMBIO AUTOMATICO<br>AIRBAG<br>BANCO EM COURO <br>ABS <br>ALARME<br>ENCOSTO DE CABEÇA TRASEIRO<br>SOM   <br><br>EXCELENTES CONDIÇÕES PARA FINANCIAMENTO<br><br>ENTRE EM CONTATO PELO FONE/WHATSAPP<br>(44) 99991-2450 MARCOS<br>(44) 99910-4970 MARCIEL<br><br>GARRIDO MOTORS<br>AV MANDACARU, 2.788<br>JD BRASIL - MARINGÁ-PR<br>FONE (44) 3047-9740<br><br>Obs.: As especificações, características, disponibilidade e preço do veículo anunciado estão sujeitos a alterações sem aviso prévio por parte da Garrido Motors. Reservamo-nos o direito de corrigir eventuais erros de divulgação deste produto. Crédito sujeito à aprovação.<br><br><br>Astra, Vectra, Meriva, Onix, Agile, Prisma, S10, Ford, Fiesta Sedan ou Hatch, KA, Focus, Courier, Ecosport, Escort, Fiat, Uno, Siena, Linea, Mille, Vivace, Doblo, Strada, Fiorino, Stilo, Punto, Palio, Idea, Vw, Gol, Fox, Voyage, Saveiro, Nissan, Peugeot, Citroen, Renault, Sandero, Logan, Megane, Gol, uno, celta, palio, hb20, Fox, fiesta, punto, golf, siena, etios, cobalt, city, polo, sonic, corolla, new civic, cruze, fluence, jetta, azzera, spin, strada, saveiro, Montana, fusion, meriva, zafira, duster, Vectra, Fiat, Gm Chevrolet, Ford, Volkswagen, nissan, Toyota, Hyundai, Honda, parati, Locke, Astra, meriva, corsa, Idea, doblo, meriva, zafira, polo, bora, gol, jetta, spacefox, crossfox, Logan, prisma, agile, saveiro, golf, Passat, punto, fiesta, palio, corolla, uno, evo, sedan, focus, zafira, eco, menor valor, troca, frontier, ranger, grand siena, new civic, capitiva, edge, new fiesta, 1.6, tucson, hb20s, Suzuki, march, gol, polo, parati, fox, celta, uno, crossfox, golf, corsa, ka, punto, focus, siena, astra, c3, c4, 206, 207,208, 307, 308, agile, prisma, onix, meriva, ecosport, livina, clio, hb20, I30, tucson, blazer, s10, ranger, Dakota, Ecosport AirCross S-10 L200 CR-V Parati<br>- Publicado por Revenda Mais.",
                            veiculo_id: 978,
                            created_at: "2023-05-26T18:13:13.559777",
                            datahora: "2023-05-26T15:13:13.556932",
                            valor: 72900,
                            id: 327,
                        },
                    ],
                    imagens: [
                        {
                            id: 4756,
                            url: "https://img.olx.com.br/images/03/030309165472063.jpg",
                            status: "ativo",
                            created_at: "2023-05-26T18:13:13.465504",
                            veiculo_id: 978,
                        },
                        {
                            id: 4766,
                            url: "https://img.olx.com.br/images/03/030353642786999.jpg",
                            status: "ativo",
                            created_at: "2023-05-26T18:13:13.521760",
                            veiculo_id: 978,
                        },
                        {
                            id: 4759,
                            url: "https://img.olx.com.br/images/03/030366523741826.jpg",
                            status: "ativo",
                            created_at: "2023-05-26T18:13:13.481494",
                            veiculo_id: 978,
                        },
                        {
                            id: 4755,
                            url: "https://img.olx.com.br/images/03/030382885975252.jpg",
                            status: "ativo",
                            created_at: "2023-05-26T18:13:13.460216",
                            veiculo_id: 978,
                        },
                        {
                            id: 4763,
                            url: "https://img.olx.com.br/images/03/031327042785865.jpg",
                            status: "ativo",
                            created_at: "2023-05-26T18:13:13.504563",
                            veiculo_id: 978,
                        },
                        {
                            id: 4761,
                            url: "https://img.olx.com.br/images/03/032325049282912.jpg",
                            status: "ativo",
                            created_at: "2023-05-26T18:13:13.491922",
                            veiculo_id: 978,
                        },
                        {
                            id: 4769,
                            url: "https://img.olx.com.br/images/03/032353768640517.jpg",
                            status: "ativo",
                            created_at: "2023-05-26T18:13:13.537794",
                            veiculo_id: 978,
                        },
                        {
                            id: 4770,
                            url: "https://img.olx.com.br/images/03/032377881025623.jpg",
                            status: "ativo",
                            created_at: "2023-05-26T18:13:13.543365",
                            veiculo_id: 978,
                        },
                        {
                            id: 4768,
                            url: "https://img.olx.com.br/images/03/033382407163836.jpg",
                            status: "ativo",
                            created_at: "2023-05-26T18:13:13.532626",
                            veiculo_id: 978,
                        },
                        {
                            id: 4757,
                            url: "https://img.olx.com.br/images/03/033392763159962.jpg",
                            status: "ativo",
                            created_at: "2023-05-26T18:13:13.471170",
                            veiculo_id: 978,
                        },
                        {
                            id: 4764,
                            url: "https://img.olx.com.br/images/03/034354282452500.jpg",
                            status: "ativo",
                            created_at: "2023-05-26T18:13:13.510511",
                            veiculo_id: 978,
                        },
                        {
                            id: 4762,
                            url: "https://img.olx.com.br/images/03/034369647700953.jpg",
                            status: "ativo",
                            created_at: "2023-05-26T18:13:13.498895",
                            veiculo_id: 978,
                        },
                        {
                            id: 4772,
                            url: "https://img.olx.com.br/images/03/035330046224272.jpg",
                            status: "ativo",
                            created_at: "2023-05-26T18:13:13.554378",
                            veiculo_id: 978,
                        },
                        {
                            id: 4765,
                            url: "https://img.olx.com.br/images/03/036370761796497.jpg",
                            status: "ativo",
                            created_at: "2023-05-26T18:13:13.516475",
                            veiculo_id: 978,
                        },
                        {
                            id: 4760,
                            url: "https://img.olx.com.br/images/03/037339764833070.jpg",
                            status: "ativo",
                            created_at: "2023-05-26T18:13:13.486779",
                            veiculo_id: 978,
                        },
                        {
                            id: 4771,
                            url: "https://img.olx.com.br/images/03/037382760319816.jpg",
                            status: "ativo",
                            created_at: "2023-05-26T18:13:13.548444",
                            veiculo_id: 978,
                        },
                        {
                            id: 4754,
                            url: "https://img.olx.com.br/images/03/037396520452831.jpg",
                            status: "ativo",
                            created_at: "2023-05-26T18:13:13.453995",
                            veiculo_id: 978,
                        },
                        {
                            id: 4767,
                            url: "https://img.olx.com.br/images/03/037397884434025.jpg",
                            status: "ativo",
                            created_at: "2023-05-26T18:13:13.526969",
                            veiculo_id: 978,
                        },
                        {
                            id: 4758,
                            url: "https://img.olx.com.br/images/03/039384525218507.jpg",
                            status: "ativo",
                            created_at: "2023-05-26T18:13:13.476412",
                            veiculo_id: 978,
                        },
                    ],
                },
                {
                    modelo: "Edge",
                    marca: "Ford",
                    url: "https://pr.olx.com.br/regiao-de-curitiba-e-paranagua/autos-e-pecas/carros-vans-e-utilitarios/ford-edge-limited-2013-segundo-dono-1190423355",
                    site: "https://www.olx.com.br",
                    id: 977,
                    ano: 2013,
                    titulo: "FORD EDGE LIMITED 2013 SEGUNDO DONO",
                    status: "ativo",
                    created_at: "2023-05-26T18:10:57.037517",
                    historicos: [
                        {
                            quilometragem: 153000,
                            descricao:
                                "Contato: 999733745<br><br>Edge top de linha<br>Teto solar<br>AWD<br>Interior em couro<br>Branco Perolizado<br>Revisões em dia <br><br>Sem Leilão nem Sinistros<br> <br>Disponho para que seja feita vistoria cautelar, fique a vontade para levar no seu mecânico. <br>",
                            veiculo_id: 977,
                            created_at: "2023-05-26T18:13:10.578766",
                            datahora: "2023-05-26T15:13:10.576022",
                            valor: 67800,
                            id: 326,
                        },
                    ],
                    imagens: [
                        {
                            id: 4744,
                            url: "https://img.olx.com.br/images/03/030375404687153.jpg",
                            status: "ativo",
                            created_at: "2023-05-26T18:13:10.527694",
                            veiculo_id: 977,
                        },
                        {
                            id: 4737,
                            url: "https://img.olx.com.br/images/03/031300647654644.jpg",
                            status: "ativo",
                            created_at: "2023-05-26T18:13:10.490955",
                            veiculo_id: 977,
                        },
                        {
                            id: 4745,
                            url: "https://img.olx.com.br/images/03/031313168933243.jpg",
                            status: "ativo",
                            created_at: "2023-05-26T18:13:10.533088",
                            veiculo_id: 977,
                        },
                        {
                            id: 4740,
                            url: "https://img.olx.com.br/images/03/031322762654690.jpg",
                            status: "ativo",
                            created_at: "2023-05-26T18:13:10.508021",
                            veiculo_id: 977,
                        },
                        {
                            id: 4747,
                            url: "https://img.olx.com.br/images/03/031357281601910.jpg",
                            status: "ativo",
                            created_at: "2023-05-26T18:13:10.542816",
                            veiculo_id: 977,
                        },
                        {
                            id: 4751,
                            url: "https://img.olx.com.br/images/03/032309520356197.jpg",
                            status: "ativo",
                            created_at: "2023-05-26T18:13:10.563309",
                            veiculo_id: 977,
                        },
                        {
                            id: 4738,
                            url: "https://img.olx.com.br/images/03/032378529395087.jpg",
                            status: "ativo",
                            created_at: "2023-05-26T18:13:10.496846",
                            veiculo_id: 977,
                        },
                        {
                            id: 4752,
                            url: "https://img.olx.com.br/images/03/033351648670094.jpg",
                            status: "ativo",
                            created_at: "2023-05-26T18:13:10.568089",
                            veiculo_id: 977,
                        },
                        {
                            id: 4742,
                            url: "https://img.olx.com.br/images/03/034332883936078.jpg",
                            status: "ativo",
                            created_at: "2023-05-26T18:13:10.518054",
                            veiculo_id: 977,
                        },
                        {
                            id: 4750,
                            url: "https://img.olx.com.br/images/03/034383163056524.jpg",
                            status: "ativo",
                            created_at: "2023-05-26T18:13:10.558514",
                            veiculo_id: 977,
                        },
                        {
                            id: 4746,
                            url: "https://img.olx.com.br/images/03/035368409460767.jpg",
                            status: "ativo",
                            created_at: "2023-05-26T18:13:10.537785",
                            veiculo_id: 977,
                        },
                        {
                            id: 4748,
                            url: "https://img.olx.com.br/images/03/036306763783264.jpg",
                            status: "ativo",
                            created_at: "2023-05-26T18:13:10.547969",
                            veiculo_id: 977,
                        },
                        {
                            id: 4743,
                            url: "https://img.olx.com.br/images/03/036312401561178.jpg",
                            status: "ativo",
                            created_at: "2023-05-26T18:13:10.522842",
                            veiculo_id: 977,
                        },
                        {
                            id: 4753,
                            url: "https://img.olx.com.br/images/03/036371165553712.jpg",
                            status: "ativo",
                            created_at: "2023-05-26T18:13:10.573592",
                            veiculo_id: 977,
                        },
                        {
                            id: 4741,
                            url: "https://img.olx.com.br/images/03/036383287654123.jpg",
                            status: "ativo",
                            created_at: "2023-05-26T18:13:10.513007",
                            veiculo_id: 977,
                        },
                        {
                            id: 4749,
                            url: "https://img.olx.com.br/images/03/037301642497340.jpg",
                            status: "ativo",
                            created_at: "2023-05-26T18:13:10.552994",
                            veiculo_id: 977,
                        },
                        {
                            id: 4739,
                            url: "https://img.olx.com.br/images/03/039300762825035.jpg",
                            status: "ativo",
                            created_at: "2023-05-26T18:13:10.502745",
                            veiculo_id: 977,
                        },
                    ],
                },
                {
                    modelo: "Edge",
                    marca: "Ford",
                    url: "https://pr.olx.com.br/regiao-de-ponta-grossa-e-guarapuava/autos-e-pecas/carros-vans-e-utilitarios/ford-edge-limited-v6-awd-3-5-ano-2013-1188557220",
                    site: "https://www.olx.com.br",
                    id: 950,
                    ano: 0,
                    titulo: "Ford Edge Limited V6 AWD 3.5 ANO:2013",
                    status: "ativo",
                    created_at: "2023-05-23T10:42:37.198643",
                    historicos: [
                        {
                            quilometragem: 161000,
                            descricao:
                                "DIREÇÃO Hidráulica <br><br>AR CONDICIONADO DIGITAL<br><br>VIDROS ELÉTRICOS NAS PORTA DIANTEIRA<br><br>VIDROS ELÉTRICOS NAS PORTA TRASEIRA<br><br>RETROVISORES ELÉTRICOS<br><br>BANCOS EM COURO<br><br>COMANDO DE AUDIO NO VOLANTE<br><br>CAMERA DE RÉ<br><br>SENSORES DE ESTACIONAMENTO<br><br>TETO SOLAR<br><br>FAROL DE MILHA<br><br>START STOP<br><br>CHAVE PRESENCIAL<br><br>FUNCIONAMENTO REMOTO DO VEICULO<br><br>BANCOS DO PASSAGEIRO COM AJUSTE<br><br>ABERTURA REMOTA DO PORTAS COM FECHAMENTO<br><br>BLUETOOTH<br><br>AJUSTE ELÉTRICOS DOS BANCOS DIANTEIROS<br><br><br><br><br>FORD EDGE LIMTED V6 MOTOR DE 250 CV****POSSUI MANUAL****CHAVE COPIA****NF****VEICULO SELADO FRENTE E TRASEIRA****161.000 KM RODADOS****REVISADO****CUSTANDO HOJE R$ 78.900***FINANCIAMOS COM  AS MELHORES TAXAS DA REGIÃO EM ATÉ 60x****PEGAMOS SEU VEICULO NA TROCA****APROVACÃO IMEDIATA****VENHA CONFERIR NOSSO ESTOQUE****VEICULOS TODOS DE PROCEDÊNCIA E DE ÓTIMA QUALIDADE****NOSSA EQUIPE ESTA 24 HORAS DISPONIVEL PARA MELHOR ATENDER A TODOS****NÃO PERCA TEMPO A HORA É AGORA VENHA ATÉ NOSSA LOJA AQUI VOCÊ SAI DE CARRO NOVO OU SEMI NOVO.",
                            veiculo_id: 950,
                            created_at: "2023-05-26T18:12:47.861548",
                            datahora: "2023-05-26T15:12:47.858328",
                            valor: 78900,
                            id: 325,
                        },
                        {
                            quilometragem: 161000,
                            descricao:
                                "DIREÇÃO ELÉTRICA<br><br>AR CONDICIONADO DIGITAL<br><br>VIDROS ELÉTRICOS NAS PORTA DIANTEIRA<br><br>VIDROS ELÉTRICOS NAS PORTA TRASEIRA<br><br>RETROVISORES ELÉTRICOS<br><br>BANCOS EM COURO<br><br>COMANDO DE AUDIO NO VOLANTE<br><br>CAMERA DE RÉ<br><br>SENSORES DE ESTACIONAMENTO<br><br>TETO SOLAR<br><br>FAROL DE MILHA<br><br>START STOP<br><br>CHAVE PRESENCIAL<br><br>FUNCIONAMENTO REMOTO DO VEICULO<br><br>BANCOS DO PASSAGEIRO COM AJUSTE<br><br>ABERTURA REMOTA DO PORTAS COM FECHAMENTO<br><br>BLUETOOTH<br><br>AJUSTE ELÉTRICOS DOS BANCOS DIANTEIROS<br><br><br><br><br>FORD EDGE LIMTED V6 MOTOR DE 250 CV****POSSUI MANUAL****CHAVE COPIA****NF****VEICULO SELADO FRENTE E TRASEIRA****161.000 KM RODADOS****REVISADO****CUSTANDO HOJE R$ 68.900***FINANCIAMOS COM  AS MELHORES TAXAS DA REGIÃO EM ATÉ 60x****PEGAMOS SEU VEICULO NA TROCA****APROVACÃO IMEDIATA****VENHA CONFERIR NOSSO ESTOQUE****VEICULOS TODOS DE PROCEDÊNCIA E DE ÓTIMA QUALIDADE****NOSSA EQUIPE ESTA 24 HORAS DISPONIVEL PARA MELHOR ATENDER A TODOS****NÃO PERCA TEMPO A HORA É AGORA VENHA ATÉ NOSSA LOJA AQUI VOCÊ SAI DE CARRO NOVO OU SEMI NOVO.",
                            veiculo_id: 950,
                            created_at: "2023-05-23T10:45:31.872466",
                            datahora: "2023-05-23T07:45:31.868296",
                            valor: 79900,
                            id: 294,
                        },
                    ],
                    imagens: [
                        {
                            id: 3665,
                            url: "https://img.olx.com.br/images/99/990313768030380.jpg",
                            status: "ativo",
                            created_at: "2023-05-23T10:45:31.860813",
                            veiculo_id: 950,
                        },
                        {
                            id: 3664,
                            url: "https://img.olx.com.br/images/99/992319048936537.jpg",
                            status: "ativo",
                            created_at: "2023-05-23T10:45:31.855254",
                            veiculo_id: 950,
                        },
                        {
                            id: 3666,
                            url: "https://img.olx.com.br/images/99/992320169457257.jpg",
                            status: "ativo",
                            created_at: "2023-05-23T10:45:31.865896",
                            veiculo_id: 950,
                        },
                        {
                            id: 3655,
                            url: "https://img.olx.com.br/images/99/992329527478521.jpg",
                            status: "ativo",
                            created_at: "2023-05-23T10:45:31.809503",
                            veiculo_id: 950,
                        },
                        {
                            id: 3654,
                            url: "https://img.olx.com.br/images/99/992348761084484.jpg",
                            status: "ativo",
                            created_at: "2023-05-23T10:45:31.803471",
                            veiculo_id: 950,
                        },
                        {
                            id: 3653,
                            url: "https://img.olx.com.br/images/99/992364881622735.jpg",
                            status: "ativo",
                            created_at: "2023-05-23T10:45:31.798331",
                            veiculo_id: 950,
                        },
                        {
                            id: 3656,
                            url: "https://img.olx.com.br/images/99/992374765748284.jpg",
                            status: "ativo",
                            created_at: "2023-05-23T10:45:31.814609",
                            veiculo_id: 950,
                        },
                        {
                            id: 3657,
                            url: "https://img.olx.com.br/images/99/992375169607803.jpg",
                            status: "ativo",
                            created_at: "2023-05-23T10:45:31.819739",
                            veiculo_id: 950,
                        },
                        {
                            id: 3663,
                            url: "https://img.olx.com.br/images/99/993376641205025.jpg",
                            status: "ativo",
                            created_at: "2023-05-23T10:45:31.850372",
                            veiculo_id: 950,
                        },
                        {
                            id: 3658,
                            url: "https://img.olx.com.br/images/99/994355641319375.jpg",
                            status: "ativo",
                            created_at: "2023-05-23T10:45:31.824833",
                            veiculo_id: 950,
                        },
                        {
                            id: 3661,
                            url: "https://img.olx.com.br/images/99/994370883986908.jpg",
                            status: "ativo",
                            created_at: "2023-05-23T10:45:31.839795",
                            veiculo_id: 950,
                        },
                        {
                            id: 3659,
                            url: "https://img.olx.com.br/images/99/995395881838961.jpg",
                            status: "ativo",
                            created_at: "2023-05-23T10:45:31.829612",
                            veiculo_id: 950,
                        },
                        {
                            id: 3660,
                            url: "https://img.olx.com.br/images/99/997375282357413.jpg",
                            status: "ativo",
                            created_at: "2023-05-23T10:45:31.834824",
                            veiculo_id: 950,
                        },
                        {
                            id: 3652,
                            url: "https://img.olx.com.br/images/99/998310048333740.jpg",
                            status: "ativo",
                            created_at: "2023-05-23T10:45:31.789403",
                            veiculo_id: 950,
                        },
                        {
                            id: 3662,
                            url: "https://img.olx.com.br/images/99/999380524860792.jpg",
                            status: "ativo",
                            created_at: "2023-05-23T10:45:31.844441",
                            veiculo_id: 950,
                        },
                    ],
                },
                {
                    modelo: "Edge",
                    marca: "Ford",
                    url: "https://pr.olx.com.br/regiao-de-londrina/autos-e-pecas/carros-vans-e-utilitarios/edge-2013-1190127222",
                    site: "https://www.olx.com.br",
                    id: 975,
                    ano: 2013,
                    titulo: "Edge 2013",
                    status: "ativo",
                    created_at: "2023-05-26T09:59:28.024636",
                    historicos: [
                        {
                            quilometragem: 69913,
                            descricao:
                                "Edge 2013<br>Segundo dono<br>69.000km<br>",
                            veiculo_id: 975,
                            created_at: "2023-05-26T10:02:35.688162",
                            datahora: "2023-05-26T07:02:35.685356",
                            valor: 70000,
                            id: 323,
                        },
                    ],
                    imagens: [
                        {
                            id: 4708,
                            url: "https://img.olx.com.br/images/02/020382885576629.jpg",
                            status: "ativo",
                            created_at: "2023-05-26T10:02:35.672455",
                            veiculo_id: 975,
                        },
                        {
                            id: 4707,
                            url: "https://img.olx.com.br/images/02/023336522726277.jpg",
                            status: "ativo",
                            created_at: "2023-05-26T10:02:35.667323",
                            veiculo_id: 975,
                        },
                        {
                            id: 4706,
                            url: "https://img.olx.com.br/images/02/024315169338808.jpg",
                            status: "ativo",
                            created_at: "2023-05-26T10:02:35.662156",
                            veiculo_id: 975,
                        },
                        {
                            id: 4710,
                            url: "https://img.olx.com.br/images/02/024338400833020.jpg",
                            status: "ativo",
                            created_at: "2023-05-26T10:02:35.683082",
                            veiculo_id: 975,
                        },
                        {
                            id: 4709,
                            url: "https://img.olx.com.br/images/02/029340643430950.jpg",
                            status: "ativo",
                            created_at: "2023-05-26T10:02:35.678134",
                            veiculo_id: 975,
                        },
                    ],
                },
                {
                    modelo: "Edge",
                    marca: "Ford",
                    url: "https://pr.olx.com.br/regiao-de-francisco-beltrao-e-pato-branco/autos-e-pecas/carros-vans-e-utilitarios/ford-edge-1188528889",
                    site: "https://www.olx.com.br",
                    id: 951,
                    ano: 0,
                    titulo: "Ford Edge",
                    status: "ativo",
                    created_at: "2023-05-23T10:42:37.214654",
                    historicos: [
                        {
                            quilometragem: 140000,
                            descricao: "Ford Edge Sel - 2012",
                            veiculo_id: 951,
                            created_at: "2023-05-23T10:45:34.564793",
                            datahora: "2023-05-23T07:45:34.562186",
                            valor: 62000,
                            id: 295,
                        },
                    ],
                    imagens: [
                        {
                            id: 3668,
                            url: "https://img.olx.com.br/images/99/990327044119432.jpg",
                            status: "ativo",
                            created_at: "2023-05-23T10:45:34.483544",
                            veiculo_id: 951,
                        },
                        {
                            id: 3676,
                            url: "https://img.olx.com.br/images/99/990332288418207.jpg",
                            status: "ativo",
                            created_at: "2023-05-23T10:45:34.527175",
                            veiculo_id: 951,
                        },
                        {
                            id: 3680,
                            url: "https://img.olx.com.br/images/99/990376281370435.jpg",
                            status: "ativo",
                            created_at: "2023-05-23T10:45:34.549124",
                            veiculo_id: 951,
                        },
                        {
                            id: 3667,
                            url: "https://img.olx.com.br/images/99/990390403448166.jpg",
                            status: "ativo",
                            created_at: "2023-05-23T10:45:34.477648",
                            veiculo_id: 951,
                        },
                        {
                            id: 3674,
                            url: "https://img.olx.com.br/images/99/991358764945259.jpg",
                            status: "ativo",
                            created_at: "2023-05-23T10:45:34.516808",
                            veiculo_id: 951,
                        },
                        {
                            id: 3673,
                            url: "https://img.olx.com.br/images/99/992331165615391.jpg",
                            status: "ativo",
                            created_at: "2023-05-23T10:45:34.510990",
                            veiculo_id: 951,
                        },
                        {
                            id: 3670,
                            url: "https://img.olx.com.br/images/99/993365526216441.jpg",
                            status: "ativo",
                            created_at: "2023-05-23T10:45:34.495140",
                            veiculo_id: 951,
                        },
                        {
                            id: 3681,
                            url: "https://img.olx.com.br/images/99/994349282662029.jpg",
                            status: "ativo",
                            created_at: "2023-05-23T10:45:34.554316",
                            veiculo_id: 951,
                        },
                        {
                            id: 3672,
                            url: "https://img.olx.com.br/images/99/995309522088624.jpg",
                            status: "ativo",
                            created_at: "2023-05-23T10:45:34.506301",
                            veiculo_id: 951,
                        },
                        {
                            id: 3671,
                            url: "https://img.olx.com.br/images/99/995353285647051.jpg",
                            status: "ativo",
                            created_at: "2023-05-23T10:45:34.500895",
                            veiculo_id: 951,
                        },
                        {
                            id: 3675,
                            url: "https://img.olx.com.br/images/99/996336161421373.jpg",
                            status: "ativo",
                            created_at: "2023-05-23T10:45:34.521830",
                            veiculo_id: 951,
                        },
                        {
                            id: 3679,
                            url: "https://img.olx.com.br/images/99/997311406321198.jpg",
                            status: "ativo",
                            created_at: "2023-05-23T10:45:34.543967",
                            veiculo_id: 951,
                        },
                        {
                            id: 3669,
                            url: "https://img.olx.com.br/images/99/997315047224474.jpg",
                            status: "ativo",
                            created_at: "2023-05-23T10:45:34.489929",
                            veiculo_id: 951,
                        },
                        {
                            id: 3682,
                            url: "https://img.olx.com.br/images/99/999315400833318.jpg",
                            status: "ativo",
                            created_at: "2023-05-23T10:45:34.559966",
                            veiculo_id: 951,
                        },
                        {
                            id: 3677,
                            url: "https://img.olx.com.br/images/99/999350763130677.jpg",
                            status: "ativo",
                            created_at: "2023-05-23T10:45:34.532846",
                            veiculo_id: 951,
                        },
                        {
                            id: 3678,
                            url: "https://img.olx.com.br/images/99/999388768182182.jpg",
                            status: "ativo",
                            created_at: "2023-05-23T10:45:34.538131",
                            veiculo_id: 951,
                        },
                    ],
                },
                {
                    modelo: "Edge",
                    marca: "Ford",
                    url: "https://pr.olx.com.br/regiao-de-curitiba-e-paranagua/autos-e-pecas/carros-vans-e-utilitarios/ford-edge-v6-2013-1145479982",
                    site: "https://www.olx.com.br",
                    id: 943,
                    ano: 2013,
                    titulo: "Ford Edge V6 2013",
                    status: "ativo",
                    created_at: "2023-05-22T09:02:07.504441",
                    historicos: [
                        {
                            quilometragem: 119000,
                            descricao:
                                " TODO INSPECIONADO E COM GARANTIA!<br><br>VEICULO IMPECAVEL COM TETO SOLAR !!!<br><br>SUPER CONSERVADA<br><br>LAUDO 100% APROVADO.<br><br>R$ 74,900,00 !!!<br><br>FINANCIO E ACEITO VEÍCULO DE MAIOR OU MENOR VALOR NA TROCA! <br>CONSULTE AVALIAÇÃO! OPORTUNIDADE! <br>Aproveite!!! <br>Mais Detalhes e Interessados Chamar no WHATSAPP 41 9 96451644 Wagner<br><br>** A Peloi Multimarcas trabalha com as principais marcas de veículos, sendo elas: Audi, BMW, Caoa Chery, GM Chevrolet, Chrysler, Citroen, Dodge, Fiat, Ford, Honda, Hyundai, Jac, Jac Motors, Jeep, Kia, Kia Motors, Land Rover, Lexus, Lifan, Maserati, Mercedes Benz, Mercedes-Benz, Mini, Mitsubishi, Nissan, Peugeot, Porsche, Ram, Renault, Smart, SsangYoung, Subaru, Suzuki, Toyota, Triumph, Troller, Vw Volkswagen, Volvo, Yamaha<br><br>** Dentre os principais modelos de veículos temos: Camaro Captiva Celta Classic Cobalt Corsa Sedan Cruze Sport6 Malibu Meriva Montana Omega Onix Prisma S10 Sonic Spin Tracker Trailblazer Vectra GT Zafira Citroen Aircross C3 Picasso C4 Lounge Pallas Picasso Jumper Xsara Dodge Dacota Chalinger Fiat 500 Bravo 147 Brava Doblo Cargo Ducato Fiorino Freemont Grand Siena Idea Linea Uno Mille Palio Adventure Weekend Punto Siena Strada Ford Courier Edge F-250 Fiesta Rocam Focus Fusion Ka New Ranger Honda Accord CR-V City Civic Fit Azera Equus HB20 HR Santa Fe Sonata Tucson Veloster Veracruz I30 CW Ix35 J2 J3 Turin J5 Coupé XF XJ Supersport XKR Cherokee Grand Wrangler Bongo Cadenza Sorento Soul Choque Sportage X60 Ghibli Gran Cabrio CLA Classe A B C Cl 250 Turbo Sport 63 AMG Touring CLS 63 AMG E G Gl Glk Galaxi Landau LTD Puma Gtb Gte Opala Omega 6 Cilindros Subaru Ssangyong Financiamento Seguro Concessionaria Loja Auto Shopping Global Shopping Automotivo Agile Astra Conversível Utilitário S10 Tracker 500 Stilo Uno Fiesta Flex Gasolina Alcool Focus Fusion Ka Power Shift Ranger Civic Crv Azera Elantra Hb20 I30 Ix35 Lancer L200 Pajero 206 207 307 Sw Hoggar Cb 300 Honda Duster Fluence Kangoo Logan Megane Sandero Scenic Corolla Etios Fielder Hilux Amarok Bora Crossfox Fox Fusca Gol Golf Jetta Parati Polo Saveiro Spacefox Tiguan Voyage G4 G5 G6 A3 A4 A6 120i 125i 130i 320i 300c Pt Cruiser Aircross C3 C4 Picasso Xsara Journey Commander Cerato Picanto Sorento Soul Sportage Freelander Evoque Classe A Fortwo Actyon Kyron Impreza Grand Vitara A1 A3 A4 A5 Q3 Q5 Q7 SQ5 TT TTS 1M 116i 118i 120i 125i 328i 330i 335i 420i 118 120 318 320 Cadillac CTS CTS-V Escalade SRX Chevrolet Gran Blazer Bonanza GMC Hummer H1 H2 H3 Lincoln Lobini Caravan Cheyenne Corvette Grand Sport Coupé Cruze Impala Malibu Omega C4 Lounge Picasso C5 C6 C8 DS3 DS4 DS5 Jumper Xantia Xsara Dodge Challenger Charger Dakota Dart Durango Journey Ram Viper Scuderia GTB Cinquecento Freemont Ford Edge Explorer F-1 F-100 F-1000 F-150 F-250 F-350 Focus Fusion Honda Accord CRV Fit HR-V Prelude Hyunday Atos Azera Elantra Equus Galloper Genesis H1 H100 HB20 HB20S HB20X HR I30 IX35 Sonata Terracan Infiniti EX35 FX35 FX37 FX45 FX50 QX56 QX60 QX70 T6 T8 Xterra X-Trail Boxster RCZ Porsche Renault Nne Cayman R S Macan Panamera Spyder Renault Subaru Forester Imprenza Legacy Outback SVX Tribeca XV Camry Corolla Fj Cruiser Hilux SW4 Land Prado Paseo Previa Prius RAV4 Tundra Venza Volkswagen Amarok Eos Fusca Golf Jetta Variant New Beetle Passat Touareg C30 S40 S60 S70 S80 V40 V50 V60 V70 XC60 XC70 XC90 428i Aircross C3 C4 Picasso Captur Kicks March Onix Sandero HRV CRV Versa Kwid Duster Fluence Kangoo Logan Land Rover Siena City Megane Sonata Elantra Escort Fiesta Frontier Blazer Mobi C3 Evoque Santana Ford Ka Celta Passat Jmk5 Mk6 Mk7 Tsi Renegade Montana Strada Pick-Up Caminhonete Moto X1 X6 Virtus Up Boxster S Cayenne Macan Panamera Ram Forester Impreza Legacy Outback Tribeca Camry Etios Prius Rav4 Sw4 Troller T4 Crossfox Fox Variant Polo Saveiro Space Tiguan Tuareg Up Brasilia Tl Volvo Galaxi Gtb Gte Opala Omega Classic L200 Triton Hilux Srv Srx Challenge C180 C200 Ecosport Prisma Cbr1000 Cbr600 R1 Ducati Panigale<br>",
                            veiculo_id: 943,
                            created_at: "2023-05-22T09:04:58.617421",
                            datahora: "2023-05-22T06:04:58.614470",
                            valor: 74900,
                            id: 257,
                        },
                    ],
                    imagens: [
                        {
                            id: 2675,
                            url: "https://img.olx.com.br/images/97/970301165554692.jpg",
                            status: "ativo",
                            created_at: "2023-05-22T09:04:58.520070",
                            veiculo_id: 943,
                        },
                        {
                            id: 2684,
                            url: "https://img.olx.com.br/images/97/970325407267398.jpg",
                            status: "ativo",
                            created_at: "2023-05-22T09:04:58.567362",
                            veiculo_id: 943,
                        },
                        {
                            id: 2681,
                            url: "https://img.olx.com.br/images/97/970358642754144.jpg",
                            status: "ativo",
                            created_at: "2023-05-22T09:04:58.551878",
                            veiculo_id: 943,
                        },
                        {
                            id: 2691,
                            url: "https://img.olx.com.br/images/97/971316403273730.jpg",
                            status: "ativo",
                            created_at: "2023-05-22T09:04:58.602318",
                            veiculo_id: 943,
                        },
                        {
                            id: 2693,
                            url: "https://img.olx.com.br/images/97/971341523776919.jpg",
                            status: "ativo",
                            created_at: "2023-05-22T09:04:58.612237",
                            veiculo_id: 943,
                        },
                        {
                            id: 2688,
                            url: "https://img.olx.com.br/images/97/972306764181021.jpg",
                            status: "ativo",
                            created_at: "2023-05-22T09:04:58.586736",
                            veiculo_id: 943,
                        },
                        {
                            id: 2677,
                            url: "https://img.olx.com.br/images/97/972386409498556.jpg",
                            status: "ativo",
                            created_at: "2023-05-22T09:04:58.531678",
                            veiculo_id: 943,
                        },
                        {
                            id: 2687,
                            url: "https://img.olx.com.br/images/97/972388769799648.jpg",
                            status: "ativo",
                            created_at: "2023-05-22T09:04:58.582071",
                            veiculo_id: 943,
                        },
                        {
                            id: 2674,
                            url: "https://img.olx.com.br/images/97/973338523508621.jpg",
                            status: "ativo",
                            created_at: "2023-05-22T09:04:58.513563",
                            veiculo_id: 943,
                        },
                        {
                            id: 2682,
                            url: "https://img.olx.com.br/images/97/973349400708073.jpg",
                            status: "ativo",
                            created_at: "2023-05-22T09:04:58.556590",
                            veiculo_id: 943,
                        },
                        {
                            id: 2676,
                            url: "https://img.olx.com.br/images/97/973387766829889.jpg",
                            status: "ativo",
                            created_at: "2023-05-22T09:04:58.525909",
                            veiculo_id: 943,
                        },
                        {
                            id: 2686,
                            url: "https://img.olx.com.br/images/97/976307763221658.jpg",
                            status: "ativo",
                            created_at: "2023-05-22T09:04:58.577054",
                            veiculo_id: 943,
                        },
                        {
                            id: 2685,
                            url: "https://img.olx.com.br/images/97/976381520270564.jpg",
                            status: "ativo",
                            created_at: "2023-05-22T09:04:58.572201",
                            veiculo_id: 943,
                        },
                        {
                            id: 2683,
                            url: "https://img.olx.com.br/images/97/976382402654536.jpg",
                            status: "ativo",
                            created_at: "2023-05-22T09:04:58.561632",
                            veiculo_id: 943,
                        },
                        {
                            id: 2692,
                            url: "https://img.olx.com.br/images/97/977334641177855.jpg",
                            status: "ativo",
                            created_at: "2023-05-22T09:04:58.607249",
                            veiculo_id: 943,
                        },
                        {
                            id: 2690,
                            url: "https://img.olx.com.br/images/97/977397881744977.jpg",
                            status: "ativo",
                            created_at: "2023-05-22T09:04:58.597509",
                            veiculo_id: 943,
                        },
                        {
                            id: 2679,
                            url: "https://img.olx.com.br/images/97/978358529700040.jpg",
                            status: "ativo",
                            created_at: "2023-05-22T09:04:58.541353",
                            veiculo_id: 943,
                        },
                        {
                            id: 2678,
                            url: "https://img.olx.com.br/images/97/978361882131548.jpg",
                            status: "ativo",
                            created_at: "2023-05-22T09:04:58.536651",
                            veiculo_id: 943,
                        },
                        {
                            id: 2680,
                            url: "https://img.olx.com.br/images/97/978379406899492.jpg",
                            status: "ativo",
                            created_at: "2023-05-22T09:04:58.546649",
                            veiculo_id: 943,
                        },
                        {
                            id: 2689,
                            url: "https://img.olx.com.br/images/97/978398643323534.jpg",
                            status: "ativo",
                            created_at: "2023-05-22T09:04:58.591640",
                            veiculo_id: 943,
                        },
                    ],
                },
                {
                    modelo: "Edge",
                    marca: "Ford",
                    url: "https://pr.olx.com.br/regiao-de-curitiba-e-paranagua/autos-e-pecas/carros-vans-e-utilitarios/ford-edge-limited-v6-2013-1187875780",
                    site: "https://www.olx.com.br",
                    id: 942,
                    ano: 2013,
                    titulo: "FORD EDGE LIMITED V6 2013",
                    status: "ativo",
                    created_at: "2023-05-22T09:02:07.489244",
                    historicos: [
                        {
                            quilometragem: 119800,
                            descricao:
                                "TOP DE LINHA!! TETO SOLAR!! IMPECAVEL!!!<br>- Publicado por Revenda Mais.",
                            veiculo_id: 942,
                            created_at: "2023-05-22T09:04:55.876904",
                            datahora: "2023-05-22T06:04:55.873808",
                            valor: 74900,
                            id: 256,
                        },
                    ],
                    imagens: [
                        {
                            id: 2672,
                            url: "https://img.olx.com.br/images/97/970311767473541.jpg",
                            status: "ativo",
                            created_at: "2023-05-22T09:04:55.866014",
                            veiculo_id: 942,
                        },
                        {
                            id: 2666,
                            url: "https://img.olx.com.br/images/97/970327522422036.jpg",
                            status: "ativo",
                            created_at: "2023-05-22T09:04:55.827355",
                            veiculo_id: 942,
                        },
                        {
                            id: 2668,
                            url: "https://img.olx.com.br/images/97/970339286802275.jpg",
                            status: "ativo",
                            created_at: "2023-05-22T09:04:55.840128",
                            veiculo_id: 942,
                        },
                        {
                            id: 2655,
                            url: "https://img.olx.com.br/images/97/970368284418303.jpg",
                            status: "ativo",
                            created_at: "2023-05-22T09:04:55.764069",
                            veiculo_id: 942,
                        },
                        {
                            id: 2662,
                            url: "https://img.olx.com.br/images/97/971340761986795.jpg",
                            status: "ativo",
                            created_at: "2023-05-22T09:04:55.803720",
                            veiculo_id: 942,
                        },
                        {
                            id: 2656,
                            url: "https://img.olx.com.br/images/97/971355762941622.jpg",
                            status: "ativo",
                            created_at: "2023-05-22T09:04:55.770864",
                            veiculo_id: 942,
                        },
                        {
                            id: 2671,
                            url: "https://img.olx.com.br/images/97/972323286516446.jpg",
                            status: "ativo",
                            created_at: "2023-05-22T09:04:55.859789",
                            veiculo_id: 942,
                        },
                        {
                            id: 2664,
                            url: "https://img.olx.com.br/images/97/972379889316994.jpg",
                            status: "ativo",
                            created_at: "2023-05-22T09:04:55.815257",
                            veiculo_id: 942,
                        },
                        {
                            id: 2670,
                            url: "https://img.olx.com.br/images/97/973319285039765.jpg",
                            status: "ativo",
                            created_at: "2023-05-22T09:04:55.854000",
                            veiculo_id: 942,
                        },
                        {
                            id: 2673,
                            url: "https://img.olx.com.br/images/97/973351407574283.jpg",
                            status: "ativo",
                            created_at: "2023-05-22T09:04:55.871455",
                            veiculo_id: 942,
                        },
                        {
                            id: 2659,
                            url: "https://img.olx.com.br/images/97/974385762238083.jpg",
                            status: "ativo",
                            created_at: "2023-05-22T09:04:55.787058",
                            veiculo_id: 942,
                        },
                        {
                            id: 2663,
                            url: "https://img.olx.com.br/images/97/975362289134175.jpg",
                            status: "ativo",
                            created_at: "2023-05-22T09:04:55.808752",
                            veiculo_id: 942,
                        },
                        {
                            id: 2669,
                            url: "https://img.olx.com.br/images/97/976315764619787.jpg",
                            status: "ativo",
                            created_at: "2023-05-22T09:04:55.847739",
                            veiculo_id: 942,
                        },
                        {
                            id: 2665,
                            url: "https://img.olx.com.br/images/97/976368048762867.jpg",
                            status: "ativo",
                            created_at: "2023-05-22T09:04:55.820815",
                            veiculo_id: 942,
                        },
                        {
                            id: 2660,
                            url: "https://img.olx.com.br/images/97/977309767673891.jpg",
                            status: "ativo",
                            created_at: "2023-05-22T09:04:55.792415",
                            veiculo_id: 942,
                        },
                        {
                            id: 2661,
                            url: "https://img.olx.com.br/images/97/977340764184546.jpg",
                            status: "ativo",
                            created_at: "2023-05-22T09:04:55.798145",
                            veiculo_id: 942,
                        },
                        {
                            id: 2658,
                            url: "https://img.olx.com.br/images/97/977355647286186.jpg",
                            status: "ativo",
                            created_at: "2023-05-22T09:04:55.782244",
                            veiculo_id: 942,
                        },
                        {
                            id: 2657,
                            url: "https://img.olx.com.br/images/97/977381283513280.jpg",
                            status: "ativo",
                            created_at: "2023-05-22T09:04:55.776315",
                            veiculo_id: 942,
                        },
                        {
                            id: 2667,
                            url: "https://img.olx.com.br/images/97/979333281769435.jpg",
                            status: "ativo",
                            created_at: "2023-05-22T09:04:55.834433",
                            veiculo_id: 942,
                        },
                    ],
                },
                {
                    modelo: "Edge",
                    marca: "Ford",
                    url: "https://pr.olx.com.br/regiao-de-curitiba-e-paranagua/autos-e-pecas/carros-vans-e-utilitarios/ford-edge-limited-2011-completona-top-1174872827",
                    site: "https://www.olx.com.br",
                    id: 21,
                    ano: 2011,
                    titulo: "Ford Edge limited 2011 completona top ",
                    status: "ativo",
                    created_at: "2023-05-05T17:31:04.740682",
                    historicos: [
                        {
                            quilometragem: 180000,
                            descricao: "Ford Edge limited 2011 completona top ",
                            veiculo_id: 21,
                            created_at: "2023-05-05T17:31:04.746003",
                            datahora: "2023-05-05T14:31:04.743293",
                            valor: 57900,
                            id: 21,
                        },
                        {
                            quilometragem: 180000,
                            descricao:
                                "Primeiramente, LOJISTAS NÃO TENHO INTERESSE EM ENCHER SEU PÁTIO NÃO INSISTA, se tem cliente venha ver pague e leve.<br><br>Agora desculpe pela mensagem você que tem interesse e vamos ao anúncio:<br>completo top <br>Ar condicionado <br>Direção Hidraulica <br>Vidros elétricos<br>Travas elétricas <br>Bancos em couro <br>Sensor de estacionamento <br>Câmera de ré <br>Acionamento automático faróis <br>Acionamento automático limpador pára-brisa<br>Alarme <br>Multimidia <br><br>Led farol e milha <br>Molas preparadas <br>Amortecedores encurtados <br>Step novo <br>Cartão reserva <br>Manual <br>Um belo carro para quem não quer se incomodar.<br>Quer um carro para desfilar e curtir seus finais de semana ou até mesmo para seu uso dia dia este é o carro pra você.<br>Analiso trocas em carros principalmente des de que não queira que eu pague todo juros rs <br>Troco por carros sedan como Audi a4 BMW 320i X1 elantra fusion <br><br> <br>",
                            veiculo_id: 21,
                            created_at: "2023-05-22T09:03:05.711100",
                            datahora: "2023-05-22T06:03:05.707008",
                            valor: 59900,
                            id: 255,
                        },
                    ],
                    imagens: [
                        {
                            id: 21,
                            url: "https://img.olx.com.br/images/80/807374041880364.jpg",
                            status: "ativo",
                            created_at: "2023-05-05T17:31:04.750536",
                            veiculo_id: 21,
                        },
                        {
                            id: 299,
                            url: "https://img.olx.com.br/images/81/811348640558141.jpg",
                            status: "ativo",
                            created_at: "2023-05-08T10:05:14.092337",
                            veiculo_id: 21,
                        },
                        {
                            id: 301,
                            url: "https://img.olx.com.br/images/81/812370648681281.jpg",
                            status: "ativo",
                            created_at: "2023-05-08T10:05:14.101247",
                            veiculo_id: 21,
                        },
                        {
                            id: 295,
                            url: "https://img.olx.com.br/images/81/813323649843262.jpg",
                            status: "ativo",
                            created_at: "2023-05-08T10:05:14.071752",
                            veiculo_id: 21,
                        },
                        {
                            id: 297,
                            url: "https://img.olx.com.br/images/81/814303643968811.jpg",
                            status: "ativo",
                            created_at: "2023-05-08T10:05:14.082296",
                            veiculo_id: 21,
                        },
                        {
                            id: 300,
                            url: "https://img.olx.com.br/images/81/815302162492130.jpg",
                            status: "ativo",
                            created_at: "2023-05-08T10:05:14.096701",
                            veiculo_id: 21,
                        },
                        {
                            id: 294,
                            url: "https://img.olx.com.br/images/81/817373162993051.jpg",
                            status: "ativo",
                            created_at: "2023-05-08T10:05:14.066132",
                            veiculo_id: 21,
                        },
                        {
                            id: 296,
                            url: "https://img.olx.com.br/images/81/818310764837638.jpg",
                            status: "ativo",
                            created_at: "2023-05-08T10:05:14.077745",
                            veiculo_id: 21,
                        },
                        {
                            id: 298,
                            url: "https://img.olx.com.br/images/81/819346407776258.jpg",
                            status: "ativo",
                            created_at: "2023-05-08T10:05:14.086699",
                            veiculo_id: 21,
                        },
                        {
                            id: 2653,
                            url: "https://img.olx.com.br/images/98/985343765015803.jpg",
                            status: "ativo",
                            created_at: "2023-05-22T09:03:05.699539",
                            veiculo_id: 21,
                        },
                        {
                            id: 2652,
                            url: "https://img.olx.com.br/images/98/985393167313162.jpg",
                            status: "ativo",
                            created_at: "2023-05-22T09:03:05.693805",
                            veiculo_id: 21,
                        },
                        {
                            id: 2654,
                            url: "https://img.olx.com.br/images/98/986311163539122.jpg",
                            status: "ativo",
                            created_at: "2023-05-22T09:03:05.704635",
                            veiculo_id: 21,
                        },
                        {
                            id: 2651,
                            url: "https://img.olx.com.br/images/98/986329762063575.jpg",
                            status: "ativo",
                            created_at: "2023-05-22T09:03:05.687162",
                            veiculo_id: 21,
                        },
                        {
                            id: 2650,
                            url: "https://img.olx.com.br/images/98/986338287398641.jpg",
                            status: "ativo",
                            created_at: "2023-05-22T09:03:05.678711",
                            veiculo_id: 21,
                        },
                    ],
                },
                {
                    modelo: "Edge",
                    marca: "Ford",
                    url: "https://pr.olx.com.br/regiao-de-foz-do-iguacu-e-cascavel/autos-e-pecas/carros-vans-e-utilitarios/ford-edge-limited-3-5-v6-24v-awd-aut-1185900661",
                    site: "https://www.olx.com.br",
                    id: 712,
                    ano: 2013,
                    titulo: "FORD EDGE LIMITED 3.5 V6 24V AWD AUT.",
                    status: "ativo",
                    created_at: "2023-05-17T09:35:46.147327",
                    historicos: [
                        {
                            quilometragem: 139000,
                            descricao:
                                "Ford Edge para pessoas exigentes, versão limited 4x4, branca perola com teto solar panorâmico, sem retoques na lata (laudo premium) pneus novos, ipva 2023 pago, revisada, óleo de motor e caixa trocados, suspensão sem nada pra fazer, carro impecável, manual chave reserva... | Enviado por Gestorcar",
                            veiculo_id: 712,
                            created_at: "2023-05-19T09:11:42.420757",
                            datahora: "2023-05-19T06:11:42.417831",
                            valor: 73500,
                            id: 246,
                        },
                    ],
                    imagens: [
                        {
                            id: 1308,
                            url: "https://img.olx.com.br/images/93/930332044558872.jpg",
                            status: "ativo",
                            created_at: "2023-05-17T09:38:25.662167",
                            veiculo_id: 712,
                        },
                        {
                            id: 1310,
                            url: "https://img.olx.com.br/images/93/930381885334282.jpg",
                            status: "ativo",
                            created_at: "2023-05-17T09:38:25.672268",
                            veiculo_id: 712,
                        },
                        {
                            id: 1318,
                            url: "https://img.olx.com.br/images/93/933303164121363.jpg",
                            status: "ativo",
                            created_at: "2023-05-17T09:38:25.712536",
                            veiculo_id: 712,
                        },
                        {
                            id: 1314,
                            url: "https://img.olx.com.br/images/93/933381162211709.jpg",
                            status: "ativo",
                            created_at: "2023-05-17T09:38:25.692822",
                            veiculo_id: 712,
                        },
                        {
                            id: 1311,
                            url: "https://img.olx.com.br/images/93/934317760735028.jpg",
                            status: "ativo",
                            created_at: "2023-05-17T09:38:25.677622",
                            veiculo_id: 712,
                        },
                        {
                            id: 1313,
                            url: "https://img.olx.com.br/images/93/934319042644682.jpg",
                            status: "ativo",
                            created_at: "2023-05-17T09:38:25.687447",
                            veiculo_id: 712,
                        },
                        {
                            id: 1307,
                            url: "https://img.olx.com.br/images/93/935307040213174.jpg",
                            status: "ativo",
                            created_at: "2023-05-17T09:38:25.656818",
                            veiculo_id: 712,
                        },
                        {
                            id: 1315,
                            url: "https://img.olx.com.br/images/93/935327887695053.jpg",
                            status: "ativo",
                            created_at: "2023-05-17T09:38:25.697413",
                            veiculo_id: 712,
                        },
                        {
                            id: 1317,
                            url: "https://img.olx.com.br/images/93/936313404742825.jpg",
                            status: "ativo",
                            created_at: "2023-05-17T09:38:25.707538",
                            veiculo_id: 712,
                        },
                        {
                            id: 1312,
                            url: "https://img.olx.com.br/images/93/936371165651250.jpg",
                            status: "ativo",
                            created_at: "2023-05-17T09:38:25.682301",
                            veiculo_id: 712,
                        },
                        {
                            id: 1309,
                            url: "https://img.olx.com.br/images/93/937389402594878.jpg",
                            status: "ativo",
                            created_at: "2023-05-17T09:38:25.667439",
                            veiculo_id: 712,
                        },
                        {
                            id: 1316,
                            url: "https://img.olx.com.br/images/93/937397280882172.jpg",
                            status: "ativo",
                            created_at: "2023-05-17T09:38:25.702526",
                            veiculo_id: 712,
                        },
                        {
                            id: 1306,
                            url: "https://img.olx.com.br/images/93/938315761401758.jpg",
                            status: "ativo",
                            created_at: "2023-05-17T09:38:25.650411",
                            veiculo_id: 712,
                        },
                    ],
                },
                {
                    modelo: "Edge",
                    marca: "Ford",
                    url: "https://pr.olx.com.br/regiao-de-foz-do-iguacu-e-cascavel/autos-e-pecas/carros-vans-e-utilitarios/ford-edge-2014-automatico-limited-top-de-linha-1186318363",
                    site: "https://www.olx.com.br",
                    id: 852,
                    ano: 2014,
                    titulo: "Ford Edge 2014 Automatico - Limited (Top De Linha )",
                    status: "ativo",
                    created_at: "2023-05-18T09:05:21.879763",
                    historicos: [
                        {
                            quilometragem: 93000,
                            descricao:
                                "Aceito MT-09 e CB1000 como forma de pagamento.<br><br>Rodas Aro 20<br>Bancos em Couro Vermelho<br>Sistema de som da Sony com 8 Auto Falantes + SubWoofer<br>Ar condicionado Dual Zone<br><br>Nao aceito carro de maior valor ou terreno!",
                            veiculo_id: 852,
                            created_at: "2023-05-18T09:08:09.118956",
                            datahora: "2023-05-18T06:08:09.115469",
                            valor: 79000,
                            id: 170,
                        },
                    ],
                    imagens: [
                        {
                            id: 1420,
                            url: "https://img.olx.com.br/images/94/940317041193174.jpg",
                            status: "ativo",
                            created_at: "2023-05-18T09:08:09.107914",
                            veiculo_id: 852,
                        },
                        {
                            id: 1415,
                            url: "https://img.olx.com.br/images/94/941343886498235.jpg",
                            status: "ativo",
                            created_at: "2023-05-18T09:08:09.081613",
                            veiculo_id: 852,
                        },
                        {
                            id: 1416,
                            url: "https://img.olx.com.br/images/94/941355409582344.jpg",
                            status: "ativo",
                            created_at: "2023-05-18T09:08:09.087053",
                            veiculo_id: 852,
                        },
                        {
                            id: 1414,
                            url: "https://img.olx.com.br/images/94/943320647687953.jpg",
                            status: "ativo",
                            created_at: "2023-05-18T09:08:09.075108",
                            veiculo_id: 852,
                        },
                        {
                            id: 1418,
                            url: "https://img.olx.com.br/images/94/943360520385491.jpg",
                            status: "ativo",
                            created_at: "2023-05-18T09:08:09.097966",
                            veiculo_id: 852,
                        },
                        {
                            id: 1413,
                            url: "https://img.olx.com.br/images/94/946370522540242.jpg",
                            status: "ativo",
                            created_at: "2023-05-18T09:08:09.067044",
                            veiculo_id: 852,
                        },
                        {
                            id: 1419,
                            url: "https://img.olx.com.br/images/94/947330162585510.jpg",
                            status: "ativo",
                            created_at: "2023-05-18T09:08:09.102985",
                            veiculo_id: 852,
                        },
                        {
                            id: 1417,
                            url: "https://img.olx.com.br/images/94/948334881479003.jpg",
                            status: "ativo",
                            created_at: "2023-05-18T09:08:09.092490",
                            veiculo_id: 852,
                        },
                        {
                            id: 1421,
                            url: "https://img.olx.com.br/images/94/949352881448998.jpg",
                            status: "ativo",
                            created_at: "2023-05-18T09:08:09.113062",
                            veiculo_id: 852,
                        },
                    ],
                },
            ];
        }

        console.log(filterAno);
        setVeiculos(_veiculos);
    };

    const onClickCheckVeiculo = (id: number) => {
        const newList = veiculos.map((veiculo) => {
            if (veiculo.id === id) {
                const updatedItem = {
                    ...veiculo,
                    status: veiculo.status != "ativo" ? "ativo" : "inativo",
                };

                updateStatusveiculo(updatedItem.id, updatedItem.status).then(
                    (response) => console.log(response)
                );

                return updatedItem;
            }

            return veiculo;
        });

        setVeiculos(newList);
    };

    console.log(filterAno);
    return (
        <div className="container row-auto flex-row h-auto mx-auto">
            {/* TITLE */}
            <h1 className="text-center text-3xl p-4">Edge finder</h1>

            {/* FILTER */}
            <div className="flex justify-center border">
                <button
                    onClick={() => verificarStatusImagens()}
                    className="relative w-fit rounded-md shadow-sm border border-gray-500 h-8 px-2 font-semibold bg-blue-400 hover:bg-zinc-300"
                >
                    Atualizar Imagens
                </button>
                <DropdownButton
                    title="Site"
                    items={[
                        [...filterSites].map((item) => (
                            <li
                                // onClick={() => alert("teste")}
                                className="w-auto py-1 px-2 hover:bg-gray-200"
                            >
                                {item}
                            </li>
                        )),
                    ]}
                />
                <DropdownButton
                    title="Marca"
                    items={[
                        [...filterMarca].map((item) => (
                            <li
                                // onClick={() => alert("teste")}
                                className="w-auto py-1 px-2 hover:bg-gray-200"
                            >
                                {item}
                            </li>
                        )),
                    ]}
                />
                <DropdownButton
                    title="Modelo"
                    items={[
                        [...filterModelo].map((item) => (
                            <li
                                // onClick={() => alert("teste")}
                                className="w-auto py-1 px-2 hover:bg-gray-200"
                            >
                                {item}
                            </li>
                        )),
                    ]}
                />
                <DropdownButton
                    title="Ano"
                    items={[
                        [...filterAno].map((item) => (
                            <li
                                // onClick={() => alert("teste")}
                                className="w-auto py-1 px-2 hover:bg-gray-200"
                            >
                                {item}
                            </li>
                        )),
                    ]}
                />
            </div>

            {/* MAIN */}
            <main className="flex flex-wrap justify-center gap-y-4 gap-x-2 pt-4 xl:px-0">
                {veiculos.map((veiculo, key) => (
                    <div
                        key={key}
                        className="flex-col rounded-lg max-w-md p-1 basis-full xl:basis-3/12 bg-white shadow-2xl border"
                    >
                        <div className="flex items-center h-80 rounded-lg">
                            <img
                                className="flex-shrink-0 mx-auto max-h-80 w-fist m-auto rounded-md"
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
                        <div className="col-span-2 h-28 mt-1 p-2 rounded-sm bg-slate-200 ">
                            <div className="flex text-lg font-medium place-content-between">
                                <a href={veiculo.url} target="_blank">
                                    {veiculo.marca} {veiculo.modelo}{" "}
                                    {veiculo.status}
                                </a>
                                <div
                                    onClick={() =>
                                        onClickCheckVeiculo(veiculo.id)
                                    }
                                    className="hover:cursor-pointer"
                                >
                                    {veiculo.status != "ativo" ? (
                                        <i className="fa-regular fa-circle-check"></i>
                                    ) : (
                                        <i className="fa-solid fa-circle-check"></i>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col pt-0.5 border-t border-gray-400">
                                {veiculo.historicos?.map((historico, index) => (
                                    <div
                                        key={index}
                                        className="flex place-content-between"
                                    >
                                        <p className="">
                                            {new Date(
                                                historico.datahora
                                            ).toLocaleDateString("sv")}
                                        </p>
                                        <p>KM: {historico.quilometragem}</p>
                                        <p>Preço: {historico.valor}</p>
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
