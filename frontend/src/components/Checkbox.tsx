interface CheckboxProps {
    name: string;
    title: string;
    checked?: boolean;
    onChange?: React.ChangeEventHandler;
}

export default function Checkbox({ name, title, checked = false, onChange }: CheckboxProps) {
    return (
        <div className="flex items-center ">
            <input className="mr-1 h-3.5 w-3.5 accent-sky-600" type="checkbox" id={name} name={name} checked={checked} onChange={onChange} />
            <label htmlFor={name}>{title}</label>
        </div>
    );
}
