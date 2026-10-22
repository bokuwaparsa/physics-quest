// ─── Physics Quest · Turkish sim terms · slice o (p8-nucleus-lab, p9-chain-reaction, p10-quark-builder) ──
// Keys EXACTLY match the user-visible English strings in src/components/sims/o/.
// {placeholders} mark interpolated values; missing keys fall back to English.
export const termsTrO: Record<string, string> = {
  // ── p8-nucleus-lab ── frame, controls, readouts, buttons
  'Nucleus Lab': 'Çekirdek Laboratuvarı',
  'Dial in protons Z and neutrons N, see if the nucleus sits in the valley of stability, then fire α or β⁻ decays to fix it.':
    'Z protonu ve N nötronu ayarla, çekirdeğin kararlılık vadisinde oturup oturmadığına bak, sonra düzeltmek için α ya da β⁻ bozunumu ateşle.',
  'A ball of amber protons and teal neutrons with a valley-of-stability chart showing whether the chosen isotope is stable':
    'Kehribar protonlar ve camgöbeği nötronlardan oluşan bir top; seçilen izotopun kararlı olup olmadığını gösteren kararlılık vadisi grafiği',
  'Protons Z': 'Protonlar Z',
  'Neutrons N': 'Nötronlar N',
  'Fire α': 'α ateşle',
  'Fire β⁻': 'β⁻ ateşle',
  'Challenge: tame F-20': 'Meydan okuma: F-20’yi ehlileştir',
  'Nucleus': 'Çekirdek',
  'Mass number A': 'Kütle numarası A',
  'Verdict': 'Hüküm',
  'Suggested fix': 'Önerilen çözüm',
  'Decays used': 'Kullanılan bozunum',

  // ── p8-nucleus-lab ── result messages + canvas banners + canvas labels
  '★ {iso} (Z={z}, N={n}) is stable and A stayed 20 — one β⁻ (neutron → proton) fixed the neutron-rich nucleus!':
    '★ {iso} (Z={z}, N={n}) kararlı ve A 20 kaldı — tek bir β⁻ (nötron → proton) nötronca zengin çekirdeği düzeltti!',
  '{iso} may be stable, but α changed A ({a} ≠ 20) — α is the wrong tool here. Reset the challenge to retry!':
    '{iso} kararlı olabilir ama α, A’yı değiştirdi ({a} ≠ 20) — α burada yanlış alet. Yeniden denemek için meydan okumayı sıfırla!',
  'Two decays used and still unstable. The winning move is a single β⁻ (n → p). Reset to retry!':
    'İki bozunum kullanıldı ve hâlâ kararsız. Kazanan hamle tek bir β⁻ (n → p). Yeniden denemek için sıfırla!',
  '{iso} (Z={z}, N={n}). One decay left — and A must stay 20.':
    '{iso} (Z={z}, N={n}). Bir bozunum kaldı — ve A 20 kalmalı.',
  'Too light for α decay — α particles (He-4) only escape from heavy nuclei.':
    'α bozunumu için fazla hafif — α parçacıkları (He-4) yalnızca ağır çekirdeklerden kaçar.',
  'No neutrons left to convert — β⁻ decay needs a neutron (n → p).':
    'Dönüştürecek nötron kalmadı — β⁻ bozunumu bir nötron ister (n → p).',
  'That leaves the lab bench (Z > 30 not modelled here).': 'Bu, laboratuvar tezgâhının dışına çıkar (Z > 30 burada modellenmedi).',
  'F-20 (Z=9, N=11) is neutron-rich and unstable. Make it stable with at most 2 decays — and keep A = 20. (α changes A; β⁻ does not!)':
    'F-20 (Z=9, N=11) nötronca zengin ve kararsız. En fazla 2 bozunumla kararlı hâle getir — ve A = 20 koru. (α, A’yı değiştirir; β⁻ değiştirmez!)',
  'STABLE ✓': 'KARARLI ✓',
  'UNSTABLE ✗': 'KARARSIZ ✗',
  'proton': 'proton',
  'neutron': 'nötron',
  'Be-8 cannot hold: it instantly splits into two α particles!': 'Be-8 tutunamaz: anında iki α parçacığına bölünür!',
  'Too many neutrons → β⁻ decay (n → p) suggested': 'Nötron çok → β⁻ bozunumu (n → p) önerilir',
  'Too few neutrons → β⁺ / electron capture (p → n) suggested': 'Nötron az → β⁺ / elektron yakalanması (p → n) önerilir',
  'Inside the valley of stability — nothing to fix': 'Kararlılık vadisinin içinde — düzeltilecek bir şey yok',
  'valley of stability': 'kararlılık vadisi',
  'Challenge: turn F-20 stable in ≤ 2 decays, keeping A = 20': 'Meydan okuma: F-20’yi ≤ 2 bozunumla kararlı hâle getir, A = 20 koruyarak',
  'decays used: {n}': 'kullanılan bozunum: {n}',
  '★ Challenge complete — Ne-20 stable!': '★ Meydan okuma tamamlandı — Ne-20 kararlı!',
  'Out of decays — the nucleus is still not right. Retry!': 'Bozunumlar bitti — çekirdek hâlâ doğru değil. Yeniden dene!',

  // ── p9-chain-reaction ── frame, controls, readouts, buttons
  'Chain Reaction Lab': 'Zincirleme Tepkime Laboratuvarı',
  'Split one U-235 nucleus and watch neutrons cascade through the lattice. Control rods (boron) absorb neutrons — tune them for steady power.':
    'Bir U-235 çekirdeğini böl ve nötronların kafes içinde nasıl çığ gibi büyüdüğünü izle. Kontrol çubukları (bor) nötronları soğurur — kararlı güç için onları ayarla.',
  'A ten by seven lattice of uranium-235 nuclei; firing one starts a fission cascade of teal neutrons that control rods can absorb':
    'Ona yedi düzenli uranyum-235 çekirdek kafesi; birini ateşlemek, kontrol çubuklarının soğurabileceği camgöbeği nötronların bir bölünme çığını başlatır',
  'Control rods (boron)': 'Kontrol çubukları (bor)',
  'Rods in core': 'Çekirdekteki çubuk',
  'Fire neutron': 'Nötron ateşle',
  'Challenge: steady power': 'Meydan okuma: kararlı güç',
  'Total fissions': 'Toplam bölünme',
  'Energy released': 'Açığa çıkan enerji',
  'Neutrons absorbed': 'Soğurulan nötronlar',
  'Neutrons escaped': 'Kaçan nötronlar',
  'Chain': 'Zincir',

  // ── p9-chain-reaction ── result messages + canvas banners + canvas labels
  '★ {n} fissions (≈ {mev} MeV) — steady power! The rods kept about one neutron per fission on duty.':
    '★ {n} bölünme (≈ {mev} MeV) — kararlı güç! Çubuklar bölünme başına yaklaşık bir nötronu iş başında tuttu.',
  '{n} fissions — the chain ran away (supercritical). Each fission freed more than one useful neutron: pull in more rod and retry.':
    '{n} bölünme — zincir kaçı (süperkritik). Her bölünme birden fazla yararlı nötron serbest bıraktı: daha çok çubuk sok ve yeniden dene.',
  'Only {n} fissions — the chain died out (subcritical): too many neutrons absorbed or escaped. Try fewer rods and retry.':
    'Yalnızca {n} bölünme — zincir söndü (altkritik): çok nötron soğuruldu ya da kaçtı. Daha az çubuk dene ve yeniden dene.',
  'Keep steady power: land 12–20 total fissions across 3 generations. Tune the rods, then Fire — under 12 the chain dies, over 20 it runs away.':
    'Kararlı gücü koru: 3 nesil boyunca toplam 12–20 bölünmeye ulaş. Çubukları ayarla, sonra Ateşle — 12 altında zincir ölür, 20 üstünde kaçar.',
  'U-235 lattice · click a nucleus or press Fire': 'U-235 kafesi · bir çekirdeğe tıkla ya da Ateşle’ye bas',
  'gen {g} · g0:{g0} g1:{g1} g2:{g2} g3:{g3}': 'nesil {g} · g0:{g0} g1:{g1} g2:{g2} g3:{g3}',
  'fissions / generation': 'bölünme / nesil',
  'absorbed {n}': 'soğurulan {n}',
  'escaped  {n}': 'kaçan  {n}',
  'absorbed {a} · escaped {e} · {mev} MeV': 'soğurulan {a} · kaçan {e} · {mev} MeV',
  'Challenge: steady power — 12 to 20 total fissions after 3 generations': 'Meydan okuma: kararlı güç — 3 nesil sonra toplam 12–20 bölünme',
  '★ Steady power achieved!': '★ Kararlı güç sağlandı!',
  'Not steady — read the message below and retry!': 'Kararlı değil — aşağıdaki mesajı oku ve yeniden dene!',
  'chain ended · {n} fissions · {mev} MeV': 'zincir bitti · {n} bölünme · {mev} MeV',

  // ── p10-quark-builder ── frame, controls, readouts, buttons
  'Quark Builder': 'Kuark Oluşturucu',
  'Pick quarks from the palette and check the charge ledger: proton uud (+1), neutron udd (0), π⁺ u d̄ (+1) — combos must sum to whole charges.':
    'Kuarkları paletten seç ve yük defterini kontrol et: proton uud (+1), nötron udd (0), π⁺ u d̄ (+1) — kombinasyonlar tam yüklere ulaşmalı.',
  'A quark composer: chosen quarks appear inside a dashed outline with a running charge ledger on the right':
    'Bir kuark bestecisi: seçilen kuarklar kesik çizgili konturun içinde, sağda sürekli güncellenen yük defteriyle görünür',
  'Hadron mode': 'Hadron kipi',
  'Baryon · 3 quarks': 'Baryon · 3 kuark',
  'Meson · quark + antiquark': 'Mezon · kuark + antikuark',
  'u (+2/3)': 'u (+2/3)',
  'd (−1/3)': 'd (−1/3)',
  'anti-u (−2/3)': 'anti-u (−2/3)',
  'anti-d (+1/3)': 'anti-d (+1/3)',
  'Challenge: neutron then π⁺': 'Meydan okuma: önce nötron sonra π⁺',
  'Total charge': 'Toplam yük',
  'Detected hadron': 'Saptanan hadron',
  'Mass hint': 'Kütle ipucu',
  'Quarks': 'Kuarklar',

  // ── p10-quark-builder ── result messages + canvas banners + canvas labels
  '★ Step 1 done — neutron (udd, charge 0) built! Step 2: switch to Meson mode and build π⁺ (u + anti-d).':
    '★ 1. adım tamam — nötron (udd, yük 0) kuruldu! 2. adım: Mezon kipine geç ve π⁺’yi (u + anti-d) kur.',
  '★ Both built! Proton uud (+1), neutron udd (0), π⁺ u d̄ (+1) — every legal combo sums to a whole charge.':
    '★ İkisi de kuruldu! Proton uud (+1), nötron udd (0), π⁺ u d̄ (+1) — her geçerli kombinasyon tam bir yüke ulaşır.',
  'Not the target yet — a neutron needs u + d + d in Baryon mode.': 'Henüz hedef değil — nötron, Baryon kipinde u + d + d ister.',
  'Close! π⁺ needs u + anti-d in Meson mode (switch the mode selector). Progress is kept.':
    'Yaklaştın! π⁺, Mezon kipinde u + anti-d ister (kip seçicisini değiştir). İlerleme korunur.',
  'Step 1: build a NEUTRON — Baryon mode, pick u + d + d. Then I will ask for a π⁺.':
    '1. adım: bir NÖTRON kur — Baryon kipi, u + d + d seç. Sonra senden bir π⁺ isteyeceğim.',
  'Baryons are built from 3 quarks — an antiquark does not belong in this line-up.':
    'Baryonlar 3 kuarktan kurulur — bir antikuark bu dizilişe ait değil.',
  'A meson is one quark + one antiquark (e.g. u + d̄).': 'Bir mezon bir kuark + bir antikuarktır (örneğin u + d̄).',
  'Baryon mode · pick 3 quarks': 'Baryon kipi · 3 kuark seç',
  'Meson mode · pick 1 quark + 1 antiquark': 'Mezon kipi · 1 kuark + 1 antikuark seç',
  'colour-neutral line-ups only!': 'yalnızca renk-nötr dizilişler!',
  'CHARGE LEDGER': 'YÜK DEFTERİ',
  'TOTAL': 'TOPLAM',
  '(anti)': '(anti)',
  '{n} / {t} quarks': '{n} / {t} kuark',
  'Pick {n} more quark from the palette…': 'Paletten {n} kuark daha seç…',
  'Pick {n} more quarks from the palette…': 'Paletten {n} kuark daha seç…',
  'mass ≈ {m} MeV/c²': 'kütle ≈ {m} MeV/c²',
  '{name} · charge {q}': '{name} · yük {q}',
  'Proton (p⁺)': 'Proton (p⁺)',
  'Neutron (n⁰)': 'Nötron (n⁰)',
  'Pion π⁺': 'Piyon π⁺',
  'Pion π⁻': 'Piyon π⁻',
  'Pion π⁰': 'Piyon π⁰',
  'Δ⁺⁺ (Delta-plus-plus)': 'Δ⁺⁺ (Delta-artı-artı)',
  'Δ⁻ (Delta-minus)': 'Δ⁻ (Delta-eksi)',
  'an excited resonance — real, but it decays in ~10⁻²⁴ s': 'uyarılmış bir rezonans — gerçek, ama ~10⁻²⁴ s’de bozunur',
  'uū and dd̄ both work — π⁰ is a quantum mix': 'uū ve dd̄ ikisi de olur — π⁰ bir kuantum karışımıdır',
  '★ Neutron + π⁺ both built — quark chemist!': '★ Nötron + π⁺ ikisi de kuruldu — kuark kimyacısı!',
  'Step 1/2 — build a NEUTRON (Baryon: u + d + d)': '1/2. adım — bir NÖTRON kur (Baryon: u + d + d)',
  'Step 2/2 — build π⁺ (Meson: u + d̄) · switch mode!': '2/2. adım — π⁺ kur (Mezon: u + d̄) · kipi değiştir!',

  // shared
  'Reset': 'Sıfırla',
}
