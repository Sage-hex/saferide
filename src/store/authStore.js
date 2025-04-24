// store/authStore.js
import { create } from 'zustand';
import { auth } from '../firebase';

const useAuthStore = create((set, get) => ({
  currentUser: null,
  loading: true,
  setUser: (user) => set({ currentUser: user }),
  setLoading: (isLoading) => set({ loading: isLoading }),
  initializeAuthListener: () => {
    auth.onAuthStateChanged((user) => {
      set({ currentUser: user, loading: false });
    });
  },
  logout: async () => {
    try {
      await auth.signOut();
      set({ currentUser: null });
    } catch (error) {
      console.error("Error signing out:", error);
      // Optionally set an error state in the store
    }
  },
}));

export default useAuthStore;