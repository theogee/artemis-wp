import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Discover, {
    action as discoverAction,
    loader as discoverLoader,
} from "./routes/admin/Discover";
import StudentDetail, {
    loader as studentDetailLoader,
} from "./routes/admin/StudentDetail";
import Upload, {
    action as uploadAction,
    loader as uploadLoader,
} from "./routes/admin/Upload";
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
        // every route that needs to be authorized, must have a loader which will invoke authorizer("role")
        path: "/dashboard",
        element: <Dashboard />,
        loader: dashboardLoader,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "discover",
                element: <Discover />,
                loader: async () => discoverLoader("admin"),
                action: discoverAction,
            },
            {
                path: "upload",
                element: <Upload />,
                action: uploadAction,
                loader: async () => uploadLoader("admin"),
            },
            {
                path: "students/:studentID",
                element: <StudentDetail />,
                loader: async ({ params }) =>
                    studentDetailLoader({ params, allowedRole: "admin" }),
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
