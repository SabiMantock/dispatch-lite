import { cn } from "@/lib/utils"

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  // Job statuses
  pending: { bg: "bg-yellow-500/15", text: "text-yellow-400", label: "Pending" },
  assigned: { bg: "bg-blue-500/15", text: "text-blue-400", label: "Assigned" },
  picked_up: { bg: "bg-violet-500/15", text: "text-violet-400", label: "Picked Up" },
  in_transit: { bg: "bg-cyan-500/15", text: "text-cyan-400", label: "In Transit" },
  delivered: { bg: "bg-emerald-500/15", text: "text-emerald-400", label: "Delivered" },
  failed: { bg: "bg-red-500/15", text: "text-red-400", label: "Failed" },
  cancelled: { bg: "bg-zinc-500/15", text: "text-zinc-400", label: "Cancelled" },
  // Driver / Vehicle statuses
  available: { bg: "bg-emerald-500/15", text: "text-emerald-400", label: "Available" },
  busy: { bg: "bg-amber-500/15", text: "text-amber-400", label: "Busy" },
  offline: { bg: "bg-zinc-500/15", text: "text-zinc-400", label: "Offline" },
  maintenance: { bg: "bg-orange-500/15", text: "text-orange-400", label: "Maintenance" },
}

interface StatusBadgeProps {
  status: string
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const style = STATUS_STYLES[status] ?? {
    bg: "bg-zinc-500/15",
    text: "text-zinc-400",
    label: status,
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        style.bg,
        style.text,
        className,
      )}
    >
      {style.label}
    </span>
  )
}
