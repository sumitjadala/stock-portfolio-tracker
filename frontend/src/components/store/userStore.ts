import { create } from 'zustand';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase';

interface UserProfile {
  fullName: string;
  email: string;
  phoneNumber: string;
}

interface UserState {
  profile: UserProfile | null;
  isLoading: boolean;
  fetchUserProfile: (uid: string) => Promise<void>;
  clearUserProfile: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  profile: null,
  isLoading: true,
  
  fetchUserProfile: async (uid: string) => {
    set({ isLoading: true });
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        set({ profile: docSnap.data() as UserProfile, isLoading: false });
      } else {
        console.log("No such user profile document!");
        set({ profile: null, isLoading: false });
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      set({ profile: null, isLoading: false });
    }
  },

  clearUserProfile: () => {
    set({ profile: null });
  }
}));
