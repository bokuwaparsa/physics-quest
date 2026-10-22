// ─── Physics Quest · Turkish (tr) overlay · part-01: m1–m3 ───────────────────
import type { LessonOvFile } from '../schema'

const ov: LessonOvFile = {
  'm1-motion-graphs': {
    title: 'Hareket ve Grafikler',
    tagline: 'Bir robotla yarış ve konum–zaman grafiğinin hikâyesini oku.',
    objectives: [
      'Hareketi mesafe, zaman ve hız kullanarak tanımla',
      '$v = d/t$ ile hızı hesapla',
      'Konum–zaman grafiklerini oku: eğim hızı gösterir',
    ],
    concept: [
      { t: 'p', text: 'Bir cismin konumu bir referans noktasına göre değiştiğinde cisim **hareket ediyor** demektir. Fizik, hareketi tanımlamak için üç temel malzeme kullanır: bir şeyin ne kadar yol gittiği (mesafe), bunun ne kadar sürdüğü (zaman) ve ne kadar hızlı gerçekleştiği (hız).' },
      { t: 'h', text: 'Hız: ne kadar hızlı, metre/saniye cinsinden' },
      { t: 'p', text: 'Hız, her saniyede kat edilen mesafeyi söyler. SI birimi saniyede metredir ($\\mathrm{m/s}$). Hızı, mesafeyi zamana bölerek elde edersin:' },
      { t: 'formula', caption: 'hız $v$ m/s cinsinden, mesafe $d$ m cinsinden, zaman $t$ s cinsinden' },
      { t: 'p', text: 'Ayrıca **hangi yönde** hareket ettiğini de söylersen bu, **hız (yön ile)** olur — “30 m/s kuzeye doğru” bir hız (yön ile) belirtir; tek başına “30 m/s” ise yalnızca bir hızdır.' },
      { t: 'table', headers: ['Hareket eden şey', 'Tipik hız'], rows: [
        ['Yürüyen kişi', '≈ 1.4 m/s'],
        ['Şehirde bisiklet süren biri', '≈ 5 m/s'],
        ['Okul koşucusu', '≈ 8 m/s'],
        ['Otoyolda giden araba', '≈ 25 m/s'],
        ['Havadaki ses', '≈ 343 m/s'],
      ] },
      { t: 'h', text: 'Konum–zaman grafikleri' },
      { t: 'p', text: 'Mesafeyi dikey eksene, zamanı yatay eksene koy; eline bir **konum–zaman grafiği** geçer — bir yolculuğun resmi. Çizginin **eğimi (dikliği)** hızdır:' },
      { t: 'list', items: [
        '**Daha dik** bir çizgi = **daha hızlı** bir cisim.',
        '**Düz** (yatay) bir çizgi = cisim **durgundur**.',
        'Düz ve eğik bir doğru = **sabit hız**.',
      ] },
      { t: 'key', text: 'Konum–zaman grafiğinin eğimi = hız. Dik hızlı, düz duran demektir.' },
    ],
    example: {
      title: 'Bisikletle okula gidiş',
      problem: 'Bir bisikletli, okula giderken 1500 m mesafeyi 300 s içinde (5 dakika) kat ediyor. Ortalama hızı nedir?',
      steps: [
        { text: 'Bil diklerini yaz:' },
        { text: 'Formülü seç ve değerleri yerine koy:' },
        { text: 'Böl:' },
      ],
      answer: 'Bisikletlinin ortalama hızı $5\\ \\mathrm{m/s}$ — şehir içinde rahat bir bisiklet sürüşü kadar hızlı.',
    },
    questions: {
      'm1-p1': {
        prompt: 'Bir koşucu 100 m mesafeyi 20 s içinde koşuyor. Ortalama hızı kaçtır?',
        choices: ['2 m/s', '5 m/s', '20 m/s', '200 m/s'],
        hints: [
          '$v = d/t$ formülünü kullan.',
          'Mesafeyi zamana böl: $100 \\div 20$.',
        ],
        explanation: '$v = 100\\ \\mathrm{m} \\div 20\\ \\mathrm{s} = 5\\ \\mathrm{m/s}$.',
      },
      'm1-p2': {
        prompt: 'Yuvarlanan bir top, $12\\ \\mathrm{m/s}$ sabit hızla 8 s boyunca hareket ediyor. Ne kadar yol gider?',
        hints: [
          '$v = d/t$ formülünü mesafe için düzenle: $d = v \\times t$.',
          'Hızı zamanla çarp: $12 \\times 8$.',
        ],
        explanation: '$d = v\\,t = 12\\ \\mathrm{m/s} \\times 8\\ \\mathrm{s} = 96\\ \\mathrm{m}$.',
      },
      'm1-q1': {
        prompt: 'Bir konum–zaman grafiğinde düz yatay bir çizgi, cismin… gösterir:',
        choices: ['sabit hızla hareket ettiğini', 'hızlandığını', 'durgun olduğunu (hareket etmediğini)', 'geriye doğru hareket ettiğini'],
        hints: [
          'Düz bir çizginin eğimi nedir?',
          'Eğim = hız; sıfır eğim = sıfır hız.',
        ],
        explanation: 'Düz çizginin eğimi sıfırdır; dolayısıyla hız sıfırdır — cisim durgundur.',
      },
      'm1-q2': {
        prompt: 'Bir araba $25\\ \\mathrm{m/s}$ sabit hızla 12 s gidiyor. Ne kadar yol alır?',
        hints: ['Mesafe = hız × zaman.', '$25 \\times 12$'],
        explanation: '$d = v\\,t = 25 \\times 12 = 300\\ \\mathrm{m}$.',
      },
      'm1-q3': {
        prompt: 'Bir konum–zaman grafiğinde iki çizgi var: A çizgisi B çizgisinden daha dik. Hangi cisim daha hızlıdır?',
        choices: ['A cismi', 'B cismi', 'Aynı hızdadırlar', 'Grafikten anlaşılamaz'],
        hints: [
          'Bir konum–zaman grafiğinde eğim = hız.',
          'Daha dik çizgi → daha büyük eğim → daha büyük hız.',
        ],
        explanation: 'Eğim hıza eşittir; dolayısıyla daha dik çizgi (A) daha hızlı cisme aittir.',
      },
      'm1-q4': {
        prompt: 'Bir bisikletli 90 s içinde 540 m yol gidiyor. Ortalama hız kaçtır?',
        hints: ['$v = d/t$ formülünü kullan.', '$540 \\div 90$'],
        explanation: '$v = 540\\ \\mathrm{m} \\div 90\\ \\mathrm{s} = 6\\ \\mathrm{m/s}$.',
      },
      'm1-q5': {
        prompt: 'Hangi ifade yalnızca bir hız değil, bir *hız (yön ile)* tanımlar?',
        choices: ['“8 m/s”', '“8 m/s batıya doğru”', '“8 metre”', '“8 saniye”'],
        hints: [
          'Hız (yön ile) = hız artı yön.',
          'Yön içeren seçeneği ara.',
        ],
        explanation: 'Hız (yön ile), hıza yönün eklenmiş hâlidir; bu yüzden “8 m/s batıya doğru” bir hız (yön ile) belirtir.',
      },
    },
  },

  'm2-acceleration': {
    title: 'İvme',
    tagline: 'Bir yarış arabasını fırlat ve hızının saniye saniye nasıl yükseldiğini izle.',
    objectives: [
      'İvmeyi, saniye başına hız (yön ile) değişimi olarak tanımla: $a = \\Delta v/\\Delta t$',
      '$\\mathrm{m/s^2}$ birimini kullan ve pozitif ivmeyi negatif olandan ayırt et',
      'Hız–zaman grafiklerini oku: eğim ivmedir',
    ],
    concept: [
      { t: 'p', text: 'Şimdiden biliyorsun: **hız (yön ile)**, yönü de içeren hızdır. Ama gerçek araçlar aynı hız (yön ile) durumunu pek uzun süre korumaz — trafik ışığından uzaklaşırken hızlanır, kavşaktan önce yavaşlarlar. Fizik, hızdaki her değişime özel bir ad verir: **ivme**.' },
      { t: 'h', text: 'İvme: hız ne kadar çabuk değişiyor' },
      { t: 'p', text: '**İvme**, hızın değişiminin, bu değişimin aldığı süreye bölünmesidir. Bir araba 3 saniyede $6\\ \\mathrm{m/s}$ hız kazanırsa, hızı bu saniyelerin her birinde $2\\ \\mathrm{m/s}$ artar.' },
      { t: 'formula', caption: 'ivme $a$ m/s² cinsinden, başlangıç hızı $u$ ile bitiş hızı $v$ m/s cinsinden, zaman $t$ s cinsinden' },
      { t: 'p', text: '$\\mathrm{m/s^2}$ birimi “her saniye, saniyede metre” diye okunur. $3\\ \\mathrm{m/s^2}$ ivme, hızın her saniye $3\\ \\mathrm{m/s}$ artması demektir: 0, 3, 6, 9, 12… **Negatif** ivme, hızın küçüldüğü anlamına gelir — yavaşlamaya genellikle **yavaşlama ivmesi** denir.' },
      { t: 'h', text: 'Hız–zaman grafikleri' },
      { t: 'list', items: [
        'Hız–zaman çizgisinin **eğimi** ivmedir — daha dik, daha hızlı değişim demektir.',
        '**Yükselen** çizgi = cisim hızlanıyor ($a$ pozitif).',
        '**Alçalan** çizgi = cisim yavaşlıyor ($a$ negatif).',
        '**Düz** çizgi = sabit hız, yani $a = 0$ — ne hızlanma ne yavaşlama.',
      ] },
      { t: 'table', headers: ['Hızlanan şey', 'Tipik ivme'], rows: [
        ['Aile arabası, gazı sonuna kadar basılı', '≈ 3 m/s²'],
        ['Start takozlarından fırlayan koşucu', '≈ 5 m/s²'],
        ['Spor araba', '≈ 8 m/s²'],
        ['Düşen cisim (serbest düşme)', '9.8 m/s²'],
      ] },
      { t: 'key', text: 'Hız–zaman grafiğinin eğimi = ivme. Yükselen = hızlanma, alçalan = yavaşlama, düz = sabit hız.' },
    ],
    example: {
      title: 'Motorsiklet kalkışı',
      problem: 'Bir motorsiklet durgun durumdan kalkış yapıyor ve 8 s içinde $24\\ \\mathrm{m/s}$ hıza ulaşıyor. İvmesi kaçtır?',
      steps: [
        { text: 'Bil diklerini yaz:' },
        { text: 'İvme formülünü kullan:' },
        { text: 'Böl:' },
      ],
      answer: 'Motorsiklet $3\\ \\mathrm{m/s^2}$ ivmeyle hızlanıyor — hızı her saniye $3\\ \\mathrm{m/s}$ artıyor; tıpkı yol ağzından kalkan bir aile arabası gibi.',
    },
    questions: {
      'm2-acceleration-p1': {
        prompt: 'Bir araba durgun durumdan 10 s içinde $30\\ \\mathrm{m/s}$ hıza çıkıyor. İvmesi kaçtır?',
        choices: ['0.3 m/s²', '3 m/s²', '10 m/s²', '300 m/s²'],
        hints: [
          '$a = \\Delta v / \\Delta t$ formülünü kullan; hız değişimi üstte (pay) yer alır.',
          'Hız 10 s içinde 30 m/s değişiyor; $30 \\div 10$ işlemini yap.',
        ],
        explanation: '$a = \\Delta v/\\Delta t = 30\\ \\mathrm{m/s} \\div 10\\ \\mathrm{s} = 3\\ \\mathrm{m/s^2}$.',
      },
      'm2-acceleration-p2': {
        prompt: 'Bir kaykay $2\\ \\mathrm{m/s^2}$ sabit ivmeyle 6 s boyunca yuvarlanıyor. Hızı ne kadar değişir?',
        hints: [
          '$a = \\Delta v/t$ formülünü hız değişimi için düzenle: $\\Delta v = a \\times t$.',
          'İvmeyi zamanla çarp: $2 \\times 6$.',
        ],
        explanation: '$\\Delta v = a\\,t = 2\\ \\mathrm{m/s^2} \\times 6\\ \\mathrm{s} = 12\\ \\mathrm{m/s}$.',
      },
      'm2-acceleration-q1': {
        prompt: 'Bir hız–zaman grafiğinde hangi çizgi, hızlanan bir cismi gösterir?',
        choices: ['Alçalan bir çizgi', 'Yükselen bir çizgi', 'Düz yatay bir çizgi', 'Düşey bir çizgi'],
        hints: [
          'Bir hız–zaman grafiğinde çizginin yüksekliği hızdır.',
          'Hız artıyorsa çizgi yükseliyor demektir.',
        ],
        explanation: 'Yükselen çizgi, zaman geçtikçe hızın arttığını gösterir; yani cisim hızlanıyor. Bu yükselişin eğimi ivmedir.',
      },
      'm2-acceleration-q2': {
        prompt: 'Bir gokart durgun durumdan kalkıyor ve 5 s boyunca $4\\ \\mathrm{m/s^2}$ ile hızlanıyor. Hangi hıza ulaşır?',
        hints: [
          'Her saniye $4\\ \\mathrm{m/s}$ hız eklenir.',
          '$v = a \\times t = 4 \\times 5$',
        ],
        explanation: '$v = a\\,t = 4\\ \\mathrm{m/s^2} \\times 5\\ \\mathrm{s} = 20\\ \\mathrm{m/s}$.',
      },
      'm2-acceleration-q3': {
        prompt: 'Bir tren düz bir çizgide tamamen sabit $25\\ \\mathrm{m/s}$ hızıyla gidiyor. İvmesi…',
        choices: ['25 m/s²', '12.5 m/s²', 'sıfır', 'mesafe olmadan anlaşılamaz'],
        hints: [
          'İvme, hızın *değişmesiyle* ilgilidir.',
          'Sabit hız, $\\Delta v = 0$ demektir.',
        ],
        explanation: 'Hız sabitken hız değişimi $\\Delta v = 0$ olur; dolayısıyla $a = \\Delta v/\\Delta t = 0$. Düzenli hareket için ivme gerekmez.',
      },
      'm2-acceleration-q4': {
        prompt: 'Bir otobüs 8 s içinde $20\\ \\mathrm{m/s}$ hızdan $4\\ \\mathrm{m/s}$ hıza yavaşlıyor. İvmesi kaçtır?',
        hints: [
          '$a = (v-u)/t$ formülünü kullan; $v$ *son* hızıdır.',
          '$(4 - 20) \\div 8$ — sonuç negatiftir, çünkü otobüs yavaşlıyor.',
        ],
        explanation: '$a = (v-u)/t = (4-20)/8 = -16/8 = -2\\ \\mathrm{m/s^2}$. Eksi işareti yavaşlamayı gösterir.',
      },
    },
  },

  'm3-forces-balanced': {
    title: 'Dengeli ve Dengesiz Kuvvetler',
    tagline: 'Bir sandığı iki halatla çek ve mükemmel dengeyi yakalamaya çalış.',
    objectives: [
      'Kuvveti, newton (N) ile ölçülen bir itme ya da çekme olarak tanımla',
      'Karşıt kuvvetleri birleştirerek net kuvveti bul',
      'Newton\'un birinci yasasını belirt: dengeli kuvvetler, harekette değişiklik olmadığı anlamına gelir',
    ],
    concept: [
      { t: 'p', text: 'Bir **kuvvet**, en yalın hâliyle bir itme ya da çekmedir. Kapı açmak, futbol topuna vurmak ve kızak çekmek için kuvvet kullanırsın. Kuvvetler **newton (N)** ile ölçülür — küçük bir elmanın ağırlığı yaklaşık $1\\ \\mathrm{N}$ gelir; yani bir newton kabaca, elinde elma tutarken hissettiğin çekmedir.' },
      { t: 'h', text: 'Dengeli kuvvetler: hiçbir şey değişmez' },
      { t: 'p', text: 'Kuvvetlerin yönü vardır. Bir cisme zıt yönlerde eşit itmeler etki ederse, bunlar tam olarak birbirini yok eder: kuvvetler **dengelidir** ve **net kuvvet sıfırdır**. Masada duran bir kitap, aşağı çeken yer çekimini ve yukarı iten masayı hisseder — kuvvetler dengelidir; bu yüzden kitap kımıldamaz. Ve sürtünmesiz buz üzerinde zaten sabit hızla kaymakta olan bir kızak, dengeli kuvvetler sayesinde tam o hızla sonsuza dek kayar.' },
      { t: 'key', text: '**Newton\'un birinci yasası**: bir cisme etki eden kuvvetler dengeliyse, durgun cisim durgun kalır; hareket hâlindeki cisim de sabit hızla hareketini sürdürür.' },
      { t: 'h', text: 'Dengesiz kuvvetler: net kuvvet' },
      { t: 'p', text: 'İtmeler birbirini yok etmezse arta kalan bir kuvvet kalır — **net kuvvet** (ya da bileşke kuvvet). Dengesiz bir net kuvvet, cismi **net kuvvetin yönünde ivmelendirir**. Daha büyük net kuvvet daha büyük ivme verir; aynı itmeyle daha ağır cisim daha az ivmelenir — bu, bir sonraki derste karşımıza çıkacak olan Newton\'un ikinci yasasıdır.' },
      { t: 'formula', caption: 'net kuvvet newton (N) cinsinden; aynı yöndeki itmeler toplanır, zıt yönlü itmeler çıkarılır' },
      { t: 'h', text: 'Seri cisim diyagramları' },
      { t: 'list', items: [
        'Cismi basit bir kutu ya da nokta olarak çiz.',
        'Her kuvveti, cismin üzerinde başlayan ve itmenin ya da çekmenin etki ettiği yönü gösteren bir **ok** olarak çiz.',
        'Okun **uzunluğunu** kuvvetin büyüklüğüne göre ayarla — iki kat kuvvet, iki kat ok.',
        'Eşit uzunlukta, zıt yönlü oklar = dengeli; daha uzun ok kazanır ve cisim o yönde ivmelenir.',
      ] },
    ],
    example: {
      title: 'Halat çekme sandığı',
      problem: 'Sürtünmesiz zeminde duran $10\\ \\mathrm{kg}$ kütleli bir sandık, $12\\ \\mathrm{N}$ ile sağa, $5\\ \\mathrm{N}$ ile sola çekiliyor. Sandığa ne olur?',
      steps: [
        { text: 'Bil diklerini yaz:' },
        { text: 'Net kuvveti bul:' },
        { text: 'Kuvvetler dengesizdir; dolayısıyla sandık ivmelenir:' },
      ],
      answer: 'Sandık $0.7\\ \\mathrm{m/s^2}$ ivmeyle sağa doğru ivmelenir; çünkü ona $7\\ \\mathrm{N}$ büyüklüğünde bir net kuvvet etki eder.',
    },
    questions: {
      'm3-forces-balanced-p1': {
        prompt: 'Bir kitap masanın üzerinde hareketsiz duruyor. Yer çekimi onu aşağı çekiyor. Kitaba başka hangi kuvvet etki eder ve bu iki kuvvet ne yapar?',
        choices: [
          'Başka bir kuvvet etki etmez — yer çekimi tek kuvvettir',
          'Masa, kitabı eşit bir kuvvetle yukarı iter — kuvvetler dengelidir',
          'Hava direnci kitabı yana doğru iter',
          'Masa kitabı daha da güçlüce aşağı çeker',
        ],
        hints: [
          'Kitap ne düşüyor ne de batıyor — yer çekimini yok eden bir şey olmalı.',
          'Yüzeyler, üzerine bastırılan cisimlere geri doğru iter; bu itmeye normal kuvvet denir.',
        ],
        explanation: 'Masa, kitabı ağırlığına eşit bir kuvvetle yukarı doğru iter. Zıt yönlü bu iki kuvvet dengelidir; bu yüzden kitap durgun kalır.',
      },
      'm3-forces-balanced-p2': {
        prompt: 'Bir kutu aynı anda sağa $25\\ \\mathrm{N}$, sola $10\\ \\mathrm{N}$ ile çekiliyor. Net kuvvet kaçtır?',
        hints: [
          'Karşıt kuvvetler çıkarılır: küçüğü büyükten çıkar.',
          '$25 - 10$',
        ],
        explanation: '$F_{net} = 25\\ \\mathrm{N} - 10\\ \\mathrm{N} = 15\\ \\mathrm{N}$; yönü sağa doğrudur.',
      },
      'm3-forces-balanced-q1': {
        prompt: 'Bir cisme etki eden kuvvetler tam olarak dengeli. Bu cisim…',
        choices: [
          'yalnızca durgun olabilir',
          'yalnızca sabit hızla hareket ediyor olabilir',
          'durgun VEYA sabit hızla hareket ediyor olabilir',
          'düz bir çizgide hızlanıyor olabilir',
        ],
        hints: [
          'Newton\'un birinci yasasını düşün.',
          'Dengeli kuvvetler, harekette *değişiklik* olmadığı anlamına gelir — ama hareketin kendisi durgunluk ya da düzenli hareket olabilir.',
        ],
        explanation: 'Newton\'un birinci yasasına göre dengeli kuvvetler sıfır net kuvvet verir; dolayısıyla hız değişmez: cisim durgun kalır ya da sabit hızla hareket etmeye devam eder.',
      },
      'm3-forces-balanced-q2': {
        prompt: '$6\\ \\mathrm{N}$ net kuvvet, $3\\ \\mathrm{kg}$ kütleli bir arabacığa etki ediyor. İvmesi kaçtır?',
        hints: ['$a = F_{net}/m$ formülünü kullan.', '$6 \\div 3$'],
        explanation: '$a = F_{net}/m = 6\\ \\mathrm{N} \\div 3\\ \\mathrm{kg} = 2\\ \\mathrm{m/s^2}$.',
      },
      'm3-forces-balanced-q3': {
        prompt: 'Bir kutu zeminde kayarak ilerlerken giderek yavaşlıyor. Neden?',
        choices: [
          'İleri yöndeki kuvveti tükenir',
          'Kayarken üzerine hiç kuvvet etki etmez',
          'Sürtünme, geriye doğru etki eden dengesiz bir kuvvettir',
          'Hareket ettikçe kütlesi artar',
        ],
        hints: [
          'Harekette bir değişiklik, dengesiz bir kuvvet gerektirir.',
          'Pürüzlü bir zeminde kaymaya karşı hangi kuvvet direnir?',
        ],
        explanation: 'Sürtünme, kayan kutuya geriye doğru iter ve hiçbir kuvvet bunu dengelemez; geriye yönlü bir net kuvvet vardır — kutu yavaşlar.',
      },
      'm3-forces-balanced-q4': {
        prompt: 'Aynı itme, $1\\ \\mathrm{kg}$ kütleli bir arabacığa ve $2\\ \\mathrm{kg}$ kütleli bir arabacığa uygulanıyor. $1\\ \\mathrm{kg}$ arabacığın ivmesi, $2\\ \\mathrm{kg}$ arabacığın ivmesinin kaç katıdır?',
        hints: [
          '$a = F/m$ — $F$ aynı olduğunda ivme $1/m$ ile orantılıdır.',
          'Yarım kütle demek… ivmeleri böl: $(F/1) \\div (F/2)$.',
        ],
        explanation: 'Aynı kuvvetle $a_1 = F/1$ ve $a_2 = F/2$ olur; dolayısıyla hafif arabacık $2$ kat daha çok ivmelenir. Küçük kütle, büyük ivme.',
      },
    },
  },
}

export default ov
