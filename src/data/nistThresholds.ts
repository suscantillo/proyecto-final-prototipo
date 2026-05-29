export interface NistPreset {
  n: number
  k: number
  z: number
  threshold: number
  label: string
}

export const NIST_PRESETS: NistPreset[] = [
  { n: 127, k: 76,  z: 7,   threshold: 143, label: 'Cat. I (R-SDP)'    },
  { n: 187, k: 111, z: 7,   threshold: 207, label: 'Cat. III (R-SDP)'  },
  { n: 251, k: 150, z: 7,   threshold: 272, label: 'Cat. V (R-SDP)'    },
  { n: 55,  k: 36,  z: 127, threshold: 143, label: 'Cat. I (R-SDP(G))' },
  { n: 79,  k: 48,  z: 127, threshold: 207, label: 'Cat. III (R-SDP(G))' },
  { n: 106, k: 69,  z: 127, threshold: 272, label: 'Cat. V (R-SDP(G))' },
]

export function getNistCategory(
  n: number,
  k: number,
  z: number,
): { threshold: number; label: string } | null {
  const preset = NIST_PRESETS.find((p) => p.n === n && p.k === k && p.z === z)
  return preset ? { threshold: preset.threshold, label: preset.label } : null
}
