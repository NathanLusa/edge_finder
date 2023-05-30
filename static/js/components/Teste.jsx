import JSX from "../index2.js";
export default function Hello(name) {
    return (<div className="asd">
            Hello {name}
            <div> Hello Nested </div>
            <div> Hello Nested 2</div>
            <button onClick={() => console.log("Teste")}>Teste</button>
        </div>);
}
;
// const Button = ({ children: any, onClick: any }) => (
//   <button onClick={onClick}>{children}</button>
// );
// export default Button;
