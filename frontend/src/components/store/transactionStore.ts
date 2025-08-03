import { create } from 'zustand';

interface TransactionState {
  refreshKey: number;
  triggerRefresh: () => void;
}

export const useTransactionStore = create<TransactionState>((set) => ({
  refreshKey: 0,
  triggerRefresh: () => set((state) => ({ refreshKey: state.refreshKey + 1 })),
}));
