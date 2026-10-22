// ─── Physics Quest · Turkish overlay · part-05 (f3, t1, t2) ──────────────────
import type { LessonOvFile } from '../schema'

const ov: LessonOvFile = {
  'f3-pascal': {
    title: 'Akışkanlarda Basınç ve Pascal İlkesi',
    tagline: 'Bir basınç sensörüyle dalışa çık ve bir arabayı tek elle kaldır.',
    objectives: [
      'Bir sıvıdaki basıncın derinlikle nasıl arttığını açıkla: $P = \\rho g h$',
      'Pascal ilkesini belirt: kapalı akışkanlar basınç değişimlerini eşit olarak iletir',
      'Hidrolik sistemlerin kuvveti nasıl çoğalttığını, ama asla işi çoğaltmadığını açıkla',
    ],
    concept: [
      { t: 'p', text: 'Bir havuzun dibine daldığında kulakların bunu hisseder: suyun basıncı **derinlikle artar**. Ne kadar derine inersen, başının üzerinde o kadar çok su bulunur ve bunların tümünün ağırlığı üzerine bastırır.' },
      { t: 'formula', caption: '$P$ derinlikten gelen ek basınç (Pa), $\\rho$ yoğunluk (kg/m³), $g = 9.8\\ \\mathrm{m/s^2}$, $h$ derinlik (m). Hava da üstüne yaklaşık $101.3\\ \\mathrm{kPa}$ ekler: $P_{\\text{total}} \\approx 101.3\\ \\mathrm{kPa} + \\rho g h$.' },
      { t: 'list', items: [
        'Baraj duvarları, su basıncının en büyük olduğu yerde, **dipte çok daha kalın** inşa edilir.',
        'Daldığında kulakların “çat” diye ses verir; çünkü basınç, yaklaşık her 10 m suda bir atmosfer kadar artar.',
        'Denizaltı gövdeleri, derinlikteki kocaman basınca dayanabilmek için yuvarlak ve ağır biçimde güçlendirilmiştir.',
      ] },
      { t: 'h', text: 'Pascal ilkesi' },
      { t: 'key', text: 'Kapalı bir akışkana uygulanan basınç değişikliği, **değişmeden akışkanın her yerine** ve kabının duvarlarına iletilir. İşte bu, Pascal ilkesidir.' },
      { t: 'h', text: 'Hidrolik makineler' },
      { t: 'p', text: 'Akışkan içinde basınç her yerde aynı olduğundan, **küçük bir piston üzerine uygulanan küçük kuvvet**, **büyük piston üzerine büyük bir kuvvetle** iten bir basınç oluşturur. Kuvvet, alan oranı kadar çoğalır:' },
      { t: 'formula', caption: 'kuvvetler $F_1, F_2$ (N), piston alanları $A_1, A_2$ (m²) — basınç aynıdır: $P = F_1/A_1 = F_2/A_2$' },
      { t: 'list', items: [
        'Hidrolik **araba krikoları** ve atölye kaldırıcıları, tek bir kişinin bütün bir arabayı kaldırmasını sağlar.',
        'Hidrolik **frenler**, pedala tek bir basışı fren hidroliğiyle dört tekerleğin hepsine iletir.',
        'Bedeli: küçük piston çok daha **uzak** yol almak zorundadır (aynı alan oranı kadar); böylece kuvvet kazanırsın ama asla enerji değil — giren iş ≈ çıkan iş.',
      ] },
    ],
    example: {
      title: 'Tek el kamyonu kaldırıyor',
      problem: 'Bir el, 0.005 m² alanlı küçük bir piston üzerine 100 N ile bastırıyor. Basınç, yağ üzerinden 0.25 m² alanlı büyük bir pistona ulaşıyor. Yükü hangi kuvvet kaldırır?',
      steps: [
        { text: 'Elin oluşturduğu basıncı bul:' },
        { text: 'Pascal ilkesi: büyük piston üzerine aynı basınç etki eder.' },
        { text: 'Büyük pistonun alanıyla çarp:' },
      ],
      answer: 'Yük, $5000\\ \\mathrm{N}$ kuvvet hisseder — kuvvet 50 kat artmıştır; tam olarak alan oranı $0.25/0.005 = 50$. Küçük piston 50 kat daha uzağa gitmek zorundaydı; dolayısıyla bedava enerji yok.',
    },
    questions: {
      'f3-p1': {
        prompt: 'Atmosferi yok sayarsak, su ($\\rho = 1000\\ \\mathrm{kg/m^3}$, $g = 9.8\\ \\mathrm{m/s^2}$) 10 m derinlikte ne kadar basınç ekler?',
        hints: [
          '$P = \\rho g h$ kullan (yalnızca derinlik, atmosfer yok).',
          '$1000 \\times 9.8 \\times 10$',
        ],
        explanation: '$P = \\rho g h = 1000 \\times 9.8 \\times 10 = 98{,}000\\ \\mathrm{Pa}$ — her 10 m derinleşmede kabaca bir atmosfer daha.',
      },
      'f3-p2': {
        prompt: 'Hidrolik bir presin küçük pistonu 50 N ile bastırıyor ve büyük piston 5000 N alıyor. Aralarındaki akışkanın basıncına ne olur?',
        choices: [
          'Büyük pistonda 100 kat büyür',
          'Her yerde aynı kalır — Pascal ilkesinin özü budur',
          'Büyük pistonda 100 kat küçülür',
          'Akışkan borunun içindeyken basınç kaybolur',
        ],
        hints: [
          'Pascal ilkesi, kapalı bir akışkandaki basınç hakkında ne söyler?',
          'Kuvvet piston alanıyla değişir; basınç değişmez.',
        ],
        explanation: 'Akışkan her yerde aynı basıncı taşır ($P = F/A$). Büyük piston, alanı 100 kat büyük olduğu için yalnızca daha çok kuvvet verir.',
      },
      'f3-q1': {
        prompt: 'Atmosferi yok sayarsak, 5 m derinlikte yalnızca derinliğin oluşturduğu su basıncı ne kadardır ($\\rho = 1000\\ \\mathrm{kg/m^3}$, $g = 9.8\\ \\mathrm{m/s^2}$)?',
        hints: ['$P = \\rho g h$ kullan.', '$1000 \\times 9.8 \\times 5$'],
        explanation: '$P = 1000 \\times 9.8 \\times 5 = 49{,}000\\ \\mathrm{Pa}$.',
      },
      'f3-q2': {
        prompt: 'Bir sürücü fren pedalına bastığında kuvvet, akışkan üzerinden dört tekerleğin hepsine ulaşır; bunun nedeni…',
        choices: ['Newton’un üçüncü yasası', 'Pascal ilkesi', 'Arşimet ilkesi', 'yer çekimi'],
        hints: [
          'Hangi ilke, kapalı akışkanların basıncı iletmesiyle ilgilidir?',
          'Hidrolik frenler, onun klasik bir uygulamasıdır.',
        ],
        explanation: 'Fren hidroliği, pedalın basıncını her yöne eşit olarak iletir (Pascal ilkesi); böylece her tekerleğin pistonu aynı itiş duyar.',
      },
      'f3-q3': {
        prompt: '0.002 m² alanlı küçük bir piston üzerine 50 N’luk bir kuvvet etki eder. İletilen basınç, 0.2 m² alanlı büyük bir piston üzerine bastırır. Büyük piston ne kadar kuvvet verir?',
        hints: [
          'Önce $P = F_1/A_1$ değerini bul, sonra $F_2 = P \\times A_2$.',
          '$50/0.002 = 25{,}000\\ \\mathrm{Pa}$, sonra $25{,}000 \\times 0.2$.',
        ],
        explanation: '$P = 50/0.002 = 25{,}000\\ \\mathrm{Pa}$; dolayısıyla $F_2 = 25{,}000 \\times 0.2 = 5000\\ \\mathrm{N}$ — 100 katlık alan oranı karşılığında 100 katlık kuvvet kazancı.',
      },
      'f3-q4': {
        prompt: 'Bir dalgıç gölde daha derine yüzdükçe suyun basıncı…',
        choices: ['azalır', 'aynı kalır', 'artar', 'önce artar, sonra sıfıra düşer'],
        hints: [
          '$P = \\rho g h$ formülünü düşün: $h$ büyüdükçe ne olur?',
          'Başının üzerinde daha çok su olması, üzerine daha çok ağırlık basması demektir.',
        ],
        explanation: 'Derinlikten gelen basınç şudur: $P = \\rho g h$. $h$ arttıkça $P$ de doğru orantıyla artar.',
      },
    },
  },
  't1-heat-vs-temperature': {
    title: 'Sıcaklık ve Isı',
    tagline: 'İki bardak suyu karıştır ve joule’lerin dengesini bulmasını izle.',
    objectives: [
      'Sıcaklığı (parçacıkların ortalama enerjisi), ısıdan (aktarım hâlindeki enerji, joule ile ölçülür) ayırt et',
      '$Q = mc\\Delta T$ formülünü, su için $c = 4186\\ \\text{J/(kg·°C)}$ değeriyle kullan',
      'İki miktar su karıştırıldığında son sıcaklığı tahmin et',
    ],
    concept: [
      { t: 'p', text: 'Bir bardak çay ile küvet dolusu su tam olarak aynı sıcaklıkta durabilir — ama bunlardan yalnızca biri bütün banyo zeminini ısıtabilir. Sıcaklık ile **ısı** ilişkilidir, ama aynı şey değildir.' },
      { t: 'h', text: 'Sıcaklık: parçacıklar ne kadar hızlı kıpırdar' },
      { t: 'p', text: 'Her şey, kıpırdamayı hiç durdurmayan parçacıklardan oluşur. **Sıcaklık** (°C ile ölçülür), o parçacıkların **ortalama kinetik enerjisini** söyler — ortalama olarak ne kadar güçlü hareket ettiklerini. Daha çok kıpırdama = daha sıcak.' },
      { t: 'h', text: 'Isı: hareket hâlindeki enerji' },
      { t: 'p', text: '**Isı**, sıcak bir şeyden soğuk bir şeye akan enerjidir ve **joule** (J) ile ölçülür. Bu, *aktarım hâlindeki* enerjidir: ulaştığında daha soğuk nesnenin parçacıkları daha hızlı kıpırdamaya başlar.' },
      { t: 'h', text: 'Öz ısı: bir madde enerjiye ne kadar açtır' },
      { t: 'p', text: 'Bazı maddeler kolayca ısınır; bazıları her derece için bolca enerji ister. **Öz ısı** $c$, 1 kg bir maddenin sıcaklığını 1 °C artırmak için gereken enerjidir. Su şampiyondur: $c = 4186\\ \\text{J/(kg·°C)}$ — çoğu metalden on kat fazla.' },
      { t: 'formula', caption: 'enerji $Q$ (J), kütle $m$ (kg), öz ısı $c$ (J/(kg·°C)), sıcaklık değişimi $\\Delta T$ (°C)' },
      { t: 'list', items: [
        'Araba motorları **suyla soğutulur**: su, her derece ısındığında kocaman bir enerji miktarını içine çeker.',
        'Denize yakın şehirlerin **ılıman iklimleri** vardır — okyanus muazzam miktarda enerjiyi yavaş yavaş soğurur ve geri verir.',
        '50 °C’deki büyük bir çorba tenceresi, 50 °C’deki bir kaşık dolusu çorbadan çok daha fazla ısıl enerji taşır — daha çok kütle, daha çok joule demektir.',
      ] },
      { t: 'key', text: 'Sıcaklık = parçacıkların ortalama enerjisi; ısı = aktarılan enerji. Daha çok kütle, daha büyük bir $\\Delta T$ ya da daha büyük bir $c$ daha çok joule demektir: $Q = mc\\Delta T$. Isı her zaman sıcaktan soğuğa akar.' },
    ],
    example: {
      title: 'İki suyu karıştırmak',
      problem: '0.5 kg, 60 °C sıcaklığındaki suyu, 0.5 kg, 20 °C sıcaklığındaki suya döküyor ve karışmalarına izin veriyorsun. Sonunda hangi sıcaklığa yerleşirler? (Kabı yok say.)',
      steps: [
        { text: 'Aynı sıvıdan eşit kütleler, sıcaklıklarının ortalamasına yerleşir:' },
        { text: 'Yerine koy:' },
        { text: 'Hesapla:' },
        { text: 'Enerjiyle denetle: sıcak su $0.5 \\times 4186 \\times 20 = 41{,}860\\ \\mathrm{J}$ kaybeder; soğuk su da tam olarak aynı miktarı kazanır.' },
      ],
      answer: 'Eşit kütleler ortada buluşur: karışımın son sıcaklığı $40\\ \\text{°C}$ olur; sıcak suyun kaybettiği joule’ler, soğuk suyun kazandığı joule’lerle tam olarak eşittir.',
    },
    questions: {
      't1-p1': {
        prompt: '1 kg suyun sıcaklığını 10 °C artırmak için ne kadar enerji gerekir? (Su: $c = 4186\\ \\text{J/(kg·°C)}$.)',
        hints: [
          '$Q = mc\\Delta T$ kullan.',
          '$4186 \\times 1 \\times 10$',
        ],
        explanation: '$Q = mc\\Delta T = 4186 \\times 1 \\times 10 = 41{,}860\\ \\mathrm{J}$.',
      },
      't1-p2': {
        prompt: 'Sıcak bir metal bilye soğuk su dolu bir kovaya bırakılıyor. Enerji hangi yönde akar?',
        choices: [
          'Sudan bilyeye',
          'Bilyeden suya',
          'Her iki yönde eşit olarak',
          'Hiçbir yere — enerji bilyede kalır',
        ],
        hints: [
          'Isı her zaman tek yönde yol alır: hangi yönde?',
          'Sıcaktan soğuğa; ikisi ortak bir sıcaklıkta buluşana kadar.',
        ],
        explanation: 'Isı sıcaktan soğuğa akar: bilye, ikisi de aynı sıcaklığa ulaşana kadar suya enerji aktarır.',
      },
      't1-q1': {
        prompt: '0.3 kg, 50 °C’deki suyu, 0.3 kg, 30 °C’deki suyla karıştırıyorsun. Son sıcaklık kaç olur?',
        hints: [
          'Aynı sıvıdan eşit kütleler ortalamaya yerleşir.',
          '$(50 + 30)/2$',
        ],
        explanation: 'Eşit kütleler ortalamaya karışır: $T_f = (50 + 30)/2 = 40\\ \\text{°C}$.',
      },
      't1-q2': {
        prompt: 'Büyük bir tencere su ile bir fincan su, ikisi de 50 °C’de. Hangi ifade doğrudur?',
        choices: [
          'Tencerenin sıcaklığı daha yüksektir',
          'Tencere daha fazla ısıl enerji taşır — içinde çok daha fazla su vardır',
          'Fincan daha fazla ısı enerjisi taşır, çünkü onu daha hızlı kaybeder',
          'Sıcaklıkları eşit olduğu için enerjileri de eşittir',
        ],
        hints: [
          'Aynı sıcaklık, aynı ortalama parçacık enerjisi demektir — aynı toplam değil.',
          'Toplam enerji kütleyle ölçeklenir: $Q = mc\\Delta T$.',
        ],
        explanation: 'Sıcaklık *ortalama* parçacık enerjisidir; ama toplam enerji kütleyle ölçeklenir. Daha çok kilogramla, tencere aynı 50 °C’de çok daha fazla enerji depolar.',
      },
      't1-q3': {
        prompt: '$Q = mc\\Delta T$ kullan: ne kadar enerji, 2 kg suyun sıcaklığını 5 °C artırır?',
        hints: [
          'Su için $c = 4186\\ \\text{J/(kg·°C)}$.',
          '$4186 \\times 2 \\times 5$',
        ],
        explanation: '$Q = 4186 \\times 2 \\times 5 = 41{,}860\\ \\mathrm{J}$.',
      },
      't1-q4': {
        prompt: 'Metal bir bank ile ahşap bir bank bütün gece dışarıda durur ve aynı sıcaklığa ulaşır. Metal olan dokununca daha soğuk hissettirir; çünkü…',
        choices: [
          'metal her zaman ahşaptan daha soğuktur',
          'metal, ısıyı elinden çok daha hızlı iletip götürür',
          'ahşap kendi ısısını üretir',
          'metal tanım gereği daha düşük sıcaklığa sahiptir',
        ],
        hints: [
          'Elin her iki banktan da daha sıcaktır — ısı hangi yöne akar?',
          '“Soğuk” hissi, ısının cildinden ayrılmasıdır — ne kadar hızlı?',
        ],
        explanation: 'İkisi de aynı sıcaklıktadır; ama metal iletendir, ısıyı elinden hızla çeker ve soğuk hissettirir. Ahşap yavaş iletir ve daha sıcak hissettirir.',
      },
    },
  },
  't2-heat-transfer': {
    title: 'Isı Aktarımı: İletim, Taşınım, Işınım',
    tagline: 'Bir metal çubuğu ısıt, parçacıkların kıpırdanışını izle ve ısının üç yolcusuyla yarış.',
    objectives: [
      'Isının yol aldığı üç yolu adlandır ve açıkla: iletim, taşınım, ışınım',
      'Metallerin ısıyı ahşaptan ya da plastikten çok daha iyi iletmesinin nedenini açıkla',
      'Işınım için ters kare kuralını kullan: mesafe iki katına çıkarsa şiddet ¼’e düşer',
    ],
    concept: [
      { t: 'p', text: 'Isı her zaman sıcaktan soğuğa yol alır — ve bu yolculuk için üç yolu vardır: **iletim**, **taşınım** ve **ışınım**.' },
      { t: 'h', text: 'İletim: çarpışmalar onu elden ele taşır' },
      { t: 'p', text: 'Katıda, hızlı kıpırdayan sıcak parçacıklar daha yavaş komşularına çarpar ve enerjiyi parçacıktan parçacıya elden ele aktarır. **Metaller en iyi iletendir**, çünkü serbest elektronlar enerjiyi hızla taşıyarak metalin içinde akıp gider.' },
      { t: 'list', items: [
        'İyi iletkenler: **bakır**, alüminyum, çelik — tencere dipleri, radyatörler, ısı emiciler.',
        'Yalıtkanlar: **ahşap**, plastik, yün ve hapsolmuş **hava** — tencere sapları, kışlık montlar, çift cam.',
      ] },
      { t: 'h', text: 'Taşınım: akışkanın kendisi hareket eder' },
      { t: 'p', text: 'Sıvılar ve gazlar akabilir. Sıcak akışkan **genleşir, daha az yoğun olur ve yükselir**; daha serin akışkan onun yerine alçalır ve dönen bir **taşınım akıntısı** oluşturur. Çorba bu sayede eşit biçimde kaynar, deniz meltemi de bu sayede oluşur.' },
      { t: 'h', text: 'Işınım: hiçlikten geçen dalgalar' },
      { t: 'p', text: 'Sıcak şeyler **kızılötesi ışınım** yayar — hiçbir maddeye gereksinim duymayan elektromanyetik dalgalar (Güneş’in ısısı boş uzayı aşarak sana ulaşır). **Koyu, mat yüzeyler ışınımı en iyi soğurur; parlak, açık renkli yüzeyler ise onu yansıtır.**' },
      { t: 'table', headers: ['Yol', 'Nasıl ilerler', 'Ortam gerektirir mi?', 'Günlük yaşam örneği'], rows: [
        ['İletim', 'parçacıktan parçacıya çarpışmalar', 'Evet (katılarda en iyi)', 'Sıcak çorbada metal kaşık'],
        ['Taşınım', 'akışkanın kendisinin toplu akışı', 'Evet (sıvılar ve gazlar)', 'Deniz meltemi, kaynayan tencere'],
        ['Işınım', 'kızılötesi dalgalar', 'Hayır — vakumdan geçer', 'Cildine vuran güneş ışığı'],
      ] },
      { t: 'key', text: 'İletim = çarpışmalar (katılar; en iyisi metaller). Taşınım = sıcak akışkan yükselir, serin akışkan alçalır. Işınım = ortam gerektirmeyen kızılötesi dalgalar. Lambadan ya da ateşten uzaklığını iki katına çıkarırsan şiddet $1/2^2 = 1/4$ değerine düşer.' },
    ],
    example: {
      title: 'Çorba kaşığı',
      problem: 'Çelik bir kaşık (kütlesi 0.05 kg, $c = 500\\ \\text{J/(kg·°C)}$) sıcak çorbanın içinde duruyor. Yakınında hiç alev olmamasına rağmen sapı 20 °C’den 60 °C’ye ısınıyor. Hangi aktarım yolu iş başında ve kaşığa ne kadar enerji aktı?',
      steps: [
        { text: 'Sap, ona doğru akan ya da ışınan hiçbir şey olmamasına rağmen ısınıyor: hızlı kıpırdayan çorba parçacıkları kaşığın metal parçacıklarına çarptı, onlar da sap boyunca komşularına çarptı — **iletim**.' },
        { text: 'Isınma formülünü kullan:' },
        { text: 'Yerine koy:' },
      ],
      answer: 'Yaklaşık $1000\\ \\mathrm{J}$, iletimle kaşık boyunca süzüldü — çorbanın ahşap ya da plastik saplı kaşıklarla servis edilmesinin nedeni tam olarak budur!',
    },
    questions: {
      't2-p1': {
        prompt: 'Bir tencere su kaynarken sıcak su dipten yükselir, daha serin su onun yerine alçalır ve tencere çevresinde dolaşır. Bu ısı aktarımı…',
        choices: ['iletim', 'taşınım', 'ışınım', 'buharlaşma'],
        hints: [
          'Isı, hareket hâlindeki akışkanın kendisi tarafından mı taşınıyor?',
          'Sıcak akışkan yükselir, serin akışkan alçalır — bu dolaşımın bir adı var.',
        ],
        explanation: 'Bir akışkanın içindeki dolaşan akıntılar **taşınımdır**: sıcak su genleşir, yükselir, soğur ve bir döngü içinde alçalır.',
      },
      't2-p2': {
        prompt: 'Bir ısı lambası 1 m uzaktan omuzlarını ısıtıyor. Geri çekilip 2 m’ye gidiyorsun. Üzerine düşen ışınım şiddeti kaç kat düşer? (Ters kare yasası.)',
        hints: [
          'Şiddet, mesafenin ters karesi ile orantılıdır.',
          'Mesafeyi iki katına çıkar: $2^2 = ?$',
        ],
        explanation: 'Şiddet $1/d^2$ kuralını izler: mesafeyi iki katına çıkarmak şiddeti $2^2 = 4$ değerine böler; yani dörtte bire düşürür.',
      },
      't2-q1': {
        prompt: 'Vakumlu termos, üç aktarım yolunun üçünü de yenebildiği için içecekleri sıcak tutar. Hangi bölüm ışınımı yener?',
        choices: [
          'Duvarlar arasındaki vakum boşluğu',
          'Parlak, ayna gibi duvarlar',
          'Plastik kapak',
          'Kalın taban',
        ],
        hints: [
          'Bir aynaya çarpan kızılötesi dalgalar ne olur?',
          'Vakum, iletimle taşınımı çoktan durdurmuş durumda.',
        ],
        explanation: 'Parlak duvarlar, kızılötesi ışınımı içeri doğru geri yansıtır. Vakum boşluğu iletim ve taşınımı halleder; birlikte üç yolu da yenerler.',
      },
      't2-q2': {
        prompt: 'Güneşli bir günde koyu renkli tişört, beyaz olandan daha sıcak hissettirir; çünkü…',
        choices: [
          'koyu kumaş, ısıyı havadan daha iyi iletir',
          'koyu, mat yüzeyler Güneş’in ışınımından daha fazlasını soğurur',
          'beyaz kumaş serinletici bir rüzgâr yaratır',
          'koyu kumaş tanımı gereği daha yüksek sıcaklığa sahiptir',
        ],
        hints: [
          'Hangi yüzeyler ışınımın en iyi soğurucularıdır?',
          'Yaz güneşinde siyah giymekle beyaz giymek arasındaki farkı düşün.',
        ],
        explanation: 'Koyu, mat yüzeyler güçlü ışınım soğurucularıdır; koyu tişört daha fazla güneş enerjisi soğurduğu için daha çok ısınır.',
      },
      't2-q3': {
        prompt: 'Bir kızartma tavasının metal sapı ısınır; oysa tavanın ocağa değen tek yeri tabanıdır. Bu, hangisidir?',
        choices: ['iletim', 'taşınım', 'ışınım', 'yalıtım'],
        hints: [
          'Isı, katı metalin kendisinden geçerek ilerliyor.',
          'Katıda parçacıktan parçacıya çarpışmalar = ?',
        ],
        explanation: 'Enerji, katı metalin içinde parçacıktan parçacıya ilerler — **iletim** — ve tava saplarının yalıtkanlardan yapılmasının nedeni de budur.',
      },
      't2-q4': {
        prompt: 'Radyatörün üzerinde sıcak hava yükselirken daha serin hava onun yerine alçalır ve dolaşan bir akıntı oluşur. Bu, hangisidir?',
        choices: ['ışınım', 'iletim', 'taşınım', 'gizli ısı'],
        hints: [
          'Havanın kendisi bir döngü içinde hareket ediyor.',
          'Isıyı taşıyan bir akışkanın toplu hareketi = ?',
        ],
        explanation: 'Akışkan (hava) topluca hareket eder: sıcak hava yükselir, serin hava alçalır — klasik bir **taşınım** akıntısı.',
      },
      't2-q5': {
        prompt: 'Kamp ateşinin yanında 1 m uzaklıktan 2 m’ye geçiyorsun. Yüzüne ulaşan ışınım, öncekinin yüzde kaçı olur?',
        hints: [
          'Ters kare yasası: şiddet ∝ $1/d^2$.',
          'Mesafe iki katına çıkınca şiddet $1/2^2$ olur.',
        ],
        explanation: 'Şiddet $2^2 = 4\\times$ oranında düşer; yani önceki değerin $1/4 = 25\\%$ seviyesine iner.',
      },
    },
  },
}

export default ov
