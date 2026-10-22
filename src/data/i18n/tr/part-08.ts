// ─── Physics Quest · Turkish (tr) overlay · part-08: o3–o4, e1–e2 ────────────
import type { LessonOvFile } from '../schema'

const ov: LessonOvFile = {
  'o3-lenses': {
    title: 'Mercekler ve Görüntüler',
    tagline: 'Cismi optik tezgâh boyunca kaydır ve havada asılı duran, ters dönmüş bir görüntüyü yakala.',
    objectives: [
      'Üç ana ışını yakınsak bir merceğin içinden izle',
      'Mercek denklemi $\\dfrac{1}{d_o} + \\dfrac{1}{d_i} = \\dfrac{1}{f}$ ile görüntü konumunu hesapla',
      'Gerçek görüntüleri (perdeye yansıtılabilir, ters) sanal görüntülerden (dik, büyütülmüş) ayırt et',
    ],
    concept: [
      { t: 'p', text: 'Bir büyüteci pencereye doğru tut; pencerenin küçük ve parlak bir görüntüsünün yere düştüğünü gör. İş başında olan şey bir **mercektir**: içinden geçen ışık ışınlarını büken, biçimlendirilmiş saydam bir parça. **Yakınsak mercek**, kenarlarından daha kalın bir ortasıyla ışınları içe doğru büker ve onları bir noktada buluşturur.' },
      { t: 'p', text: 'Mercekler ışığı **kırılma** yoluyla büker — ışık cama girdiğinde yavaşlar ve bu hız değişimi ışını yeni bir yöne savurur. Merceğin eksenine paralel gelen ışınlar **odak noktası** $F$’te buluşur; mercekten o noktaya olan uzaklık ise **odak uzaklığı** $f$’tir. Simülatördeki tezgâhta $f = 2\\ \\mathrm{m}$ odak uzaklıklı bir mercek var.' },
      { t: 'h', text: 'Üç ana ışın' },
      { t: 'list', items: [
        '**Işın 1** cismin ucundan eksene paralel olarak çıkar, sonra karşı taraftaki $F$ odak noktasından geçecek biçimde kırılır.',
        '**Işın 2** merceğin tam merkezine doğru gider ve sapmadan, düz biçimde içinden geçer.',
        '**Işın 3** yakın odak noktası $F$ ile aynı hizada durur, sonra mercekten eksene paralel olarak çıkar.',
        'İçlerinden herhangi ikisini çiz — kesiştikleri nokta, cismin ucunun **görüntüsüdür**.',
      ] },
      { t: 'formula', caption: 'mercek denklemi — cisim uzaklığı $d_o$, görüntü uzaklığı $d_i$, odak uzaklığı $f$, tümü metre cinsinden. Büyütme: $m = -\\dfrac{d_i}{d_o}$' },
      { t: 'key', text: '**Gerçek görüntü**, ışık ışınlarının gerçekten kesiştiği yerde oluşur: ters yönlüdür ve bir perdede yakalanabilir. **Sanal görüntü** ise ışınların yalnızca *geliyormuş gibi* göründüğü yerde oluşur: dikdir ve perdeye yansıtılamaz.' },
      { t: 'h', text: 'Cismin nerede durduğu her şeyi belirler' },
      { t: 'table', headers: ['Cismin konumu', 'Elde ettiğin görüntü', 'Günlük kullanım'], rows: [
        ['$2f$’in ötesinde', 'Gerçek, ters, küçük', 'Fotoğraf makinesi'],
        ['$2f$’te', 'Gerçek, ters, aynı boyutta', 'Fotokopi makinesi'],
        ['$f$ ile $2f$ arasında', 'Gerçek, ters, büyük', 'Projektör'],
        ['$f$’te', 'Işınlar paralel çıkar — görüntü “sonsuzda”', 'Arama farı'],
        ['$f$’in içinde', 'Sanal, dik, büyütülmüş', 'Büyüteç'],
      ] },
      { t: 'p', text: 'Son satır işte **büyüteçtir**: cisim bir odak uzaklığından daha yakında olduğunda, kırılan ışınlar buluşmak yerine birbirinden uzaklaşır. Gözün onları geriye doğru izler ve daha büyük, dik bir sanal görüntüye ulaşır — simülatördeki kesikli çizgiler.' },
    ],
    example: {
      title: 'Aynı boyutta ama ters',
      problem: 'Cismi, odak uzaklığı $f = 2$ m olan yakınsak bir mercekten 4 m uzakta duruyor. Görüntü nerede oluşur ve ne kadar büyüktür?',
      steps: [
        { text: 'Bil diklerini yaz:' },
        { text: 'Mercek denklemini görüntü uzaklığı için düzenle:' },
        { text: 'Görüntü mercekten, karşı tarafta 4 m uzaklıkta duruyor. Şimdi büyütmeye geç:' },
      ],
      answer: 'Görüntü mercekten $4\\ \\mathrm{m}$ uzaktadır: gerçek, ters ve tam olarak aynı boyutta ($m = -1$). $2f$’teki bir cisim, her zaman karşı tarafta $2f$’e görüntülenir.',
    },
    questions: {
      'o3-p1': {
        prompt: 'Aynı mercek ($f = 2$ m) şimdi yalnızca 3 m uzaktaki bir cisme bakıyor. Görüntü mercekten kaç uzaklıkta oluşur?',
        hints: [
          'Mercek denklemini düzenlenmiş hâliyle kullan: $1/d_i = 1/f - 1/d_o$.',
          '$1/2 - 1/3 = 1/6$ işlemini yap, sonra kesri ters çevir.',
        ],
        explanation: '$1/d_i = 1/2 - 1/3 = 1/6$, dolayısıyla $d_i = 6\\ \\mathrm{m}$. Daha yakın cisim, görüntüsünü daha uzağa fırlatır.',
      },
      'o3-p2': {
        prompt: 'Cismi odak uzaklığının içine ($d_o < f$) kaydırıyorsun. Mercek sana ne gösterir?',
        choices: ['Gerçek, ters, küçük bir görüntü', 'Sanal, dik, büyütülmüş bir görüntü', 'Hiçbir görüntü', 'Perdede ters bir görüntü'],
        hints: [
          'Bir büyüteç düşün — harf hangi yönde görünür?',
          'Kırılan ışınlar birbirinden uzaklaşır; gözün onları geriye doğru uzatır ve kesikli bir görüntüye varır.',
        ],
        explanation: '$d_o < f$ olduğunda kırılan ışınlar ayrılır; bu yüzden görüntü, ışınların *buluşuyormuş gibi* göründüğü yerde oluşur: sanal, dik, büyütülmüş bir görüntü — büyüteç tam olarak böyle çalışır.',
      },
      'o3-q1': {
        prompt: 'Hangi tür görüntü bir perdeye yansıtılabilir?',
        choices: ['Sanal görüntü', 'Gerçek görüntü', 'Her iki tür', 'Hiçbiri'],
        hints: [
          'Hangi görüntü, gerçekten buluşan ışınlarla oluşur?',
          '“Gerçek” ışınlar perdeye düşer; “sanal” ışınlar yalnızca düşüyormuş gibi görünür.',
        ],
        explanation: 'Gerçek görüntü, ışık ışınlarının gerçekten kesiştiği yerde oluşur; bu yüzden gerçek ışık orada perdeye düşer. Sanal görüntüler yalnızca ışınların geliyormuş gibi göründüğü yerde var olur; bu yüzden perdeye hiçbir şey düşmez.',
      },
      'o3-q2': {
        prompt: 'Cismi, $f = 2$ m olan bir mercekten 6 m uzakta duruyor. Görüntü uzaklığı $d_i$’yi bul.',
        hints: ['$1/d_i = 1/f - 1/d_o$ formülünü kullan — $1/2 - 1/6$ ile başla.', '$1/2 - 1/6 = 1/3$; kesri ters çevir.'],
        explanation: '$1/d_i = 1/2 - 1/6 = 1/3$, dolayısıyla $d_i = 3\\ \\mathrm{m}$. Büyütme $m = -3/6 = -0.5$: yarı boyutta, ters duran gerçek bir görüntü.',
      },
      'o3-q3': {
        prompt: 'Cisim tam odak noktasına ($d_o = f$) oturduğunda ne olur?',
        choices: ['Görüntü merceğin hemen yanında oluşur', 'Görüntü çok büyük ve sanaldır', 'Kırılan ışınlar paralel çıkar — görüntü oluşmaz (“sonsuzda”dır)', 'Görüntü iki kat daha uzakta oluşur'],
        hints: ['$d_o = f$ değerini $1/d_i = 1/f - 1/d_o$ içine koy.', '$1/f - 1/f = 0$ — ışınlar hiçbir zaman buluşmaz.'],
        explanation: '$d_o = f$ olduğunda mercek denklemi $1/d_i = 0$ verir: kırılan ışınlar paralel çıkar ve hiçbir zaman kesişmez; bu yüzden görüntünün “sonsuzda” olduğu söylenir. Arama farları tam da bu numarayı kullanarak paralel bir huzme gönderir.',
      },
      'o3-q4': {
        prompt: 'Bir mercek, cisim $d_o = 2$ m konumundayken $d_i = 4$ m uzaklıkta bir görüntü oluşturuyor. Büyütme $m$ kaçtır? (Negatif değer, görüntünün ters olduğunu gösterir.)',
        hints: ['$m = -d_i/d_o$ formülünü kullan.', '$m = -4/2$.'],
        explanation: '$m = -d_i/d_o = -4/2 = -2$. Eksi işareti görüntünün ters olduğunu, 2 büyüklüğü ise cismin iki katı uzunlukta olduğunu gösterir.',
      },
    },
  },

  'o4-color': {
    title: 'Renk: Işıkları Karıştırma ve Filtreler',
    tagline: 'Üç spot ışığı, tek bir duvar — renkleri karıştır, sonra filtrelerle onları çal.',
    objectives: [
      'Işığın temel renklerini adlandır: kırmızı, yeşil, mavi',
      '$R + G$ gibi toplamsal karışımların ne vereceğini tahmin et',
      'Renkli bir filtrenin bazı renkleri nasıl soğurup gerisini geçirdiğini açıkla',
    ],
    concept: [
      { t: 'p', text: 'Güneş ışığı beyaz görünür ama gerçekte **tüm renklerin karışımıdır**. Onu cam bir **prizmadan** geçir; her renk biraz farklı miktarda kırıldığı için renkler gökkuşağına açılır. Beyaz ışık bir karışımdır — ve karışımlar ayrıştırılabilir.' },
      { t: 'h', text: 'Işığın temel renkleri' },
      { t: 'p', text: 'Gözün, kabaca **kırmızı, yeşil ve mavi**ye ayarlı üç tür renk algılayıcısı taşır. Bu yüzden bu üçüne **ışığın temel renkleri** denir: onları farklı oranlarda karıştırmak, gözünü neredeyse her rengi görmesi için kandırabilir. Çevrendeki her ekran, görüntüsünü minik kırmızı, yeşil ve mavi piksellerden kurar.' },
      { t: 'key', text: 'Işıkları karıştırmak **toplamsaldır**: eklediğin her ışık, lekeyi daha parlak yapar. Kırmızı + yeşil = sarı, yeşil + mavi = camgöbeği, kırmızı + mavi = macenta; üçü birden = beyaz.' },
      { t: 'list', items: [
        'Kırmızı + yeşil = **sarı**',
        'Yeşil + mavi = **camgöbeği**',
        'Kırmızı + mavi = **macenta**',
        'Kırmızı + yeşil + mavi = **beyaz**',
        'Hiç ışık olmaması = **siyah**',
      ] },
      { t: 'h', text: 'Filtreler: çıkarıcı numara' },
      { t: 'p', text: 'Bir **filtre** — renkli cam ya da plastik — spot ışığının tersini yapar: bazı renkleri **soğurur**, gerisini geçirir. Camgöbeği filtre yeşil ve mavi ışığı geçirir, kırmızıyı yutar. Boyalar ve kumaşlar da öyle davranır: kırmızı bir gömlek, kırmızı ışığı **yansıtır** ve üzerine düşen öteki her rengi soğurur.' },
      { t: 'key', text: 'Filtreler, beyaz ışıktan renkleri **çıkarır**. Filtrenin soğurmadığı şey, gözüne ulaşandır — beyaz ışığı bir camgöbeği filtreden geçir; yoldan yalnızca yeşil + mavi sağ çıkar.' },
    ],
    example: {
      title: 'İki spot, tek duvar',
      problem: 'Sahne duvarı; tam güçteki (255) bir kırmızı spot ve tam güçteki (255) bir yeşil spotla aydınlatılıyor, mavi spot ise kapalı. Duvar hangi renkte parlar?',
      steps: [
        { text: 'Üç kanalı yaz:' },
        { text: 'İki ışık da aynı duvara düşer; bu yüzden kanalları toplanır:' },
        { text: 'Kırmızı ile yeşil ışık toplamsal olarak karışınca sarı olur — mavi yoktur, o yüzden beyaz değildir:' },
      ],
      answer: 'Duvar sarı parlar: hex #FFFF00. Kırmızı ve yeşil algılayıcıların ikisi de güçlü biçimde yanar ve beynin bu birleşime “sarı” der.',
    },
    questions: {
      'o4-p1': {
        prompt: 'Yeşil ışığı, kırmızı ışığın tuttuğu duvardaki aynı noktaya tutuyorsun. Hangi renk ortaya çıkar?',
        choices: ['Turuncu', 'Sarı', 'Beyaz', 'Mor'],
        hints: [
          'Kanallarla düşün: R, G ve B’den hangileri yanıyor?',
          'Kırmızı + yeşil, ünlü toplamsal çiftlerden biridir.',
        ],
        explanation: 'R ve G kanallarının ikisi de yandığında gözün sarıyı bildirir: $R + G = \\text{yellow}$. Maviyi de eklersen bunun yerine beyaz alırsın.',
      },
      'o4-p2': {
        prompt: 'Beyaz ışık, camgöbeği bir filtreden geçiyor. Üç RGB kanalından kaçı öbür taraftaki duvara ulaşır?',
        hints: [
          'Camgöbeği, yeşil + mavi karışımıdır.',
          'Yol boyunca tam olarak bir kanal soğurulur.',
        ],
        explanation: 'Camgöbeği filtre yeşili ve maviyi geçirir, kırmızıyı soğurur; bu yüzden $3$ kanaldan $2$’si sağ çıkar — duvar camgöbeği parlar.',
      },
      'o4-q1': {
        prompt: 'Işığın temel renkleri…',
        choices: ['kırmızı, sarı, mavi', 'kırmızı, yeşil, mavi', 'camgöbeği, macenta, sarı', 'yeşil, turuncu, eflatun'],
        hints: ['Bir ekran, piksellerinde hangi üç rengi kullanır?', 'Onlar, gözündeki üç tür algılayıcıyla eşleşir.'],
        explanation: 'Gözün kırmızı, yeşil ve maviye ayarlı üç renk algılayıcısına sahiptir — bu yüzden $R$, $G$ ve $B$ ışığın temel renkleridir ve ekranlar her rengi onlardan kurar.',
      },
      'o4-q2': {
        prompt: 'Saf kırmızı bir gömlek, saf yeşil ışıkla aydınlatılıyor. Gömlek nasıl görünür?',
        choices: ['Yeşil', 'Sarı', 'Siyah', 'Kırmızı'],
        hints: ['Kırmızı gömlek, yalnızca kırmızı ışığı yansıtır.', 'Yeşil ışık hiç kırmızı taşımaz — yansıtacak ne kalır?'],
        explanation: 'Gömlek yeşil ışığı soğurur; ışıkta yansıtacak kırmızı bir bileşen yoktur. Gözüne neredeyse hiç ışık ulaşmaz, bu yüzden gömlek siyah görünür.',
      },
      'o4-q3': {
        prompt: 'Beyaz ışık, camgöbeği bir filtreden geçiyor. Filtre hangi rengi soğurur?',
        choices: ['Yeşil', 'Mavi', 'Kırmızı', 'Hiçbiri — her şeyi geçirir'],
        hints: ['Camgöbeği = yeşil + mavi.', 'Eksik kalan kanal, soğurulandır.'],
        explanation: 'Camgöbeği ışık, yeşil + mavidir; bu yüzden camgöbeği filtre o iki kanalı geçirir, üçüncüyü soğurur: $\\text{white} - \\text{red} = \\text{cyan}$.',
      },
      'o4-q4': {
        prompt: 'Siyah hakkında hangi cümle doğrudur?',
        choices: ['Siyah, bir duvara tutabileceğin bir ışık rengidir', 'Siyah ışık, sönük beyaz ışıktan ibarettir', 'Siyah, gözüne hiç ışık ulaşmadığında gördüğün şeydir', 'Siyah, tüm ışık renklerinin karışımıdır'],
        hints: ['Odaya daha çok ışık tutarak onu daha siyah yapabilir misin?', 'Tüm ışık renklerini karıştırmak beyaz verir — siyahın tam tersi.'],
        explanation: 'Siyah hiçbir ışık değildir — gözüne ulaşan ışığın **yokluğudur**. Tüm renkleri karıştırmak beyaz verir; filtreler ve soğuran yüzeyler, renkleri siyaha doğru eksiltir.',
      },
    },
  },

  'e1-static-fields': {
    title: 'Statik Elektrik ve Alanlar',
    tagline: 'Yükler yerleştir, görünmez alan oklarını bük ve bir deneme yüküne binip bayrağa doğru sörf yap.',
    objectives: [
      'Ovmanın elektronları nasıl aktardığını ve statik yük oluşturduğunu açıkla',
      'Elektrik alanı tanımla ve oklarını oku',
      'Çekme ile itmeyi, nötr cisimlerdeki endüksiyonu da kapsayarak tahmin et',
    ],
    concept: [
      { t: 'p', text: 'Bir balonu saçında gezdir; duvara yapışır, musluktan akan ince su şeridini büker, hatta kolundaki ince tüyleri dikleştirir. Bu **statik elektriktir**: bir cisimden başkasına atlayan minicik **elektron**lar (negatif yükler). İki malzemeyi birbirine ovmak, elektronları aktarabilir — elektronu **kazanan** malzeme **negatif**, onları **kaybeden** malzeme ise **pozitif** olur.' },
      { t: 'key', text: 'İki tür elektrik yükü vardır: $+$ ve $-$. **Aynı tür yükler birbirini iter; zıt tür yükler birbirini çeker.**' },
      { t: 'h', text: 'Elektrik alan' },
      { t: 'p', text: 'Bir yük, çevresindeki uzayı değiştirir: oraya giren herhangi bir başka yük bir kuvvet hisseder. Bu etki bölgesine **elektrik alan** denir ve biz onu oklarla çizeriz. Her ok, küçük bir **pozitif deneme yükü** oraya konursa hangi yöne itileceğini gösterir.' },
      { t: 'list', items: [
        'Alan okları, pozitif yüklerden **uzağa** ve negatif yüklere **doğru** işaret eder.',
        'Okların birbirine yığıldığı yerlerde alan daha **güçlüdür**.',
        'Yükler basitçe toplanır: net kuvvet, her itme ve çekmenin vektör toplamıdır (süperpozisyon).',
      ] },
      { t: 'p', text: 'Nötr cisimler de bu çekimi hisseder. Yüklü bir tarağı kâğıdın yakına getir; tarak kâğıtta yük **indükler**: her kâğıt parçasının elektronları hafifçe kayar ve yakın taraf zıt yükü taşır. Yakın taraf daha yakındır; bu yüzden çekme, itmeyi yener — kâğıt zıplar. Yükleri yeniden dizme hilesine **endüksiyon (etki ile elektriklenme)** denir.' },
      { t: 'h', text: 'Kıvılcımlar ve yıldırım' },
      { t: 'list', items: [
        'Bir yüzeyde yük, onunla başka bir şey arasındaki hava yalıtmayı sürdüremeyene kadar birikebilir.',
        'Sonra yük, ani bir **statik boşalma** ile karşıya atlar — duyduğun çıtırtı ve gördüğün kıvılcım.',
        '**Yıldırım**, aynı olayın büyütülmüş hâlidir: bulut ile yer arasında, Güneş’in yüzeyinden daha sıcak, devasa bir boşalma.',
      ] },
    ],
    example: {
      title: 'Balon neden yapışır',
      problem: 'Bir balonu saçında ovyor, sonra nötr bir duvara bastırıyorsun. Neden yerinde kaldığını açıkla.',
      steps: [
        { text: 'Ovma, elektronları saçtan balona aktarır:' },
        { text: 'Negatif balon, duvarın elektronlarını iter; böylece balona yakın duvar yüzeyi pozitifleşir (endüksiyon):' },
        { text: 'Zıt yükler birbirini çeker ve yükler yaklaştıkça elektrik kuvvetleri güçlenir:' },
      ],
      answer: 'Balon, duvarda zıt bir yük uyandırdığı için yapışır. Yakındaki pozitif tabakaya olan çekim, daha uzaktaki negatif tabakanın itmesinden güçlüdür; net kuvvet balonu yerinde tutar.',
    },
    questions: {
      'e1-p1': {
        prompt: 'Yüklü bir tarak, nötr kâğıt parçalarını çeker. Neden?',
        choices: [
          'Kâğıt baştan beri gizlice pozitif yüklüydü',
          'Tarak havayı ısıtır ve kâğıt yükselir',
          'Tarağın yükü kâğıttaki yükleri yeniden dizer — yakın taraf zıt yükle olur, bu yüzden çekim kazanır',
          'Yer çekimi kâğıdı yukarı çeker',
        ],
        hints: [
          'Kâğıt, net yükü sıfır olarak başlar.',
          'Yakındaki bir yük, kâğıdın elektronlarını hafifçe kaydırır — bu endüksiyondur.',
        ],
        explanation: 'Tarağın alanı kâğıdın içindeki elektronları kaydırır: yakın taraf zıt yükü kazanır ve daha yakın olduğu için, uzak tarafın itmesinden daha güçlü bir çekim hisseder — net sonuç çekimdir.',
      },
      'e1-p2': {
        prompt: 'İkisi de saçta ovulmuş iki balon, yan yana asıldıklarında birbirinden uzaklaşır. Neden?',
        choices: [
          'Aynı tür yük taşırlar ve aynı tür yükler birbirini iter',
          'Zıt tür yükler taşırlar ve bunlar birbirini iter',
          'Rüzgâr onları birbirinden iter',
          'Yükleri birbirini yok eder',
        ],
        hints: [
          'Her iki balon da aynı malzemeye ovuldu — sonda aynı işaretli yüke sahip olurlar mı?',
          'Elektronlar saçtan her iki balona geçti.',
        ],
        explanation: 'Her balon saçtan elektron kazanır; böylece ikisi de negatif olur. Aynı tür yükler birbirini iter, bu yüzden balonlar birbirini iter.',
      },
      'e1-q1': {
        prompt: 'Hangi parçacıklar negatif elektrik yükü taşır?',
        choices: ['Protonlar', 'Nötronlar', 'Elektronlar', 'Fotonlar'],
        hints: ['Çekirdek etrafında dönerler ve bir yüzeyden ovulup alınabilirler.', 'Protonlar pozitiftir; nötronların hiç yükü yoktur.'],
        explanation: 'Negatif yükü elektronlar taşır. Ovma, cisimler arasında elektron aktarır; statik elektrik de böyle başlar.',
      },
      'e1-q2': {
        prompt: 'Pozitif yüklü bir çubuk, negatif yüklü asılı bir topun yanına getiriliyor. Ne olur?',
        choices: ['Hiçbir şey', 'Birbirlerini çekerler', 'Birbirlerini iterler', 'Top pozitifleşir'],
        hints: ['İki işareti kontrol et: $+$ ve $-$.', 'Zıt tür yükler…'],
        explanation: 'Zıt tür yükler birbirini çeker: $+$ çubuk ile $-$ top birbirine doğru çekilir, bu yüzden top çubuğa doğru sallanır.',
      },
      'e1-q3': {
        prompt: 'Yıldırım en iyi şöyle tanımlanır…',
        choices: ['Bulutlardan ateşlenen bir lazer', 'Devasa bir statik boşalma', 'Havada yanan bir gaz', 'Yansıyan güneş ışığı'],
        hints: ['Parlama öncesinde fırtına bulutunda ne birikir?', 'O bir kıvılcımdır — yalnızca kocaman bir kıvılcım.'],
        explanation: 'Fırtına bulutlarının içinde yükler birbirinden ayrılır; hava dayanamayınca devasa bir statik boşalma — yıldırım — bulutla yer arasında koşar.',
      },
      'e1-q4': {
        prompt: 'Pozitif bir yükün çevresindeki elektrik alanın okları … işaret eder',
        choices: ['Yüke doğru', 'Yükten uzağa', 'Etrafında daireler çizerek', 'Hiçbir yere — pozitif yükün alanı yoktur'],
        hints: ['Oklar, pozitif bir deneme yükünün nereye itileceğini gösterir.', 'İki pozitif yük birbirini iter.'],
        explanation: 'Tanım gereği alan okları, pozitif deneme yüke etki eden kuvveti gösterir; bu yüzden pozitif yüklerden uzağa, negatif yüklere doğru işaret ederler.',
      },
    },
  },

  'e2-ohms-law': {
    title: 'Akım, Gerilim ve Direnç',
    tagline: 'Düğmeleri çevir, lambayı yak ve $V = IR$’yi işe koy.',
    objectives: [
      'Elektrik akımını, gerilimi ve direnci SI birimleriyle tanımla',
      'Devre problemlerini çözmek için Ohm yasasını ($V = IR$) kullan',
      '$V$ ya da $R$’yi değiştirmenin akımı nasıl değiştirdiğini tahmin et',
    ],
    concept: [
      { t: 'p', text: 'Bir **devre**, yüklerin içinde dolaşmasını sağlayan eksiksiz bir çevrimdir. Metal telde hareket edenler, sabit atomların arasından süzülen **elektron**lardır. Çevrimde olan biten üç büyüklükle tanımlanır: akım, gerilim ve direnç.' },
      { t: 'h', text: 'Akım — saniyede ne kadar yük' },
      { t: 'p', text: '**Elektrik akımı** $I$, telin bir noktasından her saniye ne kadar yük geçtiğini ölçer. SI birimi **amperdir** ($\\mathrm{A}$); saniyede bir kulomba eşittir. Onu ölçmek için ampermetre **seri bağlanmalıdır** — akım, ölçü aletinin içinden geçmek zorundadır.' },
      { t: 'formula', caption: 'akım $I$ amper (A), yük $Q$ kulomb (C), zaman $t$ saniye (s) cinsinden' },
      { t: 'p', text: '**Gerilim** $V$ elektriksel itişhtir: her bir kulomb yüke ne kadar enerji verildiği (ya da yükün çevrim boyunca teslim ettiği enerji). Birimi **volttur** ($\\mathrm{V}$). Pil bir gerilim kaynağıdır; voltmetre ise bir elemanın **iki ucuna** — paralel olacak biçimde — bağlanır ve iki tarafın enerjisini karşılaştırır.' },
      { t: 'p', text: '**Direnç** $R$, yükü bir elemanın içinden itmenin ne kadar zor olduğunu söyler. Birimi **ohmdur** ($\\Omega$). Uzun ve ince bir tel, kısa ve kalın telden çok daha fazla direnç gösterir.' },
      { t: 'formula', caption: 'Ohm yasası — $V$ volt, $I$ amper, $R$ ohm ($\\Omega$) cinsinden. $I = V/R$ veya $R = V/I$ biçiminde düzenlenebilir.' },
      { t: 'table', headers: ['Büyüklük', 'Sembol', 'SI birimi', 'Ölçen alet'], rows: [
        ['Akım', '$I$', 'amper ($\\mathrm{A}$)', 'seri bağlı ampermetre'],
        ['Gerilim', '$V$', 'volt ($\\mathrm{V}$)', 'paralel bağlı voltmetre'],
        ['Direnç', '$R$', 'ohm ($\\Omega$)', '$V/I$’den hesaplanır'],
      ] },
      { t: 'key', text: 'Ohm yasası: gerilim iki katına çıkarsa akım da iki katına çıkar; direnç iki katına çıkarsa akım yarıya iner. Her şey $I = V/R$’ye bağlıdır.' },
    ],
    example: {
      title: 'Far akımı',
      problem: '12 V’luk bir pil, direnci 4 Ω olan bir fardan akım geçiriyor. Akım ne kadardır?',
      steps: [
        { text: 'Bil diklerini yaz:' },
        { text: 'Ohm yasasını akım için düzenle:' },
        { text: 'Böl:' },
      ],
      answer: 'Akım $3\\ \\mathrm{A}$ — her saniye 3 kulomb yük, lambanın filamanından akıp geçer.',
    },
    questions: {
      'e2-p1': {
        prompt: '9 V’luk bir pil, 3 Ω’luk bir direncin içinden akım geçiriyor. Akımı bul.',
        hints: [
          'Ohm yasasını düzenle: $I = V/R$.',
          '$9 \\div 3$',
        ],
        explanation: '$I = V/R = 9\\ \\mathrm{V} / 3\\ \\Omega = 3\\ \\mathrm{A}$.',
      },
      'e2-p2': {
        prompt: 'Bir direnci, iki kat dirençli bir dirençle değiştiriyorsun; pil aynı kalıyor. Akıma ne olur?',
        choices: ['İki katına çıkar', 'Aynı kalır', 'Yarıya iner', 'Sıfıra düşer'],
        hints: [
          '$V$ sabitken $I = V/R$’ye bak.',
          'Bir kesrin paydasını iki katına çıkarmak…',
        ],
        explanation: '$I = V/R$ ve $V$ değişmezken, $R$’yi iki katına çıkarmak $I$’yi yarıya indirir. Direnç akıma karşı koyar.',
      },
      'e2-q1': {
        prompt: 'Bir motor 0.5 A çekiyor; devresinde 10 Ω direnç var. Onu süren gerilim kaçtır?',
        hints: ['$V = I R$ formülünü kullan.', '$0.5 \\times 10$'],
        explanation: '$V = IR = 0.5\\ \\mathrm{A} \\times 10\\ \\Omega = 5\\ \\mathrm{V}$.',
      },
      'e2-q2': {
        prompt: '6 V’luk bir pil, bir lambadan 2 A akım geçiriyor. Lambanın direnci kaçtır?',
        hints: ['$V = IR$’yi $R$ için düzenle.', '$R = V/I = 6/2$.'],
        explanation: '$R = V/I = 6\\ \\mathrm{V} / 2\\ \\mathrm{A} = 3\\ \\Omega$.',
      },
      'e2-q3': {
        prompt: 'Bir lambadan geçen akımı nasıl ölçersin?',
        choices: [
          'İki ucuna bağlı bir voltmetreyle',
          'Seri bağlı bir ampermetreyle',
          'Yakınına tutulan bir ohmmetreyle',
          'Lambayı bir kronometreyle zamana tutarak',
        ],
        hints: ['Ölçü aleti, aynı akımın kendi içinden akmasına izin vermelidir.', '“Elemanın iki ucuna bağlanmak” voltmetrenin işidir.'],
        explanation: 'Ampermetre seri bağlanır; böylece lambanın akımı doğrudan onun içinden geçer. Buna karşılık voltmetre, gerilimi okumak için bir elemanın iki ucuna paralel bağlanır.',
      },
      'e2-q4': {
        prompt: 'Metal bir telin içinde gerçekten hareket eden yükler…',
        choices: ['Protonlar', 'Elektronlar', 'Nötronlar', 'Bütün atomlar'],
        hints: ['Hangi parçacıklar bir metalde serbestçe gezinebilir?', 'Sabit çekirdekler yerinde durur; dıştaki parçacıklar süzülür.'],
        explanation: 'Metaller, dış elektronlarının süzülmesine izin verir; böylece telde hareketli yük taşıyıcıları elektronlardır, pozitif çekirdekler ise yerlerinde sabit kalır.',
      },
      'e2-q5': {
        prompt: '3 A’lık sabit bir akım 10 s boyunca akıyor. Ne kadar yük geçer?',
        hints: ['$I = Q/t$’yi yük için düzenle.', '$Q = I \\times t = 3 \\times 10$.'],
        explanation: '$Q = I\\,t = 3\\ \\mathrm{A} \\times 10\\ \\mathrm{s} = 30\\ \\mathrm{C}$.',
      },
    },
  },
}

export default ov
