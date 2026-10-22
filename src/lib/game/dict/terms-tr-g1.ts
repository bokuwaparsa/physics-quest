// ─── Physics Quest · Turkish sim terms · slice g1 (g/x1-unit-lab, g/x2-vector-lab, g/x3-rotation-lab, h/x4-rolling-race, h/x5-beam-balance, h/x6-orbit-sandbox) ──
// Keys EXACTLY match the user-visible English strings in src/components/sims/g/ and src/components/sims/h/.
// {placeholders} mark interpolated values; missing keys fall back to English.
export const termsTrG1: Record<string, string> = {
  // ── x1-unit-lab ── frame, controls, readouts
  'Unit Lab': 'Birim Laboratuvarı',
  'Pick an object, read its length on the ruler, then convert between mm, cm and m.':
    'Bir cisim seç, uzunluğunu cetvelde oku, sonra mm, cm ve m arasında dönüştür.',
  'A pencil, book or rope drawn to scale above a centimetre ruler, with its length shown in centimetres, metres and millimetres':
    'Santimetre cetvelinin üstünde ölçekli çizilmiş bir kalem, kitap ya da ip; uzunluğu santimetre, metre ve milimetre olarak gösteriliyor',
  'Object': 'Cisim',
  'Pencil · 14 cm': 'Kalem · 14 cm',
  'Book · 24 cm': 'Kitap · 24 cm',
  'Rope · 1.85 m': 'İp · 1.85 m',
  'pencil': 'kalem',
  'book': 'kitap',
  'rope': 'ip',
  'Your answer': 'Cevabın',
  'Choose an answer': 'Bir cevap seç',
  'Reset': 'Sıfırla',
  'Challenge: convert it': 'Meydan okuma: dönüştür',
  'Length': 'Uzunluk',

  // ── x1-unit-lab ── result templates + canvas banners
  'Correct! {a} {fu} = {b} {tu} — same length, different unit.':
    'Doğru! {a} {fu} = {b} {tu} — aynı uzunluk, farklı birim.',
  'Not quite: {a} {fu} = {b} {tu}. You picked {c} {tu}.':
    'Tam değil: {a} {fu} = {b} {tu}. Sen {c} {tu} seçtin.',
  'Challenge: report the {obj} length in {unit}!': 'Meydan okuma: {obj} uzunluğunu {unit} cinsinden bildir!',
  '★ Challenge complete!': '★ Meydan okuma tamamlandı!',
  'Watch the powers of ten — try again!': 'Onun kuvvetlerine dikkat et — tekrar dene!',
  'ruler (cm)': 'cetvel (cm)',

  // ── x2-vector-lab ── frame, controls, readouts
  'Vector Lab': 'Vektör Laboratuvarı',
  'Build vectors A and B with the sliders and watch their components and the head-to-tail sum R.':
    'Kaydırıcılarla A ve B vektörlerini oluştur ve bileşenlerini ile uç uca toplamları R’yi izle.',
  'Two vectors A and B drawn head-to-tail on x-y axes with their emerald resultant R and dashed components':
    'x-y eksenlerinde uç uca çizilmiş iki vektör A ve B; zümrüt bileşkeleri R ve kesik çizgili bileşenleriyle',
  'Magnitude A': 'A büyüklüğü',
  'Angle A': 'A açısı',
  'Magnitude B': 'B büyüklüğü',
  'Angle B': 'B açısı',
  'Check': 'Kontrol et',
  'Challenge: make |R| = 10': 'Meydan okuma: |R| = 10 yap',
  'Ax': 'Ax',
  'Ay': 'Ay',
  'Bx': 'Bx',
  'By': 'By',
  'Rx': 'Rx',
  'Ry': 'Ry',
  '|R|': '|R|',
  'Direction of R': 'R yönü',

  // ── x2-vector-lab ── result templates + canvas banners
  'Challenge solved! |R| = {r} at {dir}° — a 10-unit arrow pointing right.':
    'Meydan okuma çözüldü! |R| = {r}, {dir}° — sağa bakan 10 birimlik bir ok.',
  'Not yet: |R| = {r} at {dir}°. You need |R| = 10 pointing right (0°).':
    'Henüz değil: |R| = {r}, {dir}°. |R| = 10 olmalı ve sağa bakmalı (0°).',
  'Challenge: make |R| = 10 pointing right (0°)!': 'Meydan okuma: |R| = 10 yap, sağa baksın (0°)!',
  'Not the right resultant — tweak the sliders and check again!': 'Bileşke doğru değil — kaydırıcıları ayarla ve yeniden kontrol et!',

  // ── x3-rotation-lab ── frame, controls, readouts
  'Rotation Lab': 'Dönme Laboratuvarı',
  'Apply a torque to the disc: α = (τ − friction)/I with friction 0.5 N·m. Bigger I means slower spin-up.':
    'Diske tork uygula: sürtünme 0.5 N·m ile α = (τ − sürtünme)/I. Büyük I, daha yavaş hızlanma demektir.',
  'A rotating disc with an applied torque arrow, angular velocity gauge, marker dot and spokes':
    'Uygulanan tork oku, açısal hız göstergesi, işaret noktası ve petekleri olan dönen bir disk',
  'Applied torque τ': 'Uygulanan tork τ',
  'Disc type': 'Disk türü',
  'Solid disc · ½MR²': 'Katı disk · ½MR²',
  'Ring · MR²': 'Halka · MR²',
  'Point masses · MR²': 'Nokta kütleler · MR²',
  'Stop': 'Durdur',
  'Start': 'Başlat',
  'Challenge: 10 rad/s at t = 2 s': 'Meydan okuma: t = 2 s’de 10 rad/s',
  'Time': 'Süre',
  'Angle θ': 'Açı θ',
  'Angular velocity ω': 'Açısal hız ω',
  'Angular acceleration α': 'Açısal ivme α',
  'Moment of inertia I': 'Eylemsizlik momenti I',
  'Target ω': 'Hedef ω',

  // ── x3-rotation-lab ── result templates + canvas banners
  'Nailed it! ω = {w} rad/s at t = 2.0 s — your choice of τ and I produced α = {a} rad/s².':
    'Tam isabet! t = 2.0 s’de ω = {w} rad/s — τ ve I seçimin α = {a} rad/s² üretti.',
  'At t = 2.0 s the disc spun at {w} rad/s (target 10). You needed α = 5 rad/s². Retune τ or I and retry.':
    't = 2.0 s’de disk {w} rad/s ile döndü (hedef 10). α = 5 rad/s² gerekiyordu. τ veya I’yi yeniden ayarla ve tekrar dene.',
  'Challenge: tune τ and I to hit ω = 10 rad/s at t = 2 s — measuring…':
    'Meydan okuma: t = 2 s’de ω = 10 rad/s’e ulaşmak için τ ve I’yi ayarla — ölçülüyor…',
  'Off target at t = 2 s — retune τ or I and retry!': 't = 2 s’de hedef dışı — τ veya I’yi yeniden ayarla ve tekrar dene!',

  // ── x4-rolling-race ── frame, controls, readouts, legends
  'Rolling Race': 'Yuvarlanma Yarışı',
  'Hoop, disc and solid sphere — same mass, same radius — race down an incline: a = g·sinθ/(1 + I/mR²). Energy spent on spinning is energy not spent on speed.':
    'Halka, disk ve katı küre — aynı kütle, aynı yarıçap — eğik düzlemden aşağı yarışır: a = g·sinθ/(1 + I/mR²). Dönmeye giden enerji, hıza gitmeyen enerjidir.',
  'Three rollers — hoop, disc and solid sphere — racing down an inclined ramp toward a finish line, their spokes showing rotation':
    'Bitiş çizgisine doğru eğik bir rampadan yarışan üç yuvarlanan cisim — halka, disk ve katı küre; çubukları dönüşü gösteriyor',
  'Incline angle': 'Eğim açısı',
  'Your pick': 'Seçimin',
  'Hoop (I = mR²)': 'Halka (I = mR²)',
  'Disc (I = ½mR²)': 'Disk (I = ½mR²)',
  'Solid sphere (I = 2/5 mR²)': 'Katı küre (I = 2/5 mR²)',
  'Race!': 'Yarış!',
  'Challenge: pick the winner': 'Meydan okuma: kazananı seç',
  'Hoop a': 'Halka a',
  'Disc a': 'Disk a',
  'Sphere a': 'Küre a',
  'Finish order': 'Bitiş sırası',
  'hoop': 'halka',
  'disc': 'disk',
  'solid sphere': 'katı küre',
  'finish line': 'bitiş çizgisi',
  'Hoop': 'Halka',
  'Disc': 'Disk',
  'Sphere': 'Küre',
  'FINISH': 'BİTİŞ',

  // ── x4-rolling-race ── challenge results + canvas banners
  'You picked the solid sphere — and it won! Smallest I/mR² (0.4) means the biggest share of mgh becomes forward speed: a = g·sinθ/(1+0.4) beats 1.5 and 2.':
    'Katı küreyi seçtin — ve o kazandı! En küçük I/mR² (0.4), mgh’nin en büyük payının ileri hıza dönüşmesi demektir: a = g·sinθ/(1+0.4), 1.5 ve 2’yi yener.',
  'Your disc finished 2nd — so close! Its c = I/mR² = 0.5 gives a = g·sinθ/1.5; only the sphere (c = 0.4) accelerates harder.':
    'Diskin 2. oldu — çok yaklaştın! c = I/mR² = 0.5 olduğu için a = g·sinθ/1.5; yalnızca küre (c = 0.4) daha güçlü ivmelenir.',
  'Your hoop finished last. Its c = I/mR² = 1 stores half the energy as spin: a = g·sinθ/2 — the laziest roller on the ramp!':
    'Halkan sonuncu oldu. c = I/mR² = 1 olduğu için enerjinin yarısını dönmeye yatırır: a = g·sinθ/2 — rampadaki en tembel yuvarlanan!',
  'Challenge: pick the winner in the select, then press Race!': 'Meydan okuma: kazananı seçim listesinden seç, sonra Yarış!’a bas!',
  '★ Winner predicted correctly!': '★ Kazanan doğru tahmin edildi!',
  'Wrong pick — watch which object crosses first!': 'Yanlış seçim — hangi cismin önce geçtiğini izle!',

  // ── x5-beam-balance ── frame, controls, readouts, legends
  'Beam Balance': 'Kiriş Dengesi',
  'A uniform 20 kg beam on two supports. Hang a load anywhere — the reactions follow from Στ = 0 taken about each support. Overload a support (or lift one off) and the beam tips.':
    'İki mesnet üzerinde üniform 20 kg’lık bir kiriş. Yükü istediğin yere as — tepkiler her mesnet için Στ = 0’dan çıkar. Bir mesneti aşırı yükle (ya da altından çek), kiriş devrilir.',
  'A uniform beam on two triangular supports with a hanging load, reaction-force arrows, and a centre-of-gravity marker; the beam tips if a support unloads':
    'Asılı yüklü, tepki kuvveti okları ve ağırlık merkezi işaretçisi olan iki üçgen mesnet üzerinde üniform bir kiriş; bir mesnet boşalırsa kiriş devrilir',
  'Beam length': 'Kiriş uzunluğu',
  'Load': 'Yük',
  'Load position': 'Yük konumu',
  'Challenge: balance 150 N': 'Meydan okuma: 150 N’yi dengele',
  'Support A': 'A mesneti',
  'Support B': 'B mesneti',
  'Beam weight': 'Kiriş ağırlığı',
  'Support capacity': 'Mesnet kapasitesi',
  'center of gravity': 'ağırlık merkezi',
  'load': 'yük',
  'support reaction': 'mesnet tepkisi',
  'capacity {n} N/support': 'kapasite {n} N/mesnet',

  // ── x5-beam-balance ── challenge results + canvas banners
  'Both supports now carry between 150 and 200 N — the 346 N total (196 N beam + 150 N load) shared almost evenly. The centre position, 173 N each, is the classic sweet spot!':
    'Her iki mesnet de şu an 150–200 N taşıyor — 346 N’luk toplam (196 N kiriş + 150 N yük) neredeyse eşit paylaşıldı. Orta konum, 173’er N, klasik tatlı noktadır!',
  "The beam tipped! One support's reaction hit zero, so the beam rotated about the other support and slid off. Keep the load between the supports (and balanced).":
    'Kiriş devrildi! Bir mesnetin tepkisi sıfıra indi; kiriş öteki mesnetin etrafında dönüp kaydı. Yükü mesnetlerin arasında tut (ve dengede).',
  'A support was asked for more than its 800 N capacity — the beam collapsed! Watch the reaction readouts and keep both below the limit.':
    'Bir mesnenden 800 N kapasitesinin üstünde kuvvet istendi — kiriş çöktü! Tepki göstergelerini izle ve ikisini de sınırın altında tut.',
  'Challenge: place the 150 N load so BOTH supports carry 150–200 N': 'Meydan okuma: 150 N yükü öyle yerleştir ki İKİ mesnet de 150–200 N taşısın',
  '★ Perfectly shared load!': '★ Yük kusursuz paylaşıldı!',
  'Beam down — press the challenge button and try again!': 'Kiriş devrildi — meydan okuma düğmesine bas ve tekrar dene!',

  // ── x6-orbit-sandbox ── frame, controls, readouts, legends
  'Orbit Sandbox': 'Yörünge Kum Havuzu',
  'Launch a satellite horizontally from altitude r with speed v. Gravity pulls a = GM/r² toward the planet: too slow crashes, v = √(GM/r) circles, v ≥ √(2GM/r) escapes.':
    'Bir uyduyu r yüksekliğinden v hızıyla yatay fırlat. Yer çekimi a = GM/r² ile gezegene çeker: çok yavaşsa çakılır, v = √(GM/r) döner, v ≥ √(2GM/r) kaçar.',
  'A planet at the centre of a starry sandbox with a launchable satellite: sliders set launch altitude and horizontal speed, a trail shows the trajectory, and the readouts track radius, speed and the circular and escape speeds':
    'Yıldızlı bir kum havuzunun merkezinde bir gezegen ve fırlatılabilir bir uydu: kaydırıcılar fırlatma yüksekliğini ve yatay hızı ayarlar, iz yörüngeyi gösterir, göstergeler yarıçapı, hızı ile dairesel ve kaçış hızlarını izler',
  'Preset orbits': 'Hazır yörüngeler',
  'Fall (v = 2)': 'Düşüş (v = 2)',
  'Sub-orbital (v = 4)': 'Yörünge altı (v = 4)',
  'Circular at 2R (v = 5.6)': '2R’de dairesel (v = 5.6)',
  'Escape (v = 9)': 'Kaçış (v = 9)',
  'Altitude r': 'Yükseklik r',
  'Launch speed v': 'Fırlatma hızı v',
  'Launch': 'Fırlat',
  'Challenge: stable orbit at 2R': 'Meydan okuma: 2R’de kararlı yörünge',
  'Radius r': 'Yarıçap r',
  'Speed v': 'Hız v',
  'Circular speed √(GM/r)': 'Dairesel hız √(GM/r)',
  'Escape speed √(2GM/r)': 'Kaçış hızı √(2GM/r)',
  'planet (R = 1)': 'gezegen (R = 1)',
  'satellite + trail': 'uydu + iz',
  'velocity arrow': 'hız oku',

  // ── x6-orbit-sandbox ── challenge results + canvas banners + status words
  "Goal: hold the orbit inside r = 1.85–2.15 R for 12 s of flight. At r = 2R the circular speed is v = √(GM/r) = √(62.5/2) ≈ 5.6 units/s — the 'Circular at 2R (v = 5.6)' preset sets both sliders, then press Launch.":
    'Hedef: yörüngeyi 12 s uçuş boyunca r = 1.85–2.15 R içinde tut. r = 2R’de dairesel hız v = √(GM/r) = √(62.5/2) ≈ 5.6 units/s — ‘2R’de dairesel (v = 5.6)’ hazır ayarı iki kaydırıcıyı da ayarlar, sonra Fırlat’a bas.',
  "Crashed into the planet! At r = {r} R the circular speed is √(GM/r) ≈ {vc} units/s — slower launches fall in. Try the 'Circular at 2R (v = 5.6)' preset, then Launch.":
    'Gezegene çakıldı! r = {r} R’de dairesel hız √(GM/r) ≈ {vc} units/s — daha yavaş fırlatışlar içine düşer. ‘2R’de dairesel (v = 5.6)’ hazır ayarını dene, sonra Fırlat’a bas.',
  'Escaped into space! Your {v} units/s met or beat the escape speed √(2GM/r) ≈ {ve} — the planet can never reel it back. For a circular orbit you need LESS than that: v = √(GM/r).':
    'Uzaya kaçtı! Senin {v} units/s hızın kaçış hızı √(2GM/r) ≈ {ve}’ye ulaştı ya da onu geçti — gezegen onu bir daha asla geri çekemez. Dairesel yörünge için bundan DAHA AZI gerekir: v = √(GM/r).',
  '★ Stable orbit! r stayed inside 1.85–2.15 R for 12 s. Gravity bent your {v} units/s sideways exactly as fast as you fell — v = √(GM/r) = √(62.5/2) ≈ 5.6 units/s is the circular recipe at 2R.':
    '★ Kararlı yörünge! r, 12 s boyunca 1.85–2.15 R içinde kaldı. Yer çekimi, düşerken {v} units/s hızını tam düşüşün kadar yana büktü — v = √(GM/r) = √(62.5/2) ≈ 5.6 units/s, 2R’deki dairesel formüldür.',
  'Challenge: stable circular orbit at r = 2R — hold for 12 s!': 'Meydan okuma: r = 2R’de kararlı dairesel yörünge — 12 s tut!',
  '★ Circular orbit achieved — challenge complete!': '★ Dairesel yörünge sağlandı — meydan okuma tamamlandı!',
  'Crashed — aim for v ≈ 5.6 at 2R and try again!': 'Çakıldı — 2R’de v ≈ 5.6’ya nişan al ve tekrar dene!',
  'Escaped — that speed never comes back. Try again!': 'Kaçtı — o hız bir daha geri gelmez. Tekrar dene!',
  'stable {t} / 12 s': 'kararlı {t} / 12 s',
  'Predicted: {pred}': 'Tahmin: {pred}',
  'Trajectory: {cls}': 'Yörünge: {cls}',
  'Falls straight in': 'Dümdüz içine düşer',
  'Escape': 'Kaçış',
  'Crash course': 'Çakılma rotası',
  'Circular': 'Dairesel',
  'Ellipse': 'Elips',
  'Escaped': 'Kaçtı',
  'Crashed': 'Çakıldı',
  'Escape (unbound)': 'Kaçış (bağlı değil)',
  'Circular (bound)': 'Dairesel (bağlı)',
  'Ellipse (bound)': 'Elips (bağlı)',
}
