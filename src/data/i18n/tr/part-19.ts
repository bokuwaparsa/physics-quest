// ─── Physics Quest · Turkish (tr) overlay · part-19: p8, p9, p10 ───────────────
import type { LessonOvFile } from '../schema'

const ov: LessonOvFile = {
  'p8-nuclear-structure': {
    title: 'Çekirdeğin İçi',
    tagline: 'Proton ve nötronları sayın, onları tutan yapıştırıcının ağırlığını tartın ve her bozunumu dengeleyin.',
    objectives: [
      'İzotop gösterimi $^{A}_{Z}\\mathrm{X}$’i okuyun ve $Z$’yi, $N$’yi ve $A$’yı bulun',
      'Güçlü kuvvet ile elektrik itmesi arasındaki halat çekme mücadelesini açıklayın ve kararlılık vadisini bulun',
      'Kütle ve atom numaralarının korunumunu kullanarak dengeli $\\alpha$, $\\beta^-$ ve $\\gamma$ bozunum denklemleri yazın',
    ],
    concept: [
      { t: 'p', text: 'p1 dersinde atomla tanışmıştınız: minicik, ağır bir **çekirdek** çevresinde bir elektron bulutu. Şimdi sonuna kadar yakınlaşıyoruz. Çekirdek yalnızca iki tür parçacıktan kuruludur — **protonlar** (+1 yüklü) ve **nötronlar** (yüksüz) — ki ikisine birlikte **nükleon** denir. Bir futbol topu boyutunda bir çekirdek, bir dağ kadar tartardı; çünkü atomun neredeyse bütün kütlesi oraya tıkalıdır.' },
      { t: 'h', text: 'Nükleon saymak: $^{A}_{Z}\\mathrm{X}$ gösterimi' },
      { t: 'p', text: 'Nükleer fizikçiler her çekirdeği $^{A}_{Z}\\mathrm{X}$ biçiminde yazar; $\\mathrm{X}$ kimyasal simgedir. İki sayı iki ayrı iş yapar: $Z$ (**atom numarası**) protonları sayar ve elementin hangisi olduğuna karar verir; $A$ (**kütle numarası**) bütün nükleonları sayar. Nötron sayısı $N$ ise geriye kalandır:' },
      { t: 'formula', caption: 'kütle numarası $A$ = protonlar $Z$ + nötronlar $N$. Örnek: $^{235}_{\\ 92}\\mathrm{U}$ için $Z = 92$, $A = 235$; dolayısıyla $N = 235 - 92 = 143$.' },
      { t: 'p', text: '**İzotoplar**, aynı $Z$’ye ama farklı $N$’ye sahip atomlardır: karbon-12 ($^{12}\\mathrm{C}$, 6 nötron) ile karbon-14 ($^{14}\\mathrm{C}$, 8 nötron) ikisi de karbondur, çünkü ikisi de 6 proton taşır. Fazla nötronlar kütleyi (ve kararlılığı!) değiştirir ama kimyayı değiştirmez.' },
      { t: 'h', text: 'Her çekirdekteki halat çekme mücadelesi' },
      { t: 'p', text: 'Protonların hepsi **elektrik kuvvetiyle** birbirini iter — bu kuvvet her uzaklıkta etkir ve kalabalık bir çekirdekte vahşileşir. Kalabalığı bir arada tutan ise **güçlü kuvvettir**: nükleonlar arasındaki kocaman bir çekim, ama yalnızca neredeyse değecek kadar yaklaştıklarında (yaklaşık $10^{-15}\\ \\mathrm{m}$). **Nötronlar barışı koruyanlardır**: hiçbir itme eklemeden güçlü-kuvvet yapıştırıcısı eklerler. Büyük çekirdeklerin hep protondan fazla nötron taşıması bundandır.' },
      { t: 'p', text: 'Bilinen her izotopu, $Z$ yatayda ve $N$ düşeyde olacak biçimde birer nokta olarak işaretleyin; kararlılar **kararlılık vadisi** denen kıvrımlı bir kuşak oluşturur. Hafif çekirdekler $Z \\approx N$’den hoşlanır (karbon-12: 6 ve 6); ağır çekirdekler $N > Z$ tarafına kayar (uranyum-238: 92 proton ama 146 nötron). Kuşağın dışındaki çekirdekler kararsızdır — geri tırmanana dek **bozunurlar**.' },
      { t: 'table', headers: ['İzotop', '$Z$', '$N$', '$A$', 'Kararlı mı?'], rows: [
        ['Hidrojen-1 (protiyum)', '1', '0', '1', 'Evet'],
        ['Hidrojen-2 (döteryum)', '1', '1', '2', 'Evet'],
        ['Hidrojen-3 (trityum)', '1', '2', '3', 'Hayır — $\\beta^-$, 12.3 yıl'],
        ['Karbon-12', '6', '6', '12', 'Evet — karbonun %98.9’u'],
        ['Karbon-14', '6', '8', '14', 'Hayır — $\\beta^-$, 5730 yıl'],
        ['Uranyum-235', '92', '143', '235', 'Hayır — $\\alpha$, 704 milyon yıl'],
        ['Uranyum-238', '92', '146', '238', 'Hayır — $\\alpha$, 4.5 milyar yıl'],
      ] },
      { t: 'h', text: 'Bağlanma enerjisi: kayıp kütle' },
      { t: 'p', text: 'Bir çekirdeği tartın; terazi parçalarının toplamından **daha az** gösterir. Kayıp kütle, yani **kütle açığı** $\\Delta m$, yok olmadı — nükleonlar birbirine kilitlenirken açığa çıktı. Kütle ile enerji tek şeyin iki yüzüdür ve Einstein’ın ünlü bağıntısı ikisini bağlar:' },
      { t: 'formula', caption: 'bağlanma enerjisi $E_b$ joule (ya da MeV), kütle açığı $\\Delta m$ kg, $c = 3.0 \\times 10^8\\ \\mathrm{m/s}$. İşe yarar bir ölçek: $1\\ \\mathrm{u}$ kütle ↔ $931.5\\ \\mathrm{MeV}$.' },
      { t: 'p', text: 'Çekirdekleri adil karşılaştırmak için nükleon sayısına bölün: **nükleon başına bağlanma enerjisi**. Hidrojenden dik bir tırmanışla yükselir, **demir-56**’da nükleon başına yaklaşık **8.8 MeV** ile doruğa ulaşır — evrendeki en sıkı bağlanmış çekirdek — sonra uranyuma doğru yavaşça alçalır. Nükleonlar hep demire doğru dizilirler: hafif çekirdekler **füzyonla**, ağır olanlar **fisyonla** enerji açığa çıkarabilir (o da p9 dersi).' },
      { t: 'h', text: 'Üç türlü bozunum' },
      { t: 'list', items: [
        '**Alfa ($\\alpha$) bozunumu** — çekirdek bir $\\alpha$ parçacığı öksürür; o da bir helyum-4 çekirdeğidir: 2 proton + 2 nötron. Böylece $A$ 4 azalır, $Z$ 2 azalır. Bu, fazlaca büyümüş çekirdeklerin kaçış yoludur.',
        '**Eksi beta ($\\beta^-$) bozunumu** — bir nötron protona dönüşür ve bir elektronla neredeyse saptanamayan bir antinötrino savurur: $\\mathrm{n} \\rightarrow \\mathrm{p} + e^- + \\bar{\\nu}_e$. Böylece $Z$ 1 artarken $A$ yerinde sayar. Bu, **fazla nötronlu** çekirdekleri düzeltir.',
        '**Gama ($\\gamma$) bozunumu** — çekirdek, öteki bir değişimden sonra arta kalan enerjiyi yüksek enerjili bir foton olarak püskürtür. Ne $A$ ne de $Z$ değişir; yalnızca çekirdek rahatlar.',
      ] },
      { t: 'p', text: 'Her bozunum denklemi bir muhasebe sayfası gibi dengelenmelidir: $A$ toplamları ve $Z$ toplamları iki tarafta eşleşmelidir. Herhangi bir denklemi iki hızlı toplamayla denetleyin — sahte nükleer tepkimeleri yakalama süper gücünüz budur.' },
      { t: 'key', text: '$A = Z + N$. Kararlı çekirdekler vadide yaşar ($N \\approx Z$ hafif, $N > Z$ ağır); kısa menzilli güçlü kuvvet onları elektrik itmesine karşı tutar. Kütle açığı, $E_b = \\Delta m c^2$ demektir ve demir-56’da dorulur. Bozunumlar dengeyi kurar: $\\alpha$ ($A-4$, $Z-2$), $\\beta^-$ ($Z+1$, $A$ aynı), $\\gamma$ (hiçbir şey değişmez).' },
    ],
    example: {
      title: 'Uranyum-238 bozunumunu dengelemek',
      problem: 'Uranyum-238 ($^{238}_{\\ 92}\\mathrm{U}$) bir $\\alpha$ parçacığı salarak bozunuyor. Geride hangi çekirdek kalır? Karbon-14 ($^{14}_{\\ 6}\\mathrm{C}$) ise $\\beta^-$ bozunumundan sonra neye dönüşür?',
      steps: [
        { text: '$\\alpha$ parçacığını tanımlayın: bir helyum-4 çekirdeğidir; $A = 4$ ve $Z = 2$’yi beraberinde götürür.' },
        { text: 'Kütle numarası $A$’yı koruyun: $238 = A_{\\text{daughter}} + 4$; demek ki yavru çekirdekte $A = 234$.' },
        { text: 'Atom numarası $Z$’yi koruyun: $92 = Z_{\\text{daughter}} + 2$; demek ki $Z = 90$. 90 numaralı element toryumdur.' },
        { text: 'Dengeli denklemi yazın (denetim: $234 + 4 = 238$ ✓ ve $90 + 2 = 92$ ✓):' },
        { text: 'Karbon-14 için $\\beta^-$, bir nötronu protona çevirir: $Z$, $6 \\rightarrow 7$’ye gider (azot!) ve $A$ 14 kalır.' },
      ],
      answer: '$^{238}\\mathrm{U} \\rightarrow {}^{234}\\mathrm{Th} + {}^{4}\\mathrm{He}$ (toryum-234) ve $^{14}\\mathrm{C} \\rightarrow {}^{14}\\mathrm{N} + e^- + \\bar{\\nu}_e$ (azot-14). İki taraf da $A$ ve $Z$’de dengededir.',
    },
    questions: {
      'p8-nuclear-structure-p1': {
        prompt: 'Radyon-222 ($Z = 86$) bir $\\alpha$ parçacığı salarak bozunuyor. Yavru çekirdeğin kütle numarası $A$ kaçtır?',
        hints: [
          'Bir $\\alpha$ parçacığı 4 nükleon götürür (2 proton + 2 nötron).',
          '$A$’yı koruyun: yavrunun $A$’sı artı 4, 222’ye eşit olmalı.',
        ],
        explanation: '$A$ dengelenir: $222 - 4 = 218$ — yavru, polonyum-218’dir ($Z = 86 - 2 = 84$).',
      },
      'p8-nuclear-structure-p2': {
        prompt: 'Fazla nötronlu bir çekirdek $\\beta^-$ ile bozunuyor. $Z$’ye ve $A$’ya ne olur?',
        choices: [
          '$Z$ 1 artar, $A$ aynı kalır',
          '$Z$ 1 azalır, $A$ aynı kalır',
          '$A$ 4 azalır, $Z$ 2 azalır',
          'Ne $Z$ ne de $A$ değişir',
        ],
        hints: [
          '$\\beta^-$ bir nötronu protona çevirir.',
          'Bir nötron proton olur: proton sayısı artar, toplam nükleon sayısı artmaz.',
        ],
        explanation: '$\\beta^-$ bozunumunda $\\mathrm{n} \\rightarrow \\mathrm{p} + e^- + \\bar{\\nu}_e$ olur: bir nötron çekilir ama $A$ sayısı değişmez; bir proton katılır, o yüzden $Z \\rightarrow Z + 1$.',
      },
      'p8-nuclear-structure-p3': {
        prompt: 'Uranyum-235’te $Z = 92$’dir. Bir uranyum-235 çekirdeği kaç nötron içerir?',
        hints: [
          '$A = Z + N$’yi $N$ için düzenleyin.',
          '$N = A - Z = 235 - 92$.',
        ],
        explanation: '$N = A - Z = 235 - 92 = 143$ nötron — protonlardan %54 fazla; ağır bir çekirdek için kararlılık vadisinin tam istediği şey.',
      },
      'p8-nuclear-structure-p4': {
        prompt: 'Büyük kararlı çekirdekler neden hep protondan fazla nötron içerir?',
        choices: [
          'Nötronlar daha ağırdır, çekirdeği demirlerler',
          'Nötronlar, elektrik itmesi eklemeden güçlü-kuvvet yapıştırıcısı ekler',
          'Protonlar nötronları çeker ama birbirini iter; nötronlar da yerçekimini iptal eder',
          'Elektronlar protonları iter; nötronlar da boşlukları doldurur',
        ],
        hints: [
          'Hangi kuvvet protonları sıkıştırıp ayırır, hangisi nükleonları bir arada tutar?',
          'Nötron güçlü çekimi hisseder ama yük taşımaz; böylece hiç itme eklemez.',
        ],
        explanation: 'Protonlar arasındaki elektrik itmesi çekirdek büyüdükçe artar; ama kısa menzilli güçlü kuvvet yalnızca birbirine değen nükleonları bağlar. Fazla nötronlar, itme eklemeden **çekim** ekler — halat çekme mücadelesi yeniden kararlılığa döner.',
      },
      'p8-nuclear-structure-q1': {
        prompt: 'Karbon-14 $\\beta^-$ bozunumu geçirir ve azot-14 olur. Yavru çekirdeğin kütle numarası kaçtır?',
        hints: [
          '$\\beta^-$ bozunumunda bir nötron protona dönüşür.',
          'Toplam nükleon sayısı değişmez.',
        ],
        explanation: '$\\beta^-$ bozunumu bir nötronu protona çevirir; böylece $Z$: $6 \\rightarrow 7$ ama $A$, $14$ kalır. Yavru $^{14}\\mathrm{N}$’dir.',
      },
      'p8-nuclear-structure-q2': {
        prompt: 'Bir alfa parçacığı tam olarak şu demektir…',
        choices: [
          'bir hidrojen atomu',
          'bir helyum-4 çekirdeği',
          'hızlı bir elektron',
          'yüksek enerjili bir foton',
        ],
        hints: [
          'İçindekileri sayın: 2 proton ve 2 nötron.',
          'Hangi element $Z = 2$’ye sahiptir?',
        ],
        explanation: 'Bir $\\alpha$ parçacığı 2 proton ve 2 nötron taşır; $A = 4$ ve $Z = 2$ — tam bir helyum-4 çekirdeği. Sonradan elektron kapar ve sıradan helyum olur.',
      },
      'p8-nuclear-structure-q3': {
        prompt: 'Bir kalsiyum-40 çekirdeği 20 proton ve 20 nötron içerir. Kütle numarası $A$ kaçtır?',
        hints: [
          '$A = Z + N$’yi kullanın.',
          '$20 + 20$',
        ],
        explanation: '$A = Z + N = 20 + 20 = 40$. Kalsiyum-40, vadinin $N = Z$ doğrusunun tam üzerinde oturur — hafif çekirdekler simetriye bayılır.',
      },
      'p8-nuclear-structure-q4': {
        prompt: 'Hangi çekirdek nükleon başına en yüksek bağlanma enerjisine sahiptir ve böylece en kararlı nükleon dizilişini oluşturur?',
        choices: [
          'Hidrojen-1',
          'Helyum-4',
          'Demir-56',
          'Uranyum-235',
        ],
        hints: [
          'Nükleon başına bağlanma enerjisi eğrisini ve doruğunun yerini düşünün.',
          'Doruk, periyodik tablonun ortasındadır, uçlarında değil.',
        ],
        explanation: 'Nükleon başına bağlanma enerjisi **demir-56**’da yaklaşık $8.8\\ \\mathrm{MeV}$ ile dorulur. Hafif çekirdekler ona doğru füzyon yaparak, ağır çekirdekler ona doğru parçalanarak kazanırlar.',
      },
      'p8-nuclear-structure-q5': {
        prompt: 'Uyarılmış durumdaki bir çekirdek bir gama ışını yayar. $A$’ya ve $Z$’ye ne olur?',
        choices: [
          '$A$ 4, $Z$ 2 azalır',
          '$Z$ 1 artar',
          'Hem $A$ hem $Z$ aynı kalır',
          '$A$ 1 azalır',
        ],
        hints: [
          'Gama ışını salt enerjidir — bir foton.',
          'Çekirdekten hiçbir parçacık ayrılmaz; böylece hiçbir nükleon kaybolmaz ya da değişmez.',
        ],
        explanation: 'Bir $\\gamma$ fotonu salt enerji taşır; nükleon ya da yük taşımaz. Böylece $A$ ve $Z$ değişmez — çekirdek, yalnızca daha düşük bir enerji durumuna gevşer.',
      },
    },
  },
  'p9-nuclear-energy': {
    title: 'Nükleer Enerji: Fisyon ve Füzyon',
    tagline: 'Bir gram uranyum, bir bardak deniz suyu — çekirdeğin iki motoruyla tanışın.',
    objectives: [
      'Nükleer kütle açıklarını $E = mc^2$ ile salınan enerjiye çevirin',
      'Bir fisyon zincirleme tepkimesini ve reaktörlerin onu çubuklarla ve yavaşlatıcıyla nasıl dengede tuttuğunu açıklayın',
      'Fisyon ile füzyonu, bağlanma enerjisi eğrisini kullanarak nükleon başına karşılaştırın',
    ],
    concept: [
      { t: 'p', text: 'p8 dersi, nükleonların bağlandıklarında enerji saldığını — ve kayıp kütlenin $E = mc^2$ yoluyla enerji olarak ortaya çıktığını göstermişti. $c^2$ kocaman bir sayı olduğundan ($9 \\times 10^{16}$), **ufacık** bir kütle **devasa** bir enerji satın alır. Yalnızca bir gram maddeyi tümüyle dönüştürseniz $9 \\times 10^{13}\\ \\mathrm{J}$ elde edersiniz — kabaca 2,000 ton TNT’nin enerjisi. Nükleer tepkimeler bir çekirdeğin kütlesinin yalnızca yaklaşık %0.1’ini yeniden düzenler ve bu bile, gram başına kömür yakmaktan milyonlarca kat daha fazla enerjidir.' },
      { t: 'formula', caption: 'enerji $E$ joule, kütle $m$ kilogram, $c = 3.0 \\times 10^8\\ \\mathrm{m/s}$' },
      { t: 'h', text: 'Fisyon: devleri bölmek' },
      { t: 'p', text: 'Ağır çekirdekler bağlanma enerjisi eğrisinde alçakta dururlar — tıka basa dolmuş otobüsler gibidirler. Yavaş bir nötron bir uranyum-235 çekirdeğine süzülürse, çekirdek bir su balonu gibi sallanır ve 92 protonun elektrik itmesi onu, daha sıkı bağlanmış iki küçük parçaya, artı 2–3 boşta nötrona ve yaklaşık **200 MeV** enerjiye ayırır:' },
      { t: 'formula', caption: 'dengeyi kendiniz denetleyin: $A$: $236 = 141 + 92 + 3$ ✓ ve $Z$: $92 = 56 + 36$ ✓' },
      { t: 'p', text: 'O 2–3 kaçak nötronun her biri bir uranyum-235’e daha çarpıp onu da bölebilir: bir **zincirleme tepkime**. Her nesilde iki katına çıkarsa, birkaç yüz katlanma bir bombanın enerjisini salıverir — yakıt miktarının neden önemli olduğunu anlarsınız. **Kritik kütle** altında fazla nötron yüzeyden kaçar ve zincir söner; üstünde ise kontrolden çıkar.' },
      { t: 'p', text: 'Bir nükleer santral aynı tepkimeyi **yavaş ve kararlı** işletir. **Kontrol çubukları** (bor ya da kadmiyum) fazla nötronları emmek için içeri kayar; bir **yavaşlatıcı** (su) nötronları, uranyum-235’in en iyi yakaladığı hıza indirir. Mühendisler her fisyondan tam bir nötronu, bir sonraki fisiyonu tetikleyecek biçimde hedefler — biri girer, biri yanar, güç sabit. Tepkimeyi kesin; geri kalan parçalar yıllarca sıcak kalır.' },
      { t: 'p', text: 'Atık neden radyoaktiftir? Fisyon parçaları (bariyum-141 ve kripton-92 gibi), gereksinimlerinden çok daha fazla nötron barındıran bir çekirdekten gelirler — **nötronca zengindirler**. Bu yüzden bir dizi $\\beta^-$ bozunumuyla kararlılık vadisinden aşağı tırmanır, giderken ışınım savururlar. Bazıları saniyeler içinde bozunur; birkaçı (tükenmiş yakıttaki plütonyum-239 gibi) on binlerce yıl kalır.' },
      { t: 'h', text: 'Füzyon: cüceleri birleştirmek' },
      { t: 'p', text: 'Eğrinin hafif ucunda ters hamle kazanır: küçük çekirdekleri daha büyük, daha sıkı bağlanmış çekirdeklerde **kaynaştırmak**. Santraller için şampiyon tepkime, hidrojenin iki ağır izotopu olan döteryum–trityumdur:' },
      { t: 'formula', caption: 'denge denetimi: $A$: $2 + 3 = 4 + 1$ ✓ ve $Z$: $1 + 1 = 2$ ✓' },
      { t: 'p', text: 'Ama bir pürüz var. Her iki çekirdek de **pozitif yüklüdür**, birbirini iterler — **Coulomb bariyeri**. Güçlü kuvvetin onları kapmasına yetecek kadar (yaklaşık $10^{-15}\\ \\mathrm{m}$) yaklaşabilmeleri için korkunç bir hızla birbirine çarpmaları gerekir. Bu da yakıtı yaklaşık **100 milyon kelvin**e ısıtmak demektir — Güneş’in çekirdeğinden on kat sıcak — ve hiçbir duvarın dokunamadığı, **plazma** denen yüklü bir gaza dönüştürmek. Güneş, yalnızca 15 milyon K’de, kocaman basınç ve yavaş, çok adımlı bir yol kullanarak işi kotarır: **proton–proton zinciri**; dört proton sonunda bir helyum-4 kurar. Saniyede yaklaşık 600 milyon ton hidrojeni kaynaştırır ve salınan fotonların, yoğun çekirdekten savaşarak dışarı çıkması yaklaşık 100,000 yıl sürer.' },
      { t: 'p', text: 'Olay başına fisyon daha büyük görünür (200 MeV’e karşı 17.6 MeV). Ama **nükleon başına** sayın — adil karşılaştırma budur. İşe karışan nükleonlara bölün: D–T füzyonu nükleon başına $17.6 / 5 = 3.5\\ \\mathrm{MeV}$ verir; U-235 fisyonu ise $200 / 236 \\approx 0.85\\ \\mathrm{MeV}$. Füzyon, yakıtın kilogramı başına yaklaşık **dört kat** daha fazla enerji sıkar; çünkü bağlanma enerjisi yamacında demire doğru çok daha yukarı tırmanır.' },
      { t: 'table', headers: ['', 'Fisyon', 'Füzyon'], rows: [
        ['Yakıt', 'Uranyum-235, plütonyum-239 (madenden, sınırlı)', 'Deniz suyundan döteryum + lityumdan trityum'],
        ['Koşul', 'Bir nötron vuruşu — yakıt oda sıcaklığında çalışır', 'Coulomb bariyerine karşı ≈ 100 milyon K plazma'],
        ['Olay başına enerji', '≈ 200 MeV', '17.6 MeV'],
        ['Nükleon başına enerji', '≈ 0.85 MeV', '≈ 3.5 MeV — yaklaşık 4 kat fazla'],
        ['Atık', 'Radyoaktif parçalar, binlerce yıl sıcak', 'Helyum gazı — zararsız'],
        ['Kontrolsüz artma riski', 'Zincirleme tepkime etkin biçimde denetlenmelidir', 'Plazma bir şeye dokunursa saniyeler içinde soğur'],
      ] },
      { t: 'p', text: 'Son o satır, füzyonun güvenlik süper gücüdür: ne kritik kütle vardır ne de kontrolden çıkacak bir zincir. Bir füzyon reaktörü tökezlese, plazma soğur ve tepkime basitçe durur — erime olanaksızdır. Ve yakıt pratikte sonsuzdur: her 50 litre deniz suyunda yaklaşık 1 gram döteryum saklıdır.' },
      { t: 'key', text: 'Fisyon ağır çekirdekleri böler (her biri ≈ 200 MeV, zincirleme tepkime, radyoaktif atık); füzyon hafif çekirdekleri birleştirir (D–T için 17.6 MeV, ama nükleon başına ≈ 4 kat fazla; 100 MK gerekir, atık helyumdur). Her iki hamle de bağlanma enerjisi eğrisinde demir-56’ya doğru aşağı kayar.' },
    ],
    example: {
      title: 'Bir gram uranyum-235’teki enerji',
      problem: '1.0 g’lık bir uranyum-235 topağı tümüyle fisyonlanıyor; her fisyon yaklaşık 200 MeV salıyor. Ne kadar enerji salınır, joule ve MWh cinsinden?',
      steps: [
        { text: '1.0 g’daki çekirdekleri sayın. Uranyum-235’in mol kütlesi 235 g/mol’dür ve bir mol $N_A = 6.022 \\times 10^{23}$ çekirdek içerir:' },
        { text: 'Fisyon başına enerjiyle çarpın:' },
        { text: '$1\\ \\mathrm{MeV} = 1.602 \\times 10^{-13}\\ \\mathrm{J}$ ile joule’ye çevirin:' },
        { text: '$1\\ \\mathrm{MWh} = 3.6 \\times 10^{9}\\ \\mathrm{J}$ ile MWh’ye çevirin:' },
        { text: 'Bunu ölçekleyin: 1 g kömür yakmak yaklaşık 30 kJ salar. Uranyum topağı bundan $8.2 \\times 10^{10} / 3 \\times 10^{4} \\approx 2.7$ milyon kat fazlasını taşır — 1 MW’lik bir reaktörü yaklaşık bir gün çalıştırmaya yeter.' },
      ],
      answer: 'Bir gram uranyum-235 yaklaşık $8 \\times 10^{10}\\ \\mathrm{J} \\approx 23\\ \\mathrm{MWh}$ salar — parmağınızın ucunda taşıyabileceğiniz bir topaktan, bir santral günlüğü enerji.',
    },
    questions: {
      'p9-nuclear-energy-p1': {
        prompt: 'Bir döteryum–trityum füzyon tepkimesi 17.6 MeV’i 5 nükleon arasında paylaştırır (He-4’ün payı 4, nötronunki 1). Nükleon başına enerji kaç MeV’tir? (Bir ondalığa yuvarlayın.)',
        hints: [
          'Toplam enerjiyi nükleon sayısına bölün.',
          '$17.6 \\div 5$',
        ],
        explanation: '$17.6\\ \\mathrm{MeV} \\div 5\\ \\text{nucleons} = 3.52 \\approx 3.5\\ \\mathrm{MeV}$ nükleon başına — fisyonun $0.85\\ \\mathrm{MeV}$’inin yaklaşık dört katı; füzyonun kilogram başına daha güçlü motor olması bundandır.',
      },
      'p9-nuclear-energy-p2': {
        prompt: 'Bir nükleer reaktördeki kontrol çubukları tam olarak ne yapar?',
        choices: [
          'Yakıtı suyla soğuturlar',
          'Fazla nötronları emerler; böylece ortalama yalnızca yaklaşık bir nötron, fisyon başına bir sonrakini tetikler',
          'Nötronları hızlandırarak fisiyonu daha olası kılarlar',
          'Atığı kararlı kurşuna dönüştürürler',
        ],
        hints: [
          'Zincirleme tepkime, nötron popülasyonu yönetilerek denetlenir.',
          'Bor ve kadmiyum, nötron emmede şampiyondur.',
        ],
        explanation: 'Kontrol çubukları fazla nötronları emer ve zincirleme tepkimeyi, kabaca her fisyona bir sonraki fisiyona yetecek tek bir nötron düşecek inceliğe getirir — kontrolden çıkan bir katlanma yerine sabit güç. Çubukları çekin, güç artar; itin, azalır.',
      },
      'p9-nuclear-energy-p3': {
        prompt: 'Fisyonda ${}^{235}\\mathrm{U} + \\mathrm{n} \\rightarrow {}^{141}\\mathrm{Ba} + {}^{92}\\mathrm{Kr} + x\\,\\mathrm{n}$; denklemi dengelemek için kaç nötron $x$ salınır?',
        hints: [
          'Kütle numarası $A$’yı dengeleyin: sol taraf $235 + 1 = 236$ eder.',
          '$236 = 141 + 92 + x$',
        ],
        explanation: '$A$: $236 = 141 + 92 + x$ verir $x = 3$ nötron. (Yükler de tutar: $92 = 56 + 36$.) İşte zincirleme tepkimeyi olanaklı kılan, o 2–3 taze nötrondur.',
      },
      'p9-nuclear-energy-p4': {
        prompt: 'Füzyon yakıtı neden yaklaşık 100 milyon kelvine ısıtılmalıdır?',
        choices: [
          'Yakıt önce sıvıya erisin diye',
          'Metal duvarlardan elektronlar kaynasın diye',
          'Çünkü pozitif yüklü çekirdekler birbirini iter ve yalnızca kocaman hızlarla, güçlü kuvvetin kapacağı kadar yaklaşabilirler',
          'Çünkü nötronlar yalnızca yüksek sıcaklıkta var olur',
        ],
        hints: [
          'Dokunamadan önce iki çekirdeği hangi kuvvet iter?',
          'Yüksek sıcaklıkta çekirdekler, elektrik itmesini — Coulomb bariyerini — zorlayacak kadar hızlı hareket eder.',
        ],
        explanation: 'Her iki çekirdek de pozitif yüklüdür; elektrik itmesinden oluşan **Coulomb bariyeri**, onlarla kısa menzilli güçlü kuvvetin arasına dikilir. Yalnızca ~100 MK’de değecek kadar sert çarşırlar — o zaman füzyon tutuşur.',
      },
      'p9-nuclear-energy-q1': {
        prompt: '$E = mc^2$’yi $c = 3.0 \\times 10^8\\ \\mathrm{m/s}$ ile kullanırsanız, 1.0 g kütleyi dönüştürmek ne kadar enerji salar? Yanıtınızı $10^{13}\\ \\mathrm{J}$ katları cinsinden verin.',
        hints: [
          'Önce 1.0 g’ı kilograma çevirin: 0.001 kg.',
          '$E = 0.001 \\times (3.0 \\times 10^8)^2 = 9 \\times 10^{13}\\ \\mathrm{J}$.',
        ],
        explanation: '$E = mc^2 = 0.001\\ \\mathrm{kg} \\times 9 \\times 10^{16}\\ \\mathrm{m^2/s^2} = 9 \\times 10^{13}\\ \\mathrm{J}$ — yani $10^{13}\\ \\mathrm{J}$ katlarıyla 9; kabaca büyük bir kentin santrallerinin bir günlük üretimi.',
      },
      'p9-nuclear-energy-q2': {
        prompt: 'Baryum-141 gibi fisyon parçaları neden radyoaktiftir?',
        choices: [
          'Güçlü kuvvetin taşıyamayacağı kadar ağırdırlar',
          'Nötronca zengindirler; β⁻ bozunumlarıyla kararlılığa geri tırmanırlar',
          'Nötron çarpmasına uğradılar ve nötronlar sonsuza dek içlerinde kaldı',
          'Bölünme sırasında gama ışınlarını soğurdular',
        ],
        hints: [
          'Uranyum, küçük parçaların gereksiniminden çok daha fazla nötron taşır.',
          'Fazla nötronlu çekirdekler $\\mathrm{n} \\rightarrow \\mathrm{p} + e^- + \\bar{\\nu}_e$ ile kendilerini düzeltir.',
        ],
        explanation: 'Parçalar uranyumun nötron fazlasını miras alır; kararlılık vadisinin nötronca zengin tarafında dururlar. Zincirler halinde $\\beta^-$ bozunurlar (nötron → proton), kimi zaman binlerce yıl — tükenmiş yakıtı tehlikeli kılan da budur.',
      },
      'p9-nuclear-energy-q3': {
        prompt: 'D–T füzyonunda 17.6 MeV paylaşılır: nötron 14.1 MeV götürür. Helyum-4 çekirdeği kaç MeV alır?',
        hints: [
          'İki payın toplamı bütüne eşit olmalı.',
          '$17.6 - 14.1$',
        ],
        explanation: '$17.6 - 14.1 = 3.5\\ \\mathrm{MeV}$. Hafif nötron (elektrik itmesi hissetmez) enerjinin çoğunu savurup gider; ağır helyum-4 kalanıyla geri teper — momentum defter tutma iş başında.',
      },
      'p9-nuclear-energy-q4': {
        prompt: 'Füzyon, nükleon başına fisyondan neden daha çok enerji salar?',
        choices: [
          'Çünkü helyum çekirdekleri uranyum çekirdeklerinden hafiftir',
          'Çünkü bağlanma enerjisi eğrisi hafif çekirdeklerden demire doğru dik yükselir; böylece hafif çekirdekleri kaynaştırmak, ağır olanları bölmekten çok daha yukarı tırmanır',
          'Çünkü füzyon daha yüksek sıcaklıkta olur',
          'Çünkü fisyon enerjiyi nötronlara harcar',
        ],
        hints: [
          'Salınan enerji = nükleon başına bağlanma enerjisindeki kazançtır.',
          'Eğrinin eğimine bakın: demir-56’nın hafif yanında dik, ağır yanında yumuşak.',
        ],
        explanation: 'Nükleon başına bağlanma enerjisi demir-56’da dorulur ($\\approx 8.8\\ \\mathrm{MeV}$). D–T füzyonu ≈ 1–2.6’dan ≈ 7 MeV/nükleona tırmanır; U-235 fisyonu ise yalnızca ≈ 7.6’dan, parçalarla ortalanmış ≈ 8.3 bölgesi değerlerine kayar — net $\\approx 0.85\\ \\mathrm{MeV}$ nükleon başına, füzyonun $3.5$’üne karşı.',
      },
      'p9-nuclear-energy-q5': {
        prompt: 'Bir nükleer santral neden fisyon bombası gibi PATLAYAMAZ?',
        choices: [
          'Yakıtı yalnızca %3–5 bölünebilir U-235 içerir ve kontrol çubukları nötron popülasyonunu fisyon başına birde tutar',
          'Reaktör duvarları bombaya dayanıklıdır',
          'Fisyon, patlamak için çok az enerji salar',
          'Yavaşlatıcı yakıtı katılaşıncaya dek dondurur',
        ],
        hints: [
          'Bir bomba, kritik kütle üstüne yığılmış, nötron emen hiçbir şeyi olmayan neredeyse saf bölünebilir malzeme ister.',
          '%3–5 zenginleştirmeyi bombalık ~%90 ile karşılaştırın ve çubukların görevini hatırlayın.',
        ],
        explanation: 'Reaktör yakıtı hafif zenginleştirilmiştir (%3–5 U-235) ve nötron emen kontrol çubuklarıyla örülüdür; zincirleme tepkime nesil başına güç belâ bir kez çoğalır — aşırı ısınıp zarar görebilir ama fiziksel olarak bombalık bir zincirin patlayıcı katlanmasını işletemez.',
      },
    },
  },
  'p10-particles-cosmos': {
    title: 'Parçacıklar ve Kozmos',
    tagline: 'Kuarkları protonlara ve piyonlara dizin, sonra evreni ilk üç dakikasına geri sarın.',
    objectives: [
      'Standart model ailelerini ve her kuarkın ve leptonun elektrik yükünü adlandırın',
      'Protonları, nötronları ve piyonları kuarklardan kurun ve yüklerini doğrulayın',
      'Kozmik zaman çizelgesini Büyük Patlama’dan KMA’ya (kozmik mikrodalga arka plan) anlatın ve $v = H_0 d$’yi kullanın',
    ],
    concept: [
      { t: 'p', text: 'Atomların çekirdekleri vardır, çekirdeklerin nükleonları — ve nükleonlar, ortaya çıktı, hiç de temel değiller. Yeterince sert çarpın; her proton ya da nötron içindeki **üç kuarkı** ele verir. Fizikçiler altı kuark buldu (garip ama sevimli adlarla: yukarı, aşağı, tılsım, tuhaf, üst, alt) ve altı **lepton** (elektron, daha ağır müon ve tau, artı üç hayalet nötrino). Her birinin, ters yüklü bir antimadde ikizi var.' },
      { t: 'h', text: 'Standart modelin kadrosu' },
      { t: 'p', text: 'Doğanın defter tutması, madde parçacıklarını birkaç aileye ayırır; dört kuvvet bunları birbirine yapıştırır. O kuvvetlerden üçü **standart modelin** içindedir ve her birinin taşıyıcı bir parçacığı vardır: **foton** (elektromanyetizma), **gluonlar** (güçlü kuvvet) ve **W ve Z bozonları** (zayıf kuvvet; $\\beta$ bozunumunu çalıştıran odur). Yerçekimi — dördüncü kuvvet — parçacıklar için fazlaca cılızdır ve kuantum tasvirini hâlâ beklemektedir.' },
      { t: 'table', headers: ['Aile', 'Üyeler', 'Elektrik yükü'], rows: [
        ['Yukarı-tipi kuarklar', 'yukarı (u), tılsım (c), üst (t)', 'her biri $+\\tfrac{2}{3}$'],
        ['Aşağı-tipi kuarklar', 'aşağı (d), tuhaf (s), alt (b)', 'her biri $-\\tfrac{1}{3}$'],
        ['Yüklü leptonlar', 'elektron $e^-$, müon $\\mu^-$, tau $\\tau^-$', 'her biri $-1$'],
        ['Nötrinolar', '$\\nu_e,\\ \\nu_\\mu,\\ \\nu_\\tau$', '$0$'],
        ['Kuvvet taşıyıcıları', 'foton, gluon, $W^+ W^- Z$', '$0$ (ama $W^\\pm = \\pm 1$)'],
      ] },
      { t: 'h', text: 'Kuarklarla inşa' },
      { t: 'p', text: 'Kuarklar asla yalnız gezmeyebilir — yalnızca iki yasal dizilişte takım kurarlar. **Baryonlar** üç kuark taşır (protonlar ve nötronlar budur); **mezonlar** bir kuarkı bir antikuarkla eşler (piyonlar ve kuzenleri budur). Hile şudur: kesirli yükler her zaman tam sayıya toplanır:' },
      { t: 'formula', caption: 'proton = uud. Nötron = udd: $\\tfrac{2}{3} - \\tfrac{1}{3} - \\tfrac{1}{3} = 0$. Piyon $\\pi^+ = u\\bar{d}$: $\\tfrac{2}{3} + \\tfrac{1}{3} = +1$.' },
      { t: 'p', text: 'Neden yalnız bu dizilişler? Kuarklar, **renk yükü** denen, güçlü kuvvete ait ek bir özellik taşır — kırmızı, yeşil, mavi diye düşünün. Doğa yalnızca **renk bakımından nötr** bileşimleri kabul eder: her renkten birer tane (üç kuark) ya da bir renk artı onun antirengi (kuark + antikuark). Renkler arasındaki güçlü kuvvet o denli serttir ki iki kuarkı ayırmaya kalkmak, enerjiden marka yeni kuarklar doğurur — kuarklar için hücre hapsi.' },
      { t: 'p', text: '**Antimadde** bilim kurgu değildir: yukarıdaki her parçacığın ters yüklü bir ikizi var ($\\bar{u}$ kuarkının yükü $-\\tfrac{2}{3}$; pozitron, pozitif bir elektrondur). Madde ile antimaddeyi bir araya getirin; saf enerjiye **yok olurlar** — kütlesi $m$ olan bir parçacık ile antiparçacığı, $E = 2mc^2$ değerinde enerjiyi fotonlar olarak salar. Bir elektron–pozitron çifti tam olarak 1.022 MeV gama ışını üretir.' },
      { t: 'h', text: 'Evrenin bebek albümü' },
      { t: 'list', items: [
        '$t = 0$ — **Büyük Patlama**: uzayın kendisi, kuark, elektron ve ışıktan oluşan kızgın bir çorbadan fışkırır.',
        '$t \\approx 1\\ \\mu\\mathrm{s}$ — ortam, kuarkların ilk proton ve nötronlara kilitlenmesine yetecek kadar soğur.',
        '$t \\approx 3\\ \\mathrm{min}$ — çekirdekler kurulur: çoğunlukla hidrojen ve helyum. **Henüz karbon yok, oksijen yok** — evren kütlece %75 hidrojendir.',
        '$t \\approx 380{,}000\\ \\mathrm{yr}$ — elektronlar sonunda çekirdeklerin çevresine yerleşir: ilk eksiksiz **atomlar**. Işık bir anda serbest akar — o kızartıyı bugün hâlâ **kozmik mikrodalga arka plan (CMB)** olarak yakalarız; 2.7 K’ye soğumuş hâlde.',
        '$t \\approx 100{-}400\\ \\mathrm{Myr}$ — yerçekimi gazı ilk **yıldız ve galaksilere** toplar; onlar karbonu, oksijeni ve demiri döverek işler.',
        '$t \\approx 9.2\\ \\mathrm{Gyr}$ — sessiz bir sarmal kolda, **Güneşimiz ve Dünyamız** geri dönüştürülmüş yıldız malzemesinden oluşur (4.6 Gyr önce).',
        'Bugün — $t = 13.8\\ \\mathrm{Gyr}$. Uzay genişlemeyi sürdürür: galaksi ne kadar uzaksa o kadar hızlı uzaklaşır; **Hubble yasası** bunu söyler.',
      ] },
      { t: 'formula', caption: 'uzaklaşma hızı $v$, uzaklık $d$, Hubble sabiti $H_0 \\approx 70\\ \\mathrm{km/s/Mpc}$ (1 Mpc = 3.26 milyon ışık yılı)' },
      { t: 'p', text: 'Ve işte bedeninizin çoktan bildiği asıl sonuç: hücrelerinizdeki her karbon atomu bir yıldızın içinde kaynaştı, her oksijen ve demir atomu da. Süpernovalar onları savurdu; 4.6 milyar yıl sonra siz oldular. **Biz yıldız tozuyuz** — 13.8 milyar yıllık bir geçmişle; standart modelin kuarkları da birinci bölümü yazıyor.' },
      { t: 'key', text: 'Kuarklar ($u\\,c\\,t$ $+\\tfrac{2}{3}$’te, $d\\,s\\,b$ $-\\tfrac{1}{3}$’te) baryonları (qqq) — proton (uud, +1) gibi — ve mezonları ($q\\bar{q}$) — $\\pi^+ (u\\bar{d}, +1)$ gibi — kurar. Kuvvetler foton, gluon ve W/Z sırtına biner. Kozmos, kuark çorbasından atomlara 380,000 yılda soğudu; ~400 Myr’ye dek ilk yıldızları yaktı ve bugün de $v = H_0 d$ ile genişliyor.' },
    ],
    example: {
      title: 'Yükler tutuyor — kuarklardan Hubble’a',
      problem: 'Protonun, nötronun, piyon $\\pi^+$’nın ve alfa parçacığının yükünü kuark (ya da nükleon) içeriklerinden doğrulayın. Sonra 100 Mpc uzaktaki bir galaksinin uzaklaşma hızını ve kızıla kayma $z$’sini bulun.',
      steps: [
        { text: 'Proton = uud (iki yukarı, bir aşağı):' },
        { text: 'Nötron = udd (bir yukarı, iki aşağı):' },
        { text: 'Piyon $\\pi^+$ = bir yukarı kuark artı bir aşağı-antikuark ($\\bar{d}$, $+\\tfrac{1}{3}$ taşır):' },
        { text: 'Alfa parçacığı = 2 proton + 2 nötron; yükü ve kütle numarası şöyle olur:' },
        { text: '$d = 100\\ \\mathrm{Mpc}$ uzaktaki galaksi için $H_0 = 70\\ \\mathrm{km/s/Mpc}$ ile Hubble yasası; sonra kızıla kayması $z \\approx v/c$:' },
      ],
      answer: 'Proton $+1$, nötron $0$, $\\pi^+$ $+1$, alfa $+2$ — her yük, standart modelin istediği gibi tam sayıdır. Galaksi $7000\\ \\mathrm{km/s}$ ile uzaklaşır; demek ki $z \\approx 0.023$.',
    },
    questions: {
      'p10-particles-cosmos-p1': {
        prompt: '$H_0 = 70\\ \\mathrm{km/s/Mpc}$ ile, 200 Mpc uzaktaki bir galaksinin uzaklaşma hızı kaç km/s’dir?',
        hints: [
          'Hubble yasası: $v = H_0 d$.',
          '$70 \\times 200$',
        ],
        explanation: '$v = H_0 d = 70\\ \\mathrm{km/s/Mpc} \\times 200\\ \\mathrm{Mpc} = 14{,}000\\ \\mathrm{km/s}$. Uzaklığı ikiye katlayın, hız da ikiye katlanır — bu doğru-orantı, genişleyen evrenin imzasıdır.',
      },
      'p10-particles-cosmos-p2': {
        prompt: 'Hangi kuark bileşimi bir nötron kurar?',
        choices: [
          'uud',
          'udd',
          'uuu',
          '$u\\bar{d}$',
        ],
        hints: [
          'Nötron bir baryondur: üç kuark, ve yükü 0 olmalı.',
          'Bir yukarı kuark ($+\\tfrac{2}{3}$) artı iki aşağı kuark (her biri $-\\tfrac{1}{3}$) sıfıra toplanır.',
        ],
        explanation: '$udd$: $\\tfrac{2}{3} - \\tfrac{1}{3} - \\tfrac{1}{3} = 0$ ✓. Karışımı uud yapın; yük $+1$ olur — o ise protondur.',
      },
      'p10-particles-cosmos-p3': {
        prompt: 'Proton uud’dır ve yükü +1’dir. Bir antiprotonun (ū ū d̄’den kurulu) elektrik yükü nedir?',
        hints: [
          'Bir antikuark, kuarkının ters yükünü taşır: ū, $-\\tfrac{2}{3}$; d̄, $+\\tfrac{1}{3}$.',
          'Üç antikuark yükünü toplayın.',
        ],
        explanation: 'Antiproton $= \\bar{u}\\bar{u}\\bar{d}$: $-\\tfrac{2}{3} - \\tfrac{2}{3} + \\tfrac{1}{3} = -1$. Her antiparçacık, parçacığının yükünü aynalar — karşılaşsalar ikisi de $2mc^2$’lik fotonlara dağılır.',
      },
      'p10-particles-cosmos-p4': {
        prompt: 'Büyük Patlama’dan sonra ilk eksiksiz atomlar ne kadar sonra oluştu?',
        choices: [
          'Yaklaşık 3 dakika',
          'Yaklaşık 380,000 yıl',
          'Yaklaşık 100 milyon yıl',
          '13.8 milyar yıl',
        ],
        hints: [
          'Atomlar, elektronların çekirdeklere bağlanmasına muhtaçtır — erken evren bunun için fazla sıcaktı.',
          'Çekirdekler 3 dakikada kuruldu; eksiksiz atomlar çok sonra geldi ve CMB’yi saldı.',
        ],
        explanation: 'Yaklaşık 380,000 yılda evren ~3,000 K’nin altına soğudu ve elektronlar çekirdeklere oturdu — nötr atomlar doğdu, ışık serbest aktı. O serbest kalan ışık, bugün saptadığımız kozmik mikrodalga arka plandır.',
      },
      'p10-particles-cosmos-q1': {
        prompt: 'Δ⁺⁺ baryonu üç yukarı kuarkdan kuruludur (uuu). Elektrik yükü, proton yükü birimleriyle kaçtır?',
        hints: [
          'Her yukarı kuark $+\\tfrac{2}{3}$ taşır.',
          '$\\tfrac{2}{3} + \\tfrac{2}{3} + \\tfrac{2}{3} = 2$',
        ],
        explanation: '$q = \\tfrac{2}{3} \\times 3 = +2$. Δ⁺⁺ vardır (uyarılmış bir rezonanstır) ama o yükle proton değildir — yaklaşık $10^{-24}\\ \\mathrm{s}$’de bozunur.',
      },
      'p10-particles-cosmos-q2': {
        prompt: 'Kuarklar arasındaki güçlü kuvveti hangi parçacık taşır?',
        choices: [
          'Foton',
          'Gluon',
          'W bozonu',
          'Nötrino',
        ],
        hints: [
          'Her kuvvetin kendi taşıyıcı parçacığı vardır.',
          'Adı ipucu: kuarkları “yapıştırır”.',
        ],
        explanation: '**Gluonlar** güçlü (renk) kuvveti taşır — renk yükünü kendileri de taşıdıkları için bu denli etkili bağlarlar. Fotonlar elektromanyetizmayı, W/Z zayıf kuvveti taşır.',
      },
      'p10-particles-cosmos-q3': {
        prompt: 'Bir galaksi 6,000 km/s ile uzaklaşıyor. $c = 300{,}000\\ \\mathrm{km/s}$ ile $z \\approx v/c$ kullanarak kızıla kayma $z$’sini kestirin.',
        hints: [
          '$c$’nin çok altındaki hızlar için $z \\approx v/c$.',
          '$6000 \\div 300{,}000$',
        ],
        explanation: '$z \\approx v/c = 6000 / 300{,}000 = 0.02$. Gökbilimciler bu kızıla kaymayı galaksinin tayf çizgilerinden okur — %2’lik bir uzama — ve Hubble yasası onu doğrudan uzaklığa çevirir.',
      },
      'p10-particles-cosmos-q4': {
        prompt: 'Hangi kuark bileşimi negatif piyon π⁻’ı kurar?',
        choices: [
          '$u\\bar{d}$',
          '$d\\bar{u}$',
          '$uud$',
          '$uuu$',
        ],
        hints: [
          'Bir piyon mezdur: bir kuark artı bir antikuark.',
          'Toplam yük $-1$ gerekir: $-\\tfrac{1}{3} + (-\\tfrac{2}{3})$’yi deneyin.',
        ],
        explanation: '$\\pi^- = d\\bar{u}$: $-\\tfrac{1}{3} + (-\\tfrac{2}{3}) = -1$ ✓. Pozitif ikizi $\\pi^+ = u\\bar{d}$, $+1$ taşır; $u\\bar{u}$ ya da $d\\bar{d}$ ise nötr $\\pi^0$’yı kurar.',
      },
      'p10-particles-cosmos-q5': {
        prompt: 'Gökbilimciler neden “biz yıldız tozuyuz” der?',
        choices: [
          'Çünkü Güneş her gün Dünya’ya toz savurur',
          'Çünkü kuyruklu yıldızlar bütün atomlarımızı uzaydan getirdi',
          'Çünkü bedenimizdeki karbon, oksijen ve demir, Güneş oluşmadan önce patlayan yıldızların içinde dövüldü',
          'Çünkü Dünya yalnızca Büyük Patlama’nın ilk atomlarının küllerinden oluştu',
        ],
        hints: [
          'Büyük Patlama yalnızca hidrojen ve helyum yaptı — sizin karbonunuz nereden geldi?',
          'Güneş’ten ağır yıldızlar elementleri demire dek kaynaştırır ve süpernovalarla savurur.',
        ],
        explanation: 'Erken evren yalnızca hidrojen ve helyumdu. Yıldızlar daha ağır elementleri kaynaştırdı; süpernovalar onları, sonradan Güneş sistemi olan gaz bulutuna savurdu — hücrelerinizdeki karbon ve kanınızdaki demir, yıldızda dövülmüş geri dönüştürülmüş atomlardır.',
      },
    },
  },
}

export default ov
