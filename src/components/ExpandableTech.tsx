import { useState, type ReactNode } from 'react'
import { ChevronRight } from 'lucide-react'

interface ExpandableTechProps {
  children: ReactNode
  label?: string
}

export function ExpandableTech({ children, label = '🔬 Detalles técnicos' }: ExpandableTechProps) {
  const [open, setOpen] = useState(false)
  const id = `tech-panel-${Math.random().toString(36).slice(2, 7)}`

  return (
    <div className="mt-4 rounded-lg border border-violet-200 bg-violet-50/50">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={id}
        className="flex w-full items-center gap-2 rounded-lg px-4 py-3 text-left text-sm font-medium text-violet-700 transition-colors hover:bg-violet-50"
      >
        <ChevronRight
          className={`size-4 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-90' : ''}`}
        />
        {label}
      </button>
      {open && (
        <div
          id={id}
          className="border-t border-violet-200 px-4 pb-4 pt-3 text-sm leading-relaxed text-slate-700"
        >
          {children}
        </div>
      )}
    </div>
  )
}
