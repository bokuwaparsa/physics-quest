// ─── Physics Quest · Turkish (tr) overlay · part-16: e8, e9, e10 ──────────────
import type { LessonOvFile } from '../schema'

const ov: LessonOvFile = {
  'e8-magnetic-force': {
    title: 'Hareketli Yüklere Manyetik Kuvvet',
    tagline: 'Hızla giden bir yükü daireye kıvırın ve 0.10 m’lik dedektör halkasının peşine düşün.',
    objectives: [
      'Manyetik kuvveti $F = qvB\\sin\\theta$ ile hesaplayın ve yönünü sağ el kuralıyla bulun',
      'Manyetik kuvvetlerin yükleri hızlarını değiştirmeden neden $r = \\dfrac{mv}{qB}$ yarıçaplı dairelere kıvırdığını açıklayın',
      'Akım taşıyan tele etkiyen kuvveti $F = BIL\\sin\\theta$ ile öngörün ve bu kuvveti kullanan aygıtları adlandırın',
    ],
    concept: [
      { t: 'p', text: 'Bir yükü mıknatısın yanına park edin, hiçbir şey olmaz. Ama yükü **hareket ettirmeye** başlayın, mıknatıs onu iter — yana doğru! Bu yana itme, elektrik motorlarının, hoparlörlerin ve parçacık hızlandırıcılarının sırrıdır.' },
      { t: 'h', text: 'Hareketli bir yüke etkiyen manyetik kuvvet' },
      { t: 'p', text: 'Mıknatısın çevresindeki bölge, **tesla** ($\\mathrm{T}$) ile ölçülen bir **manyetik alan** $B$ ile tanımlanır. $v$ hızıyla hareket eden $q$ yüklü bir cisim; $q$ ile, $v$ ile, $B$ ile — ve hareketin alana ne kadar çapraz olduğunun artmasıyla — büyüyen bir kuvvet hisseder:' },
      { t: 'formula', caption: 'kuvvet $F$ newton ($\\mathrm{N}$) cinsinden, yük $q$ coulomb ($\\mathrm{C}$) cinsinden, hız $v$ m/s cinsinden, alan $B$ tesla ($\\mathrm{T}$) cinsinden, $\\theta$ hız ile alan arasındaki açı' },
      { t: 'p', text: 'Alana **paralel** hareket edin ($\\theta = 0$), kuvvet sıfırdır. **Dik** hareket edin ($\\theta = 90°$), tam $qvB$ değerini alırsınız. Yön **sağ el kuralından** gelir: parmaklarınızı hız boyunca uzatın, onları alana doğru kıvırın; başparmağınız **pozitif** yüke etkiyen kuvveti gösterir. Negatif yükte kuvvet ters yöndedir — elektronlar öbür yöne sapar.' },
      { t: 'h', text: 'Dönüp dönmek: dairesel hareket' },
      { t: 'p', text: 'Kuvvet her zaman **hıza dik** olduğu için yolu bükebilir ama hızı asla değiştiremez. Manyetik alanın içinden fırlatılan bir yük bir **daire** çizer. Manyetik kuvvet, yarıçapı ve saniyedeki tur sayısını (**siklotron frekansı**) sabitleyen merkezcil kuvvet gibi davranır:' },
      { t: 'formula', caption: 'daha ağır ya da daha hızlı parçacıklar daha büyük daireler çizer; daha güçlü alanlar ve daha büyük yükler onları daha sıkı kıvırır' },
      { t: 'formula', caption: 'hertz cinsinden tur frekansı — hıza bağlı olmadığına dikkat edin!' },
      { t: 'p', text: 'Kuvvet parçacık üzerinde hiçbir zaman iş yapmadığı için ($W = F\\,d\\cos\\phi$ ve $\\phi = 90°$), **hız sabit kalır** — yalnızca yön değişir. Manyetik alan dümen tutar ama yol boyunca asla hızlandırmaz.' },
      { t: 'h', text: 'Teller de hisseder' },
      { t: 'p', text: 'Akım, hareketli yüklerden oluşan bir ırmaktır; bu yüzden manyetik alan bütün **telleri** iter: $I$ akımı taşıyan $L$ uzunluğundaki bir tel için $F = BIL\\sin\\theta$. Bu itme **motorları** döndürür ve **hoparlörlerin** içindeki ses bobinini ileri geri fiskeleyerek titreştirir. Ayrıca kütle spektrometrelerinde parçacıkları kütleye göre ayırır ve siklotronlardaki ışınları yönlendirir.' },
      { t: 'table', headers: ['Kaynak', 'Tipik alan şiddeti'], rows: [
        ['Dünya’nın manyetik alanı (yüzey)', '25–65 μT'],
        ['Buzdolabı mıknatısı', '≈ 5 mT'],
        ['Hastane MR cihazı', '1.5–3 T'],
      ] },
      { t: 'key', text: 'Manyetik kuvvet $F = qvB\\sin\\theta$ harekete yana etki eder: yükleri $r = mv/(qB)$ yarıçaplı dairelere kıvırır, hızlarını sabit tutar ve akım taşıyan telleri $F = BIL\\sin\\theta$ ile iter — her motorun içindeki kastır.' },
    ],
    example: {
      title: 'Siklotron tarzı bir alandaki proton',
      problem: 'Bir proton ($q = 1.6\\times10^{-19}\\ \\mathrm{C}$, $m = 1.67\\times10^{-27}\\ \\mathrm{kg}$), $0.5\\ \\mathrm{T}$’lik manyetik alana dik olarak $2\\times10^6$ m/s ile hareket ediyor. Kuvveti, daire yarıçapını ve tur frekansını bulun.',
      steps: [
        { text: 'Bildiğinizi yazın — hız dik, öyleyse $\\sin\\theta = 1$:' },
        { text: 'Protona etkiyen manyetik kuvvet:' },
        { text: 'Dairesel yolun yarıçapı:' },
        { text: 'Siklotron frekansı (ya da $f = v/2\\pi r$):' },
        { text: 'Enerji hesabını denetleyin: kuvvet her zaman $v$’ye diktir, bu yüzden iş yapmaz — proton boydan boya $2\\times10^6$ m/s hızını korur.' },
      ],
      answer: 'Proton $F = 1.6\\times10^{-13}\\ \\mathrm{N}$’lik yana bir kuvvet hisseder; hiç hızlanmadan ya da yavaşlamadan, $f \\approx 7.6$ milyon tur/s ile $\\approx 0.042\\ \\mathrm{m}$ (yaklaşık 4.2 cm) yarıçaplı daireler çizer.',
    },
    questions: {
      'e8-p1': {
        prompt: '0.5 m uzunluğunda düz bir tel, 0.3 T’lik manyetik alana dik olarak 2 A akım taşıyor. Tel hangi kuvveti hisseder?',
        hints: [
          'Kuvvet yasasının tel sürümünü kullanın: $\\theta = 90°$ ile $F = BIL\\sin\\theta$.',
          '$0.3 \\times 2 \\times 0.5$',
        ],
        explanation: '$F = BIL = 0.3\\ \\mathrm{T} \\times 2\\ \\mathrm{A} \\times 0.5\\ \\mathrm{m} = 0.3\\ \\mathrm{N}$; hem akıma hem de alana diktir.',
      },
      'e8-p2': {
        prompt: 'Pozitif bir yük, alana dik olarak sağa doğru hareket ediyor; manyetik alan **ekranın içine** yönelir. Kuvvet onu hangi yöne iter?',
        choices: [
          'Yukarı, ekranın üstüne doğru',
          'Aşağı, ekranın altına doğru',
          'Ekranın dışına, size doğru',
          'Kuvvet yoktur — alan düzgündür',
        ],
        hints: [
          'Sağ el kuralı: parmakları hız boyunca (sağa) uzatın, sonra alan yönünde — ekranın içine — kıvırın.',
          'Pozitif yük için başparmak kuvveti gösterir — gerçek elinizle deneyin!',
        ],
        explanation: 'Parmaklar sağa işaret eder, ekranın içine kıvrılır ve başparmak **yukarıyı** gösterir: $\\vec{v}$ sağa, $\\vec{B}$ ekranın içine yönelirken $\\vec{F} = q\\,\\vec{v}\\times\\vec{B}$, pozitif yüke yukarı yönlü bir kuvvet verir.',
      },
      'e8-p3': {
        prompt: 'Bir alfa parçacığı ($m = 6.6\\times10^{-27}\\ \\mathrm{kg}$, $q = 3.2\\times10^{-19}\\ \\mathrm{C}$), 0.2 T’lik alana dik olarak $1.0\\times10^6$ m/s ile hareket ediyor. Dairesel yolunun yarıçapı kaçtır? (Yanıtı 2 ondalık basamağa yuvarlayın.)',
        hints: [
          '$r = mv/(qB)$ kullanın.',
          '$r = (6.6\\times10^{-27} \\times 10^6) \\div (3.2\\times10^{-19} \\times 0.2)$ — yaklaşık 0.10 m.',
        ],
        explanation: '$r = \\dfrac{mv}{qB} = \\dfrac{6.6\\times10^{-27} \\times 1.0\\times10^6}{3.2\\times10^{-19} \\times 0.2} \\approx 0.103\\ \\mathrm{m} \\approx 0.10\\ \\mathrm{m}$. Protonun iki katı yük ama ~4000 kat kütle, geniş bir daire çizer.',
      },
      'e8-p4': {
        prompt: 'Yüklü bir parçacık manyetik alan içinde daireler çiziyor. Hızına ne olur?',
        choices: [
          'Tam olarak sabit kalır — manyetik kuvvet harekete her zaman diktir ve hiç iş yapmaz',
          'Parçacık döndükçe yavaşça artar',
          'Alan parçacığın enerjisini emdiği için azalır',
          'Gidiş yolu boyunca artar, dönüşte azalır',
        ],
        hints: [
          'İş, yer değiştirmeye **paralel** bir kuvvet bileşeni gerektirir: $W = Fd\\cos\\phi$.',
          'Merkezcil kuvvet ile hız arasındaki açı kaçtır?',
        ],
        explanation: 'Manyetik kuvvet hıza her zaman $90°$ açıyla etki eder; öyleyse $W = Fd\\cos 90° = 0$: iş yok, enerji değişimi yok — alan yalnızca yolu büker.',
      },
      'e8-q1': {
        prompt: '0.3 m uzunluğunda bir tel, 0.5 T’lik alana dik olarak 4 A taşıyor. Tele etkiyen kuvveti bulun.',
        hints: ['$F = BIL$ kullanın.', '$0.5 \\times 4 \\times 0.3$'],
        explanation: '$F = BIL = 0.5 \\times 4 \\times 0.3 = 0.6\\ \\mathrm{N}$ — motorların rotorunu döndüren de bu yana itmedir.',
      },
      'e8-q2': {
        prompt: 'Bir proton ve bir elektron, aynı hızla ve alana dik olarak aynı manyetik alana giriyorlar. Ne olur?',
        choices: [
          'Aynı yönde ve aynı yarıçapla daireler çizerler',
          'Zıt yönde daireler çizerler ve elektronun dairesi çok daha küçüktür',
          'İkisi de zıt yönlerde hızlanır',
          'Alan düzgün olduğu için düz çizgilerde ilerlerler',
        ],
        hints: [
          'Yük tersine dönünce kuvvet de döner: $\\vec{F} = q\\,\\vec{v}\\times\\vec{B}$.',
          'Eşit hızda $r = mv/(qB)$ değerini $m = 1.67\\times10^{-27}$ kg ile $9.11\\times10^{-31}$ kg için karşılaştırın.',
        ],
        explanation: 'Zıt işaretli yükler zıt kuvvetler hisseder; bu yüzden **zıt yönlerde** dönerler. Eşit hızda $r = mv/(qB)$ ve elektronun kütlesi ~1836 kat küçüktür; öyleyse dairesi ~1836 kat daha dardır.',
      },
      'e8-q3': {
        prompt: '0.4 T’lik bir alandaki tel, 2 A akım taşırken 0.8 N kuvvet hissediyor. Alanı ve teli aynı tutarak, kuvveti 2.0 N’a ikiye katlayacak akım kaç amperdir?',
        hints: [
          'Kuvvet akımla orantılıdır: $F = BIL$.',
          '2 A, 0.8 N veriyorsa 1 A, 0.4 N verir. 2.0 N için kaç amper gerekir?',
        ],
        explanation: '$F \\propto I$; öyleyse $I_{\\text{new}} = 2\\ \\mathrm{A} \\times \\dfrac{2.0}{0.8} = 5\\ \\mathrm{A}$ (denetim: $0.4\\ \\mathrm{N/A} \\times 5\\ \\mathrm{A} = 2.0\\ \\mathrm{N}$).',
      },
      'e8-q4': {
        prompt: 'Dünya yüzeyindeki manyetik alan kabaca ne kadar güçlüdür?',
        choices: [
          'Yaklaşık 50 μT (0.00005 T)',
          'Yaklaşık 50 mT (0.05 T)',
          'Yaklaşık 0.5 T',
          'Yaklaşık 50 T',
        ],
        hints: [
          'Tabloyla karşılaştırın: buzdolabı mıknatısı şimdiden ≈ 5 mT — bundan 1000 kat zayıf olan…',
          'Dünya’nın alanı minicik ama gerçektir: 25–65 μT.',
        ],
        explanation: 'Dünya yüzeyindeki alan yalnızca **25–65 μT**’dir — buzdolabı mıknatısından (≈ 5 mT) yaklaşık bin kat, MR cihazından (1.5–3 T) yaklaşık bir milyon kat zayıftır.',
      },
      'e8-q5': {
        prompt: 'Manyetik alan hareketli bir parçacığı neden asla hızlandıramaz?',
        choices: [
          'Kuvveti hıza her zaman diktir; bu yüzden yaptığı iş sıfırdır',
          'Manyetik alanlar enerji aktarmak için çok zayıftır',
          'Parçacığın yükü, alanın enerjisini götürür',
          'Manyetik kuvvetler yalnızca durgun parçacıklara etki eder',
        ],
        hints: [
          'Hızlanmak, hareket yönü boyunca iş gerektirir: $W = Fd\\cos\\phi$.',
          '$\\vec{F} = q\\vec{v}\\times\\vec{B}$ ile $\\vec{v}$ arasındaki açı her zaman 90°’dir.',
        ],
        explanation: '$\\vec{F} = q\\,\\vec{v}\\times\\vec{B}$ her an $\\vec{v}$’ye diktir; öyleyse $W = 0$ ve kinetik enerji $\\tfrac{1}{2}mv^2$ hiç değişmez — alan yalnızca dümen tutar.',
      },
    },
  },
  'e9-induction': {
    title: 'Elektromanyetik İndüksiyon',
    tagline: 'Bir mıknatısı bobinin içinden süpürün ve iğneyi zıplatın — pile izin yok.',
    objectives: [
      'Manyetik akıyı $\\Phi = BA\\cos\\theta$ ile hesaplayın',
      'Faraday yasasını $\\text{EMF} = -N\\,\\Delta\\Phi/\\Delta t$ ve Lenz yasasını mıknatıs ve bobinlere uygulayın',
      'Jeneratörleri, indüksiyon ocaklarını ve transformatörleri akı değiştiren makineler olarak açıklayın',
    ],
    concept: [
      { t: 'p', text: 'İnsanlar yıllarca manyetizmadan elektrik üretmenin bir yolunu aradı. Akımlar manyetik alan yaratıyor — öyleyse mıknatıslar neden akım yaratmasın? 1831’de **Michael Faraday** hileyi buldu: durgun bir mıknatıs hiçbir şey yapmaz ama **değişen** bir manyetik alan, yükleri bir bobin çevresinde iter. O keşif bugün evinizi aydınlatıyor.' },
      { t: 'h', text: 'Manyetik akı: halkadan geçen alan' },
      { t: 'p', text: '**Manyetik akı**, bir halkanın yüzünden ne kadar alan geçtiğini sayar — çemberin yakaladığı yağmur gibi. Çemberi yanı yatırın, hiç yakalayamaz.' },
      { t: 'formula', caption: 'akı $\\Phi$ weber ($\\mathrm{Wb}$, yani $\\mathrm{T\\,m^2}$) cinsinden, alan $B$ tesla cinsinden, halka alanı $A$ m² cinsinden, $\\theta$ alan ile halkanın normali arasındaki eğim açısı' },
      { t: 'h', text: 'Faraday yasası' },
      { t: 'p', text: 'Bobinden geçen akıyı değiştirin — mıknatısı hareket ettirin, alanın şiddetini değiştirin, bobini döndürün — ve bir **elektromotor kuvvet (EMF)** belirir, akım sürer. Daha çok sarım ve daha hızlı değişim, daha büyük EMF demektir:' },
      { t: 'formula', caption: '$N$ = sarım sayısı, $\\Delta\\Phi$ = Wb cinsinden akı değişimi, $\\Delta t$ = sürenin s cinsinden uzunluğu; eksi işareti Lenz yasasıdır' },
      { t: 'p', text: '**Lenz yasası**, indüklenen akımın onu doğuran değişime karşı koyduğunu söyler: mıknatısın kuzey kutbunu bobine doğru itin ve bobinin yakın yüzü de bir kuzey kutbuna dönüşerek sizi iter. Elektrik üretmek için iş yapmak zorundasınız — enerji korunumludur, asla bedava değildir.' },
      { t: 'h', text: 'Jeneratörler, ocaklar ve transformatörler' },
      { t: 'list', items: [
        '**Jeneratörler** alandaki bir bobini (ya da bobindeki bir mıknatısı) döndürür: bisiklet dinamosu, otomobil alternatörü ve santral alternatörü hep “akı değiştirici”dir.',
        '**İndüksiyon ocakları** hızla değişen bir alanı tencerenin metal tabanına gönderir; tabanda girdap gibi dönen **girdap akımları** oluşur ve bunların direnci tencereyi doğrudan ısıtır.',
        '**Transformatörler** değişen akıyı demir bir çekirdek aracılığıyla bir bobinden ötekine taşır ve voltajı yukarı ya da aşağı çevirir — şebekelerin AC ile çalışmasının nedeni budur.',
      ] },
      { t: 'table', headers: ['Kaynak', 'Tipik EMF'], rows: [
        ['Telefon şarj cihazı (transformatör çıkışı)', '≈ 5 V'],
        ['Bisiklet dinamosu farı', '≈ 6 V'],
        ['Otomobil alternatörü', '≈ 14 V'],
        ['Rüzgâr türbini jeneratörü', '≈ 690 V'],
        ['Santral alternatörü', '≈ 25,000 V'],
      ] },
      { t: 'key', text: 'Yalnızca **değişen** akı EMF indükler: $\\text{EMF} = -N\\,\\Delta\\Phi/\\Delta t$. Daha büyük bobinler, daha çok sarım ya da daha hızlı hareket daha çok voltaj demektir — ve Lenz’in eksi işareti, her jeneratörün aygıtlarınızı beslerken geri itilmesini sağlar.' },
    ],
    example: {
      title: 'Bobinin içinden bir mıknatıs süpürmesi',
      problem: '0.01 m² alanlı 200 sarımlı bir bobin, 0.2 s içinde 0’dan 0.4 T’ye büyüyen bir manyetik alana dik duruyor. Hangi EMF indüklenir?',
      steps: [
        { text: 'Bildiğinizi yazın — bobin alana karşı dönüktür, öyleyse $\\cos\\theta = 1$:' },
        { text: 'Bir sarımdan geçen akı değişimi:' },
        { text: 'Faraday yasasını uygulayın (büyüklük):' },
        { text: 'Bölün ve çarpın:' },
        { text: 'Yönü Lenz yasası belirler: indüklenen akım, artışa karşı koyan kendi alanını yaratır.' },
      ],
      answer: 'Değişen alan $4\\ \\mathrm{V}$’luk bir EMF indükler — iki kalem pil kadar, hareketli bir mıknatıstan başka hiçbir şey kullanılmadan üretilmiş.',
    },
    questions: {
      'e9-p1': {
        prompt: '50 sarımlı bir bobin, 0.1 s içinde 0.02 Wb’lik akı değişimi yaşıyor. Hangi EMF indüklenir?',
        hints: [
          'Faraday yasasını kullanın: $\\text{EMF} = N\\,\\Delta\\Phi/\\Delta t$.',
          '$50 \\times 0.02 \\div 0.1$',
        ],
        explanation: '$\\text{EMF} = N\\,\\Delta\\Phi/\\Delta t = 50 \\times 0.02/0.1 = 10\\ \\mathrm{V}$.',
      },
      'e9-p2': {
        prompt: 'Çubuk bir mıknatısın kuzey kutbunu bobine doğru itiyorsunuz. Lenz yasasına göre, indüklenen akım bobinin yakın yüzünü…',
        choices: [
          'mıknatısı iten, itişinize direnen bir kuzey kutbuna dönüştürür',
          'mıknatısı çeken, işinize yarayan bir güney kutbuna dönüştürür',
          'düzensizce kuzey ve güney arasında gezdirir',
          'nötr tutar — bobinler kutup geliştiremez',
        ],
        hints: [
          'Lenz yasası: indüklenen akım, onu doğuran **değişime** karşı koyar.',
          'Mıknatısın K kutbundan gelen büyüyen alan, bobin üzerindeki eş değer bir K kutbuyla karşılanır.',
        ],
        explanation: 'Bobin, yaklaşan kuzey kutbuna kendi de kuzey kutbuna dönüşerek karşı koyar — mıknatısı iter. $\\text{EMF} = -N\\,\\Delta\\Phi/\\Delta t$’deki eksi işareti budur: üretmek için itmek zorundasınız.',
      },
      'e9-p3': {
        prompt: '0.5 m² alanlı tek bir halka, 2 s içinde 0.6 T’den 0.2 T’ye düşen bir alan içinde duruyor. İndüklenen EMF’yi bulun.',
        hints: [
          'Önce akı değişimini bulun: $\\Delta B = 0.4\\ \\mathrm{T}$ ile $\\Delta\\Phi = A\\,\\Delta B$.',
          '$\\text{EMF} = 1 \\times (0.5 \\times 0.4) \\div 2$',
        ],
        explanation: '$\\Delta\\Phi = 0.5 \\times 0.4 = 0.2\\ \\mathrm{Wb}$; öyleyse $\\text{EMF} = 0.2/2 = 0.1\\ \\mathrm{V}$. Daha az sarım ya da daha yavaş değişim, daha yumuşak voltajlar demektir.',
      },
      'e9-p4': {
        prompt: 'Bisiklet dinamosunun farı, daha hızlı pedal çevirdiğinizde daha parlak yanar çünkü…',
        choices: [
          'mıknatıs bobinin akısını daha hızlı değiştirir; öyleyse Faraday yasası daha büyük bir EMF verir',
          'teller ısınır ve akımı daha iyi taşır',
          'bobin yüksek hızda ek sarım kazanır',
          'hava direnci tellere ek yük iter',
        ],
        hints: [
          'Faraday yasası $\\Delta\\Phi/\\Delta t$’ye bağlıdır — daha hızlı pedal çevirdiğinizde ikisine de ne olur?',
          'Daha hızlı dönüş, aynı akı değişiminin daha kısa sürede olması demektir.',
        ],
        explanation: 'Daha hızlı pedal çevirmek, dinamo bobininden geçen akıyı daha çabuk değiştirir: $\\Delta\\Phi/\\Delta t$ büyür; öyleyse $\\text{EMF} = N\\,\\Delta\\Phi/\\Delta t$ büyür ve ampul parlar.',
      },
      'e9-q1': {
        prompt: '0.02 m² alanlı 100 sarımlı bir bobin, 0.5 s içinde 0’dan 0.5 T’ye yükselen bir alana dik duruyor. Hangi EMF indüklenir?',
        hints: [
          'Sarım başına akı değişimi: $\\Delta\\Phi = A\\,\\Delta B$.',
          '$\\text{EMF} = 100 \\times (0.02 \\times 0.5) \\div 0.5$',
        ],
        explanation: '$\\Delta\\Phi = 0.02 \\times 0.5 = 0.01\\ \\mathrm{Wb}$; öyleyse $\\text{EMF} = 100 \\times 0.01/0.5 = 2\\ \\mathrm{V}$.',
      },
      'e9-q2': {
        prompt: 'Düz bir tel halkası, manyetik alana **yan dönük** duruyor — alan çizgileri halkanın yüzünden geçmek yerine yüzeyi boyunca süzülüyor. Halkadan geçen akı…',
        choices: [
          'sıfırdır, çünkü $\\theta = 90°$ ve $\\cos 90° = 0$',
          'en büyüktür, çünkü alan güçlüdür',
          '$B\\,A$’ya eşittir',
          'negatiftir, çünkü alan yanlış yöne bakar',
        ],
        hints: [
          'Akı, yüzün **içinden** geçen alan çizgilerini sayar: $\\Phi = BA\\cos\\theta$.',
          'Yan dönük olmak, alanın yüzeye paralel olması demektir — yana çevrilmiş çembere gelen yağmur gibi.',
        ],
        explanation: 'Yan dönükken alan, halkanın yüzüne paraleldir; öyleyse $\\theta = 90°$ ve $\\Phi = BA\\cos 90° = 0$ — hiçbir çizgi içinden geçmez. (Ve akı, salt yön nedeniyle asla negatif olmaz; Lenz’in eksi işaretini alan şey yalnızca akının **değişimidir**.)',
      },
      'e9-q3': {
        prompt: 'Değişen bir alandaki bobin, N = 200 sarımla ve Δt = 1 s boyunca önce 2 V’luk bir EMF veriyor. Şimdi akı değişimi aynı tutuluyor ama bobin N = 400 sarımlı ve değişim 0.5 s’de oluyor. Yeni EMF nedir?',
        hints: [
          '$\\text{EMF} = N\\,\\Delta\\Phi/\\Delta t$ — $N$’yi ikiye katlamak EMF’yi ikiye katlar, $\\Delta t$’yi yarıya indirmek bir kez daha ikiye katlar.',
          'İki değişim de çarpılır: $2 \\times 2 \\times 2$.',
        ],
        explanation: 'EMF, $N/\\Delta t$ ile ölçeklenir: sarımı ikiye katlamak ($\\times 2$) ve süreyi yarıya indirmek ($\\times 2$), 2 V’u $2 \\times 2 \\times 2 = 8\\ \\mathrm{V}$ yapar (denetim: $400\\,\\Delta\\Phi/0.5 = 8\\,\\Delta\\Phi$ ve $\\Delta\\Phi = 0.01$ Wb).',
      },
      'e9-q4': {
        prompt: 'İndüksiyon ocağı, parlayan bir ısıtıcı olmadan tencereyi nasıl ısıtır?',
        choices: [
          'Hızla değişen bir manyetik alan, tencerenin metal tabanının içinde girdap akımları sürer ve elektrik direnci bu akımı ısıya çevirir',
          'Seramik bir plakanın altında gaz yakar',
          'Bir lamba gibi parlar ve ısıyı yukarı doğru yayar',
          'Tencereyi bir pil gibi ısınana dek şarj eder',
        ],
        hints: [
          'Ocak, iş başındaki Faraday yasasıdır — metalin içinde girdap gibi dönen minicik indüklenen akımları düşünün.',
          'O girdap akımları, tencerenin kendi içinde $I^2R$ ısısı dağıtır.',
        ],
        explanation: 'Camın altındaki bobin hızlı bir alternatif akım taşır; bu, tencerenin tabanında girdap gibi dönen **girdap akımlarını** indükleyen değişen bir akı yaratır. Tencereyi kendi direnci ısıtır — ocak soğuk kalır.',
      },
      'e9-q5': {
        prompt: 'Bir transformatör, enerjiyi demir bir çekirdek aracılığıyla iki bobin arasında taşır. Yalnızca alternatif akımla çalışması neden gereklidir?',
        choices: [
          'Durgun bir akım durgun bir akı yaratır ve Faraday yasası yalnızca **değişen** akıya yanıt verir',
          'AC, doğası gereği DC’den daha enerjiktir',
          'Demir çekirdek doğru akımı engeller ama alternatif akımı engellemez',
          'Akım sürekli yön değiştirmezse bobinler aşırı ısınır',
        ],
        hints: [
          '$\\text{EMF} = -N\\,\\Delta\\Phi/\\Delta t$’ye bakın: durgun bir akım için $\\Delta\\Phi$ kaçtır?',
          'Durgun akım → durgun akı → $\\Delta\\Phi/\\Delta t = 0$.',
        ],
        explanation: 'DC ile birincil bobin sabit bir akı yaratır; öyleyse $\\Delta\\Phi/\\Delta t = 0$ olur ve ikincil bobin hiçbir EMF görmez. AC, akıyı değişken tutar — transformatörün aktardığı mesajın tümü o değişen akıdır.',
      },
    },
  },
  'e10-ac-resonance': {
    title: 'AC Devreleri ve Rezonans',
    tagline: 'Seri bir RLC devresini, akımın havalanacağı tatlı noktaya ayarlayın.',
    objectives: [
      'Tepe ve rms (etkin) değerler arasında $V_{\\text{rms}} = V_0/\\sqrt{2}$ ile geçiş yapın',
      'Reaktansları $X_L = 2\\pi f L$, $X_C = 1/(2\\pi f C)$ ve empedans $Z$’yi hesaplayın',
      'Rezonans frekansını $f_0 = 1/(2\\pi\\sqrt{LC})$ ile bulun ve radyoların nasıl ayarlandığını açıklayın',
    ],
    concept: [
      { t: 'p', text: '**Alternatif akımda (AC)** voltaj bir sinüs dalgası gibi salınır — yukarı, aşağı, yukarı — saniyede 50 ya da 60 kez yön değiştirir. DC devrelerinde bu kadar sessiz duran bobinler ve kondansatörler, birdenbire frekansa bağlı bir direniş sergiler.' },
      { t: 'h', text: 'Tepe ve rms: dürüst voltaj' },
      { t: 'p', text: '“220 V”luk bir priz asla durup dinlenmez. Söylenen değer **rms** voltajıdır — aynı ısıtma gücünü verecek olan DC voltajı. Tepe değerin $\\sqrt{2} \\approx 1.414$’e bölümüdür:' },
      { t: 'formula', caption: '$V_0$ = tepe voltaj; 220 V rms, 50 Hz’lik bir priz $220\\sqrt{2} \\approx 311\\ \\mathrm{V}$’te tepelerken 120 V, 60 Hz’lik bir priz (Amerika) ≈ 170 V’te tepeler' },
      { t: 'h', text: 'Reaktans: bobinler ve kondansatörler AC’ye direnir' },
      { t: 'p', text: 'Bir bobin (endüktör) akımdaki **değişimlere** direnir; bu yüzden hızlı AC’ye en sert direnen odur. Kondansatör yük depolar; hızlı AC’yi kolayca geçirir ama yavaş AC’yi engeller. İkisinin “AC direnci”ne **reaktans** denir:' },
      { t: 'formula', caption: 'ikisi de ohm ($\\Omega$) cinsindendir; $X_L$ frekansla büyür, $X_C$ küçülür' },
      { t: 'table', headers: ['Büyüklük', 'Frekans iki katına çıkarsa', '$f \\to 0$ iken', '$f \\to \\infty$ iken'], rows: [
        ['$X_L = 2\\pi f L$', 'iki katına çıkar', '→ 0 (tel)', '→ ∞ (engeller)'],
        ['$X_C = 1/(2\\pi f C)$', 'yarıya iner', '→ ∞ (engeller)', '→ 0 (tel)'],
        ['$R$ (direnç, karşılaştırma için)', 'değişmez', 'değişmez', 'değişmez'],
      ] },
      { t: 'h', text: 'Empedans ve rezonansın tatlı noktası' },
      { t: 'formula', caption: 'empedans $Z$ ohm cinsinden, dirençle iki reaktansın **farkını** birleştirir — ikisi zıt yönlerde çeker' },
      { t: 'p', text: '$X_L$ frekansla yükselirken $X_C$ düştüğü için, ikisinin **birbirini götürdüğü** tam olarak bir frekans vardır: rezonans! Orada $Z = R$ (en küçük değeri) olur ve akım $I = V/Z$ en büyüğüne ulaşır:' },
      { t: 'formula', caption: 'seri bir RLC devresinin rezonans frekansı — yalnızca bobin ve kondansatör tarafından belirlenir' },
      { t: 'p', text: '**Radyonun ayarı** tam olarak böyledir: düğmeyi çevirmek $C$’yi değiştirir; $f_0$ istasyonun frekansıyla eşleşene dek. O zaman o istasyonun sinyali büyük bir akım sürerken ötekiler soluk kalır. Elektrik şebekeleri de aynı AC mekanizmasını kullanır: transformatörler voltajı iletim için yukarı çevirir (küçük akım → küçük $I^2R$ kablo kaybı), eviniz için de geri aşağı.' },
      { t: 'key', text: 'AC, frekansa bağlı bir iş birliği ekler: $X_L = 2\\pi fL$ büyür, $X_C = 1/(2\\pi fC)$ küçülür ve birbirini götürdükleri yerde ($f_0 = 1/2\\pi\\sqrt{LC}$) empedans $R$’ye düşer, akım zirve yapar — tek keskin, ayarlanabilir tatlı nokta.' },
    ],
    example: {
      title: 'Bir radyo devresini ayarlamak',
      problem: 'Bir radyo ayar devresinde $L = 2\\ \\mathrm{mH}$ ve $C = 500\\ \\mathrm{pF}$ var. Rezonans frekansını ve 1 kHz’lik bir sinyal geldiğinde endüktif reaktansı bulun.',
      steps: [
        { text: 'SI birimlerine çevirin:' },
        { text: '$LC$ çarpımını elde etmek için çarpın:' },
        { text: 'Rezonans formülünü uygulayın:' },
        { text: 'Bobinin 1 kHz’deki reaktansı:' },
        { text: 'Yorum: $f_0$’da kondansatörün $X_C$’si $X_L$’ye eşittir; ikisi birbirini götürür, $Z = R$ olur ve istasyonun akımı zirve yapar — ayar budur.' },
      ],
      answer: 'Devre $f_0 \\approx 159\\ \\mathrm{kHz}$’te rezonansa girer — düğmeyi oraya çevirin; o istasyon gürül gürül çalarken komşuları sessiz kalır. 1 kHz’de bobin tek başına $X_L \\approx 12.6\\ \\Omega$ ile direnir.',
    },
    questions: {
      'e10-p1': {
        prompt: 'Avrupa tipi bir priz $V_0 = 311$ V tepe değeri veriyor. Rms voltajı (priz üzerinde yazan değer) kaçtır?',
        hints: [
          '$V_{\\text{rms}} = V_0/\\sqrt{2}$ kullanın.',
          '$311 \\div 1.414$',
        ],
        explanation: '$V_{\\text{rms}} = 311/\\sqrt{2} \\approx 220\\ \\mathrm{V}$ — “220 V” etiketi rms değerdir; durgun 220 V DC gibi ısıttığı için seçilmiştir.',
      },
      'e10-p2': {
        prompt: 'Bir kondansatörü besleyen AC kaynağın frekansını ikiye katıyorsunuz. Kapasitif reaktans $X_C$’ye ne olur?',
        choices: [
          'Yarıya iner — kondansatör yüksek frekansları daha kolay geçirir',
          'İki katına çıkar',
          'Aynı kalır',
          'Sıfıra düşer',
        ],
        hints: [
          '$X_C = 1/(2\\pi fC)$’ye bakın: frekans paydadadır.',
          '$f$’yi ikiye katlayın → $X_C$ 2’ye bölünür.',
        ],
        explanation: '$X_C = 1/(2\\pi fC)$ frekansla ters orantılıdır; öyleyse $f$’yi ikiye katlamak $X_C$’yi yarıya indirir — kondansatörler hızlı AC için açık kapı, yavaş AC için tuğla duvardır.',
      },
      'e10-p3': {
        prompt: '0.1 H’lik bir bobinin 50 Hz’deki reaktansı kaçtır?',
        hints: [
          '$X_L = 2\\pi f L$ kullanın.',
          '$2\\pi \\times 50 \\times 0.1 \\approx 6.283 \\times 5$',
        ],
        explanation: '$X_L = 2\\pi fL = 2\\pi \\times 50 \\times 0.1 \\approx 31.4\\ \\Omega$ — şebeke frekansı, büyük bobinlerin gerçekten direnmeye başladığı yerdir.',
      },
      'e10-p4': {
        prompt: 'Tam kendi rezonans frekansında sürülen seri bir RLC devresinde…',
        choices: [
          '$X_L$ ile $X_C$ birbirini götürür; öyleyse $Z = R$ olur ve akım en büyük değerine ulaşır',
          'elemanlar birbirini götürdüğü için akım sıfıra düşer',
          'direnç kendini devreden çıkarır',
          'kondansatör tüm enerjiyi kalıcı olarak depolar',
        ],
        hints: [
          'Rezonansta $X_L = X_C$ — $Z = \\sqrt{R^2 + (X_L - X_C)^2}$ ifadesinde geriye ne kalır?',
          'En küçük $Z$, en büyük $I = V/Z$ demektir.',
        ],
        explanation: '$f_0$’da: $X_L = X_C$; öyleyse $(X_L - X_C) = 0$ ve $Z = R$. En küçük olası empedansla $I = V/R$, kaynağın bu devreden asla aşamayacağı en büyük akımdır.',
      },
      'e10-q1': {
        prompt: 'Bir ayar devresi $L = 1\\ \\mathrm{mH}$ ve $C = 1\\ \\mathrm{nF}$ kullanıyor. Rezonans frekansı $f_0$’ı bulun (kHz cinsinden).',
        hints: [
          '$LC = 10^{-3} \\times 10^{-9} = 10^{-12}\\ \\mathrm{s^2}$; öyleyse $\\sqrt{LC} = 10^{-6}\\ \\mathrm{s}$.',
          '$f_0 = 1/(2\\pi\\times10^{-6})$ Hz — sonra kHz’e çevirin.',
        ],
        explanation: '$f_0 = \\dfrac{1}{2\\pi\\sqrt{10^{-12}}} = \\dfrac{1}{2\\pi\\times10^{-6}} \\approx 159{,}000\\ \\mathrm{Hz} = 159\\ \\mathrm{kHz}$ — tam uzun/orta dalga radyo bandının içinde.',
      },
      'e10-q2': {
        prompt: 'Priz üzerindeki “220 V rms” etiketi şu anlama gelir…',
        choices: [
          'durgun bir 220 V DC kaynakla aynı ortalama ısıtma gücünü verir',
          'voltaj tam 220 V’te tepeler',
          'voltaj her an tam olarak 220 V’tur',
          '220 V, döngünün en küçük voltajıdır',
        ],
        hints: [
          '“rms” = karekök ortalama kare — güce eşdeğer DC değeri.',
          'Gerçek tepe değer $220\\sqrt{2} \\approx 311$ V’tur.',
        ],
        explanation: 'RMS voltaj, bir direnci aynı biçimde ısıtacak DC voltajıdır: ortalama $P = V_{\\text{rms}}^2/R$. Anlık voltaj $-311$ V ile $+311$ V arasında salınır ama güç, durgun 220 V ile aynıdır.',
      },
      'e10-q3': {
        prompt: '$R = 50\\ \\Omega$’luk seri bir RLC devresi, 10 V rms’lik bir kaynakla tam rezonansta sürülüyor. Ne kadar rms akımı akar?',
        hints: [
          'Rezonansta $Z = R$.',
          '$I = V/Z = 10/50$',
        ],
        explanation: 'Rezonansta $Z = R = 50\\ \\Omega$; öyleyse $I = V/Z = 10/50 = 0.2\\ \\mathrm{A}$ — bu devrenin izin verdiği en büyük akım.',
      },
      'e10-q4': {
        prompt: 'Hangi eleman YÜKSEK frekanslı AC’yi en çok engeller?',
        choices: [
          'Bir bobin — reaktansı $X_L = 2\\pi fL$ frekansla büyür',
          'Bir kondansatör — reaktansı o da frekansla büyür',
          'Düz bir direnç',
          'Ne biri ne öteki: ikisi de yüksek frekansları en iyi geçirir',
        ],
        hints: [
          'Eğilim tablosunu denetleyin: $X_L \\propto f$ ama $X_C \\propto 1/f$.',
          'Bobinler akımdaki hızlı değişimlere direnir.',
        ],
        explanation: '$X_L = 2\\pi fL$ frekansla büyür; öyleyse bobinler yüksek frekansları boğar (DC’yi de serbestçe geçirir). Kondansatörler tam tersini yapar, çünkü $X_C = 1/(2\\pi fC)$.',
      },
      'e10-q5': {
        prompt: 'Elektrik şebekeleri elektriği neden çok yüksek voltajla ve AC kullanarak taşır?',
        choices: [
          'Aynı güç için akım daha küçüktür; öyleyse $I^2R$ kablo kayıpları küçülür — ayrıca transformatörler (değişen akıya gereksinim duyar) AC voltajlarını kolayca yukarı-aşağı çevirebilir',
          'Yüksek voltaj kabloları hafifletir',
          'Yüksek voltajda elektronlar daha hızlı yol alır; öyleyse enerji daha erken varır',
          'Santraller basitçe düşük voltaj üretmeye elverişli değildir',
        ],
        hints: [
          'İletim kaybı $P = I^2R$’dir — sabit güç $P = VI$ için $V$ yükselince $I$’ya ne olur?',
          'Transformatörler Faraday yasası makineleridir: yalnızca akı değişmeye devam ettiğinde, yani AC ile çalışırlar.',
        ],
        explanation: 'Kocaman $V$ ile $P = VI$ göndermek minicik $I$ demektir ve kablo ısıtması $I^2R$ çöker. Yeniden çevrilebilen tek akım türü AC’dir — transformatörler Faraday’ın değişen-akı yasası üzerine kurulu aygıtlardır — bu yüzden şebekeler AC üretir, taşır ve dağıtır.',
      },
    },
  },
}

export default ov
