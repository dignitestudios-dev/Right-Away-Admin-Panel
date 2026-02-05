import { API } from "@/lib/api/axios";

/* ================= LIST REQUESTS ================= */
export const getRequests = async (params?: {
    profileStatus?: "approved" | "rejected" | "in-review" | string;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
}) => {
    const res = await API.get("/admin/requests", {
        params,

    });
    return {
        data: res.data?.data || [],
        pagination: res.data?.pagination || { currentPage: 1, totalPages: 1, itemsPerPage: 5, totalItems: 0 },
    };
};

/* ================= REQUEST DETAIL ================= */
export const getRequestById = async (id: string) => {
    const res = await API.get(`/admin/requests/${id}`);
    return res.data?.data;
};

/* ================= UPDATE REQUEST STATUS ================= */
export const updateRequestStatus = async (
    id: string,
    accept: boolean // true = approved, false = rejected

) => {
    const res = await API.put(`/admin/requests/${id}`, { accept: accept });
    return res.data;
};
