import { AlertCircleIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type MessageProp = {
  title: string;
  message: Error | string | null;
  variant: "default" | "destructive";
};
export function AlertMessage({ title, message, variant }: MessageProp) {
  return (
    <Alert
      variant={variant}
      className="fixed left-1/2 top-1/2 w-full max-w-xl -translate-x-1/2 -translate-y-1/2 p-8 shadow-2xl"
    >
      <AlertCircleIcon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message?.toString()}</AlertDescription>
    </Alert>
  );
}
