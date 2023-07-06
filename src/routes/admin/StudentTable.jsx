import { ArrowIcon } from "../common/misc/SVG";

export default function StudentTable({ data, currentPage, setCurrentPage }) {
    return (
        <div className="relative">
            <div className="h-[700px] overflow-y-auto-scroll overflow-x-hidden">
                <table className="table-fixed w-full block">
                    <thead className="w-full block">
                        <tr className="text-xs [&>*]:font-normal [&>th]:w-1/6 text-slate-500 w-full text-left border-b-2 border-slate-200 pb-2 block [&>th]:inline-block">
                            <th>matrikulnummer</th>
                            <th>student name</th>
                            <th>major</th>
                            <th>email</th>
                            <th>mobile</th>
                            <th>exchange year</th>
                        </tr>
                    </thead>
                    <tbody className="w-full block ">
                        {data &&
                            data.students.map((s, i) => (
                                <tr
                                    key={i}
                                    className={
                                        "text-xs [&>*]:font-normal [&>td]:w-1/6 text-slate-500 w-full text-left border-b-2 border-slate-200 py-4 block [&>td]:inline-block hover:bg-blue-50 hover:cursor-pointer " +
                                        (i % 2 === 0 && "bg-slate-50/50")
                                    }
                                >
                                    <td>{s.studentID}</td>
                                    <td>{s.name}</td>
                                    <td>{s.sguMajor}</td>
                                    <td>{s.sguEmail}</td>
                                    <td>{s.mobilePhone}</td>
                                    <td>{s.exchangeYear}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            {data && (
                <div className="absolute right-0 -top-20 flex items-center gap-10">
                    <div className="px-3 py-2 rounded-md bg-slate-100 text-xs font-extrabold text-slate-400">
                        <p>count: {data.totalStudent}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div
                            className="px-3 border-2 rounded-md bg-white flex items-center py-2 hover:cursor-pointer"
                            onClick={() => {
                                if (currentPage > 1)
                                    setCurrentPage((oldState) => --oldState);
                            }}
                        >
                            <ArrowIcon
                                w={6}
                                h={10}
                                className="fill-slate-400 flex"
                            />
                        </div>
                        <p className="font-bold text-xs">
                            {currentPage} of {Math.ceil(data.totalStudent / 20)}
                        </p>
                        <div
                            className="px-3 border-2 rounded-md bg-white rotate-180 flex items-center py-2 hover:cursor-pointer"
                            onClick={() => {
                                if (
                                    currentPage <
                                    Math.ceil(data.totalStudent / 20)
                                )
                                    setCurrentPage((oldState) => ++oldState);
                            }}
                        >
                            <ArrowIcon
                                w={6}
                                h={10}
                                className="fill-slate-400"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
