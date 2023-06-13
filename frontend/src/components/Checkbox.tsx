interface CheckboxProps {
    name: string;
    title: string;
    onChange?: React.ChangeEventHandler;
}

export default function Checkbox({ name, title, onChange }: CheckboxProps) {
    return (
        <div className="flex content-center items-center justify-center">
            <input className="mr-1 h-3.5 w-3.5 accent-sky-600" type="checkbox" id={name} name={name} onChange={onChange} />
            <label htmlFor={name}>{title}</label>
        </div>
    );
}
