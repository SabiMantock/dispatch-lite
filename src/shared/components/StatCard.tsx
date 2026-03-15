import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCardProps {
  icon: LucideIcon
  value: number
  label: string
  className?: string
}

export function StatCard({ icon: Icon, value, label, className }: StatCardProps) {
  return (
    <div className={cn("flex items-center gap-4 rounded-xl border border-border bg-card p-5", className)}>
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div>
        <p className="text-3xl font-bold tracking-tight text-foreground">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  )
}
