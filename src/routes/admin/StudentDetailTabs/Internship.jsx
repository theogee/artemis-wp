import { formatDate } from "../../../pkg/utils/common";
import StandardField from "./StandardField";

export default function Internship({ student }) {
    return (
        <div className="flex flex-col gap-7">
            <StandardField label="Company" value={student.internshipCompany} />
            <div className="flex gap-14">
                <StandardField
                    label="Start Date"
                    value={formatDate(student.internshipStartDate)}
                />
                <StandardField
                    label="End Date"
                    value={formatDate(student.internshipEndDate)}
                />
            </div>
            <StandardField
                label="Company Address"
                value={student.internshipCompanyAddress}
            />
            <StandardField
                label="Company Postcode"
                value={student.internshipCompanyPostcode}
            />
            <StandardField
                label="Company City"
                value={student.internshipCompanyCity}
            />
            <StandardField
                label="Supervisor Name"
                value={student.internshipSupervisorName}
            />
            <StandardField
                label="Supervisor Email"
                value={student.internshipSupervisorEmail}
            />
            <StandardField
                label="Supervisor Phone"
                value={student.internshipSupervisorPhone}
            />
        </div>
    );
}
