// ─── Physics Quest · Turkish overlay · part-09 (e3, e4, p1) ──────────────────
import type { LessonOvFile } from '../schema'

const ov: LessonOvFile = {
  'e3-series-parallel': {
    title: 'Seri ve Paralel Devreler',
    tagline: 'İki ampulün bağlantısını değiştir ve hangisinin parlak kaldığını izle.',
    objectives: [
      'Seri devre ile paralel devreyi birbirinden ayırt et',
      'Toplam direnci hesapla: seride $R = R_1 + R_2$, paralelde $\\dfrac{1}{R} = \\dfrac{1}{R_1} + \\dfrac{1}{R_2}$',
      'Evlerin neden paralel bağlandığını açıkla',
    ],
    concept: [
      { t: 'p', text: 'Bir **devre**, elektrik akımının dolaşabileceği tam bir çemberdir. Birden fazla ampul ya da direnç bağladığında iki klasik bağlantı yolu vardır — **seri** ve **paralel** — ve ikisi de tamamen farklı davranır.' },
      { t: 'h', text: 'Seri: tek bir yol' },
      { t: 'p', text: 'Bir **seri devrede** bileşenler aynı çemberde art arda dizilir. Yalnızca bir yol vardır; bu yüzden **aynı akım** her bileşenden geçer. Pilin gerilimi aralarında **paylaşılır**: 12 V pile bağlı iki özdeş ampulün her biri 6 V alır ve ikisi de yalnızca yarı parlaklıkta ışık verir. Ampullerden birini sökersen çember kopar — **bütün** ampuller söner.' },
      { t: 'formula', caption: 'seride dirençler basitçe toplanır (ohm, Ω cinsinden ölçülür)' },
      { t: 'h', text: 'Paralel: her bileşene bir kol' },
      { t: 'p', text: 'Bir **paralel devrede** her bileşen, devrenin aynı iki noktasına bağlanan kendi koluna sahiptir. Her kol **pilin tam gerilimini** hisseder; böylece her ampul tam parlaklıkta parlayabilir. Kollardaki akımlar **toplanır** ve pilin çektiği toplam akımı verir. Ampullerden birini sökersen öteki kollar çalışmaya devam eder — onların çemberlerine dokunulmamıştır.' },
      { t: 'formula', caption: 'paralelde toplam direnç, her zaman en küçük tek kol direncinden daha küçüktür' },
      { t: 'key', text: 'Evlerdeki elektrik tesisatı paraleldir: her lamba ve her cihaz şebekenin tam gerilimini alır ve tek tek açılıp kapatılabilir. Seri bağlanmış lambalarda ise tek bir ampul bozulur bozulmaz hepsi birden söner.' },
      { t: 'table', headers: [' ', 'Seri', 'Paralel'], rows: [
        ['Akım yolları', 'tek', 'her kol için bir'],
        ['Akım', 'her yerde aynı', 'kollar arasında bölünür'],
        ['Gerilim', 'bileşenler arasında paylaşılır', 'her birinin üzerinde pilin tam gerilimi'],
        ['Bir ampul bozulur', 'bütün ampuller söner', 'ötekiler yanmaya devam eder'],
      ] },
    ],
    example: {
      title: 'Bir devre, iki bağlantı',
      problem: '6 Ω\'luk iki özdeş ampul bir 12 V pile bağlanıyor — önce seri, sonra paralel. Her ampulden hangi akım geçer?',
      steps: [
        { text: 'Seri — dirençleri topla:' },
        { text: 'Seri — aynı akım iki ampulden de geçer:' },
        { text: 'Paralel — artık her ampul tam 12 V alıyor:' },
        { text: 'Paralel — pil, iki kolun toplamını sağlıyor:' },
      ],
      answer: 'Seri bağlandığında her ampul $1\\ \\mathrm{A}$ taşır ve sönük ışık verir; paralel yeniden bağlandığında her biri tam parlaklıkta $2\\ \\mathrm{A}$ taşır ve pil toplamda $4\\ \\mathrm{A}$ verir.',
    },
    questions: {
      'e3-series-parallel-p1': {
        prompt: '6 Ω\'luk iki direnç seri bağlanıyor. Toplam dirençleri kaçtır?',
        hints: [
          'Seride dirençler basitçe toplanır.',
          '$R = 6\\ \\Omega + 6\\ \\Omega$',
        ],
        explanation: '$R_{\\text{total}} = 6\\ \\Omega + 6\\ \\Omega = 12\\ \\Omega$ — iki dirençten geçen tek bir yol.',
      },
      'e3-series-parallel-p2': {
        prompt: 'İki ampullük bir **seri** dizide ampullerden birini sökersin. Ne olur?',
        choices: [
          'Öteki ampul daha parlak parlar',
          'İki ampul de söner',
          'Öteki ampul yanmaya devam eder',
          'Yalnızca ışığın yarısı söner',
        ],
        hints: [
          'Çemberi izle: akım hâlâ devrenin çevresinde bir yol bulabilir mi?',
          'Seri tek yol demektir — nerede koparırsan kopar, akım her yerde durur.',
        ],
        explanation: 'Seri devre tek bir çemberdir. Bir ampulü sökmek çemberi açar; akım sıfıra düşer ve **bütün** ampuller söner. (Paralelde öteki kollar çalışmaya devam ederdi.)',
      },
      'e3-series-parallel-q1': {
        prompt: 'Bir **paralel** devredeki ampullerden biri yanar. Ötekilerine ne olur?',
        choices: [
          'Hepsi söner',
          'Yanmaya devam ederler',
          'Daha parlak parlarlar',
          'Titreşerek yanıp sönerler',
        ],
        hints: [
          'Her ampul kendi kolunun üzerindedir.',
          'Bir kolun kopması, öteki kollardaki akımı durdurmaz.',
        ],
        explanation: 'Paralelde her ampul, kendi kolunda pilin iki ucuna bağlıdır. Bozuk ampul yalnızca kendi kolunu açar; böylece ötekiler tam gerilimlerini korur ve yanmaya devam eder.',
      },
      'e3-series-parallel-q2': {
        prompt: '4 Ω\'luk iki direnç paralel bağlanıyor. Toplam dirençleri kaçtır?',
        hints: [
          '$\\dfrac{1}{R} = \\dfrac{1}{R_1} + \\dfrac{1}{R_2}$ kullan.',
          '$\\dfrac{1}{R} = \\dfrac{1}{4} + \\dfrac{1}{4} = \\dfrac{1}{2}$, yani $R = 2$.',
        ],
        explanation: '$\\dfrac{1}{R} = \\dfrac{1}{4} + \\dfrac{1}{4} = \\dfrac{1}{2}$, yani $R = 2\\ \\Omega$ — paralelde toplam direnç, tek bir kolun direncinden bile küçüktür.',
      },
      'e3-series-parallel-q3': {
        prompt: 'Seri bağlanmış 6 Ω\'luk iki ampul bir 12 V pile bağlanıyor. Her ampulden hangi akım geçer?',
        hints: [
          'Önce dirençleri topla: $6 + 6$.',
          'Sonra $I = V/R$ kullan.',
        ],
        explanation: '$R = 12\\ \\Omega$; dolayısıyla $I = 12\\ \\mathrm{V} \\div 12\\ \\Omega = 1\\ \\mathrm{A}$ — ve seride aynı akım iki ampulden de geçer.',
      },
      'e3-series-parallel-q4': {
        prompt: 'Evdeki prizler neden paralel bağlanır?',
        choices: [
          'En az kablo kullanır',
          'Her cihaz tam gerilimi alır ve tek tek açılıp kapatılabilir',
          'Paralel devrelerin toplam direnci daha yüksektir',
          'Her cihazdan aynı akım geçsin diye',
        ],
        hints: [
          'Her paralel kol hangi gerilimi alır?',
          'Ayrıca buzdolabını durdurmadan tost makinesini kapatmak istersin.',
        ],
        explanation: 'Paralelde her kol şebekenin tam gerilimine bağlanır; böylece her cihaz tam güçle çalışır — ve her biri ötekileri rahatsız etmeden açılıp kapatılabilir.',
      },
      'e3-series-parallel-q5': {
        prompt: '3 Ω\'luk bir direnç ile 5 Ω\'luk bir direnç seri bağlanıyor. Toplam direnç kaçtır?',
        hints: [
          'Seride dirençler toplanır.',
          '$3 + 5$',
        ],
        explanation: '$R_{\\text{total}} = 3\\ \\Omega + 5\\ \\Omega = 8\\ \\Omega$.',
      },
    },
  },
  'e4-magnets': {
    title: 'Mıknatıslar ve Elektromıknatıslar',
    tagline: 'Bir pusulayı alan içinde gezdir, sonra kapatabildiğin bir mıknatıs yap.',
    objectives: [
      'Hangi kutupların birbirini çektiğini, hangilerinin birbirini ittiğini öngör',
      'N\'den S\'ye uzanan manyetik alan çizgilerini tanımla',
      'Bir elektromıknatısı akım ve sarım sayısıyla denetle',
    ],
    concept: [
      { t: 'p', text: 'Buzdolabı mıknatısından bütün gezegene kadar her mıknatısın iki kutbu vardır: **kuzey (N)** ve **güney (S)**. Kutuplar, mıknatısın en güçlü çektiği ya da ittiği yerlerdir.' },
      { t: 'key', text: 'Aynı cins kutuplar birbirini iter, zıt kutuplar birbirini çeker: N, N\'yi iter ama N, S\'ye yapışır. Bu kuvvet, mıknatısın çevresindeki **manyetik alan** aracılığıyla uzaktan etki eder.' },
      { t: 'p', text: 'Alanı, kuzey kutbundan çıkıp uzayda kıvrılarak güney kutbuna giren görünmez **alan çizgileri** olarak canlandır. Çizgilerin birbirine sıkıştığı yerlerde alan daha güçlüdür. **Pusula iğnesi**, serbestçe dönebilen minicik bir mıknatıstır: kuzey ucu, bulunduğu her noktada **alan çizgisi boyunca** işaret edecek biçimde döner.' },
      { t: 'p', text: '**Dünya dev bir mıknatıstır.** Yüzeyin herhangi bir yerindeki pusula, gezegenimizin alanıyla hizalanır; böylece kuzey ucu coğrafi kuzeyi gösterir — pusulalar bin yıldır denizcileri işte böyle yönlendirmiştir.' },
      { t: 'h', text: 'Elektromıknatıslar: açıp kapatabildiğin mıknatıslar' },
      { t: 'p', text: '1820\'de Hans Christian **Oersted**, akım taşıyan bir telin yakındaki pusula iğnesini kıpırdatığını fark etti: **elektrik akımı manyetik alan oluşturur**. Teli bir demir çekirdeğin çevresinde sarmal sararsan, bütün sarımların alanları toplanır ve güçlü bir **elektromıknatıs** oluşur — her daimi mıknatısla aynı N ve S kutup kurallarıyla.' },
      { t: 'formula', caption: 'alan gücü, $I$ akımıyla (amper cinsinden) ve $N$ sarım sayısıyla artar' },
      { t: 'p', text: '**Sağ elin** parmaklarını akımın yönünde sarmalın çevresinde kıvır: başparmağın sarmalın kuzey kutbunu gösterir — buna *sağ el tutma kuralı* denir. Akımı ters çevir; iki kutup yer değiştirir.' },
      { t: 'list', items: [
        '**Hurdalık vinçleri**, açılıp kapatılabilen bir elektromıknatısla bütün arabaları kaldırır',
        '**Elektrik motorları**, elektromıknatıslarla daimi mıknatıslar arasındaki itişleri karşılıklı vererek döner',
        '**Hoparlörler ve kulaklıklar**, bir sarmal ve mıknatıs kullanarak havu titreştirir ve onu sese dönüştürür',
        '**Maglev trenleri**, güçlü elektromıknatıslar üzerinde rayların yukarısında süzülür',
      ] },
    ],
    example: {
      title: 'Sarımları iki katına çıkarmak',
      problem: 'Bir elektromıknatıs, 10 sarımlı bir sarmaldan 2 A akım geçiriyor ve alan gücü 20 birim. Akımı aynı tutarak bunun yerine 20 sarım sarıyorsun. Yeni güç kaç olur?',
      steps: [
        { text: 'Güç, akım × sarım ile orantılıdır:' },
        { text: 'Başlangıç noktasını denetle:' },
        { text: 'Aynı akımda sarımları iki katına çıkar:' },
      ],
      answer: 'Güç $40$ birime, yani iki katına çıkar — akım sabitken elektromıknatıs doğrudan sarım sayısıyla birlikte büyür.',
    },
    questions: {
      'e4-magnets-p1': {
        prompt: 'Bir çubuk mıknatısı tam ortadan ikiye bölüyorsun. Ne elde edersin?',
        choices: [
          'Ayrı bir kuzey parçası ve güney parçası',
          'Bir mıknatıs ve sıradan bir demir çubuk',
          'Her biri N ve S kutuplu, iki daha küçük tam mıknatıs',
          'Hiç mıknatıs yok',
        ],
        hints: [
          'Manyetik kutuplar her zaman çift hâlde gelir.',
          'Ne kadar küçük olursa olsun, her mıknatısın hem kuzeyi hem güneyi vardır.',
        ],
        explanation: 'Bir mıknatısı kesmek asla tek bir kutbu yalıtmaz: her yarı, kendi kuzey ve güney kutbuna sahip daha küçük tam bir mıknatıs olur. Onu ufak parçacıklara bölmek bile aynı sonucu verir.',
      },
      'e4-magnets-p2': {
        prompt: 'Bir elektromıknatıs, 10 sarımlı bir sarmaldan 2 A akım geçiriyor. Güç $= I \\times N$ bağlantısını kullanarak alan gücü kaçtır?',
        hints: [
          'Akımı sarım sayısıyla çarp.',
          '$2 \\times 10$',
        ],
        explanation: 'Güç $= I \\times N = 2\\ \\mathrm{A} \\times 10 = 20$ birim.',
      },
      'e4-magnets-q1': {
        prompt: 'İki mıknatısın kuzey kutuplarını birbirine yaklaştırıyorsun. Ne olur?',
        choices: [
          'Güçlü biçimde birbirlerini çekerler',
          'Birbirlerini iterler',
          'Hiçbir şey olmaz',
          'Kutuplar yer değiştirir',
        ],
        hints: [
          'Aynı cins kutuplarla ilgili kuralı hatırla…',
          'Aynı cins kutuplar birbirini iter; zıt kutuplar çeker.',
        ],
        explanation: 'Kuzey ve kuzey aynı cins kutuptur ve aynı cins kutuplar birbirini iter — mıknatıslar daha dokunmadan birbirlerini ittiklerini hissedebilirsin.',
      },
      'e4-magnets-q2': {
        prompt: 'Bir elektromıknatısın daimi mıknatısa karşı gerçek bir üstünlüğü nedir?',
        choices: [
          'Gücünü hiç kaybetmez',
          'Akım denetlenerek açılıp kapatılabilir',
          'Hiçbir enerji kaynağı olmadan çalışır',
          'İki kuzey kutbu vardır',
        ],
        hints: [
          'Akımı kesersen alana ne olur?',
          'Hurdalık vincinin arabayı er geç bırakması gerekir!',
        ],
        explanation: 'Elektromıknatısın alanı yalnızca akım aktığı sürece vardır; kaldırmak için açar, bırakmak için kapatırsın. Daimi mıknatıs ise komutla asla bırakmaz.',
      },
      'e4-magnets-q3': {
        prompt: 'Bir elektromıknatıs 3 A akımla ve 15 sarımla çalışıyor. Aynı birimlerle alan gücü kaçtır ($I \\times N$)?',
        hints: [
          'Akımı sarımlarla çarp.',
          '$3 \\times 15$',
        ],
        explanation: 'Güç $= 3\\ \\mathrm{A} \\times 15 = 45$ birim — daha çok akım ya da daha çok sarım her zaman daha güçlü mıknatıs demektir.',
      },
      'e4-magnets-q4': {
        prompt: 'Pusula iğnesi neden kuzeyi gösterir?',
        choices: [
          'İğne Güneş tarafından çekilir',
          'Dünya\'nın kendisi dev bir mıknatıs gibi davranır',
          'Mıknatıslar için kuzey basitçe “yukarı” demektir',
          'Hava akımları iğneyi döndürür',
        ],
        hints: [
          'Pusulanın gerçekte neyi algıladığını düşün.',
          'Dünya\'nın demir çekirdeği, gezegen çapında bir manyetik alan üretir.',
        ],
        explanation: 'Dünya kocaman bir mıknatıs gibi davranır. Pusula iğnesi, Dünya\'nın alanıyla hizalanan küçük bir mıknatıstır; böylece kuzey ucu coğrafi kuzeye yönelir.',
      },
      'e4-magnets-q5': {
        prompt: 'Bir tel sarmalın içine demir çekirdek eklemek…',
        choices: [
          'manyetik alanı zayıflatır',
          'hiçbir fark yaratmaz',
          'elektromıknatısı çok daha güçlü yapar',
          'akımın akmasını engeller',
        ],
        hints: [
          'Çekirdeğin kendisi bir mıknatısa dönüşür.',
          'Demir, manyetik alan çizgilerini yoğunlaştırır.',
        ],
        explanation: 'Sarmalın alanı demir çekirdeği mıknatıslar ve demir alan çizgilerini yoğunlaştırır — elektromıknatıs, boş sarmalın tek başına olabileceğinden kat kat güçlü olur.',
      },
    },
  },
  'p1-atom': {
    title: 'Atomun İçi',
    tagline: 'Protonları, nötronları ve elektronları üst üste diz — ve kurduğun şeye ad ver.',
    objectives: [
      'Atomun içindeki parçacıkları ve yüklerini adlandır',
      'Proton sayısının elementi neden belirlediğini açıkla',
      'Bir elementin iyonlarını ve izotoplarını modelle',
    ],
    concept: [
      { t: 'p', text: 'Çevrendeki her şey **atomlardan** kuruludur — ve her atomun, geniş bir banliyöyle çevrili kalabalık bir merkezî semti vardır. Minicik merkezin içinde **çekirdek** oturur; **elektronlar** ise (kendi boyutlarına göre) çok, çok daha uzakta süzülür.' },
      { t: 'p', text: 'Çekirdek iki tür parçacık barındırır: pozitif yüklü (+1) **protonlar** ve hiç yükü olmayan **nötronlar**. Her ikisi de bir elektrondan neredeyse 2000 kat ağırdır; böylece çekirdek, atomun neredeyse bütün kütlesini şaşırtıcı kadar küçük bir topun içine yığar.' },
      { t: 'p', text: '**Elektronlar** negatif yük (−1) taşır ve **kabuk** denen düzenli katmanlarda yer alır: ilk kabuk en fazla 2 elektron, ikincisi ise 8\'e kadar elektron tutar. Atomlar arasında sıçrayan parçacıklar elektronlardır — o sıçrayışın adı kimyadır.' },
      { t: 'key', text: 'Proton sayısı, atomun hangi element olduğunu belirler: 1 proton = hidrojen, 2 = helyum, 6 = karbon, 8 = oksijen. Proton sayısını değiştirdiğinde, elementin kendisini değiştirmiş olursun.' },
      { t: 'p', text: 'Bir **nötr atomda** elektron sayısı proton sayısına eşittir; böylece yükler birbirini yok eder. Bir elektron eklersen ya da çıkarırsan, net yüklü bir **iyon** elde edersin: elektron kaybetmek pozitif iyon, elektron kazanmak negatif iyon yapar. Elektronları takas etmek kolaydır; protonları değiştirmek ise çekirdek ölçeğinde enerji ister.' },
      { t: 'p', text: '**İzotoplar**, aynı elementin farklı sayıda nötrona sahip atomlarıdır: karbon-12 ile karbon-14\'ün ikisi de 6 proton taşır ama birinde 6, ötekinde 8 nötron vardır. **Kütle numarası** çekirdekteki bütün parçacıkları sayar:' },
      { t: 'formula', caption: 'kütle numarası = protonlar + nötronlar' },
      { t: 'key', text: 'Ölçek dürüstlüğü: çekirdek, futbol sahasının orta noktasına konmuş bir misket olsaydı, elektronlar tribünlerdeki toz zerreleri olurdu. Atom büyük ölçüde **boşluktur** — madde katı hissettirir; ama bunun nedeni elektrik kuvvetleridir, içindekilerin dolu olması değil.' },
    ],
    example: {
      title: 'Karbon-12 kurmak',
      problem: 'En yaygın karbon atomu 6 proton, 6 nötron ve 6 elektrona sahiptir. Kütle numarası, yükü ve elektron dizilimi nedir?',
      steps: [
        { text: 'Kütle numarası çekirdekteki parçacıkları sayar:' },
        { text: 'Yük, protonları elektronlarla dengeler:' },
        { text: 'Elektronlar kabukları sırayla doldurur:' },
      ],
      answer: 'Karbon-12 nötrdür: $A = 12$, yük $0$; ilk kabukta 2, ikinci kabukta 4 elektron vardır.',
    },
    questions: {
      'p1-atom-p1': {
        prompt: 'Oksijenin 8 protonu vardır. Nötr bir oksijen atomunda kaç elektron vardır?',
        hints: [
          'Nötr olmak, yüklerin tam olarak birbirini yok etmesi demektir.',
          'Nötr atomda elektron sayısı = proton sayısı.',
        ],
        explanation: 'Nötr, $+$ yüklerle $-$ yüklerin dengede olması demektir: $8$ proton $(+8)$, $0$ sonucunu vermek için $8$ elektrona $(-8)$ ihtiyaç duyar.',
      },
      'p1-atom-p2': {
        prompt: 'Bir karbon atomuna (6 proton) sihirli bir şekilde bir proton ekliyorsun. Ne elde edersin?',
        choices: [
          'Daha ağır bir karbon atomu',
          'Bir karbon iyonu',
          'Bir nitrojen atomu (7 proton)',
          'Serbest bir nötron',
        ],
        hints: [
          'Bir atomun hangi element olduğunu ne belirler?',
          'Protonları say: $6 + 1 = 7$ ve 7 proton nitrojendir.',
        ],
        explanation: 'Proton sayısı elementi belirler. Bir proton eklemek karbonu (6) nitrojene (7) dönüştürür. Nötron eklemek yalnızca izotop yapar; elektron eklemek ise iyon.',
      },
      'p1-atom-q1': {
        prompt: 'Hangi parçacık negatif yük taşır?',
        choices: [
          'Proton',
          'Nötron',
          'Elektron',
          'Çekirdeğin bütünü',
        ],
        hints: [
          'Protonlar pozitiftir, nötronlar nötrdür.',
          'Kabuklarda uçuşan parçacıklar negatiftir.',
        ],
        explanation: 'Elektronlar $-1$, protonlar $+1$, nötronlar $0$ taşır. Nötr atomda negatif elektronlar, pozitif protonları tam olarak dengeler.',
      },
      'p1-atom-q2': {
        prompt: 'Bir atomun 11 protonu ve 12 nötronu var. Kütle numarası $A$ kaçtır?',
        hints: [
          '$A = p + n$',
          '$11 + 12$',
        ],
        explanation: '$A = 11 + 12 = 23$. (Bu atom sodyum-23\'tür.)',
      },
      'p1-atom-q3': {
        prompt: 'İki atom birbirinin izotopu. Aralarındaki fark nedir?',
        choices: [
          'Proton sayıları',
          'Nötron sayıları',
          'Ait oldukları element',
          'Elektron sayıları',
        ],
        hints: [
          'İzotoplar aynı elementtir…',
          'Aynı proton, farklı nötron — tıpkı karbon-12 ile karbon-14 gibi.',
        ],
        explanation: 'İzotoplar aynı proton sayısını paylaşır (aynı element, aynı kimya) ama farklı sayıda nötron taşır; bu yüzden kütle numaraları farklıdır.',
      },
      'p1-atom-q4': {
        prompt: 'Bir atom nasıl negatif iyon olur?',
        choices: [
          'Elektron kaybederek',
          'Elektron kazanarak',
          'Proton kazanarak',
          'Nötron kaybederek',
        ],
        hints: [
          'Negatif net yük, fazladan $-1$ parçacıklar demektir.',
          'Elektronlar, atomların kolayca kazanıp kaybedebildiği parçacıklardır.',
        ],
        explanation: 'Elektron kazanmak, negatif yükü pozitiften fazla bırakır; atom da negatif iyon olur. Protonlar çekirdeğe kilitli kalır.',
      },
      'p1-atom-q5': {
        prompt: 'Sodyumun 11 protonu vardır. Nötr bir sodyum atomunda kaç elektron vardır?',
        hints: [
          'Nötr = net yük sıfır.',
          'Elektron sayısını proton sayısıyla eşle.',
        ],
        explanation: 'Net yükün sıfır olması için elektron sayısı proton sayısına eşit olmalıdır: $11$ elektron $(-11)$, $11$ protonu $(+11)$ dengeler.',
      },
    },
  },
}

export default ov
