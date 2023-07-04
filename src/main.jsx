import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Discover from "./routes/admin/Discover";
import Upload from "./routes/admin/Upload";
import Dashboard, {
    loader as dashboardLoader,
} from "./routes/common/Dashboard";
import ErrorPage from "./routes/common/ErrorPage";
import Login, { action as loginAction } from "./routes/common/Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <div className="font-sans">Hello from Artemis Web Platform!</div>
        ),
        errorElement: <ErrorPage />,
    },
    {
        path: "/login",
        element: <Login />,
        action: loginAction,
        errorElement: <ErrorPage />,
    },
    {
        // call GetMeta for every routes to pre check if user is authorized to access a specific page
        // add backend middleware to authorize access based on usertype
        path: "/dashboard",
        element: <Dashboard />,
        loader: dashboardLoader,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "discover",
                element: <Discover />,
            },
            {
                path: "upload",
                element: <Upload />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
