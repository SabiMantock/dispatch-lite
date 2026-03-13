import { LayoutPanel } from './LayoutPanel'

type DonutSegment = {
  label: string
  value: string
  color: string
}

type DailySummaryPanelProps = {
  segments: DonutSegment[]
}

export function DailySummaryPanel({ segments }: DailySummaryPanelProps) {
  return (
    <LayoutPanel>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-slate-500">
            Daily Summary
          </p>
          <h4 className="mt-2 text-lg font-semibold text-slate-50">
            Operational balance
          </h4>
        </div>
      </div>
      <div className="mt-5 flex items-center justify-center">
        <div
          className="grid h-40 w-40 place-items-center rounded-full"
          style={{
            background:
              'conic-gradient(#fb923c 0 51%, #84cc16 51% 80%, #22d3ee 80% 100%)',
          }}
        >
          <div className="grid h-26 w-26 place-items-center rounded-full bg-[#0b1220]">
            <div className="text-center">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Active Mix
              </div>
              <div className="mt-2 text-2xl font-semibold text-slate-50">
                100%
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 space-y-3">
        {segments.map((segment) => (
          <div
            key={segment.label}
            className="flex items-center justify-between text-sm"
          >
            <div className="flex items-center gap-3 text-slate-300">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: segment.color }}
              />
              <span>{segment.label}</span>
            </div>
            <span className="text-slate-500">{segment.value}</span>
          </div>
        ))}
      </div>
    </LayoutPanel>
  )
}
