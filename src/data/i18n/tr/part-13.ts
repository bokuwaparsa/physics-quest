// ─── Physics Quest · Turkish (tr) overlay · part-13: w4, t4, t5 ───────────────
import type { LessonOvFile } from '../schema'

const ov: LessonOvFile = {
  'w4-oscillations': {
    title: 'Salınımlar ve Basit Harmonik Hareket',
    tagline: 'Yaylar ve sarkaçlar: evrenin saatinin kurulmasını sağlayan geri döndürücü kuvvet.',
    objectives: [
      'Salınımları genlik, periyot $T$ ve frekans $f = 1/T$ ile tanımlayın',
      'Geri döndürücü kuvvet $F = -kx$ ile basit harmonik hareketi açıklayın; $T = 2\\pi\\sqrt{m/k}$ (yay) ve $T = 2\\pi\\sqrt{L/g}$ (sarkaç) değerlerini hesaplayın',
      'Bir çevrim boyunca KE ↔ PE alışverişini izleyin ve sönümlenmeyi nitel olarak tanımlayın',
    ],
    concept: [
      { t: 'p', text: 'Gitar telleri uğuldar, salıncaklar süzülür, köprüler rüzgârda titrer ve kol saatindeki kuvars kristali her saniye binlerce kez atar. Bunların hepsi tek bir örüntüyü paylaşır: aynı yol üzerinde, tekrar tekrar kendini yineleyen hareket. Bir yineleme bir **çevrim**, hareketin kendisi ise bir **salınımdır**.' },
      { t: 'h', text: 'Salınımları saymak: genlik, periyot, frekans' },
      { t: 'p', text: 'Üç sayı her salınımı tanımlar. **Genlik**, durgun noktasından ne kadar savrulduğudur (metre, derece…). **Periyot** $T$, bir tam çevrimin aldığı süredir; saniye cinsindendir. **Frekans** $f$, saniyedeki çevrim sayısını sayar ve hertz ($\\mathrm{Hz}$) ile ölçülür. İki zamanlama birbirinin tersidir:' },
      { t: 'formula', caption: 'periyot $T$ saniye, frekans $f$ hertz cinsinden — $T = 2\\ \\mathrm{s}$ periyotlu bir sarkacın frekansı $f = 0.5\\ \\mathrm{Hz}$’dir' },
      { t: 'h', text: 'Basit harmonik hareket: geri itme kuralı' },
      { t: 'p', text: 'Yayı çekin; sizi geri çeker. Salıncakı en alçak noktasının ötesine itin; yer çekimi onu evine taşır. Ne zaman geri itme, cismin dengeden uzaklığıyla orantılı biçimde büyürse, ardından gelen hareket **basit harmonik harekettir** — doğadaki en akıcı yinelenen hareket:' },
      { t: 'formula', caption: 'geri döndürücü kuvvet $F$ newton ($\\mathrm{N}$), yay sabiti $k$ N/m, yer değiştirme $x$ m cinsinden — eksi işareti, kuvvetin her zaman merkeze doğru baktığını söyler' },
      { t: 'formula', caption: 'kütle $m$ kg, yay sabiti $k$ N/m, sarkaç boyu $L$ m, $g = 9.8\\ \\mathrm{m/s^2}$ (küçük salınımlar) cinsinden. Daha sert yaylar ve daha hafif kütleler daha hızlı tıkırdar; daha uzun sarkaçlar daha yavaş — ve topun kütlesi hiçbir yerde görünmez.' },
      { t: 'key', text: 'Periyot genliğe bağlı **değildir**. Geniş bir yaya savrulan salıncakla, minicik itilmiş salıncak çevrim başına aynı zamanı alır. Salıncaklı saatler bu “eş-zamanlılık” sihirine güvenir; gitar da yumuşak çalsın sert çalsın akortta kalır.' },
      { t: 'h', text: 'Bir tahterevalli üzerinde enerji' },
      { t: 'p', text: 'Basit harmonik hareket, bitmeyen bir enerji takasıdır. Merkezde cisim en hızlıdır — en büyük **kinetik enerji**. Her dönüş noktasında bir an için durur; böylece tüm enerji, gerilen yayda ya da yükselen topda **potansiyel enerji** olarak bekler. Hız ve ivme de takas yapar: $v$, $a = 0$ olan merkezde zirve yaparken $a$, $v = 0$ olan dönüş noktalarında zirve yapar — ve $a$ her zaman yer değiştirmenin tersine bakar, $v$’den bir çeyrek çevrim geride kalır:' },
      { t: 'table', headers: ['Çevrimin neresinde', 'Hız ve KE', 'İvme $a$', 'PE payı'], rows: [
        ['Merkez ($x = 0$)', 'en hızlı — tüm enerji KE', 'sıfır (kuvvet sıfır)', 'sıfır'],
        ['Dışa doğru çeyrek yol ($x = A/2$)', 'enerjinin 3/4’ü KE', 'maksimumunun yarısı', 'enerjinin 1/4’ü'],
        ['Dönüş noktası ($x = \\pm A$)', 'anlık olarak sıfır', 'maksimum, eve doğru', 'tamamı'],
      ] },
      { t: 'list', items: [
        '**Sönümlenme**, harekete sessizce vergi koyan sürtünme ve dirençtir: her çevrim bir öncekinden hafifçe küçülür; böylece genlik söner.',
        'Tuhaf ama sönümlenme enerjiyi boşaltırken periyot neredeyse hiç değişmez — sönen bir salıncak ritmini korur.',
        'Mühendisler çoğu zaman sönümlenmeyi *ister*: araba amortisörleri, kapı kapatıcıları ve yapışkan gösterge pedleri, bir şey gevşetmeden önce salınımları evcilleştirir.',
      ] },
      { t: 'key', text: 'Tek nefeste: $F = -kx$ basit harmonik hareket üretir; yay için $T = 2\\pi\\sqrt{m/k}$, küçük açılı sarkaç için $T = 2\\pi\\sqrt{L/g}$; periyot genliğe aldırış etmez; toplam sabit kalırken enerji KE ile PE arasında salınır — sönümlenme onu ısı olarak süzüp götürmedikçe.' },
    ],
    example: {
      title: 'Baba saatinin sarkacı',
      problem: 'Baba saatinin sarkacı 0.994 m uzunluğundadır. $g = 9.8\\ \\mathrm{m/s^2}$ alarak, küçük salınımlar için periyodunu ve frekansını bulun.',
      steps: [
        { text: 'Bildiğiniz değerleri yazın:' },
        { text: 'Küçük açılı sarkaç formülünü kullanın:' },
        { text: 'Karekökü alın, sonra $2\\pi$ ile çarpın:' },
        { text: 'Frekansa çevirin:' },
      ],
      answer: 'Periyot yaklaşık $2.0\\ \\mathrm{s}$’tur ($f = 0.5\\ \\mathrm{Hz}$) — saatlerin yarım salınımda bir kez tık demesini sağlayan klasik “saniye sarkacı”. Genliğin hesaba hiç girmediğine dikkat edin.',
    },
    questions: {
      'w4-oscillations-p1': {
        prompt: 'Basit bir sarkaç 0.25 m uzunluğundadır. $g = 9.8\\ \\mathrm{m/s^2}$ alarak, küçük salınımlar için periyodunu hesaplayın (1 ondalık basamağa kadar).',
        hints: [
          'Küçük açılı formülü $T = 2\\pi\\sqrt{L/g}$ kullanın.',
          '$0.25/9.8 = 0.0255$ — karekökünü alın, sonra $2\\pi$ ile çarpın.',
        ],
        explanation: '$T = 2\\pi\\sqrt{0.25/9.8} = 2\\pi \\times 0.1597 \\approx 1.0\\ \\mathrm{s}$ — çeyrek metrelik bir sarkaç tam bir çevrimi yaklaşık bir saniyede tamamlar.',
      },
      'w4-oscillations-p2': {
        prompt: 'Bir sarkacı iki kat genlikle (yine küçük) sallatıyorsunuz. Periyodu şimdi…',
        choices: [
          'iki kat uzun',
          'aynı — periyot genliğe bağlı değildir',
          'yarı uzunlukta',
          'dört kat uzun',
        ],
        hints: [
          '$T = 2\\pi\\sqrt{L/g}$ ifadesine bakın — oradaki hangi sembol genliktir?',
          'Galileo katedral lambasını zamanladı; geniş ve dar salınımların eşleştiğini gördü.',
        ],
        explanation: 'Küçük salınımlarda $T = 2\\pi\\sqrt{L/g}$ yalnızca $L$ ve $g$ içerir. Genlik, topun ne kadar yol gittiğini değiştirir; temposunu değil — salıncaklı saatlerin dayandığı eş-zamanlılık hilesi budur.',
      },
      'w4-oscillations-p3': {
        prompt: 'Bir oyun salıncağı 36 s’de 12 tam ileri-geri çevrim tamamlıyor. Periyodu nedir?',
        hints: [
          'Periyot = bir çevrimin süresi.',
          '$36\\ \\mathrm{s} \\div 12$ çevrim.',
        ],
        explanation: '$T = 36/12 = 3\\ \\mathrm{s}$ çevrim başına — frekans da $f = 1/T \\approx 0.33\\ \\mathrm{Hz}$ olur.',
      },
      'w4-oscillations-p4': {
        prompt: 'Sarkaç topu ileri geri salınıyor. Kinetik enerjisi en büyük nerededir?',
        choices: [
          'salınımın en yüksek noktasında',
          'en yüksek ve en alçak noktanın tam ortasında',
          'salınımın en alçak noktasında',
          'her yerde aynıdır',
        ],
        hints: [
          'KE, hızın en büyük olduğu yerde en büyüktür.',
          'Yükseklik PE depolar — top en alçak ve en hızlı nerede?',
        ],
        explanation: 'En alçak noktada depolanmış PE harekete boşalır: top en hızlı hâlinde, $KE = \\tfrac{1}{2}mv^2$ zirvededir ve geri döndürücü kuvvet (ve ivme) anlık olarak sıfırdır.',
      },
      'w4-oscillations-q1': {
        prompt: 'Yay üzerindeki bir kütle her 0.4 s’de bir çevrim tamamlıyor. Frekansı nedir?',
        hints: ['$f = 1/T$.', '$1 \\div 0.4$.'],
        explanation: '$f = 1/T = 1/0.4 = 2.5\\ \\mathrm{Hz}$ — saniyede iki buçuk sallanış.',
      },
      'w4-oscillations-q2': {
        prompt: 'Bir yay $x$ kadar geriliyor ve geri döndürücü kuvveti $F = -kx$. Eksi işareti size ne söyler?',
        choices: [
          'kuvvet negatiftir, yani yay zayıftır',
          'kuvvet yer değiştirmenin tersine etki eder, kütleyi dengeye doğru çeker',
          'enerji yok ediliyor',
          'yay sabiti negatiftir',
        ],
        hints: [
          'Gerilmiş bir yay kütleyi hangi yöne çeker?',
          'İşaret, kuvvet yönünü $x$’in yönüyle karşılaştırır.',
        ],
        explanation: 'Eksi işareti, kuvvetin her zaman dengeye doğru baktığını söyler: sağa gerin ($x > 0$), kuvvet sola çeker. Salınımlar tam da bu geri çağırış ile doğar.',
      },
      'w4-oscillations-q3': {
        prompt: '0.5 kg’lık sarkaç topu salınımının en alçak noktasından 2.0 m/s ile geçiyor. Oradaki kinetik enerjisi nedir?',
        hints: ['$KE = \\tfrac{1}{2}mv^2$.', '$\\tfrac{1}{2} \\times 0.5 \\times 2^2$.'],
        explanation: '$KE = \\tfrac{1}{2} \\times 0.5\\ \\mathrm{kg} \\times (2.0\\ \\mathrm{m/s})^2 = 1.0\\ \\mathrm{J}$ — en alçak noktada PE en düşük olduğundan, bütçenin tamamı budur.',
      },
      'w4-oscillations-q4': {
        prompt: 'Aynı sarkaç, $g$’nin yaklaşık 6 kat küçük olduğu Ay’a taşınıyor. Periyodu…',
        choices: [
          'yaklaşık 6 kat kısalır',
          'aynı kalır',
          'yaklaşık $\\sqrt{6} \\approx 2.4$ kat uzar',
          'sıfır olur',
        ],
        hints: [
          '$T = 2\\pi\\sqrt{L/g}$ — $g$ küçülünce ne olur?',
          'Daha küçük bir sayıya bölmek sonucu büyütür; karekök bunu yumuşatır.',
        ],
        explanation: '$g$ altı kat küçükken $T = 2\\pi\\sqrt{L/g}$, $\\sqrt{6} \\approx 2.4$ kat büyür — Ay’daki sarkaçlar ağır çekimde salınır.',
      },
      'w4-oscillations-q5': {
        prompt: 'Çalınan bir gitar teli söner. Sönümlenme hareketine ne yapar?',
        choices: [
          'genliği korur ama periyodu giderek uzatır',
          'periyot neredeyse aynı kalırken genliği küçültür',
          'genlik aynı kalırken periyodu küçültür',
          'ses bittiğinde teli anında durdurur',
        ],
        hints: [
          'Sönümlenme enerjiyi boşaltır — enerjiyi hangi nicelik gösterir?',
          'Tempo (periyot) neredeyse fark etmez; boy (genlik) solar.',
        ],
        explanation: 'Sönümlenme salınım enerjisini ısıya çevirir; böylece genlik çevrim çevrim küçülürken periyot yalnızca az miktar kayar — tel solar ama tonunu korur.',
      },
    },
  },

  't4-kinetic-theory': {
    title: 'Gazların Kinetik Teorisi',
    tagline: 'Bir balonun içine bakın: 10²⁵ tanecik, duvara vuran gök gürültüsü ve sıcaklığın gerçekte ne demek olduğu.',
    objectives: [
      'Gazı, sürekli rastgele hareketteki ~$10^{25}$ minik tanecik olarak tanımlayın ve basıncı duvar çarpışmalarının toplamı olarak açıklayın',
      'İdeal gaz yasasını kullanın: $PV = nRT$ ve $PV = Nk_BT$, $k_B = 1.38 \\times 10^{-23}\\ \\mathrm{J/K}$ ile',
      'Sıcaklığı ortalama kinetik enerji olarak açıklayın ve $v_{\\text{rms}} = \\sqrt{3RT/M}$ hesaplayın',
    ],
    concept: [
      { t: 'p', text: 'Hava hiçbir şeye benzemez — yine de oturduğunuz odanın her metrekübünde $2.7 \\times 10^{25}$ molekül var ve her biri saniyede yüzlerce metre hızla koşuşturuyor. **Kinetik teori**, gazların tüm davranışını bu çılgın tablodan açıklayan modeldir: minicik tanecikler, muhteşem sayıda, sürekli rastgele hareket.' },
      { t: 'h', text: 'Gaz bir tanecik kalabalığıdır' },
      { t: 'p', text: 'Bir gazın tanecikleri inanılmaz küçük ve inanılmaz çoktur: havanın her santimetre küpüne yaklaşık $2.7 \\times 10^{19}$ tanecik sığar — kabaca Dünya’daki insan sayısının birkaç bin katı. Her molekül, bir başkasına çarpıp yön değiştirene dek düz bir çizgide gider; saniyede milyarlarca kez yön değiştirir. Kalabalık kaostur — ama kurallı bir kaos, ve gaz yasalarını bize o kurallar verir.' },
      { t: 'h', text: 'Basınç, duvar çarpışmalarının fırtınasıdır' },
      { t: 'p', text: 'Bir tanecik duvara çarptığında duvara minicik bir itme verir. Tek itme hissedilemeyecek kadar küçüktür ama saniyede $10^{23}$ itme, düzenli ve ölçülebilir bir itişe dönüşür: o itiştir **basınç**. Bu tablo gaz yasalarını anında açıklar. Gazı ısıtın; tanecikler hızlanır, hem daha sert **hem** daha sık çarparlar — basınç yükselir. Aynı gazı yarı hacme sıkıştırın; duvar yaklaşır, her tanecik ona iki kat sıklıkla ulaşır — basınç yine yükselir.' },
      { t: 'formula', caption: 'basınç $P$ Pa, hacim $V$ m³, madde miktarı $n$ mol, sıcaklık $T$ kelvin, $R = 8.314\\ \\mathrm{J/(mol\\,K)}$ cinsinden — $T$’nin kelvin olması gerektiğini unutmayın: $T(\\mathrm{K}) = T(°\\mathrm{C}) + 273$' },
      { t: 'p', text: 'Tanecikleri mol ile saymak kimyaya yakışır ama fizik çoğu zaman taneciklerin kendisini, $N$’yi sayar. O zaman aynı yasa $PV = Nk_BT$ diye okunur; iki sürümü Avogadro sayısı $N_A = 6.022 \\times 10^{23}$ tanecik/mol ve **Boltzmann sabiti** $k_B = R/N_A$ birbirine bağlar:' },
      { t: 'formula', caption: 'tek tanecik başına gaz yasası — $k_B$, tanecik başına paylaştırılmış gaz sabiti $R$’den başka bir şey değildir' },
      { t: 'h', text: 'Sıcaklık ortalama kinetik enerjidir' },
      { t: 'p', text: 'Kinetik teorinin en derin sonucu: bir gazın sıcaklığı, taneciklerinin **ortalama kinetik enerjisini** ölçer. “Sıcak olan hızlıdır” — ve kesin bir biçimde: kök-ortalama-kare (rms) hız yalnızca sıcaklığa ve tanecik kütlesine bağlıdır (mol kütlesi $M$, kg/mol üzerinden):' },
      { t: 'formula', caption: 'rms hız m/s, $R = 8.314\\ \\mathrm{J/(mol\\,K)}$, sıcaklık $T$ kelvin, mol kütlesi $M$ kg/mol cinsinden — aynı $T$’de hafif tanecikler daha hızlıdır' },
      { t: 'table', headers: ['Gaz ve sıcaklık', 'rms hız $v_{\\text{rms}}$'], rows: [
        ['−20 °C’de hava (253 K)', '≈ 466 m/s'],
        ['20 °C’de hava (293 K)', '≈ 502 m/s'],
        ['100 °C’de hava (373 K)', '≈ 566 m/s'],
        ['0 °C’de hidrojen ($M$ = 0.002 kg/mol)', '≈ 1845 m/s'],
      ] },
      { t: 'p', text: 'Hava satırları, havanın mol kütlesi $M = 0.029\\ \\mathrm{kg/mol}$ ile $v_{\\text{rms}} = \\sqrt{3RT/M}$’den gelir: 20 °C için $\\sqrt{3 \\times 8.314 \\times 293 / 0.029} \\approx 502\\ \\mathrm{m/s}$ — tabloyla uyuşur. Her tanecik $v_{\\text{rms}}$ ile hareket etmez — hızlar çan biçimli bir **dağılıma** (Maxwell’ın) yayılır: birkaç tembel, birkaç yarışçı, çoğu ortaya kümeleşmiş. Gazı ısıtın; çanın tamamı daha yüksek hızlara kayar. Ve tablodaki hava moleküllerine bakın: bir yolcu jetinden hızlı gidiyorlar; kokular saniyeler içinde odaya yayılır, oysa her molekül durmadan çarpışıyor.' },
      { t: 'key', text: 'Gaz, metreküpte ~$10^{25}$ taneciğin rastgele hareketidir. Basınç, duvar çarpışmaların itmelerinin toplamıdır; sıcaklık, bu taneciklerin ortalama kinetik enerjisidir. Her iki gaz yasası — $PV = nRT$ ve $PV = Nk_BT$ — aynı şeyi söyler: gazı ısıtın ya da sıkıştırın, basınç tırmanır.' },
    ],
    example: {
      title: 'Bir oksijen molekülü ne kadar hızlı uçar?',
      problem: '$M = 0.032\\ \\mathrm{kg/mol}$ olan bir oksijen molekülünün $T = 300\\ \\mathrm{K}$’daki rms hızı nedir?',
      steps: [
        { text: 'Bildiğiniz değerleri yazın:' },
        { text: 'rms hız formülünü kullanın:' },
        { text: 'Payı hesaplayıp bölün:' },
        { text: 'Karekök alın:' },
      ],
      answer: 'Oda sıcaklığındaki bir oksijen molekülü yaklaşık $484\\ \\mathrm{m/s}$ ile seyir yapar — bir yolcu jetinin seyir hızının kabaca iki katı ve sesin ($343\\ \\mathrm{m/s}$) üstünde; çünkü sesin kendisi, bu moleküllerin elden ele taşıdığı itmedir.',
    },
    questions: {
      't4-p1': {
        prompt: 'Hacmi 0.05 m³ olan bir tank, 100,000 Pa basınçta 2 mol gaz tutuyor. $R = 8.314\\ \\mathrm{J/(mol\\,K)}$ ile gazın sıcaklığını bulun.',
        hints: [
          '$PV = nRT$’yi $T = PV/(nR)$ biçimine getirin.',
          '$100{,}000 \\times 0.05 = 5000$ ve $2 \\times 8.314 = 16.628$ — şimdi bölün.',
        ],
        explanation: '$T = PV/(nR) = (100{,}000 \\times 0.05)/(2 \\times 8.314) = 5000/16.628 \\approx 300\\ \\mathrm{K}$ — oda sıcaklığında keyifli bir gaz tankı.',
      },
      't4-p2': {
        prompt: 'Bir şırınga kapalıdır (gaz kaçmaz) ve pistonu sıcaklığı sabit tutarak yavaşça içeri itiyorsunuz. Gazın hacmi yarıya iniyor. Basınca ne olur?',
        choices: [
          'Yarıya iner — basınç ve hacim birlikte küçülür',
          'Aynı kalır — basıncı yalnızca sıcaklık yönetir',
          'İki katına çıkar — tanecikler yaklaşan duvara iki kat sık çarpar',
          'Dört katına çıkar — hacmi yarılamak basıncı kareler',
        ],
        hints: [
          '$T$ sabitken $PV = nRT$, $P$ ile $V$’nin birbirini dengelemesini ister.',
          'Yarım hacim, her taneciğin duvara yarı sürede ulaştığı demektir.',
        ],
        explanation: 'Sabit $T$’de $PV = nRT$ sabittir; $V$’yi yarılamak $P$’yi ikiye katlar. Kinetik bakış: duvarlar yakındır; her tanecik onlarla iki kat sık çarpışır.',
      },
      't4-p3': {
        prompt: 'Bir gaz örneği 300 K’de $v_{\\text{rms}} = 500\\ \\mathrm{m/s}$ hızına sahip. Kelvin sıcaklığı 1200 K’ye çıkarılıyor. Yeni rms hız nedir?',
        hints: [
          '$v_{\\text{rms}} = \\sqrt{3RT/M}$ — hız $\\sqrt{T}$ gibi büyür.',
          '$T$ 4 kat büyüdü ve $\\sqrt{4} = 2$ — demek ki hız…',
        ],
        explanation: '$v_{\\text{rms}} \\propto \\sqrt{T}$: kelvin sıcaklığını dört katına çıkarmak hızı $\\sqrt{4} = 2$ ile çarpar; yani $500 \\times 2 = 1000\\ \\mathrm{m/s}$.',
      },
      't4-p4': {
        prompt: 'Kinetik teoride bir gazın sıcaklığı gerçekte neyi ölçer?',
        choices: [
          'Gazın toplam kütlesini',
          'Taneciklerinin ortalama kinetik enerjisini',
          'EN YAVAŞ taneciklerinin hızını',
          'Kaptaki tanecik sayısını',
        ],
        hints: [
          'Bir gazı ısıttığınızda taneciklere ne olur?',
          '“Sıcak olan hızlıdır” — “hızlı” hangi niceliğin örtüsüdür?',
        ],
        explanation: 'Sıcaklık, taneciklerin ortalama kinetik enerjisini ölçer: $\\overline{KE} \\propto T$. Gazı ısıtın; kalabalığın tamamı ortalama olarak hızlanır.',
      },
      't4-q1': {
        prompt: 'Serin bir oda 17 °C’dir. Bu sıcaklığı kelvin olarak yazın.',
        hints: ['Kelvin = Celsius + 273.', '$17 + 273$'],
        explanation: '$T(\\mathrm{K}) = 17 + 273 = 290\\ \\mathrm{K}$. Gaz yasaları yalnızca kelvinle çalışır — Celsius değerleri onları anlamsızlaştırır.',
      },
      't4-q2': {
        prompt: 'Kapalı, sert bir gaz şişesi ısıtılıyor. Basınç neden yükselir?',
        choices: [
          'Tanecikler büyür ve daha çok yer kaplar',
          'Daha sıcak tanecikler daha hızlı hareket eder; duvarlara daha sert ve daha sık çarpar',
          'Şişe duvarları yumuşar ve gazı sıkar',
          'Gaz ısındıkça tanecik sayısı artar',
        ],
        hints: [
          'Kinetik teoriyi düşünün: ısıtmak taneciklerde neyi değiştirir?',
          'Basınç = duvardaki saniyedeki itme — hangi iki şey değişir?',
        ],
        explanation: 'Isıtma ortalama kinetik enerjiyi yükseltir; tanecikler hızlanır: her duvar çarpması daha serttir VE çarpmalar daha sıktır. İkisi de $PV = Nk_BT$’deki basıncı artırır.',
      },
      't4-q3': {
        prompt: 'Bir gaz 300 K’de $v_{\\text{rms}} = 500\\ \\mathrm{m/s}$. 75 K’ye soğutulunca rms hızı… olur.',
        hints: [
          '$v_{\\text{rms}} \\propto \\sqrt{T}$ — 75 K’yi 300 K ile karşılaştırın.',
          '$75/300 = 1/4$ ve $\\sqrt{1/4} = 1/2$.',
        ],
        explanation: 'Sıcaklık çeyreğe düşer; hız da değerinin $\\sqrt{1/4} = 1/2$’sine iner: $500/2 = 250\\ \\mathrm{m/s}$.',
      },
      't4-q4': {
        prompt: 'Hidrojen ($M = 0.002$ kg/mol) ve oksijen ($M = 0.032$ kg/mol) aynı kutuda, aynı sıcaklıkta. rms hızları için ne doğrudur?',
        choices: [
          'Oksijen daha hızlıdır — ağır olmak daha enerjik olmak demektir',
          'Hidrojen daha hızlıdır — aynı $T$’de ikisinin ortalama kinetik enerjisi eşittir; hafif tanecikler daha hızlı olmalıdır',
          'İkisi de tam aynı hızla hareket eder',
          'Hangi gaz üstte olduğuna bağlıdır',
        ],
        hints: [
          'Aynı sıcaklık = her iki gaz için eşit ortalama $\\tfrac{1}{2}mv^2$.',
          '$mv^2$ eşit kalmalı ama $m$ 16 kat küçükse $v$’ye ne olur?',
        ],
        explanation: 'Eşit sıcaklık, eşit ortalama kinetik enerji demektir. Hidrojenin kütlesi 16 kat küçük; $v_{\\text{rms}} \\propto 1/\\sqrt{M}$ onu $\\sqrt{16} = 4$ kat hızlı yapar — hafif gazların gezegenlerden en kolay sızmasının nedeni budur.',
      },
      't4-q5': {
        prompt: '100,000 Pa basınç ve 300 K sıcaklıkta 1.0 m³’ü kaç mol gaz doldurur? ($R = 8.314\\ \\mathrm{J/(mol\\,K)}$; en yakın mole yuvarlayın.)',
        hints: [
          '$PV = nRT$’yi $n = PV/(RT)$ biçimine getirin.',
          '$100{,}000 \\times 1.0 = 100{,}000$ ve $8.314 \\times 300 \\approx 2494$ — bölün.',
        ],
        explanation: '$n = PV/(RT) = 100{,}000/(8.314 \\times 300) \\approx 40\\ \\mathrm{mol}$ — yaklaşık $2.4 \\times 10^{25}$ tanecik; tam kinetik teori ölçeğinde.',
      },
    },
  },

  't5-entropy-engines': {
    title: 'Isı Makineleri ve Entropi',
    tagline: 'Lokomotiften santrallere her makinenin neden ısı boşaltmak zorunda olduğu ve hiçbir şeyin neden sonsuza dek çalışmadığı.',
    objectives: [
      'Bir ısı makinesinde enerjiyi izleyin ve $e = W/Q_h = 1 - Q_c/Q_h$ hesaplayın',
      'Carnot sınırını kelvin cinsinden uygulayın: $e_{\\max} = 1 - T_c/T_h$; hiçbir makinenin onu geçemeyeceğini açıklayın',
      'Entropiyi $\\Delta S = Q/T$ ile tanımlayın; onu ikinci yasa ve sürekli hareketin imkânsızlığıyla ilişkilendirin',
    ],
    concept: [
      { t: 'p', text: 'Araba motorları, buhar türbinleri, jet motorları, kendi bedeniniz — her **ısı makinesi** aynı numarayı yapar: sıcak bir şeyden ısı alır, bir dilimini işe yarar **işe** çevirir, kalanını soğuk bir şeye boşaltır. Boşaltmayı atlayan bir makine kimse yapamadı. Bu ders, nedenini anlatıyor.' },
      { t: 'h', text: 'Makinenin enerji defteri' },
      { t: 'p', text: 'Makineyi, **sıcak rezervuar** (yanan yakıt, $T_h$’de) ile **soğuk rezervuar** (açık hava, bir nehir, $T_c$’de) arasında oturan siyah bir kutu olarak düşünün. Her çevrimde $Q_h$ ısı sıcak taraftan girer, faydalı $W$ işi çıkar ve $Q_c$ atık ısı soğuk tarafa akar. Enerji korunumu defteri dengede tutar: $W = Q_h - Q_c$. **Verim** $e$, giren ısının iş olarak geri kazandığınız kesridir:' },
      { t: 'formula', caption: 'giren ısı $Q_h$, çıkan iş $W$, atık ısı $Q_c$ — tümü joule; gerçek makineler yüzde birkaçtan ~%40’a kadar her yerde durur' },
      { t: 'h', text: 'Carnot sınırı' },
      { t: 'p', text: '1824’te Sadi Carnot sert bir tavan kanıtladı: $T_h$’deki sıcak rezervuarla $T_c$’deki soğuk rezervuar arasında **hiçbir makine — hiçbir zaman, herhangi bir malzemeden — ideal tersinir makinenin verimini geçemez**. Klasik tuzağa dikkat: sıcaklıklar **kelvin** olmalı. °C kullanmak yanıtları saptırır (“100 °C ile 0 °C arasında” çalışan makine gerçekte 373 K ile 273 K arasında çalışır):' },
      { t: 'formula', caption: 'Carnot verimi — $T_h, T_c$ sıcaklıkları kelvin cinsinden. Daha büyük sıcaklık farkları daha iyi makineler demektir; %100’lük kusursuz bir makine, ulaşılamayan $T_c = 0\\ \\mathrm{K}$ gerektirir' },
      { t: 'table', headers: ['Makine', 'Tipik gerçek verim'], rows: [
        ['Pistonlu buhar makinesi (eski gemiler ve lokomotifler)', '≈ %15'],
        ['Benzinli araba motoru', '≈ %25'],
        ['Dizel motor', '≈ %37'],
        ['Gaz türbinli santral', '≈ %40'],
      ] },
      { t: 'h', text: 'Entropi: ısı yayılır, kalite sızar' },
      { t: 'p', text: 'Carnot sınırının arkasındaki muhasebe **entropidir**. $Q$ ısısı, $T$ sıcaklığındaki bir rezervuara aktığında rezervuarın entropisi $\\Delta S = Q/T$ değişir. Entropi, enerjinin ne kadar **yayılmış** olduğunu izler: tek bir sıcak yerde toplanmış ısı değerlidir ve makine sürebilir; aynı joule’ler ılık çevreye seyrelmişse hiçbir şeyi itemez. Her gerçek süreç enerjiyi daha da yayar — toplam entropi asla azalmaz. Bu tek yönlü sokak, **termodinamiğin ikinci yasasıdır**.' },
      { t: 'list', items: [
        '**Clausius’ün ifadesi**: ısı kendi kendine soğuktan sıcak akmaz — buzdolabınızın elektrik harcamasının nedeni tam olarak bu yasayla boğuşmasıdır.',
        '**Kelvin’ın ifadesi**: hiçbir makine, tek bir rezervuardan aldığı ısının HEPSİNİ işe çeviremez — bir miktar $Q_c$ ısı boşaltılmalıdır.',
        '**Sürekli hareket yok**: herhangi bir “bedava enerji makinesi”, yayılmış enerjiyi geri toplamak zorunda kalır ve ikinci yasayı kırar — paten ofisleri bu yüzden çalışan model istemeden reddeder.',
        'Makineler her yüzde için didinir: daha büyük $T_h$, daha küçük $T_c$, daha az sürtünme — ama Carnot sınırı sonsuza dek ayaktadır.',
      ] },
      { t: 'key', text: 'Bir makine $Q_h$ alır, $W = Q_h - Q_c$ teslim eder ve verimi $e = W/Q_h$, asla $e_{\\max} = 1 - T_c/T_h$’yi (kelvin!) geçemez. Entropi ($\\Delta S = Q/T$) bunun nedenidir: enerji hep yayılır ve tamamen yayılmış enerji işe çevrilemez.' },
    ],
    example: {
      title: '600 K ile 300 K arasındaki Carnot makinesi',
      problem: 'İdeal bir Carnot makinesi, 600 K’deki sıcak rezervuar ile 300 K’deki soğuk rezervuar arasında çalışıyor. Her çevrimde sıcak rezervuardan 1000 J emiyor. Verimini, iş çıktısını ve atık ısısını bulun.',
      steps: [
        { text: 'Bildiğiniz değerleri yazın (sıcaklıklar zaten kelvin):' },
        { text: 'Carnot verimi:' },
        { text: 'Çevrim başına iş çıktısı:' },
        { text: 'Enerji korunumundan atık ısı:' },
      ],
      answer: 'KUSURSUZ bir makine bile 1000 J’nin yalnızca 500 J’sini işe çevirir ve diğer 500 J’yi boşaltmak zorundadır. Aynı sıcaklıklar arasında çalışan gerçek makine daha da kötüsünü yapar — ikinci yasanın vergisini topladığı andır.',
    },
    questions: {
      't5-p1': {
        prompt: 'Bir Carnot makinesi 800 K ile 400 K arasında çalışıyor. En yüksek verimi yüzde kaçtır?',
        hints: [
          '$e_{\\max} = 1 - T_c/T_h$ kullanın (kelvin).',
          '$400/800 = 0.5$; yani $e_{\\max} = 1 - 0.5$.',
        ],
        explanation: '$e_{\\max} = 1 - 400/800 = 0.5 = 50\\%$ — bu ideal makine bile ısının yarısını atar.',
      },
      't5-p2': {
        prompt: 'Bir mucit, 100 °C ile 0 °C arasında çalışan ve %60 verimli bir makine tanıtıyor. İddianın nesi yanlış?',
        choices: [
          'Bir şey değil — %60 normal bir makine verimidir',
          'Kelvin yerine Celsius kullanılmış: gerçek Carnot sınırı $1 - 273/373 \\approx 27\\%$’tir; %60 imkânsızdır',
          'Makineler bu kadar küçük sıcaklık farklarıyla hiç çalışamaz',
          'Makinenin %60’a ulaşması için daha büyük olması gerekir',
        ],
        hints: [
          'Carnot formülü yalnızca mutlak sıcaklıklarla çalışır.',
          'Önce çevirin: 100 °C = 373 K ve 0 °C = 273 K — sonra $1 - T_c/T_h$ hesaplayın.',
        ],
        explanation: 'Kelvin cinsinden sınır $e_{\\max} = 1 - 273/373 \\approx 0.27 = 27\\%$’tir. %60 iddiası Carnot sınırını aşar — ya bir hata ya da bir dolandırıcılık işareti.',
      },
      't5-p3': {
        prompt: 'Bir makine her çevrimde 800 J ısı emiyor ve 600 J’yi soğuk rezervuara atıyor. Çevrim başına ne kadar iş teslim eder?',
        hints: [
          'Enerji korunumu: $W = Q_h - Q_c$.',
          '$800 - 600$',
        ],
        explanation: '$W = Q_h - Q_c = 800 - 600 = 200\\ \\mathrm{J}$; bu da $e = 200/800 = 25\\%$ eder.',
      },
      't5-p4': {
        prompt: 'HER ısı makinesi neden bir miktar atık ısıyı $Q_c$ soğuk rezervuara boşaltmak zorundadır?',
        choices: [
          'Makinenin erimemesi için — bu yalnızca bir mühendislik tercihidir',
          'Çünkü tüm ısıyı işe çevirmek enerjiyi geri toplamak olurdu ve termodinamiğin ikinci yasasını kırardı',
          'Çünkü soğuk rezervuarlar ısıyı mıknatıs gibi çeker',
          'Yalnızca kötü tasarlanmış makineler ısı atar; kusursuz olanlar atmaz',
        ],
        hints: [
          'İkinci yasanın Kelvin ifadesi ne der?',
          'Entropiyi düşünün: enerji işini yaptıktan sonra ne olur?',
        ],
        explanation: 'Kelvin’ın ifadesi (ve ardındaki entropi muhasebesi) ısının tümüyle işe çevrilmesini yasaklar: enerji, başlangıçtan DAHA fazla yayılmış olarak bitmek zorundadır; bu yüzden bir miktar ısı daha düşük sıcaklıkta atılmalıdır.',
      },
      't5-q1': {
        prompt: 'Bir Carnot makinesi 800 K ile 400 K arasında çalışır ve çevrim başına 2000 J emiyor. Ne kadar iş teslim eder?',
        hints: [
          'Önce $e_{\\max} = 1 - T_c/T_h$ bulun, sonra $W = e\\,Q_h$.',
          '$e = 0.5$ ve $0.5 \\times 2000$',
        ],
        explanation: '$e_{\\max} = 1 - 400/800 = 0.5$; demek ki $W = 0.5 \\times 2000 = 1000\\ \\mathrm{J}$ — diğer 1000 J, $Q_c$ olarak atılır.',
      },
      't5-q2': {
        prompt: 'Hangi değişiklik bir makinenin Carnot verimini kesin olarak artırır?',
        choices: [
          'Sıcak rezervuarı daha sıcak yapmak ($T_h$ yükselir)',
          'Soğuk rezervuarı daha ılık yapmak ($T_c$ yükselir)',
          'Makineyi daha hızlı çalıştırmak',
          'Aynı tasarımla daha büyük makine yapmak',
        ],
        hints: [
          '$e_{\\max} = 1 - T_c/T_h$ ifadesine bakın: hangi yön yardım eder?',
          'Sıcakla soğuk arasındaki büyük fark, joule başına daha çok iş demektir.',
        ],
        explanation: '$e_{\\max} = 1 - T_c/T_h$, $T_h$ yükseldiğinde (ya da $T_c$ düştüğünde) büyür. Hız ve boyut güç çıktısını değiştirir; verim tavanını değiştirmez.',
      },
      't5-q3': {
        prompt: '600 J ısı, 300 K’deki bir rezervuara akıyor. Rezervuarın entropi değişimi nedir?',
        hints: [
          '$\\Delta S = Q/T$ kullanın.',
          '$600 \\div 300$',
        ],
        explanation: '$\\Delta S = Q/T = 600/300 = 2\\ \\mathrm{J/K}$ — enerji artık rezervuara yayılmış durumda.',
      },
      't5-q4': {
        prompt: '“Sürekli hareket makinesi”, yakıtsız ve atık ısısız sonsuza dek çalışacağını iddia ediyor. Fizikçiler onu neden anında reddeder?',
        choices: [
          'İnşa etmek çok pahalı olurdu',
          'Isıyı tümüyle işe çevirmek (ya da enerji yaratmak) zorunda kalırdı; bu termodinamik yasalarını kırar',
          'Gerçekte hiçbir şey sonsuza dek çalışmaz, saat bile',
          'Makinelerin her zaman elektriğe ihtiyacı vardır',
        ],
        hints: [
          'Hiç ısı atmasaydı verimi ne olurdu?',
          'İkinci yasanın Kelvin ifadesiyle karşılaştırın.',
        ],
        explanation: 'Isı atmamak, $e = W/Q_h = 100\\%$ demektir — ısının tümüyle işe çevrilmesi; ikinci yasa bunu yasaklar (enerjiyi yoktan yaratmak da birinci yasayı kırar). Her sürekli hareket iddiası bunlardan birine çarpar.',
      },
      't5-q5': {
        prompt: '%25 verimli bir benzinli motor, çevrim başına 4000 J açığa çıkaran yakıt yakıyor. Çevreye ne kadar ısı atılır?',
        hints: [
          'Önce işi bulun: $W = e\\,Q_h$. Sonra $Q_c = Q_h - W$.',
          '$W = 0.25 \\times 4000 = 1000\\ \\mathrm{J}$; demek ki $Q_c = 4000 - 1000$.',
        ],
        explanation: '$W = 0.25 \\times 4000 = 1000\\ \\mathrm{J}$ faydalı iş; kalan $Q_c = 4000 - 1000 = 3000\\ \\mathrm{J}$ boşa gider — yakıtın enerjisinin dörtte üçü ısı olarak çıkar.',
      },
    },
  },
}

export default ov
