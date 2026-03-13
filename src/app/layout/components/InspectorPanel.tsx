import type { ReactNode } from 'react'

import { LayoutPanel } from './LayoutPanel'

type InspectorPanelProps = {
  children: ReactNode
  title: string
  isOpen: boolean
}

export function InspectorPanel({ children, title, isOpen }: InspectorPanelProps) {
  return (
    <LayoutPanel className={isOpen ? 'block' : 'hidden'}>
      <div className="border-b border-white/8 pb-4">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-slate-500">
          Inspector Panel
        </p>
        <h3 className="mt-2 text-lg font-semibold text-slate-50">
          {title}
        </h3>
      </div>

      <div className="mt-5 space-y-4">{children}</div>
    </LayoutPanel>
  )
}
