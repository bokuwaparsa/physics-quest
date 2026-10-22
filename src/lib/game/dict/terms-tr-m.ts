// ─── Physics Quest · Turkish sim terms · slice m (o5-em-spectrum, o6-double-slit, o7-single-slit) ──
// Keys EXACTLY match the user-visible English strings in src/components/sims/m/.
// {placeholders} mark interpolated values; missing keys fall back to English.
export const termsTrM: Record<string, string> = {
  // ── o5-em-spectrum ── frame, controls, readouts, buttons
  'EM Spectrum Explorer': 'EM Tayf Gezgini',
  'Slide across 15 decades of wavelength: each band lights up with its use, its danger, its frequency f = c/λ and its photon energy E = hf.':
    '15 onluk dalga boyu aralığında kaydır: her bant kullanımı, tehlikesi, f = c/λ frekansı ve E = hf foton enerjisiyle aydınlanır.',
  'A logarithmic electromagnetic-spectrum strip from gamma rays to radio waves with a movable wavelength marker, band information and an optional oscillating E/B wave':
    'Gama ışınlarından radyo dalgalarına logaritmik elektromanyetik tayf şeridi; hareketli dalga boyu imleci, bant bilgisi ve isteğe bağlı salınan E/B dalgası',
  'Wavelength': 'Dalga boyu',
  'Show wave': 'Dalgayı göster',
  'Band': 'Bant',
  'Frequency f = c/λ': 'Frekans f = c/λ',
  'Photon E = hf': 'Foton enerjisi E = hf',
  'Challenge: find visible light': 'Meydan okuma: görünür ışığı bul',

  // ── o5-em-spectrum ── result templates
  'Aim at the rainbow band on the strip — it sits between UV (400 nm) and IR (700 nm).':
    'Şeritteki gökkuşağı bandına nişan al — morötesi (400 nm) ile kızılötesi (700 nm) arasında durur.',
  'λ = {v} {u} — inside 400–700 nm: visible light! Your eyes are tuned to a razor-thin slice of the spectrum.':
    'λ = {v} {u} — 400–700 nm içinde: görünür ışık! Gözlerin tayfın jilet gibi ince bir dilimine ayarlı.',

  // ── o5-em-spectrum ── band info panel (canvas)
  'Gamma rays': 'Gama ışınları',
  'X-rays': 'X ışınları',
  'Ultraviolet': 'Morötesi',
  'Visible light': 'Görünür ışık',
  'Infrared': 'Kızılötesi',
  'Microwaves': 'Mikrodalgalar',
  'Radio waves': 'Radyo dalgaları',
  'gamma': 'gama',
  'X-ray': 'X ışını',
  'UV': 'morötesi',
  'visible': 'görünür',
  'IR': 'kızılötesi',
  'microwave': 'mikrodalga',
  'radio': 'radyo',
  'Use: {use}': 'Kullanım: {use}',
  'Danger: {danger}': 'Tehlike: {danger}',
  'Cancer therapy · sterilising': 'Kanser tedavisi · sterilizasyon',
  'Medical imaging · security': 'Tıbbi görüntüleme · güvenlik',
  'Sterilising · tanning': 'Sterilizasyon · bronzlaşma',
  'Sight · lasers · fibre optics': 'Görme · lazerler · fiber optik',
  'Remotes · thermal cameras': 'Kumandalar · termal kameralar',
  'Ovens · radar · Wi-Fi': 'Fırınlar · radar · Wi-Fi',
  'Broadcasting · MRI · astronomy': 'Yayıncılık · MR · astronomi',
  'Ionising — deadly': 'İyonlaştırıcı — öldürücü',
  'Ionising — cancer risk': 'İyonlaştırıcı — kanser riski',
  'Sunburn · skin cancer': 'Güneş yanığı · cilt kanseri',
  'Bright beams hurt eyes': 'Parlak hüzünler göze zarar verir',
  'Strong beams burn skin': 'Güçlü hüzünler cildi yakar',
  'Cooks tissue at high power': 'Yüksek güçte dokuyu pişirir',
  'Very strong fields heat': 'Çok güçlü alanlar ısıtır',

  // ── o5-em-spectrum ── canvas banners + canvas labels
  '▬ atmospheric windows (radio + visible)': '▬ atmosfer pencereleri (radyo + görünür)',
  'visible 400–700 nm': 'görünür 400–700 nm',
  "Toggle 'Show wave' to see the oscillating": 'Salınan elektrik (E) ve manyetik (B)',
  'electric (E) and magnetic (B) fields': 'alanları görmek için “Dalgayı göster”i aç',
  'schematic — not to scale': 'şematik — ölçeksiz',
  'schematic — not to scale · static (reduced motion)': 'şematik — ölçeksiz · durağan (azaltılmış hareket)',
  'Challenge: land the marker inside the rainbow — 400–700 nm!': 'Meydan okuma: imleci gökkuşağının içine indir — 400–700 nm!',
  '★ Challenge complete — you found visible light!': '★ Meydan okuma tamamlandı — görünür ışığı buldun!',

  // ── o6-double-slit ── frame, controls, readouts, buttons
  'Double-Slit Interference': 'Çift Yarık Girişimi',
  'Two coherent slits ripple outward and overlap on the screen: bright where the paths differ by whole wavelengths, dark in between. Δy = λL/d.':
    'İki tutarlı yarık halka halka yayılır ve ekranda üst üste biner: yol farkı tam dalga boyu katı olan yerler parlak, aralar karanlıktır. Δy = λL/d.',
  'Two slits emitting circular wavefronts toward a screen showing the cos-squared interference pattern with bright and dark fringes':
    'Kosinüs-kare girişim örüntüsü gösteren bir ekrana dairesel dalga cepheleri gönderen iki yarık; parlak ve karanlık saçaklarla',
  'Slit separation': 'Yarık aralığı',
  'Screen distance': 'Ekran uzaklığı',
  'Fringe spacing Δy = λL/d': 'Saçak aralığı Δy = λL/d',
  'Bright fringes on screen': 'Ekrandaki parlak saçaklar',
  'First order at sinθ = λ/d': 'sinθ = λ/d’deki birinci derece',
  'Challenge: Δy = 8.0 mm': 'Meydan okuma: Δy = 8.0 mm',

  // ── o6-double-slit ── result templates + canvas banners + canvas labels
  'Δy = λL/d = {dy} mm — within 2% of 8.0 mm! Sharper colours and a wider slit would each shrink it; more distance stretches it.':
    'Δy = λL/d = {dy} mm — 8.0 mm’nin %2’si içinde! Daha saf renk ya da daha geniş yarık her biri onu küçültür; daha çok uzaklık uzatır.',
  'Δy = {dy} mm — target is 8.0 ± 0.16 mm. Remember Δy = λL/d: λ and L stretch the fringes, d squeezes them.':
    'Δy = {dy} mm — hedef 8.0 ± 0.16 mm. Δy = λL/d’yi unutma: λ ve L saçakları uzatır, d sıkıştırır.',
  'Challenge: tune λ, d and L until Δy = 8.0 mm (±2%)': 'Meydan okuma: Δy = 8.0 mm olana dek λ, d ve L’yi ayarla (±2%)',
  '★ Challenge complete — Δy = 8.0 mm!': '★ Meydan okuma tamamlandı — Δy = 8.0 mm!',
  'screen': 'ekran',

  // ── o7-single-slit ── frame, controls, readouts, buttons
  'Diffraction: Single Slit & Gratings': 'Kırınım: Tek Yarık ve Ağlar',
  'Squeeze light through a slit and it fans out (minima at a·sinθ = mλ). Swap in a grating and the same angles turn into razor-sharp orders d·sinθ = mλ.':
    'Işığı bir yarıktan sıkıştırıp geçirirsen yelpaze gibi açılır (minimumlar a·sinθ = mλ’da). Bir ağ takarsan aynı açılar d·sinθ = mλ’lı jilet gibi keskin derecelere dönüşür.',
  'Plane waves hitting a single slit or a diffraction grating, with the resulting sinc or sharp-order intensity pattern drawn on a screen at the right':
    'Tek yarığa ya da kırınım ağına çarpan düzlem dalgalar; sağdaki ekranda bunun sonucu olan sinc ya da keskin dereceli şiddet örüntüsü',
  'Slit width': 'Yarık genişliği',
  'Aperture': 'Açıklık',
  'Single slit': 'Tek yarık',
  'Grating 600 lines/mm': 'Ağ 600 çizgi/mm',
  'Grating 1200 lines/mm': 'Ağ 1200 çizgi/mm',
  'First min / order θ₁': 'İlk minimum / derece θ₁',
  'Highest order m': 'En yüksek derece m',
  'Orders on screen': 'Ekrandaki dereceler',
  'Central spread 2θ₁': 'Merkezî yayılım 2θ₁',
  'First minimum sinθ = λ/a': 'İlk minimum sinθ = λ/a',
  'Challenge: split 450 & 650 nm': 'Meydan okuma: 450 ve 650 nm’yi ayır',

  // ── o7-single-slit ── result templates + canvas banners + canvas labels
  'θ₄₅₀ = {t450}°, θ₆₅₀ = {t650}° → {sep}° apart — the first orders are clearly separated. Finer gratings spread colours further!':
    'θ₄₅₀ = {t450}°, θ₆₅₀ = {t650}° → {sep}° ayrı — birinci dereceler net ayrıştı. Daha sıkı ağlar renkleri daha çok yayar!',
  'θ₄₅₀ = {t450}°, θ₆₅₀ = {t650}° → only {sep}° apart. You need ≥ 8°: a grating with more lines per mm (smaller d) bends the orders further out.':
    'θ₄₅₀ = {t450}°, θ₆₅₀ = {t650}° → yalnızca {sep}° ayrı. ≥ 8° gerekiyor: mm başına daha çok çizgili (daha küçük d) bir ağ dereceleri daha dışarı taşır.',
  'Challenge: separate the first orders of 450 & 650 nm by ≥ 8°': 'Meydan okuma: 450 ve 650 nm’nin birinci derecelerini ≥ 8° ayır',
  '★ Challenge complete — orders separated by ≥ 8°!': '★ Meydan okuma tamamlandı — dereceler ≥ 8° ayrıldı!',
  '{n} lines/mm · d = {d} μm': '{n} çizgi/mm · d = {d} μm',

  // shared
  'Reset': 'Sıfırla',
}
