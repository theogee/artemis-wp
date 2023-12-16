import { useEffect, useState } from "react";
import { NavLink, Outlet, useActionData } from "react-router-dom";
import Alert from "../common/misc/Alert";
import { LogoutIcon, SearchIcon, UploadIcon } from "../common/misc/SVG";

function Navigation({ className: parentClass }) {
    const [alert, setAlert] = useState({
        active: false,
        msg: "",
    });

    const logout = async () => {
        const endpoint = "/api/logout";

        const response = await fetch(endpoint, {
            method: "POST",
            credentials: "include",
        });

        if (response.status !== 200) {
            setAlert({
                active: true,
                msg: "Internal server error has occured. Please try again later.",
                level: "error",
            });
        }
    };

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
        {
            to: "/",
            text: "Logout",
            element: (
                <LogoutIcon
                    w={25}
                    h={25}
                    className="fill-black"
                    onClick={logout}
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
            <Navigation className="w-1/12 flex flex-col items-center justify-center gap-10" />
            <Outlet context={{ className: "w-11/12" }} />
            <Alert
                className={
                    `absolute bottom-10 transition-all duration-500 ` +
                    (alert.active ? "left-10" : "-left-full")
                }
                level={alert.level}
                message={alert.msg}
                onClick={() => setAlert({ active: false, msg: "" })}
            />
        </div>
    );
}
