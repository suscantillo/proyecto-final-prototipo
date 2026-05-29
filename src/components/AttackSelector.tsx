import { useState } from 'react'
import { AttackType } from '../lib/types'
import { Check, ChevronDown, ChevronUp, GitBranch, Network, FlaskConical, Zap } from 'lucide-react'
import { ExpandableTech } from './ExpandableTech'

interface AttackSelectorProps {
  selectedAttacks: AttackType[]
  onAttackChange: (attacks: AttackType[]) => void
}

type AttackDef = {
  value: AttackType
  label: string
  description: string
  icon: typeof Network
  accent: string
  inOneLine: string
  intuitive: string
  technical: React.ReactNode
  appliesTo: string
}

const ATTACKS_RSDP: AttackDef[] = [
  {
    value: 'stern',
    label: 'Stern',
    description: 'Stern/Dumer information set decoding attack',
    icon: Network,
    accent: 'teal',
    inOneLine: 'Divide el problema en dos mitades y busca coincidencias entre ellas, estilo "encuentro en el medio".',
    intuitive:
      'El atacante elige aleatoriamente un subconjunto de coordenadas (el "information set"), resuelve un sistema lineal pequeño, y verifica si encontró el secreto. Si no, repite con otro subconjunto. El parámetro ℓ controla cuántas coordenadas se reservan para crear listas que se cruzan en busca de coincidencias.',
    technical: (
      <ul className="ml-4 list-disc space-y-1.5">
        <li><strong>Estructura:</strong> algoritmo Stern–Dümer clásico (Information Set Decoding) adaptado a R-SDP.</li>
        <li><strong>Fases:</strong> eliminación gaussiana → construcción de listas L₁, L₂ → búsqueda de colisiones → verificación.</li>
        <li><strong>Adaptación a R-SDP:</strong> la probabilidad de éxito por iteración es P = 1, porque el error tiene peso completo. Esto simplifica el análisis.</li>
        <li><strong>Parámetro libre:</strong> un único ℓ. El estimador busca el ℓ óptimo respetando k+ℓ ≡ 0 (mod 2).</li>
        <li><strong>Memoria:</strong> controlada por el tamaño de las listas, función de ℓ.</li>
      </ul>
    ),
    appliesTo: 'R-SDP',
  },
  {
    value: 'bjmm',
    label: 'BJMM',
    description: 'Becker-Joux-May-Meurer representation technique',
    icon: GitBranch,
    accent: 'indigo',
    inOneLine: 'Como Stern, pero más sofisticado: usa representaciones múltiples del secreto para aumentar la probabilidad de coincidencia.',
    intuitive:
      'En vez de construir dos listas (como Stern), BJMM construye listas en tres niveles. La idea es que cada solución tiene muchas formas equivalentes de representarse — al considerar todas, las listas crecen y aumenta la probabilidad de encontrar coincidencias rápido. El precio: requiere más memoria.',
    technical: (
      <ul className="ml-4 list-disc space-y-1.5">
        <li><strong>Estructura:</strong> algoritmo BJMM (Becker–Joux–May–Meurer, 2012) de tres niveles, basado en la técnica de representaciones.</li>
        <li><strong>Parámetros libres:</strong> cinco — (ℓ, ν₁, ν₂, δ₁, δ₂), controlando los tamaños de listas en cada nivel.</li>
        <li><strong>Resultado para Cat-I:</strong> el estimador da 2^159.44; el spec CROSS reporta ≥143 (MAGMA). La diferencia (~16 bits) viene de que el estimador exige k+ℓ par, mientras MAGMA optimiza sobre reales.</li>
      </ul>
    ),
    appliesTo: 'R-SDP',
  },
  {
    value: 'groebner',
    label: 'Gröbner Basis',
    description: 'F5 algebraic attack on R-SDP polynomial system',
    icon: FlaskConical,
    accent: 'violet',
    inOneLine: 'En vez de buscar el secreto, lo traduce a un sistema de ecuaciones polinomiales y las resuelve con álgebra pura.',
    intuitive:
      'R-SDP se reescribe como un conjunto de ecuaciones polinomiales: unas dicen "cada coordenada del secreto pertenece al conjunto restringido E" (n ecuaciones de grado z), y otras codifican el sistema lineal. El algoritmo F4 lo resuelve usando álgebra avanzada.',
    technical: (
      <ul className="ml-4 list-disc space-y-1.5">
        <li><strong>Formulación:</strong> ideal polinomial I = ⟨eᵢᶻ − 1, Σ Hⱼᵢeᵢ − sⱼ⟩ ⊂ 𝔽_p[e₁,…,eₙ].</li>
        <li><strong>Algoritmo:</strong> F4 (Faugère, 1999) con orden DRL.</li>
        <li><strong>Costo:</strong> T ≥ C(n + d_reg, d_reg)^ω · log₂p, con ω = 2.</li>
        <li><strong>Modelo empírico d_reg (aporte del proyecto):</strong> d̂_reg = −11.20 + 2.16n + 12.73·ln(z) − 3.17·(n−k), R²=0.856.</li>
        <li><strong>Resultado:</strong> 2^500.16 (Cat-I), 2^719.17 (Cat-III), 2^962.37 (Cat-V). No es una amenaza práctica.</li>
        <li><strong>Sin parámetros libres optimizables.</strong></li>
      </ul>
    ),
    appliesTo: 'R-SDP',
  },
]

const ATTACKS_RSDPG: AttackDef[] = [
  {
    value: 'collision_search',
    label: 'Submatrix Stern/Dumer',
    description: 'Exploits subgroup G structure (Theorem 15)',
    icon: Zap,
    accent: 'emerald',
    inOneLine: 'Aprovecha que R-SDP(G) tiene una estructura algebraica adicional (el subgrupo G) para dividir el ataque en dos fases independientes que se suman.',
    intuitive:
      'El atacante busca dos subcódigos auxiliares dentro de la estructura del subgrupo G. La primera fase (B) encuentra esos subcódigos; la segunda fase (A) explora colisiones internas. El costo total es A + B (no A × B): son fases secuenciales, no probabilidades independientes.',
    technical: (
      <ul className="ml-4 list-disc space-y-1.5">
        <li><strong>Origen:</strong> Teorema 15 del documento CROSS Security Details v2.2.</li>
        <li><strong>Parámetros libres:</strong> cuatro — (j_a, d_a, j_b, d_b) con d_a, d_b ≤ 8 y j_a ≤ j_b.</li>
        <li><strong>Fórmula:</strong> T ≥ min(A + B) sobre todos los parámetros válidos.</li>
        <li><strong>Resultados:</strong> 2^144.05 (Cat-I), 2^211.14 (Cat-III), 2^272.96 (Cat-V) — márgenes más ajustados de todo el análisis.</li>
        <li><strong>Exclusivo de R-SDP(G).</strong> Si se invoca con m = n, el estimador lanza ValueError.</li>
      </ul>
    ),
    appliesTo: 'R-SDP(G)',
  },
]

const RSDP_VALUES   = new Set<AttackType>(ATTACKS_RSDP.map((a)   => a.value))
const RSDPG_VALUES  = new Set<AttackType>(ATTACKS_RSDPG.map((a)  => a.value))

function groupOf(a: AttackType): 'rsdp' | 'rsdpg' {
  return RSDPG_VALUES.has(a) ? 'rsdpg' : 'rsdp'
}

export function AttackSelector({ selectedAttacks, onAttackChange }: AttackSelectorProps) {
  const [openInfo, setOpenInfo] = useState<AttackType | null>(null)

  const toggleAttack = (attack: AttackType) => {
    const clickedGroup = groupOf(attack)
    const otherGroup   = clickedGroup === 'rsdp' ? RSDPG_VALUES : RSDP_VALUES
    const sameGroupSelected = selectedAttacks.filter((a) => !otherGroup.has(a))
    if (sameGroupSelected.includes(attack)) {
      onAttackChange(sameGroupSelected.filter((a) => a !== attack))
    } else {
      onAttackChange([...sameGroupSelected, attack])
    }
  }

  const toggleInfo = (attack: AttackType) => {
    setOpenInfo((prev) => (prev === attack ? null : attack))
  }

  const getColors = (accent: string, selected: boolean) => {
    const map: Record<string, { card: string; icon: string; check: string }> = {
      teal:    { card: 'border-teal-300 bg-teal-50/80 text-teal-950',          icon: 'bg-teal-100 text-teal-700 ring-teal-200',       check: 'border-teal-700 bg-teal-700' },
      indigo:  { card: 'border-indigo-300 bg-indigo-50/80 text-indigo-950',    icon: 'bg-indigo-100 text-indigo-700 ring-indigo-200', check: 'border-indigo-700 bg-indigo-700' },
      violet:  { card: 'border-violet-300 bg-violet-50/80 text-violet-950',    icon: 'bg-violet-100 text-violet-700 ring-violet-200', check: 'border-violet-700 bg-violet-700' },
      orange:  { card: 'border-orange-300 bg-orange-50/80 text-orange-950',    icon: 'bg-orange-100 text-orange-700 ring-orange-200', check: 'border-orange-700 bg-orange-700' },
      emerald: { card: 'border-emerald-300 bg-emerald-50/80 text-emerald-950', icon: 'bg-emerald-100 text-emerald-700 ring-emerald-200', check: 'border-emerald-700 bg-emerald-700' },
    }
    return selected
      ? map[accent]
      : { card: 'border-slate-200 bg-white text-slate-800', icon: 'bg-slate-50 text-slate-500 ring-slate-200', check: 'border-slate-300 bg-white text-transparent' }
  }

  const renderGroup = (title: string, badge: string, badgeClass: string, attacks: AttackDef[]) => (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-[0.13em] text-slate-500">{title}</span>
        <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${badgeClass}`}>{badge}</span>
      </div>
      <div className="grid grid-cols-1 gap-2">
        {attacks.map((attack) => {
          const selected = selectedAttacks.includes(attack.value)
          const colors   = getColors(attack.accent, selected)
          const Icon     = attack.icon
          const infoOpen = openInfo === attack.value

          return (
            <div key={attack.value} className={`rounded-lg border transition-all ${colors.card}`}>
              <div className="flex items-start gap-2 p-3">
                <button
                  onClick={() => toggleAttack(attack.value)}
                  className="flex min-w-0 flex-1 items-start gap-3 text-left"
                  aria-pressed={selected}
                >
                  <span className={`flex size-9 shrink-0 items-center justify-center rounded-md ring-1 ${colors.icon}`}>
                    <Icon className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">{attack.label}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">{attack.description}</p>
                  </div>
                  <span className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded border ${colors.check} text-white`}>
                    <Check className="size-3.5" />
                  </span>
                </button>
                <button
                  onClick={() => toggleInfo(attack.value)}
                  aria-expanded={infoOpen}
                  aria-label={`Información sobre ${attack.label}`}
                  className="mt-0.5 flex-shrink-0 rounded p-0.5 text-slate-400 hover:text-slate-600"
                >
                  {infoOpen ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                </button>
              </div>

              {infoOpen && (
                <div className="border-t border-slate-200/60 px-3 pb-3 pt-2.5 text-sm">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">📖 En una frase</p>
                  <p className="mt-1 text-slate-700">{attack.inOneLine}</p>

                  <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-slate-400">📖 Cómo funciona</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{attack.intuitive}</p>

                  <ExpandableTech>
                    <div className="space-y-2">{attack.technical}</div>
                  </ExpandableTech>

                  <p className="mt-3 text-xs text-slate-500">
                    <span className="font-semibold">⚙️ Aplica a:</span> {attack.appliesTo}
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )

  return (
    <div className="w-full space-y-5">
      <div>
        <h2 className="text-base font-semibold text-slate-950">Select Attacks</h2>
        <p className="mt-1 text-xs text-slate-500">
          Choose one or more algorithms. R-SDP and R-SDP(G) attacks use different parameters — they cannot be mixed.
        </p>
      </div>

      {renderGroup('R-SDP Attacks', 'z = 7', 'bg-teal-50 text-teal-700 ring-1 ring-teal-200', ATTACKS_RSDP)}

      <div className="border-t border-dashed border-slate-200" />

      {renderGroup('R-SDP(G) Attacks', 'z = 127, m < n', 'bg-orange-50 text-orange-700 ring-1 ring-orange-200', ATTACKS_RSDPG)}

      {selectedAttacks.length === 0 && (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          Please select at least one attack
        </p>
      )}
    </div>
  )
}
