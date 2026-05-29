import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react'
import { getNistCategory } from '../data/nistThresholds'

interface ResultInterpretationProps {
  time: number
  n: number
  k: number
  z: number
}

function formatScientific(log2val: number): string {
  const exp = Math.floor(log2val * Math.log10(2))
  const mantissa = Math.pow(10, log2val * Math.log10(2) - exp)
  return `${mantissa.toFixed(1)} × 10^${exp}`
}

function formatYears(log2val: number): string {
  const log10ops = log2val * Math.log10(2)
  const log10years = log10ops - 18 - Math.log10(365.25 * 86400)
  if (log10years < 0) return '< 1 año'
  const exp = Math.floor(log10years)
  return `~10^${exp} años`
}

export function ResultInterpretation({ time, n, k, z }: ResultInterpretationProps) {
  const category = getNistCategory(n, k, z)
  const threshold = category?.threshold

  let status: 'safe' | 'marginal' | 'unsafe'
  let statusLabel: string
  let statusIcon: typeof CheckCircle

  if (threshold == null) {
    status = 'safe'
    statusLabel = 'Parámetros personalizados — sin categoría NIST asignada'
    statusIcon = CheckCircle
  } else if (time >= threshold) {
    status = 'safe'
    statusLabel = 'SEGURO'
    statusIcon = CheckCircle
  } else if (time >= threshold - 5) {
    status = 'marginal'
    statusLabel = 'MARGINAL'
    statusIcon = AlertTriangle
  } else {
    status = 'unsafe'
    statusLabel = 'INSEGURO'
    statusIcon = XCircle
  }

  const Icon = statusIcon

  const colorMap = {
    safe:     { bg: 'bg-teal-50',   border: 'border-teal-200',  text: 'text-teal-700',   icon: 'text-teal-600'   },
    marginal: { bg: 'bg-amber-50',  border: 'border-amber-200', text: 'text-amber-700',  icon: 'text-amber-600'  },
    unsafe:   { bg: 'bg-red-50',    border: 'border-red-200',   text: 'text-red-700',    icon: 'text-red-600'    },
  }
  const c = colorMap[status]

  const ops = formatScientific(time)
  const years = formatYears(time)
  const margin = threshold != null ? (time - threshold).toFixed(2) : null

  return (
    <div className={`mt-3 rounded-lg border ${c.border} ${c.bg} px-3 py-2.5 text-xs`}>
      <div className={`flex items-center gap-1.5 font-semibold ${c.text}`}>
        <Icon className={`size-3.5 ${c.icon}`} />
        <span className="font-mono">2^{time.toFixed(2)}</span>
        <span>—</span>
        <span>{statusLabel}</span>
      </div>
      <div className="mt-1.5 space-y-0.5 font-mono text-slate-500">
        {threshold != null && margin != null && (
          <p>
            {parseFloat(margin) >= 0
              ? `↑ Excede umbral NIST ${category!.label} (≥${threshold}) por +${margin} bits`
              : `↓ Por debajo del umbral NIST ${category!.label} (≥${threshold}) en ${Math.abs(parseFloat(margin)).toFixed(2)} bits`}
          </p>
        )}
        <p>≈ {ops} operaciones</p>
        <p>Supercomputadora (10^18 op/s): {years}</p>
      </div>
    </div>
  )
}
