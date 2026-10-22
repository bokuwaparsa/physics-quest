// ─── Physics Quest · Turkish (tr) overlay · part-11: x1, x2, x3 ──────────────
import type { LessonOvFile } from '../schema'

const ov: LessonOvFile = {
  'x1-measurement': {
    title: 'Ölçme ve Birimler',
    tagline: 'Cetveli okuyun, önekleri ehlileştirin ve savunabileceğiniz sayılar rapor edin.',
    objectives: [
      'Ölçmelerin neden üzerinde anlaşılmış standart birimlere gereksinim duyduğunu açıklayın ve uzunluk, kütle ile zaman için SI temel birimlerini sayın',
      'km, m, cm ve mm gibi önekli birimler arasında dönüşüm çarpanlarıyla geçiş yapın',
      'Yanıtları makul anlamlı basamaklarla bildirin ve hızlı büyüklük mertebesi tahminleri yapın',
    ],
    concept: [
      { t: 'p', text: 'Fizik doğayı **sayılarla** açıklar ve sayılar birime gereksinim duyar. “İp uzun” demek bir görüştür; “ip 1.85 m” demek fiziğe girer. Her ölçüm iki soruyu yanıtlar: **ne kadar?** ve **hangi birimle?**' },
      { t: 'h', text: 'Standart birimler neden önemli' },
      { t: 'p', text: 'Bir kumaşın satıcının **zirâ**sıyla — dirsekten parmak ucuna uzaklıkla — ölçüldüğünü düşünün. Uzun boylu bir satıcı aynı paraya daha az kumaş verirdi. **Standart birim**, herkesin üzerinde anlaştığı birimdir. Modern uzlaşı **SI**’dır (Fransızca “Système International”ın kısaltması) ve Dünya’daki her laboratuvarda kullanılır: metre, Tahran’da, Tokyo’da ve Toronto’da tam olarak aynı uzunluktur.' },
      { t: 'table', headers: ['Büyüklük', 'SI birimi', 'Sembol'], rows: [
        ['Uzunluk', 'metre', 'm'],
        ['Kütle', 'kilogram', 'kg'],
        ['Zaman', 'saniye', 's'],
        ['Hız (türetilmiş)', 'metre bölü saniye', 'm/s'],
        ['Kuvvet (türetilmiş)', 'newton', 'N'],
      ] },
      { t: 'h', text: 'Önekler: miliden megaya' },
      { t: 'table', headers: ['Önek', 'Sembol', 'Anlamı'], rows: [
        ['mili', 'm', 'birimin 1/1000’i'],
        ['santi', 'c', 'birimin 1/100’ü'],
        ['kilo', 'k', 'birimin 1000 katı'],
        ['mega', 'M', 'birimin 1,000,000 katı'],
      ] },
      { t: 'formula', caption: 'ezberlenmeye değer dönüşümler — her önek adımı 10, 100 ya da 1000 ile çarpar ya da böler' },
      { t: 'p', text: '**Dönüşüm, 1 ile çarpmaktır.** $1\\ \\mathrm{km} = 1000\\ \\mathrm{m}$ olduğundan, $\\dfrac{1000\\ \\mathrm{m}}{1\\ \\mathrm{km}}$ kesri 1 yazmanın şık bir yoludur — hiçbir uzunluğun anlamını değiştirmeden onunla çarpabilirsiniz: $2.5\\ \\mathrm{km} = 2.5 \\times 1000\\ \\mathrm{m} = 2500\\ \\mathrm{m}$. Ters yönde bölersiniz: $250\\ \\mathrm{mm} = 250 \\div 1000 = 0.25\\ \\mathrm{m}$.' },
      { t: 'list', items: [
        'kilometre → metre: **× 1000**. Metre → kilometre: **÷ 1000**.',
        'metre → milimetre: **× 1000**. Milimetre → metre: **÷ 1000**.',
        'Büyükten küçüğe dönüşüm **çarpmadır** (küçük birimden daha fazlası içine sığar); küçükten büyüğe dönüşüm **bölmektir**.',
        'Sağlama: birim küçüldükçe sayı büyümeli. km’yi m’ye çevirirken sayı küçülüyorsa yanlışlıkla bölmüşsünüz demektir.',
        'Büyük/küçük harfe dikkat edin: $\\mathrm{mm}$ milimetre demektir ama $\\mathrm{Mm}$ megametre — küçük harfli önek binde, büyük harfli önek milyondur.',
      ] },
      { t: 'h', text: 'Anlamlı basamaklar: ne kadar hassas bildirmeli' },
      { t: 'p', text: 'Hesap makinesi seve seve $14 \\div 3 = 4.6666\\ldots$ der, ama cetveliniz o kadar ince okuyamaz bile. **Anlamlı basamaklar** gerçek bilgi taşıyan rakamlardır. Pratik kurallar: sıfırdan farklı her rakam sayılır; sıfır olmayan rakamların **arasındaki** sıfırlar sayılır; baştaki sıfırlar ($0.0045$ içindeki 0.00) sayılmaz; ondalık noktadan sonra gelen sondaki sıfırlar sayılır.' },
      { t: 'list', items: [
        '$12$ 2 anlamlı basamaklıdır; $0.012$ de 2 — baştaki sıfırlar asla sayılmaz.',
        '$1.50$ 3 anlamlı basamaklıdır; $150$ belirsizdir, bu yüzden bilim insanları 2 basamağı kastediyorlarsa $1.5 \\times 10^{2}$ yazar.',
        'Yanıtınızı en az hassas girişe göre ayarlayın: $14\\ \\mathrm{m} \\div 3\\ \\mathrm{s} \\approx 4.7\\ \\mathrm{m/s}$ (2 anlamlı basamak), $4.6666\\ \\mathrm{m/s}$ değil.',
      ] },
      { t: 'h', text: 'Büyüklük mertebeleri ve tahmin' },
      { t: 'p', text: 'Fizikçiler çoğu zaman yalnızca en yakın **on kuvvetini** ister — bir **büyüklük mertebesi**. Kedi birkaç kilogramdır ($10^{0}\\ \\mathrm{kg}$ ile $10^{1}$ arası), araba yaklaşık $10^{3}\\ \\mathrm{kg}$, sivrisinek kaba bir miligramdır ($10^{-6}\\ \\mathrm{kg}$). Zor soruları kolay parçalara bölün ve parçaları çarpın — Enrico Fermi, bir şehirdeki piyano akortçu sayısı gibi kimsenin bakıp bulamayacağı şeyleri böyle tahmin etti.' },
      { t: 'key', text: 'Fizik **SI birimleriyle** (m, kg, s) ölçer. Miliden megaya önekler birimleri on kuvvetleriyle ölçekler, dönüşüm 1’e eşit bir çarpanla çarpmaktır ve anlamlı basamaklar yanıtlarınızı araçlarınız kadar dürüst tutar.' },
    ],
    example: {
      title: 'Metreden milimetreye',
      problem: 'Bir tırmanma ipi 1.85 m uzunluğunda. Uzunluğunu santimetre ve milimetre cinsinden, anlamlı basamaklara sadık kalarak yazın.',
      steps: [
        { text: 'Bildiğiniz değerleri ve dönüşüm çarpanlarını yazın:' },
        { text: 'Metreden santimetreye çarpanla (ki o 1’e eşittir) çarpın:' },
        { text: 'Metreden milimetreye çarpanla çarpın:' },
        { text: 'Anlamlı basamakları denetleyin: girişteki 1.85 üç basamaklı; milimetre değerini de 3 anlamlı basamakla yazın:' },
      ],
      answer: 'İp $185\\ \\mathrm{cm} = 1.85 \\times 10^{3}\\ \\mathrm{mm}$ uzunluğunda. Aynı ip, aynı uzunluk — yalnızca birim küçüldü, o yüzden sayı büyüdü.',
    },
    questions: {
      'x1-p1': {
        prompt: 'Bir yol yarışı 3.2 km uzunluğunda. Bu mesafeyi metreye çevirin.',
        hints: [
          '$1\\ \\mathrm{km} = 1000\\ \\mathrm{m}$ — çarpın.',
          '$3.2 \\times 1000$',
        ],
        explanation: '$3.2\\ \\mathrm{km} = 3.2 \\times 1000\\ \\mathrm{m} = 3200\\ \\mathrm{m}$. Birim 1000 kat küçüldü, sayı 1000 kat büyüdü.',
      },
      'x1-p2': {
        prompt: 'Bir vitamin tableti 4500 mg kütlede. Bu kütleyi grama çevirin.',
        hints: [
          'mili öneki 1/1000 demektir, yani $1\\ \\mathrm{mg} = 0.001\\ \\mathrm{g}$.',
          '1000’e bölün: $4500 \\div 1000$.',
        ],
        explanation: '$4500\\ \\mathrm{mg} = 4500 \\div 1000\\ \\mathrm{g} = 4.5\\ \\mathrm{g}$. Küçük birimden büyüğe geçerken sayı bölünerek küçülür.',
      },
      'x1-p3': {
        prompt: 'Dünyanın dört yanındaki bilim insanları neden tek bir standart birim sistemini paylaşır?',
        choices: [
          'Ölçümleri denetlemeyi zorlaştırmak için',
          'Çünkü SI birimleri her laboratuvarda aynı değeri korur; böylece sonuçlar karşılaştırılabilir ve yeniden üretilebilir',
          'Çünkü zirâ gibi eski birimleri yazması çok uzundu',
          'Her deneyin otomatik olarak aynı sonucu vermesi için',
        ],
        hints: [
          'Farklı ülkelerdeki iki laboratuvarın sonuçlarını karşılaştırdığını düşünün.',
          'Bir ölçüm, başka biri onu aynı birimlerle yeniden üretebiliyorsa işe yarar.',
        ],
        explanation: 'Standart birimler ölçümleri evrensel kılar: Brezilya’daki 2 kg kütle, Japonya’daki 2 kg kütleyle tam olarak aynıdır; böylece deneyler her yerde karşılaştırılabilir, denetlenebilir ve yeniden üretilebilir.',
      },
      'x1-p4': {
        prompt: '0.00450 m ölçümü kaç anlamlı basamaklıdır?',
        choices: ['2', '3', '4', '5'],
        hints: [
          'Baştaki sıfırlar yalnızca ondalık noktayı yerinde tutar — hiçbir zaman sayılmaz.',
          'Saymaya ilk sıfırdan farklı rakamda başlayın: 4, 5 ve sondaki sıfır.',
        ],
        explanation: 'Baştaki sıfırlar sayılmaz. İlk anlamlı basamak 4’tür; 4, 5 ve sondaki 0 (ondalık noktadan sonra) birlikte **3 anlamlı basamak** eder.',
      },
      'x1-q1': {
        prompt: '6.5 kg’ı grama çevirin.',
        hints: ['$1\\ \\mathrm{kg} = 1000\\ \\mathrm{g}$.', '$6.5 \\times 1000$'],
        explanation: '$6.5\\ \\mathrm{kg} = 6.5 \\times 1000\\ \\mathrm{g} = 6500\\ \\mathrm{g}$ — kilo-, binle çarpar.',
      },
      'x1-q2': {
        prompt: 'Şunlardan hangisi kütle için SI temel birimidir?',
        choices: ['gram (g)', 'kilogram (kg)', 'newton (N)', 'miligram (mg)'],
        hints: [
          'Zaten bir önek taşıyan tek SI temel birimidir.',
          'Newton kuvveti ölçer, kütleyi değil.',
        ],
        explanation: '**Kilogram**, kütle için SI temel birimidir — meşhur olarak önek taşıyan tek temel birim. Gram yalnızca $10^{-3}\\ \\mathrm{kg}$’dır ve newton kuvveti ölçer.',
      },
      'x1-q3': {
        prompt: 'Bir bilgisayar çipi 12 mm genişliğinde. Bu, metre cinsinden kaçtır?',
        hints: [
          'mili, $1/1000$ demektir; 1000’e bölün.',
          '$12 \\div 1000$',
        ],
        explanation: '$12\\ \\mathrm{mm} = 12 \\div 1000\\ \\mathrm{m} = 0.012\\ \\mathrm{m}$.',
      },
      'x1-q4': {
        prompt: '1500 m tam 2 anlamlı basamakla nasıl yazılmalı?',
        choices: [
          '$1500\\ \\mathrm{m}$',
          '$1.5 \\times 10^{3}\\ \\mathrm{m}$',
          '$1.5\\ \\mathrm{m}$',
          '$150\\ \\mathrm{m}$',
        ],
        hints: [
          'İki anlamlı basamak, ondalık noktadan önce tek rakam demektir; sonra yuvarlayın.',
          'Düz “1500”, sıfırlarının sayılıp sayılmadığını gösteremez — bilimsel gösterim gösterebilir.',
        ],
        explanation: '$1.5 \\times 10^{3}\\ \\mathrm{m}$ içinde yalnızca 1 ve 5 anlamlıdır — tam 2 anlamlı basamak. $1500\\ \\mathrm{m}$ yazımı sıfırları belirsiz bırakır.',
      },
      'x1-q5': {
        prompt: 'Tahmin edin: sıradan bir elmanın kütlesi en çok şuna yakındır…',
        choices: ['1.5 g', '15 g', '150 g', '1.5 kg'],
        hints: [
          '1 kg’lık bir meyve poşetinde kabaca 6–8 elma olur.',
          'On kuvvetleri: elma üzüme (gram) mi yakın, karpuza (kilogram) mı?',
        ],
        explanation: 'Yaklaşık $150\\ \\mathrm{g}$, kilogram başına kabaca 7 elma demektir — doğru büyüklük mertebesi. $15\\ \\mathrm{g}$ üzü boyutunda; $1.5\\ \\mathrm{kg}$ bir karpuzdur.',
      },
    },
  },
  'x2-vectors': {
    title: 'Vektörler ve Bileşenler',
    tagline: 'Karakterli oklar: böl, topla, yeniden kur.',
    objectives: [
      'Bir büyüklüğün skaler mi vektör mü olduğuna karar verin ve vektörleri ölçekli oklar olarak çizin',
      'Bir vektörü $A_x = A\\cos\\theta$ ve $A_y = A\\sin\\theta$ ile bileşenlerine ayırın, sonra büyüklüğünü yeniden kurun',
      'Vektörleri uçtan uca ve bileşenlerle toplayın; bir skalerle çarpmanın ne yaptığını öngörün',
    ],
    concept: [
      { t: 'p', text: '“İstasyon 300 m ötede” yarım cevaptır — 300 m **hangi yönde**? İstasyon doğudayken 300 m kuzeye yürürseniz, gitmek istediğiniz yerden yaklaşık 424 m uzakta kalırsınız. Yön taşıyan büyüklükler sıradan sayılar gibi davranmaz; bu yüzden fizik onlara kendi alet çantalarını vermiştir.' },
      { t: 'h', text: 'Skaler ve vektör' },
      { t: 'p', text: 'Bir **skaler**, yalnızca bir büyüklükle — birimli bir sayıyla — tam olarak tanımlanır: kütle, zaman, sıcaklık, hız. Bir **vektör** büyüklük **ve** yön gerektirir: yer değiştirme, hız (yön ile), kuvvet. Vektörler başlarında okla yazılır ($\\vec{A}$); büyüklükleri $|\\vec{A}|$ ya da kısaca $A$ biçimindedir.' },
      { t: 'table', headers: ['Büyüklük', 'Skaler mi vektör mü?', 'Size ne söyler'], rows: [
        ['Kat edilen mesafe', 'skaler', 'hangi yoldan giderseniz gidin ne kadar gittiğinizi'],
        ['Yer değiştirme', 'vektör', 'doğru boyunca uzaklık ve yön'],
        ['Hız', 'skaler', 'yönü fark etmeksizin ne kadar hızlı'],
        ['Hız (yön ile)', 'vektör', 'ne kadar hızlı ve hangi yönde'],
        ['Kuvvet', 'vektör', 'itme ya da çekme ve yönü'],
      ] },
      { t: 'h', text: 'Oklar çizmek' },
      { t: 'p', text: 'Bir vektörü **ok** olarak çizin: uzunluğu büyüklüğe göre ölçekli çizilir, ok ucu yönü gösterir. Açılar pozitif $x$ ekseninden (doğu) ölçülür ve **saat yönünün tersi** pozitif sayılır — böylece $90°$ kuzeyi, $180°$ batıyı gösterir.' },
      { t: 'formula', caption: 'büyüklüğü $A$, açısı $\\theta$ olan bir vektörün bileşenleri — okun her eksendeki gölgesi' },
      { t: 'formula', caption: 'büyüklüğü ve yönü bileşenlerden yeniden kurun' },
      { t: 'p', text: 'Hızlı denetim: büyüklüğü 5, açısı $\\theta \\approx 53°$ olan bir okun $A_x = 5\\cos 53° \\approx 3$ ve $A_y = 5\\sin 53° \\approx 4$ — klasik 3‑4‑5 üçgeni. Dikkat: $3^2 + 4^2 = 5^2$; bileşenler büyüklüğü her zaman tam olarak yeniden kurar.' },
      { t: 'h', text: 'Vektör toplama' },
      { t: 'p', text: 'İki yol, aynı cevap. **Uçtan uca**: $\\vec{A}$’yı çizin, sonra $\\vec{B}$’yi $\\vec{A}$’nın ok ucundan başlatın; toplam $\\vec{R}$ ilk kuyruktan son uca uzanır. **Bileşenlerle**: $x$ parçalarını ve $y$ parçalarını ayrı ayrı toplayın — bu, zor açılardaki çok sayıda vektör için bile işe yarar:' },
      { t: 'formula', caption: 'vektörleri bileşenlerini toplayarak toplayın; sonra $R = \\sqrt{R_x^2 + R_y^2}$ bileşkenin büyüklüğünü verir' },
      { t: 'list', items: [
        '**Ölçekleme**: bir vektörü 2 skaleriyle çarpın; her bileşen iki katına çıkar — ok iki kat uzun, aynı yönde.',
        '**Negatif skalerler** oku çevirir: $-\\vec{A}$, tam $\\vec{A}$’nın tersine işaret eder.',
        'Çıkarma, tersini toplamaktır: $\\vec{A} - \\vec{B} = \\vec{A} + (-\\vec{B})$.',
        '**İç çarpım** $\\vec{A} \\cdot \\vec{B}$, $\\vec{A}$’nın $\\vec{B}$ üzerine ne kadar düştüğünü ölçer; oklar hizalıyken en büyük, dik olduklarında sıfırdır — iş ve enerjiyle yeniden karşılaşacaksınız.',
      ] },
      { t: 'key', text: 'Skalerler büyüklük taşır; vektörler büyüklük **ve** yön taşır. Bir vektörü $A_x = A\\cos\\theta$ ve $A_y = A\\sin\\theta$ ile bölün, vektörleri bileşen bileşen toplayın ve $\\sqrt{A_x^2 + A_y^2}$ ile yeniden kurun.' },
    ],
    example: {
      title: 'İki etaplı yürüyüş',
      problem: 'Bir doğa yürüyüşçüsü 5.0 km doğuya, sonra 12.0 km kuzeye yürür. Başlangıç noktasından ne kadar uzaktadır ve hangi yöndedir?',
      steps: [
        { text: 'Her etabın bileşenleri (doğu = +x, kuzey = +y):' },
        { text: 'Bileşenleri toplayın:' },
        { text: 'Büyüklük (Pisagor):' },
        { text: 'Yön (doğudan, saat yönünün tersine):' },
      ],
      answer: 'Yürüyüşçü başlangıçtan $13.0\\ \\mathrm{km}$ uzaktadır, doğudan $67°$ kuzey yönünde — 5‑12‑13 dik üçgeni, pusula gerekmez.',
    },
    questions: {
      'x2-p1': {
        prompt: 'Bir yer değiştirmenin bileşenleri $A_x = 6.0\\ \\mathrm{m}$ ve $A_y = 8.0\\ \\mathrm{m}$. Büyüklüğünü bulun.',
        hints: [
          '$A = \\sqrt{A_x^2 + A_y^2}$ kullanın.',
          '$\\sqrt{36 + 64} = \\sqrt{100}$',
        ],
        explanation: '$A = \\sqrt{6.0^2 + 8.0^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10\\ \\mathrm{m}$ — 3‑4‑5 tarzı bir üçgen daha.',
      },
      'x2-p2': {
        prompt: 'Şunlardan hangisi bir vektör büyüklüğüdür?',
        choices: ['sıcaklık', 'kütle', 'hız', 'yer değiştirme'],
        hints: [
          'Hangisi yön olmadan eksik kalır?',
          '“5 metre” demek arkadaşınızı bulmaya yetmez — hangi tarafa?',
        ],
        explanation: 'Yer değiştirme büyüklük **ve** yön gerektirir. Sıcaklık, kütle ve hız skalerdir — birimli düz bir sayı onları tam olarak tanımlar.',
      },
      'x2-p3': {
        prompt: '10 N’luk bir kuvvet, yatayla 60° açı yapacak biçimde yukarı doğru işaret ediyor. Yatay bileşeni $F_x$ kaçtır?',
        hints: [
          '$F_x = F\\cos\\theta$.',
          '$\\cos 60° = 0.5$',
        ],
        explanation: 'İtmenin $F_x = 10\\cos 60° = 10 \\times 0.5 = 5.0\\ \\mathrm{N}$’u yatay boyunca etki eder.',
      },
      'x2-p4': {
        prompt: '$\\vec{A}$ vektörünün büyüklüğü 4 N ve doğuya işaret ediyor. $3\\vec{A}$ nedir?',
        choices: [
          '12 N, doğuya',
          '7 N, doğuya',
          '4 N, doğuya',
          '12 N, batıya',
        ],
        hints: [
          'Bir skalerle çarpmak yalnızca büyüklüğü değiştirir.',
          '$3 \\times 4 = 12$ — yön değişti mi?',
        ],
        explanation: '3 ile çarpmak büyüklüğü $12\\ \\mathrm{N}$’a ölçekler; pozitif bir skaler yönü asla değiştirmez, bu yüzden ok hâlâ doğuya bakar.',
      },
      'x2-q1': {
        prompt: 'Bir vektörün bileşenleri $B_x = 5.0\\ \\mathrm{N}$ ve $B_y = 12.0\\ \\mathrm{N}$. Büyüklüğünü bulun.',
        hints: [
          '$B = \\sqrt{B_x^2 + B_y^2}$ kullanın.',
          '$\\sqrt{25 + 144} = \\sqrt{169}$',
        ],
        explanation: '$B = \\sqrt{5.0^2 + 12.0^2} = \\sqrt{25 + 144} = \\sqrt{169} = 13.0\\ \\mathrm{N}$ — 5‑12‑13 üçgeni.',
      },
      'x2-q2': {
        prompt: 'Bir vektör yalnızca … ile tam olarak tanımlanır.',
        choices: [
          'büyüklüğüyle',
          'yönüyle',
          'büyüklüğü ve yönüyle',
          'birimi ve biçimiyle',
        ],
        hints: [
          'Tek başına bir sayı skalerdir.',
          '“30 N aşağı doğru” — bu cümle hangi iki bilgi parçasını taşıyor?',
        ],
        explanation: 'Vektörler hem büyüklük (30 N) hem yön (aşağı doğru) ister. Hangisini silerseniz silin, tanım eksik kalır.',
      },
      'x2-q3': {
        prompt: '$\\vec{A} = (3\\ \\mathrm{m},\\ 4\\ \\mathrm{m})$ ve $\\vec{B} = (6\\ \\mathrm{m},\\ 8\\ \\mathrm{m})$ vektörleri. $\\vec{R} = \\vec{A} + \\vec{B}$ bileşkenin büyüklüğünü bulun.',
        hints: [
          'Önce bileşenleri toplayın: $R_x = 3 + 6$ ve $R_y = 4 + 8$.',
          'Sonra $R = \\sqrt{9^2 + 12^2}$.',
        ],
        explanation: '$R_x = 9\\ \\mathrm{m}$, $R_y = 12\\ \\mathrm{m}$; dolayısıyla $R = \\sqrt{81 + 144} = \\sqrt{225} = 15\\ \\mathrm{m}$.',
      },
      'x2-q4': {
        prompt: 'Bir vektör −2 ile çarpılıyor. Ne olur?',
        choices: [
          'Büyüklüğü iki katına çıkar ve ters yöne bakar',
          'Büyüklüğü yarıya iner, yön değişmez',
          'Skalere dönüşür',
          '90° döner',
        ],
        hints: [
          'Büyüklüğü ve yönü ayrı ayrı ele alın.',
          '$|-2| = 2$ büyüklüğü ölçekler; eksi işareti oku çevirir.',
        ],
        explanation: '$-2$ çarpanı büyüklüğü iki katına çıkarır ($|-2|\\,A = 2A$) ve eksi işareti yönü tersine çevirir.',
      },
      'x2-q5': {
        prompt: 'İç çarpım $\\vec{A} \\cdot \\vec{B}$, $\\vec{A}$’nın $\\vec{B}$ üzerine ne kadar düştüğünü ölçer. En büyük değeri, vektörler arasındaki açı … olduğunda alır.',
        choices: [
          '90°',
          '0° — oklar aynı yöne bakar',
          '180°',
          '45°',
        ],
        hints: [
          'Gölge, cisim duvara paralel yattığında en uzundur.',
          '90°’de bir okun ötekine düşen izi sıfırlanır.',
        ],
        explanation: 'Düşme, vektörler paralelken ($0°$) en büyük değere ulaşır ve $90°$’de sıfırlanır — iç çarpımın iş ve enerjideki rolünün niteliksel bir ön gösterimi.',
      },
    },
  },
  'x3-rotation': {
    title: 'Dönme ve Tork',
    tagline: 'Kapı kolları neden menteşelerden uzakta yaşar: burulmanın fiziği.',
    objectives: [
      'Dönüşü açısal konum $\\theta$ (radyan), açısal hız $\\omega$ ve açısal ivme $\\alpha$ ile tanımlayın',
      'Torku $\\tau = rF\\sin\\theta$ ile hesaplayın ve nokta kütle, disk ile halkanın eylemsizlik momentlerini karşılaştırın',
      'Dönme için Newton’un ikinci yasasını, $\\alpha = \\tau/I$’yı, doğrusal ↔ açısal benzetmeyle uygulayın',
    ],
    concept: [
      { t: 'p', text: 'Bir kapıyı menteşelerine yakın itin; neredeyse kıpırdamaz. Aynı kapıyı dış kenarından itin; kolayca açılır. Dönme hareketinin kendi “hareket yasaları” vardır — ve bunlar, düz çizgide itmeyi öğrendiğiniz her şeyin aynadaki yansımasıdır.' },
      { t: 'h', text: 'Açısal konum, hız, ivme' },
      { t: 'p', text: 'Dönüş **açılarla** tanımlanır. Açısal konum $\\theta$ **radyan** cinsinden ölçülür — bir tam tur $2\\pi\\ \\mathrm{rad} \\approx 6.28\\ \\mathrm{rad}$’dır. **Açısal hız** $\\omega$ (omega), açının ne kadar hızlı değiştiğidir; **açısal ivme** $\\alpha$ (alfa) ise $\\omega$’nun kendisinin ne kadar hızlı değiştiğidir.' },
      { t: 'formula', caption: 'açısal hız $\\omega$ rad/s ve açısal ivme $\\alpha$ rad/s² cinsinden — $v = \\Delta x/\\Delta t$ ve $a = \\Delta v/\\Delta t$’nin dönsel ikizleri' },
      { t: 'h', text: 'Doğrusal ↔ açısal sözlüğü' },
      { t: 'table', headers: ['Doğrusal', 'Açısal', 'Anlamı'], rows: [
        ['konum $x$ (m)', 'açı $\\theta$ (rad)', 'nerede / ne kadar dönmüş'],
        ['hız $v$ (m/s)', 'açısal hız $\\omega$ (rad/s)', 'ne kadar hızlı gider / döner'],
        ['ivme $a$ (m/s²)', 'açısal ivme $\\alpha$ (rad/s²)', '$v$ / $\\omega$ ne kadar hızlı değişir'],
        ['kuvvet $F$ (N)', 'tork $\\tau$ (N·m)', 'itme / burulma'],
        ['kütle $m$ (kg)', 'eylemsizlik momenti $I$ (kg·m²)', 'değişime direnç'],
      ] },
      { t: 'h', text: 'Tork: döndürücü kuvvet' },
      { t: 'p', text: '**Tork** $\\tau$, bir kuvvetin şeyleri bir eksen çevresinde ne kadar güçlü burduğunu ölçer. Üç malzeme önemlidir: kuvvetin büyüklüğü, eksenden ne kadar uzağa ittiğiniz (kuvvet kolu $r$) ve aralarındaki açı. Kapı kollarının menteşelerden uzakta durmasının ve uzun anahtarların sıkı cıvataları çözmesinin nedeni budur.' },
      { t: 'formula', caption: 'tork $\\tau$ N·m, kuvvet kolu $r$ m, kuvvet $F$ N ve aralarındaki $\\theta$ açısı cinsinden — dik itmek ($\\theta = 90°$) tüm $rF$’yi teslim eder' },
      { t: 'p', text: 'Kütlenin dönsel ikizi **eylemsizlik momenti** $I$’dir — dönüşteki değişime direnç. Yalnızca ne kadar kütle olduğuna değil, kütlenin **nerede** durduğuna da bağlıdır: eksenden uzaktaki kütleyi döndürmek çok daha zordur. $R$ uzaklığındaki bir nokta kütlenin $I = mR^2$’dir; aynı kütleli katı disk malzemesini içe doğru yayar, bu yüzden yalnızca $I = \\tfrac{1}{2}mR^2$ alır.' },
      { t: 'formula', caption: 'merkez çevresindeki eylemsizlik momentleri — halka, tüm kütlesi kenarda durduğu için nokta kütleye eşittir' },
      { t: 'h', text: 'Dönme için Newton’un ikinci yasası' },
      { t: 'formula', caption: 'aynı tork, eylemsizlik momenti büyüdüğünde daha küçük bir açısal ivme üretir — tam olarak $a = F/m$ gibi' },
      { t: 'key', text: 'Dönme, doğrusal hareketi yansıtır: $x \\leftrightarrow \\theta$, $v \\leftrightarrow \\omega$, $a \\leftrightarrow \\alpha$, $F \\leftrightarrow \\tau$, $m \\leftrightarrow I$. Tork $\\tau = rF\\sin\\theta$ burar, eylemsizlik momenti $I$ direnir ve $\\alpha = \\tau/I$ ikisini birbirine bağlar.' },
    ],
    example: {
      title: 'Döner tablayı hızlandırmak',
      problem: '4 kg kütleli ve 0.5 m yarıçaplı katı bir disk durgun halde başlıyor. Siz kenarına teğet yönde, sabit 8 N kuvvetle itiyorsunuz. 2 s sonraki açısal ivmeyi ve açısal hızı bulun.',
      steps: [
        { text: 'Kenardaki tork — teğet itme, $\\theta = 90°$ ve $\\sin\\theta = 1$ demektir:' },
        { text: 'Katı diskin eylemsizlik momenti:' },
        { text: 'Dönme için Newton’un ikinci yasası:' },
        { text: 'Durgundan başlayıp 2 s boyunca hızlanma:' },
      ],
      answer: 'Diskin açısal ivmesi $\\alpha = 8.0\\ \\mathrm{rad/s^2}$ olur ve 2 s sonra $\\omega = 16\\ \\mathrm{rad/s}$’a ulaşır — yani saniyede $16/2\\pi \\approx 2.5$ tur.',
    },
    questions: {
      'x3-p1': {
        prompt: 'Bir tamirci, cıvatanın ekseninden 0.3 m uzaktaki anahtara, sapına dik olacak biçimde 10 N ile çeker. Ne kadar tork uygular?',
        hints: [
          '$\\theta = 90°$ ile $\\tau = rF\\sin\\theta$.',
          '$\\sin 90° = 1$; dolayısıyla $\\tau = 0.3 \\times 10$.',
        ],
        explanation: '$\\tau = rF\\sin 90° = 0.3 \\times 10 \\times 1 = 3.0\\ \\mathrm{N\\cdot m}$.',
      },
      'x3-p2': {
        prompt: 'Ağır bir kapıyı en kolay açmak için nereden itmelisiniz?',
        choices: [
          'Olabildiğince menteşelere yakın',
          'Menteşelerden en uzak kenardan',
          'Tam ortasından',
          'Fark etmez',
        ],
        hints: [
          'Tork, kuvvet kolu $r$ ile büyür.',
          '$\\tau = rF$: aynı $F$; ama hangi $r$ en büyük $\\tau$’yı verir?',
        ],
        explanation: 'Uç kenarda kuvvet kolu $r$ en büyüktür; böylece aynı itme en büyük torku $\\tau = rF\\sin\\theta$ yaratır — kolların menteşelerden uzakta yaşamasının nedeni budur.',
      },
      'x3-p3': {
        prompt: '2 kg’lık bir nokta kütle, dönme ekseninden 0.5 m uzakta duruyor. Eylemsizlik momenti nedir?',
        hints: [
          'Nokta kütle için $I = mR^2$.',
          '$2 \\times 0.5^2$',
        ],
        explanation: '$I = mR^2 = 2 \\times 0.5^2 = 2 \\times 0.25 = 0.5\\ \\mathrm{kg\\cdot m^2}$.',
      },
      'x3-p4': {
        prompt: 'Eşit kütleli ve eşit yarıçaplı bir katı diske ve bir halkaya aynı tork uygulanıyor. Hangisi daha hızlı ivmelenir?',
        choices: [
          'Disk — daha küçük $I$’si daha büyük $\\alpha$ verir',
          'Halka — kenardaki fazla kütle yardımcı olur',
          'Aynı şekilde ivmelenirler',
          'Hiçbiri dönmez',
        ],
        hints: [
          '$\\alpha = \\tau/I$ — hangi cismin $I$’si daha küçük?',
          'Disk: $\\tfrac{1}{2}mR^2$. Halka: $mR^2$.',
        ],
        explanation: '$I_{\\text{disc}} = \\tfrac{1}{2}mR^2$ ve $I_{\\text{ring}} = mR^2$ olduğundan diskin eylemsizlik momenti yarı kadardır; böylece $\\alpha = \\tau/I$ iki kat büyük çıkar.',
      },
      'x3-q1': {
        prompt: '8 N·m’lik bir net tork, 2 kg·m² eylemsizlik momentli bir tekerleğe etki ediyor. Açısal ivmeyi bulun.',
        hints: ['$\\alpha = \\tau/I$ kullanın.', '$8 \\div 2$'],
        explanation: '$\\alpha = \\tau/I = 8/2 = 4\\ \\mathrm{rad/s^2}$.',
      },
      'x3-q2': {
        prompt: 'Bir tam tur kaç radyandır?',
        choices: [
          '$\\pi\\ \\mathrm{rad}$',
          '$2\\pi\\ \\mathrm{rad}$',
          '180 rad',
          '360 rad',
        ],
        hints: [
          'Bir radyan, yay uzunluğunun yarıçapa eşit olduğu açıdır.',
          'Çemberin çevresi $2\\pi R$ — çevresine kaç yarıçap sığar?',
        ],
        explanation: 'Tam bir tur, tüm çevreyi $2\\pi R$ tarar; dolayısıyla $\\theta = 2\\pi R / R = 2\\pi\\ \\mathrm{rad} \\approx 6.28\\ \\mathrm{rad}$.',
      },
      'x3-q3': {
        prompt: 'Bir vantilatör durgundan 6 rad/s² açısal ivmeyle hızlanıyor. 3 s sonraki açısal hızı nedir?',
        hints: [
          'Durgandan başlar: $\\omega = \\alpha t$.',
          '$6 \\times 3$',
        ],
        explanation: '$\\omega = \\alpha t = 6 \\times 3 = 18\\ \\mathrm{rad/s}$.',
      },
      'x3-q4': {
        prompt: 'Katı bir diskin kütlesini ikiye katlarsanız ama yarıçapını korursanız, eylemsizlik momenti…',
        choices: ['iki katına çıkar', 'yarıya iner', 'dört katına çıkar', 'aynı kalır'],
        hints: [
          '$I = \\tfrac{1}{2}mR^2$ — hangi sembol değişti?',
          'Yalnızca $m$ iki katına çıktı; $R$ yerinde durdu.',
        ],
        explanation: '$I = \\tfrac{1}{2}mR^2$, $m$ ile orantılıdır: kütleyi ikiye katlamak $I$’yi ikiye katlar.',
      },
      'x3-q5': {
        prompt: '12 N’luk bir kuvvet, 0.5 m uzunluğundaki bir kuvvet koluna, ona 30° açıyla çekiyor. Tork nedir?',
        hints: [
          '$\\tau = rF\\sin\\theta$ ve $\\sin 30° = 0.5$.',
          '$0.5 \\times 12 \\times 0.5$',
        ],
        explanation: '$\\tau = rF\\sin 30° = 0.5 \\times 12 \\times 0.5 = 3.0\\ \\mathrm{N\\cdot m}$ — sığ açı yüzünden dik durumun en iyisinin yalnızca yarısı.',
      },
    },
  },
}

export default ov
