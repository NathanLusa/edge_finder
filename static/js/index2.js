const add = (parent, child) => {
    parent.appendChild((child === null || child === void 0 ? void 0 : child.nodeType) ? child : document.createTextNode(child));
};
const appendChild = (parent, child) => {
    if (Array.isArray(child)) {
        child.forEach((nestedChild) => {
            appendChild(parent, nestedChild);
        });
    }
    else {
        // add(parent, child);
        parent.innerHTML = parent.innerHTML + child;
    }
};
export const JSX = {
    createElement(name, 
    // props: { [id: string]: string },
    props, ...content) {
        if (typeof name === "function")
            return name(props, content);
        const element = document.createElement(name);
        props = props || {};
        // const propsstr = Object.keys(props)
        //     .map((key) => {
        //         const value = props[key];
        //         // if (key.startsWith("on") && key.toLowerCase() in window) {
        //         //   element.addEventListener(key.toLowerCase().substring(0, 2), value);
        //         // } else {
        //         //   element.setAttribute(key, value);
        //         // };
        //         if (key === "className") return `class=${value}`;
        //         else return `${key}=${value}`;
        //     })
        //     .join(" ");
        Object.entries(props).forEach(([name, value]) => {
            if (name.startsWith("on") && name.toLowerCase() in window) {
                // element.addEventListener(name.toLowerCase().substr(2), value);
                console.log("on");
                element.addEventListener(name.toLowerCase().substring(2), value);
            }
            else {
                console.log("attribute");
                element.setAttribute(name, value);
            }
        });
        console.log("content", content);
        appendChild(element, content);
        console.log(element.outerHTML);
        return `<div>${element.outerHTML}</div>`;
        // return `<${name} ${propsstr}> ${content.join("")}</${name}>`;
    },
};
export default JSX;
// export const jsx /*= (tag: any, props: any) */ = {
//     createElement(tag: any, props: any, ...content: string[]) {
//         const { children } = props;
//         if (typeof tag === "function") return tag(props, children);
//         const element = document.createElement(tag);
//         Object.entries(props || {}).forEach(([name, value]) => {
//             if (name.startsWith("on") && name.toLowerCase() in window) {
//                 // element.addEventListener(name.toLowerCase().substr(2), value);
//                 element.addEventListener(
//                     name.toLowerCase().substring(2),
//                     value
//                 );
//             } else {
//                 element.setAttribute(name, value);
//             }
//         });
//         appendChild(element, children);
//         return element;
//     },
// };
// export default jsx;
