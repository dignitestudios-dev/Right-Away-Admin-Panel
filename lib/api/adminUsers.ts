import { API } from "@/lib/api/axios";

export interface GetUsersParams {
    role: "user" | "rider" | "company" | string;
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
}

export interface Pagination {
    total: number;
    page: number;
    pages: number;
    limit: number;
}

export interface GetUsersResponse {
    users: any[];
    pagination: Pagination;
}

export const getUsers = async ({
    role,
    page = 1,
    limit = 10,
    search = "",
    status = "all",
}: GetUsersParams): Promise<GetUsersResponse> => {
    try {
        const res = await API.get("/admin/user", {
            params: { role, page, limit, search, status },
        });

        return {
            users: res.data?.data ?? [],
            pagination: res.data?.pagination ?? {
                total: 0,
                page: 1,
                pages: 1,
                limit,
            },
        };
    } catch (error) {
        console.error("getUsers error:", error);
        return {
            users: [],
            pagination: { total: 0, page: 1, pages: 1, limit },
        };
    }
};

/* ================= EXPORT CSV ================= */
export const exportUsersCSV = async (role) => {
    try {
        const res = await API.get("/admin/user/csv", {
            params: { role },
            responseType: "blob",
        });

        const blob = new Blob([res.data], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${role}s.csv`;
        link.click();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error("exportUsersCSV error:", error);
    }
};

/* ================= USER DETAIL ================= */
export const getUserById = async (id: string, role: "user" | "rider" | string) => {
    try {
        const res = await API.get(`/admin/user/${id}`, { params: { role } });
        return res.data?.data || null;
    } catch (error) {
        console.error("getUserById error:", error);
        return null;
    }
};

/* ================= USER ORDERS ================= */
export const getUserOrders = async (id: string, role: "user" | "rider" | string) => {
    try {
        const res = await API.get(`/admin/user/${id}/orders`, { params: { role } });
        return res.data?.data || [];
    } catch (error) {
        console.error("getUserOrders error:", error);
        return [];
    }
};
