// ─── Physics Quest · Turkish (tr) overlay · part-18: p4, p5, p6, p7 ───────────
import type { LessonOvFile } from '../schema'

const ov: LessonOvFile = {
  'p4-photons': {
    title: 'Fotonlar ve Fotoelektrik Olay',
    tagline: 'Işık paketler halinde gelir — ve soluk bir morötesi hüzme, coşan bir kırmızı lambanın yapamadığını yapabilir.',
    objectives: [
      'Fotonun enerjisini $E = hf = hc/\\lambda$ ile ve $hc \\approx 1240\\ \\mathrm{eV{\\cdot}nm}$ kestirmesiyle hesaplayın',
      'Fotoelektrik olayı, iş fonksiyonu $\\varphi$ ve $KE_{\\text{max}} = hf - \\varphi$ ile açıklayın',
      'Parlak alçak frekanslı ışığın neden hiçbir şey çıkaramadığını, soluk yüksek frekanslı ışığın neden anında çıkardığını öngörün',
    ],
    concept: [
      { t: 'p', text: 'Bir metale ışık tutun; ışık doğru türdeyse yüzeyden **elektronlar fırlar**. Garip olan şu: kocaman parlak bir kırmızı lamba **hiçbir şey çıkaramayabilir**, buna karşılık soluk bir morötesi lamba elektronları anında çıkarır. Bunu dalgalar tek başına açıklayamaz — ama minicik ışık enerjisi paketleri açıklayabilir.' },
      { t: 'h', text: 'Işık paketler halinde gelir: fotonlar' },
      { t: 'p', text: 'Işık enerjisi, **foton** denen yığınlar halinde varır. Her foton, yalnızca ışığın **frekansı** $f$ tarafından belirlenen bir enerji taşır: frekansı ikiye katlayın, paket başına enerji de ikiye katlanır. Parlaklık (şiddet) yalnızca **her saniye kaç paketin vardığını** sayar — her birinin ne kadar enerjik olduğunu asla değiştirmez.' },
      { t: 'formula', caption: 'foton enerjisi: $h = 6.626\\times10^{-34}\\ \\mathrm{J{\\cdot}s}$ (Planck), $f$ frekans, $\\lambda$ dalga boyu, $c = 3.0\\times10^8\\ \\mathrm{m/s}$' },
      { t: 'p', text: 'Günlük sayılar için güzel bir kestirme var. $hc$’yi çarpıp elektronvolta çevirmek $hc \\approx 1240\\ \\mathrm{eV{\\cdot}nm}$ verir; böylece **nanometre** cinsinden bir dalga boyu, tek bir bölmeyle size **elektronvolt** cinsinden enerjiyi uzatır:' },
      { t: 'formula', caption: 'örneğin $\\lambda = 550\\ \\mathrm{nm}$’deki yeşil ışık, foton başına $E = 1240/550 \\approx 2.25\\ \\mathrm{eV}$ taşır' },
      { t: 'h', text: 'Fotoelektrik olay' },
      { t: 'p', text: 'Bir metalden bir elektronu özgürleştirmek için, **iş fonksiyonu** $\\varphi$ denen bir kaçış ücreti ödemelisiniz — elektronu yüzeye bağlayan asgari enerji. Bir foton bu ücreti **tek seferde** öder; artan ne varsa elektronun kinetik enerjisi olur. Einstein’ın 1905 tarihli ünlü denklemi budur (ona 1921’de Nobel Ödülü kazandırdı):' },
      { t: 'formula', caption: 'fırlayan elektronun en büyük kinetik enerjisi; $hf < \\varphi$ ise foton ücreti ödeyemez ve **hiçbir elektron hiç ayrılmaz**' },
      { t: 'list', items: [
        '**Eşik frekansı**: $f_0 = \\varphi/h$’nin (nm cinsinden eşdeğeri $\\lambda_0 = 1240/\\varphi$) altında, ışık ne kadar parlak olursa olsun hiçbir şey fırlamaz.',
        '**Şiddet enerji değildir**: parlak bir kırmızı lamba trilyonlarca düşük enerjili foton gönderir — her biri çoğu metalden elektron özgürleştirmek için yine de çok yoksuldur. Tek bir zengin UV fotonu ise anında başarıyı yakalar.',
        '**Anında fırlama**: elektronlar, ışık vardıktan sonraki yaklaşık bir nanosaniye içinde ayrılır. Dalgalar enerji biriktirmek için zaman isterdi; fotonlar hemen öder.',
      ] },
      { t: 'table', headers: ['Metal', 'İş fonksiyonu φ', 'Eşik dalga boyu λ₀ = 1240/φ'], rows: [
        ['Sezyum (Cs)', '2.1 eV', '≈ 590 nm (turuncu)'],
        ['Sodyum (Na)', '2.3 eV', '≈ 539 nm (yeşil)'],
        ['Çinko (Zn)', '4.3 eV', '≈ 288 nm (morötesi)'],
        ['Platin (Pt)', '6.4 eV', '≈ 194 nm (derin morötesi)'],
      ] },
      { t: 'p', text: 'Eşik dalga boylarının tabloyla nasıl eşleştiğine dikkat edin: sezyum o kadar “ucuzdur” ki turuncu ışık bile elektronlarını özgürleştirir (fotohücrelerin bununla kaplanmasının nedeni budur); çinko ile platin ise morötesi ister. **Güneş hücreleri** ve **fotohücreler** — otomatik kapıları açan ve sokak lambalarını karartan algılayıcılar — tam doğru iş fonksiyonuyla ayarlanmış fotoelektrik aygıtlardır.' },
      { t: 'key', text: 'Her foton, $E = hf = 1240/\\lambda$ eV taşıyan bir pakettir. Tüm iş fonksiyonu $\\varphi$’yi tek seferde ödemek zorundadır: $KE_{\\text{max}} = hf - \\varphi$ ve $hf < \\varphi$ ise hiçbir şey olmaz — parlaklık bir ödemeyi taksitlere bölemez.' },
    ],
    example: {
      title: 'Tek bir mor foton ile sodyum',
      problem: '400 nm dalga boyunda mor ışık, bir sodyum yüzeyine vuruyor (iş fonksiyonu φ = 2.3 eV). Foton enerjisini ve fırlayan elektronların en büyük kinetik enerjisini bulun.',
      steps: [
        { text: 'Bildiğinizi yazın:' },
        { text: 'Kestirmeyle foton enerjisi:' },
        { text: 'Tam formülle çapraz denetim — $f = c/\\lambda = 3.0\\times10^8/400\\times10^{-9} = 7.5\\times10^{14}\\ \\mathrm{Hz}$:' },
        { text: 'Foton kaçış ücretini öder, kalanı kinetik enerji olur:' },
        { text: 'Joule cinsinden (ve eğlenceye sezyumu da karşılaştırın, φ = 2.1 eV):' },
      ],
      answer: 'Her 400 nm foton $3.1\\ \\mathrm{eV}$ taşır; sodyumun elektronları $KE_{\\text{max}} = 0.8\\ \\mathrm{eV} \\approx 1.28\\times10^{-19}\\ \\mathrm{J}$ ile ayrılır. Işığı **parlatmak** daha çok foton gönderirdi ama her elektron yine de $0.8\\ \\mathrm{eV}$ ile ayrılırdı.',
    },
    questions: {
      'p4-p1': {
        prompt: '620 nm dalga boylu kırmızı ışığın tek bir fotonunun enerjisi nedir? eV cinsinden $E = 1240/\\lambda$ kullanın.',
        hints: [
          '$\\lambda$ nanometre cinsinden olmak üzere $E = 1240/\\lambda$ kestirmesini kullanın.',
          '$1240 \\div 620 = ?$',
        ],
        explanation: 'Foton başına $E = 1240/620 = 2.0\\ \\mathrm{eV}$ — tablodaki hiçbir metalden elektron çıkarmaya yetmez, sezyum hariç.',
      },
      'p4-p2': {
        prompt: 'Bir metale vuran ışığın parlaklığını (şiddetini) ikiye katıyorsunuz. Her fotonun enerjisine ne olur?',
        choices: [
          'İki katına çıkar — daha parlak ışığın fotonları daha enerjiktir',
          'Tam olarak aynı kalır — parlaklık yalnızca her saniye varan foton sayısını değiştirir',
          'Yarıya iner, çünkü enerji daha çok foton arasında paylaşılır',
          'Işığın rengine bağlıdır',
        ],
        hints: [
          'Foton enerjisi yalnızca frekansa bağlıdır: $E = hf$.',
          'Şiddet, foton başına enerjiyi değil saniyedeki foton sayısını sayar.',
        ],
        explanation: 'Foton enerjisi frekansla sabitlenir: $E = hf$. Şiddeti ikiye katlamak, saniyedeki foton **sayısını** ikiye katlar (elektron çıkarabiliyorlarsa akım artar) ama her fotonun enerjisi değişmez.',
      },
      'p4-p3': {
        prompt: '310 nm dalga boylu morötesi ışık sodyuma vuruyor (φ = 2.3 eV). Fırlayan elektronların en büyük kinetik enerjisi nedir?',
        hints: [
          'Önce foton enerjisini bulun: $E = 1240/310$.',
          'Sonra kaçış ücretini çıkarın: $KE_{\\text{max}} = E - \\varphi$.',
        ],
        explanation: '$E = 1240/310 = 4.0\\ \\mathrm{eV}$; öyleyse $KE_{\\text{max}} = 4.0 - 2.3 = 1.7\\ \\mathrm{eV}$.',
      },
      'p4-p4': {
        prompt: 'Kırmızı ışık (λ = 650 nm), temiz bir çinko yüzeyine düşüyor (φ = 4.3 eV). Ne olur?',
        choices: [
          'Elektronlar önce yavaş çıkar, sonra hızlanır',
          'Elektronlar yalnızca ışık yeterince parlaksa çıkar',
          'Işık ne kadar parlak olursa olsun hiçbir elektron çıkmaz',
          'Çinko önce ısınır, sonra elektronlar çıkar',
        ],
        hints: [
          'Foton enerjisini hesaplayın: $E = 1240/650$.',
          'Kaçış ücreti φ = 4.3 eV ile karşılaştırın.',
        ],
        explanation: '$E = 1240/650 \\approx 1.9\\ \\mathrm{eV} < \\varphi = 4.3\\ \\mathrm{eV}$: tek bir foton kaçış ücretini ödeyemez; öyleyse her parlaklıkta hiçbir elektron fırlamaz. Çinko morötesi ister ($\\lambda_0 \\approx 288\\ \\mathrm{nm}$).',
      },
      'p4-q1': {
        prompt: 'f = 6.0 × 10¹⁴ Hz frekanslı ışığın fotonları E = hf enerjisi taşır. Enerjiyi 10⁻¹⁹ J birimleriyle verin (h = 6.626 × 10⁻³⁴ J·s).',
        hints: [
          '$E = hf$’yi doğrudan kullanın.',
          '$E = 6.626\\times10^{-34} \\times 6.0\\times10^{14} = 3.976\\times10^{-19}\\ \\mathrm{J}$ — en yakın $10^{-19}\\ \\mathrm{J}$’a yuvarlayın.',
        ],
        explanation: '$E = hf = 6.626\\times10^{-34} \\times 6.0\\times10^{14} \\approx 3.98\\times10^{-19}\\ \\mathrm{J} \\approx 4\\times10^{-19}\\ \\mathrm{J}$ (yeşil ışık için yaklaşık $2.5\\ \\mathrm{eV}$).',
      },
      'p4-q2': {
        prompt: 'Çok parlak bir kırmızı lamba ile çok soluk bir morötesi lamba, bir metal levhanın üzerine birden vuruyor. Fotoelektrik olayın gösterdiğini en iyi hangi seçenek özetler?',
        choices: [
          'Parlak kırmızı lamba kazanır — önemli olan yalnızca toplam enerjidir',
          'İkisi de elektron çıkarır ama kırmızı lambanın elektronları daha yavaştır',
          'Yalnızca soluk UV lambası elektron çıkarır — her foton tek tek iş fonksiyonundan daha fazla enerji taşımak zorundadır',
          'Metal önce ısıtılmadıkça ikisi de elektron çıkaramaz',
        ],
        hints: [
          'Her foton, kaçış ücreti $\\varphi$’yi **tek başına** öder.',
          'Kırmızı fotonlar yaklaşık 1.9 eV taşır; UV fotonları 4 eV ya da daha fazlasını.',
        ],
        explanation: 'Fırlatma tek fotonluk, ya hep ya hiç bir ödemedir: kırmızı bir foton ($E \\approx 1.9\\ \\mathrm{eV}$), kaç tanesi gelirse gelsin çoğu metalin iş fonksiyonunun altındadır; buna karşılık birkaç UV fotonu ($E \\ge 4\\ \\mathrm{eV}$) bile her biri bir elektronu anında özgürleştirecek kadar enerji taşır.',
      },
      'p4-q3': {
        prompt: 'Sezyumun iş fonksiyonu 2.1 eV’tur. Ondan elektron çıkarabilen en uzun dalga boyu nedir?',
        hints: [
          'Eşikte foton enerjisi tam olarak φ’ye eşittir: $1240/\\lambda_0 = \\varphi$.',
          '$\\lambda_0 = 1240/2.1$.',
        ],
        explanation: '$\\lambda_0 = 1240/\\varphi = 1240/2.1 \\approx 590\\ \\mathrm{nm}$. ~590 nm’den uzun dalga boyları (kırmızı ve ötesi) sezyumdan hiçbir elektron çıkaramaz.',
      },
      'p4-q4': {
        prompt: '200 nm dalga boylu derin morötesi ışık platine vuruyor (φ = 6.4 eV). Ne olur?',
        choices: [
          'Elektronlar 0.2 eV kinetik enerjiyle fırlar',
          'Elektronlar 6.2 eV kinetik enerjiyle fırlar',
          'Hiçbir şey fırlamaz — foton enerjisi iş fonksiyonunun hemen altındadır',
          'Elektronlar yalnızca ışık morötesi olduğu için fırlar',
        ],
        hints: [
          '$E = 1240/200 = 6.2\\ \\mathrm{eV}$.',
          '$6.2\\ \\mathrm{eV}$’yi $\\varphi = 6.4\\ \\mathrm{eV}$ ile karşılaştırın.',
        ],
        explanation: '$KE_{\\text{max}} = E - \\varphi = 6.2 - 6.4 = -0.2\\ \\mathrm{eV}$; bu imkânsızdır — öyleyse hiçbir elektron ayrılmaz. Foton enerjisi kaçış ücretinin altında kaldığında UV bile başarısız olur.',
      },
      'p4-q5': {
        prompt: 'Bu günlük aygıtlardan hangisi fotoelektrik olayla çalışır?',
        choices: [
          'Bir mikrodalga fırın',
          'Yaklaştığınızı fark eden otomatik kapı algılayıcısı',
          'Bir buzdolabı mıknatısı',
          'Akkor bir ampul',
        ],
        hints: [
          'Hangi aygıt **ışığı** doğrudan hareket eden **elektronlara** çevirir?',
          'Fotohücreler, iş fonksiyonu küçük olan sezyum gibi metaller kullanır.',
        ],
        explanation: 'Otomatik kapı (ve sokak lambası) algılayıcıları fotohücrelerdir: gelen ışık, ışığa duyarlı bir yüzeyden fotoelektron fırlatır ve minicik bir akım yaratır. Einstein’ın foton resmi, o akımın tam olarak ne zaman akabileceğini açıklar.',
      },
    },
  },
  'p5-matter-waves': {
    title: 'Madde Dalgaları ve Belirsizlik',
    tagline: 'Elektronlar su halkaları gibi kırılır, beyzbol topları asla — ve doğa, konum ile momentumu bir takas olarak elinde tutar.',
    objectives: [
      'de Broglie dalga boylarını $\\lambda = h/p$ ile hesaplayın ve dalga davranışının ne zaman görünür hale geldiğini açıklayın',
      'Bir seferde tek elektronluk çift yarık deneyini ve olasılıkları neden kanıtladığını betimleyin',
      'Doğanın içkin takasını açıklamak için belirsizlik ilkesi $\\Delta x\\,\\Delta p \\ge \\hbar/2$’yi kullanın',
    ],
    concept: [
      { t: 'p', text: 'Işık dalgaları parçacık gibi davranabiliyorsa (fotonlar), parçacıklar **dalga** gibi davranabilir miydi? 1924’te yüksek lisans öğrencisi Louis de Broglie “evet” dedi — ve ona göre her elektronun, nötronun, hatta molekülün kendi dalga boyu vardı. İki yıl sonra deneyler aynı fikirdeydi. Fiziğin en tuhaf, en güzel fikrine hoş geldiniz.' },
      { t: 'h', text: 'de Broglie dalga boyu' },
      { t: 'formula', caption: 'bir madde dalgasının dalga boyu: $h = 6.626\\times10^{-34}\\ \\mathrm{J{\\cdot}s}$, momentum $p = mv$ (kütle × hız)' },
      { t: 'p', text: 'Hızlı ve ağır şeyler *minicik* dalga boyları alır; hafif ve yavaş şeyler *iri* olanları. 100 V ile hızlandırılan bir elektron $\\lambda \\approx 0.12\\ \\mathrm{nm}$ taşır — bir kristaldeki atomlar arası aralık kadar; bu yüzden kristaller, CD’nin ışığı kırması gibi elektronları da **kırar**. Davisson ile Germer 1927’de tam olarak bunu gördü, Nobel Ödülü’nü kazandı ve elektronların gerçekten de dalga olduğunu doğruladı.' },
      { t: 'p', text: '$V$ voltajıyla hızlandırılan elektronlar için kullanışlı bir kestirme: nanometre cinsinden $\\lambda = 1.226/\\sqrt{V}$. Elektron mikroskopları bu küçüklüğü kullanır: görünür ışıktan ~1000 kat kısa dalga boylarıyla tek tek atomları görüntülerler — sıradan hiçbir mikroskobun beceremediği iş.' },
      { t: 'h', text: 'Çift yarık, bir seferde bir parçacık' },
      { t: 'p', text: 'Elektronları çift yarığa **bir seferde birer birer** fırlatın. Her biri tek bir nokta olarak yere iner — bir parçacık! Ama binlercesinin inmesine izin verin; noktalar bir araya gelip dalganın parmak izi olan **girişim saçaklarını** oluşturur. Her tek elektron bir şekilde her iki yarığı da gezinir ve nereye ineceğine olasılık karar verir: parlak saçaklar *olası*, karanlık saçaklar *imkânsızdır*. Kuantum mekaniği yalnızca oranları öngörür — tekil olaylar doğanın zar atışlarıdır.' },
      { t: 'table', headers: ['Parçacık', 'Hız', 'de Broglie λ'], rows: [
        ['Elektron (100 V ile)', '$5.9\\times10^6\\ \\mathrm{m/s}$', '≈ 0.12 nm (atom boyutunda)'],
        ['Isıl nötron', '$1000\\ \\mathrm{m/s}$', '≈ 0.40 nm'],
        ['Fuleren molekülü C₆₀', '$100\\ \\mathrm{m/s}$', '≈ 5.5 pm (hâlâ girişim yapar!)'],
        ['Beyzbol topu (0.15 kg)', '$40\\ \\mathrm{m/s}$', '≈ 1.1×10⁻³⁴ m (gözlemlenemez)'],
      ] },
      { t: 'p', text: 'Son satır asıl vurucu nokta: bir beyzbol topunun dalga boyu bir atomdan **24 büyüklük mertebesi küçüktür**. Evrende hiçbir şey bunu ölçemez; bu yüzden beyzbol topları saf parçacık gibi davranır. Dalga davranışı büyük şeyler için yok olmadı — yalnızca hiçbir zaman göremeyeceğiniz kadar incedir.' },
      { t: 'h', text: 'Heisenberg’in belirsizlik ilkesi' },
      { t: 'formula', caption: 'konumdaki yayılım $\\Delta x$ ile momentumdaki yayılım $\\Delta p$’nin çarpımı asla $\\hbar/2 = 5.27\\times10^{-35}\\ \\mathrm{J{\\cdot}s}$’nin altına inemez' },
      { t: 'p', text: 'Bu, hantal aygıtlarla ilgili **değildir**. Doğanın bir kuralıdır: bir parçacığın konumunu tam olarak sabitleyin ($\\Delta x \\to 0$), momentumu çılgınca belirsizleşir ($\\Delta p \\to \\infty$); tersi de geçerlidir. Çift yarık deneyindeki elektron kusursuz bir örnektir — ona her iki yarıktan da geçmesine izin verilerek (konum bulanıktır), doğa momentumunu keskin saçaklar çizecek kadar net tutar. Hangi yarıktan geçtiğine bakın, saçaklar kaybolur.' },
      { t: 'key', text: 'Her parçacığın $\\lambda = h/p$ dalga boyu vardır. Yeterince küçük $\\lambda$ (elektronlar, hatta moleküller) girişimi gerçek kılar; beyzbol boyutunda $\\lambda$ onu görünmez yapar. Bir şeydeki kesinlik (konum) her zaman bir başkasındaki kesinliğe (momentum) mal olur — doğa kesinliklerle değil olasılıklarla ticaret yapar.' },
    ],
    example: {
      title: 'Bir beyzbol topu neden asla girişim yapmaz',
      problem: '0.15 kg’lık bir beyzbol topu 40 m/s ile atılırken, bir elektron durgun halden 100 V ile hızlandırılıyor. Her iki de Broglie dalga boyunu bulun.',
      steps: [
        { text: 'Beyzbol topunun momentumu:' },
        { text: 'Beyzbol topunun dalga boyu:' },
        { text: '100 V ile hızlandırılan elektron — kestirmeyi kullanın:' },
        { text: 'İkisini karşılaştırın:' },
      ],
      answer: 'Elektronun dalga boyu ($0.123\\ \\mathrm{nm}$) atomlar arası aralıklarla uyuşur; bu yüzden kristaller onu kırar — gerçek, ölçülebilir dalga davranışı budur. Beyzbol topunun dalga boyu yaklaşık $10^{24}$ kat küçüktür: hiçbir aygıt onu asla çözümleyemez; öyleyse beyzbol topu, her pratik amaç için saf bir parçacıktır.',
    },
    questions: {
      'p5-p1': {
        prompt: 'Bir elektron 150 V ile hızlandırılıyor. de Broglie dalga boyunu bulmak için $\\lambda = 1.226/\\sqrt{V}$ nm kullanın.',
        hints: [
          'Önce karekökü hesaplayın: $\\sqrt{150} \\approx 12.25$.',
          '$\\lambda = 1.226 \\div 12.25$.',
        ],
        explanation: '$\\lambda = 1.226/\\sqrt{150} = 1.226/12.25 \\approx 0.10\\ \\mathrm{nm}$ — bir atomla aynı boyut; elektron kırınımı bu yüzden işe yarar.',
      },
      'p5-p2': {
        prompt: 'de Broglie’ye göre hareketli bir parçacığın dalga boyunu ne belirler?',
        choices: [
          'Yükü — daha çok yük, daha kısa dalga boyu demektir',
          'Momentumu — $\\lambda = h/p$; öyleyse daha hızlı ya da daha ağır parçacıkların dalga boyları daha kısadır',
          'Rengi, tıpkı ışık gibi',
          'Yalnızca sıcaklığı',
        ],
        hints: [
          '$\\lambda = h/mv$’ye bakın.',
          '$v$ (ya da $m$) büyüdüğünde $\\lambda$’ya ne olur?',
        ],
        explanation: '$\\lambda = h/p = h/(mv)$: önemli olan momentumdur. Hızı (ya da kütleyi) ikiye katlayın, dalga boyu yarıya iner — ağır, hızlı cisimlerin dalga boyları gülünç derecede miniktir.',
      },
      'p5-p3': {
        prompt: '0.2 kg’lık bir top 15 m/s ile yuvarlanıyor. de Broglie dalga boyu nedir? Yanıtı 10⁻³⁴ m birimleriyle verin.',
        hints: [
          'Önce momentum: $p = mv = 0.2 \\times 15$.',
          'Sonra $\\lambda = 6.626\\times10^{-34}/3.0$.',
        ],
        explanation: '$p = 3.0\\ \\mathrm{kg{\\cdot}m/s}$; öyleyse $\\lambda = 6.626\\times10^{-34}/3.0 \\approx 2.2\\times10^{-34}\\ \\mathrm{m}$ — bir atomdan yaklaşık $10^{24}$ kat küçük: tümüyle gözlemlenemez.',
      },
      'p5-p4': {
        prompt: 'Bir seferde tek elektronluk çift yarık deneyinde, binlerce elektrondan sonra ekranda ne oluşur?',
        choices: [
          'Her yarığın arkasında birer tane olmak üzere iki parlak yumak',
          'Düzgün, homojen bir elektron lekesi',
          'Girişim saçakları — çok isabetli ve hiç isabet olmayan bantlar',
          'Hiçbir şey; tek elektronlar ekrana asla ulaşamaz',
        ],
        hints: [
          'Her elektron tek bir nokta olarak iner; ama ipucu, çok sayıda noktanın *örüntüsüdür*.',
          'Yalnızca dalgalar, birbiri ardınca gelen parlak ve karanlık bantlar oluşturur.',
        ],
        explanation: 'Her elektron öngörülemeyen tek bir noktaya iner; yine de binlerce nokta girişim saçaklarına dönüşür. Saçak örüntüsü bir olasılık haritasıdır: dalganın güçlü olduğu yerde noktalar olasıdır, dalganın sönümlendiği yerde noktalar hiç belirmemiştir.',
      },
      'p5-q1': {
        prompt: '550 nm’lik bir fotonun momentumu nedir? (h = 6.626 × 10⁻³⁴ J·s) Yanıtı 10⁻²⁷ kg·m/s birimleriyle verin.',
        hints: [
          'Fotonlar momentum da taşır: $p = h/\\lambda$.',
          '$p = 6.626\\times10^{-34} / 550\\times10^{-9}$.',
        ],
        explanation: '$p = h/\\lambda = 6.626\\times10^{-34}/5.5\\times10^{-7} \\approx 1.2\\times10^{-27}\\ \\mathrm{kg{\\cdot}m/s}$. Işık cisimleri iter — iş başındaki $p = h/\\lambda$ budur (de Broglie’nin fikrinin de öbür yüzü).',
      },
      'p5-q2': {
        prompt: 'Davisson ile Germer, 1927’de Nobel Ödülünü kazandıran neyi gözlemledi?',
        choices: [
          'Çekirdeklerin çevresinden dolanarak kıvrılan elektronlar',
          'Bir nikel kristalden tam dalga gibi kırılan elektronlar',
          'Metal bir borunun içine yapışan elektronlar',
          'Ölçüldükleri anda yok olan elektronlar',
        ],
        hints: [
          'Deneyleri, elektronları bir kristale fırlatıp nereye indiklerine baktı.',
          'Kristalin atom sıraları, $\\lambda \\sim 0.1\\ \\mathrm{nm}$ dalga boylu dalgalar için bir kırınım ızgarası gibi davranır.',
        ],
        explanation: 'Elektronları bir nikel kristale fırlattılar ve kırınım tepeleri gördüler — yalnızca dalgaların yapabileceği girişim örüntüleri, tam olarak $\\lambda = h/p$ öngörüsündeki dalga boyunda. Elektronlar gerçekten de dalga gibi davranır.',
      },
      'p5-q3': {
        prompt: 'Isıl bir nötron (m = 1.675 × 10⁻²⁷ kg) 1000 m/s ile ağır ağır ilerliyor. de Broglie dalga boyu nedir?',
        hints: [
          '$p = mv = 1.675\\times10^{-27} \\times 1000$.',
          '$\\lambda = 6.626\\times10^{-34}/1.675\\times10^{-24}\\ \\mathrm{m}$ — sonra pikometreye çevirin ($1\\ \\mathrm{pm} = 10^{-12}\\ \\mathrm{m}$).',
        ],
        explanation: '$\\lambda = 6.626\\times10^{-34}/(1.675\\times10^{-24}) \\approx 3.96\\times10^{-10}\\ \\mathrm{m} = 396\\ \\mathrm{pm}$ — kristalleri sonda etmek için ideal; nötron kırınımının gerçek bir laboratuvar tekniği olması bundandır.',
      },
      'p5-q4': {
        prompt: 'Bir parçacığın konumunu kusursuz kesinlikle ($\\Delta x = 0$) ölçebilseydiniz, belirsizlik ilkesi momentumu hakkında ne derdi?',
        choices: [
          'Momentumu da kusursuzca bilinirdi',
          'Momentumu tümüyle bilinmez olurdu ($\\Delta p \\to \\infty$)',
          'Momentumu sıfıra düşerdi',
          'Hiçbir şey — ilke yalnızca fotonlara uygulanır',
        ],
        hints: [
          '$\\Delta x\\,\\Delta p$ çarpımı en az $\\hbar/2$ kalmak zorundadır.',
          'Bir çarpan sıfıra büzülürse ötekinde ne olması gerekir?',
        ],
        explanation: '$\\Delta x\\,\\Delta p \\ge \\hbar/2$ ile, $\\Delta x$’i sıfıra doğru büzmek $\\Delta p$’yi sonsuza zorlar. Kusursuz konum bilgisi, tümüyle momentum cehaleti demektir — bu doğanın içkin bir takasıdır, aygıtlarımızın kusuru değil.',
      },
      'p5-q5': {
        prompt: 'Fırlatılmış bir beyzbol topunun dalga doğasını neden hiç fark etmeyiz?',
        choices: [
          'Beyzbol topları, kuantum kurallarından etkilenmeyecek kadar ağırdır',
          'Dalga boyu ($\\sim10^{-34}$ m), girişim gösterebilecek her şeyden akıl almaz biçimde küçüktür',
          'Beyzbol topları, dalgaların oluşmasına imkân vermeyecek kadar yavaş yol alır',
          'Hava, dalga davranışını yok eder',
        ],
        hints: [
          'Bir beyzbol topu için $\\lambda = h/mv$ hesaplayın.',
          'Kırınım, $\\lambda$ ile karşılaştırılabilir yarık ya da engel ister.',
        ],
        explanation: 'Bir beyzbol topu için $\\lambda = h/p \\approx 10^{-34}\\ \\mathrm{m}$ — atomdan 24 büyüklük mertebesi aşağıda. Girişim, $\\lambda$ ile karşılaştırılabilir yapılar ister ve evrende o kadar küçük yapılmış hiçbir şey yoktur; öyleyse dalga doğası sonsuza dek görünmez kalır.',
      },
    },
  },
  'p6-quantum-atom': {
    title: 'Atomik Düzeyler ve Tayflar',
    tagline: 'Her element ışığını bir barkodla imzalar — hidrojenin enerji merdivenini okumayı öğrenin.',
    objectives: [
      'Hidrojenin enerji merdivenini $E_n = -13.6/n^2\\ \\mathrm{eV}$ okuyun ve temel ile uyarılmış durumları ayırt edin',
      'Düzey atlamaları için foton enerjilerini ve dalga boylarını $E_{\\text{photon}} = E_{\\text{hi}} - E_{\\text{lo}}$ ile hesaplayın',
      'Çizgi tayflarının neden element parmak izi olduğunu açıklayın ve orbitaller ile Pauli dışlamasını periyodik tabloya bağlayın',
    ],
    concept: [
      { t: 'p', text: 'Bir sokak lambasının ya da neon tabelanın ışığını prizmadan geçirin; pürüzsüz bir gökkuşağı değil **keskin renkli çizgiler** alırsınız. Her element kendi özel barkodunu çizer. O çizgiler, atomların enerjiyi yalnızca **belirli miktarlarda** tutabildiğine dair ilk büyük ipucuydu — enerji bir rampayla değil, bir merdivenle gelir.' },
      { t: 'h', text: 'Hidrojenin enerji merdiveni' },
      { t: 'p', text: 'Hidrojen için izin verilen enerjileri Bohr’un ünlü formülü verir. $n$ düzey numarasıdır: $n = 1$ **temel durumdur** (en alt basamak), daha yüksek her $n$ bir **uyarılmış durum**dur ve $E = 0$, elektronun kaçtığı anlamına gelir — atom **iyonlaşmıştır**.' },
      { t: 'formula', caption: 'hidrojen düzeyleri: $E_1 = -13.6\\ \\mathrm{eV}$, $E_2 = -3.4\\ \\mathrm{eV}$, $E_3 = -1.51\\ \\mathrm{eV}$, $E_4 = -0.85\\ \\mathrm{eV}$ … basamaklar tepede birbirine sokulur' },
      { t: 'p', text: 'Basamaklar arasında atlayan bir elektron, **tam olarak** enerji farkını taşıyan bir foton soğurur ya da yayar — ne bir eksik ne bir fazla:' },
      { t: 'formula', caption: 'aşağı atlamak ışık yayar (yayılma); yukarı tırmanmak tam olarak aynı enerjide ışık soğurur' },
      { t: 'table', headers: ['Geçiş (→ alt düzeye)', 'ΔE', 'λ', 'Seri'], rows: [
        ['n = 2 → 1', '10.2 eV', '≈ 122 nm (UV)', 'Lyman'],
        ['n = 3 → 2', '1.89 eV', '≈ 656 nm (kırmızı)', 'Balmer'],
        ['n = 4 → 2', '2.55 eV', '≈ 486 nm (mavi-yeşil)', 'Balmer'],
        ['n = 4 → 3', '0.66 eV', '≈ 1875 nm (kızılötesi)', 'Paschen'],
      ] },
      { t: 'p', text: '$n = 1$’de biten geçişler **Lyman** serisini (morötesi), $n = 2$’de bitenler **Balmer** serisini (görünür — hidrojenin 656 nm’lik kırmızı çizgisi bulutsuları pembeye boyar), $n = 3$’te bitenler ise **Paschen** serisini (kızılötesi) oluşturur. Hidrojeni temel durumdan iyonize etmek $13.6\\ \\mathrm{eV}$ tutar — merdivenin tümü özgürlükten aşağıya doğru ölçülür.' },
      { t: 'h', text: 'Atom neden çökmez' },
      { t: 'p', text: 'Klasik fizik elinde bir felaketle kalmıştı: çekirdek çevresinde dönen bir elektron **hızlanıyor** ve hızlanan yükler enerjisini ışıyarak kaybetmek zorundadır. Elektron bir nanosaniyenin kesrinde çekirdeğe helezon gibi dolmalıydı — atomlar var olmamalıydı! Bohr’un çaresi: izin verilen basamaklarda atom basitçe ışıma yapmaz. Kuantum mekaniği bu çareyi sonradan **orbitallere** derinleştirdi — elektronun helezon çizecek hiçbir yörüngeye sahip olmadığı durgun dalga örüntüleri.' },
      { t: 'h', text: 'Orbitaller, Pauli ve periyodik tablo' },
      { t: 'p', text: 'Bir **orbital** minicik bir ray değildir — elektronun *büyük olasılıkla* nerede bulunacağını gösteren bir olasılık bulutudur. Ve elektronlar **Pauli dışlama ilkesi**ne uyar: bir atomdaki iki elektron aynı kuantum durumunu işgal edemez. Bu, elektronları kabuklara yığmaya zorlar (2, sonra 8, sonra 8…) — ve o yığınlaşma, **periyodik tablonun** tam olarak neden o biçime sahip olduğunun, soygazların neden tembel olduğunun ve sodyumun bağ kurmaya neden hazır olup neonun neden reddettiğinin açıklamasıdır.' },
      { t: 'key', text: 'Atomların kesikli enerji düzeyleri vardır; hidrojen için $E_n = -13.6/n^2\\ \\mathrm{eV}$. Aşağı atlayın: $E = E_{\\text{hi}} - E_{\\text{lo}}$ enerjili bir foton yayar. Yukarı atlayın: tam olarak o enerjiyi soğurur. Çizgi tayfı, hiçbir iki elementin aynı merdiveni paylaşmaması nedeniyle atomun parmak izidir.' },
    ],
    example: {
      title: 'Bir bulutsuyu pembeye boyamak: 656 nm çizgisi',
      problem: 'Bir hidrojen atomunun elektronu n = 3 düzeyinden n = 2’ye düşüyor. Hangi foton enerjisini ve dalga boyunu yayar; çizgi hangi seriye aittir?',
      steps: [
        { text: 'İki basamağı merdivenden okuyun:' },
        { text: 'Atlamanın bıraktığı enerji:' },
        { text: 'Aynı sayı, merdiven formülüyle:' },
        { text: 'Dalga boyuna çevirin:' },
        { text: 'Çizgiyi tanımlayın:' },
      ],
      answer: '$3 \\to 2$ atlaması, $\\lambda \\approx 656\\ \\mathrm{nm}$’de $E = 1.89\\ \\mathrm{eV}$ kırmızı ışık yayar — hidrojenin ünlü **H-alfa** Balmer çizgisi; yayılma bulutsularını pembeye boyayan renk.',
    },
    questions: {
      'p6-p1': {
        prompt: 'Hidrojenin elektronunu n = 1’den n = 2’ye çıkarmak için bir fotonun ne kadar enerjiye gereksinimi var? $E_n = -13.6/n^2$ eV kullanın.',
        hints: [
          'Soğurulan enerji boşluktur: $E_2 - E_1$.',
          '$E_2 = -13.6/4 = -3.4\\ \\mathrm{eV}$ ve $E_1 = -13.6\\ \\mathrm{eV}$.',
        ],
        explanation: '$E_{\\text{photon}} = E_2 - E_1 = -3.4 - (-13.6) = 10.2\\ \\mathrm{eV}$ — morötesi bir foton (Lyman serisi).',
      },
      'p6-p2': {
        prompt: 'Bir atomun temel durumuyla ne kastedilir?',
        choices: [
          'Atomun yerde oturduğu durum',
          'En alt enerji düzeyi; enerji verilmedikçe elektronun kaldığı yer',
          'Elektronun çekirdekten özgür olduğu düzey',
          'n’nin olabildiğince büyük olduğu düzey',
        ],
        hints: [
          'Merdivenin en alt basamağını düşünün.',
          'Temel durum, hidrojen için $n = 1$, $-13.6\\ \\mathrm{eV}$ demektir.',
        ],
        explanation: 'Temel durum, izin verilen en alt düzeydir (hidrojen için $n = 1$, $E = -13.6\\ \\mathrm{eV}$). Bir atom varsayılan olarak orada durur; daha yukarıdaki her basamak uyarılmış durumdur ve $E = 0$, elektronun kaçtığı anlamına gelir (iyonlaşma).',
      },
      'p6-p3': {
        prompt: 'Bir hidrojen atomu, elektronu n = 1’e düşerken 10.2 eV’lik bir foton yayar. Bu hangi dalga boyudur? (λ = 1240/E, nm cinsinden kullanın.)',
        hints: [
          '$\\lambda = 1240/E$ kestirmesini kullanın.',
          '$1240 \\div 10.2$.',
        ],
        explanation: '$\\lambda = 1240/10.2 \\approx 122\\ \\mathrm{nm}$ — derin morötesi; gözünüze görünmez ama Güneş’in kromosferini izleyen teleskoplar için çok görünür.',
      },
      'p6-p4': {
        prompt: 'Çizgi tayfları elementleri tanımlamak için neden kullanılabilir?',
        choices: [
          'Çünkü her element erimişken farklı bir renktedir',
          'Çünkü her elementin kendine özgü bir enerji düzeyleri kümesi vardır; öyleyse yayılma çizgileri bir parmak izidir',
          'Çünkü tüm elementler aynı çizgileri farklı parlaklıklarda yayar',
          'Çünkü çizgiler yalnızca metallerde görünür',
        ],
        hints: [
          'Çizgi dalga boyları, enerji düzeyleri arasındaki boşluklardan gelir.',
          'Farklı çekirdek yükleri → farklı düzey aralıkları.',
        ],
        explanation: 'Her elementin özgün çekirdek yükü, özgün bir enerji düzeyleri merdiveni verir; öyleyse foton enerjileri — ve ondan dolayı tayf çizgileri — bir parmak izidir. Gökbilimciler yıldız bileşimlerini böyle okur.',
      },
      'p6-q1': {
        prompt: 'Temel durumdaki bir hidrojen atomunu iyonize etmek — elektronu n = 1’den E = 0’daki özgürlüğe kaldırmak — için ne kadar enerji (eV cinsinden) gerekir?',
        hints: [
          'İyonlaşma, $E_1 = -13.6\\ \\mathrm{eV}$’den $E = 0$’a tırmanmak demektir.',
          'Gereken enerji boşluğun büyüklüğüdür.',
        ],
        explanation: 'Temel durum enerjisi $-13.6\\ \\mathrm{eV}$’tir; öyleyse tam $13.6\\ \\mathrm{eV}$, elektronu $E = 0$’a (özgürlüğe) kaldırır. Fazla gelen her enerji, özgür elektronun kinetik enerjisi olur.',
      },
      'p6-q2': {
        prompt: 'n = 3 düzeyindeki bir hidrojen atomu, n = 2’ye ya da n = 1’e inerek ışık yayabilir. Hangi atlama daha enerjik foton yayar?',
        choices: [
          '3 → 2, çünkü o ünlü kırmızı çizgidir',
          '3 → 1, çünkü en alt basamaktaki enerji boşluğu çok daha büyüktür',
          'İkisi de aynı enerjiyi yayar',
          'Ne biri ne öteki — atomlar yalnızca soğurur',
        ],
        hints: [
          'Foton boşluğu taşır: $E_{\\text{hi}} - E_{\\text{lo}}$.',
          '$E_3 - E_2 = 1.89\\ \\mathrm{eV}$ ile $E_3 - E_1 = 12.09\\ \\mathrm{eV}$’yi karşılaştırın.',
        ],
        explanation: '$3 \\to 1$, $E_3 - E_1 = -1.51 - (-13.6) = 12.09\\ \\mathrm{eV}$ bırakır; $3 \\to 2$ içinse $1.89\\ \\mathrm{eV}$. Daha büyük atlama, daha zengin foton — morötesi Lyman çizgisi, kırmızı Balmer çizgisini geçer.',
      },
      'p6-q3': {
        prompt: 'Hidrojenin elektronu n = 4’ten n = 2’ye düştüğünde yaydığı fotonun dalga boyu nedir? (ΔE = 2.55 eV)',
        hints: [
          '$\\lambda = 1240/\\Delta E$ kullanın.',
          '$1240 \\div 2.55$.',
        ],
        explanation: '$\\lambda = 1240/2.55 \\approx 486\\ \\mathrm{nm}$ — mavi-yeşil Balmer çizgisi (H-beta); parlayan hidrojen gazındaki en parlak ikinci çizgi.',
      },
      'p6-q4': {
        prompt: 'Klasik fizik, atomların neredeyse anında çökmesi gerektiğini öngörüyordu. Neden?',
        choices: [
          'Çünkü elektronlar yörüngede dönmeyecek kadar ağırdır',
          'Çünkü dönen bir elektron hızlanır ve hızlanan yükler enerjisini ışıyarak kaybeder',
          'Çünkü çekirdekler elektronları iter',
          'Çünkü yerçekimi elektronu içeri çeker',
        ],
        hints: [
          'Maxwell’in kuralları: hızlanan yükler elektromanyetik dalga yayar.',
          'Enerji kaybı, giderek küçülen bir yörünge demektir…',
        ],
        explanation: 'Yörüngedeki bir elektron sürekli hızlanır (dairesel hareket); öyleyse klasik elektromanyetizma, enerjiyi aralıksız ışıyarak ~10⁻¹¹ s içinde çekirdeğe helezon gibi ineceğini söyler. Kuantlanmış düzeyler helezonu durdurur: izin verilen bir basamakta atom ışıma yapmaz.',
      },
      'p6-q5': {
        prompt: 'Pauli dışlama ilkesi ne der ve periyodik tablo için neden önemlidir?',
        choices: [
          'Elektronlar birbirini iter; öyleyse atomlar büyüktür',
          'Bir atomda iki elektron aynı kuantum durumunu paylaşamaz — öyleyse elektronlar kabuklara yığılır ve elementlere aile örüntülerini verir',
          'Elektronların tümü her atomun en alt orbitaline oturmak zorundadır',
          'Protonlar ile elektronlar her zaman sayıca eşit olmalıdır',
        ],
        hints: [
          '“Dışlama”, iki elektronu ne yapmaktan dışlar?',
          'Kabuk doldurma sırası (2, 8, 8…), periyodik tablonun satırlarının kaydettiği şeydir.',
        ],
        explanation: 'Pauli, iki elektronun aynı kuantum durumunu işgal etmesini yasaklar; öyleyse elektronlar orbital doldururken sırayla gider ve kabuklar oluşturur. Kabukların artan çekirdek yükü boyunca doluşu, tam olarak periyodik tablonun serdiği örüntüdür — soygazların kabukları tamdır, alkali metallerin ise dışta yalnız bir elektronu vardır.',
      },
    },
  },
  'p7-semiconductors': {
    title: 'Yarı İletkenler ve Bant Kuramı',
    tagline: 'Bakır neden iletir, elmas neden reddeder ve silisyum — hafifçe ısıtılınca — tam da ortada neden durur?',
    objectives: [
      'İletkenleri, yarı iletkenleri ve yalıtkanları enerji bantları ile bant aralığı $E_g$ kullanarak sınıflandırın',
      'Bir yarı iletkeni ısıtmanın iletimi güçlendirirken bir metali ısıtmanın neden bozduğunu ve n/p tipi katkılamanın ne yaptığını açıklayın',
      'Bant aralığını $\\lambda = 1240/E_g$ ile LED rengine çevirin ve tek yönlü diyot bileşkesini betimleyin',
    ],
    concept: [
      { t: 'p', text: 'Bakır tel mükemmel iletir. Elmas, aynı maddeyle yapılmış olmasına karşın (karbon!), iletmeyi tümüyle reddeder. Silisyum tam ortada durur — *biraz* iletir, ısındıkça daha çok. Bant kuramı üçünü tek bir resimle açıklar: elektronların hareketlenebilmek için bir enerji **merdivenini** tırmanması gerekir ve farklı malzemeler farklı yüksekliklerde merdivenler örer.' },
      { t: 'h', text: 'Bantlar ve aralık' },
      { t: 'p', text: 'Bir kristalde trilyonlarca atom, izin verilen elektron enerjilerini geniş **bantlara** sıkıştırır. **Değerlik bandı** bağ yapıcı elektronları barındırır; **iletkenlik bandı**, elektronların kristal boyunca uçuştuğu hareketli bölgedir. Aralarında ise **bant aralığı** $E_g$ uzanır — hiçbir elektronun yaşayamadığı tarafsız bir bölge. İletkenlik, elektronların iletkenlik bandının **içinde** olmasını (ya da değerlik bandındaki boş koltukları — **boşlukları**) gerektirir.' },
      { t: 'table', headers: ['Malzeme', 'Bant aralığı Eg', 'Sınıf'], rows: [
        ['Bakır (metal)', '0 — bantlar üst üste biner', 'iletken'],
        ['Germanyum', '0.67 eV', 'yarı iletken'],
        ['Silisyum', '1.1 eV', 'yarı iletken'],
        ['GaAs (kırmızı LED)', '1.9 eV', 'yarı iletken (katkılı)'],
        ['GaN (mavi LED)', '2.7 eV', 'yarı iletken (katkılı)'],
        ['Elmas', '5.5 eV', 'yalıtkan'],
      ] },
      { t: 'p', text: 'Bir **iletkenin** bantları değer ya da üst üste biner; öyleyse elektronlar her sıcaklıkta özgürdür. Bir **yalıtkanın** aralığı o kadar yüksektir ki ısı, bir elektronu bile ancak nadiren karşıya kaldırır. Bir **yarı iletkenin** aralığı tam kıvamındadır: oda sıcaklığında birkaç elektron atlamayı başarır ve her derecelik ısınma tırmanıcıları üstel biçimde çoğaltır ($\\propto e^{-E_g/2kT}$). Bu yüzden ısınmış bir yarı iletken **daha iyi** iletir — ısının örgüyü sarsıp elektron denizinin sürüklenmesini *engellediği* metalin tam tersi.' },
      { t: 'h', text: 'Katkılama: doğru safsızlıkları serpmek' },
      { t: 'list', items: [
        '**n tipi**: silisyuma fosfor ekleyin — fosforun 4 yerine 5 değerlik elektronu vardır; öyleyse her atom iletkenlik bandına bir **yedek elektron** bağışlar. Negatif taşıyıcılar: *n* tipi.',
        '**p tipi**: bor ekleyin — yalnızca 3 değerlik elektronu; öyleyse her atom, değerlik bandında hoplaya zıplaya ilerleyen hareketli bir pozitif boşluk olan bir **boşluk** bırakır. *p* tipi.',
        'İkisini birleştirin, **diyot** elde edersiniz: akım bir yönde kolayca akar (elektronlar ve boşluklar bileşkenin iki yanını takas eder) ama öbür yönde engellenir — her güç adaptörünün içindeki tek yönlü vana.',
      ] },
      { t: 'formula', caption: 'LED renk kuralı: aralıktan aşağı düşen bir elektron, aralık enerjisiyle bir foton yayar — dar aralık kırmızı ışık, geniş aralık mavi ışık' },
      { t: 'p', text: 'Bir **ışık yayan diyotta** (LED), bileşke boyunca enjekte edilen elektronlar iletkenlik bandından değerlik bandına düşer ve farkı ışık olarak öder: GaAs ($E_g = 1.9\\ \\mathrm{eV}$) $\\lambda \\approx 653\\ \\mathrm{nm}$’de kırmızı parlar, GaN ($2.7\\ \\mathrm{eV}$) $\\approx 459\\ \\mathrm{nm}$’de mavi. **Transistörler** — elektrikle kumanda edilen anahtarlar gibi davranan üçüncü uçlu diyotlar — aynı fikrin üst üste konmuşudur; bir telefon çipi milyarlarcasını barındırır. Ve silisyum bir **güneş hücresi** merdiveni tersine çalıştırır: $E > 1.1\\ \\mathrm{eV}$ enerjili, yani $\\lambda < 1127\\ \\mathrm{nm}$ dalga boylu her foton bir elektronu kaldırıp geride bir boşluk bırakabilir — hazır bir akım.' },
      { t: 'key', text: 'Bant aralığı her şeye karar verir: aralık yok → iletken, dar aralık → yarı iletken (daha sıcak = daha iyi), kocaman aralık → yalıtkan. Katkılama elektron (n) ya da boşluk (p) ekler; p–n bileşkesi tek yönlü bir vanadır; içer giren ışık akım yapar (güneş hücresi), aralığı aşan akım ışık yapar (LED, renk $\\lambda = 1240/E_g$’den gelir).' },
    ],
    example: {
      title: 'Yeşil bir LED tasarlamak',
      problem: 'Yeşil bir LED, bant aralığı Eg = 2.26 eV olan bir malzemeden yapılıyor. Hangi dalga boyunda ışık yayar? Kırmızı bir GaAs LED’iyle (Eg = 1.9 eV) karşılaştırın.',
      steps: [
        { text: 'Bildiğinizi yazın:' },
        { text: 'Aralığı aşarak düşen her elektron, o enerjiyle bir foton yayar; öyleyse:' },
        { text: 'Bölün:' },
        { text: 'Rengi denetleyin — 549 nm tam yeşil bölgededir (495–570 nm):' },
        { text: 'Kırmızı LED’in daha dar aralığıyla karşılaştırın:' },
      ],
      answer: '2.26 eV’lik aralık $\\lambda \\approx 549\\ \\mathrm{nm}$ verir — yeşil. Daha dar olan 1.9 eV’lik aralık foton başına daha az enerji öder ve $653\\ \\mathrm{nm}$’e, kırmızıya düşer. Daha geniş aralık ⇒ daha mavi ışık; tam da $\\lambda = 1240/E_g$’nin öngördüğü gibi.',
    },
    questions: {
      'p7-p1': {
        prompt: 'Kırmızı bir GaAs LED’inin bant aralığı 1.9 eV’tur. Hangi dalga boyunda ışık yayar? (λ = 1240/Eg)',
        hints: [
          'Her foton, aralığın tüm enerjisini alır.',
          '$\\lambda = 1240 \\div 1.9$.',
        ],
        explanation: '$\\lambda = 1240/1.9 \\approx 653\\ \\mathrm{nm}$ — derin kırmızı. Eski LED hesap makineleri tam olarak bu renkte parlıyordu.',
      },
      'p7-p2': {
        prompt: 'Saf bir silisyum çipi ile bir bakır tel birlikte hafifçe ısıtılıyor. İletkenliklerine ne olur?',
        choices: [
          'İkisi de iyileşir — ısı her zaman iletime yardım eder',
          'Silisyumun iletkenliği yükselir (daha çok elektron aralığı atlar), bakırın düşer (örgü titreşimleri elektron denizini dağıtır)',
          'Silisyumun iletkenliği düşer, bakırın yükselir',
          'İkisi de değişmez — sıcaklık iletimi etkilemez',
        ],
        hints: [
          'Silisyumda iletim, elektronların 1.1 eV’lik aralığı *tırmanmasını* gerektirir — ısı ne sağlar?',
          'Bakırda elektronlar zaten özgürdür; ısı yalnızca örgüyü sarsar.',
        ],
        explanation: 'Isıtmak, silisyumun ısıl olarak uyarılmış taşıyıcılarını çoğaltır ($\\propto e^{-E_g/2kT}$); öyleyse iletkenliği keskin biçimde yükselir. Bakırda iletkenlik bandı şimdiden elektronlarla doludur ve daha sıcak örgü onları daha çok dağıtır — direnç artar.',
      },
      'p7-p3': {
        prompt: 'Silisyumun bant aralığı 1.1 eV’tur. Bir elektronu aralık boyunca hâlâ özgürleştirebilen (yani bir silisyum güneş hücresinin soğurabildiği) en uzun ışık dalga boyu nedir?',
        hints: [
          'Soğurum $E_{\\text{photon}} \\ge E_g$ ister; kullanılabilir en uzun dalga boyunda $E = E_g$ tam olarak sağlanır.',
          '$\\lambda_{\\text{max}} = 1240 \\div 1.1$.',
        ],
        explanation: '$\\lambda_{\\text{max}} = 1240/1.1 \\approx 1127\\ \\mathrm{nm}$. Bundan daha kırmızı (daha düşük enerjili) fotonlar silisyumun içinden olduğu gibi geçer; 1127 nm’den mora kadar her şey güneş enerjisi üretebilir.',
      },
      'p7-p4': {
        prompt: 'Silisyum, her zamanki borun (3 değerlik elektronu) yerine fosforla (5 değerlik elektronu) katkılanıyor. Ne elde edersiniz?',
        choices: [
          'p tipi, çünkü fosfor elektronları uzaklaştırır',
          'n tipi — her fosfor atomu iletkenlik bandına bir yedek elektron bağışlar',
          'Bir yalıtkan — safsızlıklar her zaman iletimi engeller',
          'p tipi, çünkü fosfor ek boşluklar yaratır',
        ],
        hints: [
          'Değerlik elektronlarını sayın: silisyumda 4, fosforda 5, bor’da 3.',
          'Fazla elektron = negatif taşıyıcı = *n* tipi.',
        ],
        explanation: 'Fosforun beşinci değerlik elektronu gevşek bağlıdır ve iletkenlik bandına kolayca bağışlanır — negatif yük taşıyıcıları; öyleyse *n* tipi. Bor tam tersini yapar, boşluklar bırakırdı (p tipi).',
      },
      'p7-q1': {
        prompt: 'Mavi bir LED, bant aralığı 2.7 eV olan GaN’dan yapılıyor. Hangi dalga boyunu yayar?',
        hints: [
          'LED renk kuralını kullanın: $\\lambda = 1240/E_g$.',
          '$1240 \\div 2.7$.',
        ],
        explanation: '$\\lambda = 1240/2.7 \\approx 459\\ \\mathrm{nm}$ — mor-mavi. 2014 Nobel Ödülü, tam bu LED’i seri üretecek kadar iyi GaN kristalleri büyütülmesine verildi.',
      },
      'p7-q2': {
        prompt: 'Bir p–n bileşkeli diyot, akımı neden yalnızca tek yönde akıtır?',
        choices: [
          'Çünkü fizikte elektronların yalnızca sola hareket etmesine izin verilir',
          'Bir kutuplama elektronları ve boşlukları birleşecekleri bileşkeye doğru iter; ters kutuplama onları uzaklaştırıp taşıyıcısız boş bir aralık bırakır',
          'Çünkü içindeki tel sargı hâlindedir',
          'Çünkü diyotlar elektriği bir pil gibi depolar',
        ],
        hints: [
          'Her kutuplama için n tarafındaki elektronlara ve p tarafındaki boşluklara ne olduğunu düşünün.',
          'İleri polarizasyon bileşkeyi taşıyıcılarla besler; ters polarizasyon ince bir tükenme bölgesini boşaltır.',
        ],
        explanation: 'İleri polarizasyon bileşkeyi elektronlarla (n tarafı) ve boşluklarla (p tarafı) doldurur; bunlar rahatça birleşir — akım akar. Ters polarizasyon taşıyıcıları çeker ve taşıyıcısız tükenme bölgesini genişletir; neredeyse hiçbir şey iletmez. O asimetri, tek yönlü vanadır.',
      },
      'p7-q3': {
        prompt: 'Elmasın bant aralığı 5.5 eV’tur. Bir elektronu aralık boyunca kaldırarak soğurabildiği en uzun ışık dalga boyu nedir?',
        hints: [
          'Soğurulabilir en uzun dalga boyu ⇔ foton enerjisi tam olarak aralığa eşittir.',
          '$\\lambda = 1240 \\div 5.5$.',
        ],
        explanation: '$\\lambda = 1240/5.5 \\approx 225\\ \\mathrm{nm}$ — derin morötesi. Görünür fotonlar (1.8–3.1 eV) hepsi fazla zayıftır; öyleyse elmas görünür ışığı olduğu gibi içinden geçirir: elmasın berrak olması bundandır.',
      },
      'p7-q4': {
        prompt: 'Bant diliyle, bakırı iletken ama elması yalıtkan yapan nedir?',
        choices: [
          'Bakırın atomları daha ağırdır',
          'Bakırın değerlik ve iletkenlik bantları üst üste biner; öyleyse elektronlar mutlak sıfırda bile özgürdür. Elmasın 5.5 eV’lik aralığı her elektronu değerlik bandında kilitli tutar',
          'Bakır parlaktır ve elmas berraktır',
          'Elmasın aralığı, önemsiz kalacak kadar dardır',
        ],
        hints: [
          'Hareketli elektronlar her malzemede nerede oturur?',
          'Aralık sütununa bakın: bakır 0, elmas 5.5 eV.',
        ],
        explanation: 'Bakırın bantları üst üste biner; öyleyse iletkenlik elektronları her an hazırdır — tırmanma gerekmez. Elmasın 5.5 eV’lik aralığı sıradan herhangi bir ısıl dürtüden çok daha yüksektir; öyleyse değerlik elektronları kilitli kalır: bir yalıtkan.',
      },
      'p7-q5': {
        prompt: 'Bu dersin ruhuyla transistör nedir?',
        choices: [
          'Radyo dalgalarını uzay boyunca ileten bir aygıt',
          'Elektrikle kumanda edilen bir anahtar ya da yükseltici gibi davranan, katkılı yarı iletken bölgelerden örülmüş minicik bir sandviç — her çipin yapı taşı',
          'Şebeke voltajını yükselten bir transformatör',
          'Akımı her zaman engelleyen bir direnç',
        ],
        hints: [
          'Bir diyot, tek bir p–n bileşkesinden yapılmış tek yönlü bir vanadır. Bir kumanda ucu eklerseniz ne olur?',
          'Çipler milyarlarcasını barındırır.',
        ],
        explanation: 'Bir transistör, üst üste dizilmiş katkılı bölgelerden yapılır (örn. n–p–n): orta uçtaki küçük bir voltaj, dış uçlar arasındaki akışı açar ya da kapatır — hareketli parçası olmayan bir anahtar. Silisyuma oyulmuş milyarlarcası bir işlemciyi oluşturur.',
      },
    },
  },
}

export default ov
