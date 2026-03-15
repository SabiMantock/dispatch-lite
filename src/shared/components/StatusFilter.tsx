import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface StatusFilterProps {
  label: string
  value: string | null
  onChange: (value: string | null) => void
  options: { value: string; label: string }[]
}

export function StatusFilter({ label, value, onChange, options }: StatusFilterProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-muted-foreground">{label}</span>
      <Select
        value={value ?? "all"}
        onValueChange={(v) => onChange(v === "all" ? null : v)}
      >
        <SelectTrigger className="h-8 w-[140px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
