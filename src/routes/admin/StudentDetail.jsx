import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import authorizer from "../common/utils/authorizer";
import Accommodation from "./StudentDetailTabs/Accommodation";
import General from "./StudentDetailTabs/General";
import Internship from "./StudentDetailTabs/Internship";
import Passport from "./StudentDetailTabs/Passport";

export async function loader({ params, allowedRole }) {
    await authorizer(allowedRole);
    // TODO: fetch student from BE API
    // console.log(params.studentID);
    const endpoint = "/api/students/" + params.studentID;

    const response = await fetch(endpoint, {
        method: "GET",
        credentials: "include",
    });

    if (response.status === 401) throw new Error(401);

    const data = await response.json();

    if (!data.success) {
        if (data.servError) {
            if (data.servError.length !== 0) {
                const errorMsg = data.servError.join(", ");
                console.log(`internal server error: ${errorMsg}`);
                throw new Error(errorMsg);
            }
        }

        // bad request error
        if (data.data) {
            const errorMsg = data.data.errMessage.join(", ");
            console.log(`bad request: ${errorMsg}`);
            throw new Error(errorMsg);
        }
    }

    return data.data.studentData;
}

function Avatar({ givenName, surname }) {
    const getFirstLetterUppercased = (str) => {
        if (str.length === 0) {
            return "";
        }

        return str.charAt(0).toUpperCase();
    };

    let initial = "";

    const givenNameInitial = getFirstLetterUppercased(givenName);
    const surnameInitial = getFirstLetterUppercased(surname);
    if (givenNameInitial) initial += givenNameInitial;
    if (surnameInitial) initial += surnameInitial;

    return (
        <div className="rounded-full w-32 h-32 bg-stone-300 flex justify-center items-center">
            <span className="font-semibold text-4xl text-zinc-600">
                {initial}
            </span>
        </div>
    );
}

export default function StudentDetail() {
    const student = useLoaderData();

    const tabs = {
        GENERAL: {
            label: "General",
            component: <General student={student} />,
        },
        ACCOMMODATION: {
            label: "Accommodation",
            component: <Accommodation student={student} />,
        },
        PASSPORT: {
            label: "Passport",
            component: <Passport student={student} />,
        },
        INTERNSHIP: {
            label: "Internship",
            component: <Internship student={student} />,
        },
    };

    const [activeTab, setActiveTab] = useState("GENERAL");

    return (
        <div className="border-2 border-stone-300 rounded-md w-9/12 m-auto py-6 min-h-[800px]">
            <div className="flex gap-8 px-6 pb-6">
                <Avatar
                    givenName={student.givenName}
                    surname={student.surname}
                />
                <div>
                    <p className="text-2xl font-bold">
                        {student.givenName + " " + student.surname}
                    </p>
                    <p className="text-sm font-medium">
                        {student.sguMajorInitial} • {student.fhDepartment}
                    </p>
                </div>
            </div>
            <nav className="border-b-2 border-stone-300 px-6 font-bold gap-8 flex pb-3">
                {Object.entries(tabs).map(([key, value], i) => (
                    <button
                        className={
                            key === activeTab
                                ? "text-rose-900"
                                : "text-gray-300"
                        }
                        onClick={() => setActiveTab(key)}
                        key={i}
                    >
                        {value.label}
                    </button>
                ))}
            </nav>
            <div className="p-8">{tabs[activeTab].component}</div>
        </div>
    );
}
