import { useEffect } from "react";
import { useUIStore } from "@/stores/uiStore";

export function Toast() {
  const toast = useUIStore((s) => s.toast);
  const dismiss = useUIStore((s) => s.dismissToast);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(dismiss, 3500);
    return () => clearTimeout(t);
  }, [toast, dismiss]);

  if (!toast) return null;

  const toneClass =
    toast.tone === "success"
      ? "bg-success text-bg-primary"
      : toast.tone === "error"
        ? "bg-error text-fg-primary"
        : "bg-bg-elevated text-fg-primary";

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-toast
                  px-4 py-3 ${toneClass}
                  font-display text-sm uppercase tracking-widest
                  animate-fade-in-up
                  shadow-lg`}
      role="status"
      aria-live="polite"
      key={toast.id}
    >
      {toast.message}
    </div>
  );
}
