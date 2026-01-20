"use client";
import { useState } from "react";
import { DataTable } from "./component/data-table";
import initialReportsData from "./data.json";
const ReportsPage = () => {
    const [reports, setReports] = useState(initialReportsData);

    console.log(reports);
    return (
        <div>
            <h1 className="text-2xl font-bold py-4">Reports</h1>
         <DataTable reports={reports} />
        </div>
    );
};

export default ReportsPage;