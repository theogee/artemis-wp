import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Alert from "../common/misc/Alert";
import authorizer from "../common/utils/authorizer";
import Accommodation from "./StudentDetailTabs/Accommodation";
import General from "./StudentDetailTabs/General";
import Internship from "./StudentDetailTabs/Internship";
import Passport from "./StudentDetailTabs/Passport";

export async function loader(allowedRole) {
    await authorizer(allowedRole);
    // TODO: fetch student from BE API
    // console.log(params.studentID);
    const endpoint = "/api/students/0";

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

function EditButton({ isEditing, onClick }) {
    return (
        <div
            className={
                (isEditing
                    ? "bg-gray-400"
                    : "bg-blue-800 hover:cursor-pointer") +
                " flex px-3 justify-around items-center min-w-[60px] h-9 rounded-md"
            }
            onClick={onClick}
        >
            <p
                className={
                    (isEditing ? "text-gray-900" : "text-white") +
                    " text-xs font-semibold"
                }
            >
                Edit
            </p>
        </div>
    );
}

function CancelButton({ isEditing, onClick }) {
    const activeStyle =
        "bg-red-600 flex px-3 justify-around items-center min-w-[60px] h-9 rounded-md hover:cursor-pointer";
    const disabledStyle = "bg-gray-400";

    return (
        <button
            className={
                (isEditing
                    ? "bg-red-600 hover:cursor-pointer"
                    : "bg-gray-400") +
                " flex px-3 justify-around items-center min-w-[60px] h-9 rounded-md"
            }
            onClick={onClick}
            disabled={!isEditing}
        >
            <p
                className={
                    (isEditing ? "text-white" : "text-gray-900") +
                    " text-xs font-semibold"
                }
            >
                Cancel
            </p>
        </button>
    );
}

function SaveButton({ onClick }) {
    return (
        <div
            className="bg-green-600 flex px-3 justify-around items-center min-w-[60px] h-9 rounded-md hover:cursor-pointer"
            onClick={onClick}
        >
            <p className="text-white text-xs font-semibold">Save</p>
        </div>
    );
}

export default function StudentDetail() {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [student, setStudent] = useState(useLoaderData());
    const [alert, setAlert] = useState({
        active: false,
        msg: "",
    });
    const oldStudent = useLoaderData();

    const tabs = {
        GENERAL: {
            label: "General",
            component: (
                <General
                    student={student}
                    setStudent={setStudent}
                    isEditing={isEditing}
                />
            ),
        },
        ACCOMMODATION: {
            label: "Accommodation",
            component: (
                <Accommodation
                    student={student}
                    setStudent={setStudent}
                    isEditing={isEditing}
                />
            ),
        },
        PASSPORT: {
            label: "Passport",
            component: <Passport student={student} />,
        },
        INTERNSHIP: {
            label: "Internship",
            component: (
                <Internship
                    student={student}
                    setStudent={setStudent}
                    isEditing={isEditing}
                />
            ),
        },
    };

    const [activeTab, setActiveTab] = useState("GENERAL");

    const updateStudentDate = async () => {
        const endpoint = "/api/students/0";

        const updateData = {
            mobilePhone: student.mobilePhone,
            mobilePhoneDE: student.mobilePhoneDE,
            privateEmail: student.privateEmail,
            currentAddress: student.currentAddress,
            currentPostcode: student.currentPostcode,
            currentCity: student.currentCity,
            coName: student.coName,
            internshipCompany: student.internshipCompany,
            internshipStartDate: student.internshipStartDate,
            internshipEndDate: student.internshipEndDate,
            internshipCompanyAddress: student.internshipCompanyAddress,
            internshipCompanyPostcode: student.internshipCompanyPostcode,
            internshipCompanyCity: student.internshipCompanyCity,
            internshipSupervisorName: student.internshipSupervisorName,
            internshipSupervisorEmail: student.internshipSupervisorEmail,
            internshipSupervisorPhone: student.internshipSupervisorPhone,
        };

        const formData = new FormData();
        Object.entries(updateData).forEach(([key, value]) => {
            formData.append(key, value);
        });

        const response = await fetch(endpoint, {
            method: "PUT",
            credentials: "include",
            body: formData,
        });
        console.log(response);

        if (response.status === 200) {
            setAlert({
                active: true,
                msg: "Your data has been updated.",
                level: "success",
            });
            setIsEditing(false);
            navigate(".", { replace: true });
        } else {
            setAlert({
                active: true,
                msg: "Internal server error has occured. Please try again later.",
                level: "error",
            });
        }
    };

    return (
        <div className="border-2 border-stone-300 rounded-md w-9/12 m-auto py-6 min-h-[850px]">
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
                <div className="ml-auto flex gap-5">
                    <CancelButton
                        isEditing={isEditing}
                        onClick={() => {
                            setStudent(oldStudent);
                            setIsEditing(false);
                        }}
                    />
                    <EditButton
                        isEditing={isEditing}
                        onClick={() => setIsEditing(true)}
                    />
                    <SaveButton onClick={updateStudentDate} />
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
            <Alert
                className={
                    `absolute bottom-10 transition-all duration-500 ` +
                    (alert.active ? "left-10" : "-left-full")
                }
                level={alert.level}
                message={alert.msg}
                onClick={() => setAlert({ active: false, msg: "" })}
            />
        </div>
    );
}
