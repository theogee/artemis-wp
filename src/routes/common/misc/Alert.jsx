import { CloseIcon } from "./SVG";

export default function Alert({
    className: parentClass,
    level,
    message,
    onClick,
}) {
    const color =
        level === "error"
            ? "#f87171"
            : level === "warning"
            ? "#facc15"
            : level === "success"
            ? "#4ade80"
            : "#ffffff";
    return (
        <div
            className={`${parentClass} py-4 px-4 text-xs rounded-lg bg-black font-medium flex items-center min-w-[300px] justify-between gap-5`}
        >
            <p style={{ color: color }}>{message}</p>
            <CloseIcon w="22" h="22" color={color} onClick={onClick} />
        </div>
    );
}
