import JSX from "./index2";
function Hello(name) {
    return (JSX.createElement("div", { className: "asd" },
        "Hello ",
        name,
        JSX.createElement("div", null, " Hello Nested "),
        JSX.createElement("div", null, " Hello Nested 2")));
}
;
// const Button = ({ children: any, onClick: any }) => (
//   <button onClick={onClick}>{children}</button>
// );
// export default Button;
