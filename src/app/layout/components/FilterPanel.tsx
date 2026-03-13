import type { ReactNode } from 'react'

import { LayoutPanel } from './LayoutPanel'

type FilterPanelProps = {
  children: ReactNode
  eyebrow?: string
  note?: string
  title: string
}

export function FilterPanel({
  children,
  eyebrow = 'Filter Panel',
  note,
  title,
}: FilterPanelProps) {
  return (
    <LayoutPanel>
      <div className="border-b border-white/8 pb-4">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-slate-500">
          {eyebrow}
        </p>
        <h3 className="mt-2 text-lg font-semibold text-slate-50">
          {title}
        </h3>
      </div>
      <div className="mt-5 space-y-4">
        {children}
        {note ? (
          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-sm leading-6 text-cyan-100/90">
            {note}
          </div>
        ) : null}
      </div>
    </LayoutPanel>
  )
}
