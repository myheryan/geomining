import { Info, AlertTriangle, CheckCircle, AlertOctagon } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Helper untuk tailwind class merge
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CalloutProps {
  children: React.ReactNode;
  type?: "info" | "warning" | "success" | "error";
}

const styles = {
  info: "bg-blue-50 border-blue-200 text-blue-800",
  warning: "bg-amber-50 border-amber-200 text-amber-800",
  success: "bg-emerald-50 border-emerald-200 text-emerald-800",
  error: "bg-red-50 border-red-200 text-red-800",
};

const icons = {
  info: <Info size={20} className="text-blue-500" />,
  warning: <AlertTriangle size={20} className="text-amber-500" />,
  success: <CheckCircle size={20} className="text-emerald-500" />,
  error: <AlertOctagon size={20} className="text-red-500" />,
};

export default function Callout({ children, type = "info" }: CalloutProps) {
  return (
    <div className={cn("my-6 flex gap-4 p-4 rounded-xl border-l-4 shadow-sm", styles[type])}>
      <div className="mt-1">{icons[type]}</div>
      <div className="prose-sm md:prose-base">{children}</div>
    </div>
  );
}