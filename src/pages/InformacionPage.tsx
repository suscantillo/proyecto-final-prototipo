import { useState } from 'react'
import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Menu, X, ShieldCheck } from 'lucide-react'
import { Term } from '../components/Term'
import { ExpandableTech } from '../components/ExpandableTech'

const SECTIONS = [
  { id: 's1', label: '1. ¿Por qué importa?' },
  { id: 's2', label: '2. Firma digital' },
  { id: 's3', label: '3. El problema R-SDP' },
  { id: 's4', label: '4. La variante R-SDP(G)' },
  { id: 's5', label: '5. Los cuatro ataques' },
  { id: 's6', label: '6. ¿Qué son 2^144 bits?' },
  { id: 's7', label: '7. Categorías NIST' },
  { id: 's8', label: '8. CROSS vs otras propuestas' },
  { id: 's9', label: '9. Aporte de este proyecto' },
  { id: 's10', label: '10. Cómo usar el estimador' },
]

function SectionTitle({ num, title }: { num: string; title: string }) {
  return (
    <div className="mb-4 flex items-baseline gap-3">
      <span className="flex-shrink-0 rounded-md bg-teal-700 px-2 py-0.5 text-xs font-bold text-white">
        {num}
      </span>
      <h2 className="text-xl font-semibold text-slate-950">{title}</h2>
    </div>
  )
}

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            {headers.map((h) => (
              <th key={h} className="px-3 py-2 text-left font-semibold text-slate-700">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-slate-100">
              {row.map((cell, j) => (
                <td key={j} className="px-3 py-2 text-slate-600">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <code className="block whitespace-pre-wrap rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 font-mono text-xs leading-relaxed text-slate-800">
      {children}
    </code>
  )
}

export function InformacionPage() {
  const [navOpen, setNavOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.08),transparent_34rem),linear-gradient(180deg,#f8fbfb_0%,#eef3f5_100%)]">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <ShieldCheck className="size-4 text-teal-700" />
            CROSS Estimator
            <span className="text-slate-400">/</span>
            <span className="text-teal-700">Información</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="hidden items-center gap-1.5 rounded-md bg-teal-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-teal-800 sm:flex"
            >
              Ir al estimador
              <ArrowRight className="size-3.5" />
            </Link>
            <button
              onClick={() => setNavOpen((v) => !v)}
              className="flex items-center gap-1 rounded-md border border-slate-200 px-2.5 py-1.5 text-xs text-slate-600 lg:hidden"
            >
              {navOpen ? <X className="size-4" /> : <Menu className="size-4" />}
              Secciones
            </button>
          </div>
        </div>
        {navOpen && (
          <nav className="border-t border-slate-100 bg-white px-4 py-3 lg:hidden">
            <ul className="grid grid-cols-2 gap-1">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    onClick={() => setNavOpen(false)}
                    className="block rounded px-2 py-1.5 text-xs text-slate-600 hover:bg-teal-50 hover:text-teal-700"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>

      <div className="mx-auto flex max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:px-8">
        {/* Sticky sidebar — desktop only */}
        <aside className="hidden w-56 flex-shrink-0 lg:block">
          <nav className="sticky top-20 space-y-0.5">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
              Contenido
            </p>
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="block rounded px-2 py-1.5 text-xs text-slate-600 transition-colors hover:bg-teal-50 hover:text-teal-700"
              >
                {s.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="min-w-0 max-w-2xl flex-1 space-y-14">

          {/* ── Sección 1 ─────────────────────────────────────────── */}
          <section id="s1" className="scroll-mt-20">
            <SectionTitle num="1" title="¿Por qué importa esto?" />
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <blockquote className="rounded-lg border-l-4 border-teal-600 bg-teal-50/60 px-4 py-3 text-sm italic text-slate-700">
                Toda la información sensible que envías por internet — tu banca, tus mensajes, tus
                contratos firmados digitalmente — está protegida por candados matemáticos. Hoy esos
                candados son tan fuertes que ni la supercomputadora más potente del mundo puede
                romperlos en menos de millones de años.
              </blockquote>
              <p>
                El problema: las <strong>computadoras cuánticas</strong>, cuando sean
                suficientemente grandes, podrán romper esos candados en horas. No es ciencia
                ficción — el algoritmo que lo hace (Shor, 1994) ya existe en papel; solo falta el
                hardware lo suficientemente potente.
              </p>
              <p>
                Desde 2016, el <strong>NIST</strong> (la agencia de estándares de EE.UU.) organiza
                una competencia mundial para encontrar nuevos candados que resistan tanto a
                computadoras clásicas como cuánticas. Eso es la{' '}
                <Term def="Resistente a ataques con computadoras cuánticas suficientemente grandes.">
                  criptografía postcuántica
                </Term>
                .
              </p>
              <p>
                <strong>CROSS</strong> es uno de los candidatos activos en esta competencia, en la
                categoría de firmas digitales. Este proyecto construye una herramienta abierta para{' '}
                <strong>medir qué tan resistente es CROSS frente a los ataques conocidos</strong>.
              </p>
            </div>
          </section>

          {/* ── Sección 2 ─────────────────────────────────────────── */}
          <section id="s2" className="scroll-mt-20">
            <SectionTitle num="2" title="¿Qué es una firma digital?" />
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                Una firma digital es el equivalente matemático de una firma manuscrita, pero con
                dos garantías más fuertes:
              </p>
              <ul className="space-y-2 pl-4">
                <li className="flex gap-2">
                  <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-teal-600" />
                  <span>
                    <strong>Autenticación:</strong> prueba que el mensaje vino de quien dice ser.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-teal-600" />
                  <span>
                    <strong>Integridad:</strong> garantiza que el mensaje no fue alterado en el
                    camino.
                  </span>
                </li>
              </ul>
              <p>
                Cuando tu banco te envía un correo legítimo, una firma digital prueba que vino de
                ellos. Cuando descargas una actualización de software, una firma digital prueba que
                el archivo no fue modificado por un atacante.
              </p>
              <p>
                CROSS es una propuesta para hacer estas firmas{' '}
                <strong>resistentes a la era cuántica</strong>, sin sacrificar eficiencia.
              </p>
            </div>
          </section>

          {/* ── Sección 3 ─────────────────────────────────────────── */}
          <section id="s3" className="scroll-mt-20">
            <SectionTitle num="3" title="El problema matemático: R-SDP" />
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-slate-400">
                  📖 Versión intuitiva
                </p>
                <p>
                  Imagina un candado con <strong>127 ruedas</strong>. Cada rueda solo puede girar a{' '}
                  <strong>7 posiciones específicas</strong> (no las 10 dígitos de un candado
                  normal). Eso da <strong>7^127 combinaciones posibles</strong> — aproximadamente{' '}
                  <strong>2^356</strong> — un número con más de cien dígitos.
                </p>
                <p className="mt-3">
                  Pero hay una pista: las ruedas deben satisfacer un conjunto de{' '}
                  <strong>ecuaciones matemáticas conocidas públicamente</strong>. Un atacante que
                  conozca las ecuaciones todavía debe encontrar la combinación correcta entre todas
                  las posibles. Las ecuaciones son la parte pública (como una "pista del
                  crucigrama"); la combinación correcta es la parte secreta (la "respuesta").
                </p>
                <p className="mt-3">
                  CROSS apuesta a que encontrar esa combinación es{' '}
                  <strong>demasiado difícil</strong>, incluso para una computadora cuántica.
                </p>
              </div>

              <ExpandableTech>
                <div className="space-y-3">
                  <p>
                    Sea <strong>p</strong> un número{' '}
                    <Term def="Un número entero mayor que 1 que solo es divisible por 1 y por sí mismo (ej: 2, 3, 5, 7, 127).">
                      primo
                    </Term>{' '}
                    (en CROSS, p = 127), y sea <strong>g</strong> un elemento de F_p* de orden
                    primo <strong>z</strong> (con z dividiendo a p−1; en CROSS, z = 7). El conjunto
                    restringido es:
                  </p>
                  <CodeBlock>E = {'{'} g^0, g^1, …, g^(z-1) {'}'} ⊂ 𝔽_p*</CodeBlock>
                  <p>
                    <strong>Problema R-SDP:</strong> dada una{' '}
                    <Term def="Una tabla rectangular de números. La matriz H es pública y define el sistema de ecuaciones.">
                      matriz
                    </Term>{' '}
                    pública <strong>H ∈ 𝔽_p^((n−k)×n)</strong> y un{' '}
                    <Term def="El resultado de aplicar la matriz H al vector secreto. Es público; el secreto no.">
                      síndrome
                    </Term>{' '}
                    <strong>s ∈ 𝔽_p^(n−k)</strong>, encontrar un{' '}
                    <Term def="Una lista ordenada de números. En este contexto, una secuencia de n coordenadas que representan el secreto.">
                      vector
                    </Term>{' '}
                    <strong>e ∈ E^n</strong> tal que:
                  </p>
                  <CodeBlock>e · H^T = s</CodeBlock>
                  <p>
                    <strong>Diferencia clave con SDP clásico:</strong> en SDP clásico, el error{' '}
                    <strong>e</strong> tiene pocas coordenadas no nulas (
                    <Term def="El número de coordenadas no nulas de un vector. En R-SDP clásico es pequeño; en R-SDP es n (todas no nulas).">
                      Hamming weight
                    </Term>{' '}
                    w {"<<"} n). En R-SDP, <strong>todas las coordenadas son no nulas</strong> pero
                    restringidas a E. Esto cambia radicalmente qué ataques funcionan.
                  </p>
                  <p>
                    <strong>Parámetros NIST oficiales (Categoría I):</strong> n = 127, k = 76, z =
                    7, p = 127.
                  </p>
                </div>
              </ExpandableTech>
            </div>
          </section>

          {/* ── Sección 4 ─────────────────────────────────────────── */}
          <section id="s4" className="scroll-mt-20">
            <SectionTitle num="4" title="La variante R-SDP(G)" />
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-slate-400">
                  📖 Versión intuitiva
                </p>
                <p>
                  CROSS también propone una variante optimizada llamada <strong>R-SDP(G)</strong>.
                  La idea es: en vez de permitir cualquier combinación de las 127 ruedas,{' '}
                  <strong>
                    se restringe el secreto a vivir en un subconjunto especial más estructurado
                  </strong>
                  .
                </p>
                <p className="mt-3">Esta restricción tiene dos consecuencias:</p>
                <ul className="mt-2 space-y-2 pl-4">
                  <li className="flex gap-2">
                    <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-teal-600" />
                    <span>
                      <strong>Bueno:</strong> las firmas son más cortas y más rápidas de generar.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-red-500" />
                    <span>
                      <strong>Malo:</strong> abre la puerta a un ataque específico
                      (CollisionSearch) que aprovecha esa estructura adicional.
                    </span>
                  </li>
                </ul>
              </div>

              <ExpandableTech>
                <div className="space-y-3">
                  <p>
                    Sea <strong>G = ⟨a₁, …, a_m⟩ ⊆ E^n</strong> un{' '}
                    <Term def="Un subconjunto especial de un conjunto más grande que mantiene su estructura algebraica (suma, multiplicación, etc.).">
                      subgrupo
                    </Term>{' '}
                    multiplicativo de dimensión <strong>m {"<"} n</strong>, generado por m elementos
                    linealmente independientes.
                  </p>
                  <p>
                    <strong>Problema R-SDP(G):</strong> dada <strong>H</strong> y <strong>s</strong>
                    , encontrar <strong>e ∈ G</strong> tal que <strong>e · H^T = s</strong>.
                  </p>
                  <p>
                    La diferencia con R-SDP es que el error no solo está en E^n, sino que pertenece
                    al subgrupo estructurado G. La dimensión m es un parámetro adicional del
                    problema.
                  </p>
                  <p>
                    <strong>Parámetros NIST oficiales (Categoría I):</strong> n = 55, k = 36, z =
                    127, m = 25, p = 509.
                  </p>
                  <p>
                    <strong>Consecuencia de seguridad:</strong> el ataque CollisionSearch (Teorema
                    15 del spec CROSS) explota esta estructura. Para los parámetros NIST Cat-I,
                    CollisionSearch da T = 2^144.05 bits — el ataque más eficiente conocido sobre
                    R-SDP(G), y el que define el margen más ajustado del esquema (+1 bit sobre el
                    umbral).
                  </p>
                </div>
              </ExpandableTech>
            </div>
          </section>

          {/* ── Sección 5 ─────────────────────────────────────────── */}
          <section id="s5" className="scroll-mt-20">
            <SectionTitle num="5" title="Los cuatro ataques analizados" />
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
                  📖 Versión intuitiva
                </p>
                <Table
                  headers={['Familia', 'Ataque', 'Variante', 'En una frase']}
                  rows={[
                    ['Combinatorio', 'Stern', 'R-SDP', 'Divide el problema en dos mitades y busca coincidencias entre listas.'],
                    ['Combinatorio', 'BJMM', 'R-SDP', 'Como Stern pero más sofisticado: usa representaciones múltiples del secreto.'],
                    ['Algebraico', 'Gröbner/F4', 'R-SDP', 'Traduce el problema a ecuaciones polinomiales y las resuelve con álgebra.'],
                    ['Híbrido', 'CollisionSearch', 'R-SDP(G)', 'Aprovecha la estructura del subgrupo G para dividir el ataque en dos fases.'],
                  ]}
                />
              </div>

              <ExpandableTech>
                <div className="space-y-3">
                  <p>
                    <strong>Stern (Stern–Dümer ISD):</strong> algoritmo{' '}
                    <Term def="Un subconjunto de k coordenadas del vector elegido aleatoriamente por el atacante. Si 'acierta', puede resolver el sistema.">
                      Information Set Decoding
                    </Term>{' '}
                    clásico. Un único parámetro libre <strong>ℓ</strong> controla el tamaño de las
                    listas. Costo: O(2^(c·n)) con c dependiendo de la tasa k/n.
                  </p>
                  <p>
                    <strong>BJMM (Becker–Joux–May–Meurer):</strong> mejora de Stern usando
                    representaciones (Meet-in-the-Middle de tres niveles). Cinco parámetros libres:
                    (ℓ, ν₁, ν₂, δ₁, δ₂). Mejor asintóticamente que Stern.
                  </p>
                  <p>
                    <strong>Gröbner/F4 (Faugère):</strong> ataque algebraico. R-SDP se formula como
                    ideal polinomial:{' '}
                    <em>
                      I = ⟨e_i^z − 1, (Σ H_ji e_i) − s_j⟩
                    </em>
                    . Costo dominado por el grado de regularidad <strong>d_reg</strong>. Usa la{' '}
                    <Term def="Una forma especial de reescribir un sistema de ecuaciones polinomiales que permite leer las soluciones directamente.">
                      base de Gröbner
                    </Term>
                    .
                  </p>
                  <p>
                    <strong>CollisionSearch:</strong> exclusivo de R-SDP(G), basado en el Teorema 15
                    del spec CROSS. Cuatro parámetros libres (j_a, d_a, j_b, d_b). El costo se
                    descompone aditivamente como <strong>T ≥ min(A + B)</strong>, donde A es el
                    costo de iteración interna y B es el costo de encontrar los subcódigos
                    auxiliares.
                  </p>
                </div>
              </ExpandableTech>
            </div>
          </section>

          {/* ── Sección 6 ─────────────────────────────────────────── */}
          <section id="s6" className="scroll-mt-20">
            <SectionTitle num="6" title='¿Qué significa "2^144 bits de seguridad"?' />
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                Cuando este estimador dice que un ataque cuesta <strong>2^144 bits</strong>,
                significa que un atacante necesitaría realizar aproximadamente{' '}
                <strong>2^144 ≈ 10^43 operaciones</strong> para romperlo.
              </p>
              <p className="font-medium text-slate-600">Referencia rápida:</p>
              <Table
                headers={['Umbral', 'Significado']}
                rows={[
                  ['2^80',  'Considerado roto en 2020. Ya no se usa.'],
                  ['2^128', 'Equivalente a AES-128. Seguro contra computadoras clásicas durante décadas.'],
                  ['2^143', 'Umbral mínimo NIST Categoría I.'],
                  ['2^207', 'Umbral mínimo NIST Categoría III.'],
                  ['2^272', 'Umbral mínimo NIST Categoría V (máxima seguridad).'],
                ]}
              />
              <p>
                <strong>Comparación física:</strong> una supercomputadora actual realiza ~10^18
                operaciones por segundo. Para 2^128, eso son ~10^13 años (mil veces la edad del
                universo). Para 2^272, el número es tan grande que escribirlo no aporta intuición —
                es simplemente inalcanzable con cualquier hardware concebible.
              </p>
            </div>
          </section>

          {/* ── Sección 7 ─────────────────────────────────────────── */}
          <section id="s7" className="scroll-mt-20">
            <SectionTitle num="7" title="Las categorías NIST" />
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                El NIST clasifica la seguridad postcuántica en cinco niveles. Este proyecto evalúa
                los tres más relevantes:
              </p>
              <div className="space-y-3">
                {[
                  { cat: 'Categoría I',   min: '143 bits', equiv: 'Equivalente a romper AES-128.', color: 'border-teal-200 bg-teal-50/60' },
                  { cat: 'Categoría III', min: '207 bits', equiv: 'Equivalente a romper AES-192.', color: 'border-indigo-200 bg-indigo-50/60' },
                  { cat: 'Categoría V',   min: '272 bits', equiv: 'Equivalente a romper AES-256.', color: 'border-violet-200 bg-violet-50/60' },
                ].map(({ cat, min, equiv, color }) => (
                  <div key={cat} className={`rounded-lg border p-4 ${color}`}>
                    <p className="font-semibold text-slate-800">{cat}</p>
                    <p className="mt-1 text-sm text-slate-600">
                      Mínimo: <strong>{min}</strong> clásicos. {equiv}
                    </p>
                  </div>
                ))}
              </div>
              <p>
                Cada categoría corresponde a parámetros (n, k, z) diferentes en CROSS. Los presets
                en el estimador cargan los valores oficiales de la especificación CROSS v1.2.
              </p>
            </div>
          </section>

          {/* ── Sección 8 ─────────────────────────────────────────── */}
          <section id="s8" className="scroll-mt-20">
            <SectionTitle num="8" title="¿Por qué CROSS y no otra propuesta postcuántica?" />
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
                  📖 Versión intuitiva
                </p>
                <p className="mb-3">
                  CROSS no es la única propuesta{' '}
                  <Term def="Resistente a ataques con computadoras cuánticas suficientemente grandes.">
                    postcuántica
                  </Term>
                  . El NIST tiene varias familias compitiendo, y cada una se basa en un tipo
                  distinto de problema matemático "difícil":
                </p>
                <Table
                  headers={['Familia', 'Ejemplos', 'Idea base', 'Trade-off']}
                  rows={[
                    ['Basada en retículos', 'Dilithium, Falcon', 'Encontrar vectores cortos en espacios de alta dimensión.', 'Eficiente, pero seguridad depende de hipótesis fuertes.'],
                    ['Basada en hash', 'SPHINCS+', 'Usar funciones hash criptográficas como bloque básico.', 'Muy conservadora, pero firmas grandes y lentas.'],
                    ['Basada en códigos', 'CROSS, LESS', 'Resolver problemas de decodificación de códigos lineales.', 'Estudiada por décadas, pero balance complejo entre tamaño y velocidad.'],
                  ]}
                />
                <p className="mt-3">
                  CROSS se sitúa en la familia <strong>basada en{' '}
                  <Term def="Un conjunto de vectores que cumplen ciertas ecuaciones lineales. En criptografía, los códigos son la base de varios esquemas postcuánticos.">
                    códigos lineales
                  </Term></strong>, que lleva más de 40 años siendo estudiada. Eso lo hace una de
                  las apuestas más maduras.
                </p>
              </div>

              <ExpandableTech>
                <div className="space-y-3">
                  <p>
                    CROSS sigue el paradigma{' '}
                    <Term def="Una técnica criptográfica que convierte un protocolo de cómputo multi-parte en una firma digital no interactiva.">
                      MPC-in-the-Head
                    </Term>{' '}
                    (Ishai et al., 2007) aplicado a R-SDP.
                  </p>
                  <p>
                    <strong>Ventajas de R-SDP como problema base:</strong>
                  </p>
                  <ul className="ml-4 list-disc space-y-1">
                    <li>Reducción de seguridad a problemas estándar (R-SDP es NP-completo).</li>
                    <li>No requiere hipótesis nuevas o exóticas.</li>
                    <li>
                      Eficiencia computacional decente: las operaciones son aritmética modular en
                      F_p.
                    </li>
                  </ul>
                  <p>
                    <strong>Desventajas:</strong>
                  </p>
                  <ul className="ml-4 list-disc space-y-1">
                    <li>
                      Firmas relativamente grandes (~13 KB para Cat-I, vs ~2.4 KB de Dilithium-2).
                    </li>
                    <li>
                      Análisis de seguridad concreto más complejo, porque hay múltiples familias
                      de ataques que se balancean entre sí.
                    </li>
                  </ul>
                  <p>
                    Por estas razones, CROSS es un candidato sólido cuyo valor está en proveer{' '}
                    <strong>diversidad</strong> al portafolio postcuántico: si las propuestas basadas
                    en lattices llegaran a sufrir un ataque inesperado, CROSS estaría disponible
                    como respaldo.
                  </p>
                </div>
              </ExpandableTech>
            </div>
          </section>

          {/* ── Sección 9 ─────────────────────────────────────────── */}
          <section id="s9" className="scroll-mt-20">
            <SectionTitle num="9" title="Aporte de este proyecto" />
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
                  📖 Versión intuitiva
                </p>
                <p>
                  Cuando los diseñadores de CROSS publicaron su esquema, también publicaron sus
                  propias estimaciones de seguridad. Pero esas estimaciones se calcularon con{' '}
                  <strong>MAGMA</strong>, un software matemático propietario (caro, cerrado). No hay
                  forma de que un investigador o estudiante verifique esos números sin pagar una
                  licencia.
                </p>
                <p className="mt-3 font-medium text-slate-800">Este proyecto construye la alternativa abierta:</p>
                <div className="mt-3 space-y-3">
                  {[
                    {
                      num: '1',
                      title: 'Estimador open-source unificado',
                      body: 'Primera implementación libre de los cuatro ataques (Stern, BJMM, Gröbner, CollisionSearch) sobre R-SDP y R-SDP(G). Cualquiera puede correrlo, modificarlo o extenderlo.',
                    },
                    {
                      num: '2',
                      title: 'Modelo empírico de d_reg',
                      body: 'El ataque Gröbner depende de un valor (d_reg) que no tiene fórmula exacta para R-SDP. Este proyecto generó 85 instancias propias en SageMath y construyó el primer modelo empírico, dando los valores concretos: 2^500, 2^719, 2^962 bits para las tres categorías.',
                    },
                    {
                      num: '3',
                      title: 'Validación cruzada',
                      body: 'Los resultados se compararon contra el spec oficial de CROSS. La diferencia en CollisionSearch Categoría I es de +0.45 bits — el estimador open-source coincide con el cálculo MAGMA con margen sub-bit.',
                    },
                  ].map(({ num, title, body }) => (
                    <div key={num} className="flex gap-3">
                      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-teal-700 text-xs font-bold text-white">
                        {num}
                      </span>
                      <div>
                        <p className="font-semibold text-slate-800">{title}</p>
                        <p className="text-sm text-slate-600">{body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <ExpandableTech>
                <div className="space-y-3">
                  <p>
                    <strong>Aporte 1 — Estimador unificado.</strong> Construido sobre el framework{' '}
                    <code className="rounded bg-slate-100 px-1 text-xs">
                      cryptographic_estimators
                    </code>{' '}
                    (Esser et al., AsiaCCS 2024), extendido con módulos CROSSProblem, CROSSAlgorithm
                    y los cuatro algoritmos. Backend FastAPI, frontend React, 9/9 tests de
                    regresión.
                  </p>
                  <p>
                    <strong>Aporte 2 — Modelo empírico de d_reg.</strong> El spec CROSS solo varía
                    n en su análisis Gröbner, asumiendo semi-regularidad. Este proyecto:
                  </p>
                  <ul className="ml-4 list-disc space-y-1 text-sm">
                    <li>
                      Generó 85 instancias variando n ∈ {'{'} 4, 6, 8{'}'}, k/n ∈ {'{'} 0.30, 0.50, 0.70{'}'},
                      z ∈ {'{'} 3, 7{'}'}.
                    </li>
                    <li>Midió d_reg en SageMath/Singular vía búsqueda binaria sobre deg_bound.</li>
                    <li>Ajustó tres formas funcionales por mínimos cuadrados; seleccionó la ganadora por BIC.</li>
                  </ul>
                  <p>Modelo final:</p>
                  <CodeBlock>
                    d̂_reg(n, k, z) = −11.20 + 2.16·n + 12.73·ln(z) − 3.17·(n−k){'\n'}
                    R² = 0.856
                  </CodeBlock>
                  <p>
                    Aplicado a parámetros NIST: log₂T = 500.16 (Cat-I), 719.17 (Cat-III), 962.37
                    (Cat-V) — los primeros valores concretos publicados.
                  </p>
                  <p>
                    <strong>Aporte 3 — Validación.</strong> Para Categoría I de R-SDP(G),
                    CollisionSearch da log₂T = 144.05 bits; el spec CROSS reporta ≥143.6 (cálculo
                    MAGMA). El sesgo +0.45 bits es la mejor calibración del proyecto, y los
                    parámetros óptimos (j_a=19, d_a=1, j_b=23, d_b=4) coinciden exactamente con el
                    Ejemplo 16 del spec.
                  </p>
                </div>
              </ExpandableTech>
            </div>
          </section>

          {/* ── Sección 10 ────────────────────────────────────────── */}
          <section id="s10" className="scroll-mt-20">
            <SectionTitle num="10" title="Cómo usar el estimador" />
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <div className="space-y-3">
                {[
                  { step: '1', text: 'Elige una variante: R-SDP o R-SDP(G).' },
                  { step: '2', text: 'Carga un preset NIST (I, III o V) o define parámetros propios.' },
                  { step: '3', text: 'Selecciona los ataques a evaluar (puedes elegir varios de la misma variante).' },
                  {
                    step: '4',
                    text: 'Pulsa "Calcular complejidad". El resultado se expresa en bits (log₂ del número de operaciones).',
                  },
                  {
                    step: '5',
                    text: 'Compara con el umbral de la categoría: si el resultado es mayor, CROSS es seguro frente a ese ataque.',
                  },
                ].map(({ step, text }) => (
                  <div key={step} className="flex gap-3">
                    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border-2 border-teal-600 text-sm font-bold text-teal-700">
                      {step}
                    </span>
                    <p className="pt-0.5">{text}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-lg border border-amber-200 bg-amber-50/60 px-4 py-3 text-sm text-amber-800">
                <strong>Sugerencia:</strong> prueba primero un preset NIST oficial para ver los
                valores publicados, luego reduce n o k para ver cómo cae la seguridad. Es la forma
                más rápida de entender qué hace cada parámetro.
              </div>
            </div>
          </section>

          {/* Footer CTA */}
          <div className="border-t border-slate-200 pt-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-lg bg-teal-700 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-teal-800"
            >
              Ir al estimador
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </main>
      </div>
    </div>
  )
}
