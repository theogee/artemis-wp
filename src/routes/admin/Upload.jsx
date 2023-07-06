import { useRef, useState } from "react";
import { Form } from "react-router-dom";
import { getFileSize } from "../../pkg/utils/common";
import Alert from "../common/misc/Alert";
import { CloudIcon, CsvFileIcon } from "../common/misc/SVG";

function FileIndicator({
    file,
    batchYear,
    setBatchYear,
    className: parentClass,
}) {
    return (
        <div
            className={
                parentClass +
                " w-[688px] shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white rounded-lg p-6 border-[2.5x] border-stone-200 flex items-center justify-between mb-10"
            }
        >
            <div className="basis-1/12">
                <CsvFileIcon h={39} w={39} className="fill-green-600" />
            </div>
            <div className="basis-7/12">
                <p className="text-xs font-extrabold">{file && file[0].name}</p>
                <p className="text-xs text-slate-400 font-semibold">
                    {file && getFileSize(file[0].size)}
                </p>
            </div>
            <div className="flex items-center gap-4 basis-3/12 justify-end">
                <p className="text-xs font-semibold">Batch year</p>
                <input
                    type="number"
                    value={batchYear}
                    defaultValue={batchYear}
                    className="text-xs text-gray-600 rounded-md border-2 py-1 font-semibold w-14 text-center"
                    onChange={(e) => setBatchYear(e.target.value)}
                />
            </div>
        </div>
    );
}

export default function Upload() {
    const [isDragOver, setIsDragOver] = useState(false);
    const [batchYear, setBatchYear] = useState(new Date().getFullYear());
    const [file, setFile] = useState(null);
    const [alert, setAlert] = useState({
        active: false,
        msg: "",
    });
    const fileRef = useRef(null);

    const handleFilePick = (e) => {
        const type = e.target.files[0].type;
        // const size = e.target.files[0].size

        if (type !== "text/csv") {
            e.target.value = "";
            e.target.files = null;

            setAlert({
                active: true,
                msg: "File must be a csv",
                level: "error",
            });
            return;
        }

        setFile(e.target.files);
    };

    const handleOnDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);

        const type = e.dataTransfer.files[0].type;

        if (type !== "text/csv") {
            setAlert({
                active: true,
                msg: "File must be a csv",
                level: "error",
            });
            return;
        }

        fileRef.current.files = e.dataTransfer.files;
        setFile(e.dataTransfer.files);
    };

    return (
        <div className="w-full justify-center items-center flex">
            <div>
                <h1 className="font-extrabold text-xl mb-3">
                    Register student accounts by uploading csv file
                </h1>
                <p className="text-xs text-slate-500 font-semibold mb-7">
                    {file !== null
                        ? "You can modify the batch year by putting a new value."
                        : "Drag and drop your file here"}
                </p>
                <Form>
                    {/* we are not using conditional rendering due to the need in accessing the input (fileRef) */}
                    <FileIndicator
                        className={file === null && "hidden"}
                        file={file}
                        batchYear={batchYear}
                        setBatchYear={setBatchYear}
                    />
                    <div
                        className={
                            (file !== null && "hidden") +
                            (isDragOver ? " border-blue-300" : "") +
                            " border-[3px] w-[688px] h-[256px] border-dashed border-stone-400 flex flex-col justify-center items-center gap-3 mb-7"
                        }
                        onDrop={handleOnDrop}
                        onDragOver={(e) => {
                            e.preventDefault();
                            setIsDragOver(true);
                        }}
                        onDragLeave={(e) => {
                            setIsDragOver(false);
                        }}
                    >
                        <CloudIcon
                            w={52}
                            h={39}
                            className={
                                isDragOver ? "fill-blue-300" : "fill-stone-500"
                            }
                        />
                        <p className="text-lg font-extrabold">.csv</p>
                        <p className="text-xs font-semibold text-stone-400 mb-2">
                            Browse to upload a file
                        </p>
                        <button
                            className="bg-black px-2 py-2 w-24 rounded-md text-white text-xs font-semibold hover:text-green-300"
                            onClick={(e) => {
                                e.preventDefault();
                                fileRef.current.click();
                            }}
                        >
                            Click here
                        </button>
                        <input
                            onChange={handleFilePick}
                            type="file"
                            name="file"
                            className="hidden"
                            accept="text/csv"
                            ref={fileRef}
                        />
                    </div>
                </Form>
                <div className="flex gap-7 justify-end">
                    <button
                        className="text-xs font-semibold text-stone-400 hover:text-yellow-500"
                        onClick={() => {
                            fileRef.current.value = "";
                            fileRef.current.files = null;
                            setFile(null);
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-black px-2 py-2 w-24 rounded-md text-white text-xs font-semibold hover:text-green-300"
                        onClick={() => {
                            console.log(fileRef.current.value);
                        }}
                    >
                        Upload file
                    </button>
                </div>
            </div>
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
