// ─── Physics Quest · Turkish (tr) overlay · part-07: w3, o1, o2 ───────────────
import type { LessonOvFile } from '../schema'

const ov: LessonOvFile = {
  'w3-doppler-echo': {
    title: 'Doppler Etkisi ve Yankılar',
    tagline: 'Bir ambulansla dalga cephelerini kovala; sonra bir yarasa gibi gizli bir duvarın uzaklığını ölç.',
    objectives: [
      'Doppler etkisini dalga cephelerinin sıkışmasıyla açıkla',
      'Yaklaşan bir kaynaktan duyulan frekansı hesapla',
      'Yankı sürelerini kullanarak $d = v t / 2$ ile uzaklık ölç',
    ],
    concept: [
      { t: 'p', text: 'Hareket eden bir dalga kaynağı, yaydığı dalgaların üstüne küçük bir oyun oynar. Her dalga cephesi, kaynağın o anda **bulunduğu** yerden daireler çizerek yayılır. Kaynak ileri doğru gidiyorsa kendi dalga cephelerini durmaksızın yakalar; cepheler onun **önünde** sıkışır, **arkasında** açılır. Bu yüzden bir ambulans sireni yaklaşırken tiz duyulur, yanından geçerken gerçek notasını verir, uzaklaşırken pesleşir — siren hiç değişmedi; değişen yalnızca dalga cephelerinin aralığıydı.' },
      { t: 'key', text: 'Öndeki sıkışmış dalga cepheleri = daha kısa dalga boyu = daha tiz duyulan ses. Arkadaki açılmış cepheler = daha pes ses. İşte bu, Doppler etkisidir.' },
      { t: 'h', text: 'Yaklaşan kaynak formülü' },
      { t: 'p', text: 'Hızı $v_s$ olan ve dümdüz sana doğru gelen bir kaynak için — dalga hızı $v$ ve yayılan frekans $f$ iken — dalga cepheleri $(v - v_s)$ oranıyla sıkışarak ulaşır; yani:' },
      { t: 'formula', caption: "kaynak yaklaşırken duyulan frekans $f'$; havadaki ses için $v = 343\\ \\mathrm{m/s}$ — uzaklaşan kaynakta payda $(v + v_s)$ olur ve ses pesler" },
      { t: 'h', text: 'Yankılar: ölçüm bandı olarak ses' },
      { t: 'p', text: 'Bir sesi duvara gönder ve dönüş süresini ölç. Ses duvara gider **ve geri döner**; yani $2d$ metre yol gider; o hâlde:' },
      { t: 'formula', caption: 'uzaklık $d$ m cinsinden, yankı süresi $t$ s cinsinden, dalga hızı $v$ m/s cinsinden — süreyi ikiye bölmeyi asla unutma!' },
      { t: 'list', items: [
        '**Yarasalar** ultrason atımlarıyla çığlık atar ve yönünü tamamen yankı süreleriyle bulur — ekolokasyon.',
        'Gemilerde ve denizaltılardaki **su altı sonarı**, deniz tabanının derinliğini ve balık sürüleriyle batık gemilerin uzaklığını ölçer.',
        'Hastanelerdeki **ultrason taramaları**, dokuların katmanlarına gönderdiği atımların yankısıyla bebeğin ya da kalbin görüntüsünü oluşturur.',
        '**Radarlar** aynı numarayı radyo dalgalarıyla yapar: hız ölçen radarlar ve fırtına takibi için.',
      ] },
    ],
    example: {
      title: 'Yaklaşan ambulans',
      problem: 'Bir ambulans sireni $700\\ \\mathrm{Hz}$ yayınlar ve $30\\ \\mathrm{m/s}$ hızla sana yaklaşıyor. Hangi frekansı duyarsın? (Havadaki ses: $v = 343\\ \\mathrm{m/s}$.)',
      steps: [
        { text: 'Yaklaşan kaynak formülünü yaz:' },
        { text: 'Değerleri yerine koy:' },
        { text: 'Hesapla:' },
      ],
      answer: "Yaklaşık $767\\ \\mathrm{Hz}$ duyarsın — gerçek $700\\ \\mathrm{Hz}$ sirenin belirgin biçimde üstünde. Ambulans geçtikten sonra aynı hesap $(v + v_s)$ ile yaklaşık $644\\ \\mathrm{Hz}$ verir. İkisi arasındaki bu düşüş, o klasik “ni-naaav” sesidir.",
    },
    questions: {
      'w3-doppler-echo-p1': {
        prompt: 'Bir kanyon duvarına sesleniyorsun ve $1\\ \\mathrm{s}$ sonra yankıyı duyuyorsun. Duvar sana kaç metre uzakta? ($v = 343\\ \\mathrm{m/s}$)',
        hints: [
          'Ses duvara gider **ve** geri döner; yani $2d = v t$.',
          '$d = 343 \\times 1 \\div 2$.',
        ],
        explanation: '$d = v t/2 = 343 \\times 1 \\div 2 = 171.5\\ \\mathrm{m}$. Süreyi her zaman ikiye böl — gidiş-dönüş yol, uzaklığın iki katıdır.',
      },
      'w3-doppler-echo-p2': {
        prompt: 'Sireni açık bir polis arabası doğrudan **sana doğru** geliyor. Duyduğun ses…',
        choices: ['sirenin gerçek sesinden daha tiz', 'sirenin gerçek sesinden daha pes', 'tam olarak gerçek tizlikte', 'sessiz'],
        hints: [
          'Hareketli bir kaynağın önündeki dalga cephelerini düşün.',
          'Sıkışan cepheler = daha kısa dalga boyu = daha yüksek frekans.',
        ],
        explanation: 'Yaklaşan kaynak kendi dalga cephelerini yakalar ve önünde sıkıştırır; bu yüzden sirenin yaydığından **daha yüksek** bir frekans (daha tiz bir ses) duyarsın.',
      },
      'w3-doppler-echo-q1': {
        prompt: 'Bir siren $600\\ \\mathrm{Hz}$ frekansla $10\\ \\mathrm{m/s}$ hızla sana yaklaşıyor. Ne duyarsın? ($v = 343\\ \\mathrm{m/s}$)',
        hints: [
          "$f' = f v/(v - v_s)$ formülünü kullan.",
          '$600 \\times 343 \\div 333$',
        ],
        explanation: "$f' = f v/(v - v_s) = 600 \\times 343/(343 - 10) = 600 \\times 343/333 \\approx 618\\ \\mathrm{Hz}$ — sirenin gerçek notasının bir tık üstünde.",
      },
      'w3-doppler-echo-q2': {
        prompt: 'Yarış arabası pistte koltuğunun yanından gürültüyle geçiyor. Geçip uzaklaşırken motor sesi…',
        choices: ['aynı kalır', 'aniden tizleşir', 'pesleşir', 'susar'],
        hints: [
          'Hareketli kaynağın arkasında dalga cepheleri açılarak uzaklaşır.',
          'Açılan cepheler daha düşük duyulan frekans demektir.',
        ],
        explanation: 'Araba uzaklaşmaya başlayınca her yeni dalga cephesi daha uzakta doğar ve aralık açılır; duyulan ses **pesleşir**. Yüksekten pese ani kayış, Doppler etkisinin ta kendisidir.',
      },
      'w3-doppler-echo-q3': {
        prompt: 'Bir su altı sonarı atımı $4\\ \\mathrm{s}$ sonra deniz tabanından geri getiriyor. Su ne kadar derin? ($v = 1480\\ \\mathrm{m/s}$, su içinde)',
        hints: [
          'Atım aşağı iner ve geriye yukarı çıkar.',
          '$d = v t / 2 = 1480 \\times 4 \\div 2$.',
        ],
        explanation: '$d = v t/2 = 1480\\ \\mathrm{m/s} \\times 4\\ \\mathrm{s} \\div 2 = 2960\\ \\mathrm{m}$ — geminin altında neredeyse 3 km su var.',
      },
      'w3-doppler-echo-q4': {
        prompt: 'Bir yarasa kapkaranlık bir mağarada tam hızla uçar ama hiçbir yere çarpmaz. Onun sırrı…',
        choices: ['gece görüşlü gözler', 'ultrasonik çığlıkların yankıları', 'kanatlarıyla hava akımlarını hissetmek', 'mağaranın haritasını hatırlamak'],
        hints: [
          'Yarasalar meşhur derecede gürültülüdür — sen yalnızca duyamazsın.',
          'Hangi kelime “yansıyan sesle uzaklık ölçmek” demek?',
        ],
        explanation: 'Yarasalar **ekolokasyon** kullanır: ultrason atımları yayar, yankıları dinler ve sürelerini ölçerek duvarların ve böceklerin uzaklığını algılar.',
      },
      'w3-doppler-echo-q5': {
        prompt: 'Sağa doğru hareket eden bir kaynağın dalga cephesi daireleri…',
        choices: ['sağda sıkışık, solda açıktır', 'sağda açık, solda sıkışıktır', 'her yerde eşit aralıklıdır', 'sağda karedir'],
        hints: [
          'Kaynak, hareket yönünde kendi dalga cephelerini kovalar.',
          'Yetişmek, önündeki aralıkları sıkıştırır.',
        ],
        explanation: 'Hareketli kaynak, ileriye yaydığı cepheleri durmaksızın yakalar; onları **önde** (sağda) sıkıştırır, **arkasında** (solda) açık bırakır — Doppler etkisi tek bir resimde.',
      },
    },
  },
  'o1-reflection': {
    title: 'Yansıma',
    tagline: 'Lazeri aynaya yansıt ve açıların neden hep eşit çıktığını keşfet.',
    objectives: [
      'Yansıma yasasını söyle: $\\theta_i = \\theta_r$',
      'Açıları yüzeyden değil, normalden (dik doğrultudan) ölç',
      'Düzenli (pürüzsüz) ve dağınık (pürüzlü) yansımayı ayırt et',
    ],
    concept: [
      { t: 'p', text: 'El fenerini bir aynaya tut; ışık geri seker — işte bu **yansımadır**. Işık bir şeye çarpana kadar düz bir çizgide gider; pürüzsüz bir yüzey onu çok öngörülebilir yeni bir yöne gönderir. Bir banyo aynasından parlak araba kaputuna kadar, gördüğün her yansıma tek bir basit kurala uyar.' },
      { t: 'h', text: 'Normal (dik doğrultu)' },
      { t: 'p', text: 'Işının nereye gittiğini anlatmak için önce **normali** çizeriz: ışının çarptığı noktada yüzeye **90° ile duran** hayali bir kesikli çizgi. Bütün yansıma açıları **normalden** ölçülür, asla aynanın yüzeyinden değil — bunları karıştırmak, optiğin klasik hatasıdır.' },
      { t: 'h', text: 'Yansıma yasası' },
      { t: 'formula', caption: 'gelme açısı $\\theta_i$ = yansıma açısı $\\theta_r$; ikisi de normalden ölçülür' },
      { t: 'p', text: 'Bir aynaya normalden $30°$ açıyla vurursan ışın, normalin öbür tarafında tam olarak $30°$ ile çıkar. Normal doğrultusunda gelip çarpan bir ışın ($\\theta_i = 0°$) kendi üzerinden geri seker.' },
      { t: 'h', text: 'Pürüzsüz ve pürüzlü yüzeyler' },
      { t: 'list', items: [
        '**Düzenli (ayna) yansıma** — yüzey pürüzsüzdür; paralel ışınlar paralel kalır ve net bir görüntü görürsün: aynalar, durgun su, cilalı metal.',
        '**Dağınık yansıma** — pürüzlü bir yüzey (kâğıt, duvarlar, kazakın) ışınları her yöne saçar. Bu sayfayı her açıdan *görmenin* nedeni tam da budur: ışığı gözlerine doğru saçar.',
        'Her iki tür de **ışın ışın** yansıma yasasına uyar — pürüzlü yüzeyler yalnızca yerel normali her yerde hafifçe döndürür.',
      ] },
      { t: 'p', text: 'Dik açıyla birleşen iki ayna bir ışını iki kez yansıtır ve onu $180°$ döndürür; ışın geldiği yöne paralel olarak çıkar — bir **geri yansıtıcı**. Bu numara bisiklet reflektörlerinde, yol tabelalarında, hatta astronotların Ay üzerinde bıraktığı aynalarda kullanılır. Periskoplar daha basit bir sürüm kullanır: 45° açısındaki iki paralel ayna, engellerin ardını görmeni sağlar.' },
    ],
    example: {
      title: 'Banyo aynasından sekme',
      problem: 'Bir lazer ışını, düz bir aynaya normalden $30°$ açıyla çarpıyor. Hangi açıyla çıkar?',
      steps: [
        { text: 'Gelme açısını belirle (normalden ölçülür):' },
        { text: 'Yansıma yasasını uygula:' },
        { text: 'Yansıma açısı şöyle olur:' },
      ],
      answer: 'Işın normalden $30°$ ile, karşı taraftan çıkar. Işının toplam yön değişimi $60°$ eder (giriş yönünden çıkış yönüne).',
    },
    questions: {
      'o1-reflection-p1': {
        prompt: 'Bir ışık huzmesi düz bir aynaya normalden $45°$ açıyla çarpıyor. Yansıma açısı kaçtır?',
        hints: [
          'Yansıma yasasını kullan.',
          '$\\theta_r = \\theta_i$ — açılar her zaman eşleşir.',
        ],
        explanation: '$\\theta_r = \\theta_i = 45°$. Yansıma tamamen adildir: bir açıyla gelen, aynı açıyla çıkar.',
      },
      'o1-reflection-p2': {
        prompt: 'Optikte gelme ve yansıma açıları, ışınla … arasında ölçülür:',
        choices: ['aynanın yüzeyi', 'normal (dik doğrultu)', 'zemin', 'ışık kaynağı'],
        hints: [
          'Yüzeye 90° ile duran hayali bir kesikli çizgidir.',
          'Açılar asla yüzeyin kendisinden ölçülmez.',
        ],
        explanation: 'İki açı da **normalden** (yüzeye dik çizgiden) ölçülür. “Aynaya göre 40°” diyen bir ışın aslında normale göre $50°$ açısındadır.',
      },
      'o1-reflection-q1': {
        prompt: 'Bir ışın aynaya normalden $25°$ açıyla çarpıyor. Yansıdığı açı…',
        hints: [
          'Yansıma yasası tek satırlık bir denklemdir.',
          '$\\theta_r = \\theta_i$.',
        ],
        explanation: '$\\theta_r = \\theta_i = 25°$; karşı tarafta, normalden ölçülür.',
      },
      'o1-reflection-q2': {
        prompt: 'Bu yazıyı neredeyse her açıdan okuyabiliyorsun — neden?',
        choices: [
          'Kâğıt, cam gibi ışığı aynalar',
          'Pürüzlü kâğıt ışığı her yöne saçar (dağınık yansıma)',
          'Mürekkep kendi kendine parlar',
          'Işık sayfanın çevresinden kıvrılır',
        ],
        hints: [
          'Kâğıt mikroskop altında tümsekli, yani pürüzlüdür.',
          'Hangi yansıma türü ışığı her yana gönderir?',
        ],
        explanation: 'Kâğıt pürüzlüdür; bu yüzden **dağınık** yansıtır — ışınlar her yöne çıkar ve ışık her bakış açısından gözüne ulaşır.',
      },
      'o1-reflection-q3': {
        prompt: 'Bir lazer, tam olarak bir aynanın normali boyunca atılıyor ($\\theta_i = 0°$). Ne olur?',
        choices: [
          'Işın kırılır ve kaybolur',
          'Işın, giriş yoluna 90° açıyla yansır',
          'Işın kendi üzerinden geri döner',
          'Işın tamamen soğurulur',
        ],
        hints: [
          '$\\theta_i = 0°$ ile $\\theta_r = \\theta_i$ uygula.',
          'Normalin bir tarafında sıfır, öbür tarafında da sıfır demektir.',
        ],
        explanation: '$\\theta_i = 0°$ iken yansıma da $\\theta_r = 0°$ verir — ışın geldiği yoldan dümdüz geri gider.',
      },
      'o1-reflection-q4': {
        prompt: 'İki düz ayna dik açıyla (90°) birleşiyor. İçeri giren bir ışın ikisine de sekerek dışarı çıkar; toplam dönüşü…',
        hints: [
          'Her sekme ışının yönünü değiştirir; toplam dönüşü takip et.',
          'Işın, girdiği yönün tam tersine doğru çıkar — yarım dairelik bir dönüş.',
        ],
        explanation: 'Birbirine 90° açıyla yapılan iki sekme ışını $180°$ döndürür; ışın girişine **tam ters yönde** çıkar — bisiklet reflektörlerinde ve Ay’a lazerle uzaklık ölçmede kullanılan geri yansıtıcı numarası.',
      },
    },
  },
  'o2-refraction': {
    title: 'Kırılma',
    tagline: 'Işığın suyun yüzeyindeki bükülüşünü izle — camın içindeki yok oluşunu da.',
    objectives: [
      'Kırılmayı, ortamlar arası hız değişimi olarak açıkla',
      'Snell yasasını uygula: $n_1\\sin\\theta_1 = n_2\\sin\\theta_2$',
      'Kritik açının ötesinde tam iç yansımayı öngör',
    ],
    concept: [
      { t: 'p', text: 'Alışveriş arabasını açılı olarak kaldırımdan çamura it: bir teker önce yavaşlar ve araba yana savrulur. Işık da aynısını yapar; eğimli olarak yeni bir maddeye geçtiğinde **hızı değişir** ve ışın **bükülür**. Bu bükülmeye **kırılma** denir; hızın ne kadar değiştiğini ise **kırılma indisi** $n$ ölçer — ışığın bir maddede ne kadar yavaşladığını gösteren çarpandır:' },
      { t: 'formula', caption: '$c = 3 \\times 10^8\\ \\mathrm{m/s}$ ışığın boşluktaki hızıdır; $v$ ise ortamdaki hızıdır' },
      { t: 'table', headers: ['Ortam', 'Kırılma indisi $n$', 'Işığın hızı'], rows: [
        ['Hava', '1.0', '≈ 3 × 10⁸ m/s'],
        ['Su', '1.33', '≈ 2.26 × 10⁸ m/s'],
        ['Cam', '1.5', '≈ 2 × 10⁸ m/s'],
        ['Elmas', '2.42', '≈ 1.24 × 10⁸ m/s'],
      ] },
      { t: 'h', text: "Snell'in yasası" },
      { t: 'p', text: 'Açılar yine **normalden** ölçülür. Snell yasasına göre ışık; daha yoğun ($n$ değeri büyük) bir ortama girerken **normale doğru** bükülür, o ortamdan çıkarken **normalden uzaklaşır** — bu yüzden bir pipet, su bardağının içinde **kırık** görünür ve bir yüzme havuzu gerçektekinden **daha sığ** görünür:' },
      { t: 'formula', caption: 'ışının ortam 1 ($\\theta_1$) ve ortam 2 ($\\theta_2$) içindeki açıları, normalden' },
      { t: 'h', text: 'Ters yönde: tam iç yansıma' },
      { t: 'p', text: 'Yoğun bir ortamdan havaya doğru giderken, sığ açılı ışınlar dışarı kaçar ama belli bir **kritik açıyı** aşan ışınlar hiç dışarı çıkamaz — kusursuz biçimde içeri geri yansır. İşte bu **tam iç yansıma (TIR)** yüzündendir ki optik fiberler internet trafiğini, kılometrelerce boyunca cam bir telin içinde sekerek ilerleyen ve neredeyse hiç kayıp vermeden ilerleyen ışık olarak taşır.' },
      { t: 'formula', caption: 'ortam 2 (yoğun) ortamdan ortam 1 (daha az yoğun) ortama geçerken kritik açı — su→hava için ≈ 48.8°' },
    ],
    example: {
      title: 'Suya dalan 45° ışını',
      problem: 'Bir lazer, suyun yüzeyine ($n_2 = 1.33$) normalden $45°$ açıyla çarpıyor. Üstteki hava için $n_1 = 1.0$. Kırılan ışının açısını bul.',
      steps: [
        { text: "Snell'in yasasını yaz:" },
        { text: 'Kırılma açısı için çöz:' },
        { text: 'Hesapla:' },
      ],
      answer: 'Işın **normale doğru** bükülür: havada $45°$ iken su içinde yaklaşık $32°$ olur; çünkü ışık $3$ değerinden $2.26 \\times 10^8\\ \\mathrm{m/s}$ değerine yavaşlar.',
    },
    questions: {
      'o2-refraction-p1': {
        prompt: 'Camın kırılma indisi $n = 1.5$. Işığın cam içindeki hızı nedir? Yanıtını m/s cinsinden yaz — $2 \\times 10^8$ sayısını 2e8 biçiminde yazabilirsin.',
        hints: [
          '$n = c/v$ formülünü kullan; hız için düzenle: $v = c/n$.',
          '$v = 3 \\times 10^8 \\div 1.5$.',
        ],
        explanation: '$v = c/n = 3 \\times 10^8 \\div 1.5 = 2 \\times 10^8\\ \\mathrm{m/s}$ — ışık camda üçte bir oranında daha yavaştır.',
      },
      'o2-refraction-p2': {
        prompt: 'Bir ışık ışını açılı olarak havadan suya ilerliyor. Işın…',
        choices: ['normalden uzaklaşır', 'normale doğru bükülür', 'kendi üzerinden geri döner', 'hiç bükülmez'],
        hints: [
          'Su, optik olarak havadan daha yoğundur; ışık yavaşlar.',
          'Yavaşlamak ışını hangi çizgiye doğru döndürür?',
        ],
        explanation: 'Daha yoğun bir ortama giren ışık yavaşlar ve ışın **normale doğru** bükülür (Snell yasasında $\\theta_2 < \\theta_1$).',
      },
      'o2-refraction-q1': {
        prompt: 'Işık, havadan suya geçerken bükülür çünkü…',
        choices: [
          'su ışığı yana iter',
          'ışık iki ortam arasında hızını değiştirir',
          'ışık su moleküllerine çekilir',
          'ışık yorulur',
        ],
        hints: [
          'Bir yandan yavaşlayan alışveriş arabası tekerleğini düşün.',
          'Bükülme tam olarak hız değişiminde olur.',
        ],
        explanation: 'Kırılma bir **hız değişiminden** kaynaklanır: dalga cephesinin suya önce giren kısmı önce yavaşlar ve ışın döner.',
      },
      'o2-refraction-q2': {
        prompt: 'Gizemli bir maddenin kırılma indisi $n = 2$. Işığın içindeki hızı nedir? Yanıtı m/s cinsinden yaz ($1.5 \\times 10^8$ sayısını 1.5e8 biçiminde yazabilirsin).',
        hints: [
          '$v = c/n$ formülünü kullan.',
          '$3 \\times 10^8 \\div 2$.',
        ],
        explanation: '$v = c/n = 3 \\times 10^8 \\div 2 = 1.5 \\times 10^8\\ \\mathrm{m/s}$ — boşluktaki hızın yarısı.',
      },
      'o2-refraction-q3': {
        prompt: 'Su altındaki bir spot, dik bir açıyla yüzeye doğru ışık veriyor. Havaya kaçan ışın…',
        choices: ['normale doğru bükülür', 'normalden uzaklaşır', 'her zaman suya geri döner', 'bir çember çizer'],
        hints: [
          'Işık, sudan çıkarken hızlanıyor.',
          'Hızlanmak, ışını yavaşlamanın tersi yöne döndürür.',
        ],
        explanation: 'Yoğun bir ortamdan havaya çıkan ışık **hızlanır** ve **normalden uzaklaşır** — açı kritik açıyı aşmadıkça; aşarsa ışın hiç dışarı çıkamaz.',
      },
      'o2-refraction-q4': {
        prompt: 'Camdan ($n = 1.5$) havaya ($n = 1.0$) giden ışık için kritik açı kaçtır?',
        hints: [
          '$\\theta_c = \\arcsin(n_1/n_2)$ formülünü kullan.',
          '$\\arcsin(1/1.5)$ — bir hesap makinesi yardımcı olur.',
        ],
        explanation: '$\\theta_c = \\arcsin(1/1.5) \\approx 41.8°$. Bundan daha dik gelen ışınlar camın içinde tamamen iç yansımaya uğrar.',
      },
      'o2-refraction-q5': {
        prompt: 'Optik fiberler internet trafiğini, ince bir cam telin içine hapsedilmiş ışık olarak taşır. Işığı içeride tutan şey…',
        choices: [
          'tam iç yansıma',
          'dağınık yansıma',
          'Doppler etkisi',
          'ekolokasyon',
        ],
        hints: [
          'Işık fiberin duvarından sürekli sek eder ve hiç dışarı kaçmaz.',
          'Deney tankında bulduğun aynı “kayıp ışın” numarasıdır.',
        ],
        explanation: 'Fiberler ışığı **tam iç yansıma** ile yönlendirir: her sekme kritik açının ötesinde gerçekleşir; böylece ışık kilometrelerce boyunca camın içinde kalır.',
      },
    },
  },
}

export default ov
