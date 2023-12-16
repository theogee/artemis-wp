export default function TextField({
    label,
    value,
    name,
    disabled,
    maxLength,
    rows,
    cols,
    onChange,
}) {
    return (
        <div className="flex flex-col items-start">
            <label htmlFor={name} className="text-xs font-medium">
                {label}
            </label>
            <textarea
                className={
                    (disabled
                        ? "text-gray-600 bg-gray-200"
                        : "text-black bg-white") +
                    " py-1 px-2 mt-1 font-semibold text-sm rounded-lg border-2 border-slate-200 resize-none"
                }
                disabled={disabled}
                id={name}
                placeholder={value === "" ? "Empty" : value}
                name={name}
                maxLength={maxLength}
                rows={rows}
                cols={cols}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}
