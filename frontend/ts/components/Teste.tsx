import JSX from "../index2.js";

function Teste() {
    return (
        <h2>Acho que funciona</h2>
    )
}

export default function Hello(name: string) {
    return (
        <div className="asd">
            Hello {name}
            <div> Hello Nested </div>
            <div> Hello Nested 2</div>
            <button onClick={() => console.log("Teste")}>Teste</button>
            <Teste>
                <h3>Agora já não sei se funciona</h3>
            </Teste>
        </div>
    );
};


// const Button = ({ children: any, onClick: any }) => (
//   <button onClick={onClick}>{children}</button>
// );
// export default Button;