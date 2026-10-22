// ─── Physics Quest · Turkish sim terms · slice j (w5-standing-waves, w6-beats-lab) ──
// Keys EXACTLY match the user-visible English strings in src/components/sims/j/.
// {placeholders} mark interpolated values; missing keys fall back to English.
export const termsTrJ: Record<string, string> = {
  // ── w5-standing-waves ── frame, controls, readouts
  'Standing Waves Lab': 'Durğan Dalga Laboratuvarı',
  'A string fixed at both ends vibrates in whole loops. Nodes stand still, antinodes swing hardest. Motion is slow motion — every readout is real.':
    'İki ucu sabit bir ip bütün halkalar hâlinde titreşir. Düğümler yerinde durur, karınlara en büyük salınım düşer. Hareket ağır çekimdedir — her gösterge gerçektir.',
  'Standing wave lab: a string fixed at both ends vibrating in n loops, with a dashed amplitude envelope, rose node dots on the axis and amber antinode dots at the envelope tips':
    'Durğan dalga laboratuvarı: iki ucu sabit olup n halka hâlinde titreşen bir ip; kesik çizgili genlik zarfı, eksen üzerinde gül kurusu düğüm noktaları ve zarf uçlarında kehribar karın noktaları',
  'String length L': 'İp uzunluğu L',
  'Tension F': 'Germe kuvveti F',
  'String material': 'İp malzemesi',
  'Nylon · 0.001 kg/m': 'Naylon · 0.001 kg/m',
  'Steel · 0.004 kg/m': 'Çelik · 0.004 kg/m',
  'Thick · 0.01 kg/m': 'Kalın · 0.01 kg/m',
  'Harmonic n': 'Harmonik n',
  'n = 1 (fundamental)': 'n = 1 (temel)',
  'n = 2': 'n = 2',
  'n = 3': 'n = 3',
  'n = 4': 'n = 4',
  'n = 5': 'n = 5',
  'n = 6': 'n = 6',
  'Reset': 'Sıfırla',
  'Challenge: f₃ = 300 Hz': 'Meydan okuma: f₃ = 300 Hz',
  'Wave speed v = √(F/μ)': 'Dalga hızı v = √(F/μ)',
  'Harmonic frequency fₙ': 'Harmonik frekans fₙ',
  'Wavelength λₙ = 2L/n': 'Dalga boyu λₙ = 2L/n',
  'Challenge target': 'Hedef (meydan okuma)',

  // ── w5-standing-waves ── result templates + canvas banners + canvas labels
  'Goal: I set L = 1 m, steel string, n = 3 for you. Tune the tension F until the 3rd harmonic f₃ reads 300 Hz (±2 Hz).':
    'Hedef: senin için L = 1 m, çelik ip ve n = 3 ayarladım. 3. harmonik f₃ 300 Hz (±2 Hz) gösterene dek germe kuvveti F’yi ayarla.',
  'f₃ = 3·v/(2L) = {f} Hz at F = {F} N (v = √(F/μ) = {v} m/s) — the 3rd harmonic of the steel string is spot on 300 Hz!':
    'f₃ = 3·v/(2L) = {f} Hz, F = {F} N iken (v = √(F/μ) = {v} m/s) — çelik ipin 3. harmoniği tam 300 Hz’de!',
  'Challenge: tune F until f₃ = 300 Hz (±2 Hz)': 'Meydan okuma: f₃ = 300 Hz (±2 Hz) olana dek F’yi ayarla',
  '★ f₃ = 300 Hz — challenge complete!': '★ f₃ = 300 Hz — meydan okuma tamamlandı!',
  'y = 2A·sin(nπx/L)·cos(2πfₙ·t) · slow motion': 'y = 2A·sin(nπx/L)·cos(2πfₙ·t) · ağır çekim',
  'n = {n} loops': 'n = {n} halka',
  'fixed end': 'sabit uç',
  'node': 'düğüm',
  'antinode': 'karın',
  '● node (still)   ● antinode (biggest swing)   ‑ ‑ envelope ±2A·sin(nπx/L)':
    '● düğüm (durur)   ● karın (en geniş salınım)   ‑ ‑ zarf ±2A·sin(nπx/L)',

  // ── w6-beats-lab ── frame, controls, readouts, legends
  'Beats & Intensity Lab': 'Vurumlar ve Şiddet Laboratuvarı',
  'Two tuning forks with close frequencies wobble the loudness at f_beat = |f₁ − f₂|. Below: a point source spreads power over a growing sphere (I = P/(4πr²)).':
    'Frekansları birbirine yakın iki akort çatalı, ses şiddetini f_beat = |f₁ − f₂| ile oynatır. Altta: nokta kaynak, büyüyen bir küre üzerine güç yayar (I = P/(4πr²)).',
  'Beats lab: a scrolling graph of two close sine waves added together, the loudness envelope pulsing at the beat frequency, and a glowing point source whose halo shrinks with distance':
    'Vurum laboratuvarı: birbirine yakın iki sinüs dalgasının toplamının kayan grafiği, vuru frekansıyla atan ses şiddeti zarfı ve hâlosu uzaklıkla küçülen parlayan nokta kaynak',
  'sum of the two waves': 'iki dalganın toplamı',
  'loudness envelope (beats)': 'ses şiddeti zarfı (vurumlar)',
  'Fork 1 f₁': 'Çatal 1 f₁',
  'Fork 2 f₂': 'Çatal 2 f₂',
  'Play tone': 'Ton çal',
  'Source power P': 'Kaynak gücü P',
  'Distance r': 'Uzaklık r',
  'Challenge: 4 beats/s': 'Meydan okuma: 4 vuru/s',
  'Beat frequency |f₁ − f₂|': 'Vuru frekansı |f₁ − f₂|',
  'Intensity I = P/(4πr²)': 'Şiddet I = P/(4πr²)',
  'Sound level 10·log₁₀(I/10⁻¹²)': 'Ses düzeyi 10·log₁₀(I/10⁻¹²)',

  // ── w6-beats-lab ── result templates + canvas banners + canvas labels
  'Goal: fork 1 is locked at 440 Hz. Tune fork 2 until the beat frequency reads 4 Hz (±0.5) — 436 or 444 will do it.':
    'Hedef: çatal 1, 440 Hz’de kilitli. Vuru frekansı 4 Hz (±0.5) gösterene dek çatal 2’yi ayarla — 436 ya da 444 işi görür.',
  'f₂ = {f2} Hz against f₁ = 440 Hz → f_beat = |f₂ − f₁| = {fb} Hz — four loud–soft pulses per second. Tuned like a pro!':
    'f₂ = {f2} Hz, f₁ = 440 Hz’e karşı → f_beat = |f₂ − f₁| = {fb} Hz — saniyede dört güçlü–zayıf atım. Ustası gibi akort ettin!',
  'Challenge: tune f₂ for 4 beats/s (f₁ = 440 Hz)': 'Meydan okuma: 4 vuru/s için f₂’yi ayarla (f₁ = 440 Hz)',
  '★ 4 beats/s — challenge complete!': '★ 4 vuru/s — meydan okuma tamamlandı!',
  'sum of the two waves (motion paused)': 'iki dalganın toplamı (hareket duraklatıldı)',
  'sum: sin(2πf₁·t) + sin(2πf₂·t) · 0.1 s window': 'toplam: sin(2πf₁·t) + sin(2πf₂·t) · 0.1 s pencere',
  'envelope |2cos(2π(f₂−f₁)t/2)| · 1 s window': 'zarf |2cos(2π(f₂−f₁)t/2)| · 1 s pencere',
  'loudness envelope — f_beat = {fb} Hz (motion paused)': 'ses şiddeti zarfı — f_beat = {fb} Hz (hareket duraklatıldı)',
  'point source · P = {P} W · r = {r} m': 'nokta kaynak · P = {P} W · r = {r} m',
  'glow radius ∝ 1/r · level ≈ {db} dB': 'parıltı yarıçapı ∝ 1/r · düzey ≈ {db} dB',
}
