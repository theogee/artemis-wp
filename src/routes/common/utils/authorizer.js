import { redirect } from "react-router";

const authorizer = async (allowedRole) => {
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

        const role = data.data.userType;

        if (role === allowedRole) return;
        else redirect("/login");
    } catch (e) {
        console.log(`unexpected error: ${e}`);
        throw new Error(e);
    }
};

export default authorizer;
