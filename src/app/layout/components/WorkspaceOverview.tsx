type WorkspaceCard = {
  label: string
  value: string
  detail: string
}

type WorkspaceOverviewProps = {
  cards: WorkspaceCard[]
}

export function WorkspaceOverview({ cards }: WorkspaceOverviewProps) {
  return (
    <div className="rounded-[28px] border border-white/8 bg-[#0b1220]/92 p-5 shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-slate-500">
            Dispatch Surface
          </p>
          <h3 className="mt-3 text-2xl font-semibold text-slate-50">
            Welcome back, dispatcher
          </h3>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
            Your console is calibrated. The shell keeps jobs, drivers,
            vehicles, and operational review visible in one pass.
          </p>
        </div>
        <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300">
          Ready
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <article
            key={card.label}
            className="rounded-3xl border border-white/8 bg-white/[0.03] p-4"
          >
            <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
              {card.label}
            </p>
            <p className="mt-4 text-4xl font-semibold tracking-tight text-slate-50">
              {card.value}
            </p>
            <div className="mt-4 flex h-14 items-end gap-2">
              <span className="h-4 w-2 rounded-full bg-white/15" />
              <span className="h-10 w-2 rounded-full bg-white" />
              <span className="h-8 w-2 rounded-full bg-white" />
              <span className="h-12 w-2 rounded-full bg-cyan-400" />
              <span className="h-7 w-2 rounded-full bg-white" />
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-400">
              {card.detail}
            </p>
          </article>
        ))}
      </div>
    </div>
  )
}
