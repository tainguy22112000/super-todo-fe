import { defineStore } from "pinia";

export type TToastStatus = "success" | "warning" | "error";

interface IToast {
  text: string;
  status: TToastStatus;
  id: number;
}
type ToastPayload = { timeout?: number; text: string };

const DURATION = 2000;

export const useToastStore = defineStore("toaster-store", {
  state: (): { toasts: IToast[] } => ({
    toasts: [],
  }),
  actions: {
    createToast(text: string, status: TToastStatus) {
      return {
        text,
        status,
        id: Math.random() * 1000,
      };
    },
    updateState(payload: ToastPayload, status: TToastStatus) {
      const { text, timeout = DURATION } = payload;

      const toast = this.createToast(text, status);

      this.toasts.push(toast);

      setTimeout(() => {
        this.toasts = this.toasts.filter((t: IToast) => t.id !== toast.id);
      }, timeout);
    },

    success(payload: ToastPayload) {
      this.updateState(payload, "success");
    },

    warning(payload: ToastPayload) {
      this.updateState(payload, "warning");
    },

    error(payload: ToastPayload) {
      this.updateState(payload, "error");
    },
  },
});