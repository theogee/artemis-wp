import { useEffect, useState } from "react";
import { Form, redirect, useActionData } from "react-router-dom";
import Copyright from "./Copyright";
import DesktopRestriction from "./DesktopRestriction";
import Alert from "./misc/Alert";

export async function loader() {
    const endpoint = "/api/meta";
    const response = await fetch(endpoint, {
        method: "POST",
        credentials: "include",
    });

    if (response.status === 200) {
        return redirect("/dashboard");
    }

    return null;
}

export async function action({ request }) {
    try {
        const formData = await request.formData();
        const payload = Object.fromEntries(formData);

        const endpoint = "/api/login";
        const response = await fetch(endpoint, {
            method: "post",
            headers: {
                "content-type": "application/x-www-form-urlencoded",
            },
            credentials: "include",
            body: new URLSearchParams(payload).toString(),
        });

        const data = await response.json();

        if (!data.success) {
            // TODO: popup error message

            // internal server error
            if (data.servError) {
                if (data.servError.length !== 0) {
                    const errorMsg = data.servError.join(", ");
                    console.log(`internal server error: ${errorMsg}`);
                    return data;
                }
            }

            // bad request error
            if (data.data) {
                const errorMsg = data.data.errMessage.join(", ");
                console.log(`bad request: ${errorMsg}`);
                return data;
            }
        }

        return redirect("/dashboard");
    } catch (e) {
        // fetch error
        console.log(`unexpected error while logging in: ${e}`);
        return { fetchError: e };
    }
}

export default function Login() {
    const data = useActionData();
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [alert, setAlert] = useState({ active: false, msg: "" });

    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1600);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1600);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (data) {
            if (data.servError) {
                setAlert({
                    active: true,
                    msg: "Internal server error has occured. Please try again later.",
                });
                return;
            }

            if (data.fetchError) {
                setAlert({
                    active: true,
                    msg: "Unexpected error has occured. Please try again later.",
                });
                return;
            }

            setUsernameError(data.data.usernameError);
            setPasswordError(data.data.passwordError);
        }
    }, [data]);

    const handleChangeUsername = () => {
        if (usernameError) setUsernameError("");
    };

    const handleChangePassword = () => {
        if (passwordError) setPasswordError("");
    };

    if (!isDesktop) {
        return <DesktopRestriction />;
    }

    return (
        <div className="flex overflow-hidden relative">
            <div className="h-screen w-6/12 flex items-center bg-[url('assets/login-bg.png')] bg-cover bg-no-repeat ">
                <p className="ml-20 font-sans font-bold text-gray-50 text-8xl">
                    Welcome
                    <br />
                    Back!
                </p>
            </div>
            <div className="w-8/12 flex justify-center items-center">
                <Form method="post">
                    <p className="mb-4 text-3xl font-bold">Hallo! 👋</p>
                    <p className="mb-6 font-semibold text-gray-500">
                        Welcome back! Please login to your account.
                    </p>
                    <label
                        className="mb-2 block text-sm text-gray-600 font-semibold"
                        htmlFor="username"
                    >
                        Username
                    </label>
                    <input
                        className="block w-full py-2 px-3 mb-2 font-semibold text-sm text-gray-600 rounded-lg border-2 border-slate-200 "
                        id="username"
                        type="text"
                        name="username"
                        placeholder="Enter your username"
                        onChange={handleChangeUsername}
                    />
                    <p className="text-xs text-red-500" id="username-error">
                        {usernameError}
                    </p>
                    <label
                        className="mb-2 mt-4 block text-sm text-gray-600 font-semibold"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <input
                        className="block w-full py-2 px-3 mb-2 font-semibold text-sm text-gray-600 rounded-lg border-2 border-slate-200 "
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        onChange={handleChangePassword}
                    />
                    <p className="text-xs text-red-500" id="password-error">
                        {passwordError}
                    </p>
                    <button
                        className="py-2 px-3 w-full mt-8 font-extrabold text-zinc-50 bg-stone-950 rounded-lg"
                        type="submit"
                    >
                        Login
                    </button>
                </Form>
            </div>
            <Alert
                className={
                    `absolute bottom-10 transition-all duration-500 ` +
                    (alert.active ? "left-10" : "-left-full")
                }
                level="error"
                message={alert.msg}
                onClick={() => setAlert({ active: false, msg: "" })}
            />
            <Copyright />
        </div>
    );
}
