export default function StandardField({ label, value }) {
    return (
        <div>
            <p className="text-xs font-medium">{label}</p>
            {value === "" ? (
                <p className="text-sm italic text-gray-300">Empty</p>
            ) : (
                <p className="text-sm font-bold">{value}</p>
            )}
        </div>
    );
}
