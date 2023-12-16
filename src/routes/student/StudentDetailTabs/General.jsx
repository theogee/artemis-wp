import InputField from "./InputField";
import StandardField from "./StandardField";

export default function General({ student, setStudent, isEditing }) {
    return (
        <div className="flex flex-col gap-7">
            <div className="flex gap-14 items-top">
                <StandardField label="Student ID" value={student.studentID} />
                <StandardField label="Username" value={student.username} />
                <StandardField
                    label="Gender"
                    value={student.gender === "M" ? "Male" : "Female"}
                />
                <InputField
                    label="Mobile Phone ID"
                    value={student.mobilePhone}
                    name="mobilePhoneID"
                    type="tel"
                    pattern="[0-9]"
                    maxLength="15"
                    disabled={!isEditing}
                    onChange={(e) => {
                        if (
                            e.target.value === "" ||
                            /^\d+$/.test(e.target.value)
                        ) {
                            setStudent((prevStudent) => ({
                                ...prevStudent,
                                mobilePhone: e.target.value,
                            }));
                        }
                    }}
                />
                <InputField
                    label="Mobile Phone DE"
                    value={student.mobilePhoneDE}
                    name="mobilePhoneDE"
                    type="tel"
                    pattern="[0-9]"
                    maxLength="15"
                    disabled={!isEditing}
                    size={15}
                    onChange={(e) => {
                        if (
                            e.target.value === "" ||
                            /^\d+$/.test(e.target.value)
                        ) {
                            setStudent((prevStudent) => ({
                                ...prevStudent,
                                mobilePhoneDE: e.target.value,
                            }));
                        }
                    }}
                />
            </div>
            <div className="flex gap-14">
                <StandardField label="Given Name" value={student.givenName} />
                <StandardField label="Surname" value={student.surname} />
            </div>
            <div className="flex gap-14">
                <StandardField label="SGU Major" value={student.sguMajor} />
                <StandardField
                    label="FH Department"
                    value={student.fhDepartment}
                />
            </div>
            <InputField
                label="Private Email"
                value={student.privateEmail}
                name="privateEmail"
                type="text"
                disabled={!isEditing}
                size={25}
                onChange={(e) => {
                    setStudent((prevStudent) => ({
                        ...prevStudent,
                        privateEmail: e.target.value,
                    }));
                }}
            />
            <StandardField label="SGU Email" value={student.sguEmail} />
            <StandardField label="FH-SWF Email" value={student.fhEmail} />
            <StandardField label="IBAN" value={student.iban} />
            <StandardField label="Exchange Year" value={student.exchangeYear} />
        </div>
    );
}
