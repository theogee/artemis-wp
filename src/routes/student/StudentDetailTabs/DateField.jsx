export default function DateField({ label, value, name, disabled, onChange }) {
    const today = new Date();
    const currentYear = today.getFullYear();

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
                type="date"
                name={name}
                value={value}
                onChange={onChange}
                min={currentYear - 5 + "-01-01"}
                max={currentYear + 5 + "-12-31"}
            />
        </div>
    );
}
