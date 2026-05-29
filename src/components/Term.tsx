import { useState, useRef, useEffect, type ReactNode } from 'react'

interface TermProps {
  def: string
  children: ReactNode
}

export function Term({ def, children }: TermProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!open) return
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  return (
    <span ref={ref} className="relative inline-block">
      <span
        role="button"
        tabIndex={0}
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={(e) => e.key === 'Enter' && setOpen((v) => !v)}
        className="cursor-help border-b border-dashed border-slate-400 text-slate-800 transition-colors hover:border-teal-500 hover:text-teal-700"
        aria-describedby={open ? 'term-tooltip' : undefined}
      >
        {children}
      </span>
      {open && (
        <span
          id="term-tooltip"
          role="tooltip"
          className="absolute bottom-full left-1/2 z-50 mb-2 w-64 -translate-x-1/2 rounded-lg border border-slate-200 bg-slate-900 px-3 py-2 text-xs leading-relaxed text-white shadow-xl"
        >
          {def}
          <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
        </span>
      )}
    </span>
  )
}
