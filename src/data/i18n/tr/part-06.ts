// ─── Physics Quest · Turkish overlay · part-06 (t3, w1, w2) ───────────────────
import type { LessonOvFile } from '../schema'

const ov: LessonOvFile = {
  't3-phase-change': {
    title: 'Maddenin Hâl Değişimi',
    tagline: 'Buzu erit, suyu kuruyana dek kaynat — sıcaklığın yükselmeyi reddettiği düz noktaları bul.',
    objectives: [
      'Hal değişimlerini adlandır ve her hâldeki tanecikleri tanımla',
      'Gizli ısıyı açıkla: bir hal değişimi sırasında sıcaklık sabit kalır',
      '$Q = mL$ ile enerjiyi hesapla (su için $L_f = 334{,}000\\ \\mathrm{J/kg}$, $L_v = 2{,}260{,}000\\ \\mathrm{J/kg}$)',
    ],
    concept: [
      { t: 'p', text: 'Buz, su ve buhar aslında **aynı maddedir** — farklı dizilişlerdeki aynı tanecikler. Enerji vermek ya da almak, üç hâl arasında geçiş yapar.' },
      { t: 'table', headers: ['Hâl', 'Tanecikler', 'Örnek'], rows: [
        ['Katı', 'sıkı bir örgüde kilitli, yerinde titriyor', 'buz'],
        ['Sıvı', 'birbirine yakın ama yanından kayarak geçiyor', 'su'],
        ['Gaz', 'çok ayrı, özgürce uçuyor', 'buhar'],
      ] },
      { t: 'h', text: 'Hal değişimleri' },
      { t: 'list', items: [
        '**Erime**: su için 0 °C’de katı → sıvı (ve **donma** bunu tersine çevirir, enerji verir).',
        '**Kaynama / buharlaşma**: su için 100 °C’de sıvı → gaz (ve **yoğuşma** bunu tersine çevirir, enerji verir).',
        'Herhangi bir hal değişimi sırasında sıcaklık **değişmeyi bırakır** — ısıtmaya devam etseniz bile.',
      ] },
      { t: 'h', text: 'Gizli ısı: saklı enerji' },
      { t: 'key', text: '**Gizli ısı**, sıcaklığı yükseltmek yerine **tanecikleri birbirinden ayıran** enerjidir. Termometre, tanecikler arasındaki bağlar koparılırken 0 °C ve 100 °C’de duraklar.' },
      { t: 'formula', caption: 'enerji $Q$ J, kütle $m$ kg, gizli ısı $L$: eriyen buz için $L_f = 334{,}000\\ \\mathrm{J/kg}$, kaynayan su için $L_v = 2{,}260{,}000\\ \\mathrm{J/kg}$' },
      { t: 'p', text: 'Sıcaklık–zaman grafiğindeki **düz noktalar** hal değişimleridir: ısıtıcı joule vermeyi sürdürür ama bunların hepsi tanecikleri birbirinden ayırmaya gider; bu yüzden çizgi, değişim tamamlanana kadar düz kalır.' },
      { t: 'list', items: [
        '**Buhar yanığı**, kaynar su yanığından daha kötüdür: buhar önce yoğuşup fazladan gizli ısısını cilde boşaltmak zorundadır.',
        '**Terleme** serinletir; çünkü buharlaşan su, gizli ısıyı cildinizden alıp götürür.',
        'Soğuk içecek kutusundaki **yoğuşma**, etrafındaki havayı ısıtır — gaz, sıvıya dönüşürken enerji verir.',
      ] },
    ],
    example: {
      title: 'Bir buz parçasını eritmek',
      problem: '0 °C’deki 0.5 kg buzu hiç sıcaklık değişimi olmadan eritmek için ne kadar enerji gerekir?',
      steps: [
        { text: 'Sıcaklık değişimi yok demek, yalnızca gizli ısı demektir — $L_f = 334{,}000\\ \\mathrm{J/kg}$ ile $Q = mL$ kullanın.' },
        { text: 'Yerine koy:' },
        { text: 'Hesapla:' },
      ],
      answer: '$167{,}000\\ \\mathrm{J}$ — aynı kütledeki sıvı suyu yaklaşık 80 °C ısıtmaya yeter; yine de buzlu karışım, son kristal eriyene kadar $0\\ \\text{°C}$’de kalır.',
    },
    questions: {
      't3-p1': {
        prompt: '0 °C’deki 0.2 kg buzu eritmek için ne kadar enerji gerekir? ($L_f = 334{,}000\\ \\mathrm{J/kg}$.)',
        hints: [
          '$Q = mL_f$ kullan.',
          '$0.2 \\times 334{,}000$',
        ],
        explanation: '$Q = 0.2 \\times 334{,}000 = 66{,}800\\ \\mathrm{J}$.',
      },
      't3-p2': {
        prompt: 'Su ocakta harıl harıl kaynıyor ama termometre sabit 100 °C’de duruyor. Ocağın enerjisi nereye gidiyor?',
        choices: [
          'Sıcaklığı 100 °C’nin üstüne çıkarmaya',
          'Sıvı suyu buhara dönüştürmeye',
          'Termometrenin haznesine',
          'Hiçbir yere — enerji yok oluyor',
        ],
        hints: [
          'Sıcaklık değişmiyor; enerji başka ne yapabilir?',
          'Gizli ısıyı düşün: sıcaklık yerine ne değişiyor?',
        ],
        explanation: 'Eklenen enerji gizli ısıdır: sıvı taneciklerini birbirinden koparır ve suyu, sıcaklık 100 °C’de kalırken buhara çevirir.',
      },
      't3-q1': {
        prompt: 'Ilık bir odada buz erirken…',
        choices: [
          'sıcaklığı yavaşça yükselir',
          'tamamı eriyene kadar sıcaklığı 0 °C’de kalır',
          'sıcaklığı düşer',
          'odadan daha sıcak olur',
        ],
        hints: [
          'Sıcaklık–zaman grafiğindeki düz nokta ne anlama gelir?',
          'Enerji, sıcaklığı yükseltmek yerine bağları koparmaya gider.',
        ],
        explanation: 'Erime bir platodur: gelen enerjinin tamamı, örgüyü dağıtan gizli ısıdır; bu yüzden karışım, buz bitene kadar 0 °C’de kalır.',
      },
      't3-q2': {
        prompt: '100 °C’deki 0.1 kg suyu buharlaştırmak için ne kadar enerji gerekir? ($L_v = 2{,}260{,}000\\ \\mathrm{J/kg}$.)',
        hints: [
          '$Q = mL_v$ kullan.',
          '$0.1 \\times 2{,}260{,}000$',
        ],
        explanation: '$Q = 0.1 \\times 2{,}260{,}000 = 226{,}000\\ \\mathrm{J}$.',
      },
      't3-q3': {
        prompt: '100 °C’de bir buhar yanığı, genellikle 100 °C’de kaynar su yanığından daha kötüdür çünkü…',
        choices: [
          'buhar molekülleri daha hızlı hareket eder',
          'buhar aslında 100 °C’den daha sıcaktır',
          'buhar önce cilt üzerinde yoğuşarak fazladan gizli ısısını verir',
          'buhar elektriği iletir',
        ],
        hints: [
          'İkisi de 100 °C’de — buharın taşıdığı ek enerji nedir?',
          'Gaz → sıvı geçişi $L_v$’yi geri verir.',
        ],
        explanation: 'Buhar, serinlemeye başlamadan bile önce ciltte yoğuşmak zorundadır; bu da sıcak su yanığının üstüne $L_v = 2{,}260{,}000\\ \\mathrm{J/kg}$ ekstra enerji boşaltır.',
      },
      't3-q4': {
        prompt: 'Su buharı soğuk bir pencere üzerinde yoğuştuğunda…',
        choices: [
          'camdan enerji alır',
          'cama enerji verir',
          'tüm enerjisini ileriye saklar',
          'enerjiyi yok eder',
        ],
        hints: [
          'Yoğuşma, kaynamanın tersidir.',
          'Kaynama gizli ısı alıyorsa, yoğuşma tam tersini yapar.',
        ],
        explanation: 'Yoğuşma, gaz → sıvı geçişidir; buhar gizli ısısını soğuk cama **verir** — bu yüzden buğulanan odalar pencereleri ısıtır.',
      },
    },
  },

  'w1-wave-anatomy': {
    title: 'Dalga Anatomisi',
    tagline: 'Bir ip dalgasına bin ve her tümseği adlandır: dalgatepeği, dalga çukuru, λ, f.',
    objectives: [
      'Dalganın bölümlerini adlandır: dalgatepeği, dalga çukuru, genlik, dalga boyu',
      '$T = 1/f$ ile frekans ve periyot arasında dönüşüm yap',
      '$v = f\\lambda$ ile dalga hızını hesapla',
    ],
    concept: [
      { t: 'p', text: 'Havuza bir taş atın ve halkalar yayılsın — ama su kendisi yerinde durur. **Dalgaların** büyük sırrı budur: dalga, malzemeyi taşımadan **enerjiyi** yerden yere götüren ilerleyen bir bozulmadır. Yüzen bir mantar, dalga altından geçerken sadece yukarı aşağı zıplar.' },
      { t: 'key', text: 'Dalgalar maddeyi değil enerjiyi taşır. Ortam (su, ip, hava) yalnızca yerinde sallanır.' },
      { t: 'h', text: 'Bir dalganın dört ölçümü' },
      { t: 'list', items: [
        '**Genlik** ($A$) — düz orta çizgiden ölçülen bir dalgatepeğinin yüksekliği, metre (m) cinsinden. Büyük genlik, dalganın daha çok enerji taşıdığı anlamına gelir.',
        '**Dalga boyu** ($\\lambda$) — tek bir tam dalganın uzunluğu, örneğin tepeden tepeye, metre (m) cinsinden.',
        '**Frekans** ($f$) — bir noktadan her saniye kaç tam dalganın geçtiği; **hertz** ($\\mathrm{Hz}$) ile ölçülür; $1\\ \\mathrm{Hz}$ = saniyede 1 dalga.',
        '**Periyot** ($T$) — tek bir tam dalganın geçmesi için geçen süre, saniye (s) cinsinden. Frekansın öbür yüzüdür.',
      ] },
      { t: 'formula', caption: 'periyot $T$ s cinsinden, frekans $f$ Hz cinsinden — 50 Hz’lik bir dalgada periyot $T = 0.02$ s olur' },
      { t: 'p', text: 'Dalga ne kadar hızlı yol alır? Hız her zaman “birim zamandaki yol”dur — bir dalga için bir devrin aldığı yol dalga boyu $\\lambda$, bir devrin süresi ise periyot $T$’dir. İkisini birleştir; karşına dalgaların en kullanışlı formülü çıkar:' },
      { t: 'formula', caption: 'hız $v$ m/s, frekans $f$ Hz, dalga boyu $\\lambda$ m' },
      { t: 'list', items: [
        '**Enine dalga** — sallanma, ilerleme yönüne *dik* olur; sallanan bir ip ya da sudaki dalgacıklar gibi. Dalgatepeği ve dalga çukuru oluşturur.',
        '**Boyuna dalga** — sallanma, ilerleme yönüne *paralel* olur; gergin bir yay boyunca ya da havada ses olarak ilerleyen itme ve sıkışmalar gibi. Sıkışma ve seyrekleşme oluşturur.',
      ] },
      { t: 'p', text: 'Herhangi bir dalgayı — su, ses, ışık, hatta stadyum dalgasını — yalnızca bu sayılarla tanımlayabilirsin. Dalga Makinesi’nde $A$, $\\lambda$ ve $f$’yi ayarlayabilir, etiketlerin hareketini izleyebilir ve tek bir atım göndererek enerjinin, mantar hiçbir yere gitmeden ilerlediğini görebilirsin.' },
    ],
    example: {
      title: 'Çekilmiş gitar teli dalgasının hızı',
      problem: 'Bir teldeki dalganın frekansı $2\\ \\mathrm{Hz}$, dalga boyu $1.5\\ \\mathrm{m}$’dir. Dalga ne kadar hızlı yol alır?',
      steps: [
        { text: 'Bilinenleri yaz:' },
        { text: 'Dalga hızı formülünü seç:' },
        { text: 'Sayıları yerine koy:' },
        { text: 'Çarp:' },
      ],
      answer: 'Dalga $3\\ \\mathrm{m/s}$ ile yol alır — ve her tümseğin geçmesi $T = 1/f = 0.5\\ \\mathrm{s}$ sürer.',
    },
    questions: {
      'w1-wave-anatomy-p1': {
        prompt: 'Havuzdaki bir dalganın frekansı $5\\ \\mathrm{Hz}$, dalga boyu $0.4\\ \\mathrm{m}$’dir. Hızı kaçtır?',
        hints: [
          'Dalga formülü $v = f\\lambda$’yı kullan.',
          'Frekansı dalga boyuyla çarp: $5 \\times 0.4$.',
        ],
        explanation: '$v = f\\lambda = 5\\ \\mathrm{Hz} \\times 0.4\\ \\mathrm{m} = 2\\ \\mathrm{m/s}$.',
      },
      'w1-wave-anatomy-p2': {
        prompt: '$1$ **hertz**’lik frekans ne demektir?',
        choices: ['dalga başına 1 metre', 'saniyede 1 dalga', 'metre başına 1 saniye', 'saniyede 1 metre'],
        hints: [
          'Frekans, bir şeyin ne sıklıkta tekrarlandığını sayar.',
          'Hertz, tekrarları **saniye başına** ölçer.',
        ],
        explanation: 'Hertz ($\\mathrm{Hz}$), frekansın SI birimidir: $1\\ \\mathrm{Hz}$, her saniye bir tam dalganın geçmesi demektir.',
      },
      'w1-wave-anatomy-q1': {
        prompt: 'Bir gitar teli $50\\ \\mathrm{Hz}$ ile titreşiyor. Dalganın periyodu kaçtır?',
        hints: ['Periyot, frekansın tersidir.', '$T = 1/f$ kullan.'],
        explanation: '$T = 1/f = 1/50\\ \\mathrm{Hz} = 0.02\\ \\mathrm{s}$ — her dalga, bir saniyenin ellide birini alır.',
      },
      'w1-wave-anatomy-q2': {
        prompt: 'Bir dalganın genliğini ikiye katlıyorsun. Başka ne iki katına çıkar?',
        choices: ['Dalga boyu', 'Hızı', 'Taşıdığı enerji', 'Frekansı'],
        hints: [
          'Genlik, sallanmanın *boyuyla* ilgilidir.',
          'Daha büyük sallanmalar ortamı daha güçlü sarsar — bu neyi değiştirir?',
        ],
        explanation: 'Genlik, dalganın taşıdığı **enerjiyi** denetler. $A$’yi ikiye katlamak enerjiyi kabaca dört katına çıkarır; $\\lambda$, $f$ ve $v$ ise değişmez.',
      },
      'w1-wave-anatomy-q3': {
        prompt: 'Frekansı $170\\ \\mathrm{Hz}$ olan bir ses $340\\ \\mathrm{m/s}$ ile ilerliyor. Dalga boyu kaçtır?',
        hints: [
          '$v = f\\lambda$’yı dalga boyu için düzenle.',
          '$\\lambda = v/f = 340 \\div 170$.',
        ],
        explanation: '$\\lambda = v/f = 340\\ \\mathrm{m/s} \\div 170\\ \\mathrm{Hz} = 2\\ \\mathrm{m}$.',
      },
      'w1-wave-anatomy-q4': {
        prompt: 'Dalgaların geçtiği yerde bir mantar yüzüyor. Mantara ne olur?',
        choices: [
          'Dalgalarla birlikte kenara sürüklenir',
          'Yukarı aşağı zıplar ama yerinde kalır',
          'Dibe batar',
          'Dalga hızıyla hareket eder',
        ],
        hints: [
          'Dalga havuzun karşısına gerçekte neyi taşır?',
          'Dalgalar enerjiyi taşır, maddeyi değil.',
        ],
        explanation: 'Dalgalar **maddeyi değil, enerjiyi** taşır; bu yüzden mantar yalnızca durgun noktası çevresinde zıplar, dalga enerjisi ise önünden geçip gider.',
      },
      'w1-wave-anatomy-q5': {
        prompt: 'Bir dalganın dalga boyu $2\\ \\mathrm{m}$, frekansı $4\\ \\mathrm{Hz}$’dir. Hızını bul.',
        hints: ['Hız = frekans × dalga boyu.', '$v = 4 \\times 2$.'],
        explanation: '$v = f\\lambda = 4\\ \\mathrm{Hz} \\times 2\\ \\mathrm{m} = 8\\ \\mathrm{m/s}$.',
      },
    },
  },

  'w2-sound': {
    title: 'Ses: Tizlik, Şiddet ve Hız',
    tagline: 'Hoparlörü akort et, osiloskobu izle ve sesin 1 km’yi geçişini süreyle ölç.',
    objectives: [
      'Tizliği frekansa, ses şiddetini genliğe bağla',
      'Sesin havadaki, sudaki ve çelikteki hızlarını karşılaştır',
      '$\\lambda = v/f$ ile dalga boyunu hesapla',
    ],
    concept: [
      { t: 'p', text: 'Ses bir **boyuna dalgadır**: titreşen nesneler — bir davul derisi, ses tellerin, hoparlör konisi — çevrelerindeki havayı itip çeker; her yöne koşan sıkışmalar (**sıkışma**) ve genişlemeler (**seyrekleşme**) oluşturur. Hava (ya da su ya da çelik) yoksa ses de yoktur: uzayda patlamayı kimse duyamaz.' },
      { t: 'list', items: [
        '**Tizlik ↔ frekans**: tiz bir çığlık, yüksek frekanslı bir dalgadır (saniyede çok sayıda sıkışma); pes bir homurtu düşük frekanslıdır.',
        '**Ses şiddeti ↔ genlik**: bir bağırış, fısıltıdan havayı daha güçlü sıkıştırır (daha büyük genlik) — ve daha çok enerji taşır.',
      ] },
      { t: 'key', text: 'Tizliği frekans, ses şiddetini genlik belirler. Bir seferde yalnızca bir kaydırıcıyı değiştir ve hangi göstergenin hareket ettiğini izle.' },
      { t: 'p', text: 'Ses ne kadar hızlıdır? Ses, ortamın taneciklerinin komşularına çarpmasıdır; bu yüzden dalga, taneciklerin sıkıca dizildiği ve güçlüce bağlı olduğu yerde en hızlı ilerler. Bu yüzden hız malzemeye bağlıdır — ve sıcak bir günde hava molekülleri daha çevik çırpındığı için ses biraz daha hızlı ilerler.' },
      { t: 'table', headers: ['Ortam', 'Ses hızı'], rows: [
        ['Hava (20 °C)', '≈ 343 m/s'],
        ['Su', '≈ 1480 m/s'],
        ['Çelik', '≈ 5960 m/s'],
      ] },
      { t: 'p', text: '$\\lambda = v/f$ ile herhangi bir notanın dalga boyunu bulabilirsin. Havada $343\\ \\mathrm{Hz}$’lik bir tonun dalga boyu $\\lambda = 343/343 = 1\\ \\mathrm{m}$’dir — aklında tutmaya değer.' },
      { t: 'h', text: 'İnsanın işitme aralığı' },
      { t: 'list', items: [
        'Sağlıklı genç insanlar kabaca **20 Hz ile 20 000 Hz (20 kHz)** arasını duyar.',
        '20 Hz’nin altı **infrases**’tir — filler bunu kilometrelerce öteden çağrı yapmak için kullanır.',
        '20 kHz’nin üstü **ultrases**’tir — yarasa, yunus ve hastane cihazları bunu kullanır.',
        'Yaşlandıkça aralığımızın tepesi aşağı kayar; köpekler yaklaşık 45 kHz’e kadar duyar.',
      ] },
    ],
    example: {
      title: 'Fırtına ne kadar uzakta?',
      problem: 'Şimşeği görür ve gök gürültüsünü 3 s sonra duyarsın. Ses havada $343\\ \\mathrm{m/s}$ ile yol alır. Şimşek ne kadar uzakta çakmıştır?',
      steps: [
        { text: 'Dalga hızı ve süre biliniyor; yol = hız × süre:' },
        { text: 'Yerine koy:' },
        { text: 'Çarp:' },
      ],
      answer: 'Fırtına yaklaşık $1029\\ \\mathrm{m}$ — kabaca $1\\ \\mathrm{km}$ uzaktadır. (Işık neredeyse anında ulaşır; bu yüzden 3 s’nin tamamı sese aittir.)',
    },
    questions: {
      'w2-sound-p1': {
        prompt: 'Bir diyapazon havada $500\\ \\mathrm{Hz}$ çalıyor ($v = 343\\ \\mathrm{m/s}$). Sesin dalga boyu kaçtır?',
        hints: [
          '$\\lambda = v/f$ kullan.',
          'Böl: $343 \\div 500$.',
        ],
        explanation: '$\\lambda = v/f = 343\\ \\mathrm{m/s} \\div 500\\ \\mathrm{Hz} = 0.686\\ \\mathrm{m}$ — dalga başına yaklaşık 69 cm.',
      },
      'w2-sound-p2': {
        prompt: 'Soğuk bir kış gününe kıyasla sıcak bir yaz gününde havadaki ses…',
        choices: [
          'daha yavaş ilerler, çünkü hava daha seyrektir',
          'daha hızlı ilerler, çünkü moleküller daha hızlı hareket eder',
          'aynı hızla ilerler',
          'yalnızca geceleri daha hızlı ilerler',
        ],
        hints: [
          'Ses, tanecik çarpışmalarıyla aktarılır.',
          'Sıcak tanecikler daha hızlı hareket eder ve itişi daha çabuk devreder.',
        ],
        explanation: 'Daha sıcak hava, daha hızlı hareket eden ve titreşimi daha çabuk aktaran moleküller demektir; bu yüzden ses daha sıcak havada **daha hızlı** ilerler (15 °C’de yaklaşık 340 m/s, 20 °C’de 343 m/s).',
      },
      'w2-sound-q1': {
        prompt: 'Bir gitar telini, daha hızlı titreşmesi için geriyorsun. Duyduğun nota…',
        choices: ['daha şiddetli olur', 'daha tiz olur', 'daha pes olur', 'değişmez'],
        hints: [
          'Tizlik, dalganın tek bir özelliğini izler.',
          'Daha hızlı titreşim = daha yüksek frekans = ?',
        ],
        explanation: 'Tizlik **frekansla** yükselir. Saniyede daha çok kez titreşen bir tel, daha tiz bir nota üretir.',
      },
      'w2-sound-q2': {
        prompt: 'Sesin $1\\ \\mathrm{km}$ suyu geçmesi ne kadar sürer ($v = 1480\\ \\mathrm{m/s}$)?',
        hints: [
          '$t = d/v$ kullan.',
          '$1000 \\div 1480$ — makul biçimde yuvarla.',
        ],
        explanation: '$t = d/v = 1000\\ \\mathrm{m} \\div 1480\\ \\mathrm{m/s} \\approx 0.68\\ \\mathrm{s}$ (yaklaşık 0.7 s). Su altında ses, havadakinden çok daha hızlıdır.',
      },
      'w2-sound-q3': {
        prompt: 'Ay’da, kulaklığından birkaç yüz metre ötede bir patlama olur. Şunu duyarsın…',
        choices: [
          'gürültülü bir patlama',
          'çok hafif bir patlama',
          'hiçbir şey',
          'uzun bir gecikmeden sonra bir patlama',
        ],
        hints: [
          'Ses, ilerlemek için neye gerek duyar?',
          'Ay’ın atmosferi yoktur.',
        ],
        explanation: 'Ses, **maddenin** titreşimidir; Ay’da hava olmadığı için dalgayı taşıyacak bir ortam yoktur ve sana hiçbir ses ulaşmaz.',
      },
      'w2-sound-q4': {
        prompt: 'Bir hoparlör havada $343\\ \\mathrm{Hz}$ çalıyor ($v = 343\\ \\mathrm{m/s}$). Dalga boyu…',
        hints: [
          '$\\lambda = v/f$ kullan.',
          '$343 \\div 343$',
        ],
        explanation: '$\\lambda = v/f = 343\\ \\mathrm{m/s} \\div 343\\ \\mathrm{Hz} = 1\\ \\mathrm{m}$.',
      },
      'w2-sound-q5': {
        prompt: 'Kulaklığın ses düğmesini açmak, çoğunlukla ses dalgasının…',
        choices: ['frekansını', 'dalga boyunu', 'genliğini', 'hızını'],
        hints: [
          'Ses düğmesi = ses şiddeti.',
          'Hangi özellik titreşimin *büyüklüğünü* ölçer?',
        ],
        explanation: 'Ses şiddeti **genlik** tarafından belirlenir — koninin daha büyük salınımları havayı daha güçlü sıkıştırır. Frekans (ve tizlik) aynı kalır; hız ise yalnızca ortama bağlıdır.',
      },
    },
  },
}

export default ov
