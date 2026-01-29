import { API } from "@/lib/api/axios";

/* ================= CREATE NOTIFICATION ================= */
export const createNotification = async (data: {
    title: string;
    description: string;
    role: "user" | "rider" | "company" | "all";
}) => {
    const res = await API.post(`/notification`, data);
    return res.data;
};

/* ================= GET ADMIN NOTIFICATIONS ================= */
export const getAdminNotifications = async () => {
    const res = await API.get(`/notification/admin`);
    return res.data?.data || [];
};
