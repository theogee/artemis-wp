import StandardField from "./StandardField";

export default function Accommodation({ student }) {
    return (
        <div className="flex flex-col gap-7">
            <StandardField
                label="Current Address"
                value={student.currentAddress}
            />
            <StandardField
                label="Current Postcode"
                value={student.currentPostcode}
            />
            <StandardField label="Current City" value={student.currentCity} />
            <StandardField label="c/o Name" value={student.coName} />
        </div>
    );
}
