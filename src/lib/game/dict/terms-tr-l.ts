// ─── Physics Quest · Turkish sim terms · slice l (e8-charge-b-field, e9-induction-coil, e10-rlc-resonance) ──
// Keys EXACTLY match the user-visible English strings in src/components/sims/l/.
// {placeholders} mark interpolated values; missing keys fall back to English.
export const termsTrL: Record<string, string> = {
  // ── e8-charge-b-field ── frame, controls, readouts, legends, buttons
  'Charge in a B Field': 'B Alanında Yük',
  'A charge fired across a magnetic field feels F = qv×B, always sideways — so it runs in circles. Tune v, B and the charge to land it on the 0.10 m detector ring.':
    'Mıknatıs alanı içinde atılan bir yük F = qv×B kuvvetini hisseder — hep yana doğru; bu yüzden daireler çizer. 0.10 m’lik dedektör halkasına oturması için v’yi, B’yi ve yükü ayarla.',
  'A charged particle circling in a uniform magnetic field shown as circled dots or crosses, with its predicted orbit circle, an amber detector ring of radius 0.10 metres and a rose force arrow':
    'İşaretli nokta ya da çarpılarla gösterilen düzgün manyetik alanda dolanan yüklü parçacık; öngörülen yörünge çemberi, 0.10 metre yarıçaplı kehribar dedektör halkası ve gülpembe kuvvet oku ile birlikte',
  'Charge': 'Yük',
  'Proton (+e)': 'Proton (+e)',
  'Electron (−e)': 'Elektron (−e)',
  'Alpha (+2e)': 'Alfa (+2e)',
  'Speed v': 'Hız v',
  'Field B': 'Alan B',
  'Launch angle': 'Fırlatma açısı',
  'B out of screen': 'B ekran dışına',
  'Challenge: land at r = 0.10 m': 'Meydan okuma: r = 0.10 m’ye iniş',
  'Force F = qvB': 'Kuvvet F = qvB',
  'Radius r = mv/qB': 'Yarıçap r = mv/qB',
  'f cyclotron': 'siklotron f',
  'r vs detector': 'dedektöre göre r',
  'particle trail': 'parçacık izi',
  'predicted orbit (r = mv/qB)': 'öngörülen yörünge (r = mv/qB)',
  'detector ring (0.10 m)': 'dedektör halkası (0.10 m)',
  'magnetic force': 'manyetik kuvvet',

  // ── e8-charge-b-field ── result templates + canvas banners + canvas labels
  'Goal: tune v and B so the proton’s orbit radius r = mv/(qB) matches the amber detector ring at 0.10 m ± 2% — the violet orbit circle must sit on the ring. Hint: v/B ≈ 9.58×10⁶, e.g. v = 2.0×10⁶ m/s with B ≈ 0.21 T.':
    'Hedef: protonun yörünge yarıçapı r = mv/(qB), kehribar dedektör halkasıyla 0.10 m ± 2% eşleşsin diye v ve B’yi ayarla — mor yörünge çemberi halkanın üstüne oturmalı. İpucu: v/B ≈ 9.58×10⁶; örneğin B ≈ 0.21 T ile v = 2.0×10⁶ m/s.',
  '★ Landed! r = mv/(qB) = {r} — inside 0.10 m ± 2%. You tuned the v/B ratio to 9.58×10⁶ so the Lorentz force bends the proton exactly onto the detector ring. The magnetic force steered, but never sped it up.':
    '★ İndi! r = mv/(qB) = {r} — 0.10 m ± 2% içinde. v/B oranını 9.58×10⁶’ya ayarladın; Lorentz kuvveti protonu tam dedektör halkasına kırdı. Manyetik kuvvet yönlendirdi ama asla hızlandırmadı.',
  'B out of screen ⊙ (toward you)': 'B ekran dışına ⊙ (sana doğru)',
  'B into screen ⊗ (away from you)': 'B ekran içine ⊗ (senden uzağa)',
  'detector r = 0.10 m ✓': 'dedektör r = 0.10 m ✓',
  'detector r = 0.10 m': 'dedektör r = 0.10 m',
  'orbit radius r = {r}': 'yörünge yarıçapı r = {r}',
  'Challenge: match the orbit to the detector ring — r = 0.10 m ± 2% (tune v and B)':
    'Meydan okuma: yörüngeyi dedektör halkasına eşle — r = 0.10 m ± 2% (v ve B’yi ayarla)',
  '★ Challenge complete — proton on the detector!': '★ Meydan okuma tamamlandı — proton dedektörde!',
  '(motion paused — the violet circle shows the predicted orbit)': '(hareket duraklatıldı — mor çember öngörülen yörüngeyi gösterir)',

  // ── e9-induction-coil ── frame, controls, readouts, legends, buttons
  'Induction Coil': 'İndüksiyon Bobini',
  'Faraday’s law live: EMF = −N·dΦ/dt. Only a changing flux makes the galvanometer move — sweep the magnet, drag it by hand, or let it oscillate.':
    'Faraday yasası canlı olarak: EMK = −N·dΦ/dt. Galvanometreyi yalnızca değişen akı oynatır — mıknatısı savur, elle sürükle ya da salınmasına izin ver.',
  'A red and blue bar magnet moving toward a copper coil connected to a galvanometer whose needle swings with the induced EMF, above a graph of field through the coil versus position and a live EMF trace':
    'Bakır bir bobine, iğnesi indüklenen EMK ile sallanan galvanometre üzerinden bağlı olan kırmızı-mavi çubuk mıknatıs; altında bobindeki alanın konuma göre grafiği ve canlı EMK izi',
  'Turns N': 'Sarım sayısı N',
  'Coil area A': 'Bobin alanı A',
  'Magnet speed': 'Mıknatıs hızı',
  'Magnet position': 'Mıknatıs konumu',
  'Auto-oscillate': 'Otomatik salınım',
  'Sweep through coil': 'Bobinin içinden geçir',
  'Challenge: 3 V peak': 'Meydan okuma: 3 V tepe',
  'Flux Φ = B·A': 'Akı Φ = B·A',
  'EMF = −N·dΦ/dt': 'EMK = −N·dΦ/dt',
  'Peak |EMF|': 'Tepe |EMK|',
  'B through coil vs position': 'Konuma göre bobindeki B',
  'EMF vs time': 'Zamana göre EMK',
  '3 V challenge line': '3 V meydan okuma çizgisi',

  // ── e9-induction-coil ── result templates + canvas banners + canvas labels
  'Goal: generate a peak EMF of at least 3 V. EMF = N·A·(dB/dx)·v — more turns, a bigger coil area, or a faster magnet all work. Press “Sweep through coil”, or drag the position slider by hand.':
    'Hedef: tepe değeri en az 3 V olan bir EMK üret. EMK = N·A·(dB/dx)·v — daha çok sarım, daha büyük bobin alanı ya da daha hızlı mıknatıs; hepsi işe yarar. “Bobinin içinden geçir”e bas ya da konum kaydırıcısını elle sürükle.',
  'Auto-oscillation is paused while reduced motion is on — use “Sweep through coil” or drag the position slider yourself.':
    'Azaltılmış hareket açıkken otomatik salınım duraklatılır — “Bobinin içinden geçir”i kullan ya da konum kaydırıcısını kendin sürükle.',
  '★ {v} V peak — past the 3 V goal! EMF = N·A·(dB/dx)·v with N = {n} turns, A = {a} m² and a magnet moving at up to {vmax} m/s: you made the flux change fast enough.':
    '★ {v} V tepe — 3 V hedefini geçtin! N = {n} sarım, A = {a} m² ve {vmax} m/s’ye kadar hareket eden mıknatısla EMK = N·A·(dB/dx)·v: akıyı yeterince hızlı değiştirdin.',
  'galvanometer (EMF)': 'galvanometre (EMK)',
  'coil · N = {n} turns · A = {a} m²': 'bobin · N = {n} sarım · A = {a} m²',
  'magnet · x = {x} m · v = {v} m/s': 'mıknatıs · x = {x} m · v = {v} m/s',
  'B through coil vs magnet position (peak 0.2 T)': 'Mıknatıs konumuna göre bobindeki B (tepe 0.2 T)',
  'EMF vs time (V) · time →': 'Zamana göre EMK (V) · zaman →',
  'Challenge: generate a peak EMF of 3 V or more!': 'Meydan okuma: tepe değeri 3 V ve üzeri bir EMK üret!',
  '★ Challenge complete — needle knocked past 3 V!': '★ Meydan okuma tamamlandı — iğne 3 V’yi aştı!',
  '(auto-oscillation paused · reduced motion)': '(otomatik salınım duraklatıldı · azaltılmış hareket)',

  // ── e10-rlc-resonance ── frame, controls, readouts, legends, buttons
  'Series RLC Resonance': 'Seri RLC Rezonansı',
  'A 10 V AC source drives R, L and C in series. X_L grows with frequency, X_C shrinks — where they cancel, Z collapses to R and the current peaks at f₀ = 1/(2π√(LC)).':
    '10 V’luk bir AC kaynak R, L ve C’yi seri olarak sürer. X_L frekansla büyür, X_C küçülür — birbirlerini sildikleri yerde Z, R’ye çöker ve akım f₀ = 1/(2π√(LC))’de tepeler.',
  'A series RLC circuit with an AC source, resistor, inductor and capacitor, above a resonance curve of current versus log frequency with a teal marker at f0 and an amber marker at the chosen source frequency':
    'AC kaynak, direnç, endüktör ve kondansatör içeren seri bir RLC devresi; altında akımın logaritmik frekansa göre rezonans eğrisi, f0’da camgöbeği ve seçilen kaynak frekansında kehribar işaretleyici',
  'Resistance R': 'Direnç R',
  'Inductance L': 'Endüktans L',
  'Capacitance C': 'Kapasitans C',
  'Source frequency f': 'Kaynak frekansı f',
  'Challenge: hit f₀ within 1%': 'Meydan okuma: f₀’ye %1 içinde ulaş',
  'f₀ = 1/(2π√LC)': 'f₀ = 1/(2π√LC)',
  'X_L = 2πfL': 'X_L = 2πfL',
  'X_C = 1/(2πfC)': 'X_C = 1/(2πfC)',
  'Impedance Z': 'Empedans Z',
  'I = V/Z': 'I = V/Z',
  'I(f) resonance curve': 'I(f) rezonans eğrisi',
  'your source frequency': 'senin kaynak frekansın',
  'current in the circuit': 'devredeki akım',

  // ── e10-rlc-resonance ── result templates + canvas banners + canvas labels
  'Goal: tune the source frequency f to within 1% of f₀ = 1/(2π√(LC)). Watch the teal f₀ line and slide f onto it — there X_L = X_C cancel and the current explodes to V/R.':
    'Hedef: kaynak frekansı f’yi f₀ = 1/(2π√(LC)) değerinin %1 içine ayarla. Camgöbeği f₀ çizgisini izle ve f’yi üzerine kaydır — orada X_L ile X_C birbirini siler ve akım V/R’ye fırlar.',
  '★ Resonance! f = {f} is within {off}% of f₀ = {f0}. There X_L = X_C cancel, Z = R = {r} Ω, and I = V/R = {i} — the biggest current this circuit can carry. That is exactly how a radio locks onto one station.':
    '★ Rezonans! f = {f}, f₀ = {f0} değerinin yalnızca %{off} yanında. Orada X_L ile X_C birbirini siler, Z = R = {r} Ω olur ve I = V/R = {i} — bu devrenin taşıyabileceği en büyük akım. Bir radyonun tek bir istasyona kilitlenmesi tam olarak böyle olur.',
  'f₀ = {f0} → beyond the dial (increase L or C)': 'f₀ = {f0} → kadranın ötesinde (L ya da C’yi artır)',
  'I (mA) · log frequency →': 'I (mA) · logaritmik frekans →',
  'Challenge: get f within 1% of f₀ — currently off by {off} %': 'Meydan okuma: f’yi f₀’nin %1 içine sok — şu an %{off} sapma var',
  '★ Challenge complete — locked onto resonance!': '★ Meydan okuma tamamlandı — rezonansa kilitlendi!',

  // shared
  'Reset': 'Sıfırla',
}
