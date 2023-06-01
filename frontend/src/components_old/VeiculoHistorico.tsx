import { VeiculoHistoricoSchema } from "../schemas";

function VeiculoHistorico({ ...historico }: VeiculoHistoricoSchema) {
    return (
        <div key={historico.id}>
            <h6>{historico.descricao}</h6>
            <h6><span className="badge bg-primary"><i className="fa-solid fa-sack-dollar"></i></span> {historico.valor}</h6>
            <h6><span className="badge bg-primary"><i className="fa-regular fa-gauge"></i></span> {historico.quilometragem}</h6>
            <h6><span className="badge bg-primary"><i className="fa-solid fa-clock"></i></span> {historico.datahora}</h6>
            <hr className="hr" />
        </div>
    )
}

export default VeiculoHistorico