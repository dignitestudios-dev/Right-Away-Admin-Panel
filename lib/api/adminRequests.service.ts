import { API } from "@/lib/api/axios";

/* ================= LIST REQUESTS ================= */
export const getRequests = async (params?: {
    profileStatus?: "approved" | "rejected" | "in-review";
}) => {
    const res = await API.get("/admin/requests", {
        params,
    });
    return res.data?.data || [];
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
