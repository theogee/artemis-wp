import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Login, {action as loginAction} from "./routes/common/Login"
import Dashboard, { loader as dashboardLoader } from "./routes/common/Dashboard"

const router = createBrowserRouter([
    {
        path: "/",
        element: <div className="font-sans">Hello from Artemis Web Platform!</div>
    },
    {
        path: "/login",
        element: <Login />,
        action: loginAction
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
        loader: dashboardLoader
    }
])

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);

