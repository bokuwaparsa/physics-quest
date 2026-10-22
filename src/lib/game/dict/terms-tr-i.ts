// ─── Physics Quest · Turkish sim terms · slice i (w4-shm-lab, t4-gas-box, t5-heat-engine) ──
// Keys EXACTLY match the user-visible English strings in src/components/sims/i/
// (key set mirrors terms-fa-i.ts for fa/tr parity).
// {placeholders} mark interpolated values; missing keys fall back to English.
export const termsTrI: Record<string, string> = {
  // ── w4-shm-lab ── frame, controls, readouts, legends
  'SHM Lab': 'Basit Harmonik Hareket Laboratuvarı',
  'Springs and pendulums in simple harmonic motion. Theory says T = 2π√(m/k) and T = 2π√(L/g) — the stopwatch measures the real period from zero crossings to check.':
    'Yaylar ve sarkaçlar basit harmonik hareket hâlinde. Kuram T = 2π√(m/k) ve T = 2π√(L/g) der — kronometre denetim için gerçek periyodu sıfır geçişlerinden ölçer.',
  'A mass oscillating on a spring beside vertical kinetic and potential energy bars, or a pendulum swinging between dashed extremes, with a period stopwatch during the challenge':
    'Yay üzerinde salınan ve dikey kinetik-potansiyel enerji çubuklarının yanında duran bir kütle ya da kesik çizgili uçlar arasında sallanan bir sarkaç; meydan okuma sırasında periyot kronometresiyle',
  'Mode': 'Kip',
  'Spring': 'Yay',
  'Pendulum': 'Sarkaç',
  'Mass m': 'Kütle m',
  'Spring constant k': 'Yay sabiti k',
  'Length L': 'Uzunluk L',
  'Swing angle θ₀': 'Sallanma açısı θ₀',
  'Challenge: period exactly 2.00 s': 'Meydan okuma: periyot tam 2.00 s',
  'Reset': 'Sıfırla',
  'T theory': 'Kuramsal T',
  'T measured': 'Ölçülen T',
  'Frequency f = 1/T': 'Frekans f = 1/T',
  'Total energy ½kA²': 'Toplam enerji ½kA²',
  'kinetic energy': 'kinetik enerji',
  'potential energy': 'potansiyel enerji',
  'pendulum bob': 'sarkaç topu',

  // ── w4-shm-lab ── canvas strings
  'Challenge: tune the period to 2.00 ± 0.05 s for two cycles in a row!': 'Meydan okuma: periyodu art arda iki çevrim için 2.00 ± 0.05 s’ye ayarla!',
  'T = measuring…': 'T = ölçülüyor…',
  'motion paused · judged on theory ({n} cycles in band)': 'hareket duraklatıldı · kuramla değerlendiriliyor ({n} çevrim bantta)',
  'stopwatch · in-band cycles: {n} / 2': 'kronometre · bant içi çevrim: {n} / 2',
  '★ T = 2.00 s — challenge complete!': '★ T = 2.00 s — meydan okuma tamamlandı!',
  '(motion paused — readouts use theory)': '(hareket duraklatıldı — göstergeler kuramı kullanır)',
  'total = ½kA² = {E} J (constant)': 'toplam = ½kA² = {E} J (sabit)',
  'x = {x} m': 'x = {x} m',
  'L = {L} m · θ = {θ}°': 'L = {L} m · θ = {θ}°',
  'KE': 'KE',
  'PE': 'PE',

  // ── w4-shm-lab ── challenge results
  'Goal: get a measured period of 2.00 ± 0.05 s for two cycles in a row. Spring: tune m and k (T = 2π√(m/k)). Pendulum: tune L (T = 2π√(L/g)) — θ₀ changes nothing!':
    'Hedef: ölçülen periyodu art arda iki çevrim boyunca 2.00 ± 0.05 s yap. Yay: m ve k’yi ayarla (T = 2π√(m/k)). Sarkaç: L’yi ayarla (T = 2π√(L/g)) — θ₀ hiçbir şeyi değiştirmez!',
  '★ T = {T} s — two cycles in a row inside 2.00 ± 0.05 s! You tuned the ratio m/k just right: T = 2π√(m/k). Mass and stiffness trade off, so many pairs work.':
    '★ T = {T} s — art arda iki çevrim 2.00 ± 0.05 s içinde! m/k oranını tam gerektiği gibi ayarladın: T = 2π√(m/k). Kütle ve sertlik takas yapar; o yüzden birçok çift işe yarar.',
  '★ T = {T} s — two cycles in a row inside 2.00 ± 0.05 s! You found the "seconds pendulum": T = 2π√(L/g) needs L ≈ 0.99 m. The swing angle θ₀ never mattered.':
    '★ T = {T} s — art arda iki çevrim 2.00 ± 0.05 s içinde! "saniye sarkacını" buldun: T = 2π√(L/g) için L ≈ 0.99 m gerekir. Sallanma açısı θ₀ hiçbir zaman önemli olmadı.',

  // ── t4-gas-box ── frame, controls, readouts, legends
  'Gas Box': 'Gaz Kutusu',
  '100 particles bounce elastically off the walls. Heat them (T↑) or squeeze the box (V↓) and watch the pressure climb — the readout is the real momentum the walls receive each second.':
    '100 tanecik duvarlardan esnek biçimde seker. Isıt (T↑) ya da kutuyu sıkıştır (V↓) ve basıncın tırmanışını izle — gösterge, duvarların her saniye aldığı gerçek momentumdur.',
  'A box of 100 bouncing gas particles with adjustable temperature and volume; the pressure readout is measured from the momentum the particles deliver to the walls':
    'Sıcaklığı ve hacmi ayarlanabilen, 100 seken gaz taneciği içeren bir kutu; basınç göstergesi taneciklerin duvarlara taşıdığı momentumdan ölçülür',
  'Temperature T': 'Sıcaklık T',
  'Volume V': 'Hacim V',
  'Colour by speed': 'Hıza göre renklendirme',
  'Challenge: target P = 150': 'Meydan okuma: hedef P = 150',
  'Temperature': 'Sıcaklık',
  'Volume': 'Hacim',
  'Pressure (smoothed)': 'Basınç (yumuşatılmış)',
  'Theory P = 100·T/(300·V)': 'Kuram P = 100·T/(300·V)',
  'slow particles': 'yavaş tanecikler',
  'medium': 'orta',
  'fast particles': 'hızlı tanecikler',

  // ── t4-gas-box ── canvas strings
  'N = 100 elastic particles · P measured from wall momentum flux': 'N = 100 esnek tanecik · P duvar momentum akışından ölçülür',
  'Challenge: reach P = 150 units (±8) by tuning T and V!': 'Meydan okuma: T ve V’yi ayarlayarak P = 150 birime (±8) ulaş!',
  'in band {t} / 2 s': 'bantta {t} / 2 s',
  '★ P = 150 units — challenge complete!': '★ P = 150 birim — meydan okuma tamamlandı!',

  // ── t4-gas-box ── challenge results
  'Goal: tune T and V until the smoothed pressure sits at 150 units (±8) for 2 s. Remember P ∝ T/V — try 450 K at V = 1, or 300 K with V ≈ 0.65–0.70.':
    'Hedef: yumuşatılmış basınç 2 s boyunca 150 birimde (±8) kalana dek T ve V’yi ayarla. P ∝ T/V’yi hatırla — V = 1’de 450 K ya da V ≈ 0.65–0.70 ile 300 K dene.',
  '★ P = {P} units — on target and steady for 2 s! You lived the law P ∝ T/V: hotter or squeezed gas hammers the walls harder and more often.':
    '★ P = {P} birim — hedefte ve 2 s boyunca kararlı! P ∝ T/V yasasını bizzat yaşadın: daha sıcak ya da sıkıştırılmış gaz duvarlara daha sert ve daha sık vurur.',

  // ── t5-heat-engine ── frame, controls, readouts, legends
  'Heat Engine': 'Isı Makinesi',
  'Pour 1000 J of heat in: the engine outputs work W and dumps waste heat Qc. Efficiency e = W/Qh is capped by Carnot, e_max = 1 − Tc/Th, in kelvin. Beat 500 J if you can!':
    '1000 J ısı ver: makine W işini çıkarır ve atık ısı Qc’yi boşaltır. Verim e = W/Qh, kelvin cinsinden Carnot sınırı e_max = 1 − Tc/Th ile sınırlıdır. Yapabilirsen 500 J’yi geç!',
  'A heat engine between a hot and a cold reservoir: heat flows in, work flows out and waste heat is dumped, with three energy bars and the Carnot limit marked':
    'Sıcak ve soğuk rezervuar arasında bir ısı makinesi: ısı içeri akar, iş dışarı akar, atık ısı boşaltılır; üç enerji çubuğu ve işaretlenmiş Carnot sınırıyla',
  'Hot reservoir Th': 'Sıcak rezervuar Th',
  'Cold reservoir Tc': 'Soğuk rezervuar Tc',
  'Engine type': 'Makine türü',
  'Ideal Carnot (reversible)': 'İdeal Carnot (tersinir)',
  'Steam turbine · 15%': 'Buhar türbini · %15',
  'Petrol engine · 25%': 'Benzinli makine · %25',
  'Diesel engine · 37%': 'Dizel makine · %37',
  'Pour 1000 J': '1000 J dök',
  'Challenge: W ≥ 500 J': 'Meydan okuma: W ≥ 500 J',
  'Efficiency e = W/Qh': 'Verim e = W/Qh',
  'Carnot limit 1 − Tc/Th': 'Carnot sınırı 1 − Tc/Th',
  'Work W': 'İş W',
  'Waste heat Qc': 'Atık ısı Qc',
  'heat in Qh': 'giren ısı Qh',
  'work out W': 'çıkan iş W',
  'waste heat Qc': 'atık ısı Qc',

  // ── t5-heat-engine ── canvas strings
  'hot · Th = {Th} K': 'sıcak · Th = {Th} K',
  'cold · Tc = {Tc} K': 'soğuk · Tc = {Tc} K',
  'Tc ≥ Th — engine cannot run!': 'Tc ≥ Th — makine çalışamaz!',
  'ENGINE': 'MAKİNE',
  'Qh {q} J': 'Qh {q} J',
  'W {W} J': 'W {W} J',
  'Qc {Qc} J': 'Qc {Qc} J',
  'Qh in (heat)': 'giren Qh (ısı)',
  'W out (work) — dashed = Carnot max': 'çıkan W (iş) — kesik çizgi = Carnot üst sınırı',
  'Qc dumped (waste)': 'boşaltılan Qc (atık)',
  'Challenge: get W ≥ 500 J from one 1000 J pour — needs Carnot ≥ 50% (Th ≥ 2×Tc)!': 'Meydan okuma: tek bir 1000 J dökümden W ≥ 500 J al — Carnot ≥ %50 gerekir (Th ≥ 2×Tc)!',
  '★ W ≥ 500 J — challenge complete!': '★ W ≥ 500 J — meydan okuma tamamlandı!',

  // ── t5-heat-engine ── challenge results
  'Goal: get W ≥ 500 J from ONE 1000 J pour. Hint: e = min(engine rating, 1 − Tc/Th) must clear 50% — tune Th and Tc, and remember the rated engines stay at 15–37%.':
    'Hedef: TEK bir 1000 J dökümden W ≥ 500 J al. İpucu: e = min(makine derecesi, 1 − Tc/Th) %50’yi aşmalı — Th ve Tc’yi ayarla; dereceli makinelerin %15–37’de kaldığını unutma.',
  '★ W = {W} J from one 1000 J pour! Efficiency {e}% ≥ 50% needs the Carnot limit ≥ 50% — that means Th ≥ 2×Tc. Real engines (15–37%) can never get there; only the ideal reversible one can.':
    '★ Tek bir 1000 J dökümden W = {W} J! %{e} ≥ %50 verim, Carnot sınırının ≥ %50 olmasını gerektirir — bu da Th ≥ 2×Tc demektir. Gerçek makineler (%15–37) asla oraya varamaz; yalnızca ideal tersinir makine varabilir.',
  "{W} J — short of the 500 J goal. You need e ≥ 50%, so the Carnot limit 1 − Tc/Th must reach 50%: make Th ≥ 2×Tc (e.g. 600 K over 300 K) and pick 'Ideal Carnot' — a 1000 J pour then splits 500 J work / 500 J waste.":
    '{W} J — 500 J hedefine ulaşamadı. e ≥ %50 gerekir; yani Carnot sınırı 1 − Tc/Th %50’ye ulaşmalı: Th ≥ 2×Tc yap (örneğin 300 K üzerinde 600 K) ve ‘İdeal Carnot’u seç — 1000 J’lik döküm o zaman 500 J iş / 500 J atık olarak bölünür.',
  'Poured 1000 J: W = {W} J out, Qc = {Qc} J dumped. e = {e}% against a Carnot ceiling of {c}%.':
    '1000 J döküldü: W = {W} J çıktı, Qc = {Qc} J boşaltıldı. e = %{e} — Carnot tavanı %{c}.',
}
