import JSX from "./index2";

function Hello(name: string) {
    return (
        <div className="asd">
            Hello {name}
            <div> Hello Nested </div>
            <div> Hello Nested 2</div>
        </div>
    );
};


// const Button = ({ children: any, onClick: any }) => (
//   <button onClick={onClick}>{children}</button>
// );
// export default Button;