import { axiosInstance } from "@/lib/axios";
import { create } from "zustand"

interface useAuthStore{
    admin: boolean;
    fetchAdminStatus : () => Promise<void>;
    isLoading: boolean;
}
export const useAuthStore = create<useAuthStore>((set) => ({
    admin: false,
    isLoading: false,
    fetchAdminStatus: async () => {
        try {
            set({ isLoading: true });
            const response = await axiosInstance.get("/admin/check");
            set({ admin: response.data.admin });
        } catch (error: any) {
            console.error("Error fetching admin status:", error);
        } finally {
            set({ isLoading: false });
        }
    }
}))