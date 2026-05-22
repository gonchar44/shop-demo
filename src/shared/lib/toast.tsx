import { toast } from "sonner";
import { CheckCircle2Icon, InfoIcon, AlertCircleIcon } from "lucide-react";

type ToastOptions = Parameters<typeof toast>[1];
type BaseOptions = Omit<NonNullable<ToastOptions>, "icon">;
type CustomOptions = BaseOptions & { icon: React.ReactNode };

export const showToast = {
    success: (message: string, options?: BaseOptions) =>
        toast.success(message, { icon: <CheckCircle2Icon className="size-4 text-emerald-600" />, ...options }),

    info: (message: string, options?: BaseOptions) =>
        toast.info(message, { icon: <InfoIcon className="size-4 text-blue-500" />, ...options }),

    error: (message: string, options?: BaseOptions) =>
        toast.error(message, { icon: <AlertCircleIcon className="size-4 text-destructive" />, ...options }),

    custom: (message: string, options: CustomOptions) => toast(message, options),
};
