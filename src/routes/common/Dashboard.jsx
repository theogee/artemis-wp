import { useEffect, useState } from "react";
import { redirect, useLoaderData } from "react-router-dom";
import { default as AdminDashboard } from "../admin/Dashboard";
import { default as StudentDashboard } from "../student/Dashboard";
import Copyright from "./Copyright";
import DesktopRestriction from "./DesktopRestriction";

export async function loader() {
    /**
     * TODO: check if logged in & what type of user
     * fetch respective data required by the page
     *
     * Idea: await fetch("http://127.0.0.1:55555/api/meta")
     * return: {
     *      success: false,
     *      servError: ["redis service didn't accept connection"],
     *      data: {
     *          userType: "admin",
     *          isLoggedIn: true
     *      }
     * }
     *
     * from this api we can do a conditional rendering between AdminDashboard and StudentDashboard
     * */

    try {
        const endpoint = "/api/meta";
        const response = await fetch(endpoint, {
            method: "POST",
            credentials: "include",
        });

        if (response.status === 401) {
            return redirect("/login");
        }

        const data = await response.json();

        return data;
    } catch (e) {
        console.log(`unexpected error: ${e}`);
        return { fetchError: e };
    }
}

export default function Dashboard() {
    const data = useLoaderData();
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1600);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1600);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (data.fetchError) {
        throw new Error("500 Server Error");
    }

    if (!isDesktop) {
        return <DesktopRestriction />;
    }

    return (
        <>
            {data.data.userType === "admin" ? (
                <AdminDashboard />
            ) : (
                <StudentDashboard />
            )}
            <Copyright />
        </>
    );
}
