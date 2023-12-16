import InputField from "./InputField";
import TextField from "./TextField";

export default function Accommodation({ student, setStudent, isEditing }) {
    return (
        <div className="flex flex-col gap-7">
            <TextField
                label="Current Address"
                value={student.currentAddress}
                name="currentAddress"
                disabled={!isEditing}
                maxLength={250}
                rows={4}
                cols={50}
                onChange={(e) =>
                    setStudent((prevStudent) => ({
                        ...prevStudent,
                        currentAddress: e.target.value,
                    }))
                }
            />
            <InputField
                label="Current Postcode"
                value={student.currentPostcode}
                name="currentPostcode"
                type="text"
                disabled={!isEditing}
                size={7}
                maxLength={5}
                onChange={(e) => {
                    if (e.target.value === "" || /^\d+$/.test(e.target.value)) {
                        setStudent((prevStudent) => ({
                            ...prevStudent,
                            currentPostcode: e.target.value,
                        }));
                    }
                }}
            />
            <InputField
                label="Current City"
                value={student.currentCity}
                name="currentCity"
                type="text"
                disabled={!isEditing}
                size={25}
                onChange={(e) => {
                    setStudent((prevStudent) => ({
                        ...prevStudent,
                        currentCity: e.target.value,
                    }));
                }}
            />
            <InputField
                label="c/o Name"
                value={student.coName}
                name="coName"
                type="text"
                disabled={!isEditing}
                size={25}
                onChange={(e) => {
                    setStudent((prevStudent) => ({
                        ...prevStudent,
                        coName: e.target.value,
                    }));
                }}
            />
        </div>
    );
}
