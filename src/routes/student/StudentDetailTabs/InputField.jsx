import { Fragment } from "react";

export default function InputField({
    label,
    value,
    name,
    disabled,
    type,
    pattern,
    maxLength,
    size,
    onChange,
}) {
    return (
        <div className="flex flex-col items-start">
            <label htmlFor={name} className="text-xs font-medium">
                {label}
            </label>
            <input
                className={
                    (disabled
                        ? "text-gray-600 bg-gray-200"
                        : "text-black bg-white") +
                    " py-1 px-2 mt-1 font-semibold text-sm rounded-lg border-2 border-slate-200"
                }
                disabled={disabled}
                id={name}
                type={type}
                pattern={pattern}
                placeholder={value === "" ? "Empty" : value}
                name={name}
                maxLength={maxLength}
                size={size}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}
