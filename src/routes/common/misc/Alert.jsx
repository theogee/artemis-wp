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
            className={`${color} ${parentClass} py-4 px-4 block text-xs rounded-lg bg-black font-medium flex items-center`}
        >
            <p className={`${color} mr-5`}>{message}</p>
            <CloseIcon
                w="22"
                h="22"
                className={color.replace("text-", "fill-")}
                onClick={onClick}
            />
        </div>
    );
}
