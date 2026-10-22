// ─── Physics Quest · Turkish sim terms · slice k (e5-flux-lab, e6-potential-map, e7-capacitor-lab) ──
// Keys EXACTLY match the user-visible English strings in src/components/sims/k/.
// {placeholders} mark interpolated values; missing keys fall back to English.
export const termsTrK: Record<string, string> = {
  // ── e5-flux-lab ── frame, controls, readouts, legends, buttons
  'Flux Lab': 'Akı Laboratuvarı',
  'A point charge breathes field lines through a tilting flat surface: Φ = E·A·cos θ. Any CLOSED surface around the charge carries Φ = q/ε₀ — no matter its shape or size.':
    'Nokta yük, eğilen düz bir yüzeyden alan çizgileri geçirir: Φ = E·A·cos θ. Yükün etrafındaki herhangi bir KAPALI yüzey, şekli ve boyutu ne olursa olsun Φ = q/ε₀ akısını taşır.',
  'A point charge with radial field arrows, a dashed closed-surface loop showing constant flux q over epsilon-zero, and a flat rectangular surface whose projected width shrinks with the tilt angle':
    'Radyal alan okları taşıyan nokta yük, sabit q/ε₀ akısını gösteren kesik çizgili kapalı yüzey halkası ve eğim açısıyla görünen genişliği daralan düz dikdörtgen yüzey',
  'Charge q': 'Yük q',
  'Surface area A': 'Yüzey alanı A',
  'Tilt angle θ': 'Eğim açısı θ',
  'E at surface': 'Yüzeyde E',
  'Surface flux Φ': 'Yüzey akısı Φ',
  'Closed-surface Φ': 'Kapalı yüzey akısı Φ',
  'Angle θ': 'Açı θ',
  'q > 0 · arrows out': 'q > 0 · oklar dışa',
  'q < 0 · arrows in': 'q < 0 · oklar içe',
  'flat surface (tilts with θ)': 'düz yüzey (θ ile eğilir)',
  'closed surface · Φ = q/ε₀': 'kapalı yüzey · Φ = q/ε₀',
  'Challenge: zero the flux': 'Meydan okuma: akıyı sıfırla',
  'Reset': 'Sıfırla',

  // ── e5-flux-lab ── result templates + canvas banners + canvas labels
  'Φ is zero — but for a sneaky reason: the charge itself is 0. Nudge q off zero, then tilt the surface edge-on to the field!':
    'Φ sıfır — ama sinsi bir nedenle: yükün kendisi 0. q’yu sıfırdan uzaklaştır, sonra yüzeyi kenarı alana dönük biçimde eğ!',
  'Φ = E·A·cos θ and cos 90° = 0 — edge-on to the field, no field lines pierce the surface! (Any closed surface around q would still carry Φ = q/ε₀.)':
    'Φ = E·A·cos θ ve cos 90° = 0 — yüzey kenarı alana dönükken hiçbir alan çizgisi yüzeyi delmez! (Yine de q etrafındaki herhangi bir kapalı yüzey Φ = q/ε₀ akısını taşır.)',
  'Φ = {f} N·m²/C (|cos θ| = {c}). Tilt closer to 90° so the field skims along the surface.':
    'Φ = {f} N·m²/C (|cos θ| = {c}). Alanın yüzey boyunca kayması için açıyı 90°’ye yaklaştır.',
  'closed surface: Φ = q/ε₀ = {f} N·m²/C': 'kapalı yüzey: Φ = q/ε₀ = {f} N·m²/C',
  'Challenge: tilt the surface until |Φ| < 1% of its maximum — find the zero-flux angle!':
    'Meydan okuma: |Φ| en yüksek değerinin %1’inin altına inene kadar yüzeyi eğ — sıfır akı açısını bul!',
  '★ Challenge complete!': '★ Meydan okuma tamamlandı!',
  'Not zero yet — keep tilting toward 90°!': 'Henüz sıfır değil — 90°’ye doğru eğmeye devam et!',

  // ── e6-potential-map ── frame, controls, readouts, legends, buttons
  'Potential Map': 'Potansiyel Haritası',
  'Two charges paint an energy landscape: amber bands are positive potential, violet bands negative. Slide the test charge and add V = kq₁/r₁ + kq₂/r₂ as plain numbers.':
    'İki yük bir enerji manzarası çizer: kehribar bantlar pozitif, mor bantlar negatif potansiyeldir. Deneme yükünü kaydır ve V = kq₁/r₁ + kq₂/r₂ toplamını düz sayılar gibi hesapla.',
  'Equipotential map of two charges with amber bands for positive and violet bands for negative potential, a movable test charge on the axis, and an arrow showing the electric field direction':
    'İki yükün eşpotansiyel haritası: pozitif potansiyel için kehribar, negatif için mor bantlar, eksen üzerinde hareket ettirilebilen deneme yükü ve elektrik alan yönünü gösteren ok',
  'Charge q₁': 'Yük q₁',
  'Charge q₂': 'Yük q₂',
  'Test charge at x': 'x’te deneme yükü',
  'Test charge qₜ': 'Deneme yükü qₜ',
  'Position x': 'Konum x',
  'V at x': 'x’te V',
  'E at x': 'x’te E',
  'Work A→B': 'A→B işi',
  'V > 0 (near + charges)': 'V > 0 (+ yüklere yakın)',
  'V < 0 (near − charges)': 'V < 0 (− yüklere yakın)',
  'test charge qₜ · E arrow': 'deneme yükü qₜ · E oku',
  'Mark A': 'A işareti',
  'Mark B': 'B işareti',
  'Challenge: find V = 0': 'Meydan okuma: V = 0 bul',

  // ── e6-potential-map ── result templates + canvas banners
  'V(x) = kq₁/r₁ + kq₂/r₂ = {v} V at x = {x} m — the +4 nC hill exactly cancels the −1 nC valley! Equipotential zero: the bands swap colour right here.':
    'V(x) = kq₁/r₁ + kq₂/r₂ = {v} V, x = {x} m’de — +4 nC tepesi −1 nC çukurunu tam olarak sönümlüyor! Sıfır eşpotansiyel: bantlar tam burada renk değiştiriyor.',
  'V = {v} V at x = {x} m. Keep hunting between the charges — the zero sits closer to the smaller charge.':
    'V = {v} V, x = {x} m’de. Yükler arasında aramaya devam et — sıfır, küçük yüke daha yakın.',
  'Challenge: with q₁ = +4 nC, q₂ = −1 nC — slide the test charge until V = 0 (|V| < 0.5 V)!':
    'Meydan okuma: q₁ = +4 nC, q₂ = −1 nC iken — V = 0 olana kadar (|V| < 0.5 V) deneme yükünü kaydır!',
  'Not zero yet — watch the bands swap colour!': 'Henüz sıfır değil — bantların renk değiştirişini izle!',

  // ── e7-capacitor-lab ── frame, controls, readouts, legends, buttons
  'Capacitor Lab': 'Kondansatör Laboratuvarı',
  'Two plates, one hungry battery: charge piles up until Q = CV. Widen the plates, squeeze the gap, insert a dielectric — then watch the energy U = ½CV² climb.':
    'İki levha, aç gözlü bir pil: yük Q = CV olana kadar birikir. Levhaları genişlet, aralığı daralt, bir dielektrik yerleştir — sonra U = ½CV² enerjisinin tırmanışını izle.',
  'Parallel-plate capacitor with plus signs on the top plate, minus signs on the bottom plate, a tinted dielectric slab between them, field arrows, and a battery showing the applied voltage':
    'Üst levhada artı, alt levhada eksi işaretleri olan paralel levhalı kondansatör, aralarında renklendirilmiş dielektrik levha, alan okları ve uygulanan gerilimi gösteren pil',
  'Plate area A': 'Levha alanı A',
  'Gap d': 'Aralık d',
  'Dielectric': 'Dielektrik',
  'Voltage V': 'Gerilim V',
  'Capacitance C': 'Kondansatans C',
  'Charge Q': 'Yük Q',
  'Energy U': 'Enerji U',
  'Field E': 'Alan E',
  '+ plate': '+ levha',
  '− plate': '− levha',
  'dielectric slab': 'dielektrik levha',
  'field E = V/d': 'alan E = V/d',
  'Vacuum · κ = 1': 'Vakum · κ = 1',
  'Paper · κ = 3': 'Kâğıt · κ = 3',
  'Glass · κ = 7': 'Cam · κ = 7',
  'Water · κ = 80': 'Su · κ = 80',
  'Challenge: bank 200 nJ at 20 V': 'Meydan okuma: 20 V’de 200 nJ biriktir',

  // ── e7-capacitor-lab ── result templates + canvas banners + canvas labels
  'U = ½CV² = ½ × {c} pF × (20 V)² = {u} nJ — past the 200 nJ target! Big area A, tiny gap d and a high-κ dielectric all boost C = κε₀A/d.':
    'U = ½CV² = ½ × {c} pF × (20 V)² = {u} nJ — 200 nJ hedefini geçtin! Büyük A alanı, küçük d aralığı ve yüksek κ’lı dielektrik hep C = κε₀A/d’yi büyütür.',
  'U = {u} nJ at 20 V — not yet. You need C ≥ 1000 pF: widen the plates, squeeze the gap, or slide in a juicier dielectric.':
    'U = {u} nJ, 20 V’de — henüz değil. C ≥ 1000 pF gerekiyor: levhaları genişlet, aralığı daralt ya da daha kapasitif bir dielektrik kaydır.',
  'vacuum · κ = 1': 'vakum · κ = 1',
  'paper · κ = 3': 'kâğıt · κ = 3',
  'glass · κ = 7': 'cam · κ = 7',
  'water · κ = 80': 'su · κ = 80',
  'Challenge: locked at V = 20 — tune A, d and the dielectric to bank at least 200 nJ!':
    'Meydan okuma: V = 20’de kilitli — en az 200 nJ biriktirmek için A’yı, d’yi ve dielektriği ayarla!',
  'Not enough energy — crank up C!': 'Enerji yetmiyor — C’yi yükselt!',
}
