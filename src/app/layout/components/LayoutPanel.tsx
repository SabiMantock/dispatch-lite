import type { ReactNode } from 'react'

type LayoutPanelProps = {
  children: ReactNode
  className?: string
}

export function LayoutPanel({ children, className = '' }: LayoutPanelProps) {
  return (
    <section
      className={`rounded-[28px] border border-white/8 bg-[#0b1220]/92 p-5 shadow-[0_20px_80px_rgba(0,0,0,0.35)] ${className}`.trim()}
    >
      {children}
    </section>
  )
}
