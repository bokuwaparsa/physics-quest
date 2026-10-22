// ─── Physics Quest · Turkish sim terms · slice n (p4-photoelectric, p5-matter-wave, p6-atom-levels, p7-band-gap) ──
// Keys EXACTLY match the user-visible English strings in src/components/sims/n/.
// {placeholders} mark interpolated values; missing keys fall back to English.
export const termsTrN: Record<string, string> = {
  // ── p4-photoelectric-lab ── frame, controls, readouts, legends, buttons
  'Photoelectric Lab': 'Fotoelektrik Laboratuvarı',
  'A lamp fires photons of wavelength λ at a metal. Each photon alone must pay the work function φ: KE_max = 1240/λ − φ (eV). Brightness only changes how many photons arrive.':
    'Bir lamba, λ dalga boyunda fotonları bir metale ateşler. Her foton tek başına çıkış işlevi φ’yi ödemelidir: KE_max = 1240/λ − φ (eV). Parlaklık yalnızca kaç foton geldiğini değiştirir.',
  'A lamp sending coloured photon arrows toward a metal plate; ejected electron dots fly off with speed set by their kinetic energy, and a below-threshold notice appears when the photon energy is too low':
    'Metal bir levhaya doğru renkli foton okları gönderen lamba; fırlayan elektron noktaları kinetik enerjilerinin belirlediği hızla uçar ve foton enerjisi çok düşükken eşik altı uyarısı belirir',
  'Wavelength λ': 'Dalga boyu λ',
  'Intensity': 'Şiddet',
  'Metal': 'Metal',
  'Caesium · φ = 2.1 eV': 'Sezyum · φ = 2.1 eV',
  'Sodium · φ = 2.3 eV': 'Sodyum · φ = 2.3 eV',
  'Zinc · φ = 4.3 eV': 'Çinko · φ = 4.3 eV',
  'Platinum · φ = 6.4 eV': 'Platin · φ = 6.4 eV',
  'Caesium': 'Sezyum',
  'Sodium': 'Sodyum',
  'Zinc': 'Çinko',
  'Platinum': 'Platin',
  'Challenge: Zn electrons at 0.5–1 eV': 'Meydan okuma: 0.5–1 eV’de Zn elektronları',
  'E photon': 'Foton enerjisi',
  'Work fn φ': 'Çıkış işlevi φ',
  'KE max': 'Maksimum KE',
  'Photocurrent': 'Fotoakım',
  'photon · {lam} nm': 'foton · {lam} nm',
  'ejected electron': 'fırlayan elektron',

  // ── p4-photoelectric-lab ── result templates + canvas banners + canvas labels
  'Zinc: KE = 1240/{l} − 4.3 = {ke} eV — inside the 0.5–1.0 eV band! Any λ from {lo} to {hi} nm does it. One rich photon pays the 4.3 eV fee and hands the electron the change.':
    'Çinko: KE = 1240/{l} − 4.3 = {ke} eV — 0.5–1.0 eV bandının içinde! {lo} ile {hi} nm arasındaki her λ işi yapar. Zengin bir foton 4.3 eV’lik ücreti öder ve üstünü elektrona bırakır.',
  'You used {metal} — the challenge is to eject electrons from zinc (φ = 4.3 eV). Switch the metal, then find λ where 1240/λ − 4.3 lands between 0.5 and 1.0 eV.':
    '{metal} kullandın — meydan okuma, çinkodan elektron fırlatmak (φ = 4.3 eV). Metali değiştir, sonra 1240/λ − 4.3’ün 0.5 ile 1.0 eV arasına düştüğü λ’yi bul.',
  'KE = 1240/{l} − 4.3 = {ke} eV — below zero, so nothing is ejected. Shorten the wavelength (richer photons) to get into the 0.5–1.0 eV band.':
    'KE = 1240/{l} − 4.3 = {ke} eV — sıfırın altında, hiçbir şey fırlamıyor. Dalga boyunu kısalt (daha zengin fotonlar) ve 0.5–1.0 eV bandına gir.',
  'KE = 1240/{l} − 4.3 = {ke} eV — ejected, but outside the 0.5–1.0 eV band. Nudge λ between {lo} and {hi} nm.':
    'KE = 1240/{l} − 4.3 = {ke} eV — fırladı ama 0.5–1.0 eV bandının dışında. λ’yi {lo} ile {hi} nm arasında gezdir.',
  '{lam} nm (UV)': '{lam} nm (morötesi)',
  '{lam} nm (IR)': '{lam} nm (kızılötesi)',
  'electrons out →': 'elektronlar dışarı →',
  'below threshold — no electrons': 'eşik altında — elektron yok',
  'KE_max = 1240/{λ} − {φ} = {ke} eV · electron speed ∝ √KE':
    'KE_max = 1240/{λ} − {φ} = {ke} eV · elektron hızı ∝ √KE',
  'Challenge: eject electrons from ZINC with KE between 0.5 and 1.0 eV!':
    'Meydan okuma: ÇİNKO’dan KE’si 0.5 ile 1.0 eV arasında olan elektronlar fırlat!',
  '★ Challenge complete!': '★ Meydan okuma tamamlandı!',
  'Not in the band yet — tune λ (or the metal)!': 'Henüz bantta değil — λ’yi (ya da metali) ayarla!',

  // ── p5-matter-wave-slit ── frame, controls, readouts, legends, buttons
  'Matter-Wave Double Slit': 'Madde-Dalgası Çift Yarığı',
  'Fire particles one at a time at a double slit. Each lands as a single dot — yet the dots accumulate into interference fringes with spacing Δy = λL/d. Flip the which-path detector and the fringes die.':
    'Parçacıkları tek tek çift yarığa ateşle. Her biri tek bir nokta olarak düşer — ama noktalar Δy = λL/d aralıklı girişim saçaklarında birikir. Hangi yol dedektörünü açarsan saçaklar ölür.',
  'A particle gun fires single particles at a double slit; dots accumulate on a detector screen into an interference histogram, and a which-path detector toggle collapses the pattern into two clumps':
    'Bir parçacık tabancası tek tek parçacıkları çift yarığa ateşler; noktalar dedektör ekranında bir girişim histogramında birikir ve hangi yol dedektörü anahtarı örüntüyü iki yığına çöker',
  'particle dot': 'parçacık noktası',
  'accumulated hits': 'biriken isabetler',
  'wave prediction': 'dalga öngörüsü',
  'Particle': 'Parçacık',
  'Electron': 'Elektron',
  'Neutron': 'Nötron',
  'Fullerene C₆₀': 'Fuleren C₆₀',
  'Speed': 'Hız',
  'Which-path detector': 'Hangi yol dedektörü',
  'Auto fire': 'Otomatik atış',
  'Fire 5': '5 atış',
  'Challenge: collect 80 dots': 'Meydan okuma: 80 nokta topla',
  'de Broglie λ': 'de Broglie λ',
  'Fringe Δy': 'Saçak Δy',
  'Landed': 'Düşen',

  // ── p5-matter-wave-slit ── notes, results + canvas banners + canvas labels
  'Which-path detector ON: knowing which slit each particle used destroys the superposition — new dots pile into two plain clumps. Observation collapses the interference.':
    'Hangi yol dedektörü AÇIK: her parçacığın hangi yarıktan geçtiğini bilmek süperpozisyonu yok eder — yeni noktalar iki düz yığına doldurur. Gözlem girişimi çöker.',
  'Which-path detector OFF: each particle explores both slits again, so fringes resume building.':
    'Hangi yol dedektörü KAPALI: her parçacık yeniden iki yarığı da keşfeder, saçaklar kurulmaya devam eder.',
  '80 dots and counting — the fringes are unmistakable. Each particle landed at ONE spot, yet the crowd of landings obeys the wave\'s probability map. That is wave–particle duality in one picture.':
    '80 nokta ve artmaya devam — saçaklar tartışmasız. Her parçacık TEK bir noktaya düştü; yine de düşüş kalabalığı dalganın olasılık haritasına uyar. Dalga–parçacık ikiliği tek bir resimde.',
  'Auto-fire is paused under reduced motion — press Fire 5 to launch particles yourself.':
    'Azaltılmış hareket altında otomatik atış duraklatıldı — parçacıkları kendin fırlatmak için 5 atış’a bas.',
  '1 {p} at a time': 'her seferinde 1 {p}',
  'double slit': 'çift yarık',
  'which-path ON': 'hangi yol AÇIK',
  'detector screen': 'dedektör ekranı',
  'λ = h/(mv) = {λ} pm · on-screen spacing exaggerated; true Δy = λL/d in the readout':
    'λ = h/(mv) = {λ} pm · ekrandaki aralık abartılı; gerçek Δy = λL/d okumada',
  'ℏ/2 = {h} J·s — the trade nature never breaks': 'ℏ/2 = {h} J·s — doğanın hiç bozmadığı takas',
  'Challenge: let 80 particles land — watch the pattern emerge! ({n}/80)':
    'Meydan okuma: 80 parçacığın düşmesine izin ver — örüntünün belirişini izle! ({n}/80)',
  'Something went sideways — reset and refire!': 'Bir şey ters gitti — sıfırla ve yeniden ateşle!',

  // ── p6-atom-levels ── frame, controls, readouts, legends, buttons
  'Atomic Levels & Spectra': 'Atomik Düzeyler ve Tayflar',
  'Hydrogen\'s ladder, drawn to scale: E_n = −13.6/n² eV. Pick a drop (emission) or a climb (absorption) and watch the photon carry exactly the gap energy, λ = 1240/ΔE.':
    'Hidrojenin merdiveni, ölçekli: E_n = −13.6/n² eV. Bir düşüş (yayılma) ya da tırmanış (soğurma) seç ve fotonun tam boşluk enerjisini taşıdığını izle: λ = 1240/ΔE.',
  'Hydrogen energy-level ladder from n=1 to n=6 drawn to scale, with an electron dot that drops between levels while a coloured photon squiggle flies out, or absorbs one while climbing':
    'n=1’den n=6’ya ölçekli hidrojen enerji düzeyi merdiveni; düzeyler arasında düşen elektron noktası ve dışarı uçan renkli foton kıvrımı, tırmanırken bir fotonu soğurur',
  'electron': 'elektron',
  'active levels': 'etkin düzeyler',
  'photon (UV/IR shown grey)': 'foton (morötesi/kızılötesi gri gösterilir)',
  'From level n': 'n düzeyinden',
  'To level n': 'n düzeyine',
  'n = 1': 'n = 1',
  'n = 2': 'n = 2',
  'n = 3': 'n = 3',
  'n = 4': 'n = 4',
  'n = 5': 'n = 5',
  'n = 6': 'n = 6',
  'Challenge: make the 656 nm line': 'Meydan okuma: 656 nm çizgisini üret',
  'ΔE photon': 'Foton ΔE',
  'Wavelength': 'Dalga boyu',
  'Series': 'Seri',
  'Type': 'Tür',

  // ── p6-atom-levels ── result templates + canvas banners + canvas labels
  'Same level — no jump, no photon. Choose two different rungs (e.g. from n = 3 down to n = 2).':
    'Aynı düzey — atlama yok, foton yok. İki farklı basamak seç (örneğin n = 3’ten n = 2’ye iniş).',
  'Dropping to n = 2 releases ΔE = {de} eV → λ = 1240/{de} ≈ 656 nm — the red H-alpha Balmer line, the colour of glowing nebulae!':
    'n = 2’ye düşüş ΔE = {de} eV açığa çıkarır → λ = 1240/{de} ≈ 656 nm — kırmızı H-alfa Balmer çizgisi, parlayan bulutsuların rengi!',
  'That\'s an absorption (the electron climbs UP). Emission means falling DOWN to a lower rung — try setting "to" below "from" so ΔE pays out as light.':
    'Bu bir soğurma (elektron YUKARI tırmanıyor). Yayılma, ALT bir basamağa düşmek demektir — ΔE ışık olarak ödensin diye hedef düzeyi başlangıçtan aşağıya ayarla.',
  'λ = 1240/{de} ≈ {lam} nm — a real hydrogen line, but not the red 656 nm one. The Balmer lines end on n = 2; which drop into n = 2 gives ~656 nm?':
    'λ = 1240/{de} ≈ {lam} nm — gerçek bir hidrojen çizgisi ama kırmızı 656 nm olan değil. Balmer çizgileri n = 2’de biter; n = 2’ye hangi düşüş ~656 nm verir?',
  'E = 0 — electron free (ionization at 13.6 eV above ground)': 'E = 0 — elektron serbest (temel durumun 13.6 eV üstünde iyonlaşma)',
  'emission': 'yayılma',
  'absorption': 'soğurma',
  'none': 'yok',
  'ΔE = |E_{to} − E_{from}| = {de} eV · λ = 1240/ΔE = {lam} nm · levels to scale':
    'ΔE = |E_{to} − E_{from}| = {de} eV · λ = 1240/ΔE = {lam} nm · düzeyler ölçekli',
  'Challenge: emit the red 656 nm Balmer line — pick the right drop!':
    'Meydan okuma: kırmızı 656 nm Balmer çizgisini yay — doğru düşüşü seç!',
  'Not the red Balmer line yet — try another drop!': 'Henüz kırmızı Balmer çizgisi değil — başka bir düşüş dene!',

  // ── p7-band-gap-lab ── frame, controls, readouts, legends, buttons
  'Band Gap Lab': 'Bant Aralığı Laboratuvarı',
  'Electrons must climb the band gap Eg to conduct. Metals have no gap, insulators a wall, semiconductors a stepladder that heat helps to climb: n ∝ e^(−Eg/2kT). LEDs pay the gap back as light, λ = 1240/Eg.':
    'İletmek için elektronların bant aralığı Eg’yi tırmanması gerekir. Metallerde boşluk yok, yalıtkanlarda duvar var, yarı iletkende ısının tırmanmaya yardım ettiği bir merdiven: n ∝ e^(−Eg/2kT). LED’ler boşluğu ışık olarak geri öder: λ = 1240/Eg.',
  'Energy band diagram with a conduction band on top and a valence band below, separated by a gap whose height depends on the chosen material; thermal electrons jump the gap, holes appear in the valence band, and LED materials glow at their emission wavelength':
    'Üstte iletim bandı, altta valans bandı olan ve aralarında seçilen malzemeye göre değişen bir boşluk bulunan enerji bandı şeması; ısıl elektronlar boşluğu atlar, valans bandında delikler belirir ve LED malzemeleri yayım dalga boyunda parlar',
  'conduction electron': 'iletim elektronu',
  'valence electron': 'valans elektron',
  'hole': 'delik',
  'Material': 'Malzeme',
  'Copper · conductor': 'Bakır · iletken',
  'Diamond · 5.5 eV': 'Elmas · 5.5 eV',
  'Silicon · 1.1 eV': 'Silisyum · 1.1 eV',
  'Germanium · 0.67 eV': 'Germanyum · 0.67 eV',
  'LED red (GaAs) · 1.9 eV': 'Kırmızı LED (GaAs) · 1.9 eV',
  'LED blue (GaN) · 2.7 eV': 'Mavi LED (GaN) · 2.7 eV',
  'Temperature': 'Sıcaklık',
  'Challenge: find & heat the semiconductor': 'Meydan okuma: yarı iletkeni bul ve ısıt',
  'Band gap Eg': 'Bant aralığı Eg',
  'Class': 'Sınıf',
  'Excited electrons': 'Uyarılmış elektronlar',
  'LED λ = 1240/Eg': 'LED λ = 1240/Eg',

  // ── p7-band-gap-lab ── result templates + canvas banners + canvas labels
  'Copper conducts at ANY temperature — its bands overlap, so there is nothing to demonstrate. The challenge wants a semiconductor: silicon or germanium, warmed until at least 5 electrons jump the gap.':
    'Bakır HER sıcaklıkta iletir — bantları üst üste biner, gösterilecek bir şey yok. Meydan okuma bir yarı iletken ister: silisyum ya da germanyum; en az 5 elektron boşluğu atlayana dek ısıt.',
  '{metal}: n ∝ e^(−Eg/2kT) = e^(−{eg}/(2×8.617e-5×{T})) → model count {n} ≥ 5. A small gap plus a little heat frees carriers — warm semiconductors conduct better, the exact opposite of metals!':
    '{metal}: n ∝ e^(−Eg/2kT) = e^(−{eg}/(2×8.617e-5×{T})) → model sayısı {n} ≥ 5. Küçük bir boşluk artı biraz ısı, taşıyıcıları serbest bırakır — sıcak yarı iletkenler daha iyi iletir, metalin tam tersi!',
  'Diamond\'s 5.5 eV gap is a wall: even at {T} K the model count is 0. Diamond is an insulator — pick silicon (1.1 eV) or germanium (0.67 eV) and heat them up.':
    'Elmasın 5.5 eV’lik boşluğu bir duvar: {T} K’de bile model sayısı 0. Elmas bir yalıtkandır — silisyumu (1.1 eV) ya da germanyumu (0.67 eV) seç ve onları ısıt.',
  '{metal} at {T} K: only {n} excited electrons — not the ≥ 5 you need. Turn up the temperature (or pick the smaller-gap semiconductor, germanium).':
    '{metal}, {T} K’de: yalnızca {n} uyarılmış elektron — gereksinim duyduğun ≥ 5 değil. Sıcaklığı artır (ya da daha dar bant aralıklı yarı iletkeni, germanyumu seç).',
  'valence & conduction bands OVERLAP — no gap': 'valans ve iletim bantları ÜST ÜSTE — boşluk yok',
  'electron sea → conducts at any temperature': 'elektron denizi → her sıcaklıkta iletir',
  'conduction band (mobile electrons)': 'iletim bandı (hareketli elektronlar)',
  'valence band (bonding electrons)': 'valans bandı (bağ elektronları)',
  'n ∝ e^(−Eg/2kT) · hotter ⇒ more climbers (semiconductors only) · model exaggerated ~10¹⁶× for visibility':
    'n ∝ e^(−Eg/2kT) · daha sıcak ⇒ daha çok tırmanan (yalnızca yarı iletkenler) · model görünürlük için ~10¹⁶× abartılı',
  'Challenge: pick the semiconductor whose conduction sits between metal & insulator — heat it to ≥ 5 excited electrons!':
    'Meydan okuma: iletimi metal ile yalıtkan arasında olan yarı iletkeni seç — ≥ 5 uyarılmış elektrona dek ısıt!',
  'Not there yet — adjust material or temperature!': 'Henüz olmadı — malzemeyi ya da sıcaklığı ayarla!',

  // shared
  'Reset': 'Sıfırla',
}
