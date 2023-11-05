import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Accommodation from "./StudentDetailTabs/Accommodation";
import General from "./StudentDetailTabs/General";
import Internship from "./StudentDetailTabs/Internship";
import Passport from "./StudentDetailTabs/Passport";

export function loader({ params }) {
    // TODO: fetch student from BE API
    // console.log(params.studentID);
    return {
        givenName: "Adisetya Elang",
        surname: "Segara",
        gender: "M",
        sguMajor: "Mechatronics",
        // TODO: update BE to add major initial
        sguMajorInitial: "MT",
        fhDepartment: "Wirtschaftsingenieurwesen",
        studentID: 30364718,
        dateOfBirth: "2002-08-12T00:00:00Z",
        cityOfBirth: "Mataram",
        passportNumber: "X1344702",
        dateOfIssue: "2022-03-28T00:00:00Z",
        dateOfExpiry: "2027-03-28T00:00:00Z",
        issuingOffice: "Tangerang",
        privateEmail: "elangsegara02@gmail.com",
        sguEmail: "adisetya.segara@student.sgu.ac.id",
        username: "adseg001",
        fhEmail: "segara.adisetyaelang@fh-swf.de",
        iban: "DE44 4145 0075 0100 6881 18",
        mobilePhone: "081311048967",
        mobilePhoneDE: "015733876124",
        currentAddress: "",
        currentPostcode: "",
        currentCity: "",
        coName: "",
        internshipCompany: "",
        internshipStartDate: "",
        internshipEndDate: "",
        internshipCompanyAddress: "",
        internshipCompanyPostcode: "",
        internshipCompanyCity: "",
        internshipSupervisorName: "",
        internshipSupervisorEmail: "",
        internshipSupervisorPhone: "",
        exchangeYear: 2023,
    };
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
        <div className="border-2 border-stone-300 rounded-md w-9/12 m-auto py-6">
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
