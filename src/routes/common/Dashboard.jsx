import { redirect, useLoaderData } from "react-router-dom";
import { default as AdminDashboard } from "../admin/Dashboard";
import { default as StudentDashboard } from "../student/Dashboard";

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

    if (data.fetchError) {
        throw new Error("500 Server Error");
    }

    return data.data.userType === "admin" ? (
        <AdminDashboard />
    ) : (
        <StudentDashboard />
    );
}
