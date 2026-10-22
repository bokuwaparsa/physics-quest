// ─── Physics Quest · Turkish (tr) overlay · part-14: w5, w6 ───────────────────
import type { LessonOvFile } from '../schema'

const ov: LessonOvFile = {
  'w5-standing-waves': {
    title: 'Süperpozisyon ve Duran Dalgalar',
    tagline: 'İki dalga buluşur ve toplanır — sonra bir ip, pırıl pırıl halkalara kilitlenip bir gitar gibi söyleşmeye başlar.',
    objectives: [
      'Süperpozisyon ilkesini belirtin: üst üste binen dalgalar yer değiştirmelerini toplar',
      'İpteki duran dalgaları tanımlayın: düğümler, karınlar ve $\\lambda_n = 2L/n$ ile harmonikler',
      '$f_n = n\\,v/(2L)$ ve $v = \\sqrt{F/\\mu}$ kullanarak gitar ve piyanonun nasıl akort edildiğini açıklayın',
    ],
    concept: [
      { t: 'p', text: 'İki gitar telinde neredeyse aynı notayı aynı anda çalın; ürpertici bir şey olur: ses yer yer kabarabilir, sönebilir, hatta kaybolabilir. Aynı uzayı paylaşan iki dalga **birleşir** — ve bu birleşimin basit kuralları, en mütevazı ukuleleden dokuz ayaklı konser piyanosuna dek her müzik aletini inşa eder.' },
      { t: 'h', text: 'Süperpozisyon: dalgalar toplanır' },
      { t: 'p', text: '**Süperpozisyon ilkesi**: iki dalga üst üste bindiğinde her noktadaki toplam yer değiştirme, tekil yer değiştirmelerin **toplamıdır**. Tepede tepe → iki kat yüksek bir tepe (**yapıcı girişim**). Tepe, eşit bir çukura değerse → birbirini yok ederler, düz bir çizgi kalır (**yıkıcı girişim**). Ya sonra? Her dalga, hiç karşılaşmamış gibi aynen yoluna devam eder.' },
      { t: 'table', headers: ['İki dalga karşılaştığında…', 'Sonuç'], rows: [
        ['Tepe üzerinde tepe (aynı fazda)', 'Yapıcı: daha büyük dalga, $2\\times$ genliğe dek'],
        ['Tepe, eşit çukurda (tam zıt fazda)', 'Yıkıcı: birbirini yok eder — mutlak sükûnet'],
        ['Aradaki her durum', 'Kısmi: genlik, sıfır ile toplam arasında bir yerde'],
      ] },
      { t: 'h', text: 'İpteki duran dalgalar' },
      { t: 'p', text: 'Duvara bağlı ipin bir ucunu sallayın. Dalga aşağı koşar, **yansır** ve geri döner — artık aynı ip üzerinde iki özdeş dalga **zıt yönlerde** ilerliyor. Çiftin yapıcı toplandığı yerlerde ip en geniş salınır (**karınlar**); yok olduğu yerlerde ip hiç kımıldamaz (**düğümler**). Örüntü yerinde kalır, yalnızca yukarı aşağı atar: bir **duran dalga**.' },
      { t: 'key', text: 'İki ucu sabit bir ipin her ucunda bir düğüm olmak zorundadır. Uçlar arasında $n$ halka barındırabilir; her halka yarım dalga boyu genişliktedir: bu, n’inci harmoniktir.' },
      { t: 'formula', caption: 'n’inci harmoniğin dalga boyu $\\lambda_n$ m, ip uzunluğu $L$ m, harmonik sayısı $n = 1, 2, 3, \\ldots$ cinsinden' },
      { t: 'formula', caption: 'n’inci harmoniğin frekansı $f_n$ Hz; $f_1 = v/(2L)$ **temel frekanstır** (ipin en pes notası); dalga hızı $v$ m/s cinsinden' },
      { t: 'p', text: 'Hızı $v$ ne belirler? Daha gergin bir ip daha sert geri çekilir; bozulmalar üzerinde uçar. Daha ağır bir ip ise harekete tembeldir. İpteki dalga hızı şunu izler:' },
      { t: 'formula', caption: 'germe kuvveti $F$ newton ($\\mathrm{N}$), doğrusal yoğunluk $\\mu$ kg/m (bir metre ipin kütlesi) cinsinden' },
      { t: 'table', headers: ['Harmonik $n$', 'Dalga boyu $\\lambda_n = 2L/n$', 'Frekans $f_n = n\\,v/2L$'], rows: [
        ['1 (temel)', '$2L$', '$f_1$'],
        ['2', '$L$', '$2f_1$'],
        ['3', '$2L/3$', '$3f_1$'],
        ['4', '$L/2$', '$4f_1$'],
      ] },
      { t: 'list', items: [
        '**Germe**: ipi gerdirmek $v$’yi yükseltir; böylece her harmonik yükselir — akort vidasının işi budur. Hafif bir çelik tel (küçük $\\mu$), aynı boydaki kalın bir bas telinden daha tiz çınlar.',
        '**Uzunluk**: perdelerin arkasına parmak basmak $L$’yi kısaltır; $f_1 = v/2L$ yükselir — kısa ip, tiz nota. $v = 200\\ \\mathrm{m/s}$ iken $0.5\\ \\mathrm{m}$’lik bir ip $f_1 = 200\\ \\mathrm{Hz}$ söyler; harmonikler 400, 600, 800 Hz…',
        '**Rezonans**: salıncakı tam kendi doğal ritmiyle itin; büyür. İpi kendi $f_n$’lerinden biriyle sürün; enerjiyi yutar ve gürültüyle çınlar — buna **rezonans** denir.',
        '**Zengin tını**: çekilmiş bir tel gerçekte birkaç harmoniği aynı anda duyurur. $f_1, f_2, f_3, \\ldots$ karışımı, gitarla piyanonun aynı notayı çalarken bile farklı duyulmasının sebebidir.',
      ] },
      { t: 'key', text: 'Duran dalga tarifi: ipi sabitle, araya $n$ yarım dalga boyu sığdır. $\\lambda_n = 2L/n$, $f_n = n\\,v/2L$, $v = \\sqrt{F/\\mu}$. Bir aleti akort etmek; $F$’yi, $L$’yi ya da $\\mu$’yu, harmonikler kulağınızın istediği yere oturana dek ayarlamaktır.' },
    ],
    example: {
      title: 'Çelik teli akort etmek',
      problem: 'Bir çelik gitar telinin titreşen boyu $L = 0.5\\ \\mathrm{m}$, doğrusal yoğunluğu $\\mu = 0.004\\ \\mathrm{kg/m}$’dir ve $160\\ \\mathrm{N}$ germeyle akort edilmiştir. İpteki dalga hızını, temel frekansı ve 3. harmoniğin frekansını bulun.',
      steps: [
        { text: 'İpteki dalga hızını bulun:' },
        { text: 'Temel frekans, sabit uçlar arasına tam bir yarım dalga boyu yerleştirir:' },
        { text: 'Demek ki temel frekans:' },
        { text: 'Her harmonik, temel frekansı kendi numarasıyla çarpar:' },
      ],
      answer: 'Dalga $200\\ \\mathrm{m/s}$ ile koşar; tel temel frekansını $200\\ \\mathrm{Hz}$’de söyler (gerçek bir gitarın sol teli bu civardadır) ve 3. harmoniğini $600\\ \\mathrm{Hz}$’de.',
    },
    questions: {
      'w5-standing-waves-p1': {
        prompt: 'İki ucu sabit bir ipin uzunluğu 0.6 m. 3. harmoniğinin dalga boyu nedir?',
        hints: [
          'n’inci harmonik, uçlar arasına n yarım dalga boyu sıkıştırır: $\\lambda_n = 2L/n$.',
          '$2 \\times 0.6 = 1.2$; sonra $1.2 \\div 3$.',
        ],
        explanation: '$\\lambda_3 = 2L/3 = 2 \\times 0.6/3 = 0.4\\ \\mathrm{m}$ — üç yarım dalga boyu, 0.6 m’lik ipe tam oturur.',
      },
      'w5-standing-waves-p2': {
        prompt: 'Dalgalar, $90\\ \\mathrm{N}$ germe altındaki bir ipte $v = 300\\ \\mathrm{m/s}$ ile ilerliyor. İpin doğrusal yoğunluğu $\\mu$ nedir?',
        hints: [
          '$v = \\sqrt{F/\\mu}$’yı $\\mu = F/v^2$ biçimine getirin.',
          '$300^2 = 90{,}000$; yani $\\mu = 90 \\div 90{,}000$.',
        ],
        explanation: '$\\mu = F/v^2 = 90/(300)^2 = 90/90{,}000 = 0.001\\ \\mathrm{kg/m}$ — metrede bir gram; gerçekten hafif bir ip.',
      },
      'w5-standing-waves-p3': {
        prompt: 'Özdeş iki dalga tam aynı fazda kesişiyor — tepe tepeye. Üst üste bindikleri sırada ne olur?',
        choices: [
          'Birbirini yok ederler, düz bir çizgi kalır',
          'Geçip giderler; örtüşme kısa süreliğine iki kat genliğe ulaşır',
          'Birbirlerinden sekip geri dönerler',
          'Her iki dalga kalıcı olarak yok olur',
        ],
        hints: [
          'Süperpozisyon, yer değiştirmelerin her noktada toplandığını söyler.',
          'Aynı faz, tepeyi tepeye eklemek demektir: $+A$ artı $+A$.',
        ],
        explanation: 'Süperpozisyon gereği yer değiştirmeler toplanır: $A + A = 2A$ — **yapıcı** bir tepe. Kesiştikten sonra iki dalga da değişmeden yoluna devam eder; dalgalar karşılaşmakla birbirini yok etmez.',
      },
      'w5-standing-waves-p4': {
        prompt: 'Duran bir dalgada düğüm, … noktasıdır.',
        choices: [
          'ortamın en büyük genlikle salındığı',
          'ortamın hiç kımıldamadığı',
          'dalganın en hızlı ilerlediği',
          'iki tepenin toplandığı',
        ],
        hints: [
          'Düğümler örüntünün durgun noktaları; karınlar vahşi olanlarıdır.',
          'Düğümde zıt yönlü iki dalga her zaman tam olarak yok olur.',
        ],
        explanation: 'Düğümde iki ilerleyen dalga her zaman tam zıt fazdadır; yer değiştirme sonsuza dek sıfır kalır. En geniş salınım, düğümlerin tam ortasında, **karınlarda** olur.',
      },
      'w5-standing-waves-q1': {
        prompt: 'İki ucu sabit 1.0 m’lik bir ip var ve dalgalar üzerinde 400 m/s ile ilerliyor. Temel frekansı nedir?',
        hints: [
          'Temel harmonikte $\\lambda_1 = 2L$’dir. $f_1 = v/(2L)$ kullanın.',
          '$400 \\div (2 \\times 1.0)$',
        ],
        explanation: '$f_1 = v/(2L) = 400/(2 \\times 1.0) = 200\\ \\mathrm{Hz}$ — ipe 2 m’lik bir yarım dalga boyu oturur ve 400 m/s ÷ 2 m = saniyede 200 dalga.',
      },
      'w5-standing-waves-q2': {
        prompt: 'İpteki duran dalga aslında … sonucudur.',
        choices: [
          'zıt yönlerde ilerleyen iki özdeş dalganın',
          'bir dalganın duvar tarafından soğurulmasının',
          'aynı yönde yan yana ilerleyen iki dalganın',
          'ipin uzayıp kısalmasının',
        ],
        hints: [
          'Giden dalga ve yansımasını düşünün.',
          'Zıt yönlü iki dalga, ipin her yerinde girişim yapar.',
        ],
        explanation: 'Giden dalga ile yansıması **zıt yönlerde** ilerler ve üst üste biner. Girişim örüntüsü donmuş hâldedir: hep yok olan düğümler, hep güçlendiren karınlar.',
      },
      'w5-standing-waves-q3': {
        prompt: 'Bir piyano telinin temel frekansı 120 Hz. 5. harmoniğinin frekansı nedir?',
        hints: [
          'Harmonikler, temel frekansın tam sayı katlarıdır: $f_n = n\\,f_1$.',
          '$5 \\times 120$',
        ],
        explanation: '$f_5 = 5\\,f_1 = 5 \\times 120 = 600\\ \\mathrm{Hz}$. Harmonik ailenin tamamı 120, 240, 360, 480, 600 Hz…de durur.',
      },
      'w5-standing-waves-q4': {
        prompt: 'Bir ipteki germe kuvvetini dört katına çıkarıyorsunuz, başka hiçbir şey değişmiyor. İpteki dalga hızı…',
        choices: [
          'iki katına çıkar, çünkü $v = \\sqrt{F/\\mu}$',
          'dört katına çıkar, çünkü $v$ adım adım $F$ ile büyür',
          'yarıya iner',
          'aynı kalır',
        ],
        hints: [
          '$v = \\sqrt{F/\\mu}$’ye yakından bakın: germe kuvveti bir karekökün altında.',
          '$\\sqrt{4} = 2$',
        ],
        explanation: '$v = \\sqrt{F/\\mu}$: $F$’yi dört katlamak $v$’yi $\\sqrt{4} = 2$ ile çarpar — yalnızca iki kat. Akort vidasının son çeyrek turu, ilk turdan çok daha az tizlik kaydırır; sebebi budur.',
      },
      'w5-standing-waves-q5': {
        prompt: 'Bir tel 3 halkada (3. harmoniğinde) 240 Hz ile titreşiyor. Temel frekansı nedir?',
        hints: [
          '$f_n = n\\,f_1$; demek ki $f_1 = f_3/3$.',
          '$240 \\div 3$',
        ],
        explanation: '$f_1 = f_3/3 = 240/3 = 80\\ \\mathrm{Hz}$ — üç halka, temel frekansın üç katı demektir.',
      },
    },
  },

  'w6-beats-intensity': {
    title: 'Vurumlar ve Ses Yoğunluğu',
    tagline: 'Birbirine yakın iki nota vaah-vaah diye atar; ses uzaklıkla söner ve desibel merdiveni ne kadar gürültünün fazla gürültü olduğunu söyler.',
    objectives: [
      'Vurum frekansını öngörün: $f_{\\text{beat}} = |f_1 - f_2|$; müzisyenlerin vurumları dinleyerek nasıl akort ettiğini açıklayın',
      'Ses yoğunluğunu hesaplayın: $I = P/(4\\pi r^2)$; ters kare yasasını uygulayın',
      'Desibel ölçeğini nitel olarak okuyun: $+10\\ \\mathrm{dB}$ ≈ iki kat gürültülü; işitme ve ağrı eşiklerini bilin',
    ],
    concept: [
      { t: 'p', text: 'Piyanoda neredeyse — ama tam olarak değil — aynı notanın iki tuşuna basın. Temiz bir ton yerine yavaş bir **vaah… vaah… vaah** duymaya başlarsınız: ses, tamamen ses şiddetinden örülü bir siren gibi kabarıp söner. Bu atışa **vurum** denir ve piyano akortçularının ekmeğini kazandıran tam araçtır.' },
      { t: 'h', text: 'Vurum: ses şiddetinin kalp atışı' },
      { t: 'p', text: '$f_1$ ve $f_2$ frekansları birbirine yakın iki dalga, aralıksız birbirini geçip kovalar. Kimi zaman tepe tepeye gelir (gürültülü, yapıcı), az sonra tepe çukura değer (yumuşak, yıkıcı). Birleşik dalga durmadan kabarır büzülür — ses şiddeti şu hızla oynar:' },
      { t: 'formula', caption: 'vurum frekansı $f_{\\text{beat}}$ Hz — saniyedeki gürültü–sessiz atış sayısı; iki kaynağın frekansları $f_1, f_2$ Hz cinsinden' },
      { t: 'p', text: '440 Hz’lik bir diyapazonun yanındaki 442 Hz’lik diyapazon, saniyede $|442 - 440| = 2$ gürültü–sessiz çevrim verir. Frekanslardan birini diğerine doğru kaydırın; oynama yavaşlar… ta ki tamamen dursun — ikisinin tam akortta olduğunun işitsel işareti. Orkestralar böyle akort eder: vurumları dinleyin, kaybolana dek ayarlayın.' },
      { t: 'key', text: 'Vurumlar, yapıcı ve yıkıcı girişim arasındaki yavaş kaynaktan doğar. Vurum frekansı **farktır**: $|f_1 - f_2|$; vurumlar kaybolduğunda frekanslar eşleşmiştir.' },
      { t: 'h', text: 'Ses yoğunluğu ve ters kare yasası' },
      { t: 'p', text: '**Yoğunluk**, her metrekareye ne kadar ses gücü düştüğünü ölçer: $I = P/A$, watt bölü metrekare ($\\mathrm{W/m^2}$). Noktasal bir kaynak — hoparlör, havai fişek, bir ses — gücünü, dalga ilerledikçe büyüyen bir küre üzerine eşit biçimde püskürtür. Kürenin alanı $4\\pi r^2$’dir; yani aynı güç, gittikçe daha geniş bir yüzeye sürülür:' },
      { t: 'formula', caption: 'yoğunluk $I$ W/m², ses gücü $P$ W, uzaklık $r$ m cinsinden — **ters kare yasası**: $r$’yi ikiye katlayın, $I$ çeyreğe düşer' },
      { t: 'table', headers: ['Kaynaktan uzaklık', 'Küre alanı $4\\pi r^2$', 'Yoğunluk $I$'], rows: [
        ['1 m', '$4\\pi$ m²', 'tam yoğunluk'],
        ['2 m', '4 kat büyük', '1/4’ü'],
        ['3 m', '9 kat büyük', '1/9’u'],
        ['4 m', '16 kat büyük', '1/16’sı'],
      ] },
      { t: 'h', text: 'Desibel: ses şiddeti merdiveni' },
      { t: 'p', text: 'Kulağınız, trilyon katı bir aralığa yayılan yoğunluklarla baş eder; bu yüzden onları logaritmik **desibel (dB)** ölçeğine sıkıştırırız: dB cinsinden düzey $10\\,\\log_{10}(I/10^{-12})$’dir; buradaki $10^{-12}\\ \\mathrm{W/m^2}$, sağlıklı bir kulağın yakalayabildiği en soluk sestir. $+10\\ \\mathrm{dB}$’lik her adım $10\\times$ yoğunluk demektir — ama beyniniz yalnızca kabaca **iki kat ses şiddeti** duyar. $120\\ \\mathrm{dB}$’ye yaklaşırken sinyal acıya dönüşür.' },
      { t: 'table', headers: ['Günlük ses', 'Düzey'], rows: [
        ['İşitme eşiği', '0 dB'],
        ['Fısıltı', '≈ 30 dB'],
        ['Normal konuşma', '≈ 60 dB'],
        ['Yoğun trafik', '≈ 90 dB'],
        ['Rock konseri / ağrı eşiği', '≈ 110–120 dB'],
      ] },
      { t: 'list', items: [
        'Hoparlörden 1 m uzak durun, sonra 2 m, sonra 4 m: uzaklığın her iki katı, yoğunluğu **çeyreğe** düşürür ($I \\propto 1/r^2$). Ön sıra parayı gerçekten hak ediyor.',
        '$+10\\ \\mathrm{dB}$’lik sıçrama (konuşma → blender) fiziksel yoğunluğun 10 katıdır ama kulağınıza yalnızca kabaca iki kat gürültülü gelir.',
        'Yaklaşık 85 dB üstünde uzun süre kalmak işitmeye zarar verir; 120 dB ağrı eşiğinin ötesindedir. Kulak tıkacı, ucuz fizik zırhıdır.',
        'Piyano akortçuları, orkestra müzisyenleri ve hatta yarasa araştırmacıları vurumları kullanır: oynama yavaşlayıp durana dek ayarlayın.',
      ] },
    ],
    example: {
      title: 'Hoparlör ve kulağınız',
      problem: 'Bir hoparlör, $P = 0.5\\ \\mathrm{W}$ ses gücü yayıyor; gücü her yöne eşit biçimde dağılıyor. $2\\ \\mathrm{m}$ uzaktaki yoğunluk nedir ($\\mathrm{W/m^2}$ ve kabaca desibel)? $4\\ \\mathrm{m}$’ye geri çekilirse yoğunluğa ne olur?',
      steps: [
        { text: 'Hoparlörü noktasal kaynak sayın; $r = 2\\ \\mathrm{m}$’de güç, $4\\pi r^2 = 4\\pi \\times 4 \\approx 50.3\\ \\mathrm{m^2}$ alanlı bir küreye yayılır:' },
        { text: 'Bölün:' },
        { text: 'İşitme eşiği $10^{-12}\\ \\mathrm{W/m^2}$’ye karşı desibele çevirin:' },
        { text: '$r = 4\\ \\mathrm{m}$’ye geri çekilin: kürenin alanı $4\\times$ büyür, o yüzden:' },
      ],
      answer: '2 m’de yaklaşık $0.01\\ \\mathrm{W/m^2}$ (≈ 100 dB); 4 m’ye geri çekilmek bunu $0.0025\\ \\mathrm{W/m^2}$’ye düşürür — çeyreği. Uzaklığı iki katına çıkar, sesi çeyreğe indir.',
    },
    questions: {
      'w6-beats-intensity-p1': {
        prompt: '440 Hz’lik bir diyapazon, 443 Hz’deki ikinci bir diyapazonun yanında çınlıyor. Saniyede kaç vurum duyarsınız?',
        hints: [
          'Vurum, iki frekansın farkında olur: $f_{\\text{beat}} = |f_1 - f_2|$.',
          '$443 - 440$',
        ],
        explanation: '$f_{\\text{beat}} = |443 - 440| = 3\\ \\mathrm{Hz}$ — ses şiddeti her saniye 3 kez oynar.',
      },
      'w6-beats-intensity-p2': {
        prompt: 'Noktasal bir kaynaktan $2\\ \\mathrm{m}$ uzaklıkta yoğunluk $0.01\\ \\mathrm{W/m^2}$. $4\\ \\mathrm{m}$’ye geri çekiliyorsunuz. Oradaki yoğunluk nedir?',
        hints: [
          'Uzaklık iki katına çıkar; kürenin alanı $4\\times$ büyür — ters kare yasası.',
          '$0.01 \\div 4$',
        ],
        explanation: '$I \\propto 1/r^2$: $r$’yi iki katına çıkarmak yoğunluğu $2^2 = 4$’e böler; yani $I = 0.01/4 = 0.0025\\ \\mathrm{W/m^2}$.',
      },
      'w6-beats-intensity-p3': {
        prompt: 'Bir gitar telini 440 Hz’lik diyapizona karşı akort ediyor ve yavaş, yumuşak vurumlar duyuyorsunuz. Akortu bitirmek için…',
        choices: [
          'vurumlar hızlanana dek gerdirmelisiniz',
          'vurumlar yavaşlayıp kaybolana dek ayarlamalısınız',
          'tel zayılayıp boşalana dek gevşetmelisiniz',
          'vurumları bastırmak için daha gürültülü çalmalısınız',
        ],
        hints: [
          'Vurum frekansı frekans farkıdır — fark küçülürken ne olur?',
          'Kusursuz eşleşme, $|f_1 - f_2| = 0$ demektir.',
        ],
        explanation: 'Frekanslar yaklaşırken vurumlar yavaşlar ve eşleşince kaybolur. Hızlanan vurumlar, akorttan daha da uzaklaştığınızı gösterir.',
      },
      'w6-beats-intensity-p4': {
        prompt: 'Bir ses $+10\\ \\mathrm{dB}$ yükseliyor (örneğin 60 dB → 70 dB). Bu ne demektir?',
        choices: [
          'Yoğunluk 10 kat büyür ve kabaca iki kat gürültülü duyulur',
          'Yoğunluk iki katına çıkar ve iki kat gürültülü duyulur',
          'Hem yoğunluk hem gürültü aynı kalır',
          'Yoğunluk onda bire düşer',
        ],
        hints: [
          'Desibel ölçeği logaritmiktir: $+10\\ \\mathrm{dB}$ = $10\\times$ yoğunluk.',
          'Algılanan ses şiddeti, ham yoğunluktan çok daha yavaş büyür.',
        ],
        explanation: '$+10\\ \\mathrm{dB}$ fiziksel yoğunluğu 10 ile çarpar; ama beyin kabaca iki kat ses şiddeti kaydeder. Logaritmik dB ölçeğinin bu kadar kullanışlı olmasının nedeni tam da bu uyumsuzluktur.',
      },
      'w6-beats-intensity-q1': {
        prompt: 'İki diyapazon birlikte 512 Hz ve 505 Hz duyuruyor. Vurum frekansı nedir?',
        hints: [
          '$f_{\\text{beat}} = |f_1 - f_2|$.',
          '$512 - 505$',
        ],
        explanation: '$f_{\\text{beat}} = |512 - 505| = 7\\ \\mathrm{Hz}$ — saniyede yedi gürültü–sessiz atış.',
      },
      'w6-beats-intensity-q2': {
        prompt: 'Bir sokak müzisyeninden (noktasal kaynak) 1 m uzaklıktan 3 m’ye yürüyorsunuz. Kulağınıza ulaşan ses yoğunluğu…',
        choices: [
          '3 kat küçülür',
          '6 kat küçülür',
          '9 kat küçülür',
          'değişmez — yalnızca tizlik değişir',
        ],
        hints: [
          'Ters kare yasası: $I \\propto 1/r^2$.',
          '$(3/1)^2 = 9$',
        ],
        explanation: '$I = P/(4\\pi r^2)$: uzaklığı üçe katlamak yoğunluğu $3^2 = 9$ oranıyla keser. Ses uzaklıkla çabuk söner.',
      },
      'w6-beats-intensity-q3': {
        prompt: 'Bir hoparlörün $2\\ \\mathrm{m}$’deki yoğunluğu $0.08\\ \\mathrm{W/m^2}$. $4\\ \\mathrm{m}$’deki yoğunluk nedir?',
        hints: [
          'Uzaklığı iki katına çıkarmak yoğunluğu 4’e böler.',
          '$0.08 \\div 4$',
        ],
        explanation: '$I \\propto 1/r^2$; iki kat uzaklıkta $I = 0.08/4 = 0.02\\ \\mathrm{W/m^2}$.',
      },
      'w6-beats-intensity-q4': {
        prompt: 'Bir sesin yoğunluğu 100 kat büyüyor (yakındaki fısıltıya karşı bir bağırış). Desibel ölçeğinde bu…',
        choices: ['+20 dB', '+100 dB', '+2 dB', '+10 dB'],
        hints: [
          '$+10\\ \\mathrm{dB}$ = $10\\times$ yoğunluk; ölçek logaritmiktir.',
          '$10\\times$ sonra yine $10\\times$ = $100\\times$.',
        ],
        explanation: 'Her $+10\\ \\mathrm{dB}$ adımı 10 kat yoğunluktur; $100\\times$ ise $+20\\ \\mathrm{dB}$’dir — gerçi kulağınıza yalnızca kabaca 4 kat gürültülü gelir.',
      },
      'w6-beats-intensity-q5': {
        prompt: '440 Hz’lik bir diyapazon, hafif akort dışı bir telle birlikte saniyede 2 vurum veriyor. Telin frekansı … olabilir.',
        choices: [
          '438 Hz ya da 442 Hz',
          'yalnızca 442 Hz',
          '882 Hz',
          'tam olarak 440 Hz',
        ],
        hints: [
          '$|f - 440| = 2$ denkleminin 440 Hz çevresinde iki çözümü var.',
          'Tel 2 Hz tiz ya da 2 Hz pes olabilir.',
        ],
        explanation: '$|f - 440| = 2$ bize $f = 442\\ \\mathrm{Hz}$ (tiz) ya da $f = 438\\ \\mathrm{Hz}$ (pes) verir — vurumlar akort hatasının **büyüklüğünü** gösterir, işaretini değil.',
      },
    },
  },
}

export default ov
