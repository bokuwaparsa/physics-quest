// ─── Physics Quest · Turkish (tr) overlay · part-17: o5, o6, o7 ───────────────
import type { LessonOvFile } from '../schema'

const ov: LessonOvFile = {
  'o5-em-spectrum': {
    title: 'Elektromanyetik Tayf',
    tagline: 'Radyodan gamaya tek bir dalga ailesi — ışığın cetveline binin.',
    objectives: [
      'Işığı elektromanyetik bir dalga olarak tanımlayın ve $c = f\\lambda$’yı kullanın',
      'Tayfın yedi bandını dalga boyuna göre sıralayın; her biri için bir kullanım ve bir tehlike verin',
      'Foton enerjisini $E = hf$ ile hesaplayın ve daha yüksek frekansın daha enerjik fotonlar demek olduğunu açıklayın',
    ],
    concept: [
      { t: 'p', text: 'Bir lambayı açın ve oda dalgalanmayla dolar — su dalgası değil, **alan** dalgasıyla. **Işık bir elektromanyetik (EM) dalgadır**: uzayda yarışırken birlikte salınan bir elektrik alanı ve bir manyetik alan. Maddeye gereksinim yoktur; ışık boşluktan geçer, Güneş’ten cildinize ulaşır.' },
      { t: 'h', text: 'Maxwell’ın büyük sezgisi' },
      { t: 'p', text: 'James Clerk Maxwell, **değişen bir elektrik alanının manyetik alan yarattığını** ve **değişen bir manyetik alanın elektrik alan yarattığını** gördü. Her alan diğerini sürekli yeniden üretir; böylece ikili, kendini besleyen bir dalga olarak evren boyunca kendi peşinden koşar — ve Maxwell’ın denklemleri hızını tam olarak öngördü: ışık hızı.' },
      { t: 'formula', caption: 'hız $c$ (m/s), frekans $f$ (Hz), dalga boyu $\\lambda$ (m) — boşluktaki her EM dalgası için geçerlidir' },
      { t: 'p', text: '“Işık” dediğimiz şey, devasa bir ailenin yalnızca bir dilimidir. Bantlar yalnızca dalga boyu $\\lambda$’da ve dolayısıyla frekansta farklıdır: radyo dalgaları metrelerce uzunluğundayken X ışınları bir atomdan incedir. Bu fark, nasıl üretildiklerini, nasıl kullanıldıklarını ve neden korkulduklarını baştan sona değiştirir.' },
      { t: 'h', text: 'Tayfa bir bakışta' },
      { t: 'table', headers: ['Bant', 'Dalga boyu', 'Tipik kullanım', 'Tehlike'], rows: [
        ['Radyo', '> 1 m', 'Yayıncılık, MR, radyoastronomi', 'Çok güçlü alanlar dokuyu ısıtır'],
        ['Mikrodalga', '1 mm – 1 m (≈ cm)', 'Fırın, radar, Wi-Fi', 'Yüksek güçte dokuyu pişirir'],
        ['Kızılötesi (IR)', '700 nm – 1 mm', 'Kumandalar, termal kameralar, ısı lambaları', 'Güçlü huzme cildi yakar'],
        ['Görünür', '400 – 700 nm', 'Görme, lazerler, fiber optik', 'Parlak huzme göze zarar verir'],
        ['Morötesi (UV)', '10 – 400 nm', 'Sterilizasyon, bronzlaştırma, floresans', 'Güneş yanığı, cilt kanseri'],
        ['X ışını', '10 pm – 10 nm', 'Tıbbi görüntüleme, güvenlik taraması', 'İyonlaştırıcı — kanser riski'],
        ['Gama', '< 10 pm', 'Kanser tedavisi, ekipman sterilizasyonu', 'İyonlaştırıcı — öldürücü'],
      ] },
      { t: 'p', text: 'Daha kısa dalga boyu aynı zamanda **foton başına daha fazla enerji** demektir (“foton” ışığın bir paketidir — modern fizik ünitesinde daha ayrıntılı göreceğiz). Enerji frekansla tırmanır:' },
      { t: 'formula', caption: '$h = 6.63\\times10^{-34}\\ \\mathrm{J\\,s}$ — Planck sabiti; bu kısayol enerjiyi elektronvolt cinsinden verir' },
      { t: 'p', text: 'Böylece bir kırmızı foton ($620\\ \\mathrm{nm}$) yaklaşık $2\\ \\mathrm{eV}$ taşırken bir gama fotonu milyonlarca eV taşıyabilir. UV’nin, X ışınlarının ve gamanın tehlikeli olması bundandır: fotonları, hücrelerinizdeki moleküllerden elektronları koparabilir. **Atmosfer pencereleri**: hava, radyoya ve görünür ışığa (ve kısmen kızılötesine) saydamdır ama UV’nin, X ışınlarının ve gamanın çoğunu yutar — X ışını teleskoplarının uzayda uçmak zorunda kalmasının, radyo teleskoplarının ise rahatça yeryüzünde oturmasının nedeni budur.' },
      { t: 'key', text: 'Işık, $c = f\\lambda = 3\\times10^{8}\\ \\mathrm{m/s}$ hızlı bir EM dalgasıdır. Radyo → gama, dalga boyuna göre sıralanmış tek bir ailedir; foton enerjisi $E = hf$ frekansla artar ve kısa dalga boylu ucu iyonlaştırıcı ve tehlikeli kılar.' },
    ],
    example: {
      title: 'Yeşil ışığın frekansı ve foton enerjisi',
      problem: 'Yeşil ışığın dalga boyu 550 nm’dir. Frekansı nedir ve bir foton ne kadar enerji taşır?',
      steps: [
        { text: 'Dalga boyunu metreye çevirin:' },
        { text: '$c = f\\lambda$’yı frekans için düzenleyin:' },
        { text: 'Bölün:' },
        { text: '$E = hf$’den foton enerjisi:' },
        { text: 'Elektronvotta ifade edin ($1\\ \\mathrm{eV} = 1.6\\times10^{-19}\\ \\mathrm{J}$):' },
      ],
      answer: 'Yeşil ışık $5.45\\times10^{14}\\ \\mathrm{Hz}$ ($545\\ \\mathrm{THz}$) ile salınır ve her foton yaklaşık $2.25\\ \\mathrm{eV}$ taşır — kısayol $1240/550 = 2.25\\ \\mathrm{eV}$ ile de doğrulandı. Karşılaştırma için, 100 MHz’lik bir FM istasyonunun $\\lambda = 3\\ \\mathrm{m}$’dir: radyo dalgaları bir milyar kat uzundur.',
    },
    questions: {
      'o5-p1': {
        prompt: 'Bir FM radyo istasyonu 100 MHz ($1\\times10^{8}\\ \\mathrm{Hz}$) ile yayın yapar. Dalga boyu nedir?',
        hints: [
          '$c = f\\lambda$’yı $\\lambda = c/f$ biçimine getirin.',
          '$3\\times10^{8} \\div 1\\times10^{8} = 3$.',
        ],
        explanation: '$\\lambda = c/f = 3\\times10^{8}\\ \\mathrm{m/s} \\div 1\\times10^{8}\\ \\mathrm{Hz} = 3\\ \\mathrm{m}$ — FM dalgaları kabaca bir otomobil boyundadır.',
      },
      'o5-p2': {
        prompt: 'Hangi bandın dalga boyu en kısadır?',
        choices: ['Radyo dalgaları', 'Mikrodalgalar', 'X ışınları', 'Gama ışınları'],
        hints: [
          'Tayfı uzun‑kısa sıralayın: radyo, mikrodalga, IR, görünür, UV, X ışını…',
          'En kısa dalgalar atom çekirdeklerinin içinden gelir.',
        ],
        explanation: 'Gama ışınları ($\\lambda < 10\\ \\mathrm{pm}$) en kısa EM dalgalarıdır — bir atomdan çok daha ince — buna karşılık radyo dalgaları bir metreyi aşar.',
      },
      'o5-p3': {
        prompt: 'Koyu kırmızı ışığın dalga boyu 620 nm’dir. Foton enerjisini eV cinsinden bulmak için $E(\\mathrm{eV}) \\approx 1240/\\lambda(\\mathrm{nm})$’yi kullanın.',
        hints: [
          '$\\lambda$’yı nanometre alarak $E \\approx 1240/\\lambda$ kısayolunu kullanın.',
          '$1240 \\div 620$.',
        ],
        explanation: '$E = 1240/620 = 2.0\\ \\mathrm{eV}$ — her kırmızı foton yaklaşık 2 elektronvolt taşır; görebildiğiniz en az enerjili ışık budur.',
      },
      'o5-p4': {
        prompt: 'Radyo teleskopları yeryüzünde sorunsuz çalışır ama X ışını teleskopları uzaya uçmalıdır. Neden?',
        choices: [
          'X ışınları yeryüzüne ulaşamayacak kadar zayıftır',
          'Atmosfer X ışınlarını yutar — yalnızca radyo ve görünür ışık “pencerelerinden” geçer',
          'X ışınları bulutlardan yansır ve asla geçemez',
          'X ışınları uzayda daha hızlı yol alır, teleskopları geride bırakır',
        ],
        hints: [
          'Atmosferi birkaç “penceresi” olan bir filtre gibi düşünün.',
          'Hava hangi bantları geçirir, hangilerini yutar?',
        ],
        explanation: 'Hava radyoya ve görünür ışığa saydamdır ama UV’yi, X ışınlarını ve gamayı yutar; bu yüzden uzay teleskopları onları yakalamak için atmosferin üzerinde uçmalıdır.',
      },
      'o5-q1': {
        prompt: 'Yeşil ışık $\\lambda = 550\\ \\mathrm{nm}$’dir. THz cinsinden frekansı nedir ($1\\ \\mathrm{THz} = 10^{12}\\ \\mathrm{Hz}$)?',
        hints: [
          '$\\lambda = 5.5\\times10^{-7}\\ \\mathrm{m}$ ile $f = c/\\lambda$’yı kullanın.',
          '$3\\times10^{8} \\div 5.5\\times10^{-7} = 5.45\\times10^{14}\\ \\mathrm{Hz}$ — THz’ye çevirin.',
        ],
        explanation: '$f = 3\\times10^{8}/5.5\\times10^{-7} = 5.45\\times10^{14}\\ \\mathrm{Hz} = 545\\ \\mathrm{THz}$.',
      },
      'o5-q2': {
        prompt: 'Foton başına en çok enerjiyi hangi fotonlar taşır?',
        choices: ['Radyo fotonları', 'Görünür fotonlar', 'Morötesi fotonlar', 'Gama fotonları'],
        hints: [
          '$E = hf$’yi hatırlayın — enerji frekansla büyür.',
          'En yüksek frekanslı bant en kısa dalga boylarında durur.',
        ],
        explanation: '$E = hf$’ten, en yüksek frekans — gama ışınları — foton başına en çok enerjiyi taşır; tam olarak gama ışınlarını iyonlaştırıcı ve tehlikeli kılan da budur.',
      },
      'o5-q3': {
        prompt: 'Noktadan noktaya bir mikrodalga bağlantısı 6 GHz ($6\\times10^{9}\\ \\mathrm{Hz}$) ile çalışır. cm cinsinden dalga boyu nedir?',
        hints: [
          '$\\lambda = c/f$, sonra metreyi santimetreye çevirin ($1\\ \\mathrm{m} = 100\\ \\mathrm{cm}$).',
          '$3\\times10^{8} \\div 6\\times10^{9} = 0.05\\ \\mathrm{m}$.',
        ],
        explanation: '$\\lambda = 3\\times10^{8}/6\\times10^{9} = 0.05\\ \\mathrm{m} = 5\\ \\mathrm{cm}$ — mikrodalgaların bu tipik boyutları, çanak antenleri pratik kılar.',
      },
      'o5-q4': {
        prompt: 'Görünür ışık kabaca… aralığına yayılır',
        choices: ['4 – 7 m', '400 – 700 μm', '400 – 700 nm', '0.4 – 0.7 pm'],
        hints: [
          'Bir insan kılı yaklaşık 80 μm kalınlığındadır — görünür dalgalar çok daha incedir.',
          'Kızılötesi (700 nm – 1 mm) ile morötesi (10 – 400 nm) arasında kalan bant.',
        ],
        explanation: 'Görünür ışık yaklaşık 400 nm’deki mordan yaklaşık 700 nm’deki kırmızıya uzanır — tüm tayfın ustura gibi ince bir dilimi.',
      },
      'o5-q5': {
        prompt: 'Bir gama ışını $\\lambda = 2\\ \\mathrm{pm} = 0.002\\ \\mathrm{nm}$’dir. $E(\\mathrm{eV}) \\approx 1240/\\lambda(\\mathrm{nm})$’yi kullanarak foton enerjisini keV cinsinden bulun ($1\\ \\mathrm{keV} = 1000\\ \\mathrm{eV}$).',
        hints: [
          'Önce kısayolla enerjiyi eV cinsinden alın, sonra 1000’e bölün.',
          '$1240 \\div 0.002 = 620{,}000\\ \\mathrm{eV}$.',
        ],
        explanation: 'Foton başına $E = 1240/0.002 = 620{,}000\\ \\mathrm{eV} = 620\\ \\mathrm{keV}$ — görünür bir fotonun yüz binlerce katı; gama ışınlarının bu denli tehlikeli olmasının nedeni.',
      },
    },
  },
  'o6-interference': {
    title: 'Işığın Girişimi',
    tagline: 'İki huzmeyi üst üste binince aydın + karanlığın ne yaptığını izleyin… karanlığı!',
    objectives: [
      'Tutarlılığı (koherez) ve kararlı saçaklar için neden gerektiğini açıklayın',
      'Aydın saçaklar için $d\\sin\\theta = m\\lambda$’yı, karanlıklar için $(m+\\tfrac{1}{2})\\lambda$’yı kullanın',
      'Saçak aralığını $\\Delta y = \\lambda L/d$ ile hesaplayın ve nasıl değişeceğini öngörün',
    ],
    concept: [
      { t: 'p', text: 'Bir gölete iki çakıl taşı atın ve halka desenlerinin kesişişini izleyin: iki tepe buluştuğunda su yukarı fışkırır; tepeyle çukur buluştuğunda yüzey düzleşir. **Işık da aynen böyle yapar** — üst üste binen dalgalar toplanır ya da yok olur. Bu *girişimdir* ve küçük parçacıklar akışı için imkânsızdır. Işık bir dalga olmak zorundadır.' },
      { t: 'h', text: 'Tutarlılık: gizli malzeme' },
      { t: 'p', text: 'Girişim saçakları yalnızca iki kaynağın **sabit bir faz ilişkisi** korumasıyla yerinde kalır — *tutarlı* olmalıdırlar. Rastgele iki lamba birbirini siler; bu yüzden Thomas Young (1801) zekice davranıp **tek** bir dalga cephesinin **iki dar yarıktan** geçmesine izin verdi: çıkan iki huzme ikiz kardeştir, kusursuz adım adımdır.' },
      { t: 'h', text: 'Yol farkı aydınlığı ya da karanlığı belirler' },
      { t: 'p', text: 'Yarıklardan $\\theta$ açısında bir huzme fazladan bir yol düşer. Fazladan yol tam sayıda dalga boyuysa tepeler birlikte varır — bir **aydın saçak**. Yarım dalga boyu kaymışsa tepe çukurla buluşur — bir **karanlık saçak**:' },
      { t: 'formula', caption: 'yarık aralığı $d$ (m), mertebe numarası $m = 0, 1, 2, \\dots$, dalga boyu $\\lambda$ (m)' },
      { t: 'p', text: '$L$ uzaktaki bir ekranda aydın saçaklar eşit aralıklarla dizilir. Komşu iki aydın saçak arasındaki açıklık **saçak aralığıdır**:' },
      { t: 'formula', caption: 'büyük $\\lambda$ ya da büyük $L$ saçakları açar; büyük yarık aralığı $d$ onları birbirine sıkar' },
      { t: 'p', text: 'Yani **daha geniş yarık aralığı → daha ince saçaklar**, **daha kısa dalga boyu → yine daha ince saçaklar** — mavi saçaklar kırmızıdan daha sıkışıktır.' },
      { t: 'h', text: 'İnce filmler: yıkanabilir girişim' },
      { t: 'p', text: 'Sabun baloncukları, ışık filmin **hem dış hem iç yüzeyinden** yansıdığı için ışıldar. İki yansıma üst üste biner: biri yarım dalga boyu ters dönebilir ($\\lambda/2$ faz çevrimi) ve filmin içinden geçiş fazladan yol ekler. Film boşaldıkça ve kalınlığı değiştikçe renkler aydınlıktan karanlığa ve geriye döner — hiçbir pigment yoktur. Gözlüklerdeki parlama önleyici kaplamalar aynı hileyi kullanır.' },
      { t: 'key', text: 'Young’ın çift yarıkları ışığın dalga olduğunu kanıtlar: tutarlı huzmeler $d\\sin\\theta = m\\lambda$’da aydın saçak, $(m+\\tfrac{1}{2})\\lambda$’da karanlık verir; ekranda aralıkları $\\Delta y = \\lambda L/d$’dir.' },
    ],
    example: {
      title: 'Ekrandaki saçak aralığı',
      problem: 'Aralığı 0.1 mm olan bir çift yarık 550 nm yeşil ışıkla aydınlatılıyor. Ekran 2 m uzaktadır. Aydın saçaklar birbirinden ne kadar uzaktır?',
      steps: [
        { text: 'Bilinenleri metre cinsinden yazın:' },
        { text: 'Saçak aralığı formülünü kullanın:' },
        { text: 'Önce paydayı çarpın:' },
        { text: 'Yarık aralığına bölün:' },
        { text: 'Milimetreye çevirin:' },
      ],
      answer: 'Aydın saçaklar $11\\ \\mathrm{mm}$ aralıklıdır — odanın öbür ucundan duvarda görülebilirler. Yarık aralığı yarıya inse $22\\ \\mathrm{mm}$’ye açılırlardı.',
    },
    questions: {
      'o6-p1': {
        prompt: '500 nm dalga boylu ışık, aralığı 0.25 mm olan bir çift yarığa düşer; ekran 2 m uzaktadır. Saçak aralığını bulun.',
        hints: [
          'Tüm uzunlukları metre alarak $\\Delta y = \\lambda L/d$’yi kullanın.',
          '$5\\times10^{-7} \\times 2 \\div 2.5\\times10^{-4}$ — sonra mm’ye çevirin.',
        ],
        explanation: '$\\Delta y = \\lambda L/d = 5\\times10^{-7} \\times 2 / 2.5\\times10^{-4} = 4\\times10^{-3}\\ \\mathrm{m} = 4\\ \\mathrm{mm}$.',
      },
      'o6-p2': {
        prompt: 'Çift yarığı aralığı $d$’nin iki katı olanla değiştiriyorsunuz. Desen ne olur?',
        choices: [
          'Saçaklar iki kat uzaklaşır',
          'Saçaklar yarı kadar yakınlaşır',
          'Desen değişmez',
          'Saçaklar tamamen kaybolur',
        ],
        hints: [
          '$\\Delta y = \\lambda L/d$’ye bakın — $d$’yi iki katına çıkarmak ne yapar?',
          '$\\Delta y$, $d$ ile ters orantılıdır.',
        ],
        explanation: '$\\Delta y = \\lambda L/d$ olduğundan, $d$’nin iki katı aralığı yarıya indirir: saçaklar birbirine sıkışır ve incelmiş görünür.',
      },
      'o6-p3': {
        prompt: '600 nm ışığın 2. aydın saçağı ($m = 2$) için iki huzme arasındaki yol farkı (nm) nedir?',
        hints: [
          'Aydın saçaklar $m$ tam dalga boylu yol farkı ister.',
          '$2 \\times 600$.',
        ],
        explanation: '$m$ mertebeli bir aydın saçağın yol farkı $m\\lambda = 2 \\times 600\\ \\mathrm{nm} = 1200\\ \\mathrm{nm}$’dir — tam iki ekstra dalga boyu.',
      },
      'o6-p4': {
        prompt: 'Kararlı bir saçak deseni için iki yarığın neden tutarlı biçimde aydınlatılması gerekir?',
        choices: [
          'Işığı parlaklaştırmak için',
          'İki dalganın sabit bir faz ilişkisi koruması ve saçakların yerinde kalması için',
          'Işığı kutuplaştırmak için',
          'İki yarığın eşit ısınması için',
        ],
        hints: [
          'İki kaynak rastgele içeri-dışarı faz kayarsa ne olur?',
          'Young TEK kaynağı ikiye böldü — neden?',
        ],
        explanation: 'Tutarlı kaynaklar sabit bir faz ilişkisi korur; tepelerin tepeyle buluştuğu yer hiç değişmez. Bu yoksa aydın ve karanlık lekeler titrer ve ortalamaları düzgün bir ışığa dönüşür.',
      },
      'o6-q1': {
        prompt: '$d = 0.2\\ \\mathrm{mm}$ aralıklı bir çift yarık 600 nm ışıkla aydınlatılıyor; ekran $L = 1.5\\ \\mathrm{m}$ uzaktadır. Saçak aralığını mm cinsinden bulun.',
        hints: [
          '$\\Delta y = \\lambda L/d$’yi kullanın.',
          '$6\\times10^{-7} \\times 1.5 \\div 2\\times10^{-4}$ — sonra mm’ye çevirin.',
        ],
        explanation: '$\\Delta y = 6\\times10^{-7} \\times 1.5 / 2\\times10^{-4} = 4.5\\times10^{-3}\\ \\mathrm{m} = 4.5\\ \\mathrm{mm}$.',
      },
      'o6-q2': {
        prompt: 'Karanlık saçaklar, iki huzme arasındaki yol farkı … olduğu yerde belirir',
        choices: [
          'tam sayıda dalga boyu, $m\\lambda$',
          'bir yarım tamsayı, $(m+\\tfrac{1}{2})\\lambda$',
          'her zaman tam sıfır',
          'yarık aralığının iki katı, $2d$',
        ],
        hints: [
          'Karanlık, tepenin çukurla buluşması demektir — bunu hangi kayma sağlar?',
          'Yarım dalga boyu kayma dalgaları ters fazlı yapar.',
        ],
        explanation: '$(m+\\tfrac{1}{2})\\lambda$ yol farkı, bir dalgayı yarım dalga boyu kaydırır; tepe çukurla buluşur ve dalgalar karanlığa kadar yok olur.',
      },
      'o6-q3': {
        prompt: '$\\lambda = 500\\ \\mathrm{nm}$, $d = 0.5\\ \\mathrm{mm}$ ve $L = 2\\ \\mathrm{m}$ için saçak aralığı mm cinsinden nedir?',
        hints: [
          'Her şey metre cinsinden olmak üzere $\\Delta y = \\lambda L/d$.',
          '$5\\times10^{-7} \\times 2 \\div 5\\times10^{-4}$.',
        ],
        explanation: '$\\Delta y = 5\\times10^{-7} \\times 2 / 5\\times10^{-4} = 2\\times10^{-3}\\ \\mathrm{m} = 2\\ \\mathrm{mm}$ — geniş 0.5 mm yarık aralığı saçakları sıkıca sıkar.',
      },
      'o6-q4': {
        prompt: 'Sabun baloncukları yavaş yavaş değişen renklerle ışıldar çünkü…',
        choices: [
          'sabun floresandır',
          'dış ve iç film yüzeylerinden yansıyan ışık üst üste biner ve değişen film kalınlığı girişimi kaydırır',
          'baloncuk öyle hızlı döner ki renkler bulanıklaşır',
          'renkler prizmadaki gibi kırılır',
        ],
        hints: [
          'İki yansıma olur — filmin her yüzeyinden bir tane.',
          'Film zamanla boşalıp incelir — bu neyi değiştirir?',
        ],
        explanation: 'İki yansıma girişim yapar; yerçekimi filmi boşaldıkça kalınlığı değişir, böylece yapısal olarak toplanan dalga boyları sürekli değişir — işte dönen renkler.',
      },
      'o6-q5': {
        prompt: '480 nm mavi ışık, $d = 0.1\\ \\mathrm{mm}$ aralıklı yarıklardan geçer; ekran $2\\ \\mathrm{m}$ uzaktadır. Saçak aralığını mm cinsinden bulun.',
        hints: [
          '$\\Delta y = \\lambda L/d$.',
          '$4.8\\times10^{-7} \\times 2 \\div 1\\times10^{-4}$.',
        ],
        explanation: '$\\Delta y = 4.8\\times10^{-7} \\times 2 / 1\\times10^{-4} = 9.6\\times10^{-3}\\ \\mathrm{m} = 9.6\\ \\mathrm{mm}$ — mavi saçaklar, 550 nm yeşilin 11 mm’sinden daha yakındır.',
      },
    },
  },
  'o7-diffraction': {
    title: 'Kırınım ve Kırınım Ağları',
    tagline: 'Işık köşelerin arkasına sıvışır — ve ağlar onu gökkuşaklarına çevirir.',
    objectives: [
      'Tek yarığın karanlık noktalarını $a\\sin\\theta = m\\lambda$ ile bulun ve dar yarığı daha geniş yayılımla ilişkilendirin',
      'Ağ mertebe açılarını $d\\sin\\theta = m\\lambda$ ile bulun ve görülebilen mertebeleri sayın',
      'Çözünürlük sınırını $\\theta \\approx 1.22\\lambda/D$ açıklayın ve büyük teleskopların neden daha ince ayrıntı gördüğünü anlatın',
    ],
    concept: [
      { t: 'p', text: 'Su dalgaları liman ağzından sıkışarak geçer ve körfeze yelpaze gibi yayılır; ses kapı çerçevesinin ardına kıvrılır, böylece görmediğiniz birini duyabilirsiniz. **Kırınım**, dalgaların bir kenardan ya da boşluktan geçtikten sonra yayılmasıdır — ve dalga olan ışık da bunu yapar. Gölgelerin kenarlarının asla ustura gibi keskin olmamasının nedeni budur.' },
      { t: 'h', text: 'Tek bir dar yarıktan ışık' },
      { t: 'p', text: 'Işığı genişliği $a$ olan bir yarıktan geçirin; huzme, geniş bir orta bant ve daha sönük yan bantlara yayılır. **Karanlık noktalar** (minima) şöyle:' },
      { t: 'formula', caption: 'yarık genişliği $a$ (m) — ışık, ilk karanlık nokta için $\\sin\\theta \\approx \\lambda/a$ olan yerde en çok yayılır' },
      { t: 'p', text: '**Daha dar yarık → daha geniş yayılım**, çünkü $a$ küçüldükçe $\\sin\\theta_1 = \\lambda/a$ büyür. $L$ uzaktaki bir ekranda aydın orta bant kabaca $2\\lambda L/a$ genişliğindedir. $\\lambda$’yı günlük boyutlarla karşılaştırın: 0.1 mm’lik bir yarığa karşı 550 nm, yalnızca ~0.3°’lik bir yayılım verir — küçük ama ölçülebilir; yarık dalga boyuna doğru daralırsa devasa olur.' },
      { t: 'h', text: 'Kırınım ağları: çok yarık, ustura gibi keskin mertebeler' },
      { t: 'p', text: 'Bir **kırınım ağı**, milimetre başına binlerce yarığın işlendiği bir lamdır. Her yarık katkı sunar ve dalgalar yalnızca yolları tam dalga boyları kadar farklı olan açılarda anlaşır — böylece geniş bantlar yerine ustura gibi keskin **aydın çizgiler** (“mertebeler”) elde edersiniz, şu açılarda:' },
      { t: 'formula', caption: 'yarık aralığı $d$ (m), $N$ = metredeki çizgi sayısı; yalnızca $\\sin\\theta \\le 1$ olan mertebeler var olabilir' },
      { t: 'p', text: 'Bir CD ya da DVD bir **yansıma ağıdır**: sarmal izleri ışık dalga boylarıyla kıyaslanabilir $1\\ \\mathrm{\\mu m}$ dolayında aralıklıdır; böylece beyaz ışık, gökkuşağına ayrılarak yansır. X ışını kristalografisi aynı mantıkla çalışır — kristal atomları ~0.1–1 nm aralıklıdır, X ışınları için doğal bir ağdır ve Bragg yasası $2d\\sin\\theta = m\\lambda$ atom aralıklarını kırınım deseninden okur.' },
      { t: 'h', text: 'Teleskoplar neden bu denli büyük' },
      { t: 'p', text: 'Çapı $D$ olan teleskop aynası da ışığı kırınır; yakındaki iki yıldızı bulanıklaştırır. En iyi olası açısal çözünürlük kabaca şudur:' },
      { t: 'formula', caption: 'küçük açı = ince ayrıntı — yani daha büyük ayna daha yakın çiftleri ayırır' },
      { t: 'p', text: 'Ayna çapını iki katına çıkarmak bulanıklığı yarıya indirir. Gökbilimcilerin 10 metrelik aynalar kurmasının bir nedeni budur — ve telefon kameranızın hiçbir zaman tam eşleşememesinin de.' },
      { t: 'key', text: 'Sıkıştırılan dalgalar yayılır: tek yarığın karanlık noktaları $a\\sin\\theta = m\\lambda$’da (daha dar yarık = daha geniş yelpaze), ağlar keskin mertebeleri $d\\sin\\theta = m\\lambda$’da verir ve her açıklığın $\\theta \\approx 1.22\\lambda/D$ bulanıklığı bizi daha büyük teleskoplar kurmaya iter.' },
    ],
    example: {
      title: 'Tek yarıktan kırınım ağına',
      problem: '(a) 600 nm ışık 0.05 mm genişliğinde bir yarıktan geçiyor — ilk karanlık nokta nerededir? (b) Yarık, 1000 çizgi/mm’lik bir ağla değiştiriliyor — 550 nm ışık için birinci mertebe nerededir?',
      steps: [
        { text: 'Yarık genişliğini çevirin:' },
        { text: 'İlk tek-yarık karanlık noktası ($m = 1$):' },
        { text: 'Ters sinüsü alın:' },
        { text: 'Şimdi ağ: 1000 çizgi/mm, $d = 1/1000\\ \\mathrm{mm} = 1\\ \\mathrm{\\mu m}$ demektir; 550 nm ışık için:' },
        { text: 'Birinci mertebe açısı:' },
      ],
      answer: 'Tek yarık ilk karanlık noktasını ancak $0.69^{\\circ}$’ye bulanık bırakırken, ağ ustura gibi keskin birinci mertebeyi $33.4^{\\circ}$’ye fırlatır — çok sayıda yarık deseni çarpıcı biçimde keskinleştirir ve genişletir.',
    },
    questions: {
      'o7-p1': {
        prompt: '500 nm dalga boylu ışık 0.1 mm genişliğinde bir yarıktan geçer. Küçük açı yaklaşımı $\\theta \\approx \\lambda/a$ ile ilk karanlık nokta açısını mrad cinsinden verin ($1\\ \\mathrm{mrad} = 10^{-3}\\ \\mathrm{rad}$).',
        hints: [
          '$\\lambda/a$’yı her iki uzunluğu metre alarak hesaplayın.',
          '$5\\times10^{-7} \\div 1\\times10^{-4} = 5\\times10^{-3}\\ \\mathrm{rad}$.',
        ],
        explanation: '$\\theta \\approx \\lambda/a = 5\\times10^{-7}/1\\times10^{-4} = 5\\times10^{-3}\\ \\mathrm{rad} = 5\\ \\mathrm{mrad} \\approx 0.29^{\\circ}$.',
      },
      'o7-p2': {
        prompt: 'Yarığı daraltıyorsunuz. Ekrandaki aydın orta bant ne olur?',
        choices: [
          'Genişler — az yarık, çok yayılım demektir',
          'Daralır',
          'Genişliği aynı kalır',
          'İki ayrı banda bölünür',
        ],
        hints: [
          'Yayılım açısına $\\sin\\theta_1 = \\lambda/a$’ya bakın.',
          '$a$ küçülünce $\\lambda/a$ büyür.',
        ],
        explanation: '$\\sin\\theta_1 = \\lambda/a$ olduğundan, küçük $a$ daha büyük yayılım açısı verir: dalgayı ne kadar sıkıştırırsanız o kadar yelpazeleşir.',
      },
      'o7-p3': {
        prompt: 'Bir ağ 600 çizgi/mm’dir ($d \\approx 1.667\\ \\mathrm{\\mu m}$) ve 550 nm ışıkla aydınlatılıyor. Görebileceğiniz en yüksek $m$ mertebesi nedir ($m\\lambda \\le d$’yi denetleyin)?',
        hints: [
          'Mertebeler yalnızca $m\\lambda \\le d$, yani $m \\le d/\\lambda$ iken var olur.',
          '$1.667\\times10^{-6} \\div 5.5\\times10^{-7} \\approx 3.03$.',
        ],
        explanation: '$m \\le d/\\lambda = 3.03$; yani $m = 1, 2, 3$ mertebeleri vardır (3. mertebe $\\sin\\theta = 0.99$ ile tam sığar) ve $m = 4$, $\\sin\\theta = 2.2 > 1$ isterdi — imkânsız.',
      },
      'o7-p4': {
        prompt: 'Büyük teleskoplar küçüklerden neden daha ince ayrıntı ayırır?',
        choices: [
          'Görüntüyü daha çok büyütürler',
          'Daha büyük çap $D$, kırınım bulanıklığı $\\theta \\approx 1.22\\lambda/D$’yi küçültür',
          'Atmosferin daha üzerinde dururlar',
          'Aynaları daha yumuşak eğrilidir',
        ],
        hints: [
          'Her açıklık ışığı kırınım yapar — bulanıklık açısını ne belirler?',
          '$\\theta \\approx 1.22\\lambda/D$’de $D$ büyüdükçe ne olur?',
        ],
        explanation: 'Kırınım bulanıklık açısı $\\theta \\approx 1.22\\lambda/D$ açıklık büyüdükçe küçülür; böylece büyük ayna yakın iki yıldızı ayrı tutarken küçük ayna onları birbirine bulaştırır.',
      },
      'o7-q1': {
        prompt: '600 nm ışık, $a = 0.2\\ \\mathrm{mm}$ genişliğinde bir yarıktan geçer ve $L = 2\\ \\mathrm{m}$ uzaktaki ekrana düşer. Orta aydın bölge (kabaca $2\\lambda L/a$) mm cinsinden kaç genişliktedir?',
        hints: [
          'Orta genişlik $\\approx 2\\lambda L/a$, her şey metre cinsinden.',
          '$2 \\times 6\\times10^{-7} \\times 2 \\div 2\\times10^{-4}$.',
        ],
        explanation: 'Genişlik $= 2\\lambda L/a = 2 \\times 6\\times10^{-7} \\times 2 / 2\\times10^{-4} = 1.2\\times10^{-2}\\ \\mathrm{m} = 12\\ \\mathrm{mm}$.',
      },
      'o7-q2': {
        prompt: 'Çift yarığa kıyasla bir kırınım ağı (çok yarık) ne üretir?',
        choices: [
          'Daha geniş ve bulanık tepe noktaları',
          'Tam olarak aynı deseni',
          'Aynı açılarda çok daha keskin ve parlak tepeler',
          'Hiçbir desen üretmez',
        ],
        hints: [
          'Yüzlerce yarıkla dalgalar yalnızca çok keskin açılarda anlaşır.',
          'Aydın çizgilerin ne kadar parlaklaşıp inceldiğini düşünün.',
        ],
        explanation: 'Çok yarıklı durumda yapısal girişim açıları değişmez ($d\\sin\\theta = m\\lambda$) ama tepeler ustura gibi keskinleşir ve çok parlar; çünkü dalgalar başka her yerde birbirini yok eder.',
      },
      'o7-q3': {
        prompt: 'Bir ağ 500 çizgi/mm’dir ($d = 2\\ \\mathrm{\\mu m}$). 500 nm ışık için 2. mertebe $\\sin\\theta = 2\\lambda/d = 0.5$’i sağlar. $\\theta$ nedir?',
        hints: [
          'Sinüsü 0.5 olan açıyı bulun.',
          '$\\sin 30^{\\circ} = 0.5$.',
        ],
        explanation: '$\\theta = \\arcsin(0.5) = 30^{\\circ}$ — 500 nm ışığın ikinci mertebesi, 500 çizgi/mm’lik ağı tam otuz derecede terk eder.',
      },
      'o7-q4': {
        prompt: 'Bir CD beyaz ışığı gökkuşağına yayar çünkü…',
        choices: [
          'plastiği hafif renklidir',
          'sarmal izleri, aralığı ~1 μm olan bir yansıma kırınım ağı gibi davranır',
          'metal katman ışık altında floresan verir',
          'lazerin ısısı ışığı büker',
        ],
        hints: [
          'İz aralığı (~1 μm) bir şeyle kıyaslanabilir…',
          'Bir ağ dalga boylarını $d\\sin\\theta = m\\lambda$ ile sıralar.',
        ],
        explanation: 'CD izleri yaklaşık 1 μm aralıklıdır — ışık dalga boylarıyla kıyaslanabilir — disk bir yansıma ağı gibi çalışır ve her rengi kendi açısına yollar.',
      },
      'o7-q5': {
        prompt: '400 nm mor ışık, $a = 0.05\\ \\mathrm{mm}$ genişliğinde bir yarıktan geçer ve $1\\ \\mathrm{m}$ uzaktaki ekrana düşer. İlk karanlık nokta ($\\approx \\lambda L/a$) merkezden kaç mm uzaktadır?',
        hints: [
          'Tüm uzunlukları metre alarak $y \\approx \\lambda L/a$’yı kullanın.',
          '$4\\times10^{-7} \\times 1 \\div 5\\times10^{-5}$.',
        ],
        explanation: '$y = \\lambda L/a = 4\\times10^{-7} \\times 1 / 5\\times10^{-5} = 8\\times10^{-3}\\ \\mathrm{m} = 8\\ \\mathrm{mm}$ — orta bandın karanlık kenarı merkezden 8 mm açıktır.',
      },
    },
  },
}

export default ov
