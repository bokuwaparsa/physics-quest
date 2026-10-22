// ─── Physics Quest · Turkish overlay · part-02 (m4, m5, m6) ───────────────────
import type { LessonOvFile } from '../schema'

const ov: LessonOvFile = {
  'm4-newtons-second-law': {
    title: "Newton'un ikinci yasası (F = ma)",
    tagline: 'Arabayı yükle, bir itiş seç ve saatle yarışarak bitiş çizgisine ulaş.',
    objectives: [
      'Kuvveti, kütleyi veya ivmeyi hesaplamak için $F = m \\cdot a$ kullan',
      'Kuvveti ya da kütleyi iki katına çıkardığında ne olacağını öngör',
      '$1\\ \\mathrm{N} = 1\\ \\mathrm{kg \\cdot m/s^2}$ olduğunu tanı',
    ],
    concept: [
      { t: 'p', text: 'Boş bir market arabasını iterseniz fırlar gibi gider; aynı güçle tam yüklü olanı iterseniz yerinden ancak zorla kalkar. Newton\u2019un **ikinci yasası** bu günlük deneyime sayı kazandırır: itişi (kuvvet), itilen şeyi (kütle) ve oluşan ivmeyi birbirine bağlar.' },
      { t: 'formula', caption: 'kuvvet $F$ newton (N), kütle $m$ kilogram (kg), ivme $a$ m/s² — yeniden düzenlenmiş hâli: $a = F/m$' },
      { t: 'p', text: 'Bir formülün içinde iki kural gizlidir. Aynı kütle üzerinde **kuvveti iki katına** çıkar → ivme **iki katına** çıkar. Aynı kuvvetle **kütleyi iki katına** çıkar → ivme **yarıya** iner. İvme itişle büyür, yükle küçülür: $a \\propto F$ ve $a \\propto 1/m$.' },
      { t: 'h', text: 'Bir newton aslında nedir?' },
      { t: 'p', text: 'Tanım doğrudan formülden çıkar: $1\\ \\mathrm{N} = 1\\ \\mathrm{kg \\cdot m/s^2}$. Bir newton, $1\\ \\mathrm{kg}$ kütleye $1\\ \\mathrm{m/s^2}$ ivme veren itiştir. Öyleyse $50\\ \\mathrm{N}$ itiş, $2\\ \\mathrm{kg}$ aracına $25\\ \\mathrm{m/s^2}$ ivme verir — epey bir itiş!' },
      { t: 'h', text: 'Ağır şeyler neden daha büyük itiş ister' },
      { t: 'p', text: 'Kütle **ataleti** ölçer — bir cismin hızını değiştirmeye karşı ne kadar inatçı olduğunu. Çok kütle, çok atalet demektir; dolayısıyla aynı itiş daha az ivme üretir. Yüklü arabaya boş arabayla aynı hızlanmayı kazandırmak için orantılı biçimde daha güçlü itmeniz gerekir.' },
      { t: 'table', headers: ['İtilen kütle', '10 N itişten doğan ivme'], rows: [
        ['1 kg', '10 m/s²'],
        ['2 kg', '5 m/s²'],
        ['5 kg', '2 m/s²'],
        ['10 kg', '1 m/s²'],
      ] },
      { t: 'key', text: '$a = F/m$: aynı kuvvet, daha çok kütle → daha az ivme. Aynı kütle, daha çok kuvvet → daha çok ivme.' },
    ],
    example: {
      title: 'Güçlü itiş',
      problem: 'Sürtünmesiz bir rayda $50\\ \\mathrm{N}$ itiş, $2\\ \\mathrm{kg}$ arabaya uygulanıyor. Araba ne kadar ivme kazanır?',
      steps: [
        { text: 'Bilinenleri yaz:' },
        { text: 'İvme için $F = ma$ ifadesini düzenle:' },
        { text: 'Böl:' },
      ],
      answer: 'Araba $25\\ \\mathrm{m/s^2}$ ivme kazanır — her saniye hızı $25\\ \\mathrm{m/s}$ artar. Hafif bir arabayla oynamak kolaydır!',
    },
    questions: {
      'm4-newtons-second-law-p1': {
        prompt: '$18\\ \\mathrm{N}$ kuvvet, sürtünmesiz bir rayda $6\\ \\mathrm{kg}$ vagonu itiyor. Vagonun ivmesi kaçtır?',
        hints: ['$F = ma$ ifadesini $a = F/m$ biçimine getir.', '$18 \\div 6$'],
        explanation: '$a = F/m = 18\\ \\mathrm{N} \\div 6\\ \\mathrm{kg} = 3\\ \\mathrm{m/s^2}$.',
      },
      'm4-newtons-second-law-p2': {
        prompt: 'İtiş kuvvetini aynı tutuyor ama arabayı **iki kat kütleli** bir arabayla değiştiriyorsunuz. İvmeye ne olur?',
        choices: ['İki katına çıkar', 'Aynı kalır', 'Yarıya iner', 'Dört kat küçülür'],
        hints: ['$a = F/m$ ifadesine bakın ve $m$’nin 2 kat büyümesini hayal edin.', 'Daha büyük bir sayıya bölmek daha küçük bir sonuç verir.'],
        explanation: '$F$ sabitken $a = F/m$’dir. $m$ iki katına çıkınca payda da iki katına çıkar; böylece ivme yarıya iner.',
      },
      'm4-newtons-second-law-q1': {
        prompt: '$24\\ \\mathrm{N}$ kuvvet $8\\ \\mathrm{kg}$ kutuya etki ediyor (sürtünme yok). Kutunun ivmesi kaçtır?',
        hints: ['$a = F/m$ kullan.', '$24 \\div 8$'],
        explanation: '$a = F/m = 24\\ \\mathrm{N} \\div 8\\ \\mathrm{kg} = 3\\ \\mathrm{m/s^2}$.',
      },
      'm4-newtons-second-law-q2': {
        prompt: 'Aynı kuvvet önce $m$ kütleli arabayı, sonra $4m$ kütleli arabayı itiyor. Ağır arabanın ivmesi…',
        choices: ['4 kat büyük', 'aynı', 'hafif arabanın ¼’ü', 'hafif arabanın ½’si'],
        hints: ['$a = F/m$: ivme kütleye bölünür.', '$F/m$ ile $F/(4m)$’yi karşılaştır.'],
        explanation: '$a_{heavy} = F/(4m) = \\tfrac{1}{4}(F/m)$; yani dört kat kütle, dörtte bir ivme demektir.',
      },
      'm4-newtons-second-law-q3': {
        prompt: '$400\\ \\mathrm{kg}$’lik aracın $2.5\\ \\mathrm{m/s^2}$ ivme kazanması gerekiyor. Gerekli net kuvvet kaçtır?',
        hints: ['$F = ma$ ifadesini kuvvet için düzenle.', '$400 \\times 2.5$'],
        explanation: '$F = ma = 400\\ \\mathrm{kg} \\times 2.5\\ \\mathrm{m/s^2} = 1000\\ \\mathrm{N}$. Ağır yükler büyük kuvvetler ister.',
      },
      'm4-newtons-second-law-q4': {
        prompt: 'Bu büyüklüklerden hangisi bir **kuvvettir**?',
        choices: ['15 m/s', '15 kg', '15 N', '15 m/s²'],
        hints: ['Her değeri kendi büyüklüğüyle eşleştir: hız, kütle, kuvvet, ivme.', 'Kuvvet newton (N) ile ölçülür.'],
        explanation: 'Newton kuvveti ölçer; dolayısıyla kuvvet $15\\ \\mathrm{N}$’dir. m/s bir hız, kg bir kütle ve m/s² bir ivmedir.',
      },
      'm4-newtons-second-law-q5': {
        prompt: '$100\\ \\mathrm{N}$ net kuvvet $20\\ \\mathrm{kg}$’lik kızaklı bir aracı itiyor. Bu araç ne kadar ivme kazanır?',
        hints: ['$a = F/m$ kullan.', '$100 \\div 20$'],
        explanation: '$a = F/m = 100\\ \\mathrm{N} \\div 20\\ \\mathrm{kg} = 5\\ \\mathrm{m/s^2}$.',
      },
    },
  },

  'm5-newtons-third-law': {
    title: 'Newton’un üçüncü yasası ve roketler',
    tagline: 'Roketi kendi egzoz gazının üzerinde dengede tutun ve iki buz patencisinin birbirini itip ayrılmasını izleyin.',
    objectives: [
      'Farklı cisimlere etki eden etki–tepki kuvvet çiftlerini tanı',
      'Etki–tepki çiftlerinin tek bir cisimde neden hiçbir zaman sönmediğini açıkla',
      'Roket uçuşunu Newton’un üçüncü yasasıyla tanımla',
    ],
    concept: [
      { t: 'p', text: 'Elinizi duvara bastırın: duvara itersiniz ve duvarın avucunuza tam karşılık verdiğini hissedersiniz. Her itiş ya da çekme iki yönlü bir yoldur. Kuvvetler daima **çift** hâlinde gelir: etkileşen iki cisimden her birine bir tane.' },
      { t: 'key', text: '**Newton’un üçüncü yasası**: A cismi B cismine ittiğinde, B cismi de A’ya **büyüklükçe eşit** ve **yönce ters** bir kuvvetle geri iter.' },
      { t: 'h', text: 'Çift neden sönmez' },
      { t: 'p', text: 'İki kuvvet eşit ve zıt ise her şey neden sönüp yerinde durmuyor? Çünkü bu iki kuvvet **farklı cisimlere** etki eder. Yalnızca *aynı* cisme etki eden kuvvetler birbirini sönümleyebilir. Yüzerken eliniz suyu **geriye** iter; su elinizi **ileriye** iter. İleri yönlü kuvvet *siz* etki eder, bu yüzden *siz* ileri süzülürsünüz — geri yönlü kuvvet suya etki eder ve bir girdap oluşturur; sizi durdurmaz.' },
      { t: 'list', items: [
        '**Yürüme**: ayağınız yeri geriye iter; yer ayağınızı ileriye iter.',
        '**Yüzme**: eller suyu geriye iter; su sizi ileriye iter.',
        '**Roketler**: motor egzoz gazını aşağı iter; gaz roketi yukarı iter.',
        '**Küçük bir kayıktan inmek**: kayığı geriye itersiniz; kayık sizi iskeleye doğru ileriye iter — ve kayık açığa sürüklenir.',
      ] },
      { t: 'h', text: 'Roketler: gazı aşağı fırlat, yukarı itil' },
      { t: 'p', text: 'Roket motoru sıcak gazı büyük bir hızla aşağı püskürtür. Üçüncü yasaya göre gaz, roketi aynı güçte yukarı iter; bu kuvvete **itki** denir. Bu, boş uzayda bile işe yarar — roket havaya ya da yere değil, yalnızca kendi taşıdığı ve dışarı püskürttüğü gaza iter.' },
      { t: 'formula', caption: 'roket, itkisi ağırlığını $W$ geçmediği sürece havalanamaz; $g = 9.8\\ \\mathrm{m/s^2}$ kullanın' },
      { t: 'key', text: 'Etki–tepki çiftleri: büyüklükçe eşit, yönce ters, farklı cisimlere etki eder — tam da bu yüzden tek bir cisimde asla sönmezler.' },
    ],
    example: {
      title: 'Havalanma!',
      problem: '$200\\ \\mathrm{kg}$’lik roket motorunu $5000\\ \\mathrm{N}$ itkiyle çalıştırıyor. Kalkış anındaki yukarı yönlü ivmesi kaçtır?',
      steps: [
        { text: 'Önce roketin ağırlığını bul:' },
        { text: 'Yukarı yönlü net kuvveti bul:' },
        { text: 'Kütleye böl:' },
      ],
      answer: 'Roket $15.2\\ \\mathrm{m/s^2}$ yukarı yönlü ivmeyle havalanır — itki, ağırlığı $3040\\ \\mathrm{N}$ aşıyor.',
    },
    questions: {
      'm5-newtons-third-law-p1': {
        prompt: 'Bir kuş sabit hızla düz bir çizgide uçuyor. Hangi ifade bunu Newton’un üçüncü yasasıyla açıklar?',
        choices: [
          'Kuş havayı aşağı ve geriye iter; hava kuşu yukarı ve ileriye iter',
          'Kuş, yer çekiminin çekebileceğinden daha hızlı kanat çırpıyor',
          'Kuş, çevresindeki havadan daha hafiftir',
          'Havada hiç kuvvet yoktur, bu yüzden kuş sonsuza dek süzülür',
        ],
        hints: ['Üçüncü yasa: kuş havaya ittirir ve hava geri iter.', 'Havaya hangi yönde itiş, kuşa yukarı + ileri yönlü bir itiş verir?'],
        explanation: 'Kanatlar havayı aşağıya ve geriye iter; üçüncü yasaya göre hava kanatları yukarıya ve ileriye iterek kuşu hem kaldırır hem ileri taşır.',
      },
      'm5-newtons-third-law-p2': {
        prompt: '$500\\ \\mathrm{kg}$’lik roket yerin üstünde **havada asılı kalmak** istiyor. Motoru Dünya üzerinde toplam kaç itki üretmelidir?',
        hints: ['Havada asılı kalmak, net kuvvet = 0 demektir; itki ağırlığı tam olarak dengelemelidir.', 'Ağırlık: $W = mg = 500 \\times 9.8$.'],
        explanation: 'Havada asılı kalmak için itki ağırlığa eşit olmalıdır: $W = mg = 500\\ \\mathrm{kg} \\times 9.8\\ \\mathrm{m/s^2} = 4900\\ \\mathrm{N}$.',
      },
      'm5-newtons-third-law-q1': {
        prompt: 'Etki ve tepki kuvvetleri hiçbir zaman birbirini sönmez, çünkü…',
        choices: [
          'tepki her zaman biraz daha küçüktür',
          'farklı cisimlere etki ederler',
          'farklı zamanlarda etki ederler',
          'sürtünme her zaman birini yok eder',
        ],
        hints: ['Sönme, kuvvetlerin *aynı* cisme etki etmesini gerektirir.', 'Etki B cismine iter; tepki A cismine iter.'],
        explanation: 'Bir etki–tepki çiftinin iki kuvveti iki farklı cisme etki eder; bu yüzden her cisim ötekinden gelen bir net kuvvet hisseder — tek bir cisim üzerinde sönemezler.',
      },
      'm5-newtons-third-law-q2': {
        prompt: '$500\\ \\mathrm{kg}$’lik roket $8000\\ \\mathrm{N}$ itki üretiyor. Ağırlığı $4900\\ \\mathrm{N}$. Yukarı yönlü ivmesi kaçtır?',
        hints: ['Net kuvvet = itki − ağırlık.', '$a = (8000 - 4900)/500$'],
        explanation: '$F_{net} = 8000 - 4900 = 3100\\ \\mathrm{N}$; dolayısıyla $a = 3100/500 = 6.2\\ \\mathrm{m/s^2}$.',
      },
      'm5-newtons-third-law-q3': {
        prompt: 'Roket, herhangi bir gezegenden çok uzakta, uzayın boşluğunda hızlanmayı nasıl sürdürür?',
        choices: [
          'Uzaydaki artık havaya iter',
          'Güneş’ten gelen ışığa iter',
          'Kendi egzoz gazını geriye iter ve gaz onu ileriye iter',
          'Roketler Dünya’dan ayrıldıktan sonra hareket edemez',
        ],
        hints: ['Üçüncü yasa: kütleyi bir yana fırlat, öbür yana itil.', 'Roket, ittiği şeyi yanında taşır — kendi yakıtını ve gazını.'],
        explanation: 'Motor egzoz gazını geriye püskürtür; üçüncü yasaya göre gaz roketi ileriye iter. Ne havaya ne de yere gereksinim vardır.',
      },
      'm5-newtons-third-law-q4': {
        prompt: 'Küçük bir kanodan iskeleye doğru ileri atlıyorsunuz. Kanoya ne olur?',
        choices: [
          'Tam yerinde kalır',
          'Geriye, iskeleden uzağa hareket eder',
          'Seninle birlikte ileri hareket eder',
          'Hiç itilmeden yerinde döner',
        ],
        hints: ['İleri fırlamak için kanoya itiyorsun — kano bu itişi hangi yönde hisseder?', 'Üçüncü yasa: kano seni ileriye itiyor, demek ki sen kanoya…'],
        explanation: 'İleri atlamak için kanoyu geriye itersin; kano seni ileriye iter. Hafif kanoya etki eden bu geri yönlü kuvvet onu iskeleden uzağa sürükler.',
      },
    },
  },

  'm6-projectiles': {
    title: 'Yer çekimi ve mermiler',
    tagline: 'Topu ateşle, parabollerin peşine düş ve hepsini yöneten açıyı bul.',
    objectives: [
      'Yer çekimini açıkla ve ağırlığı $W = mg$ ile hesapla',
      'Mermileri tanımla: sabit yatay hız, dikey ivme',
      'Menzili $R = \\frac{v^2 \\sin 2\\theta}{g}$ ile öngör ve $45^\\circ$’nin neden kazandığını açıkla',
    ],
    concept: [
      { t: 'p', text: '**Yer çekimi**, Dünya’nın (ve diğer her kütlenin) cisimlere uyguladığı çekmedir. Dünya yüzeyine yakın bölgelerde yer çekimi, serbest düşen her cisme aynı ivmeyi verir: $g = 9.8\\ \\mathrm{m/s^2}$. Bırakılan bir cisim her saniye aşağı yönlü hızına 9.8 m/s ekler — 1 s sonra 9.8 m/s, 2 s sonra 19.6 m/s hızla düşer (hava direncini yok sayarak).' },
      { t: 'formula', caption: 'ağırlık $W$ newton (N), kütle $m$ kilogram, Dünya’da $g = 9.8\\ \\mathrm{m/s^2}$' },
      { t: 'p', text: 'Ağırlık, newton cinsinden bir **kuvvettir** — kilogram cinsinden kütleyle aynı şey değildir. Kütleniz her yerde aynıdır ama ağırlığınız bulunduğunuz yerdeki $g$’ye bağlıdır: Ay’da yaklaşık **altı kat daha az** tartardınız; oysa bedeniniz değişmez.' },
      { t: 'table', headers: ['Dünya', 'Yer çekimi $g$', '10 kg’lik çantanın ağırlığı'], rows: [
        ['Dünya', '9.8 m/s²', '98 N'],
        ['Mars', '3.7 m/s²', '37 N'],
        ['Ay', '1.6 m/s²', '16 N'],
      ] },
      { t: 'h', text: 'Mermiler: tek gövdede iki hareket' },
      { t: 'p', text: 'Bir **mermi**, yalnızca yer çekimi etkisiyle hareket eden herhangi bir cisimdir — top güllesi, basketbol topu, cesur bir uzun atlama sporcusu. Hareketi tümüyle bağımsız iki parçaya ayrılır: **yatay** olarak sabit hızla süzülür (yanlara doğru onu iten hiçbir şey yoktur), **dikey** olarak ise yer çekimi onu $g$ ivmesiyle aşağı çeker. Yatay ve dikey parçalar birbirinin varlığından bile habersizdir.' },
      { t: 'key', text: 'Yatay ve dikey hareket birbirinden bağımsızdır: yer çekimi yatay hızı asla değiştirmez; yatay hareket de yer çekimine karşı hiçbir direniş göstermez.' },
      { t: 'formula', caption: 'düz zeminde menzil: fırlatma hızı $v$ (m/s), fırlatma açısı $\\theta$, yer çekimi $g$' },
      { t: 'list', items: [
        '$45^\\circ$ **en büyük menzili** verir — “ileri” ile “yukarı”nın mükemmel karışımı.',
        'Tamamlayıcı açılar ($30^\\circ$ ve $60^\\circ$) **aynı menzili** verir, çünkü $\\sin 2\\theta$ değerleri eşittir.',
        'Yayın en tepesinde **dikey hız bir an için sıfırdır** — ama yatay hız hiç durmadı.',
        'Ay’da ($g$ altı kat küçük) aynı atış yaklaşık **altı kat daha uzağa** gider.',
      ] },
    ],
    example: {
      title: '45°’lik top atışı',
      problem: 'Bir top $v = 20\\ \\mathrm{m/s}$ hızla, düz zeminde tam $45^\\circ$ açıyla ateşleniyor. Ne kadar uzağa gider? (Hava direncini yok sayın.)',
      steps: [
        { text: 'Menzil formülünü yaz ve değerleri yerleştir:' },
        { text: '$\\sin 90^\\circ = 1$ olduğundan:' },
        { text: 'Böl:' },
      ],
      answer: 'Top yaklaşık $40.8\\ \\mathrm{m}$ ileride yere iner. Aynısını simülatörde yeniden üretmeyi dene: $20\\ \\mathrm{m/s}$, $45^\\circ$, Dünya yer çekimi.',
    },
    questions: {
      'm6-p1': {
        prompt: 'Bir top yayının tam tepesindedir. O anda **dikey** hızı nedir?',
        choices: ['En büyük', 'Sıfır', 'Fırlatma hızına eşit', '$19.6\\ \\mathrm{m/s}$ aşağı yönlü'],
        hints: ['Top düşmeye başlamadan önce yükselişini durdurur.', 'Yer çekimi yukarı yönlü hızı az az alır — tepeye gelince hiç kalmaz.'],
        explanation: 'Yer çekimi her saniye $9.8\\ \\mathrm{m/s}$ yukarı yönlü hız alır; bu yüzden yayın tepesinde dikey hız tam bir an için sıfırdır. Yatay hız ise değişmeden yoluna devam eder.',
      },
      'm6-p2': {
        prompt: '5 kg’lik bir un çuvallının Dünya üzerindeki ağırlığı nedir? ($g = 9.8\\ \\mathrm{m/s^2}$)',
        hints: ['Ağırlık bir kuvvettir: $W = mg$ kullan.', '$5 \\times 9.8$'],
        explanation: '$W = mg = 5 \\times 9.8 = 49\\ \\mathrm{N}$ — Dünya’nın çuvala uyguladığı çekme.',
      },
      'm6-q1': {
        prompt: '10 kg’lik bir kaya Ay’a taşınıyor; orada $g = 1.6\\ \\mathrm{m/s^2}$. Kayanın oradaki ağırlığı kaçtır?',
        hints: ['Ağırlık = kütle × yer çekimi: $W = mg$.', '$10 \\times 1.6$'],
        explanation: 'Kütle hâlâ 10 kg, ama Ay’ın zayıf yer çekimi $W = 10 \\times 1.6 = 16\\ \\mathrm{N}$ verir — Dünya’daki 98 N’un yaklaşık altıda biri.',
      },
      'm6-q2': {
        prompt: 'Bir top güllesi havada süzülürken (hava direncini yok sayın), **yatay** hızı…',
        choices: ['(neredeyse) sabit kalır', 'dikey parça gibi büyür', 'tepede sıfıra iner', 'aşağı inişte ters yönde döner'],
        hints: ['Yatay yönde hangi kuvvet etki ediyor?', 'Yer çekimi yalnızca dümdüz aşağı çeker — yatay parçaya dokunan hiçbir şey yoktur.'],
        explanation: 'Yatay kuvvet olmadığı için yatay hız tüm uçuş boyunca sabit kalır. Yalnızca dikey bileşen değişir; $9.8\\ \\mathrm{m/s^2}$ ile aşağı yönlü.',
      },
      'm6-q3': {
        prompt: 'Bir taş durgun hâlde bırakılıyor. 1 s sonra hangi hızla düşüyor?',
        hints: ['Düşme hızı her saniye $g$ kadar artar.', 'Durgun hâlden: $v = g \\times t$.'],
        explanation: '$v = g t = 9.8 \\times 1 = 9.8\\ \\mathrm{m/s}$. Sonraki her saniyede 9.8 m/s daha ekleyin.',
      },
      'm6-q4': {
        prompt: 'Hangi fırlatma açısı bir mermiyi düz zeminde **en uzağa** gönderir?',
        choices: ['$15^\\circ$', '$30^\\circ$', '$45^\\circ$', '$75^\\circ$'],
        hints: ['$R = v^2 \\sin 2\\theta / g$ — $\\sin 2\\theta$’yi olabildiğince büyük yap.', '$\\sin 2\\theta$, $2\\theta = 90^\\circ$ iken en büyük değerini alır.'],
        explanation: 'Menzil, $\\sin 2\\theta = 1$ iken yani $2\\theta = 90^\\circ$ iken en büyüktür; dolayısıyla $\\theta = 45^\\circ$. Bir yana kayan açılar yüksekliği mesafeyle takas eder.',
      },
      'm6-q5': {
        prompt: 'Bir top $20\\ \\mathrm{m/s}$ hızla $30^\\circ$ açıyla fırlatılıyor. Hızının yatay bileşeni kaçtır? ($\\cos 30^\\circ \\approx 0.866$)',
        hints: ['Yatay parça $v_x = v \\cos\\theta$ olur.', '$20 \\times 0.866$'],
        explanation: '$v_x = 20 \\cos 30^\\circ \\approx 17.3\\ \\mathrm{m/s}$ — ve bu değer ardından tüm uçuş boyunca sabit kalır.',
      },
    },
  },
}

export default ov
