import type { LessonOvFile } from '../schema'

// ─── Physics Quest · Turkish (tr) overlay · part 03: m7, m8, m9 ───────────────
const ov: LessonOvFile = {
  'm7-energy': {
    title: 'İş, Enerji ve Güç',
    tagline: 'Enerji lunapark trenine bin: potansiyel enerji girer, kinetik enerji çıkar — ve çubuklar asla yalan söylemez.',
    objectives: [
      '$W = F \\cdot d$ ile işi hesapla',
      '$KE = \\tfrac{1}{2}mv^2$ ve $PE = mgh$ formüllerini kullan',
      'Enerjinin korunumunu açıkla ve $P = E/t$ ile gücü hesapla',
    ],
    concept: [
      { t: 'p', text: '**Enerji** iş yapma yeteneğidir: hareket ettirmek, ısıtmak, kaldırmak, aydınlatmak. **İş**, enerjinin bir kuvvet aracılığıyla aktarılma biçimidir. Bir kutuyu $F$ kuvvetiyle $d$ mesafesi boyunca (kuvvet yönünde) itersen iş yapmış olursun:' },
      { t: 'formula', caption: 'iş $W$ joule (J), kuvvet $F$ newton, mesafe $d$ metre cinsinden' },
      { t: 'h', text: 'Mekanik enerjinin iki kumbarası' },
      { t: 'p', text: '**Kinetik enerji** hareketin enerjisidir — hareket eden her şeyde bulunur ve hızlı olmak çok daha fazlası demektir (hız karesi alınır!). **Yer çekimi potansiyel enerjisi** yükseklikte depolanan enerjidir — bir şeyi ne kadar yukarı kaldırırsan o kadar çoğunu depolar:' },
      { t: 'formula', caption: 'kinetik enerji J cinsinden: kütle $m$ kg, hız $v$ m/s cinsinden' },
      { t: 'formula', caption: 'potansiyel enerji J cinsinden: seçtiğin sıfır seviyesinin üzerindeki $h$ yüksekliği' },
      { t: 'key', text: 'Enerjinin korunumu: enerji var edilemez ve yok edilemez; yalnızca biçim değiştirir. Sürtünme olmadığında $KE + PE$ tam olarak sabit kalır — kaybedilen her metre yükseklik hıza dönüşür.' },
      { t: 'p', text: 'Lunapark treninin tüm sırrı budur: kaldırma zinciri tepede vagona potansiyel enerjiyi "şarj eder"; sonra tren yol boyunca potansiyel enerjiyi kinetik enerjiyle ve yeniden geriye takas ederek yoluna devam eder. Simülatördeki enerji çubukları asla yalan söylemez — sürtünme bir kısmını **ısı enerjisine** (ısıya) akıtıp götürmeden toplamları başlangıç değerine sabitlenmiş kalır; gerçek trenlerin birinci tepenin ikinciden biraz daha uzun olmasının nedeni de budur.' },
      { t: 'formula', caption: 'güç $P$ watt (W) cinsinden: aktarılan enerji $E$ J, süre $t$ s — 1 W = 1 J/s' },
      { t: 'p', text: '**Güç**, enerjinin ne kadar hızlı aktarıldığını ölçer. Güçlü bir makine aynı işi daha kısa sürede yapar: 100 wattlık ampul her saniye 100 joule "yudumlar"; güçlü bir asansör motoru ise saniyede 10 000 J aktarabilir.' },
    ],
    example: {
      title: 'Lunapark treni: tepeden zemine',
      problem: '500 kg kütleli bir lunapark treni vagonu 10 m yükseklikte duruyor. (a) Potansiyel enerjisi ne kadardır? (b) Tüm potansiyel enerji kinetik enerjiye dönüşürse tabanda hangi hızla hareket eder?',
      steps: [
        { text: 'Tepedeki potansiyel enerji:' },
        { text: 'Tabanda, bunun tamamı kinetik enerjiye dönüşmüş durumda:' },
        { text: '$v$\'yi çöz — kütlenin sadeleştiğine dikkat et; hızı yalnızca yükseklik belirler:' },
      ],
      answer: 'PE $= 49{,}000\\ \\mathrm{J}$ ve tabandaki hız $14\\ \\mathrm{m/s}$ — 10 m düşen herhangi bir cismin ulaştığı hızın aynısı.',
    },
    questions: {
      'm7-p1': {
        prompt: '$3\\ \\mathrm{m/s}$ hızıyla yuvarlanan 2 kg kütleli topun kinetik enerjisi nedir?',
        hints: [
          '$KE = \\tfrac{1}{2} m v^2$ formülünü kullan.',
          '$\\tfrac{1}{2} \\times 2 \\times 3^2$ — önce hızın karesini al!',
        ],
        explanation: '$KE = \\tfrac{1}{2} m v^2 = 0.5 \\times 2 \\times 9 = 9\\ \\mathrm{J}$. Hız iki katına çıkarsa enerji dört katına çıkar.',
      },
      'm7-p2': {
        prompt: 'En yüksek tepenin tabanında, tren vagonunda…',
        choices: [
          'en yüksek PE ve en düşük KE',
          'en düşük PE ve en yüksek KE',
          'sıfır toplam enerji',
          'ikisinin de en yüksek olması',
        ],
        hints: [
          'PE yüksekliğe bağlıdır — tepeyiğin tabanı ne kadar yüksekte?',
          'Orada yükseklik en düşüktür; yani tüm PE hıza takas edilmiştir.',
        ],
        explanation: 'Tabanda yükseklik (ve dolayısıyla PE) en düşüktür; bu yüzden enerjinin korunumu kinetik enerjinin en yüksek olmasını gerektirir — trenlerin en hızlı olduğu yerlerin vadiler olmasının nedeni budur.',
      },
      'm7-q1': {
        prompt: 'Bir vinç, 10 kg kütleli kutuyu sabit hızla 2 m düz yukarı kaldırıyor. Vinç yer çekimine karşı ne kadar iş yapar? ($g = 9.8\\ \\mathrm{m/s^2}$)',
        hints: [
          'Sabit hız, kaldırma kuvveti = ağırlık $mg$ demektir.',
          '$W = F d = mg \\times d = 10 \\times 9.8 \\times 2$',
        ],
        explanation: 'Vinç $F = mg = 98\\ \\mathrm{N}$ kuvvetiyle $d = 2\\ \\mathrm{m}$ boyunca kaldırır; böylece $W = 98 \\times 2 = 196\\ \\mathrm{J}$ — ve PE olarak depolanır.',
      },
      'm7-q2': {
        prompt: 'Düz bir sokakta yuvarlanan bisiklet başlıca hangi tür enerjiyi taşır?',
        choices: ['kinetik', 'yer çekimi potansiyeli', 'ısı', 'nükleer'],
        hints: ['Hareket ediyor.', 'Hareket enerjisine verilen ad…'],
        explanation: 'Hareket eden bisiklet kinetik enerji taşır: $KE = \\tfrac{1}{2}mv^2$. Yüksekliği neredeyse değişmediği için PE kabaca sabit kalır.',
      },
      'm7-q3': {
        prompt: '3 kg kütleli bir kitap, zeminden 5 m yüksekteki rafta duruyor. Yer çekimi potansiyel enerjisi (zemini sıfır kabul edersek) nedir?',
        hints: ['$PE = mgh$ formülünü kullan.', '$3 \\times 9.8 \\times 5$'],
        explanation: '$PE = mgh = 3 \\times 9.8 \\times 5 = 147\\ \\mathrm{J}$ — düşseydi açığa çıkaracağı enerji.',
      },
      'm7-q4': {
        prompt: 'Bir motor 4 s içinde 1000 J enerji aktarıyor. Gücü nedir?',
        hints: ['Güç, saniye başına enerjidir: $P = E/t$.', '$1000 \\div 4$'],
        explanation: '$P = E/t = 1000\\ \\mathrm{J} \\div 4\\ \\mathrm{s} = 250\\ \\mathrm{W}$ — motor her saniye 250 joule teslim eder.',
      },
      'm7-q5': {
        prompt: 'Sürtünme, serbest kayan vagonun $KE + PE$ toplamını küçültür. O enerji aslında nereye gider?',
        choices: [
          'Yok edilir ve kaybolur',
          'Isı enerjisine (ısıya) dönüşür',
          'Kütleye dönüşür',
          'Işık olarak uzaya kaçar',
        ],
        hints: [
          'Enerji asla yok edilmez — uzun bir yokuş aşağıdan sonra jantlara dokun!',
          'Birbirine sürtünen yüzeyler her zaman ısınır.',
        ],
        explanation: 'Sürtünme, mekanik enerjiyi ısı enerjisine dönüştürür: tekerlekler ve pist biraz ısınır. Toplam enerji hâlâ korunur — yalnızca biçim değiştirmiştir.',
      },
    },
  },
  'm8-momentum': {
    title: 'Momentum ve Çarpışmalar',
    tagline: 'Hava rayında diskleri çarpıştır ve momentumun kaybolmayı reddedişini izle.',
    objectives: [
      '$p = mv$ ile momentumu hesapla',
      'Çarpışmalara momentumun korunumunu uygula',
      'Esnek ve esnek olmayan çarpışmaları karşılaştır',
    ],
    concept: [
      { t: 'p', text: '**Momentum**, hareketli bir cismin "ne kadar zor durdurulduğunu" ölçer. Ağır ve hızlı bir kamyonun momentumu boldur; yavaş bir ping-pong topunun neredeyse yoktur. Fizikçiler onu şöyle tanımlar:' },
      { t: 'formula', caption: 'momentum $p$ kg·m/s cinsinden: kütle $m$ kg, hız (yön ile) $v$ m/s — yön önemlidir!' },
      { t: 'p', text: 'Momentum bir **vektördür**: sağa doğru $+5\\ \\mathrm{m/s}$ ile sola doğru $5\\ \\mathrm{m/s}$, birbirini sıfırlayabilen eşit ve zıt momentumlar taşır. İki miktar momentum toplandığında sonuç… hiç olabilir.' },
      { t: 'key', text: 'Momentumun korunumu: herhangi bir çarpışmada ya da patlamada (dışarıdan hiçbir itme yokken), toplam momentum önce = toplam momentum sonra. Her zaman. Kinetik enerji kaybolsa bile.' },
      { t: 'h', text: 'İki tür çarpışma' },
      { t: 'list', items: [
        '**Esnek**: cisimler kusursuz biçimde sekip ayrılır. Momentum **ve** kinetik enerjinin ikisi de korunur — bilardo toplarını ya da hava rayındaki diskleri düşün.',
        '**Esnek olmayan**: cisimler yapışır ya da ezilir. Momentum yine de korunur ama KE\'nin bir kısmı ısıya, sese ve şekil değişimine dönüşür. Tamamen birbirine yapışmak "tam esnek olmayan" çarpışmadır.',
      ] },
      { t: 'p', text: 'KE neden yok olur da momentum neden olmaz? Momentum bir vektördür; zıt momentumlar birbirini silebilir — ama KE her zaman pozitiftir, bu yüzden "kaybolan" KE\'nin saklanacağı yer ancak ısı ve sestir. Momentumu değiştiren itmeye **impuls** denir ($F \\times t$): çarpışma süresi uzadıkça kuvvet küçülür. Bu yüzden arabalarda buruşma bölgeleri vardır ve iniş yaparken dizlerini bükersin.' },
    ],
    example: {
      title: 'Yapışkan çarpışma',
      problem: '$4\\ \\mathrm{m/s}$ hızıyla yuvarlanan 2 kg kütleli bir araba, duran 2 kg kütleli arabaya çarpar ve birbirine yapışırlar. Sonrasında hangi hızla yuvarlanırlar?',
      steps: [
        { text: 'Çarpışmadan önceki toplam momentum:' },
        { text: 'Yapışmış hâldeki 4 kg\'lık toplam kütle, artık tamamını taşıyor:' },
        { text: 'Böl:' },
      ],
      answer: 'Birlikte $2\\ \\mathrm{m/s}$ hızıyla yuvarlanmaya devam ederler. Momentum hayatta kaldı ($8$ kg·m/s, önce de sonra da), ama KE 16 J\'den 4 J\'e düştü — gerisi ısıya ve sese dönüştü.',
    },
    questions: {
      'm8-p1': {
        prompt: '$3\\ \\mathrm{m/s}$ hızıyla yuvarlanan 4 kg kütleli bowling topunun momentumu nedir?',
        hints: [
          'Momentum, kütle × hızdır: $p = mv$.',
          '$4 \\times 3$',
        ],
        explanation: '$p = mv = 4 \\times 3 = 12\\ \\mathrm{kg\\,m/s}$, yuvarlanma yönündedir.',
      },
      'm8-p2': {
        prompt: 'Tam esnek olmayan bir çarpışmada ne olur?',
        choices: [
          'Hem momentum hem de KE kaybolur',
          'Momentum korunur ama KE azalır',
          'Momentum azalır ama KE korunur',
          'İkisi de tam olarak aynı kalır',
        ],
        hints: [
          'Toplam $p$ önce = toplam $p$ sonra — o yasa asla eğilmez.',
          'Yapışmak ısı ve ses üretir; bu enerji KE\'den karşılanır.',
        ],
        explanation: 'Momentum her zaman korunur; ama yapışkan bir çarpışmada kinetik enerjinin bir kısmı ısıya, sese ve şekil değişimine dönüşür — yani sonraki KE, önceki KE değerinden küçüktür.',
      },
      'm8-q1': {
        prompt: '3 kg kütleli bir top $2\\ \\mathrm{m/s}$ ile hareket ediyor. Momentumu nedir?',
        hints: ['$p = mv$ formülünü kullan.', '$3 \\times 2$'],
        explanation: '$p = mv = 3 \\times 2 = 6\\ \\mathrm{kg\\,m/s}$, hareket yönündedir.',
      },
      'm8-q2': {
        prompt: 'İki patenci durgun hâlde bekliyor ve sonra birbirini itiyor. İtmeden sonraki toplam momentum…',
        choices: [
          'sıfır — momentumlar birbirini yok eder',
          'hızlarının toplamı',
          'eski değerinin iki katı',
          'bilmek imkânsız',
        ],
        hints: [
          'İtmeden önce toplam momentum sıfırdı.',
          'Korunum toplamı sıfırda tutar: eşit ve zıt momentumlar.',
        ],
        explanation: 'İkili toplam sıfır momentumla başladı; dolayısıyla sonrasında da sıfır olmalı — patenci eşit ve zıt momentumlarla ($m_1v_1 = -m_2v_2$) geri savrulur.',
      },
      'm8-q3': {
        prompt: '$5\\ \\mathrm{m/s}$ hızındaki 2 kg kütleli araba, durgun 3 kg kütleli arabaya çarpar ve birbirine yapışırlar. Son hızları nedir?',
        hints: [
          'Yapışkan çarpışma: $v = \\frac{m_1 v_1}{m_1 + m_2}$.',
          'Önceki momentum = $10$ kg·m/s; 5 kg tarafından paylaşılıyor.',
        ],
        explanation: '$p = 2 \\times 5 = 10\\ \\mathrm{kg\\,m/s}$; yapıştıktan sonra $v = 10 / (2+3) = 2\\ \\mathrm{m/s}$.',
      },
      'm8-q4': {
        prompt: 'Esnek olsun ya da olmasın, **her** çarpışmada hangi büyüklük korunur?',
        choices: ['Kinetik enerji', 'Hız', 'Momentum', 'Kuvvet'],
        hints: [
          'Yapışkan çarpışmalar bunlardan birini yok eder…',
          'KE yalnızca esnek çarpışmalarda hayatta kalır; öteki her zaman hayatta kalır.',
        ],
        explanation: 'Momentum tüm çarpışmalarda korunur. Kinetik enerji yalnızca çarpışma tam esnek olduğunda korunur.',
      },
      'm8-q5': {
        prompt: '$2\\ \\mathrm{m/s}$ ile hareket eden 1 kg kütleli topun kinetik enerjisi nedir?',
        hints: ['$KE = \\tfrac{1}{2}mv^2$ formülünü kullan.', '$\\tfrac{1}{2} \\times 1 \\times 2^2$'],
        explanation: '$KE = \\tfrac{1}{2}mv^2 = 0.5 \\times 1 \\times 4 = 2\\ \\mathrm{J}$.',
      },
    },
  },
  'm9-circular-motion': {
    title: 'Dairesel Hareket',
    tagline: 'Bir topu ipin ucunda döndür; fizik (ya da ip) kopana dek.',
    objectives: [
      'Dairesel hareketin neden merkeze yönelen bir kuvvet gerektirdiğini açıkla',
      '$a = v^2/r$ ve $F = mv^2/r$ değerlerini hesapla',
      '"Merkezkaç kuvveti" efsanesini çürüt ve yer çekimini uydunun merkezcil kuvveti olarak gör',
    ],
    concept: [
      { t: 'p', text: 'Bir **çember** üzerinde hareket ederken yönün her an değişir — ve değişen hız, hızın kendisi kusursuz biçimde sabit kalsa bile **ivme** demektir. Bir topu ipin ucunda döndür: ip topu sürekli olarak viraja doğru çekiyor ve öykünün tamamı işte bu çekiktir.' },
      { t: 'key', text: 'Dairesel hareket **merkezcil kuvvet** gerektirir: merkeze yönelen gerçek bir kuvvet. Merkeze yönelen kuvvet yoksa → çember de yoktur. Cisim düz bir çizgi boyunca uçar gider.' },
      { t: 'formula', caption: 'merkezcil ivme $a$, m/s² cinsinden: hız $v$ m/s, çember yarıçapı $r$ m cinsinden' },
      { t: 'formula', caption: 'bu kuvveti ip, ray ya da yer çekimi sağlamalıdır — bizim top için bu, ipin germe kuvvetidir' },
      { t: 'p', text: '$v^2$\'nin acımasızlığına dikkat: **hızı iki katına çıkarırsan dört katına kuvvet gerekir**. Daha dar çemberler de daha zordur — aynı hızda yarıçapı yarıya indir, gerekli kuvvet iki katına çıkar. Bu yüzden 80 km/h ile viraja giren arabanın tutuş ihtiyacı, 40 km/h\'dekinden çok daha fazladır.' },
      { t: 'key', text: 'Topun üzerinde **dışa yönelen bir "merkezkaç kuvveti" yoktur**. Dönen bir oyuncakta hissettiğin şey kendi eylemsizliğindir — bedenin düz bir çizgide gitmeye çalışırken koltuk ya da kapı seni içeri doğru iter. Dışarıdan bakınca tek gerçek yatay kuvvet, içe yönelen olandır.' },
      { t: 'list', items: [
        'Başın üzerinde döndürülen su dolu kova: kovanın tabanı içe doğru iter — tepede yer çekimi, suyun içeride kalmasına yardım eder.',
        'Looping pisti: ray, merkeze yönelen itmeyi sağlar.',
        'Bir uydu: **yer çekiminin kendisi merkezcil kuvvettir** — Ay, sonsuza dek Dünya çevresinde "düşer"; hep ona doğru ivmelenir ama asla yaklaşmaz.',
      ] },
    ],
    example: {
      title: '0.5 kg\'lık topu döndürmek',
      problem: '0.5 kg kütleli bir top, $4\\ \\mathrm{m/s}$ hızla $1\\ \\mathrm{m}$ uzunluğunda bir ip üzerinde döndürülüyor. Merkezcil ivmesini ve ipin germe kuvvetini bul.',
      steps: [
        { text: 'Önce merkezcil ivme:' },
        { text: 'Sonra ipin sağlaması gereken kuvvet:' },
        { text: 'Çarp:' },
      ],
      answer: '$a = 16\\ \\mathrm{m/s^2}$ (yer çekiminden bile büyük!) ve germe kuvveti $8\\ \\mathrm{N}$; toptan doğrudan eline doğru yönelir.',
    },
    questions: {
      'm9-p1': {
        prompt: 'Bir top $2\\ \\mathrm{m/s}$ hızıyla $0.5\\ \\mathrm{m}$ yarıçaplı bir çember üzerinde hareket ediyor. Merkezcil ivmesi $a = v^2/r$ kaçtır?',
        hints: [
          'Önce hızın karesini al, sonra yarıçapa böl.',
          '$2^2 = 4$ ve $4 \\div 0.5$',
        ],
        explanation: '$a = v^2/r = 4 / 0.5 = 8\\ \\mathrm{m/s^2}$ — çemberin merkezine yöneliktir.',
      },
      'm9-p2': {
        prompt: 'İp, topu çember boyunca döndürürken topa etki eden net kuvvet…',
        choices: ['hızı boyunca', 'merkeze doğru', 'merkezden dışarı doğru', 'düz aşağı'],
        hints: [
          'Hangi yöndeki kuvvet düz bir çizgiyi çembere çevirir?',
          '"Merkezi arayan", merkezcil kelimesinin tam karşılığıdır.',
        ],
        explanation: 'Net (merkezcil) kuvvet her zaman merkeze yönelir — hızı sürekli çembere büken şey budur. Hızın kendisi ise teğet boyunca yönelir.',
      },
      'm9-q1': {
        prompt: 'Aynı çemberde hızı iki katına çıkarırsan merkezcil ivme…',
        choices: ['iki katına çıkar', 'dört katına çıkar', 'yarıya iner', 'aynı kalır'],
        hints: ['$a = v^2/r$ — üsse bak.', '$2^2 = 4$'],
        explanation: '$a = v^2/r$ olduğundan, $v$\'yi iki katına çıkarmak $a$\'yı $2^2 = 4$ ile çarpar. Hız karesiyle gelir; hızlı viraj almanın bu kadar zorlu olmasının nedeni budur.',
      },
      'm9-q2': {
        prompt: '1 kg kütleli bir top, $3\\ \\mathrm{m/s}$ hızıyla $1\\ \\mathrm{m}$ uzunluğunda bir ip üzerinde döndürülüyor; ipin germe kuvvetini bul.',
        hints: ['$F = mv^2/r$ formülünü kullan.', '$1 \\times 9 \\div 1$'],
        explanation: '$F = mv^2/r = 1 \\times 9 / 1 = 9\\ \\mathrm{N}$ — ipin sağlaması gereken içe doğru çekiş budur.',
      },
      'm9-q3': {
        prompt: 'İp aniden kopar. Top ne yapar?',
        choices: [
          'merkezden dışarı doğru uçar',
          'bir süre daha kıvrılmayı sürdürür',
          'teğet boyunca düz bir çizgide uçar',
          'düz aşağı düşer',
        ],
        hints: [
          'Kuvvet yokken kıvrım da yoktur.',
          'Newton\'un birinci yasası: top, o andaki hızını korur.',
        ],
        explanation: 'Kopma anında top, teğet boyunca yönelen anlık hızını korur — dolayısıyla düz bir çizgide gider. Onu radyal olarak dışarı fırlatacak gizemli bir dış kuvvet yoktur.',
      },
      'm9-q4': {
        prompt: 'Bir oyuncak araba, $2\\ \\mathrm{m}$ yarıçaplı bir çemberi $6.28\\ \\mathrm{m/s}$ ile dolaşıyor. Periyodu $T = 2\\pi r / v$ (tur başına süre) kaçtır?',
        hints: [
          '$T = 2\\pi r / v$ — bir tur uzunluğunun hıza bölümü.',
          '$2\\pi \\times 2 = 12.57$; şimdi $6.28$\'e böl.',
        ],
        explanation: '$T = 2\\pi r / v = 12.57 / 6.28 \\approx 2\\ \\mathrm{s}$, tur başına.',
      },
      'm9-q5': {
        prompt: 'Uydular uzaya fırlayıp gitmek yerine neden yörüngede kalır?',
        choices: [
          'Yer çekiminin erişim alanının dışındadırlar',
          'Yer çekimi merkezcil kuvvet görevi görür',
          'Merkezkaç kuvveti dengeli biçimde onları dışarı iter',
          'Motorları çalışmaya devam eder',
        ],
        hints: [
          'Bir şey, yörüngelerini çembere bükmeli…',
          'Merkeze yönelen çekim, yer çekiminin ta kendisidir.',
        ],
        explanation: 'Yer çekimi, uydunun yolunu bükmek için gereken $F = mv^2/r$ merkezcil kuvvetini tam olarak sağlar — uydu, Dünya çevresinde sonsuza dek "düşer".',
      },
    },
  },
}

export default ov
