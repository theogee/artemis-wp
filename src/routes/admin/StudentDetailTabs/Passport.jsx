import { formatDate } from "../../../pkg/utils/common";
import StandardField from "./StandardField";

export default function Passport({ student }) {
    return (
        <div className="flex flex-col gap-7">
            <div className="flex gap-14">
                <StandardField
                    label="Date Of Birth"
                    value={formatDate(student.dateOfBirth)}
                />
                <StandardField
                    label="City Of Birth"
                    value={student.cityOfBirth}
                />
            </div>
            <StandardField
                label="Passport Number"
                value={student.passportNumber}
            />
            <div className="flex gap-14">
                <StandardField
                    label="Date Of Issue"
                    value={formatDate(student.dateOfIssue)}
                />
                <StandardField
                    label="Date Of Expiry"
                    value={formatDate(student.dateOfExpiry)}
                />
            </div>
            <StandardField
                label="Issuing Office"
                value={student.issuingOffice}
            />
        </div>
    );
}
