import { cn } from "~/lib/utils";

interface SeparatorProps {
  className?: string;
}

export function Separator({ className }: SeparatorProps) {
  return <div className={cn("w-full h-[1px] bg-border", className)} />;
}
