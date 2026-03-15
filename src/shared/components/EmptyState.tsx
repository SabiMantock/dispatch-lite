import type { LucideIcon } from "lucide-react"

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description?: string
  action?: { label: string; onClick: () => void }
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <Icon className="size-10 text-muted-foreground/40" />
      <p className="mt-3 text-sm font-medium text-muted-foreground">{title}</p>
      {description && (
        <p className="mt-1 text-xs text-muted-foreground/70">{description}</p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="mt-3 text-xs font-medium text-primary hover:underline"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}
