import { NavLink, Outlet } from "react-router-dom";
import { SearchIcon, UploadIcon } from "../common/misc/SVG";

function Navigation({ className: parentClass }) {
    const buttons = [
        {
            to: "discover",
            text: "Discover",
            element: (
                <SearchIcon
                    w={25}
                    h={25}
                    className="fill-black"
                    onClick={() => {}}
                />
            ),
        },
        {
            to: "upload",
            text: "Upload",
            element: (
                <UploadIcon
                    w={25}
                    h={25}
                    className="fill-black"
                    onClick={() => {}}
                />
            ),
        },
    ];

    return (
        <nav className={parentClass}>
            {buttons.map((b, i) => (
                <NavLink
                    to={b.to}
                    className={({ isActive }) => {
                        const common =
                            "relative w-10 h-10 flex justify-center items-center rounded-full transition-all duration-300 ease-linear";
                        return isActive ? common + " bg-violet-200" : common;
                    }}
                    key={i}
                >
                    {({ isActive }) => {
                        let common =
                            "absolute left-14 font-bold text-sm transition-all";
                        common = isActive
                            ? common + " text-black"
                            : common + " text-transparent";

                        return (
                            <>
                                <p className={common}>{b.text}</p>
                                {b.element}
                            </>
                        );
                    }}
                </NavLink>
            ))}
        </nav>
    );
}

export default function Dashboard() {
    return (
        <div className="flex h-screen">
            <Navigation className="w-1/5 flex flex-col items-center justify-center gap-10" />
            <Outlet />
        </div>
    );
}
