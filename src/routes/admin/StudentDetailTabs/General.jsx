import StandardField from "./StandardField";

export default function General({ student }) {
    return (
        <div className="flex flex-col gap-7">
            <div className="flex gap-14">
                <StandardField label="Student ID" value={student.studentID} />
                <StandardField label="Username" value={student.username} />
                <StandardField
                    label="Gender"
                    value={student.gender === "M" ? "Male" : "Female"}
                />
                <StandardField
                    label="Mobile Phone ID"
                    value={student.mobilePhone}
                />
                <StandardField
                    label="Mobile Phone DE"
                    value={student.mobilePhoneDE}
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
            <StandardField label="Private Email" value={student.privateEmail} />
            <StandardField label="SGU Email" value={student.sguEmail} />
            <StandardField label="FH-SWF Email" value={student.fhEmail} />
            <StandardField label="IBAN" value={student.iban} />
            <StandardField label="Exchange Year" value={student.exchangeYear} />
        </div>
    );
}
