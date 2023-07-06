import { CloseIcon } from "./SVG";

export default function Alert({
    className: parentClass,
    level,
    message,
    onClick,
}) {
    const color =
        level === "error"
            ? "text-red-400"
            : level === "warning"
            ? "text-yellow-400"
            : level === "success"
            ? "text-green-400"
            : "text-white";
    return (
        <div
            className={`${color} ${parentClass} py-4 px-4 text-xs rounded-lg bg-black font-medium flex items-center min-w-[300px] justify-between`}
        >
            <p className={`${color}`}>{message}</p>
            <CloseIcon
                w="22"
                h="22"
                className={color.replace("text-", "fill-")}
                onClick={onClick}
            />
        </div>
    );
}
