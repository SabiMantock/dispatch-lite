import { cn } from "@/lib/utils"
import type { JobPriority } from "@/types/jobPriority"

const PRIORITY_STYLES: Record<string, { bg: string; text: string; label: string; dot?: string }> = {
  low: { bg: "bg-zinc-500/15", text: "text-zinc-400", label: "Low" },
  medium: { bg: "bg-blue-500/15", text: "text-blue-400", label: "Medium" },
  high: { bg: "bg-red-500/15", text: "text-red-400", label: "High", dot: "bg-red-400" },
}

interface PriorityBadgeProps {
  priority: JobPriority
  className?: string
}

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  const style = PRIORITY_STYLES[priority] ?? PRIORITY_STYLES.low

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium",
        style.bg,
        style.text,
        className,
      )}
    >
      {style.dot && (
        <span className={cn("h-1.5 w-1.5 rounded-full animate-pulse", style.dot)} />
      )}
      {style.label}
    </span>
  )
}
