// ─── Physics Quest · Turkish (tr) overlay · part-15: e5, e6, e7 ───────────────
import type { LessonOvFile } from '../schema'

const ov: LessonOvFile = {
  'e5-gauss-flux': {
    title: 'Elektrik Akısı ve Gauss Yasası',
    tagline: 'Bir yüzeyi delen alan çizgilerini sayın ve küreler, silindirler ve düzlemler için kestirmenin kilidini açın.',
    objectives: [
      '$\\Phi = EA\\cos\\theta$ ile elektrik akısını hesaplayın ve neyin onu değiştirdiğini öngörün',
      'Gauss yasasını ifade edin ve kapalı yüzeylerde $\\Phi = q_{\\text{enc}}/\\varepsilon_0$ değerini kullanın',
      'Simetriden yararlanarak kürenin, silindirin ve düz bir düzlemin alanını bulun',
    ],
    concept: [
      { t: 'p', text: 'Alan çizgileri yalnızca bir çizim hilesi değildir — onlar **sayılır**. Bir yüzeyi delen her alan çizgisi az miktarda “içinden geçen alan” taşır ve fizikçiler buna bir ad verir: **elektrik akısı**. Yağmurda çemberi eğin, daha az su geçer; alan içinde bir yüzeyi eğin, daha az akı geçer. Fikir aynıdır ve fiziğin en güçlü kestirmelerinden birine götürür.' },
      { t: 'h', text: 'Akı: ne kadar alan bir yüzeyi deler' },
      { t: 'p', text: '**Düzgün bir alan** içindeki **düz bir yüzey** için akı, eğim düzeltmesi yapılmış alan şiddeti × alan toplamıdır. $\\theta$ açısı, $\\vec{E}$ alanı ile yüzeyden dik olarak dışarı uzanan **normal** arasında ölçülür. Birimi $\\mathrm{N{\\cdot}m^2/C}$’dir.' },
      { t: 'formula', caption: 'düz bir yüzeyden geçen $\\Phi$ akısı: $E$ alanı N/C cinsinden, $A$ alanı $\\mathrm{m^2}$ cinsinden, $\\theta$ alan ile yüzey normali arasındaki açı' },
      { t: 'p', text: 'Kosinüs eğimi halleder: yüzeyi alana tam karşı getirin ($\\theta = 0^\\circ$, $\\cos\\theta = 1$), akı **en büyük** olur; yüzeyi yana yatırın ($\\theta = 90^\\circ$, $\\cos\\theta = 0$) ve **hiçbir alan çizgisi onu delmez** — gün batımında güneş paneli ya da güneşlenen biri gibi.' },
      { t: 'h', text: 'Kapalı yüzeyler ve Gauss yasası' },
      { t: 'p', text: 'Şimdi yüzeyi **kapalı bir torbaya** dönüştürün — bir küre, bir kutu, bir balon. **Dıştaki** yüklerden gelen alan çizgileri bir yandan girip öte yandan çıkar, bu yüzden birbirini götürür: giren her çizgi çıkmak zorundadır. Yalnızca **içteki yüklerde başlayan ya da biten** çizgiler net fazlalık bırakır. Bu muhasebe **Gauss yasası**dır:' },
      { t: 'formula', caption: 'herhangi bir kapalı yüzeyden geçen net akı = kapsanan yük ÷ $\\varepsilon_0$; burada $\\varepsilon_0 = 8.854\\times10^{-12}\\ \\mathrm{C^2/(N{\\cdot}m^2)}$ boşluğun geçirgenliğidir' },
      { t: 'p', text: '$r$ yarıçaplı bir kürenin merkezine $q$ nokta yükünü koyun. Simetri gereği alan yüzeyin her yerinde aynıdır; $\\Phi = E\\times 4\\pi r^2$ ve $E = kq/r^2$ olduğundan $r^2$’ler **sadeleşir** ve akı $q/\\varepsilon_0$ kalır — **yarıçaptan bağımsız**. Aynı yükü çevreleyen küp de bu akıyı altı yüzüne paylaştırır. “Alan çizgileri akıdır” resminin işe yaraması bundandır: çizgi sayısı yalnızca torbanın içinde hapsolmuş yüke bağlıdır, torbanın biçimine asla.' },
      { t: 'p', text: 'Aynı hile iletkenleri de çözer. Dengedeki **iletken küre** üzerindeki yük dış yüzeye yayılır; böylece **metal içindeki alan tam olarak sıfırdır** — Gauss yasası, içi boş kabuğun kapsadığı yükün sıfır olduğunu söyler — **dışında** ise küre tam olarak merkezindeki nokta yükü gibi davranır. Yıldırımdan korunma ve Faraday kafesleri bu yüzden çalışır.' },
      { t: 'h', text: 'Simetri süper güçtür' },
      { t: 'p', text: 'Gauss yasası *her zaman* doğrudur ama $E$ için şık bir formülü yalnızca simetri alanı, hesaplayabileceğiniz bir yüzey üzerinde sabit tuttuğunda elinize verir. Üç biçim ödülü alır:' },
      { t: 'list', items: [
        '**Küre** (ya da nokta yük): $E$ $1/r^2$ gibi düşer — ters kare yasası.',
        '**Uzun yüklü silindir**: $E$ $1/r$ gibi düşer — çizgi ile nokta arası bir yer.',
        '**Geniş düz düzlem**: $E$ **sabittir** — hiç düşmez; paralel plakalı kondansatörlerin alanı bu yüzden bu kadar düzgündür.',
      ] },
      { t: 'table', headers: ['Yüklü cisim', 'Elektrik alan', 'Nasıl düşer'], rows: [
        ['Nokta yük / küre (dışında)', '$E = \\dfrac{k\\,q}{r^2}$', '$1/r^2$ gibi'],
        ['İletken küre (metal içinde)', '$E = 0$', 'hiç alan yok'],
        ['Uzun silindir (dışında)', '$E = \\dfrac{\\lambda}{2\\pi\\varepsilon_0 r}$', '$1/r$ gibi'],
        ['Geniş düz düzlem', '$E = \\dfrac{\\sigma}{2\\varepsilon_0}$', 'sabit'],
      ] },
      { t: 'p', text: 'Burada $\\lambda$ silindirin **metre başına** yükü, $\\sigma$ düzlemin **metrekare başına** yüküdür. Gauss’tan türeyen iki kesri ezberlemenize gerek yok — bunun yerine *hangi simetrinin hangi düşüşü verdiğini* hatırlayın.' },
      { t: 'key', text: 'Gauss yasası: herhangi bir kapalı yüzeyden geçen net akı, kapsanan yükün $\\varepsilon_0$’ya bölümüdür — başka hiçbir şey önemli değildir. Simetri, onu kürelerin, silindirlerin ve düzlemlerin alanı için bir kestirmeye çevirir.' },
    ],
    example: {
      title: 'Küreden geçen akı — boyut fark etmez!',
      problem: 'q = 3 nC yüklü minik bir bilye, 0.2 m yarıçaplı içi boş bir kürenin merkezinde duruyor. Küreden geçen elektrik akısı nedir? Yarıçap 2 m olsaydı değişir miydi?',
      steps: [
        { text: 'Bildiğinizi yazın:' },
        { text: 'Gauss yasası yalnızca kapsanan yüke gereksinim duyar:' },
        { text: 'Bölün:' },
        { text: 'Uzun yoldan denetleyin — alan çarpı küresel alan ($r^2$ sadeleşir):' },
      ],
      answer: 'Akı $\\Phi \\approx 339\\ \\mathrm{N{\\cdot}m^2/C}$ — küre 2 m ya da 2 km genişliğinde olsaydı da $339\\ \\mathrm{N{\\cdot}m^2/C}$ kalırdı. Akıyı yalnızca kapsanan yük belirler.',
    },
    questions: {
      'e5-p1': {
        prompt: '200 N/C’lik düzgün bir alan tam karşıdan (θ = 0°) 0.5 m × 0.5 m boyutlarında düz bir pencereden geçiyor. Pencereden geçen elektrik akısı nedir?',
        hints: [
          '$\\cos 0^\\circ = 1$ ile $\\Phi = EA\\cos\\theta$ kullanın.',
          'Alan $0.5 \\times 0.5 = 0.25\\ \\mathrm{m^2}$’dir; öyleyse $\\Phi = 200 \\times 0.25$.',
        ],
        explanation: '$A = 0.5\\times0.5 = 0.25\\ \\mathrm{m^2}$ ve $\\cos 0^\\circ = 1$; öyleyse $\\Phi = EA = 200\\ \\mathrm{N/C} \\times 0.25\\ \\mathrm{m^2} = 50\\ \\mathrm{N{\\cdot}m^2/C}$.',
      },
      'e5-p2': {
        prompt: 'Kapalı bir yüzeyden 339 N·m²/C net elektrik akısı geçiyor. İçinde ne kadar yük kapsanıyor? Yanıtı nC cinsinden verin.',
        hints: [
          'Gauss yasası: $q_{\\text{enc}} = \\Phi\\,\\varepsilon_0$.',
          '$\\varepsilon_0 = 8.854\\times10^{-12}$; öyleyse $q = 339 \\times 8.854\\times10^{-12}\\ \\mathrm{C}$.',
        ],
        explanation: '$q = \\Phi\\,\\varepsilon_0 = 339\\ \\mathrm{N{\\cdot}m^2/C} \\times 8.854\\times10^{-12}\\ \\mathrm{C^2/(N{\\cdot}m^2)} \\approx 3.0\\times10^{-9}\\ \\mathrm{C} = 3\\ \\mathrm{nC}$.',
      },
      'e5-p3': {
        prompt: 'Katı bir metal küre, yüzeyine yayılmış Q net yükü taşıyor. Metalin içindeki elektrik alan nedir?',
        choices: [
          'Metalin içinde her yerde sıfır',
          'Yüzeydeki değerle tam olarak aynı',
          'Yüzeydeki değerin iki katı',
          'Kürenin yarıçapıyla büyür',
        ],
        hints: [
          'Metalin gömüsüne bir Gauss yüzeyi yerleştirin.',
          'İletkenin içindeki bir yüzey ne kadar yük kapsar?',
        ],
        explanation: 'Metalin içindeki Gauss yüzeyi hiç yük kapsamaz (tüm yük dış yüzeydedir); öyleyse Gauss yasası $\\Phi = 0$ verir ve simetri gereği iletkende her yerde $E = 0$ olur.',
      },
      'e5-p4': {
        prompt: 'Düz bir çember, alan yüzeyi boyunca süzülene dek döndürülüyor (alan ile çemberin normali arasında θ = 90°). Çemberden geçen akı nedir?',
        choices: ['En büyük', 'En büyüğün yarısı', 'Sıfır', 'Negatif'],
        hints: [
          '$\\Phi = EA\\cos\\theta$’ya bakın.',
          '$\\cos 90^\\circ$ kaçtır?',
        ],
        explanation: '$\\Phi = EA\\cos 90^\\circ = EA \\times 0 = 0$. Alana yan dönükken hiçbir alan çizgisi çemberi delemez — yağmurda pencereyi yana tutmak gibi.',
      },
      'e5-q1': {
        prompt: '+2 nC’lik nokta yükten 0.3 m uzaklıktaki elektrik alan nedir? (k = 8.99 × 10⁹ N·m²/C²)',
        hints: [
          'Yüklü kürenin dışındaki alan için $E = kq/r^2$ kullanın.',
          '$E = \\dfrac{8.99\\times10^9 \\times 2\\times10^{-9}}{0.3^2} = \\dfrac{17.98}{0.09}$',
        ],
        explanation: '$E = kq/r^2 = (8.99\\times10^9)(2\\times10^{-9})/(0.3)^2 = 17.98/0.09 \\approx 200\\ \\mathrm{N/C}$, pozitif yükten uzaklaşacak yönde.',
      },
      'e5-q2': {
        prompt: 'Bir nokta yük balonun içinde duruyor. Balonu yarıçapı iki katına çıkacak kadar şişiriyorsunuz. Balonun yüzeyinden geçen toplam akı ne olur?',
        choices: ['İki katına çıkar', 'Yarıya iner', 'Tam olarak aynı kalır', 'Sıfır olur'],
        hints: [
          'Gauss yasası: $\\Phi = q/\\varepsilon_0$. $q$ değişti mi?',
          'Yükü çevreleyen herhangi bir kapalı torbadan aynı sayıda alan çizgisi geçer.',
        ],
        explanation: 'Gauss yasası $\\Phi = q_{\\text{enc}}/\\varepsilon_0$ der; bu yalnızca kapsanan yüke bağlıdır. Balonu şişirmek aynı akıyı daha geniş bir alana yayar ama toplam hiç değişmez.',
      },
      'e5-q3': {
        prompt: 'Bir nokta yük, kübik bir kutunun tam merkezinde duruyor. Altı yüzün hepsinden geçen toplam akı 600 N·m²/C. TEK bir yüzden geçen akı nedir?',
        hints: [
          'Simetri: yük tam merkezdedir, her yüz özdeştir.',
          'Toplamı eşit paylaştırın: $600 \\div 6$.',
        ],
        explanation: 'Simetri gereği özdeş altı yüzün her biri akının altıda birini taşır: $\\Phi_{\\text{face}} = 600/6 = 100\\ \\mathrm{N{\\cdot}m^2/C}$.',
      },
      'e5-q4': {
        prompt: 'Gauss yasası, yüklü bir kürenin alanını bulmayı neden bu kadar kolaylaştırır?',
        choices: [
          'Çünkü küreler yuvarlaktır ve hiçbir şey kaçamaz',
          'Çünkü simetri, E’yi küresel yüzeyin her noktasında eşit kılar; böylece akıdan dışarı çekilir',
          'Çünkü ε₀ çok küçük bir sayıdır',
          'Çünkü küreden geçen akı her zaman sıfırdır',
        ],
        hints: [
          '$\\Phi = E\\times A$’nın tek adımda çözülebilmesi ne gerektirir?',
          'E yüzeyin her yerinde özdeşse onu integralin dışına çıkarabilirsiniz.',
        ],
        explanation: 'Küresel simetri, $E$’yi her merkezli küre üzerinde sabit tutar; öyleyse $\\Phi = E\\times4\\pi r^2$. Bunu $q/\\varepsilon_0$’ya eşitlemek tek satırda $E = kq/r^2$ verir.',
      },
      'e5-q5': {
        prompt: 'Kapalı bir yüzey 226 N·m²/C net akı taşıyor. Ne kadar yük kapsıyor? Yanıtı nC cinsinden verin.',
        hints: [
          'Gauss yasasını düzenleyin: $q = \\Phi\\,\\varepsilon_0$.',
          '$q = 226 \\times 8.854\\times10^{-12}\\ \\mathrm{C}$.',
        ],
        explanation: '$q = \\Phi\\,\\varepsilon_0 = 226 \\times 8.854\\times10^{-12} \\approx 2.0\\times10^{-9}\\ \\mathrm{C} = 2\\ \\mathrm{nC}$ — yüzeyin biçimi önemsizdir.',
      },
    },
  },
  'e6-potential': {
    title: 'Elektrik Potansiyeli ve Enerji',
    tagline: 'Yüklerin enerji tepesine tırmanın — volt, yalnızca coulomb başına joule’dır.',
    objectives: [
      'Elektrik potansiyelini coulomb başına potansiyel enerji olarak tanımlayın: $V = U/q$',
      '$V = kq/r$ değerini hesaplayın ve birden çok yükün potansiyellerini skaler olarak toplayın',
      'Elektriksel enerjiyi izlemek için $W = q\\Delta V$ ve elektronvoltu kullanın',
    ],
    concept: [
      { t: 'p', text: 'Sırt çantasını yokuş yukarı kaldırın, yerçekimi potansiyel enerjisi kazanır; bırakın, yerçekimi onu harekete çevirir. Yükler de aynı türde bir tepe hisseder. İki aynı türde yük birbirine yaklaştırıldığında **elektrik potansiyel enerjisi** depolanır ve bir başka yükün alanına bırakılan yük, görünmez bir **enerji arazisinin** bir yerinde durur — $+$ yükün yanındaki tepenin üstünde, $-$ yükün yanındaki vadide.' },
      { t: 'h', text: 'Potansiyel: coulomb başına enerji' },
      { t: 'p', text: 'Arazinin kendisi — hiçbir belirli deneme yüküne bağlanmamış — **elektrik potansiyeli** $V$ ile tanımlanır: **birim yük başına** potansiyel enerji. Birimi **volt**tur: $1\\ \\mathrm{V} = 1\\ \\mathrm{J/C}$. 9 voltluk pil, her coulomb’u 9 joule yukarı kaldıran bir merdivendir.' },
      { t: 'formula', caption: 'potansiyel $V$ volt (V) cinsinden, potansiyel enerji $U$ joule (J) cinsinden, yük $q$ coulomb (C) cinsinden' },
      { t: 'formula', caption: 'nokta yük $q$’dan $r$ uzaklıktaki potansiyel — $+$ yüklerin yanında pozitif, $-$ yüklerin yanında negatif' },
      { t: 'p', text: 'Güzel olan kısım burası: potansiyel bir **skaler**dir. $\\vec{E}$ alanının aksine yönü yoktur — birden çok yükün potansiyelleri, negatifler dâhil, düz **sayılar gibi toplanır**. Bu, $V$ haritalarını $\\vec{E}$ haritalarından çok daha kolay çizip kullanılabilir kılar.' },
      { t: 'h', text: 'Eşpotansiyel yüzeyler' },
      { t: 'p', text: 'Aynı potansiyele sahip tüm noktaları birleştirin; bir **eşpotansiyel yüzey** elde edersiniz — enerji arazisinin eş yükselti eğrisi. Alan çizgileri eşpotansiyelleri her zaman **dik açıyla** keser ve bir yükü eşpotansiyel *boyunca* kaydırmak **sıfır iş** gerektirir — yükseklik değişmez, enerji de; tam olarak yamaçtaki eş yükselti eğrisi boyunca yürümek gibi.' },
      { t: 'formula', caption: '$q$ yükünü $\\Delta V$ potansiyel farkından geçirmek için gereken iş (enerji) — $q$ coulomb cinsinden olduğunda joule cinsindendir' },
      { t: 'p', text: 'Minicik tanecikler için joule’lar saçma sapan büyüktür. Fizikçiler **elektronvoltu** kullanır: bir elektronun $1\\ \\mathrm{V}$’dan geçerken kazandığı enerji.' },
      { t: 'formula', caption: '5000 V ile hızlanan bir elektron 5000 eV kinetik enerji kazanır' },
      { t: 'p', text: '**Paralel plakalar** arasında alan düzgündür; öyleyse potansiyel bir plakadan ötekine düzenli biçimde tırmanır: $V = Ed$, ya da $E = V/d$. Aynı voltajda arayı iki katına çıkarın, alan yarıya iner — kondansatör diyarında sürekli kullanacağınız bir kural.' },
      { t: 'p', text: 'Bir kuş neden 100.000 voltluk enerji hattına zarar görmeden konabilir? İki ayağı, birbirinden zor bir santimetre uzaklıktaki iki noktada tele değiyor; öyleyse gövdesi boyunca potansiyel fark **mikrovolt** mertebesinde. $W = q\\Delta V$ ile minicik bir $\\Delta V$, neredeyse hiç enerji ve kuştan geçen hiç akım demektir. Tehlike $\\Delta V$’de yaşar, tek başına $V$’de değil.' },
      { t: 'table', headers: ['Durum', 'Potansiyel $V$', 'Alan $E$'], rows: [
        ['$r$ uzaklıkta nokta yük $q$', '$V = \\dfrac{k\\,q}{r}$ (skaler, negatif olabilir)', '$E = \\dfrac{k\\,q}{r^2}$ (vektör)'],
        ['$d$ aralıklı paralel plakalar', '$V = E\\,d$', '$E = \\dfrac{V}{d}$ (düzgün)'],
        ['Birden çok yük birlikte', '$V$ değerlerini düz sayılar gibi toplayın', '$E$ oklarını uçtan uca ekleyin'],
      ] },
      { t: 'key', text: 'Potansiyel, coulomb başına enerjidir ($V = U/q$) — basit aritmetikle topladığınız bir skaler. Yük taşımak için gereken iş $W = q\\Delta V$’dir ve 1 eV, $1.6\\times10^{-19}$ J’dir.' },
    ],
    example: {
      title: '12 voltluk farktan yük taşıtmak',
      problem: '+2 μC’lik bir yük, 12 V potansiyel farkı olan iki nokta arasında yavaşça taşınıyor. Bu ne kadar iş tutar?',
      steps: [
        { text: 'Bildiğinizi yazın:' },
        { text: 'İş–potansiyel bağlantısını kullanın:' },
        { text: 'Çarpın:' },
        { text: 'Daha elverişli birimlere çevirin:' },
      ],
      answer: 'Taşıma, yüke $W = q\\Delta V = 2.4\\times10^{-5}\\ \\mathrm{J} = 24\\ \\mu\\mathrm{J}$ elektrik potansiyel enerjisi depolar — coulomb’lar için harçlık, tek elektronlar için kocaman.',
    },
    questions: {
      'e6-p1': {
        prompt: '3 μC’lik bir yük 10 V potansiyel farkından geçiriliyor. Ne kadar iş yapılır? μJ cinsinden yanıtlayın.',
        hints: [
          '$W = q\\Delta V$ kullanın.',
          '$W = 3\\times10^{-6} \\times 10\\ \\mathrm{J}$ — sonra mikrojoule’a çevirin.',
        ],
        explanation: '$W = q\\Delta V = 3\\times10^{-6}\\ \\mathrm{C} \\times 10\\ \\mathrm{V} = 3\\times10^{-5}\\ \\mathrm{J} = 30\\ \\mu\\mathrm{J}$.',
      },
      'e6-p2': {
        prompt: '+2 nC’lik nokta yükten 9 cm uzaklıktaki elektrik potansiyeli nedir? (k = 8.99 × 10⁹ N·m²/C²)',
        hints: [
          '$V = kq/r$ kullanın — alan değil, potansiyel.',
          '$V = \\dfrac{8.99\\times10^9 \\times 2\\times10^{-9}}{0.09}$',
        ],
        explanation: '$V = kq/r = (8.99\\times10^9)(2\\times10^{-9})/0.09 \\approx 200\\ \\mathrm{V}$. $1/r$’ye dikkat — potansiyel, alanın $1/r^2$ düşüşünden daha yumuşak söner.',
      },
      'e6-p3': {
        prompt: 'Bir deneme yükü eşpotansiyel çizgi boyunca kayıyor. Elektrik kuvveti üzerinde ne kadar iş yapar?',
        choices: ['Olası en büyük', 'Sıfır', 'Negatif bir miktar', 'Tam olarak q × E'],
        hints: [
          'İş, potansiyel değişimiyle ilişkilidir: $W = q\\Delta V$.',
          'Eşpotansiyel boyunca $\\Delta V$ kaçtır?',
        ],
        explanation: 'Eşpotansiyel boyunca $\\Delta V = 0$’dır; öyleyse $W = q\\Delta V = 0$. Enerji arazisinde yükseklik değişmemek, enerjinin değişmemesi demektir.',
      },
      'e6-p4': {
        prompt: 'Bir elektronvolt (1 eV) şuna eşittir…',
        choices: [
          '$1.6\\times10^{-19}\\ \\mathrm{J}$',
          '$1.6\\times10^{-19}\\ \\mathrm{C}$',
          'Tam olarak 1 joule',
          'Bir voltluk yük',
        ],
        hints: [
          'Bu bir enerji birimidir: bir elektron için enerji = yük × voltaj.',
          '$e = 1.6\\times10^{-19}\\ \\mathrm{C}$ ile $1\\ \\mathrm{eV} = e\\times1\\ \\mathrm{V}$.',
        ],
        explanation: '1 V’tan geçen bir elektron ($1.6\\times10^{-19}\\ \\mathrm{C}$), $W = qV = 1.6\\times10^{-19}\\ \\mathrm{J}$ kazanır. Bu enerji 1 eV olarak tanımlanır.',
      },
      'e6-q1': {
        prompt: 'Bir pil, 5 C yükü 12 V potansiyel farkından geçiriyor. Ne kadar enerji aktarılır?',
        hints: ['$W = q\\Delta V$ kullanın.', '$5 \\times 12$'],
        explanation: '$W = q\\Delta V = 5\\ \\mathrm{C} \\times 12\\ \\mathrm{V} = 60\\ \\mathrm{J}$ — pil her coulomb’a 12 joule’luk bir yükseliş verir.',
      },
      'e6-q2': {
        prompt: 'Elektrik potansiyeli hakkında hangi ifade DOĞRUdur?',
        choices: [
          'Elektrik alan gibi o da bir vektördür',
          'Negatif olabilir ve birden çok yükün potansiyelleri düz sayılar gibi toplanır',
          'Newton bölü coulomb cinsinden ölçülür',
          'Zıt iki yük arasında her zaman pozitiftir',
        ],
        hints: [
          'Alanla karşılaştırın: hangisi yön taşır?',
          '$-$ yük bir vadi açar: negatif potansiyel.',
        ],
        explanation: 'Potansiyel, yönü olmayan bir skalerdir: $V = kq/r$ negatif yüklerin yanında negatiftir ve toplam potansiyeller düpedüz sayısal toplanır. $\\vec{E}$ (N/C) alanı vektör olan odur.',
      },
      'e6-q3': {
        prompt: 'Bir elektron 5000 V’luk potansiyel farkından hızlanarak geçiyor. eV cinsinden ne kadar kinetik enerji kazanır?',
        hints: [
          'Bir volt hızlanma, bir elektrona tam olarak 1 eV verir.',
          'Öyleyse 5000 V kaç eV verir?',
        ],
        explanation: 'Her volt elektrona 1 eV verir; öyleyse 5000 V, $5000\\ \\mathrm{eV} = 5000\\times1.6\\times10^{-19} = 8\\times10^{-16}\\ \\mathrm{J}$ verir.',
      },
      'e6-q4': {
        prompt: 'Bir kuş neden tek bir yüksek gerilim teli üzerinde zarar görmeden durabilir?',
        choices: [
          'Kuşların ayakları doğal yalıtkandır',
          'İki ayak da neredeyse aynı potansiyeldedir; öyleyse kuştan neredeyse hiç akım geçmez',
          'Teller voltaj taşır ama enerji taşımaz',
          'Kuşlar, elektriğin kaldıramayacağı kadar hafiftir',
        ],
        hints: [
          'Akımların itilmesi bir potansiyel fark gerektirir.',
          'Aynı tel üzerinde bir santimetre aralıklı iki nokta arasındaki $\\Delta V$ nedir?',
        ],
        explanation: 'İki ayak da neredeyse aynı potansiyele değdiği için $\\Delta V \\approx 0$ ve $W = q\\Delta V \\approx 0$ — fiilen hiç itme, kuştan geçen hiç akım yoktur. Farklı potansiyelli ikinci bir tele dokunmak öldürücü olurdu.',
      },
      'e6-q5': {
        prompt: 'Araları 2 mm olan iki paralel plaka, 100 V’luk pile bağlıdır. Aralarındaki elektrik alan V/m cinsinden nedir?',
        hints: [
          'Plakalar arasında düzgün alan: $E = V/d$.',
          '$E = 100 / 0.002$ — önce 2 mm’yi metreye çevirin.',
        ],
        explanation: '$E = V/d = 100\\ \\mathrm{V} / 0.002\\ \\mathrm{m} = 50{,}000\\ \\mathrm{V/m}$. Daha dar aralıklar aynı voltajı daha güçlü bir alana sıkıştırır.',
      },
    },
  },
  'e7-capacitance': {
    title: 'Kondansatörler ve Dielektrikler',
    tagline: 'Plaka plaka: yük yığın, dielektrik sokun ve enerjiyi bir elektrik alanına kaldırın.',
    objectives: [
      '$C = Q/V$ ve $C = \\kappa\\varepsilon_0A/d$ değerlerinden kapasitansı hesaplayın',
      'Plaka alanının, aralık boyutunun ve dielektriklerin depolanan yükü ve enerjiyi nasıl değiştirdiğini öngörün',
      'Kondansatörleri seri ve paralel birleştirin ve depolanan enerjiyi $U = \\tfrac{1}{2}CV^2$ ile hesaplayın',
    ],
    concept: [
      { t: 'p', text: 'Kamera flaşı, bir pilin verebileceğinden çok daha hızlı bir enerji yumruğu gerektirir; defibrilatör, kalbi yeniden başlatmaya yetecek kadarını ister. İkisi de bunu bir **kondansatörden** alır — aralarında bir boşluk olan ve pile bağlanmış iki metal plaka. Yük bir plakada yığılır, ötekinden çekilir; ayrılan yük, plakalar arasındaki elektrik alanda enerji depolar.' },
      { t: 'h', text: 'Kapasitans: volt başına depolanan yük' },
      { t: 'p', text: 'Ne kadar çok voltaj uygularsanız, o kadar çok yük yığılır. Bu oran — uygulanan volt başına depolanan yük — **kapasitans** $C$’dir ve **farad** ile ölçülür ($1\\ \\mathrm{F} = 1\\ \\mathrm{C/V}$). Bir farad kocamandır; öyleyse gerçek kondansatörler pikofarad ($\\mathrm{pF} = 10^{-12}\\ \\mathrm{F}$) ya da mikrofarad ($\\mu\\mathrm{F} = 10^{-6}\\ \\mathrm{F}$) sınıfındadır.' },
      { t: 'formula', caption: 'kapasitans $C$ farad (F) cinsinden, depolanan yük $Q$ coulomb (C) cinsinden, uygulanan voltaj $V$ volt (V) cinsinden' },
      { t: 'h', text: 'İyi bir kondansatörü ne yapar?' },
      { t: 'p', text: '**Paralel plakalı** kondansatörde her şeye geometri karar verir: daha büyük plakalar daha çok yük tutar, **daha dar boşluk** zıt yüklerin birbirini daha güçlü çekmesine izin verir (onları daha sıkı yığar) ve plakaların arasına yalıtkan bir **dielektrik** sokmak tüm sonucu çarpar.' },
      { t: 'formula', caption: 'plaka alanı $A$ $\\mathrm{m^2}$ cinsinden, aralık $d$ metre cinsinden, $\\varepsilon_0 = 8.854\\times10^{-12}\\ \\mathrm{C^2/(N{\\cdot}m^2)}$ ve dolgunun dielektrik sabiti $\\kappa$ (kappa)' },
      { t: 'p', text: 'Bir **dielektrik**, molekülleri uzayıp alanla hizalanarak onu zayıflatan bir yalıtkandır — böylece pil aynı voltajda çok daha fazla yük sıkıştırabilir. $\\kappa$ çarpanı (“dielektrik sabiti”) boşluk için 1’dir ve günlük yalıtkanlar için büyür:' },
      { t: 'table', headers: ['Plakalar arasındaki malzeme', 'Dielektrik sabiti κ'], rows: [
        ['Boşluk', '1 (tam olarak)'],
        ['Hava', '≈ 1'],
        ['Kâğıt', '≈ 3'],
        ['Cam', '≈ 7'],
        ['Su', '≈ 80'],
        ['Özel seramikler', '≈ 1000'],
      ] },
      { t: 'h', text: 'Alandaki enerji' },
      { t: 'formula', caption: 'yüklü kondansatörde depolanan enerji — yük yarısı çarpı voltaj; çünkü pil kondansatör dolarken 0 V’tan yükselir' },
      { t: 'p', text: 'Enerji fiilen **plakalar arasındaki elektrik alanda** durur — plakaları şarj edin, sonra bağlantısını kesin; alan, ona bir kaçış yolu verene dek enerjiyi tutmaya devam eder.' },
      { t: 'h', text: 'Seri mi paralel mi? Dikkat!' },
      { t: 'p', text: 'Kondansatörler, dirençlerin **tam tersi** biçimde birleşir. **Paralelde** plakalar alan ekler; öyleyse kapasitanslar doğrudan toplanır: $C = C_1 + C_2$. **Seride** yükler eşit olmak zorundadır ve voltajlar toplanır; öyleyse tersler toplanır: $1/C = 1/C_1 + 1/C_2$ — ve bileşim, tek başına herhangi bir kondansatörden *küçüktür*.' },
      { t: 'list', items: [
        '**Defibrilatör**: kondansatörü yüzlerce joule’a şarj eder, sonra milisaniyeler içinde göğüsten boşaltır.',
        '**Kamera flaşı / taser**: aynı hile, daha küçük ölçekte — pilin yavaş şarjı, kondansatörün hızlı boşalması.',
        '**Dokunmatik ekranlar ve klavyeler**, nereye bastığınızı bulmak için parmağınızın minicik kapasitansını hisseder.',
      ] },
      { t: 'key', text: 'Kondansatörler $Q = CV$ ve $U = \\tfrac{1}{2}CV^2$ depolar. Geometri hükmeder: $C = \\kappa\\varepsilon_0A/d$ — daha büyük alan, daha dar boşluk, daha yüksek κ’lı dielektrik. Seri ve paralel, dirençlerin tersine birleşir.' },
    ],
    example: {
      title: 'Kâğıtlı kondansatör kurmak',
      problem: 'Bir kondansatör, d = 1 mm ile ayrılmış A = 0.01 m² (10 cm × 10 cm) kare plakalara sahip; önce aralarında boşluk, sonra kâğıt (κ = 3) var. Her iki durumda C’yi bulun ve kâğıtla 12 V’ta depolanan enerjiyi hesaplayın.',
      steps: [
        { text: 'Bildiğinizi yazın:' },
        { text: 'Boşluk (κ = 1) — paralel plaka formülünü kullanın:' },
        { text: 'Hesaplayın:' },
        { text: 'Kâğıt κ = 3 ile çarpar:' },
        { text: '12 V’ta depolanan enerji:' },
      ],
      answer: 'Boşluk $C \\approx 88.5\\ \\mathrm{pF}$ verir; kâğıt bunu üçe katlayıp $\\approx 266\\ \\mathrm{pF}$ yapar ve 12 V’ta $U \\approx 1.9\\times10^{-8}\\ \\mathrm{J}$ (19 nJ) tutar — minicik; gerçek kondansatörlerin plakaları sararak mikroskobik boşluklar ve kocaman alanlar kullanmasının nedeni budur.',
    },
    questions: {
      'e7-p1': {
        prompt: 'Bir kondansatör, 6 V’luk pile bağlandığında 12 μC yük depoluyor. Kapasitansı μF cinsinden nedir?',
        hints: [
          '$C = Q/V$ tanımını kullanın.',
          '$C = 12\\ \\mu\\mathrm{C} \\div 6\\ \\mathrm{V}$.',
        ],
        explanation: '$C = Q/V = 12\\ \\mu\\mathrm{C} / 6\\ \\mathrm{V} = 2\\ \\mu\\mathrm{F}$ — volt başına depolanan iki mikrocoulomb.',
      },
      'e7-p2': {
        prompt: '400 μF’lik kondansatör 10 V’a şarj ediliyor. Ne kadar enerji depolar? mJ cinsinden yanıtlayın.',
        hints: [
          '$U = \\tfrac{1}{2}CV^2$ kullanın.',
          '$U = 0.5 \\times 400\\times10^{-6} \\times 10^2\\ \\mathrm{J}$.',
        ],
        explanation: '$U = \\tfrac{1}{2}CV^2 = 0.5\\times(400\\times10^{-6})\\times(10)^2 = 0.02\\ \\mathrm{J} = 20\\ \\mathrm{mJ}$.',
      },
      'e7-p3': {
        prompt: 'Bir paralel plakalı kondansatörün aynı voltajda DAHA ÇOK yük depolamasını istiyorsunuz. Hangi değişiklik yardımcı olur?',
        choices: [
          'Plakaları daha uzağa taşıyın',
          'Plaka alanını küçültün',
          'Plakaların arasına bir dielektrik levha sokun',
          'Daha ince bağlantı telleri kullanın',
        ],
        hints: [
          '$C = \\kappa\\varepsilon_0A/d$’ya bakın — hangi değişiklikler $C$’yi yükseltir?',
          'Sabit $V$’de depolanan yük $Q = CV$’dir.',
        ],
        explanation: 'Dielektrik κ’yı yükseltir; öyleyse $C = \\kappa\\varepsilon_0A/d$ artar ve aynı voltajda $Q = CV$ büyür. Boşluğu genişletmek ya da alanı küçültmek tersini yapardı.',
      },
      'e7-p4': {
        prompt: 'İki kondansatör paralel bağlanıyor. Birlikte şuna benzerler…',
        choices: [
          '$C = C_1 + C_2$’li tek bir kondansatör — kondansatörler dirençlerin tersidir',
          '$C$’si ikisinden de küçük tek bir kondansatör',
          'Açık bir anahtar — hiç yük akmaz',
          '$1/C = 1/C_1 + 1/C_2$’li tek bir kondansatör',
        ],
        hints: [
          'Paralelde iki kondansatör de aynı voltajı görür — depolanan toplam yüke ne olur?',
          'Paralel dirençler ters oranda toplanır; kondansatörler tersini yapar.',
        ],
        explanation: 'Paralelde iki kondansatör de aynı voltajı paylaşır; öyleyse yükleri toplanır ve $C = C_1 + C_2$ — dirençlerin birleşiminin tam tersi.',
      },
      'e7-q1': {
        prompt: 'Bir kondansatör, üzerinde 8 V bulunduğunda 24 μC yük tutuyor. Kapasitansını μF cinsinden bulun.',
        hints: ['$C = Q/V$ kullanın.', '$24 \\div 8$'],
        explanation: '$C = Q/V = 24\\ \\mu\\mathrm{C} / 8\\ \\mathrm{V} = 3\\ \\mu\\mathrm{F}$.',
      },
      'e7-q2': {
        prompt: 'Kondansatörün plakalarının arasına cam bir dielektrik (κ ≈ 7) sokmak…',
        choices: [
          'kapasitansı yaklaşık 7 ile çarpar',
          'kapasitansı 7’ye böler',
          'kapasitansı hiç değiştirmez',
          'kondansatörü kısa devre yapar',
        ],
        hints: [
          '$C = \\kappa\\varepsilon_0A/d$ — κ neyi çarpar?',
          'Dielektrik molekülleri iç alanı zayıflatır; daha çok yük yığılabilir.',
        ],
        explanation: '$C = \\kappa\\varepsilon_0A/d$ ile κ’yı 1’den 7’ye çıkarmak $C$’yi 7 ile çarpar. Dielektrik bir yalıtkandır; plakaları asla kısa devre yapmaz.',
      },
      'e7-q3': {
        prompt: 'İki adet 10 μF kondansatör seri bağlanıyor. Birleşik kapasitans μF cinsinden nedir?',
        hints: [
          'Seri kondansatörler: $1/C = 1/C_1 + 1/C_2$.',
          '$1/C = 1/10 + 1/10 = 2/10$; öyleyse $C = \\dots$',
        ],
        explanation: '$1/C = 1/10 + 1/10 = 1/5$; öyleyse $C = 5\\ \\mu\\mathrm{F}$ — ikisinden de küçük, paralelin tam tersi.',
      },
      'e7-q4': {
        prompt: 'Yüklü bir kondansatörün enerjisi aslında nerede depolanır?',
        choices: [
          'Metal plakaların kendisinde',
          'Plakalar arasındaki elektrik alanda',
          'Onu şarj eden pilde',
          'Bağlantı tellerinde',
        ],
        hints: [
          'Plakalar arasındaki boşlukta ne var, düşünün.',
          'Plakalar arasındaki alan $U = \\tfrac{1}{2}CV^2$’yi tutar.',
        ],
        explanation: 'Enerji, boşluktaki elektrik alanda durur — kondansatörün bağlantısı kesildikten sonra bile enerjisini tutmasının ve “alan + uzaklık”ın $U = \\tfrac{1}{2}CV^2$’nin kalbi olmasının nedeni budur.',
      },
      'e7-q5': {
        prompt: 'Defibrilatör kondansatörü 100 V’ta Q = 4 mC tutuyor. Ne kadar enerji verir? (U = ½QV kullanın)',
        hints: [
          'İkinci enerji biçimini kullanın: $U = \\tfrac{1}{2}QV$.',
          '$U = 0.5 \\times 4\\times10^{-3} \\times 100\\ \\mathrm{J}$.',
        ],
        explanation: '$U = \\tfrac{1}{2}QV = 0.5\\times(4\\times10^{-3}\\ \\mathrm{C})\\times100\\ \\mathrm{V} = 0.2\\ \\mathrm{J}$ bu ölçekte vuruş başına — gerçek defibrilatörler birkaç yüz joule depolar.',
      },
    },
  },
}

export default ov
