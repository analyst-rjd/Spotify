import { axiosInstance } from "@/lib/axios";
import { Album, Songs } from "@/types";
import { create } from "zustand";

interface useStore {
  albums: Album[];
  album: Album | null;
  songs: Songs[];
  isLoading: boolean;
  error: string | null;

  fetchAlbums: () => Promise<void>;
  fetchAlbumbyId: (id: string | null) => Promise<void>;
}

export const useStore = create<useStore>()((set) => ({
  albums: [],
  album: null,
  songs: [],
  isLoading: false,
  error: null,

  fetchAlbums: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/album");
      set({ albums: response.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchAlbumbyId: async (id: string | null) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/album/${id}`);
      set({ album: response.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
