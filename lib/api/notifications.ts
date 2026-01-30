import { API } from "@/lib/api/axios";
interface GetAdminNotificationsParams {
    page?: number;
    limit?: number;
    status?: "Read" | "Unread" | "all";
}
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
export const getAdminNotifications = async ({
    page = 1,
    limit = 5,
    status = "all",
}: GetAdminNotificationsParams = {}) => {
    const res = await API.get(`/notification/admin`, {
        params: { page, limit, status },
    });
    // Assuming API returns { data: [...], pagination: {...} }
    return {
        notifications: res.data?.data || [],
        pagination: res.data?.pagination || { total: 0, page: 1, pages: 1, limit },
    };
};
