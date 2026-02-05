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
    page?: number;
    limit?: number;
}) => {
    const res = await API.get("/admin/revenue", { params });
    return {
        data: res.data?.data || [],
        pagination: res.data?.pagination || { currentPage: 1, totalPages: 1, itemsPerPage: 5, totalItems: 0 },
    };
};


/* ================= EXPORT CSV ================= */
export const exportRevenueCSV = async (params?: {
    type?: "daily" | "weekly" | "monthly" | string;
    startDate?: string;
    endDate?: string;
}) => {
    const res = await API.get("/admin/revenue/csv", {
        params
    });
    window.open(res.data.data.file, "_blank", "noopener,noreferrer");

};
