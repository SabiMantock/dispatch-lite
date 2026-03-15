import type { ReactNode } from "react"

interface FilterBarProps {
  children?: ReactNode
}

export function FilterBar({ children }: FilterBarProps) {
  if (!children) return null

  return (
    <div className="flex items-center gap-3 py-3">
      {children}
    </div>
  )
}
