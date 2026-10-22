// ─── Physics Quest · Turkish (tr) overlay · part-04: m10, f1, f2 ─────────────
import type { LessonOvFile } from '../schema'

const ov: LessonOvFile = {
  'm10-simple-machines': {
    title: 'Basit Makineler',
    tagline: 'Kaldıraçlar ve eğik düzlemler: yer çekiminin gücünü kandır, hesap defterini değil.',
    objectives: [
      'Makinelerin kuvveti mesafeyle takas ettiğini ve işi asla azaltmadığını açıklayın',
      'Kaldıraç yasasını kullanın: $F_e d_e = F_l d_l$ ve $MA = d_e/d_l$',
      'Eğik düzlemdeki ideal itme kuvvetini bulun: $F = mg\\sin\\theta$',
    ],
    concept: [
      { t: 'p', text: 'Bir **basit makine** — kaldıraç, eğik düzlem, makara — enerji üretmez. Size bir **takas** sunar: daha küçük kuvvetle itersiniz ama eliniz daha uzun yol alır. Verdiğiniz iş, aldığınız işe eşittir (aradaki fark yalnızca biraz sürtünmedir):' },
      { t: 'key', text: 'Makineler **işi** asla azaltmaz. İttiğiniz **mesafeyi** artırarak ihtiyaç duyduğunuz **kuvveti** azaltırlar.' },
      { t: 'h', text: 'Kaldıraç' },
      { t: 'p', text: 'Bir tahterevalliyi dengede tutun; kaldıraç yasasını keşfetmiş olursunuz: kuvvet × kuvvet kolu = yük × yük kolu. **Mekanik avantaj** (MA) kuvveti çoğaltan katsayıdır — kolların oranı:' },
      { t: 'formula', caption: 'kuvvet × kuvvet kolu = yük kuvveti × yük kolu; MA ayrıca yük ÷ kuvvet demektir' },
      { t: 'p', text: '$MA = 4$ ile yük kuvvetinin dörtte biri ile itersiniz — ama eliniz dört kat daha uzağa gitmelidir. Dayanak noktasını yüke doğru kaydırın; bir çocuk bile fil kaldırabilir. Levye, el arabası, makas, şişe açacağı ve kendi ön kolunuz — hepsi kılık değiştirmiş kaldıraçlardır.' },
      { t: 'h', text: 'Eğik Düzlem' },
      { t: 'p', text: 'Rampa bir “tembel kaldırıcıdır”: bir sandığı yumuşak bir eğimde yukarı itmek, yalnızca ağırlığının eğime paralel dilimini gerektirir. Eğim yumuşadıkça kuvvet küçülür — ama itme uzar. Rampalar, kamalar ve vidalar; hepsi farklı kılıklara bürünmüş eğik düzlemlerdir:' },
      { t: 'formula', caption: 'bir rampada ideal (sürtünmesiz) itme kuvveti; $F \\cdot L = mgh$ işi tam olarak dikine kaldırmayla aynıdır' },
      { t: 'list', items: [
        'Altı klasik basit makine: **kaldıraç, çark ve mil, makara, eğik düzlem, kama, vida**.',
        '$MA = 4$ olan bir makara düzeneği bir sandığı, ağırlığının dörtte biriyle kaldırır — ama ipi dört kat daha fazla çekmeniz gerekir.',
      ] },
    ],
    example: {
      title: 'Levyenin pazarlığı',
      problem: 'Bir levye size 5 mekanik avantaj sağlar. Yalnızca 200 N ile itiyorsunuz. Hangi yükü kaldırabilirsiniz?',
      steps: [
        { text: 'Mekanik avantaj, yük bölü kuvvettir:' },
        { text: 'Yerine koyun:' },
        { text: 'Çarpın:' },
      ],
      answer: 'Bir $1000\\ \\mathrm{N}$ yükü, yalnızca $200\\ \\mathrm{N}$ kuvvetle kaldırırsınız — ama levye sizin ucunuz beş kat daha uzun yol alır. Tasarruf edilen iş: hiç. Tasarruf edilen kuvvet: bolca!',
    },
    questions: {
      'm10-p1': {
        prompt: 'Bir kaldıracın kuvvet kolu 2 m, yük kolu 0.5 m. Mekanik avantajı kaçtır?',
        hints: [
          '$MA = d_e / d_l$ — kuvvet kolu ÷ yük kolu.',
          '$2 \\div 0.5$',
        ],
        explanation: '$MA = d_e/d_l = 2 / 0.5 = 4$ — yük kuvvetinin dörtte biri ile itersiniz ama dört kat mesafe alırsınız.',
      },
      'm10-p2': {
        prompt: 'Bir rampa, bir kamyonete yükleme yapmayı kolaylaştırır çünkü…',
        choices: [
          'yapılan toplam işi azaltır',
          'mesafeyi artırarak gereken kuvveti azaltır',
          'sandığın ağırlığını azaltır',
          'sandığa ekstra enerji ekler',
        ],
        hints: [
          'Sandık yine de aynı yüksekliğe çıkar — aynı $mgh$.',
          'Daha yumuşak eğim → daha küçük kuvvet → daha uzun itiş.',
        ],
        explanation: 'Potansiyel enerji kazancı ($mgh$) sabittir, dolayısıyla iş de sabittir. Rampa bu işi yalnızca daha uzun bir mesafeye yayar ve vermeniz gereken kuvveti küçültür.',
      },
      'm10-q1': {
        prompt: 'Mekanik avantaj 4 iken, 200 N yükü kaldıracak kuvvet nedir?',
        hints: ['$F_e = F_l / MA$.', '$200 \\div 4$'],
        explanation: '$F_e = 200 / 4 = 50\\ \\mathrm{N}$ — makine kuvvetinizi dört katına çıkarır ve karşılığında dört kat mesafe alır.',
      },
      'm10-q2': {
        prompt: 'Basit makine aslında neyi azaltır?',
        choices: ['Gereken işi', 'Gereken kuvveti', 'Gereken enerjiyi', 'Kat edilen mesafeyi'],
        hints: ['Verilen iş ≈ alınan iş — her zaman.', 'Kuvvet azalır; mesafe aynı oranla artar.'],
        explanation: 'Makineler gereken kuvveti azaltır, işi asla: daha az kuvvet × daha çok mesafe = aynı iş (ideal durumda).',
      },
      'm10-q3': {
        prompt: 'Bir tahterevallide kuvvet kolu 3 m ve 300 N yük, dayanak noktasından 1 m uzakta duruyor. Onu dengeleyecek kuvvet nedir?',
        hints: ['Kaldıraç yasası: $F_e d_e = F_l d_l$.', '$F_e = 300 \\times 1 / 3$'],
        explanation: '$F_e \\times 3 = 300 \\times 1$, yani $F_e = 100\\ \\mathrm{N}$ — sizin ucunuz, yükün üç katı kadar yol alır.',
      },
      'm10-q4': {
        prompt: 'Boya kutusunun kapağını kaldırıp açmak için kullanılan tornavida, bir … görevi görür.',
        choices: ['makara', 'kaldıraç', 'rampa', 'çark ve mil'],
        hints: [
          'Bir ucu az hareket eder, kapaktaki uç çok yükselir.',
          'Kutunun kenarındaki dayanak noktası çevresinde döner.',
        ],
        explanation: 'Tornavida kutunun kenarında (dayanak noktası) döner: sapaya uygulanan küçük kuvvet, kapağın altında büyük bir kaldırma kuvvetine dönüşür — klasik bir kaldıraç.',
      },
      'm10-q5': {
        prompt: 'Bir rampa 6 m uzunluğunda ve 1.5 m yükseliyor. 200 N yükü yukarı itmek için ideal itme kuvveti nedir?',
        hints: [
          'Alınan iş = $200 \\times 1.5 = 300$ J; 6 m boyunca itiş aynı işi sağlamalıdır.',
          '$F \\times 6 = 300$, yani $F = 300 \\div 6$',
        ],
        explanation: 'Kaldırmak $W = 200 \\times 1.5 = 300\\ \\mathrm{J}$ işini gerektirir; tüm rampa boyunca itmek: $F = 300 / 6 = 50\\ \\mathrm{N}$ — dört kat mesafeye karşılık ağırlığın dörtte biri.',
      },
    },
  },
  'f1-pressure': {
    title: 'Basınç',
    tagline: 'İğneyle ya da kar ayakkabısıyla bastırın ve alanın her şeyi nasıl değiştirdiğini görün.',
    objectives: [
      'Basıncı, bir alana yayılan kuvvet olarak açıklayın',
      '$P = F/A$ ile basınç hesaplayın ve paskal birimini kullanın ($1\\ \\mathrm{Pa} = 1\\ \\mathrm{N/m^2}$)',
      'Kuvvet veya temas alanı değiştiğinde basınca ne olacağını öngörün',
    ],
    concept: [
      { t: 'p', text: 'Düz avucunuzla duvara bastırın; hiçbir şey olmaz. Aynı kuvveti kalemtraş edilmiş bir kurşun kalemin ucuyla uygularsanız duvarda oyuk açabilirsiniz. Aynı itme, çok farklı sonuç — çünkü kuvvet çok daha küçük bir **alana** sıkıştırılmıştır.' },
      { t: 'h', text: 'Basınç: alana yayılan kuvvet' },
      { t: 'p', text: '**Basınç**, bir kuvvetin ne kadar yoğunlaştığını gösterir: kuvvetin, bastığı alana bölümüdür. SI birimi **paskal** birimidir ($\\mathrm{Pa}$).' },
      { t: 'formula', caption: 'basınç $P$ paskal ($\\mathrm{Pa}$), kuvvet $F$ newton ($\\mathrm{N}$), temas alanı $A$ metrekare ($\\mathrm{m^2}$) cinsinden' },
      { t: 'p', text: 'Bir paskal, bir metrekareye yayılan bir newtondur: $1\\ \\mathrm{Pa} = 1\\ \\mathrm{N/m^2}$. Gerçek basınçlar çoğu zaman binlerce paskal mertebesindedir; bu yüzden kilopaskal kullanırız: $1\\ \\mathrm{kPa} = 1000\\ \\mathrm{Pa}$. Birimlerinize dikkat edin: $1\\ \\mathrm{m^2} = 10{,}000\\ \\mathrm{cm^2}$; dolayısıyla $150\\ \\mathrm{cm^2}$ büyüklüğünde bir bot tabanı yalnızca $0.015\\ \\mathrm{m^2}$ eder.' },
      { t: 'h', text: 'Keskin mi, geniş mi?' },
      { t: 'list', items: [
        '**Keskin** şeyler kuvveti yoğunlaştırır: bir çakmak (duvar pimi), bıçak ağzı veya çivi ucu çok küçük bir temas alanına sahiptir; bu yüzden küçük bir kuvvet bile kocaman bir basınç yaratır.',
        '**Geniş** şeyler kuvveti yayar: kar ayakkabıları, kayaklar ve devenin geniş, yastıklı ayakları basıncı düşük tutar; böylece kara ya da kuma gömülmezsiniz.',
        'Geniş askılar, ağır okul çantasını rahat ettirir — aynı ağırlık, omzunuzun daha büyük bir alanına yayılır.',
      ] },
      { t: 'table', headers: ['Günlük durum', 'Tipik basınç'], rows: [
        ['Etrafınızdaki hava (atmosfer)', '≈ 101 kPa'],
        ['Araba lastiği', '≈ 220 kPa'],
        ['Tek ayak üstünde duran kişi', '≈ 30 kPa'],
        ['Yumuşak karda kar ayakkabısı', '≈ 5 kPa'],
        ['Adım sırasında ince stiletto topuğu', '≈ 3,000 kPa'],
      ] },
      { t: 'key', text: 'Basınç = kuvvet ÷ alan. Aynı kuvvet daha küçük bir alana uygulanırsa basınç büyür — keskin şeylerin delip geçmesi ile geniş şeylerin yumuşak zeminde batmamasının nedeni budur.' },
    ],
    example: {
      title: 'Zemindeki sandık',
      problem: 'Bir sandık, 300 N ağırlığıyla zemine bastırıyor; tabanı 0.02 m² alanda zemine değiyor. Hangi basıncı oluşturur?',
      steps: [
        { text: 'Bildiğiniz değerleri yazın:' },
        { text: 'Basınç formülünü kullanın:' },
        { text: 'Bölün:' },
        { text: 'Kilopaskala çevirin:' },
      ],
      answer: 'Sandık zemine $15{,}000\\ \\mathrm{Pa} = 15\\ \\mathrm{kPa}$ ile bastırır — kabaca bir araba lastiğinin içindeki basınç kadar.',
    },
    questions: {
      'f1-p1': {
        prompt: '200 N kuvvet, 4 m² temas alanına yayılıyor. Basıncı hesaplayın.',
        hints: [
          '$P = F/A$ kullanın.',
          'Kuvveti alana bölün: $200 \\div 4$.',
        ],
        explanation: '$P = F/A = 200\\ \\mathrm{N} \\div 4\\ \\mathrm{m^2} = 50\\ \\mathrm{Pa}$.',
      },
      'f1-p2': {
        prompt: 'Keskin bir bıçak, künt bir bıçaktan neden daha iyi keser?',
        choices: [
          'Daha hafiftir, bu yüzden daha hızlı hareket eder',
          'Aynı kuvvet çok daha küçük bir alana etki eder, bu yüzden basınç çok daha büyüktür',
          'Daha yoğun bir metalden yapılmıştır',
          'Keskin ağızlar daha soğuk kalır, bu yüzden yiyecek onlardan kaçar',
        ],
        hints: [
          '$P = F/A$ üzerinde düşünün — ne değişiyor, ne aynı kalıyor?',
          'İtme kuvvetiniz aynıdır; yalnızca temas alanı farklıdır.',
        ],
        explanation: 'Keskin bir ağızla aynı itme kuvveti çok küçük bir alana etki eder; böylece $P = F/A$ çok büyük olur ve ağız yarıp geçer.',
      },
      'f1-q1': {
        prompt: '600 N ağırlığındaki bir kutu, 2 m² alana sahip bir taban üzerinde duruyor. Zemine ne kadar basınç uygular?',
        hints: ['$P = F/A$ kullanın.', '$600 \\div 2$'],
        explanation: '$P = F/A = 600\\ \\mathrm{N} \\div 2\\ \\mathrm{m^2} = 300\\ \\mathrm{Pa}$.',
      },
      'f1-q2': {
        prompt: 'Devenin geniş ve yastıklı ayakları vardır. Bu, onun çölün yumuşak kumunda yürümesine nasıl yardımcı olur?',
        choices: [
          'Ağırlığını artırır, bu yüzden daha iyi tutunur',
          'Temas alanını artırır; bu da basıncı azaltır',
          'Kum üzerindeki basıncı artırır',
          'Ayaklarının altındaki kumu yoğunlaştırır',
        ],
        hints: [
          'Ağırlık aynı, ama alana ne oluyor?',
          'Daha büyük $A$ alanı, $P = F/A$ değerini küçültür.',
        ],
        explanation: 'Devenin ağırlığı aynı kalır ama çok daha büyük bir alana yayılır; böylece $P = F/A$ düşer ve kuma gömülmez.',
      },
      'f1-q3': {
        prompt: '1200 Pa basınç, 3 m² alana etki ediyor. Toplam kuvvet nedir?',
        hints: [
          '$P = F/A$ ifadesini $F = P \\times A$ biçimine getirin.',
          '$1200 \\times 3$',
        ],
        explanation: '$F = P\\,A = 1200\\ \\mathrm{Pa} \\times 3\\ \\mathrm{m^2} = 3600\\ \\mathrm{N}$.',
      },
      'f1-q4': {
        prompt: 'Basıncın SI birimi olan paskal, şuna eşittir…',
        choices: ['N', 'N/m²', 'N·m', 'kg/m²'],
        hints: [
          'Formül $P = F/A$ birimleri size söyler.',
          'Newton bölü metrekare.',
        ],
        explanation: '$P = F/A$ ifadesinden birim $\\mathrm{N/m^2}$ çıkar ve $1\\ \\mathrm{N/m^2} = 1\\ \\mathrm{Pa}$.',
      },
    },
  },
  'f2-buoyancy': {
    title: 'Yoğunluk ve Kaldırma Kuvveti',
    tagline: 'Blokları tanka bırakın ve çelik gemilerin neden yüzdüğünü keşfedin.',
    objectives: [
      '$\\rho = m/V$ ile yoğunluğu hesaplayın',
      'Arşimet ilkesini belirtin: $F_b = \\rho_{\\text{fluid}}\\,g\\,V_{\\text{sub}}$',
      'Yoğunlukları karşılaştırarak bir cismin yüzeceğini mi batacağını mı öngörün',
    ],
    concept: [
      { t: 'p', text: 'Bir çelik gemi, bilye büyüklüğünde dolu bir çelik bloktan daha ağırdır — yine de gemi yüzer, bir çakıl taşı batar. Yüzmek yalnızca ağırlıkla ilgili değildir: maddenin, etrafındaki akışkana kıyasla ne kadar sıkı paketlandığıyla ilgilidir.' },
      { t: 'h', text: 'Yoğunluk: ne kadar sıkı paketlenmiş?' },
      { t: 'p', text: '**Yoğunluk**, her bir metreküpe sıkıştırılmış kütledir. SI birimi kilogram bölü metreküptür ($\\mathrm{kg/m^3}$).' },
      { t: 'formula', caption: 'yoğunluk $\\rho$ kg/m³, kütle $m$ kg, hacim $V$ m³ cinsinden' },
      { t: 'table', headers: ['Malzeme', 'Yoğunluk (kg/m³)'], rows: [
        ['Ahşap (çam)', '≈ 600'],
        ['Buz', '917'],
        ['Tatlı su', '1000'],
        ['Alüminyum', '2700'],
        ['Kurşun', '11,340'],
      ] },
      { t: 'h', text: 'Arşimet İlkesi' },
      { t: 'p', text: 'Bir topu su altına itin; yukarı doğru bir itme hissedersiniz. Her akışkan, içinde bulunan her şeye karşı iter. **Arşimet ilkesi** şunu söyler: bu **kaldırma kuvveti**, cismin yerini aldığı (yolundan kenara ittiği) akışkanın ağırlığına eşittir:' },
      { t: 'formula', caption: 'kaldırma kuvveti $F_b$ N cinsinden, akışkan yoğunluğu $\\rho_{\\text{fluid}}$ kg/m³ cinsinden, $g = 9.8\\ \\mathrm{m/s^2}$, suya batan hacim $V_{\\text{sub}}$ m³ cinsinden' },
      { t: 'list', items: [
        'Gemiler yüzer çünkü gövdeleri çoğunlukla **hava** doludur — geminin ortalama yoğunluğu, suyununkinden çok daha düşüktür; böylece yerini alan su, onu tutacak kadar güçlü biçimde yukarı iter.',
        'Sıcak hava balonları aynı fikri havada kullanır: sıcak hava, serin havadan daha az yoğundur; böylece kaldırma kuvveti ağırlığı yener.',
        'Denizaltılar, balast tanklarındaki suyu pompalayıp çekerek ortalama yoğunluklarını ince ayarlar ve batmayı ya da yükselmeyi seçer.',
      ] },
      { t: 'key', text: 'Bir cisim, akışkandan **daha az yoğun**sa yüzer. Dengede kaldırma kuvveti ağırlığa eşittir ve batan kısım oranı $\\rho_{\\text{body}}/\\rho_{\\text{fluid}}$ olur — buz (917), suda (1000) kendisinin yüzde 91.7\'sini gizler.' },
    ],
    example: {
      title: 'Yüzen buz küpü',
      problem: 'Yoğunluğu 917 kg/m³ olan bir buz küpü, tatlı suda (1000 kg/m³) yüzüyor. Küpün ne kadarı yüzeyin altındadır?',
      steps: [
        { text: 'Yüzerken, kaldırma kuvveti ağırlığı tam olarak dengelemelidir:' },
        { text: '$g$ sadeleşir ve geriye batan kesir kalır:' },
        { text: 'Yüzdeye çevirin:' },
      ],
      answer: 'Buzun yaklaşık $91.7\\%$ kadarı yüzeyin altında gizlidir — yalnızca küçük bir ucu dışarıda kalır. Buzdağlarının çoğunun su altında olmasının nedeni budur.',
    },
    questions: {
      'f2-p1': {
        prompt: 'Bir bloğun kütlesi 2 kg, hacmi 0.004 m³. Yoğunluğu nedir?',
        hints: [
          '$\\rho = m/V$ kullanın.',
          'Kütleyi hacme bölün: $2 \\div 0.004$.',
        ],
        explanation: '$\\rho = 2\\ \\mathrm{kg} \\div 0.004\\ \\mathrm{m^3} = 500\\ \\mathrm{kg/m^3}$ — sudan daha az yoğun; yani bu blok yüzer.',
      },
      'f2-p2': {
        prompt: 'Bir cisim bir sıvıya bırakılıyor. Cismin yoğunluğu, sıvının yoğunluğundan **daha büyük**. Ne olur?',
        choices: [
          'Hacminin çoğu yüzeyin üstünde kalacak biçimde yüzer',
          'Tam yarıya kadar batmış halde yüzer',
          'Dibe kadar iner (batar)',
          'Sıvının içinde çözünür',
        ],
        hints: [
          '$\\rho_{\\text{obj}}Vg$ ağırlığını, mümkün olan en büyük kaldırma kuvveti $\\rho_{\\text{fluid}}Vg$ ile karşılaştırın.',
          'Akışkandan daha yoğun olmak, ağırlığın her zaman kazandığı anlamına gelir.',
        ],
        explanation: 'Tamamen batmış bile olsa, kaldırma kuvveti ($\\rho_{\\text{fluid}}Vg$) ağırlıktan ($\\rho_{\\text{obj}}Vg$) küçüktür; bu yüzden cisim dibe iner.',
      },
      'f2-q1': {
        prompt: 'Bir buz küpünün kütlesi 0.9 kg, hacmi 0.001 m³. Yoğunluğunu bulun.',
        hints: ['$\\rho = m/V$ kullanın.', '$0.9 \\div 0.001$'],
        explanation: '$\\rho = 0.9\\ \\mathrm{kg} \\div 0.001\\ \\mathrm{m^3} = 900\\ \\mathrm{kg/m^3}$.',
      },
      'f2-q2': {
        prompt: 'Arşimet ilkesine göre, suya batmış bir cisme etki eden kaldırma kuvveti şuna eşittir…',
        choices: [
          'cismin kendi ağırlığı',
          'cismin yerini aldığı akışkanın ağırlığı',
          'cismin kütlesi',
          'sıfır',
        ],
        hints: [
          'Cismin yolundan neyi kenara ittiğini düşünün.',
          '$F_b = \\rho_{\\text{fluid}}\\,g\\,V_{\\text{sub}}$ hangi akışkanın ağırlığıdır?',
        ],
        explanation: 'Arşimet: $F_b = \\rho_{\\text{fluid}}\\,g\\,V_{\\text{sub}}$ — tam olarak yer değiştiren akışkanın ağırlığı.',
      },
      'f2-q3': {
        prompt: '800 kg/m³ yoğunluklu bir blok, suda (1000 kg/m³) yüzüyor. Hacminin yüzde kaçı su altında kalıyor?',
        hints: [
          'Batan kesir = $\\rho_{\\text{body}}/\\rho_{\\text{fluid}}$.',
          '$800/1000$, sonra yüzdeye çevirin.',
        ],
        explanation: 'Batan kesir $= 800/1000 = 0.8$; yani bloğun yüzde 80\'i yüzeyin altında kalır.',
      },
      'f2-q4': {
        prompt: 'Sıcak hava balonları neden yüzer?',
        choices: [
          'Sıcak hava, balonun etrafındaki serin havadan daha az yoğundur',
          'Sıcak hava, soğuk havadan daha ağırdır',
          'Balonun kumaşı havadan daha hafiftir',
          'Alev doğrudan gökyüzüne bastırır',
        ],
        hints: [
          'Balonun içindeki yoğunluğu dışarıdaki yoğunlukla karşılaştırın.',
          'Kaldırma kuvveti toplam ağırlığı yenmeli — bunu mümkün kılan nedir?',
        ],
        explanation: 'Isıtma, içindeki havayı genişletir ve yoğunluğunu düşürür; böylece çevredeki havanın kaldırma kuvveti balonun ağırlığını aşar ve balon yükselir.',
      },
      'f2-q5': {
        prompt: 'Hacmi 0.01 m³ olan bir cisim, suya tamamen batırılıyor ($\\rho = 1000\\ \\mathrm{kg/m^3}$, $g = 9.8\\ \\mathrm{m/s^2}$). Üzerine etki eden kaldırma kuvveti nedir?',
        hints: [
          'Tamamen batmış olmak, $V_{\\text{sub}} = 0.01\\ \\mathrm{m^3}$ demektir. $F_b = \\rho_{\\text{fluid}}\\,g\\,V_{\\text{sub}}$ kullanın.',
          '$1000 \\times 9.8 \\times 0.01$',
        ],
        explanation: '$F_b = 1000\\ \\mathrm{kg/m^3} \\times 9.8\\ \\mathrm{m/s^2} \\times 0.01\\ \\mathrm{m^3} = 98\\ \\mathrm{N}$.',
      },
    },
  },
}

export default ov
