"use client";
import { useEffect, useState } from "react";
import { DataTable } from "./component/data-table";
import { API } from "@/lib/api/axios";

const ReportsPage = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refech, SetRefech] = useState(false);
  const fetchReports = async () => {
    try {
      const res = await API.get("/admin/reports");
      setReports(res.data?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [refech]);

  return (
    <div>
      <h1 className="text-2xl font-bold py-4">Reports</h1>

      {loading ? (
        <p>Loading reports...</p>
      ) : (
        <DataTable SetRefech={SetRefech} reports={reports as any} />
      )}
    </div>
  );
};

export default ReportsPage;
