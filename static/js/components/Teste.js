import JSX from "../index2.js";
function Teste() {
    return (JSX.createElement("h2", null, "Acho que funciona"));
}
export default function Hello(name) {
    return (JSX.createElement("div", { className: "asd" },
        "Hello ",
        name,
        JSX.createElement("div", null, " Hello Nested "),
        JSX.createElement("div", null, " Hello Nested 2"),
        JSX.createElement("button", { onClick: () => console.log("Teste") }, "Teste"),
        JSX.createElement(Teste, null,
            JSX.createElement("h3", null, "Agora j\u00E1 n\u00E3o sei se funciona"))));
}
;
// const Button = ({ children: any, onClick: any }) => (
//   <button onClick={onClick}>{children}</button>
// );
// export default Button;
