import { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import { PlusIcon, SearchIcon } from "../common/misc/SVG";

function FilterWidget({ className: parentClass, onCancel }) {
    const [SGUMajors, setSGUMajors] = useState([]);
    const [exchangeYear, setExchangeYear] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const SGUMajorEndpoint = "/api/sgu_majors";
                const exchangeYearEndpoint = "/api/exchange_year";

                const SGUMajorRequest = fetch(SGUMajorEndpoint, {
                    method: "GET",
                    credentials: "include",
                });
                const exchangeYearRequest = fetch(exchangeYearEndpoint, {
                    method: "GET",
                    credentials: "include",
                });

                const responses = await Promise.all([
                    SGUMajorRequest,
                    exchangeYearRequest,
                ]);

                responses.forEach((r) => {
                    if (r.status === 401) {
                        return redirect("/login");
                    }
                });

                const data = await Promise.all(responses.map((r) => r.json()));

                const SGUMajorResponse = data[0];
                const exchangeYearResponse = data[1];

                if (!SGUMajorResponse.success) {
                    // 100% internal server error
                    if (SGUMajorResponse.servError) {
                        if (SGUMajorResponse.servError.length !== 0) {
                            const errorMsg =
                                SGUMajorResponse.servError.join(", ");
                            console.log(`internal server error: ${errorMsg}`);
                            // idk what to do, for now just slap the error page
                            throw new Error(errorMsg);
                        }
                    }
                }

                if (!exchangeYearResponse.success) {
                    // 100% internal server error
                    if (exchangeYearResponse.servError) {
                        if (exchangeYearResponse.servError.length !== 0) {
                            const errorMsg =
                                exchangeYearResponse.servError.join(", ");
                            console.log(`internal server error: ${errorMsg}`);
                            // idk what to do, for now just slap the error page
                            throw new Error(errorMsg);
                        }
                    }
                }

                setSGUMajors(SGUMajorResponse.data.majors);
                setExchangeYear(exchangeYearResponse.data.exchangeYear);
            } catch (e) {
                console.log(`unexpected error: ${e}`);
                throw new Error(e);
            }
        })();
    }, []);

    return (
        <div
            className={
                parentClass +
                " w-[500px] rounded-lg bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-5 flex flex-wrap gap-y-6"
            }
        >
            <div className="basis-2/5">
                <label htmlFor="year" className="text-xs block mb-2 font-bold">
                    Filter by year
                </label>
                <select
                    name="filterByYear"
                    id="year"
                    className="text-xs text-gray-600 rounded-md border-2 px-1 py-1"
                >
                    <option value="" defaultValue={true}>
                        Choose year
                    </option>
                    {exchangeYear.map((y, i) => (
                        <option value={y} key={i}>
                            {y}
                        </option>
                    ))}
                </select>
            </div>
            <div className="basis-3/5">
                <label htmlFor="major" className="text-xs block mb-2 font-bold">
                    Filter by major
                </label>
                <select
                    name="filterByMajor"
                    id="major"
                    className="text-xs text-gray-600 rounded-md border-2 px-1 py-1"
                >
                    <option value="" defaultValue={true}>
                        Choose major
                    </option>
                    {SGUMajors.map((m) => (
                        <option value={m.major_id} key={m.major_id}>
                            {m.major_name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="basis-full">
                <label
                    htmlFor="matrikulnummer"
                    className="text-xs block mb-2 font-bold"
                >
                    Filter by matrikulnummer
                </label>
                <input
                    type="number"
                    name="filterByMatrikulnummer"
                    id="matrikulnummer"
                    className="text-xs text-gray-600 rounded-md border-2 px-1 py-1"
                    placeholder="1234567890"
                />
            </div>
            <div className="basis-7/12 text-left self-center">
                <button className="text-slate-400 hover:text-yellow-500 font-semibold text-xs transition-colors ease-linear">
                    Clear filters
                </button>
            </div>
            <div className="basis-2/12 text-right self-center">
                <button
                    className="text-slate-400 hover:text-black font-semibold text-xs transition-colors ease-linear"
                    onClick={onCancel}
                >
                    Cancel
                </button>
            </div>
            <div className="basis-3/12 text-right">
                <button className="text-white font-semibold text-xs transition-colors ease-linear p-2 bg-black rounded-md">
                    Apply filters
                </button>
            </div>
        </div>
    );
}

export default function Discover() {
    const [isFilterWidgetOpen, setIsFilterWidgetOpen] = useState(false);
    const handleAddFilter = () => {
        setIsFilterWidgetOpen(!isFilterWidgetOpen);
    };

    return (
        <div className="relative p-16">
            <h1 className="font-extrabold text-2xl mb-7">Student List</h1>
            <Form className="flex gap-5">
                <input
                    className="lock py-2 px-3 font-medium text-xs text-gray-600 rounded-md w-96 border-2 border-slate-200"
                    type="text"
                    id="name"
                    placeholder="Search by name"
                    name="studentName"
                />
                <div
                    className="bg-black flex px-3 justify-around items-center w-20 rounded-md hover:cursor-pointer"
                    onClick={handleAddFilter}
                >
                    <PlusIcon
                        w={14}
                        h={14}
                        className="fill-white"
                        onClick={() => {}}
                    />
                    <p className="text-white text-xs font-semibold">Filter</p>
                </div>
            </Form>
            <FilterWidget
                className={
                    (isFilterWidgetOpen ? "absolute" : "hidden") + " top-44"
                }
                onCancel={handleAddFilter}
            />
        </div>
    );
}
