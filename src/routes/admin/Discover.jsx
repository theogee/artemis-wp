import { useEffect, useState } from "react";
import { Form, redirect, useLoaderData } from "react-router-dom";
import { CloseIcon, PlusIcon, SearchIcon } from "../common/misc/SVG";

async function filterWidgetLoader() {
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

    const responses = await Promise.all([SGUMajorRequest, exchangeYearRequest]);

    responses.forEach((r) => {
        if (r.status === 401) throw new Error(401);
    });

    const data = await Promise.all(responses.map((r) => r.json()));

    const SGUMajorResponse = data[0];
    const exchangeYearResponse = data[1];

    if (!SGUMajorResponse.success) {
        // 100% internal server error
        if (SGUMajorResponse.servError) {
            if (SGUMajorResponse.servError.length !== 0) {
                const errorMsg = SGUMajorResponse.servError.join(", ");
                console.log(`unexpected error: ${errorMsg}`);
                // idk what to do, for now just slap the error page
                throw new Error(errorMsg);
            }
        }
    }

    if (!exchangeYearResponse.success) {
        // 100% internal server error
        if (exchangeYearResponse.servError) {
            if (exchangeYearResponse.servError.length !== 0) {
                const errorMsg = exchangeYearResponse.servError.join(", ");
                console.log(`unexpected error: ${errorMsg}`);
                // idk what to do, for now just slap the error page
                throw new Error(errorMsg);
            }
        }
    }

    return {
        majors: SGUMajorResponse.data.majors,
        exchangeYear: exchangeYearResponse.data.exchangeYear,
    };
}

export async function loader() {
    const filterWidgetData = await filterWidgetLoader();
    return {
        filterWidgetData,
    };
}

function FilterWidget({
    className: parentClass,
    onCancel,
    setDiscoverFilterState,
    handleClearFilter,
    filter,
    setFilter,
}) {
    const data = useLoaderData();
    const [SGUMajors, setSGUMajors] = useState(data.filterWidgetData.majors);
    const [exchangeYear, setExchangeYear] = useState(
        data.filterWidgetData.exchangeYear
    );

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
                    onChange={(e) => {
                        setFilter((oldState) => ({
                            ...oldState,
                            Year: e.target.value,
                        }));
                    }}
                    value={filter.Year}
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
                    onChange={(e) => {
                        setFilter((oldState) => ({
                            ...oldState,
                            MajorID: e.target.value,
                            Major: SGUMajors.find(
                                (m) => m.majorID == e.target.value
                            ).majorName,
                        }));
                    }}
                    value={filter.MajorID}
                >
                    <option value="" defaultValue={true}>
                        Choose major
                    </option>
                    {SGUMajors.map((m) => (
                        <option value={m.majorID} key={m.majorID}>
                            {m.majorName}
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
                    onChange={(e) => {
                        setFilter((oldState) => ({
                            ...oldState,
                            Matrikulnummer: e.target.value,
                        }));
                    }}
                    value={filter.Matrikulnummer}
                />
            </div>
            <div className="basis-7/12 text-left self-center">
                <button
                    className="text-slate-400 hover:text-yellow-500 font-semibold text-xs transition-colors ease-linear"
                    onClick={() => {
                        setFilter({
                            Year: "",
                            MajorID: "",
                            Matrikulnummer: "",
                        });
                        handleClearFilter();
                    }}
                >
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
                <button
                    className="text-white font-semibold text-xs transition-colors ease-linear p-2 bg-black rounded-md"
                    onClick={() => {
                        const updatedFilter = { ...filter };
                        Object.keys(filter).forEach((kf) => {
                            if (filter[kf] === "") {
                                delete updatedFilter[kf];
                            }
                        });
                        setDiscoverFilterState(updatedFilter);
                    }}
                >
                    Apply filters
                </button>
            </div>
        </div>
    );
}

export default function Discover() {
    const [isFilterWidgetOpen, setIsFilterWidgetOpen] = useState(false);
    const [discoverFilter, setDiscoverFilter] = useState({});
    /**
     * this filter state is used because we don't want the specific filter identifier [Year: 2023 x] to show up when we choose an option from the drop down
     * only after the user clicks "Apply filter", then we want to show it
     *
     * the filter identifier is tied to the discoverFilter state. Once the user clicks "Apply filter", we will update the discoverFilter state.
     * the filterWidget state is only used to make things simpler, instead of having 3 different state for year, major, and matrikulnummer
     * */
    const [filterWidget, setFilterWidget] = useState({
        Year: "",
        MajorID: "",
        Matrikulnummer: "",
    });
    /**
     * discoverFilter & filterWidget {
     *      Year: 2023,
     *      MajorID: 1,
     *      Matrikulnummer: 3039102,
     *      Major: Mechatronics
     * }
     */

    const handleAddFilter = () => {
        setIsFilterWidgetOpen(!isFilterWidgetOpen);
    };

    const handleClearFilter = () => {
        setIsFilterWidgetOpen(!isFilterWidgetOpen);
        setDiscoverFilter({});
    };

    const handleSearch = () => {};

    return (
        <div className="relative p-16">
            <h1 className="font-extrabold text-2xl mb-7">Student List</h1>
            <Form className="flex gap-5 mb-3">
                <input
                    className="lock py-2 px-3 font-medium text-xs text-gray-600 rounded-md w-96 border-2 border-slate-200"
                    type="text"
                    id="name"
                    placeholder="Search by name"
                    name="studentName"
                />
                <div
                    className="bg-black flex px-3 justify-around items-center w-24 rounded-md hover:cursor-pointer"
                    onClick={handleSearch}
                >
                    <SearchIcon
                        w={14}
                        h={14}
                        className="fill-white"
                        onClick={() => {}}
                    />
                    <p className="text-white text-xs font-semibold">Search</p>
                </div>
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
                setDiscoverFilterState={(newFilter) => {
                    setIsFilterWidgetOpen(!isFilterWidgetOpen);
                    setDiscoverFilter(newFilter);
                }}
                handleClearFilter={handleClearFilter}
                filter={filterWidget}
                setFilter={setFilterWidget}
            />
            <div className="flex gap-3">
                {Object.keys(discoverFilter).map((kf, i) => {
                    if (kf === "MajorID" || discoverFilter[kf] === "") return;
                    return (
                        <div
                            className={
                                "inline-flex px-3 gap-2 py-2 justify-around items-center rounded-md bg-slate-200"
                            }
                            key={kf}
                        >
                            <span className="text-slate-500 text-xs font-semibold">
                                {kf}: {discoverFilter[kf]}
                            </span>
                            <CloseIcon
                                w={14}
                                h={14}
                                className="fill-slate-500"
                                onClick={() => {
                                    const updatedObject = { ...discoverFilter };
                                    if (kf === "Major")
                                        updatedObject["MajorID"] = "";
                                    updatedObject[kf] = "";
                                    setDiscoverFilter(updatedObject);
                                    setFilterWidget(updatedObject);
                                }}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
