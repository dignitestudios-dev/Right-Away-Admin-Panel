import { API } from "./axios";

/* ================= DASHBOARD STATS ================= */
export const getRevenueDashboard = async () => {
    const res = await API.get("/admin/revenue/dashboard");
    return res.data?.data;
};

/* ================= REVENUE LIST ================= */
export const getRevenueReport = async (params?: {
    type?: "daily" | "weekly" | "monthly";
    startDate?: string;
    endDate?: string;
}) => {
    const res = await API.get("/admin/revenue", {
        params,
    });
    return res.data?.data || [];
};

/* ================= EXPORT CSV ================= */
export const exportRevenueCSV = async (params?: {
    type?: "daily" | "weekly" | "monthly" | string;
    startDate?: string;
    endDate?: string;
}) => {
    const res = await API.get("/admin/revenue/csv", {
        params,
        responseType: "blob",
    });

    const url = window.URL.createObjectURL(res.data);
    const link = document.createElement("a");
    link.href = url;
    link.download = "revenue-report.csv";
    link.click();
};
