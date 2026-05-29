import { Target, AlertTriangle, Swords } from 'lucide-react'
import type { CrossParameters, AttackType } from '../lib/types'

interface QuickExamplesProps {
  onLoad: (params: CrossParameters, attacks: AttackType[]) => void
}

const EXAMPLES: {
  icon: typeof Target
  label: string
  desc: string
  params: CrossParameters
  attacks: AttackType[]
  color: string
}[] = [
  {
    icon: Target,
    label: 'Parámetros NIST oficiales',
    desc: 'Cat. I · Stern · reproduce el spec CROSS',
    params: { n: 127, k: 76, z: 7 },
    attacks: ['stern'],
    color: 'hover:border-teal-300 hover:bg-teal-50 hover:text-teal-800',
  },
  {
    icon: AlertTriangle,
    label: 'Parámetros débiles (didáctico)',
    desc: 'n=20, k=10 · muestra caída de seguridad',
    params: { n: 20, k: 10, z: 7 },
    attacks: ['stern'],
    color: 'hover:border-amber-300 hover:bg-amber-50 hover:text-amber-800',
  },
  {
    icon: Swords,
    label: 'Stern vs BJMM',
    desc: 'Cat. I · compara dos ataques lado a lado',
    params: { n: 127, k: 76, z: 7 },
    attacks: ['stern', 'bjmm'],
    color: 'hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-800',
  },
]

export function QuickExamples({ onLoad }: QuickExamplesProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
        Ejemplos rápidos
      </h3>
      <div className="flex flex-col gap-2">
        {EXAMPLES.map(({ icon: Icon, label, desc, params, attacks, color }) => (
          <button
            key={label}
            onClick={() => onLoad(params, attacks)}
            className={`flex items-start gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-left transition-all ${color}`}
          >
            <Icon className="mt-0.5 size-4 flex-shrink-0 text-slate-400" />
            <div>
              <p className="text-xs font-semibold text-slate-800">{label}</p>
              <p className="text-xs text-slate-500">{desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
