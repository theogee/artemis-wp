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
import LandingPage from "./routes/common/LandingPage";
import Login, {
    action as loginAction,
    loader as loginLoader,
} from "./routes/common/Login";
import {
    default as StudentDetailEditable,
    loader as studentDetailEditableLoader,
} from "./routes/student/StudentDetail";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/login",
        element: <Login />,
        action: loginAction,
        loader: loginLoader,
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
            {
                path: "detail",
                element: <StudentDetailEditable />,
                loader: async () => studentDetailEditableLoader("student"),
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
