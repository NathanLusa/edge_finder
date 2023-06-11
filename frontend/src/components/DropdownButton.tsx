import { useState, useEffect, useRef } from "react";

function useComponentVisible(initialIsVisible: boolean) {
    const [isComponentVisible, setIsComponentVisible] =
        useState(initialIsVisible);
    const ref = useRef(null);

    const handleHideDropdown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            setIsComponentVisible(false);
        }
    };

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsComponentVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", handleHideDropdown, true);
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("keydown", handleHideDropdown, true);
            document.removeEventListener("click", handleClickOutside, true);
        };
    });

    return { ref, isComponentVisible, setIsComponentVisible };
}

interface DropdownButtonProp {
    title: string;
    items?: string[] | React.ReactNode[];
}

function DropdownButton(props: DropdownButtonProp) {
    const { ref, isComponentVisible, setIsComponentVisible } =
        useComponentVisible(false);

    const onClick = () => {
        setIsComponentVisible(!isComponentVisible);
    };

    return (
        <div ref={ref} className="relative w-fit rounded-md shadow-sm ">
            <button
                onClick={onClick}
                type="button"
                className="flex items-center border border-gray-500 h-8 rounded-md font-semibold bg-blue-400 hover:bg-zinc-300"
            >
                <div className="flex-shrink-0 border-r border-gray-500 px-2 ">
                    {props.title}
                </div>
                <div className="w-8">
                    <i className="fa-solid fa-chevron-down"></i>
                </div>
            </button>

            <div
                className={
                    "absolute " +
                    (isComponentVisible ? "" : "hidden") +
                    " rounded min-w-max bg-white shadow-sm "
                }
            >
                <ul className="" style={{ minWidth: "7rem" }}>
                    {props.items?.map((item, key) => (
                        <div
                            key={key}
                            onClick={onClick}
                            className="cursor-pointer"
                        >
                            {item}
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default DropdownButton;
