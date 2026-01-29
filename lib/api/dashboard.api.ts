// lib/api/dashboard.api.ts
import { API } from "./axios";

export type DashboardFilter = "daily" | "weekly" | "monthly" | "yearly";

export const getDashboardData = async (filter: DashboardFilter) => {
    const response = await API.get(`/admin/dashboard`, {
        params: { filter },
    });

    return response.data.data;
};
