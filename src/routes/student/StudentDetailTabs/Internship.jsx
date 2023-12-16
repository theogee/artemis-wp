import { formatDate } from "../../../pkg/utils/common";
import DateField from "./DateField";
import InputField from "./InputField";
import StandardField from "./StandardField";
import TextField from "./TextField";

export default function Internship({ student, setStudent, isEditing }) {
    return (
        <div className="flex flex-col gap-7">
            <InputField
                label="Company"
                value={student.internshipCompany}
                name="internshipCompany"
                type="text"
                maxLength="250"
                disabled={!isEditing}
                size={50}
                onChange={(e) => {
                    setStudent((prevStudent) => ({
                        ...prevStudent,
                        internshipCompany: e.target.value,
                    }));
                }}
            />
            <div className="flex gap-14">
                <DateField
                    label="Start Date"
                    value={formatDate(student.internshipStartDate)}
                    name="internshipStartDate"
                    disabled={!isEditing}
                    onChange={(e) => {
                        setStudent((prevStudent) => ({
                            ...prevStudent,
                            internshipStartDate: e.target.value,
                        }));
                    }}
                />
                <DateField
                    label="End Date"
                    value={formatDate(student.internshipEndDate)}
                    name="internshipEndDate"
                    disabled={!isEditing}
                    onChange={(e) => {
                        setStudent((prevStudent) => ({
                            ...prevStudent,
                            internshipEndDate: e.target.value,
                        }));
                    }}
                />
            </div>
            <TextField
                label="Company Address"
                value={student.internshipCompanyAddress}
                name="internshipCompanyAddress"
                disabled={!isEditing}
                maxLength={250}
                rows={2}
                cols={50}
                onChange={(e) =>
                    setStudent((prevStudent) => ({
                        ...prevStudent,
                        internshipCompanyAddress: e.target.value,
                    }))
                }
            />
            <div className="flex gap-14">
                <InputField
                    label="Company Postcode"
                    value={student.internshipCompanyPostcode}
                    name="internshipCompanyPostcode"
                    type="text"
                    disabled={!isEditing}
                    size={7}
                    maxLength={5}
                    onChange={(e) => {
                        if (
                            e.target.value === "" ||
                            /^\d+$/.test(e.target.value)
                        ) {
                            setStudent((prevStudent) => ({
                                ...prevStudent,
                                internshipCompanyPostcode: e.target.value,
                            }));
                        }
                    }}
                />
                <InputField
                    label="Company City"
                    value={student.internshipCompanyCity}
                    name="internshipCompanyCity"
                    type="text"
                    disabled={!isEditing}
                    size={25}
                    onChange={(e) => {
                        setStudent((prevStudent) => ({
                            ...prevStudent,
                            internshipCompanyCity: e.target.value,
                        }));
                    }}
                />
            </div>
            <div className="flex gap-14">
                <InputField
                    label="Supervisor Name"
                    value={student.internshipSupervisorName}
                    name="internshipSupervisorName"
                    type="text"
                    disabled={!isEditing}
                    size={25}
                    onChange={(e) => {
                        setStudent((prevStudent) => ({
                            ...prevStudent,
                            internshipSupervisorName: e.target.value,
                        }));
                    }}
                />
                <InputField
                    label="Supervisor Email"
                    value={student.internshipSupervisorEmail}
                    name="internshipSupervisorEmail"
                    type="text"
                    disabled={!isEditing}
                    size={25}
                    onChange={(e) => {
                        setStudent((prevStudent) => ({
                            ...prevStudent,
                            internshipSupervisorEmail: e.target.value,
                        }));
                    }}
                />
            </div>
            <InputField
                label="Supervisor Phone"
                value={student.internshipSupervisorPhone}
                name="internshipSupervisorPhone"
                type="tel"
                pattern="[0-9]"
                maxLength="15"
                disabled={!isEditing}
                size={15}
                onChange={(e) => {
                    if (e.target.value === "" || /^\d+$/.test(e.target.value)) {
                        setStudent((prevStudent) => ({
                            ...prevStudent,
                            internshipSupervisorPhone: e.target.value,
                        }));
                    }
                }}
            />
        </div>
    );
}
