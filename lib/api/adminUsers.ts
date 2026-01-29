import { API } from "@/lib/api/axios";

/* ================= LIST USERS / RIDERS ================= */
export const getUsers = async (role: "user" | "rider") => {
    const res = await API.get(`/admin/user`, {
        params: { role },
    });
    return res.data?.data || [];
};

/* ================= EXPORT CSV ================= */
export const exportUsersCSV = async (role: "user" | "rider") => {
    const res = await API.get(`/admin/user/csv`, {
        params: { role },
        responseType: "blob",
    });

    const url = window.URL.createObjectURL(res.data);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${role}s.csv`;
    link.click();
};

/* ================= USER DETAIL ================= */
export const getUserById = async (id: string, role: string) => {
    const res = await API.get(`/admin/user/${id}`, {
        params: { role },
    });
    return res.data?.data;
};

/* ================= USER ORDERS ================= */
export const getUserOrders = async (id: string, role: string) => {
    const res = await API.get(`/admin/user/${id}/orders`, {
        params: { role },
    });
    return res.data?.data || [];
};
