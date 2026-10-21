// ─── Physics Quest · Turkish overlay · part-10 (p2-radioactivity, p3-modern) ──
import type { LessonOvFile } from '../schema'

const ov: LessonOvFile = {
  'p2-radioactivity': {
    title: "Radyoaktiflik ve Yarı Ömür",
    tagline: "100 radyoaktif yazı tura at ve üstel bozunum eğrisiyle yarış.",
    objectives: [
      "Radyoaktif bozunumun ne olduğunu ve nereden kaynaklandığını açıkla",
      "Bir numuneden ne kadar kaldığını tahmin etmek için yarı ömrü kullan",
      "Alfa, beta ve gama ışınımını karşılaştır",
    ],
    concept: [
      { t: 'p', text: "Çekirdeklerin çoğu sonsuza dek sessizce durur. Ama bazıları — özellikle büyük ya da dengesiz olanlar — **kararsızdır**: er ya da geç parçalanır, parçacıklar ve enerji püskürtür. Buna **radyoaktif bozunum** denir ve ışınım elektronlardan değil, **çekirdekten** gelir." },
      { t: 'table', headers: ["Işınım", "Nedir", "Elektrik yükü", "Ne durdurur"], rows: [
        ["Alfa (α)", "çekirdeğin küçük bir parçası (2 p + 2 n)", "+2", "bir yaprak kâğıt"],
        ["Beta (β)", "çekirdekten savrulan hızlı bir elektron", "−1", "birkaç mm alüminyum"],
        ["Gama (γ)", "çok yüksek enerjili ışık patlaması", "0", "kalın kurşun ya da beton"],
      ] },
      { t: 'h', text: "Yarı ömür: güvenebileceğin geri sayım" },
      { t: 'p', text: "Belirli bir çekirdeğin ne zaman parçalanacağını asla söyleyemezsin — bu tamamen şanstır. Ama milyarlarca çekirdek söz konusu olduğunda ortalama kaya gibi sağlamdır: **yarı ömür**, hayatta kalanların **yarısının** bozunması için geçen süredir. Bir yarı ömür sonra yarısı kalır, ikisinden sonra çeyreği, üçünden sonra sekizde biri…" },
      { t: 'formula', caption: "$N_0$ = başlangıç miktarı, $n$ = geçen yarı ömür sayısı" },
      { t: 'p', text: "Hızlı kontrol: 4 yarı ömür sonra bir numune, başlangıçtakinin $\\left(\\tfrac{1}{2}\\right)^4 = \\tfrac{1}{16}$'ına düşer — çok az, ama asla tam olarak sıfır değil." },
      { t: 'list', items: [
        "**Karbon tarihlemesi** — karbon-14'ün 5730 yıllık yarı ömrü, eski ahşap ve kemikleri tarihlendirir",
        "**Tıp** — kısa yarı ömürlü izleyiciler organları görüntüler, sonra kaybolur",
        "**Jeoloji** — uranyum–kurşun tarihlemesi, milyarlarca yıllık kayaçları okur",
        "**Duman dedektörleri** — bir tutam alfa kaynağı, güvenlik akımının akmasını sürdürür",
      ] },
      { t: 'key', text: "Bozunum tek bir atom için rastgeledir ama büyük bir kalabalık için kusursuzca öngörülebilirdir — kader değil, istatistik. Yarı ömür eğrisinin bu kadar güvenilir olmasının sırrı budur." },
      { t: 'p', text: "**Güvenlik**: ışınım canlı hücrelere zarar verebilir; bu yüzden kaynaklar zırhlanır (kâğıt → alüminyum → kurşun) ve kısa sürelerle elde tutulur. Eğlenceli bilgi: kendi bedenin de hafif radyoaktiftir — doğal potasyum-40 ve karbon-14 yüzünden senin içinde her saniye birkaç bin bozunum olur." },
    ],
    example: {
      title: "Küçülen numune",
      problem: "Bir hastane, yarı ömrü 2 saat olan bir izleyiciden 80 g'lık bir numune bulunduruyor. 6 saat sonra ne kadarı kalmıştır?",
      steps: [
        { text: "6 saate kaç yarı ömür sığar, say:" },
        { text: "Yarı ömür formülünü uygula:" },
        { text: "Üç kez yarıya böl: 80 → 40 → 20 → 10:" },
      ],
      answer: "6 saat sonra — üç yarı ömür — izleyicinin $10\\ \\mathrm{g}$'u kalmıştır.",
    },
    questions: {
      'p2-radioactivity-p1': {
        prompt: "Bir numune 400 kararsız atomla başlıyor. 2 yarı ömür sonra kaç tanesi kalmıştır?",
        hints: [
          "Her yarı ömür, hayatta kalan sayısını yarıya indirir.",
          "400 → 200 → ?",
        ],
        explanation: "Bir yarı ömür sonra 400 → 200, iki yarı ömür sonra → **100**. Formülle: $400 \\times \\left(\\tfrac{1}{2}\\right)^2 = 100$.",
      },
      'p2-radioactivity-p2': {
        prompt: "Yarı ömür aslında neyi ölçer?",
        choices: [
          "TÜM atomların bozunması için geçen süre",
          "Hayatta kalan atomların yarısının bozunması için geçen süre",
          "Numunenin yaşının yarısı",
          "Bir atomun radyoaktif olarak geçirdiği süre",
        ],
        hints: [
          "“yarı” sözcüğüne odaklan.",
          "Her dönemde hayatta kalanlar yarıya iner — yığın hiçbir zaman tam olarak sıfıra ulaşmaz.",
        ],
        explanation: "Her yarı ömrde, hayatta kalanların tam yarısı bozunur: miktar $\\tfrac12, \\tfrac14, \\tfrac18 \\ldots$ diye küçülür, sıfıra yaklaşır ama tam olarak oraya varamaz.",
      },
      'p2-radioactivity-q1': {
        prompt: "200 kararsız atomluk bir numune 4 yarı ömür boyunca izleniyor. Yaklaşık kaç atom kalır?",
        hints: [
          "Dört kez ½ ile çarp: 200 → 100 → 50 → 25 → ?",
          "$200 \\times \\left(\\tfrac{1}{2}\\right)^4$",
        ],
        explanation: "$200 \\times \\left(\\tfrac{1}{2}\\right)^4 = 200/16 = 12.5$ — gerçek bir sayımda 12 ya da 13 atom görürdün.",
      },
      'p2-radioactivity-q2': {
        prompt: "Işınım nereden gelir — kimyasal tepkimeler ise neyle ilgilidir?",
        choices: [
          "İkisi de çekirdekle ilgilidir",
          "Işınım: çekirdek; kimyasal tepkimeler: elektronlar",
          "Işınım: elektronlar; kimyasal tepkimeler: çekirdek",
          "İkisi de yalnızca protonlarla ilgilidir",
        ],
        hints: [
          "Atomun hangi bölümü kararsızdır?",
          "Kimya, tamamen elektron paylaşmak ve takas etmekle ilgilidir.",
        ],
        explanation: "Radyoaktiflik çekirdeksel bir olaydır — protonlar ve nötronların yeniden dizilmesi. Kimyasal tepkimeler yalnızca elektronları karıştırır; bu da çekirdeğe dokunmayacak kadar zayıftır.",
      },
      'p2-radioactivity-q3': {
        prompt: "Hangi ışınım türü en iyi nüfuz eder?",
        choices: ["Alfa (α)", "Beta (β)", "Gama (γ)", "Üçü de eşittir"],
        hints: [
          "Hangisi kalın kurşun ya da beton ister?",
          "Gamanın ne yükü vardır ne kütlesi — saf enerjidir.",
        ],
        explanation: "Gama ışınları, yükü ve kütlesi olmayan yüksek enerjili ışıktır; kâğıt ve alüminyum onları zar zor yavaşlatır — kalın kurşun ya da beton gerekir. Alfa bir yaprak kâğıtta ölür, beta birkaç milimetre alüminyumda.",
      },
      'p2-radioactivity-q4': {
        prompt: "Radyoaktif bir numunenin 3 yarı ömür sonra ne kadarı kalır? (Yanıtı ondalık sayı olarak ver.)",
        hints: [
          "Üç kez yarıya böl: $\\tfrac{1}{2} \\to \\tfrac{1}{4} \\to$ ?",
          "$\\left(\\tfrac{1}{2}\\right)^3 = \\tfrac{1}{8}$",
        ],
        explanation: "Numunenin $\\left(\\tfrac{1}{2}\\right)^3 = \\tfrac{1}{8} = 0.125$'ü hayatta kalır.",
      },
      'p2-radioactivity-q5': {
        prompt: "Birbirinin aynısı iki radyoaktif atom yan yana duruyor. Ne zaman bozunacakları hakkında ne söyleyebilirsin?",
        choices: [
          "Soldaki önce gider",
          "Sıradaki hangisinin bozunacağını öngöremezsin — bozunum atom başına rastgeledir",
          "Tam olarak aynı anda bozunurlar",
          "Hiçbiri asla bozunmaz",
        ],
        hints: [
          "Kuantum rastgeleliği yine sahneye çıktı.",
          "Tek bir atom öngörülemez; kocaman bir kalabalık yarı ömre harfiyen uyar.",
        ],
        explanation: "Bozunum, her çekirdek için rastgele bir olaydır — sıradaki hangi atomun parçalanacağını kimse bilemez. Yalnızca büyük bir numunenin ortalama davranışı, güvenilir yarı ömür eğrisini izler.",
      },
    },
  },
  'p3-modern': {
    title: "Görelilik ve Kuantum Dünyası",
    tagline: "0.99c hızında bir ışık saatine bin, sonra çift yarığa foton fırlat.",
    objectives: [
      "$\\gamma = 1/\\sqrt{1 - v^2/c^2}$ kullanarak zaman genişlemesini hesapla",
      "Işık hızının her gözlemci için aynı olduğunu söyle",
      "Dalga–parçacık davranışını çift yarıkla açıkla",
    ],
    concept: [
      { t: 'p', text: "1905'te Albert **Einstein** tuhaf bir soru sordu: ışık, sen onu ne kadar hızlı kovalarsan kovala, hep tam olarak aynı hızla — $c \\approx 3 \\times 10^{8}\\ \\mathrm{m/s}$ — yol alsa ne olurdu? Ne kadar tuhaf gelse de her deney “evet” dedi." },
      { t: 'key', text: "Işık hızı her gözlemci için aynıdır. Bu sözü tutmak için uzayın ve zamanın kendisi esnemek zorundadır: **hareket eden saatler yavaş işler** ve **hareket eden cisimler gidiş yönlerinde daralır**." },
      { t: 'h', text: "Zaman genişlemesi ve γ çarpanı" },
      { t: 'p', text: "Hızlı bir uzay gemisinin içinde her şey mürettebata normal görünür. Ama yerden izlendiğinde geminin saati tam olarak **γ** (gama) çarpanı kadar yavaş işler:" },
      { t: 'formula', caption: "$v$ = gemi hızı, $c$ = ışık hızı. Gündelik hızlarda γ ≈ 1 — fark edilir bir etkisi yok." },
      { t: 'p', text: "$0.6c$ hızında $\\gamma = 1.25$ olur: bir gemi-yılı, 1.25 Dünya-yılına dönüşür. $0.99c$ hızında $\\gamma \\approx 7$. Uzunluk da aynı çarpanla daralır (durgun uzunluk ÷ γ). Ve $v \\to c$'ye yaklaşırken γ sonsuza doğru büyüdüğü için **kütlesi olan hiçbir şey ışık hızına ulaşamaz** — bunun için sonsuz enerji gerekirdi." },
      { t: 'h', text: "Kuantum dünyası: ışık ve madde paketler hâlinde" },
      { t: 'p', text: "Çok küçük ölçeğe zoom yaptığında kurallar yine değişir. Işık — ve bütün madde — **kuanta** denen bölünmez paketler hâlinde gelir. Çift yarığa tek tek foton fırlat: her biri bir parçacık gibi bir nokta olarak düşer; ama noktalar birikince oluşan örüntü bir dalga girişim örüntüsüdür — sanki **her foton aynı anda iki yarığı da yokluyormuş** gibi. Elektronlar da tam aynı numarayı yapar." },
      { t: 'list', items: [
        "**Fotoelektrik etki** — ışık, metaldeki elektronları kuanta paketleriyle dışarı fırlatır (Einstein'ın Nobel ödüllü çalışması)",
        "**Lazerler** — tetiklenmiş, birbirinin aynı foton zincirleri",
        "**LED'ler** — enerjiyi her seferinde bir kuantum olarak salıveren elektronlar",
        "Ölçek dürüstlüğü: gündelik hız ve boyutlarda γ ≈ 1'dir ve kuantum bulanıklığı ortalamada kaybolur — masan bu yüzden katı gelir, saatler de bu yüzden anlaşır",
      ] },
    ],
    example: {
      title: "Astronotun yılı",
      problem: "Bir astronot 0.6c hızıyla Dünya'nın yanından süzülerek geçiyor. Gemideki saatine göre yolculuk 1 yıl sürmüş gibi hissediliyor. Dünya'dan ölçüldüğünde bu yolculuk ne kadar sürer?",
      steps: [
        { text: "Gama çarpanını hesapla:" },
        { text: "Dünya, hareket eden saati γ katı yavaş görür:" },
        { text: "Demek ki yolculuk şu kadar sürer:" },
      ],
      answer: "Dünya $1.25$ yıl ölçer — astronot 1 yıl yaşlanırken evde 15 ay daha geçer.",
    },
    questions: {
      'p3-modern-p1': {
        prompt: "0.6c hızıyla hareket eden bir cisim için γ kaçtır?",
        hints: [
          "$\\gamma = 1/\\sqrt{1 - v^2/c^2}$.",
          "$1 - 0.36 = 0.64$ ve $\\sqrt{0.64} = 0.8$.",
        ],
        explanation: "$\\gamma = 1/\\sqrt{1 - 0.6^2} = 1/\\sqrt{0.64} = 1/0.8 = 1.25$.",
      },
      'p3-modern-p2': {
        prompt: "Bir uzay gemisinin $v$ hızı, ışık hızı $c$'ye yaklaştıkça…",
        choices: [
          "γ 1'e yaklaşır",
          "γ sıfıra küçülür",
          "γ sonsuza doğru büyür",
          "γ negatif olur",
        ],
        hints: [
          "$\\sqrt{1 - v^2/c^2}$ paydasına dikkat et.",
          "$v \\to c$ iken payda 0'a yaklaşır, γ patlar.",
        ],
        explanation: "$v \\to c$ iken $1 - v^2/c^2 \\to 0$ olur ve $\\gamma = 1/\\sqrt{\\ldots}$ sınırsız büyür — kütleli bir cismin $c$'ye asla tam olarak varamamasının nedeni budur.",
      },
      'p3-modern-q1': {
        prompt: "v = 0.8c için γ kaçtır? (İki ondalık basamak.)",
        hints: [
          "$\\gamma = 1/\\sqrt{1 - 0.8^2}$.",
          "$1 - 0.64 = 0.36$ ve $\\sqrt{0.36} = 0.6$.",
        ],
        explanation: "$\\gamma = 1/\\sqrt{1 - 0.64} = 1/\\sqrt{0.36} = 1/0.6 \\approx 1.67$ — gemideki saatler 1.67 kat yavaş işler.",
      },
      'p3-modern-q2': {
        prompt: "Özel görelilik ışık hızı hakkında ne der?",
        choices: [
          "Gözlemcinin hareketine bağlıdır",
          "Her gözlemci için aynıdır",
          "Hızlı uzay gemilerinin içinde yavaşlar",
          "Kaynağa doğru uçarsan ikiye katlanır",
        ],
        hints: [
          "Einstein'ın inatçı başlangıç varsayımıydı.",
          "Zamanı bile esneten şey, tam olarak bu sabitliktir.",
        ],
        explanation: "Her gözlemci, nasıl hareket ederse etsin ışığı aynı $c$'de ölçer. Bunu herkes için geçerli tutmak, hareket eden saatlerin yavaş işlemesinin ve hareket eden uzunlukların daralmasının tam nedenidir.",
      },
      'p3-modern-q3': {
        prompt: "Elektronları tek tek çift yarığa fırlatmak bile bir girişim örüntüsü oluşturur. Bu neyi gösterir?",
        choices: [
          "Elektronlar sadece minik toplardır",
          "Parçacıklar da dalga gibi davranır",
          "Ekran arızalı olmalı",
          "Elektronlar birbirlerinden sekiyor",
        ],
        hints: [
          "Nasıl bir şey girişim örüntüsü oluşturur?",
          "Her tek parçacık bir şekilde iki yarığı da yokluyor — bu bir dalga imzası.",
        ],
        explanation: "Girişim, dalgaların parmak izidir. Tek parçacıkların tek tek düşmesi ama yine de o örüntüyü oluşturması, dalga–parçacık davranışını ortaya koyar: elektronlar (ve fotonlar) ikisini birden oynar.",
      },
      'p3-modern-q4': {
        prompt: "Bir gemi 0.6c hızıyla uçuyor (γ = 1.25). Dünya'da 10 yıl geçse, mürettebat için kaç yıl geçer?",
        hints: [
          "Gemi süresi = Dünya süresi ÷ γ.",
          "$10 \\div 1.25$",
        ],
        explanation: "Dünya 10 yıl ölçer; mürettebatın saati γ kadar yavaş işler: $10 / 1.25 = 8$ yıl.",
      },
      'p3-modern-q5': {
        prompt: "Günlük hayatta zaman genişlemesini ya da kuantum tuhaflıklarını neden fark etmezsin?",
        choices: [
          "Aslında hiç olmazlar",
          "Yalnızca çok yüksek hızlarda ya da çok minik ölçeklerde önem kazanırlar",
          "Bilim insanları onları kapatmıştır",
          "Yalnızca uzayda olurlar",
        ],
        hints: [
          "γ'yı yürüme hızında hesapla.",
          "Kuantum bulanıklığı, trilyonlarca parçacıklık kalabalıklarda ortalamada kaybolur.",
        ],
        explanation: "Gündelik hızlarda γ, 1'den ayırt edilemez ve kuantum etkileri, astronomik sayıda parçacık içeren cisimlerde silinir — tuhaf fizik, hızın ve boyutun uçlarında saklanır.",
      },
    },
  },
}

export default ov
