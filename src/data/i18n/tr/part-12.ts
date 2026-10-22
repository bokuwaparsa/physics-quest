// ─── Physics Quest · Turkish (tr) overlay · part-12: x4, x5, x6 ──────────────
import type { LessonOvFile } from '../schema'

const ov: LessonOvFile = {
  'x4-rolling': {
    title: 'Yuvarlanma ve Açısal Momentum',
    tagline: 'Halka, disk, küre: aynı yamaç neden aynı yarışı hiç vermez?',
    objectives: [
      'Kaymadan yuvarlanma koşulunu $v = \\omega R$ olarak yazın ve dönüş hızını ileri yöndeki hıza bağlayın',
      '$mgh$ enerjisinin $\\tfrac{1}{2}mv^2 + \\tfrac{1}{2}I\\omega^2$ arasında nasıl paylaşıldığını ve yarışları $I/mR^2$’nin neden belirlediğini açıklayın',
      'Açısal momentum $L = I\\omega$ korunumunu dönen bir buz patencisine uygulayın',
    ],
    concept: [
      { t: 'p', text: 'Bir halkayı odanın öbür ucuna yuvarlayın: her parçası döner **ve** cismin bütünü yol alır. Yuvarlanma tek hamlede iki harekettir — merkez ileri gider (öteleme), cisim o merkez çevresinde döner (dönme). Bir tekerlek **kaymadan** yuvarlandığında bu iki hareket, tek bir basit kuralla birbirine kilitlenir.' },
      { t: 'h', text: 'Kaymadan yuvarlanma: $v = \\omega R$' },
      { t: 'p', text: '**Açısal hız** $\\omega$, dönüş hızını radyan/saniye cinsinden ölçer — bir tam tur $2\\pi$ radyandır; dolayısıyla $T$ periyotlu bir dönüş için $\\omega = 2\\pi/T$’dir. Kaymadan yuvarlanan $R$ yarıçaplı bir tekerlek çemberini zemine adım adım serer: bir tam tur tam olarak $2\\pi R$ yol sarar; merkez de bu yüzden $v = \\omega R$ hızıyla gider. Yerle temas eden nokta, o an zemine göre **durgundur** — kayma yok, sürtünüp aşınma yok.' },
      { t: 'formula', caption: 'kaymadan yuvarlanma koşulu: merkez hızı $v$ m/s, açısal hız $\\omega$ rad/s ve yarıçap $R$ m cinsinden' },
      { t: 'p', text: 'Yuvarlanan bir cisim hem yol alır hem döndüğü için kinetik enerjisi iki parçadır: öteleme için $\\tfrac{1}{2}mv^2$, dönme için $\\tfrac{1}{2}I\\omega^2$; buradaki $I$, kütlenin dönsel ikizi olan **eylemsizlik momenti**dir (kütlenin eksene ne kadar uzakta durduğuna bağlıdır). Yokuş aşağı yuvarlanın, yerçekiminin armağanı $mgh$ iki kumbara arasında paylaşılır:' },
      { t: 'formula', caption: 'düşme yüksekliği $h$; $\\omega = v/R$ alındığında bu denklem, tabana varıldığında $v = \\sqrt{\\,2gh / (1 + I/mR^2)\\,}$ çözümünü verir' },
      { t: 'table', headers: ['Cisim', 'Eylemsizlik momenti $I$', '$I/mR^2$', 'Dönüşe giden KE payı'], rows: [
        ['Halka', '$mR^2$', '1', '50%'],
        ['Disk (katı silindir)', '$\\tfrac{1}{2}mR^2$', '0.5', '33%'],
        ['Katı küre', '$\\tfrac{2}{5}mR^2$', '0.4', '29%'],
      ] },
      { t: 'p', text: 'Bir yuvarlanma yarışında kütle ve yarıçap **sadeleşir**. Enerji denklemini $m$’ye bölün ve $\\omega = v/R$ yazın: depolanan dönüş enerjisi, tek bir $c = I/mR^2$ sayısıyla $\\tfrac{1}{2}c\\,mv^2$ olur. Büyük $c$, enerjinin iri bir diliminin hızlanmaya değil **dönmeye** gittiği demektir — bu yüzden halka, aynı kütle ve yarıçaptaki bir küreye, ikisi ne kadar ağır olursa olsun, her zaman kaybeder.' },
      { t: 'formula', caption: '$\\theta$ eğimli bir yamaçta durgundan yuvarlanmanın ivmesi; $c = I/mR^2$ halka için 1, disk için 0.5, katı küre için 0.4 — küçük $c$ kazanır' },
      { t: 'h', text: 'Açısal momentum: $L = I\\omega$' },
      { t: 'p', text: '**Açısal momentum** $L = I\\omega$, sıradan momentumun dönsel ikizidir. Dönen bir cisme dışarıdan **tork** etki etmiyorsa $L$ değişemez — **açısal momentumun korunumu**. Dönen bir buz patencisi kollarını bedenine toplar: eylemsizlik momenti $I$ düşer, çarpım $I\\omega$ sabit kalsın diye dönüş hızı $\\omega$ artmak zorundadır — ve patenci hızla dönmeye başlar. Çöken yıldızlar aynı numarayı oynar: büzülen bir yıldız çekirdeği, saniyede yüzlerce kez dönen bir nötron yıldızına dönüşerek fırlar.' },
      { t: 'key', text: 'Kaymadan yuvarlanma, dönüşü hıza kilitler: $v = \\omega R$. Yokuş aşağı $a = g\\sin\\theta/(1 + I/mR^2)$ — $I/mR^2$ küçüldükçe hıza dönüşen enerji payı büyür. Dış tork yokken $L = I\\omega$ sabit kalır: $I$ küçülürse $\\omega$ büyür.' },
    ],
    example: {
      title: 'Küre ve yamaç',
      problem: 'Katı bir küre ($I = \\tfrac{2}{5}mR^2$), yamaçta durgundan kaymadan yuvarlanarak $h = 3.5\\ \\mathrm{m}$ alçalıyor. Tabana ulaştığında merkezi hangi hızla hareket ediyor? (Hava direncini ve yuvarlanma sürtünmesini yok sayın.)',
      steps: [
        { text: 'Enerji korunur — düşülen yükseklik, öteleme ve dönme kinetik enerjisine dönüşür:' },
        { text: 'Kayma yok: $\\omega = v/R$. $I = \\tfrac{2}{5}mR^2$’yi yerine koyun — kütle ve yarıçap sadeleşir:' },
        { text: 'İki enerji payını toplayın:' },
        { text: '$v$ için çözün ve $h = 3.5\\ \\mathrm{m}$’yi yerine yazın:' },
      ],
      answer: 'Küre tabana $7.0\\ \\mathrm{m/s}$ ile varır. Aynı yamaçtan yuvarlanan bir halkaya ise yalnızca $\\sqrt{gh} = \\sqrt{34.3} \\approx 5.9\\ \\mathrm{m/s}$ düşer — enerji bütçesinin yarısı dönmeye gider; kürenin yarışı kazanması tam olarak bundandır.',
    },
    questions: {
      'x4-p1': {
        prompt: '0.5 m yarıçaplı bir tekerlek, 6 m/s hızıyla kaymadan yuvarlanıyor. Açısal hızı $\\omega$ kaçtır?',
        hints: [
          'Kaymadan yuvarlanma ikisini bağlar: $v = \\omega R$.',
          '$\\omega = v/R$ için çözün: $6 \\div 0.5$.',
        ],
        explanation: '$\\omega = v/R = 6\\ \\mathrm{m/s} \\div 0.5\\ \\mathrm{m} = 12\\ \\mathrm{rad/s}$ — tekerlek her saniye 12 radyan (yaklaşık 1.9 tur) döner.',
      },
      'x4-p2': {
        prompt: 'Aynı kütle ve yarıçaptaki üç cisim — bir halka, bir disk ve bir katı küre — durgundan aynı eğimde yarışıyor. Hangisi önce bitirir?',
        choices: [
          'Halka — en çok enerjiyi o depolar',
          'Disk — her şeyin ortasındaki aday',
          'Katı küre — en küçük $I/mR^2$, böylece enerjinin en büyük payı hıza dönüşür',
          'Başabaş biter — yerçekimi herkese aynı muameleyi yapar',
        ],
        hints: [
          '$a = g\\sin\\theta/(1 + I/mR^2)$ değerini $c = 1$, $0.5$ ve $0.4$ için karşılaştırın.',
          'Dönmeye harcanan enerji, hareket etmeye harcanmayan enerjidir.',
        ],
        explanation: '$a = g\\sin\\theta/(1+c)$, en küçük $c$ için en büyüktür. Küre ($c = 0.4$), her eğimde ve her kütlede diski ($0.5$) ve halkayı ($1$) yener.',
      },
      'x4-p3': {
        prompt: 'Bir halka ($I = mR^2$), durgundan kaymadan yuvarlanarak 5.0 m yüksekliğinde bir tepeden iniyor. Tabandaki hızı kaçtır?',
        hints: [
          'Halka için $\\tfrac{1}{2}I\\omega^2 = \\tfrac{1}{2}mv^2$ — iki enerji payı eşittir.',
          '$mgh = mv^2$, yani $v = \\sqrt{gh}$: $9.8 \\times 5$.',
        ],
        explanation: 'Halka enerjisinin yarısını dönüş olarak depolar; bu yüzden $mgh = mv^2$ ve $v = \\sqrt{gh} = \\sqrt{9.8 \\times 5.0} = \\sqrt{49} = 7.0\\ \\mathrm{m/s}$ — kayan bir blok $\\sqrt{2gh} \\approx 9.9\\ \\mathrm{m/s}$’a ulaşırdı.',
      },
      'x4-p4': {
        prompt: 'Kolları açıkken dönen bir patenci, kollarını bedenine sıkıca toplar. Neden daha hızlı döndüğünü hangi fikir açıklar?',
        choices: [
          'Açısal momentumun korunumu: $I$ düşer, $\\omega$ artmak zorundadır',
          'Doğrusal momentumun korunumu',
          'Kasları dışarıdan açısal momentum ekler',
          'Buzla sürtünme ona bir itme verir',
        ],
        hints: [
          'Dış tork etki etmiyor — hangi büyüklük sabit kalmak zorunda?',
          '$L = I\\omega$: $I$ küçülürse ve $L$ sabitse, $\\omega$’ya ne olur?',
        ],
        explanation: 'Dış tork olmadığında $L = I\\omega$ korunur. Kütleyi eksene doğru çekmek $I$’yi azaltır; $I\\omega$ sabit kalsın diye $\\omega$ büyür — hiç yeni itme almadan daha hızlı döner.',
      },
      'x4-q1': {
        prompt: 'Katı bir disk ($I = \\tfrac{1}{2}mR^2$), yamaçta durgundan kaymadan yuvarlanarak 4.9 m alçalıyor. Tabandaki hızı kaçtır?',
        hints: [
          '$c = 0.5$ ile $v = \\sqrt{2gh/(1 + c)}$ kullanın.',
          '$2 \\times 9.8 \\times 4.9 = 96.04$; sonra 1.5’e bölün.',
        ],
        explanation: '$v^2 = 2gh/(1+c) = (2 \\times 9.8 \\times 4.9)/1.5 = 96.04/1.5 \\approx 64$; dolayısıyla $v \\approx 8\\ \\mathrm{m/s}$ — aynı yükseklikteki halkadan (7 m/s) daha hızlı.',
      },
      'x4-q2': {
        prompt: 'İki katı küre aynı eğimde yarışıyor: A küresi 1 kg kütleli ve 0.2 m yarıçaplı, B küresi 4 kg kütleli ve 0.4 m yarıçaplı. Ne olur?',
        choices: [
          'B kazanır — daha ağır cisimler daha çok yerçekimi hisseder',
          'A kazanır — küçük tekerlekler çeviktir',
          'Başabaş — $m$ ve $R$, $a = g\\sin\\theta/(1 + I/mR^2)$ içinde sadeleşir',
          'B kazanır — büyük tekerlekler daha akıcı yuvarlanır',
        ],
        hints: [
          '$a = g\\sin\\theta/(1+c)$ yazın — içinde $m$ ya da $R$ var mı?',
          'Her küre, boyutu ne olursa olsun $c = 2/5$ taşır.',
        ],
        explanation: 'Her katı küre için $I/mR^2 = 2/5$’tur; ikisi için de $a = g\\sin\\theta/1.4$ — yarış başabaş biter. Yuvarlanma yarışlarını yalnızca biçim belirler.',
      },
      'x4-q3': {
        prompt: 'Bir patenci, $I = 4\\ \\mathrm{kg\\,m^2}$ eylemsizlik momentiyle $\\omega = 2\\ \\mathrm{rad/s}$ hızında dönüyor. Kollarını toplayınca $I$, $1.6\\ \\mathrm{kg\\,m^2}$’ye düşüyor. Yeni dönüş hızı…',
        hints: [
          'Açısal momentum korunur: $I\\omega = I\'\\omega\'$.',
          '$L = 4 \\times 2 = 8$; sonra $\\omega\' = 8 \\div 1.6$.',
        ],
        explanation: '$L = I\\omega = 4 \\times 2 = 8\\ \\mathrm{kg\\,m^2/s}$ sabit kalır; dolayısıyla $\\omega\' = 8/1.6 = 5\\ \\mathrm{rad/s}$ — iki buçuk kat daha hızlı.',
      },
      'x4-q4': {
        prompt: 'Aynı yamaçtan yuvarlanırken hangi cisim, enerjisinin EN büyük bölümünü dönmeye çevirir?',
        choices: [
          'Halka ($I/mR^2 = 1$)',
          'Disk ($I/mR^2 = 0.5$)',
          'Katı küre ($I/mR^2 = 0.4$)',
          'Hepsi dönüşe aynı enerji payı ayırır',
        ],
        hints: [
          'Dönüşe giden pay $c/(1+c)$ — $c$’yi olabildiğince büyütün.',
          'En yavaş yarışçı, en çok enerjiyi dönmeye harcayan olandır.',
        ],
        explanation: 'Dönme oranı $c/(1+c)$’tir: halka $1/2 = 50\\%$, disk $1/3 \\approx 33\\%$, küre $2/7 \\approx 29\\%$. Halka en tembel yuvarlanandır — kaybetmesinin nedeni tam olarak bu.',
      },
      'x4-q5': {
        prompt: '0.3 m yarıçaplı bir tekerlek, $\\omega = 20\\ \\mathrm{rad/s}$ hızında dönerken kaymadan yuvarlanıyor. Merkezi hangi hızla yol alır?',
        hints: ['Kaymama kuralını kullanın: $v = \\omega R$.', '$20 \\times 0.3$'],
        explanation: '$v = \\omega R = 20\\ \\mathrm{rad/s} \\times 0.3\\ \\mathrm{m} = 6\\ \\mathrm{m/s}$ — çember, yolu tam bu hızla sararak açılır.',
      },
    },
  },
  'x5-equilibrium': {
    title: 'Denge ve Esneklik',
    tagline: 'Kirişi dengeleyin, destek noktanızı akıllıca seçin ve hiçbir şeyin neden devrilmediğini öğrenin.',
    objectives: [
      'İki denge koşulunu birlikte kullanın: $\\Sigma F = 0$ ve $\\Sigma \\tau = 0$; destek noktasını akıllıca seçin',
      'Yüklü bir kirişin destek tepki kuvvetlerini, bir destek çevresindeki torklarla bulun',
      'Hooke yasası $F = kx$’i tanımlayın; gerilme, şekil değişimi ile Young modülünün ne anlama geldiğini açıklayın',
    ],
    concept: [
      { t: 'p', text: 'Bir vinç, çelik kirişi havada kıpırtısız tutar; bir köprü, yoğun saatteki trafiği bıkıp durmadan taşır; yüklü bir tahterevalli kusursuz biçimde yatay asılı kalır. Bunların hepsinde sessiz iki koşul sağlanır — tüm **kuvvetler** dengelenir **ve** tüm **torklar** dengelenir. Fizikçiler bu duruma **denge** der.' },
      { t: 'h', text: 'Birinci koşul: kuvvetler dengelenir' },
      { t: 'p', text: 'Bir cisme etki eden net kuvvet sıfır olmasaydı, Newton’un ikinci yasası ona ivme kazandırırdı. Durgun durabilen her şey, tüm kuvvetlerin vektörel toplamının yok olmasını gerektirir: $\\Sigma F = 0$. İki desteğe oturan bir kirişte, desteklerin yukarı yönlü **tepki kuvvetleri**, kirişin ağırlığı ile asılı her şeyi tam olarak karşılamalıdır — ne eksik ne fazla.' },
      { t: 'h', text: 'İkinci koşul: torklar dengelenir' },
      { t: 'p', text: 'Kuvvetler tek başına işi bitirmez — eşit ve zıt iki kuvvet bile bir cismi döndürebilir (kapının menteşe tarafını itmeyi deneyin). **Tork**, bir kuvvetin döndürücü etkisini ölçer: kuvvet ile onun **kuvvet kolunun** — destek noktasına dik uzaklığın — çarpımı. Dönme olmaması, seçtiğiniz **herhangi bir nokta** çevresinde saat yönündeki torkların saat yönü tersine olanlara eşit olması demektir. Akıllıca hamle: torkları, bilmediğiniz bir kuvvetin tam üzerinden geçen bir destek noktası çevresinde alın — o kuvvetin kuvvet kolu sıfır olur ve denklemden tümüyle düşer.' },
      { t: 'formula', caption: 'tork $\\tau$ newton-metre (N·m), kuvvet $F$ N ve kuvvet kolu $d$ m — kuvvete dik ölçülür' },
      { t: 'key', text: 'Denge İKİSİNİ de ister: herhangi bir nokta çevresinde $\\Sigma F = 0$ (ivme yok) ve $\\Sigma \\tau = 0$ (dönme yok). Destek noktasını bilinmeyen bir kuvvetin üzerinden geçirirseniz o bilinmeyen, tork toplamından silinir.' },
      { t: 'p', text: 'Homojen bir kirişin ağırlığı **ağırlık merkezinde** etki eder — tek denge noktası; homojen kirişte tam ortasıdır. İki destek yükü paylaşır; tepkileri $\\Sigma \\tau = 0$’dan çıkar. Ortadan asılan yük eşit bölünür; yükü bir desteğe doğru kaydırırsanız o destek daha çoğunu taşır. Bir desteğin tepkisinin **negatife** dönmesi gerekirse kiriş devrilir — öbür destek çevresinde döner ve yerden kalkar. Sayıları deneyin: 20 kg kütleli (ağırlığı 196 N) 4 m homojen bir kiriş, uçlarından 0.5 m içerideki desteklere oturuyor ve $x$ konumunda 150 N’luk yük taşıyor:' },
      { t: 'table', headers: ['150 N’luk yükün asıldığı yer…', 'A desteğinin tepkisi', 'B desteğinin tepkisi'], rows: [
        ['$x = 1$ m (A’ya yakın)', '223 N', '123 N'],
        ['$x = 2$ m (orta nokta)', '173 N', '173 N'],
        ['$x = 3$ m (B’ye yakın)', '123 N', '223 N'],
      ] },
      { t: 'h', text: 'Esneklik: yaylar uzar, kirişler eğilir' },
      { t: 'p', text: 'Hiçbir destek kusursuz katı değildir — her katı, yük altında biraz biçim değiştirir ve serbest bırakılınca geri yaylanır. Bir yay için **Hooke yasası**, uzamanın çekmeyle orantılı olduğunu söyler: kuvveti iki katına çıkarın, ek uzunluk da iki katına çıkar. **Yay sabiti** $k$, sertliği N/m cinsinden ölçer — büyük $k$ sert yay demektir. **Esneklik sınırı** aşıldığında cisim yeni biçimini korur ve Hooke yasası artık geçerli değildir.' },
      { t: 'formula', caption: 'geri çekme kuvveti $F$ N, yay sabiti $k$ N/m ve uzama $x$ m — doğal uzunluktan ölçülür' },
      { t: 'table', headers: ['Büyüklük', 'Anlamı', 'Birimi'], rows: [
        ['Gerilme', 'kesit alana yayılan kuvvet, $F/A$', 'Pa'],
        ['Şekil değişimi', 'oransal uzama, $\\Delta L / L$', '— (birimsiz)'],
        ['Young modülü $E$', 'gerilme ÷ şekil değişimi — malzemenin sertlik notu', 'Pa'],
      ] },
      { t: 'key', text: 'Her şeyi iki denklemle yerinde tutun: $\\Sigma F = 0$ ve $\\Sigma \\tau = 0$. Yaylar esnek kaldığı sürece Hooke yasası $F = kx$ ile uzar; malzemeler sertliğini Young modülü $E = \\text{stress}/\\text{strain}$ ile bildirir (çelik ≈ $2 \\times 10^{11}\\ \\mathrm{Pa}$, lastik milyonlarca kat küçük).' },
    ],
    example: {
      title: 'Yükü paylaşmak',
      problem: '20 kg kütleli homojen bir 4 m kiriş, uçlarından 0.5 m içerideki iki desteğe oturuyor. Ortasından (2.0 m) 150 N’luk yük asılı. Her desteğin tepki kuvvetini bulun. ($g = 9.8\\ \\mathrm{m/s^2}$)',
      steps: [
        { text: 'Bilinenler — kirişin ağırlığı ağırlık merkezinde, iki uçtan da 2.0 m uzakta etki eder:' },
        { text: 'A desteğinin (0.5 m) çevresinde torklar. $R_A$ destek noktasının üzerinden geçer; torku sıfırdır:' },
        { text: '$R_B$ için çözün:' },
        { text: 'Birinci koşul $R_A$’yı verir ve toplamlar tutar:' },
      ],
      answer: 'Her destek $173\\ \\mathrm{N}$ taşır. Tümüyle simetrik — yük ağırlık merkezinde asılı; 346 N’luk toplam (196 N kiriş + 150 N yük) tam ikiye bölünür.',
    },
    questions: {
      'x5-p1': {
        prompt: '$k = 250\\ \\mathrm{N/m}$ yay sabitli bir yay, doğal uzunluğundan 0.2 m geriliyor. Hangi kuvvetle geri çeker?',
        hints: ['Hooke yasasını kullanın: $F = kx$.', '$250 \\times 0.2$'],
        explanation: '$F = kx = 250\\ \\mathrm{N/m} \\times 0.2\\ \\mathrm{m} = 50\\ \\mathrm{N}$ — yay, onu germek için gereken kuvvetin tam karşılığıyla geri çeker.',
      },
      'x5-p2': {
        prompt: 'Bir kirişte B desteğinin tepkisini bulmanız gerekiyor ama A desteğinin tepkisini henüz bilmiyorsunuz. Hangi destek noktası tork denklemini en kolaylaştırır?',
        choices: [
          'Herhangi bir nokta — her nokta çevresindeki torklar, eşit emekle aynı yanıtı verir',
          'A desteğinin üzerinden geçen bir nokta — o zaman $R_A$’nın kuvvet kolu sıfır olur ve denklemden düşer',
          'Asılı yükün bulunduğu nokta',
          'Kirişin ucunun çok ötesinde bir nokta',
        ],
        hints: [
          'Tam olarak destek noktasının ÜZERİNDE etki eden bir kuvvetin torku nedir?',
          'Bir denklemde bir bilinmeyen yeter — öbür bilinmeyeni etkisizleştirin.',
        ],
        explanation: 'Destek noktasının üzerinden geçen kuvvetin kuvvet kolu sıfır, dolayısıyla torku da sıfırdır. A çevresinde dönmek, $R_A$’yı $\\Sigma\\tau = 0$’dan çıkarır; geriye bir denklem ve bir bilinmeyen kalır: $R_B$.',
      },
      'x5-p3': {
        prompt: 'Bir tahterevallide 300 N ağırlığındaki çocuk, denge noktasının solunda 2 m uzakta oturuyor. Dengeyi kurmak için 200 N ağırlığındaki çocuk sağda nerede oturmalı?',
        hints: [
          'Torkları dengeleyin: $F_1 d_1 = F_2 d_2$.',
          '$300 \\times 2 = 200 \\times d$, yani $d = 600 \\div 200$.',
        ],
        explanation: '$\\Sigma\\tau = 0$ için $300 \\times 2 = 200 \\times d$ gerekir; $d = 3\\ \\mathrm{m}$ — daha hafif çocuk, eksik kuvveti uzaklıkla telafi eder.',
      },
      'x5-p4': {
        prompt: 'Aynı boyutta ve aynı başlangıç uzunluğundaki iki tel, aynı kuvvetle geriliyor. A teli 1 mm uzuyor; B teli 4 mm uzuyor. Young modülü hangisinde daha büyüktür?',
        choices: [
          'A teli — aynı gerilme için daha az şekil değişimi, daha büyük $E$ demektir',
          'B teli — çok uzamak, çok sert olmak demektir',
          'İkisi de eşit — aynı kuvvet aynı $E$’yi verir',
          'Malzemeyi bilmeden söylemek imkânsız',
        ],
        hints: [
          '$E = \\text{stress}/\\text{strain}$ — aynı kuvvet ve boyut, aynı gerilme demektir.',
          'Aynı gerilmede DAHA AZ uzayan tel, daha sert malzemedir.',
        ],
        explanation: 'Aynı kuvvet ve boyut → aynı gerilme. A telinin şekil değişimi 4 kat küçüktür; dolayısıyla $E_A = \\text{stress}/\\text{strain}$ 4 kat büyüktür — sert malzeme A’dır.',
      },
      'x5-q1': {
        prompt: 'Bir yay, 40 N ile çekildiğinde 0.08 m uzuyor. Yay sabiti $k$ kaçtır?',
        hints: ['Hooke yasası: $F = kx$, yani $k = F/x$.', '$40 \\div 0.08$'],
        explanation: '$k = F/x = 40\\ \\mathrm{N} \\div 0.08\\ \\mathrm{m} = 500\\ \\mathrm{N/m}$ — her metre uzama için 500 N gerekirdi.',
      },
      'x5-q2': {
        prompt: 'Aynı destek noktası çevresinde hangisi daha büyük tork üretir: 0.5 m kuvvet kollu 20 N’luk kuvvet mi, 1.2 m kuvvet kollu 10 N’luk kuvvet mi?',
        choices: [
          '20 N’luk kuvvet — büyük kuvvet her zaman kazanır',
          '10 N’luk kuvvet — $12\\ \\mathrm{N\\cdot m}$, $10\\ \\mathrm{N\\cdot m}$’yi yener',
          'Tam olarak eşittirler',
          'Hiçbiri — torkun var olması 90° açı gerektirir',
        ],
        hints: ['Her biri için $\\tau = F \\cdot d$ hesaplayın.', '$20 \\times 0.5$ ile $10 \\times 1.2$’yi karşılaştırın.'],
        explanation: '$\\tau_1 = 20 \\times 0.5 = 10\\ \\mathrm{N\\cdot m}$; $\\tau_2 = 10 \\times 1.2 = 12\\ \\mathrm{N\\cdot m}$. Uzun kuvvet kollu küçük kuvvet daha güçlü döndürür — kapı kollarının menteşeden uzakta olmasının nedeni budur.',
      },
      'x5-q3': {
        prompt: 'Homojen 20 kg kütleli bir kiriş, simetrik yerleştirilmiş iki desteğe oturuyor; üstünde başka bir şey yok. HER destek kaç newtonluk kuvvet sağlar? ($g = 9.8\\ \\mathrm{m/s^2}$)',
        hints: [
          'Tüm ağırlık ağırlık merkezinde etki eder ve eşit bölünür.',
          '$W = 20 \\times 9.8 = 196\\ \\mathrm{N}$; sonra 2’ye bölün.',
        ],
        explanation: 'Ağırlık $W = 196\\ \\mathrm{N}$, ortada etki eder. Simetri (ya da herhangi bir destek çevresinde $\\Sigma\\tau = 0$) onu eşit böler: her biri $196/2 = 98\\ \\mathrm{N}$.',
      },
      'x5-q4': {
        prompt: 'Homojen bir metre çubuğu, tek parmak üzerinde yatar biçimde dengede duruyor. Parmağı nereye koyarsınız?',
        choices: ['0 cm ucunda', '25 cm çizgisinde', '50 cm çizgisinde', '75 cm çizgisinde'],
        hints: [
          'Homojen çubuğun ağırlık merkezi, geometrik merkezindedir.',
          'Parmak, ağırlık merkezinin tam altında durmalıdır.',
        ],
        explanation: 'Homojen metre çubuğunun ağırlık merkezi 50 cm çizgisindedir. Oradan desteklemek, iki yarıya eşit ağırlık ve eşit kuvvet kolu verir — parmak çevresinde $\\Sigma\\tau = 0$.',
      },
      'x5-q5': {
        prompt: '4 m uzunluğunda bir çelik tel, yük altında 0.0005 şekil değişimi yaşıyor. Kaç milimetre uzar?',
        hints: [
          'Şekil değişimi $\\Delta L / L$’dir, yani $\\Delta L = \\text{strain} \\times L$.',
          '$0.0005 \\times 4\\ \\mathrm{m} = 0.002\\ \\mathrm{m}$ — şimdi mm’ye çevirin.',
        ],
        explanation: '$\\Delta L = 0.0005 \\times 4\\ \\mathrm{m} = 0.002\\ \\mathrm{m} = 2\\ \\mathrm{mm}$. Minik uzamalar normaldir: çelik çok serttir; büyük kuvvetler bile onu ancak biraz uzatır.',
      },
    },
  },
  'x6-gravitation': {
    title: 'Kütle Çekimi ve Yörüngeler',
    tagline: 'Uyduları fırlatın, dairesel yörüngelerin peşine düşün ve astronotların neden süzüldüğünü öğrenin.',
    objectives: [
      'Kütle çekim kuvvetini $F = Gm_1m_2/r^2$ ile hesaplayın ve ters kare yasasını açıklayın',
      'Dairesel yörüngeler için $v = \\sqrt{GM/r}$ kullanın ve $g$’nin yükseklikle nasıl azaldığını ($g \\propto 1/r^2$) açıklayın',
      'Ağırlıksızlığı serbest düşme olarak açıklayın; kaçma hızı ile gelgitleri tartışın',
    ],
    concept: [
      { t: 'p', text: 'Elma düşer; Ay dolanır. Isaac Newton’un büyük sıçraması, ikisinin ardında da **tek bir kuvvet** görmekti. Her kütle, diğer her kütleyi çeker — bu çekim **kütle çekimidir** ve kalkansız, kapatma düğmesiz, tüm evrene ulaşır.' },
      { t: 'h', text: 'Newton’un kütle çekim yasası' },
      { t: 'p', text: 'İki cisim, merkezlerini birleştiren doğrultuda birbirini çeker; kuvvet her iki kütleyle büyür, uzaklıkla solar. İşin içinden bir **ters kare yasası** çıkar: uzaklık iki katına çıkınca kuvvet dörde bölünür; üç katına çıkınca kuvvet dokuzda birine düşer.' },
      { t: 'formula', caption: 'kuvvet $F$ N, kütleler $m_1, m_2$ kg, merkezler arası uzaklık $r$ m ve $G = 6.67 \\times 10^{-11}\\ \\mathrm{N\\,m^2/kg^2}$' },
      { t: 'p', text: 'Dünya’nın yüzey çekimi doğrudan bu yasadan çıkar: $g = GM/r^2$ içine $M$ = Dünya’nın kütlesi, $r$ = Dünya’nın yarıçapı koyun; $9.8\\ \\mathrm{m/s^2}$ çıkar. Yukarı tırmandıkça $r$ büyür ve $g$, $1/r^2$ gibi azalır — uzaklık iki katına, çekim dörtte bire. Dairesel hız daha yumuşak solar, $1/\\sqrt{r}$ gibi: uzaklık iki katına çıkınca yalnızca $\\sqrt{2} \\approx 1.41$ kat düşer. Tablo ikisini de bir bakışta gösterir.' },
      { t: 'table', headers: ['Merkezden uzaklık $r$', 'Yerçekimi $g$', 'Dairesel hız $v$'], rows: [
        ['$1R$', '9.8 m/s²', '7.9 km/s'],
        ['$2R$', '2.45 m/s²', '5.6 km/s'],
        ['$4R$', '0.61 m/s²', '4.0 km/s'],
        ['$8R$', '0.15 m/s²', '2.8 km/s'],
      ] },
      { t: 'h', text: 'Yörüngeler: sonsuza dek düşmek' },
      { t: 'p', text: 'Bir uydu **düşmektedir** — yalnızca yana doğru öyle hızlı gider ki, kavisli dünya yüzeyi altından tam düşüş hızıyla uzaklaşır. **Dairesel yörüngede** yerçekimi, dairesel hareketteki ipin görevini üstlenir: $GMm/r^2 = mv^2/r$. $v$ için çözün; karşınıza **dairesel yörünge hızı** çıkar:' },
      { t: 'formula', caption: 'gezegenin merkezinden $r$ uzaklıkta dairesel yörünge hızı — Dünya yüzeyine yakın $v \\approx 7.9\\ \\mathrm{km/s}$; $r = 2R$’de $5.6\\ \\mathrm{km/s}$' },
      { t: 'p', text: 'Peki astronotlar neden süzülür? Yerçekimi kapalı olduğu için değil — uzay istasyonunda hâlâ ≈ 8.7 m/s², deniz seviyesinden ancak bir tık az. Süzülürler çünkü istasyon ve içindeki her şey **birlikte düşer**: tümüyle **serbest düşme** halindedir; zemin itmeyi bırakır, hiçbir şeyin ağırlığı kalmaz. Ağırlıksızlık, yerçekiminden kaçmak değil, uzay aracınızla birlikte düşmektir.' },
      { t: 'p', text: '**Kaçma hızı**: bir cismi yeterince hızlı fırlatın; Dünya onu bir daha toplayamaz. Toplam enerjiyi (kinetik + kütle çekimsel) tam sıfıra eşitlemek $v_{\\text{esc}} = \\sqrt{2GM/r} = \\sqrt{2}\\, v_{\\text{circ}}$ verir — aynı noktadaki dairesel hızdan yaklaşık yüzde 41 fazla. Dünya yüzeyinden bu değer ≈ 11.2 km/s’dir.' },
      { t: 'table', headers: ['Konum', 'Dairesel hız', 'Kaçma hızı'], rows: [
        ['Dünya yüzeyi', '7.9 km/s', '11.2 km/s'],
        ['$r = 2R$ yörüngesi', '5.6 km/s', '7.9 km/s'],
        ['Ay yüzeyi', '1.7 km/s', '2.4 km/s'],
      ] },
      { t: 'p', text: '**Gelgitler**: Ay, Dünya’nın yakın yüzünü merkezden daha güçlü, merkezi de uzak yüzden daha güçlü çeker. Bu fark, okyanusları **iki şişkinliğe** uzatır — biri Ay’a bakar, biri karşı yüzde durur — ve Dünya onların altında döndükçe kıyıların çoğu günde iki kez yüksek gelgitten geçer.' },
      { t: 'key', text: 'Yerçekimi $F = Gm_1m_2/r^2$ ile çeker — ters kare yasa sahnede. Yörüngeler serbest düşmedir: daire için $v = \\sqrt{GM/r}$, kaçmak için $\\sqrt{2}$ kat hız gerekir. Astronotlar, uzay araçlarıyla *birlikte* düştükleri için süzülür — yerçekimi hiç kapatılmadı.' },
    ],
    example: {
      title: 'ISS rotasının hızı',
      problem: 'Bir istasyon, Dünya yüzeyinin $300\\ \\mathrm{km}$ üzerinde dolanıyor. Dünya: $GM = 3.986 \\times 10^{14}\\ \\mathrm{m^3/s^2}$, $R = 6.371 \\times 10^6\\ \\mathrm{m}$. Dairesel yörünge hızını bulun.',
      steps: [
        { text: '$r$’yi Dünya’nın merkezinden ölçün — yüksekliği daima yarıçapa ekleyin:' },
        { text: 'Dairesel yörünge hızı:' },
        { text: 'Daha kullanışlı birimlerde:' },
        { text: 'Bonus — bir tam turun süresi:' },
      ],
      answer: 'Yaklaşık $7.7\\ \\mathrm{km/s}$ — kabaca $28{,}000\\ \\mathrm{km/h}$. Asıl tuzak şu: $r$, gezegenin merkezinden uzaklıktır; yalnızca yükseklik yetmez. Alçak yörünge daha güçlü yerçekimi demektir; istasyon, $r = 2R$’deki $5.6\\ \\mathrm{km/s}$ hızlı uydudan daha hızlı uçmak zorundadır — ve gezegeni yaklaşık 90 dakikada turlar.',
    },
    questions: {
      'x6-p1': {
        prompt: 'Bir astronotun terazisi deniz seviyesinde 200 N gösteriyor. Dünya’nın merkezinden $2R$ uzakta olana dek bir kuleye tırmanıyor. Terazi şimdi kaç gösterir?',
        hints: [
          'Ağırlık, kütle çekim kuvvetidir: $F \\propto 1/r^2$.',
          '$r$’yi iki katına çıkarmak kuvveti 4’e böler.',
        ],
        explanation: '$F \\propto 1/r^2$: merkezden uzaklığı ikiye katlamak kuvveti $200/4 = 50\\ \\mathrm{N}$’a düşürür. Yerçekimi yükseklikle zayıflar ama hiçbir zaman kapanmaz.',
      },
      'x6-p2': {
        prompt: 'Astronotlar, yörüngedeki uzay istasyonunun içinde neden süzülür?',
        choices: [
          'O yükseklikte yerçekimi tam olarak sıfırdır',
          'Dünya’dan, yerçekiminin ulaşamayacağı kadar uzaktadırlar',
          'İstasyon ve içindeki her şey, Dünya çevresinde birlikte düşer — serbest düşme',
          'İstasyon, yerçekimini iptal edecek kadar hızlı döner',
        ],
        hints: [
          'İstasyondaki yerçekimi hâlâ neredeyse yüzeydeki kadar güçlü — “orada yerçekimi yok” demek tutmaz.',
          'Düşerken elinizdeki bir teraziyi bıraksanız, ayaklarınızın altında kaç gösterirdi?',
        ],
        explanation: 'İstasyonda $g \\approx 8.7\\ \\mathrm{m/s^2}$ — neredeyse tam güç! İstasyon ve mürettebatı aynı ivmeyle birlikte düşer; hiçbir şey hiçbir şeyi itmez: ağırlıksızlık budur.',
      },
      'x6-p3': {
        prompt: 'Dünya: $GM = 4.0 \\times 10^{14}\\ \\mathrm{m^3/s^2}$, $R = 6.4 \\times 10^6\\ \\mathrm{m}$. Yüzeyin hemen üstündeki dairesel yörünge hızını km/s cinsinden hesaplayın.',
        hints: [
          '$r = R$ ile $v = \\sqrt{GM/r}$ kullanın.',
          '$GM/R = 4.0 \\times 10^{14} \\div 6.4 \\times 10^6 = 6.25 \\times 10^7$ — karekökünü alın.',
        ],
        explanation: '$v = \\sqrt{6.25 \\times 10^7} \\approx 7906\\ \\mathrm{m/s} \\approx 7.9\\ \\mathrm{km/s}$ — klasik alçak yörünge hızı, kabaca 8 km/s’dir.',
      },
      'x6-p4': {
        prompt: 'İki asteroit birbirini 80 N ile çekiyor. Merkezleri arasındaki uzaklık iki katına çıkarsa, çekim artık…',
        choices: ['160 N', '40 N', '20 N', 'hâlâ 80 N — yerçekimi uzaklığı umursamaz'],
        hints: [
          'Ters kare: $F \\propto 1/r^2$.',
          '$r$ iki katına → $2^2 = 4$’e bölün.',
        ],
        explanation: '$F \' = F/(2)^2 = 80/4 = 20\\ \\mathrm{N}$. Uzaklığı ikiye katlamak çekimi dörde böler.',
      },
      'x6-q1': {
        prompt: 'Oyuncak bir evrende, 2 m arayla duran 1000 kg’lık iki küre birbirini 360 N ile çekiyor. Uzaklık 6 m’ye çıkıyor. Yeni kuvvet kaç olur?',
        hints: [
          '$F \\propto 1/r^2$: $r$’nin kaç katına çıktığını bulun.',
          '$r$ üç katına çıktı; $3^2 = 9$’a bölün: $360 \\div 9$.',
        ],
        explanation: 'Uzaklığı üçe katlamak kuvveti $3^2 = 9$’a böler: $F\' = 360/9 = 40\\ \\mathrm{N}$ — ters kare yasa iş başında.',
      },
      'x6-q2': {
        prompt: 'Deniz seviyesindeki değeriyle karşılaştırıldığında, Dünya’nın merkezinden $r = 3R$ uzaklıktaki yerçekimi ivmesi…',
        choices: ['3 kat büyük', 'aynı', 'yüzey değerinin 1/3’ü', 'yüzey değerinin 1/9’u'],
        hints: ['$g = GM/r^2$ — kareye dikkat.', '$r$’yi üçe katlamak $g$’yi 9’a böler.'],
        explanation: '$g \\propto 1/r^2$; $3R$’de $g = 9.8/9 \\approx 1.1\\ \\mathrm{m/s^2}$ — yüzey değerinin dokuzda biri.',
      },
      'x6-q3': {
        prompt: 'Dünya yüzeyine yakın dairesel yörünge hızı 7.9 km/s’dir. Yüzeyden kaçma hızı kaç km/s’dir?',
        hints: [
          'Kaçma hızı, aynı yarıçaptaki dairesel hızın $\\sqrt{2}$ katıdır.',
          '$7.9 \\times 1.414$',
        ],
        explanation: '$v_{\\text{esc}} = \\sqrt{2}\\, v_{\\text{circ}} = 1.414 \\times 7.9 \\approx 11.2\\ \\mathrm{km/s}$ — Dünya’nın meşhur kaçma hızı.',
      },
      'x6-q4': {
        prompt: 'Dünya’nın okyanusunda neden İKİ gelgit şişkinliği vardır — biri Ay’a bakar, biri uzak taraftadır?',
        choices: [
          'Ay, suyu iki yanda da iter',
          'Yakın yüz, Dünya’nın merkezinden daha güçlü çekilir; merkez de uzak yüzden — fark, okyanusu iki şişkinliğe uzatır',
          'Güneş, Ay’nın uzak tarafa çekimini iptal eder',
          'Dünya’nın manyetik alanı suyu iki loba dizer',
        ],
        hints: [
          'Ay’nın çekimi uzaklıkla zayıflar — yakın yüzü, merkezi ve uzak yüzü karşılaştırın.',
          'Önemli olan Dünya boyunca çekimdeki FARK, çekimin kendisi değil.',
        ],
        explanation: 'Yakın yüz: en güçlü çekim; merkez: orta; uzak yüz: en zayıf. Dünya’nın gövdesi, uzak yüzdeki sudan koparılıp Ay’ya doğru çekilir; karşı iki tarafta şişkinlikler geride kalır.',
      },
      'x6-q5': {
        prompt: 'Dünya: $GM = 4.0 \\times 10^{14}\\ \\mathrm{m^3/s^2}$, $R = 6.4 \\times 10^6\\ \\mathrm{m}$. Bir uydu $r = 4R$’de dolanıyor. Yörünge hızı kabaca…',
        hints: [
          '$r = 4R = 2.56 \\times 10^7\\ \\mathrm{m}$ ile $v = \\sqrt{GM/r}$.',
          'Paydadaki $\\sqrt{4}$, yüzey hızının yarısı demektir: $7.9 \\div 2$.',
        ],
        explanation: '$v = \\sqrt{GM/(4R)} = \\tfrac{1}{2}\\sqrt{GM/R} = 7906/2 \\approx 3953\\ \\mathrm{m/s} \\approx 4.0\\ \\mathrm{km/s}$ — yüksekliği ikiye katlamak dairesel hızı yarıya indirir.',
      },
    },
  },
}

export default ov
