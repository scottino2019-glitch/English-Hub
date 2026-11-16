/* ==========================================================================
   ENGLISH HUB — SCRIPT UNICO (/app.js)
   Modifica questo unico file per gestire menu, contenuti ed esercizi:
   1. Configurazione Menu & Footer (link assoluti)
   2. Contenuti (Frasi, Quiz, Cloze, Dialoghi, Flashcard, Falsi Amici, IPA)
   3. Sintesi Vocale (Web Speech API)
   4. Header & Footer Condivisi
   5. Inizializzazione delle singole pagine
   ========================================================================== */

(() => {
  /* === 1. CONFIGURAZIONE MENU & FOOTER === */
  const SITE_CONFIG = {
    brandName: 'English Hub',
    brandHomeUrl: '/',
    primaryCta: { label: 'Inizia Quiz', href: '/pages/quiz.html' },
    navLinks: [
      { label: 'Studio', href: '/' },
      { label: 'Quiz', href: '/pages/quiz.html' },
      { label: 'Esercizi', href: '/pages/esercizi.html' },
      { label: 'Dialogo', href: '/pages/dialogo.html' },
      { label: 'Cultura', href: '/pages/cultura.html' },
    ],
    footer: {
      title: 'Parla inglese con sicurezza, ogni giorno.',
      subtitle: 'Percorsi chiari per vocabolario, grammatica avanzata, dialoghi reali e pronuncia IPA.',
      ctaLabel: 'Esplora Pronuncia IPA',
      ctaHref: '/pages/pronuncia.html',
      links: [
        { label: 'Homepage Studio', href: '/' },
        { label: 'Quiz Vocabolario', href: '/pages/quiz.html' },
        { label: 'Esercizi Cloze', href: '/pages/esercizi.html' },
        { label: 'Dialoghi Reali', href: '/pages/dialogo.html' },
        { label: 'Cultura & False Friends', href: '/pages/cultura.html' },
        { label: 'Laboratorio IPA', href: '/pages/pronuncia.html' },
      ],
    },
  };

  /* === 2. CONTENUTI DIDATTICI === */
  const HERO_PHRASES = [
    {
      label: 'Saluto',
      variants: {
        'A1-A2': { en: 'Hello! Lovely to meet you.', ipa: '/həˈləʊ ˈlʌv.li tə miːt juː/', it: 'Ciao! È un vero piacere conoscerti.' },
        'B1-B2': { en: 'Good morning! It is a pleasure to finally meet you in person.', ipa: '/ɡʊd ˈmɔː.nɪŋ ɪt ɪz ə ˈpleʒ.ər tə ˈfaɪ.nəl.i miːt juː/', it: 'Buongiorno! È un piacere conoscerti finalmente di persona.' },
        'C1-C2': { en: 'How delightful to make your acquaintance at long last.', ipa: '/haʊ dɪˈlaɪt.fəl tə meɪk jɔːr əˈkweɪn.təns ət lɒŋ lɑːst/', it: 'Che gioia fare finalmente la tua conoscenza.' },
      },
    },
    {
      label: 'Come stai?',
      variants: {
        'A1-A2': { en: 'How are you doing today?', ipa: '/haʊ ɑː juː ˈduː.ɪŋ təˈdeɪ/', it: 'Come te la passi oggi?' },
        'B1-B2': { en: 'How have things been going for you lately?', ipa: '/haʊ həv θɪŋz biːn ˈɡəʊ.ɪŋ fɔː juː ˈleɪt.li/', it: 'Come sono andate le cose ultimamente?' },
        'C1-C2': { en: 'How have you been keeping amidst this busy week?', ipa: '/haʊ həv juː biːn ˈkiː.pɪŋ əˈmɪdst ðɪs ˈbɪz.i wiːk/', it: 'Come ti sei tenuto durante questa settimana intensa?' },
      },
    },
    {
      label: 'Provenienza',
      variants: {
        'A1-A2': { en: 'Where are you from originally?', ipa: '/weər ɑː juː frɒm əˈrɪdʒ.ən.əl.i/', it: 'Di dove sei originario?' },
        'B1-B2': { en: 'Which part of the country did you grow up in?', ipa: '/wɪtʃ pɑːt əv ðə ˈkʌn.tri dɪd juː ɡrəʊ ʌp ɪn/', it: 'In quale parte del paese sei cresciuto?' },
        'C1-C2': { en: 'Whereabouts do your roots lie, if you do not mind my asking?', ipa: '/ˌweər.əˈbaʊts duː jɔː ruːts laɪ/', it: 'Quali sono le tue origini, se posso permettermi di chiedere?' },
      },
    },
    {
      label: 'Presentazione',
      variants: {
        'A1-A2': { en: 'I am Italian and I live in Milan.', ipa: '/aɪ æm ɪˈtæl.jən ənd aɪ lɪv ɪn mɪˈlæn/', it: 'Sono italiano e vivo a Milano.' },
        'B1-B2': { en: 'I come from northern Italy, though I currently work abroad.', ipa: '/aɪ kʌm frɒm ˈnɔː.ðən ˈɪt.əl.i ðəʊ aɪ ˈkʌr.ənt.li wɜːk əˈbrɔːd/', it: 'Vengo dal nord Italia, anche se attualmente lavoro all’estero.' },
        'C1-C2': { en: 'I hail from Italy, yet I have spent the past decade immersing myself in British culture.', ipa: '/aɪ heɪl frɒm ˈɪt.əl.i jet aɪ həv spent ðə pɑːst ˈdek.eɪd/', it: 'Provengo dall’Italia, tuttavia ho trascorso l’ultimo decennio immergendomi nella cultura britannica.' },
      },
    },
    {
      label: 'Ringraziamento',
      variants: {
        'A1-A2': { en: 'Thank you so much for your help!', ipa: '/θæŋk juː səʊ mʌtʃ fɔː jɔː help/', it: 'Grazie mille per il tuo aiuto!' },
        'B1-B2': { en: 'I really appreciate you taking the time to assist me.', ipa: '/aɪ ˈrɪə.li əˈpriː.ʃi.eɪt juː ˈteɪ.kɪŋ ðə taɪm/', it: 'Apprezzo davvero che tu abbia dedicato del tempo ad aiutarmi.' },
        'C1-C2': { en: 'I am deeply indebted to you for your thoughtful generosity.', ipa: '/aɪ æm ˈdiːp.li ɪnˈdet.ɪd tə juː/', it: 'Ti sono profondamente grato per la tua premurosa generosità.' },
      },
    },
  ];

  const QUIZ_QUESTIONS = [
    {
      level: 'C1', xp: 50, term: 'Ubiquitous',
      prompt: 'Cosa significa l’aggettivo inglese “Ubiquitous”?',
      options: ['Molto raro e prezioso', 'Presente ovunque / Onnipresente', 'Antico e fuori uso', 'Rapido e imprevedibile'],
      correctIndex: 1,
      explanation: 'Deriva dal latino ubique (“dappertutto”). Esempio: “Smartphones have become ubiquitous in modern society.”',
    },
    {
      level: 'B2', xp: 40, term: 'To call it a day',
      prompt: 'Cosa indica l’espressione idiomatica “To call it a day”?',
      options: ['Smettere di lavorare per oggi', 'Fissare un appuntamento importante', 'Svegliarsi molto presto al mattino', 'Rinviare una telefonata urgente'],
      correctIndex: 0,
      explanation: 'Si usa quando si decide che si è lavorato abbastanza per quella giornata. Esempio: “We have finished the report, let’s call it a day.”',
    },
    {
      level: 'C1', xp: 55, term: 'Ephemeral',
      prompt: 'Qual è il significato corretto di “Ephemeral”?',
      options: ['Costante e duraturo nel tempo', 'Di breve durata, passeggero', 'Estremamente complesso', 'Rumoroso e caotico'],
      correctIndex: 1,
      explanation: 'Indica qualcosa che dura pochissimo, come un tramonto o una moda stagionale. Esempio: “Fame in the digital age is often ephemeral.”',
    },
    {
      level: 'B2', xp: 45, term: 'Notwithstanding',
      prompt: 'Come si traduce la preposizione formale “Notwithstanding”?',
      options: ['A causa di', 'Nonostante / Malgrado', 'In aggiunta a', 'Prima che accada'],
      correctIndex: 1,
      explanation: 'Equivale a “despite” o “in spite of” in contesti formali o accademici. Esempio: “Notwithstanding the heavy rain, the match continued.”',
    },
    {
      level: 'A2', xp: 30, term: 'Queue',
      prompt: 'Nell’inglese britannico quotidiano, cos’è una “Queue”?',
      options: ['Una domanda difficile', 'Una fila ordinata di persone in attesa', 'Un biglietto della metropolitana', 'Una tazza di tè caldo'],
      correctIndex: 1,
      explanation: 'Nel Regno Unito fare la fila (“to queue”) è un tratto culturale fondamentale. In US English si usa spesso “line”.',
    },
    {
      level: 'B1', xp: 35, term: 'To look forward to',
      prompt: 'Quale forma verbale segue correttamente “I look forward to...”?',
      options: ['Il verbo in -ing (es. meeting you)', 'L’infinito semplice (es. meet you)', 'Il participio passato (es. met you)', 'Il futuro con will (es. will meet you)'],
      correctIndex: 0,
      explanation: 'Qui “to” è una preposizione, non parte dell’infinito! Per questo si dice sempre “I look forward to hearing from you.”',
    },
  ];

  const CLOZE_EXERCISES = [
    {
      category: 'Condizionali', level: 'C1',
      beforeBlank: '“If I ', afterBlank: ' earlier this morning, I wouldn’t have missed the flight to Heathrow.”',
      options: ['left', 'had left', 'would leave'], correctIndex: 1,
      ruleTitle: 'Third Conditional', formula: 'If + Past Perfect, would have + Past Participle',
      explanation: 'Si usa “had left” perché l’azione riguarda un evento passato non accaduto e la sua conseguenza immaginaria.',
    },
    {
      category: 'Inversione', level: 'C1',
      beforeBlank: '“Not only ', afterBlank: ' fluent English, but she also writes poetry in Scots.”',
      options: ['she speaks', 'does she speak', 'speaks she'], correctIndex: 1,
      ruleTitle: 'Negative Inversion', formula: 'Not only + Ausiliare + Soggetto + Verbo',
      explanation: 'Quando una frase inizia con un avverbio negativo o restrittivo come “Not only”, l’inglese formale inverte ausiliare e soggetto.',
    },
    {
      category: 'Phrasal Verbs', level: 'B2',
      beforeBlank: '“We had to ', afterBlank: ' the outdoor seminar until next Tuesday due to the storm.”',
      options: ['put off', 'put up', 'put out'], correctIndex: 0,
      ruleTitle: 'Put off = Rimandare', formula: 'put off + noun / -ing form',
      explanation: '“Put off” significa posticipare o rimandare. “Put up” significa ospitare o appendere, mentre “put out” significa spegnere.',
    },
    {
      category: 'Modali Passati', level: 'B2',
      beforeBlank: '“You ', afterBlank: ' your umbrella; the forecast clearly predicted sunshine all afternoon.”',
      options: ['needn’t have brought', 'mustn’t bring', 'shouldn’t bring'], correctIndex: 0,
      ruleTitle: 'Needn’t have + Participle', formula: 'needn’t have + Past Participle',
      explanation: 'Esprime un’azione compiuta nel passato che si è rivelata non necessaria (“non c’era bisogno che portassi l’ombrello”).',
    },
  ];

  const DIALOGUES = [
    {
      title: 'At a Coffee Shop in Soho',
      subtitle: 'Ordinare a Londra con cortesia naturale',
      location: 'Soho · Londra', level: 'B1',
      image: '/assets/images/london-coffee-shop.jpg',
      imageAlt: 'Tavolo in legno di una caffetteria londinese con flat white e scone',
      etiquetteTip: 'Nel Regno Unito evita l’imperativo diretto (“Give me a coffee”). Usa sempre “Could I have...” oppure “I’d love a..., please”.',
      turns: [
        { speaker: 'Tu', alt: false, en: '“Morning! Could I grab a flat white to have in, and one of those warm fruit scones, please?”', it: '“Buongiorno! Potrei avere un flat white da bere qui e uno di quegli scone caldi alla frutta, per favore?”' },
        { speaker: 'Barista', alt: true, en: '“Of course! Would you like clotted cream and strawberry jam with the scone?”', it: '“Certamente! Desidera panna rappresa e marmellata di fragole con lo scone?”' },
        { speaker: 'Tu', alt: false, en: '“Yes, that sounds brilliant. Do you take contactless?”', it: '“Sì, sembra fantastico. Accettate pagamenti contactless?”' },
        { speaker: 'Barista', alt: true, en: '“We certainly do. Just tap your card whenever you’re ready—I’ll bring that over to your table.”', it: '“Certamente. Avvicini pure la carta quando è pronto: glielo porto subito al tavolo.”' },
      ],
    },
    {
      title: 'Asking for Directions at King’s Cross',
      subtitle: 'Orientarsi in stazione e chiedere indicazioni',
      location: 'King’s Cross · Londra', level: 'A2-B1',
      image: '/assets/images/london-mews.jpg',
      imageAlt: 'Stradina acciottolata di Londra con cabina telefonica rossa',
      etiquetteTip: 'Prima di fermare qualcuno per strada, inizia sempre con “Excuse me, sorry to bother you...” per risultare educato e naturale.',
      turns: [
        { speaker: 'Tu', alt: false, en: '“Excuse me, sorry to bother you—am I heading the right way for the Piccadilly Line?”', it: '“Mi scusi, disturbo: sto andando nella direzione giusta per la Piccadilly Line?”' },
        { speaker: 'Pendolare', alt: true, en: '“Actually, you want the next escalator down on your left, then follow the dark blue signs.”', it: '“In realtà deve prendere la prossima scala mobile a sinistra e poi seguire i cartelli blu scuro.”' },
        { speaker: 'Tu', alt: false, en: '“Cheers! How many stops is it to Covent Garden from here?”', it: '“Grazie mille! Quante fermate mancano fino a Covent Garden da qui?”' },
        { speaker: 'Pendolare', alt: true, en: '“Just three stops southbound. You’ll be there in under ten minutes.”', it: '“Solo tre fermate verso sud. Ci arriverà in meno di dieci minuti.”' },
      ],
    },
    {
      title: 'Academic Seminar Discussion',
      subtitle: 'Esprimere opinioni sfumate in ambito universitario o lavorativo',
      location: 'Oxford · Regno Unito', level: 'C1',
      image: '/assets/images/oxford-library.jpg',
      imageAlt: 'Sala studio storica dell’Università di Oxford con dizionari aperti',
      etiquetteTip: 'In inglese britannico il disaccordo si esprime con formule diplomatiche come “I see your point, however...” invece di un diretto “I disagree”.',
      turns: [
        { speaker: 'Collega', alt: false, en: '“I gather you’re leaning toward expanding the digital archive before autumn?”', it: '“Immagino che tu sia propenso ad ampliare l’archivio digitale prima dell’autunno, giusto?”' },
        { speaker: 'Tu', alt: true, en: '“To some extent, yes. Having said that, we ought to verify the manuscript citations first.”', it: '“In parte sì. Detto questo, dovremmo prima verificare le citazioni dei manoscritti.”' },
        { speaker: 'Collega', alt: false, en: '“Fair enough. Shall we allocate two weeks solely to proofreading?”', it: '“Giusto. Vogliamo dedicare due settimane esclusivamente alla revisione?”' },
      ],
    },
  ];

  const FLASHCARDS = [
    { word: 'Serendipity', ipa: '/ˌser.ənˈdɪp.ə.ti/', level: 'C1', category: 'Cultura & Lessico', meaning: 'La fortuna di fare scoperte felici e inattese per puro caso.', example: '“Finding that tiny bookshop in Notting Hill was pure serendipity.”' },
    { word: 'Mews', ipa: '/mjuːz/', level: 'B2', category: 'Architettura UK', meaning: 'Vicolo acciottolato londinese con antiche scuderie riconvertite in case.', example: '“They rented a charming brick cottage in a quiet Kensington mews.”' },
    { word: 'Resilient', ipa: '/rɪˈzɪl.i.ənt/', level: 'B2', category: 'Carattere', meaning: 'Capace di riprendersi rapidamente dalle difficoltà e adattarsi.', example: '“Children are often remarkably resilient when learning a second language.”' },
    { word: 'Albeit', ipa: '/ɔːlˈbiː.ɪt/', level: 'C1', category: 'Connettivi Formali', meaning: 'Sebbene, anche se (usato per introdurre una precisazione breve).', example: '“He accepted the promotion, albeit with some hesitation.”' },
  ];

  const FALSE_FRIENDS = [
    { word: 'Actually', wrongItalian: 'Attualmente', wrongMeaning: 'Adesso / In questo periodo', rightMeaning: 'In realtà / A dire il vero', tip: 'Per dire “attualmente” usa Currently o Nowadays.', example: '“Actually, I prefer tea over coffee.”' },
    { word: 'Eventually', wrongItalian: 'Eventualmente', wrongMeaning: 'Nel caso in cui / Forse', rightMeaning: 'Alla fine / Col tempo', tip: 'Per dire “eventualmente” usa If necessary o Possibly.', example: '“After three delays, the train eventually arrived.”' },
    { word: 'Sensible', wrongItalian: 'Sensibile', wrongMeaning: 'Emotivo / Delicato', rightMeaning: 'Assennato / Ragionevole', tip: 'Per dire “sensibile” in senso emotivo o fisico usa Sensitive.', example: '“Bringing a raincoat to Edinburgh is a very sensible decision.”' },
    { word: 'Library', wrongItalian: 'Libreria (negozio)', wrongMeaning: 'Negozio che vende libri', rightMeaning: 'Biblioteca', tip: 'Per il negozio di libri usa Bookshop (UK) o Bookstore (US).', example: '“I borrowed three grammar guides from the Bodleian Library.”' },
  ];

  const PRONUNCIATION_WORDS = [
    { word: 'Thoroughly', ipaUk: '/ˈθʌr.ə.li/', ipaUs: '/ˈθɝː.oʊ.li/', accentTag: 'UK RP', note: 'Attenzione al gruppo “ough”: qui suona come una /ʌ/ breve, non come “through” (/uː/).', example: '“She checked the contract thoroughly before signing.”' },
    { word: 'Queue', ipaUk: '/kjuː/', ipaUs: '/kjuː/', accentTag: 'UK RP', note: 'Nonostante le 5 lettere, le ultime quattro sono mute: si pronuncia esattamente come la lettera “Q”.', example: '“There was a long queue outside the theatre.”' },
    { word: 'Schedule', ipaUk: '/ˈʃedʒ.uːl/', ipaUs: '/ˈskedʒ.uːl/', accentTag: 'UK vs US', note: 'Nel Regno Unito inizia spesso con suono “sh” (/ʃ/), mentre negli Stati Uniti inizia con “sk” (/sk/).', example: '“Our weekly English schedule is very flexible.”' },
    { word: 'Squirrel', ipaUk: '/ˈskwɪr.əl/', ipaUs: '/ˈskwɝː.əl/', accentTag: 'UK RP', note: 'La combinazione “squi” richiede labbra arrotondate seguite da una /r/ morbida senza stacco.', example: '“We spotted a red squirrel in Hyde Park.”' },
  ];

  const CULTURE_POSTCARDS = [
    {
      title: 'Kensington Mews', location: 'London · SW7', word: 'Mews', ipa: '/mjuːz/',
      meaning: 'Stradina acciottolata nata dalle antiche scuderie vittoriane.',
      image: '/assets/images/london-mews.jpg',
      alt: 'Vicolo londinese con case in mattoni, fiori e cabina telefonica rossa',
      cultureNote: 'Passeggiare tra le mews di Kensington mostra il volto più silenzioso di Londra, lontano dal traffico delle grandi avenue.',
    },
    {
      title: 'Soho Artisan Coffee', location: 'London · W1D', word: 'Flat White', ipa: '/flæt waɪt/',
      meaning: 'Espresso con micro-schiuma di latte vellutata, popolarissimo nel Regno Unito.',
      image: '/assets/images/london-coffee-shop.jpg',
      alt: 'Caffetteria di Soho a Londra con flat white e scone sul bancone',
      cultureNote: 'Nei caffè indipendenti britannici ordinare “to have in” significa consumare al tavolo, mentre “to take away” indica l’asporto.',
    },
    {
      title: 'Bodleian Study Hall', location: 'Oxford · OX1', word: 'Scholarly', ipa: '/ˈskɒl.ə.li/',
      meaning: 'Accademico, erudito, legato allo studio approfondito.',
      image: '/assets/images/oxford-library.jpg',
      alt: 'Biblioteca universitaria storica di Oxford con dizionari aperti sul tavolo',
      cultureNote: 'L’Oxford English Dictionary documenta l’evoluzione storica della lingua inglese dal XII secolo fino ai neologismi digitali.',
    },
  ];

  /* === 3. SINTESI VOCALE (WEB SPEECH API) === */
  function speakEnglish(text, { lang = 'en-GB', rate = 1.0, onStart, onEnd } = {}) {
    if (!text) return;
    if (!('speechSynthesis' in window)) {
      if (typeof onStart === 'function') onStart();
      window.setTimeout(() => { if (typeof onEnd === 'function') onEnd(); }, 800);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate;

    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find((v) => v.lang === lang) || voices.find((v) => v.lang.startsWith('en'));
    if (voice) utterance.voice = voice;

    utterance.onstart = () => { if (typeof onStart === 'function') onStart(); };
    utterance.onend = () => { if (typeof onEnd === 'function') onEnd(); };
    utterance.onerror = () => { if (typeof onEnd === 'function') onEnd(); };

    window.speechSynthesis.speak(utterance);
  }

  /* === 4. HEADER & FOOTER CONDIVISI === */
  function normalizePath(pathname) {
    return !pathname || pathname === '/index.html' ? '/' : pathname;
  }

  function initSiteChrome() {
    const currentPath = normalizePath(window.location.pathname);

    const headerHost = document.getElementById('site-header');
    if (headerHost) {
      const navHtml = SITE_CONFIG.navLinks
        .map((item) => {
          const active = currentPath === normalizePath(item.href);
          return `<a href="${item.href}" class="nav-link${active ? ' is-active' : ''}"${active ? ' aria-current="page"' : ''}>${item.label}</a>`;
        })
        .join('');

      const mobileHtml = SITE_CONFIG.navLinks
        .map((item) => {
          const active = currentPath === normalizePath(item.href);
          return `<a href="${item.href}" class="mobile-nav-link${active ? ' is-active' : ''}"${active ? ' aria-current="page"' : ''}><span>${item.label}</span><span aria-hidden="true">→</span></a>`;
        })
        .join('');

      headerHost.innerHTML = `
        <div class="header-bar">
          <a href="${SITE_CONFIG.brandHomeUrl}" class="brand-wordmark">
            <span class="brand-mark" aria-hidden="true">🇬🇧</span>
            <span>${SITE_CONFIG.brandName}</span>
          </a>
          <nav class="header-nav" aria-label="Navigazione principale">${navHtml}</nav>
          <div class="header-actions">
            <a href="${SITE_CONFIG.primaryCta.href}" class="btn btn-primary">${SITE_CONFIG.primaryCta.label}</a>
            <button type="button" class="mobile-menu-toggle" aria-expanded="false" aria-controls="mobile-nav-drawer" aria-label="Apri menu">☰</button>
          </div>
        </div>
        <nav id="mobile-nav-drawer" class="mobile-nav-drawer" aria-label="Navigazione mobile">
          ${mobileHtml}
          <a href="/pages/pronuncia.html" class="mobile-nav-link${currentPath === '/pages/pronuncia.html' ? ' is-active' : ''}">
            <span>Pronuncia IPA</span><span aria-hidden="true">→</span>
          </a>
        </nav>
      `;

      const toggleBtn = headerHost.querySelector('.mobile-menu-toggle');
      const drawer = headerHost.querySelector('#mobile-nav-drawer');
      if (toggleBtn && drawer) {
        toggleBtn.addEventListener('click', () => {
          const isOpen = drawer.classList.toggle('is-open');
          toggleBtn.setAttribute('aria-expanded', String(isOpen));
          toggleBtn.textContent = isOpen ? '✕' : '☰';
        });
      }
    }

    const footerHost = document.getElementById('site-footer');
    if (footerHost) {
      const linksHtml = SITE_CONFIG.footer.links
        .map((link) => `<a href="${link.href}">${link.label}</a>`)
        .join('');

      footerHost.innerHTML = `
        <div>
          <h3 style="font-size: 1.375rem; font-weight: 800; letter-spacing: -0.02em; color: #0f172a;">${SITE_CONFIG.footer.title}</h3>
          <p style="font-size: 0.875rem; font-weight: 600; color: #064e3b; margin-top: 0.25rem; max-width: 58ch;">${SITE_CONFIG.footer.subtitle}</p>
          <div class="footer-links" style="margin-top: 1rem;">${linksHtml}</div>
        </div>
        <a href="${SITE_CONFIG.footer.ctaHref}" class="btn btn-primary" style="box-shadow: var(--shadow-offset-light);">${SITE_CONFIG.footer.ctaLabel}</a>
      `;
    }
  }

  /* === 5. LOGICA PER LE SINGOLE PAGINE === */
  function initHomePage() {
    // A. Hero Lab
    const tabsHost = document.getElementById('hero-phrase-tabs');
    const levelHost = document.getElementById('hero-level-switcher');
    const enEl = document.getElementById('hero-phrase-en');
    const ipaEl = document.getElementById('hero-phrase-ipa');
    const itEl = document.getElementById('hero-phrase-it');
    const speakBtn = document.getElementById('hero-speak-btn');

    if (tabsHost && levelHost && enEl && ipaEl && itEl && speakBtn) {
      let phraseIdx = 0;
      let level = 'B1-B2';

      const renderHero = () => {
        const v = HERO_PHRASES[phraseIdx].variants[level];
        tabsHost.innerHTML = HERO_PHRASES.map(
          (item, idx) => `<button type="button" class="phrase-tab${idx === phraseIdx ? ' is-active' : ''}" data-phrase-idx="${idx}">${item.label}</button>`
        ).join('');
        levelHost.querySelectorAll('.level-btn').forEach((btn) => btn.classList.toggle('is-active', btn.dataset.level === level));
        enEl.textContent = v.en;
        ipaEl.textContent = `${v.ipa} · Livello ${level}`;
        itEl.textContent = v.it;
      };

      tabsHost.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-phrase-idx]');
        if (!btn) return;
        phraseIdx = Number(btn.dataset.phraseIdx);
        renderHero();
      });

      levelHost.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-level]');
        if (!btn) return;
        level = btn.dataset.level;
        renderHero();
      });

      speakBtn.addEventListener('click', () => {
        speakEnglish(HERO_PHRASES[phraseIdx].variants[level].en, {
          onStart: () => { speakBtn.textContent = 'In riproduzione...'; },
          onEnd: () => { speakBtn.textContent = 'Ascolta Pronuncia'; },
        });
      });

      renderHero();
    }

    // B. Postcard audio
    const postcardAudioBtn = document.getElementById('postcard-audio-btn');
    if (postcardAudioBtn) {
      postcardAudioBtn.addEventListener('click', () => speakEnglish('Kensington Mews, London'));
    }

    // C. Flashcard
    const fcWord = document.getElementById('flashcard-word');
    const fcIpa = document.getElementById('flashcard-ipa');
    const fcMeaning = document.getElementById('flashcard-meaning');
    const fcMeta = document.getElementById('flashcard-meta');
    const fcAudio = document.getElementById('flashcard-audio-btn');
    const fcNext = document.getElementById('flashcard-next-btn');

    if (fcWord && fcIpa && fcMeaning && fcMeta) {
      let fcIdx = 0;
      const renderFc = () => {
        const c = FLASHCARDS[fcIdx];
        fcWord.textContent = c.word;
        fcIpa.textContent = c.ipa;
        fcMeaning.textContent = c.meaning;
        fcMeta.textContent = `${c.category} · Livello ${c.level}`;
      };
      if (fcAudio) fcAudio.addEventListener('click', () => speakEnglish(FLASHCARDS[fcIdx].word));
      if (fcNext) fcNext.addEventListener('click', () => { fcIdx = (fcIdx + 1) % FLASHCARDS.length; renderFc(); });
      renderFc();
    }

    // D. Quick Quiz
    const qCounter = document.getElementById('home-quiz-counter');
    const qXp = document.getElementById('home-quiz-xp');
    const qPrompt = document.getElementById('home-quiz-prompt');
    const qOptions = document.getElementById('home-quiz-options');
    const qFeedback = document.getElementById('home-quiz-feedback');
    const qNext = document.getElementById('home-quiz-next');

    if (qCounter && qPrompt && qOptions && qFeedback) {
      let qIdx = 0;
      let totalXp = 0;
      let answered = false;

      const renderQuiz = () => {
        const q = QUIZ_QUESTIONS[qIdx];
        answered = false;
        qCounter.textContent = `Quesito ${String(qIdx + 1).padStart(2, '0')} / ${String(QUIZ_QUESTIONS.length).padStart(2, '0')} · Livello ${q.level}`;
        if (qXp) qXp.textContent = `${totalXp} XP guadagnati`;
        qPrompt.innerHTML = q.prompt.replace(
          `“${q.term}”`,
          `<mark style="background: var(--accent-amber-soft); padding: 0.1rem 0.4rem; border-radius: 0.375rem; font-family: var(--font-mono); color: var(--ink-primary);">“${q.term}”</mark>`
        );
        const letters = ['A', 'B', 'C', 'D'];
        qOptions.innerHTML = q.options.map((opt, i) => `<button type="button" class="option-btn" data-opt-idx="${i}"><span><strong>${letters[i]}.</strong> ${opt}</span><span aria-hidden="true">○</span></button>`).join('');
        qFeedback.innerHTML = `<strong>Suggerimento:</strong> Seleziona una risposta per verificare significato ed esempio d’uso.`;
      };

      qOptions.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-opt-idx]');
        if (!btn || answered) return;
        answered = true;
        const chosen = Number(btn.dataset.optIdx);
        const q = QUIZ_QUESTIONS[qIdx];
        const ok = chosen === q.correctIndex;
        if (ok) {
          totalXp += q.xp;
          if (qXp) qXp.textContent = `${totalXp} XP guadagnati`;
        }
        qOptions.querySelectorAll('.option-btn').forEach((el, i) => {
          el.disabled = true;
          if (i === q.correctIndex) { el.classList.add('is-correct'); el.lastElementChild.textContent = '✓ Esatto'; }
          else if (i === chosen && !ok) { el.classList.add('is-wrong'); el.lastElementChild.textContent = '✕ Errato'; }
        });
        qFeedback.innerHTML = `<strong>${ok ? `Corretto (+${q.xp} XP)` : 'Risposta non corretta'}:</strong> ${q.explanation}`;
      });

      if (qNext) qNext.addEventListener('click', () => { qIdx = (qIdx + 1) % QUIZ_QUESTIONS.length; renderQuiz(); });
      renderQuiz();
    }

    // E. Quick Cloze
    const cMeta = document.getElementById('home-cloze-meta');
    const cSentence = document.getElementById('home-cloze-sentence');
    const cOptions = document.getElementById('home-cloze-options');
    const cFeedback = document.getElementById('home-cloze-feedback');
    const cNext = document.getElementById('home-cloze-next');

    if (cMeta && cSentence && cOptions && cFeedback) {
      let cIdx = 0;
      let answered = false;

      const renderCloze = (blank = '_______') => {
        const ex = CLOZE_EXERCISES[cIdx];
        cMeta.textContent = `${ex.category} · Livello ${ex.level}`;
        cSentence.innerHTML = `${ex.beforeBlank}<span class="cloze-blank">${blank}</span>${ex.afterBlank}`;
        if (!answered) {
          cOptions.innerHTML = ex.options.map((opt, i) => `<button type="button" class="option-btn" data-cloze-idx="${i}" style="justify-content:center;text-align:center;"><span>${opt}</span></button>`).join('');
          cFeedback.innerHTML = `<strong>Regola:</strong> ${ex.ruleTitle} — scegli l’opzione grammaticalmente corretta.`;
        }
      };

      cOptions.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-cloze-idx]');
        if (!btn || answered) return;
        answered = true;
        const chosen = Number(btn.dataset.clozeIdx);
        const ex = CLOZE_EXERCISES[cIdx];
        const ok = chosen === ex.correctIndex;
        renderCloze(ex.options[ex.correctIndex]);
        cOptions.querySelectorAll('.option-btn').forEach((el, i) => {
          el.disabled = true;
          if (i === ex.correctIndex) { el.classList.add('is-correct'); el.innerHTML = `<span>${ex.options[i]} ✓</span>`; }
          else if (i === chosen && !ok) { el.classList.add('is-wrong'); }
        });
        cFeedback.innerHTML = `<div style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:0.5rem;margin-bottom:0.25rem;"><strong>${ok ? 'Ottimo lavoro!' : 'Attenzione alla regola:'} ${ex.ruleTitle}</strong><span style="font-family:var(--font-mono);font-size:0.75rem;">${ex.formula}</span></div><div>${ex.explanation}</div>`;
      });

      if (cNext) cNext.addEventListener('click', () => { answered = false; cIdx = (cIdx + 1) % CLOZE_EXERCISES.length; renderCloze(); });
      renderCloze();
    }

    // F. Dialogue audio
    const dAudio = document.getElementById('home-dialogue-audio');
    if (dAudio) {
      dAudio.addEventListener('click', () => {
        const text = DIALOGUES[0].turns.slice(0, 2).map((t) => t.en.replace(/[“”]/g, '')).join(' ');
        speakEnglish(text, {
          onStart: () => { dAudio.textContent = 'In riproduzione...'; },
          onEnd: () => { dAudio.textContent = 'Ascolta Dialogo'; },
        });
      });
    }

    // G. Pronunciation Lab card
    const ipaWord = document.getElementById('home-ipa-word');
    const ipaCode = document.getElementById('home-ipa-code');
    const ipaWave = document.getElementById('home-waveform');
    const ipaPlay = document.getElementById('home-ipa-play');
    const ipaSpeed = document.getElementById('home-ipa-speed');
    const ipaNext = document.getElementById('home-ipa-next');

    if (ipaWord && ipaCode && ipaPlay && ipaSpeed) {
      let iIdx = 0;
      let rate = 1.0;
      const renderIpa = () => {
        const w = PRONUNCIATION_WORDS[iIdx];
        ipaWord.textContent = `“${w.word}”`;
        ipaCode.textContent = `${w.ipaUk} · ${w.accentTag}`;
        ipaSpeed.textContent = `${rate.toFixed(2).replace(/\.00$/, '.0')}x`;
      };
      ipaPlay.addEventListener('click', () => {
        speakEnglish(PRONUNCIATION_WORDS[iIdx].word, {
          rate,
          onStart: () => { if (ipaWave) ipaWave.classList.add('is-playing'); ipaPlay.textContent = 'Audio attivo'; },
          onEnd: () => { if (ipaWave) ipaWave.classList.remove('is-playing'); ipaPlay.textContent = 'Ascolta Audio'; },
        });
      });
      ipaSpeed.addEventListener('click', () => { rate = rate === 1.0 ? 0.75 : 1.0; renderIpa(); });
      if (ipaNext) ipaNext.addEventListener('click', () => { iIdx = (iIdx + 1) % PRONUNCIATION_WORDS.length; renderIpa(); });
      renderIpa();
    }

    // H. False Friends card
    const ffWord = document.getElementById('home-ff-word');
    const ffWrong = document.getElementById('home-ff-wrong');
    const ffWrongMeaning = document.getElementById('home-ff-wrong-meaning');
    const ffRightMeaning = document.getElementById('home-ff-right-meaning');
    const ffTip = document.getElementById('home-ff-tip');
    const ffNext = document.getElementById('home-ff-next');

    if (ffWord && ffWrong && ffWrongMeaning && ffRightMeaning && ffTip) {
      let ffIdx = 0;
      const renderFf = () => {
        const item = FALSE_FRIENDS[ffIdx];
        ffWord.textContent = `“${item.word}”`;
        ffWrong.textContent = `≠ ${item.wrongItalian}`;
        ffWrongMeaning.textContent = item.wrongMeaning;
        ffRightMeaning.textContent = item.rightMeaning;
        ffTip.textContent = item.tip;
      };
      if (ffNext) ffNext.addEventListener('click', () => { ffIdx = (ffIdx + 1) % FALSE_FRIENDS.length; renderFf(); });
      renderFf();
    }
  }

  function initQuizPage() {
    const filterBar = document.getElementById('quiz-level-filter');
    const progressEl = document.getElementById('quiz-progress');
    const scoreEl = document.getElementById('quiz-score');
    const promptEl = document.getElementById('quiz-prompt');
    const optionsEl = document.getElementById('quiz-options');
    const feedbackEl = document.getElementById('quiz-feedback');
    const speakBtn = document.getElementById('quiz-speak-term');
    const nextBtn = document.getElementById('quiz-next-btn');
    const resetBtn = document.getElementById('quiz-reset-btn');
    const historyEl = document.getElementById('quiz-history-list');

    if (!progressEl || !optionsEl) return;

    let level = 'ALL';
    let pool = [...QUIZ_QUESTIONS];
    let idx = 0;
    let score = 0;
    let correct = 0;
    let answered = false;
    const history = [];

    const renderHistory = () => {
      if (!historyEl) return;
      if (!history.length) {
        historyEl.innerHTML = `<p style="font-size:0.875rem;color:var(--ink-muted);">Nessuna risposta registrata in questa sessione.</p>`;
        return;
      }
      historyEl.innerHTML = history.slice().reverse().map((h) => `
        <div style="display:flex;justify-content:space-between;align-items:center;gap:0.75rem;padding:0.625rem 0;border-bottom:1px solid var(--border-subtle);font-size:0.875rem;">
          <div><strong>${h.term}</strong> <span style="color:var(--ink-muted);">(${h.level})</span></div>
          <span style="font-weight:700;color:${h.ok ? 'var(--accent-emerald-strong)' : 'var(--accent-rose)'};">${h.ok ? `+${h.xp} XP ✓` : 'Da ripassare ✕'}</span>
        </div>
      `).join('');
    };

    const render = () => {
      const q = pool[idx];
      answered = false;
      progressEl.textContent = `Domanda ${String(idx + 1).padStart(2, '0')} / ${String(pool.length).padStart(2, '0')} · Livello ${q.level} · +${q.xp} XP`;
      scoreEl.textContent = `${score} XP · ${correct} corrette`;
      promptEl.textContent = q.prompt;
      const letters = ['A', 'B', 'C', 'D'];
      optionsEl.innerHTML = q.options.map((o, i) => `<button type="button" class="option-btn" data-opt="${i}"><span><strong>${letters[i]}.</strong> ${o}</span><span aria-hidden="true">○</span></button>`).join('');
      feedbackEl.innerHTML = `<strong>Istruzione:</strong> Seleziona una delle quattro opzioni per verificare la regola e accumulare XP.`;
    };

    if (filterBar) {
      filterBar.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-level]');
        if (!btn) return;
        filterBar.querySelectorAll('.segmented-btn').forEach((el) => el.classList.toggle('is-active', el === btn));
        level = btn.dataset.level;
        pool = level === 'ALL' ? [...QUIZ_QUESTIONS] : QUIZ_QUESTIONS.filter((q) => q.level === level);
        idx = 0;
        render();
      });
    }

    optionsEl.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-opt]');
      if (!btn || answered) return;
      answered = true;
      const chosen = Number(btn.dataset.opt);
      const q = pool[idx];
      const ok = chosen === q.correctIndex;
      if (ok) { score += q.xp; correct += 1; }
      history.push({ term: q.term, level: q.level, xp: q.xp, ok });
      renderHistory();
      optionsEl.querySelectorAll('.option-btn').forEach((el, i) => {
        el.disabled = true;
        if (i === q.correctIndex) { el.classList.add('is-correct'); el.lastElementChild.textContent = '✓ Esatto'; }
        else if (i === chosen && !ok) { el.classList.add('is-wrong'); el.lastElementChild.textContent = '✕ Errato'; }
      });
      scoreEl.textContent = `${score} XP · ${correct} corrette`;
      feedbackEl.innerHTML = `<strong>${ok ? `Esatto! +${q.xp} XP` : 'Risposta errata'}:</strong> ${q.explanation}`;
    });

    if (speakBtn) speakBtn.addEventListener('click', () => speakEnglish(pool[idx].term));
    if (nextBtn) nextBtn.addEventListener('click', () => { idx = (idx + 1) % pool.length; render(); });
    if (resetBtn) resetBtn.addEventListener('click', () => { score = 0; correct = 0; history.length = 0; idx = 0; render(); renderHistory(); });

    render();
    renderHistory();
  }

  function initEserciziPage() {
    const tabsEl = document.getElementById('cloze-category-tabs');
    const metaEl = document.getElementById('cloze-meta');
    const sentenceEl = document.getElementById('cloze-sentence');
    const optionsEl = document.getElementById('cloze-options');
    const feedbackEl = document.getElementById('cloze-feedback');
    const listenBtn = document.getElementById('cloze-listen-btn');
    const nextBtn = document.getElementById('cloze-next-btn');
    const rulesEl = document.getElementById('grammar-rules-summary');

    if (!sentenceEl || !optionsEl) return;

    let idx = 0;
    let answered = false;

    const renderTabs = () => {
      if (!tabsEl) return;
      tabsEl.innerHTML = CLOZE_EXERCISES.map((ex, i) => `<button type="button" class="segmented-btn${i === idx ? ' is-active' : ''}" data-ex-idx="${i}">${ex.category}</button>`).join('');
    };

    const render = (blank = '_______') => {
      const ex = CLOZE_EXERCISES[idx];
      metaEl.textContent = `${ex.category} · Livello ${ex.level}`;
      sentenceEl.innerHTML = `${ex.beforeBlank}<span class="cloze-blank">${blank}</span>${ex.afterBlank}`;
      if (!answered) {
        optionsEl.innerHTML = ex.options.map((opt, i) => `<button type="button" class="option-btn" data-opt-idx="${i}" style="justify-content:center;text-align:center;"><span>${opt}</span></button>`).join('');
        feedbackEl.innerHTML = `<strong>Obiettivo:</strong> ${ex.ruleTitle} — completa la frase selezionando la struttura corretta.`;
      }
    };

    if (rulesEl) {
      rulesEl.innerHTML = CLOZE_EXERCISES.map((ex) => `
        <div style="padding:0.75rem 0;border-bottom:1px solid var(--border-subtle);">
          <div style="display:flex;justify-content:space-between;gap:0.5rem;font-size:0.875rem;font-weight:800;">
            <span>${ex.ruleTitle}</span>
            <span style="font-family:var(--font-mono);font-size:0.75rem;color:var(--accent-emerald-strong);">${ex.level}</span>
          </div>
          <div style="font-family:var(--font-mono);font-size:0.75rem;color:var(--ink-muted);margin-top:0.25rem;">${ex.formula}</div>
        </div>
      `).join('');
    }

    if (tabsEl) {
      tabsEl.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-ex-idx]');
        if (!btn) return;
        idx = Number(btn.dataset.exIdx);
        answered = false;
        renderTabs();
        render();
      });
    }

    optionsEl.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-opt-idx]');
      if (!btn || answered) return;
      answered = true;
      const chosen = Number(btn.dataset.optIdx);
      const ex = CLOZE_EXERCISES[idx];
      const ok = chosen === ex.correctIndex;
      render(ex.options[ex.correctIndex]);
      optionsEl.querySelectorAll('.option-btn').forEach((el, i) => {
        el.disabled = true;
        if (i === ex.correctIndex) { el.classList.add('is-correct'); el.innerHTML = `<span>${ex.options[i]} ✓</span>`; }
        else if (i === chosen && !ok) { el.classList.add('is-wrong'); }
      });
      feedbackEl.innerHTML = `<div><strong>${ok ? 'Risposta esatta:' : 'Correzione:'} ${ex.ruleTitle}</strong></div><div style="font-family:var(--font-mono);font-size:0.75rem;margin:0.25rem 0;">${ex.formula}</div><div>${ex.explanation}</div>`;
    });

    if (listenBtn) {
      listenBtn.addEventListener('click', () => {
        const ex = CLOZE_EXERCISES[idx];
        speakEnglish(`${ex.beforeBlank}${ex.options[ex.correctIndex]}${ex.afterBlank}`.replace(/[“”]/g, ''));
      });
    }
    if (nextBtn) nextBtn.addEventListener('click', () => { answered = false; idx = (idx + 1) % CLOZE_EXERCISES.length; renderTabs(); render(); });

    renderTabs();
    render();
  }

  function initDialogoPage() {
    const tabsEl = document.getElementById('dialogue-scenario-tabs');
    const titleEl = document.getElementById('dialogue-title');
    const metaEl = document.getElementById('dialogue-meta');
    const listEl = document.getElementById('dialogue-turns-list');
    const tipEl = document.getElementById('dialogue-etiquette-tip');
    const imgEl = document.getElementById('dialogue-scene-img');
    const captionEl = document.getElementById('dialogue-scene-caption');
    const playAllBtn = document.getElementById('dialogue-play-all');
    const toggleItBtn = document.getElementById('dialogue-toggle-it');

    if (!listEl) return;

    let idx = 0;
    let showIt = true;

    const render = () => {
      const s = DIALOGUES[idx];
      if (tabsEl) {
        tabsEl.innerHTML = DIALOGUES.map((d, i) => `<button type="button" class="segmented-btn${i === idx ? ' is-active' : ''}" data-scene-idx="${i}">${d.location.split('·')[0].trim()}</button>`).join('');
      }
      titleEl.textContent = s.title;
      metaEl.textContent = `${s.subtitle} · Livello ${s.level}`;
      tipEl.textContent = s.etiquetteTip;
      if (imgEl) { imgEl.src = s.image; imgEl.alt = s.imageAlt; }
      if (captionEl) captionEl.textContent = s.location;
      listEl.innerHTML = s.turns.map((t, i) => `
        <div class="dialogue-turn">
          <span class="speaker-avatar${t.alt ? ' speaker-avatar--alt' : ''}">${t.speaker}</span>
          <div class="dialogue-bubble${t.alt ? ' dialogue-bubble--alt' : ''}">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:0.75rem;">
              <p class="dialogue-en">${t.en}</p>
              <button type="button" class="btn-audio-icon" data-turn-idx="${i}">Ascolta</button>
            </div>
            ${showIt ? `<p class="dialogue-it">${t.it}</p>` : ''}
          </div>
        </div>
      `).join('');
    };

    if (tabsEl) {
      tabsEl.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-scene-idx]');
        if (!btn) return;
        idx = Number(btn.dataset.sceneIdx);
        render();
      });
    }

    listEl.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-turn-idx]');
      if (!btn) return;
      speakEnglish(DIALOGUES[idx].turns[Number(btn.dataset.turnIdx)].en.replace(/[“”]/g, ''));
    });

    if (playAllBtn) {
      playAllBtn.addEventListener('click', () => {
        const text = DIALOGUES[idx].turns.map((t) => t.en.replace(/[“”]/g, '')).join(' ');
        speakEnglish(text, {
          onStart: () => { playAllBtn.textContent = 'In riproduzione...'; },
          onEnd: () => { playAllBtn.textContent = 'Ascolta Tutto il Dialogo'; },
        });
      });
    }

    if (toggleItBtn) {
      toggleItBtn.addEventListener('click', () => {
        showIt = !showIt;
        toggleItBtn.textContent = showIt ? 'Nascondi Traduzione' : 'Mostra Traduzione';
        render();
      });
    }

    render();
  }

  function initCulturaPage() {
    const postcardsGrid = document.getElementById('cultura-postcards-grid');
    const flashcardsGrid = document.getElementById('cultura-flashcards-grid');
    const falseFriendsGrid = document.getElementById('cultura-false-friends-grid');

    if (postcardsGrid) {
      postcardsGrid.innerHTML = CULTURE_POSTCARDS.map((item, idx) => `
        <article class="bento-card card-white">
          <div class="media-frame">
            <img src="${item.image}" alt="${item.alt}" referrerpolicy="no-referrer" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" />
            <div class="image-fallback" style="display:none;"><span>${item.title}</span><span style="font-family:var(--font-mono);font-size:0.75rem;">${item.location}</span></div>
            <div class="media-caption-scrim">${item.location}</div>
          </div>
          <div>
            <div class="meta-line">${item.title} · ${item.ipa}</div>
            <h3 class="card-title" style="margin-top:0.25rem;">${item.word}</h3>
            <p style="font-size:0.875rem;color:var(--ink-secondary);margin-top:0.25rem;">${item.meaning}</p>
            <p style="font-size:0.8125rem;color:var(--ink-muted);margin-top:0.5rem;">${item.cultureNote}</p>
          </div>
          <button type="button" class="btn-audio-icon" data-speak-postcard="${idx}" style="width:fit-content;">Ascolta “${item.word}”</button>
        </article>
      `).join('');

      postcardsGrid.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-speak-postcard]');
        if (!btn) return;
        speakEnglish(CULTURE_POSTCARDS[Number(btn.dataset.speakPostcard)].word);
      });
    }

    if (flashcardsGrid) {
      flashcardsGrid.innerHTML = FLASHCARDS.map((card, idx) => `
        <article class="bento-card card-amber">
          <div>
            <div class="meta-line">${card.category} · Livello ${card.level}</div>
            <div style="display:flex;justify-content:space-between;align-items:baseline;gap:0.5rem;margin-top:0.375rem;">
              <h3 style="font-size:1.375rem;font-weight:800;">${card.word}</h3>
              <span style="font-family:var(--font-mono);font-size:0.8125rem;color:var(--ink-muted);">${card.ipa}</span>
            </div>
            <p style="font-size:0.875rem;color:var(--ink-primary);font-weight:600;margin-top:0.375rem;">${card.meaning}</p>
            <p style="font-size:0.8125rem;color:var(--ink-secondary);font-style:italic;margin-top:0.5rem;">${card.example}</p>
          </div>
          <button type="button" class="btn-audio-icon" data-speak-flash="${idx}" style="width:fit-content;">Ascolta Esempio</button>
        </article>
      `).join('');

      flashcardsGrid.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-speak-flash]');
        if (!btn) return;
        const c = FLASHCARDS[Number(btn.dataset.speakFlash)];
        speakEnglish(`${c.word}. ${c.example.replace(/[“”]/g, '')}`);
      });
    }

    if (falseFriendsGrid) {
      falseFriendsGrid.innerHTML = FALSE_FRIENDS.map((ff) => `
        <article class="bento-card card-rose">
          <div class="card-header">
            <div>
              <h3 class="card-title">“${ff.word}”</h3>
              <p class="card-subtitle" style="color:#9f1239;">≠ ${ff.wrongItalian}</p>
            </div>
          </div>
          <div class="false-friend-box">
            <div><strong style="color:#be123c;">✕ Non significa:</strong> ${ff.wrongMeaning}</div>
            <div><strong style="color:#047857;">✓ Significa:</strong> ${ff.rightMeaning}</div>
          </div>
          <p style="font-size:0.8125rem;color:var(--ink-secondary);">${ff.tip}</p>
          <p style="font-size:0.8125rem;font-style:italic;color:var(--ink-muted);">${ff.example}</p>
        </article>
      `).join('');
    }
  }

  function initPronunciaPage() {
    const wordsEl = document.getElementById('pronuncia-word-tabs');
    const titleEl = document.getElementById('pronuncia-word-title');
    const ukEl = document.getElementById('pronuncia-uk-ipa');
    const usEl = document.getElementById('pronuncia-us-ipa');
    const noteEl = document.getElementById('pronuncia-note');
    const exampleEl = document.getElementById('pronuncia-example');
    const waveEl = document.getElementById('pronuncia-waveform');
    const playUkBtn = document.getElementById('pronuncia-play-uk');
    const playUsBtn = document.getElementById('pronuncia-play-us');
    const rateBar = document.getElementById('pronuncia-rate-bar');

    if (!titleEl) return;

    let idx = 0;
    let rate = 1.0;

    const render = () => {
      const item = PRONUNCIATION_WORDS[idx];
      if (wordsEl) {
        wordsEl.innerHTML = PRONUNCIATION_WORDS.map((w, i) => `<button type="button" class="segmented-btn${i === idx ? ' is-active' : ''}" data-word-idx="${i}">${w.word}</button>`).join('');
      }
      titleEl.textContent = item.word;
      ukEl.textContent = item.ipaUk;
      usEl.textContent = item.ipaUs;
      noteEl.textContent = item.note;
      exampleEl.textContent = item.example;
    };

    const play = (lang) => {
      const item = PRONUNCIATION_WORDS[idx];
      speakEnglish(`${item.word}. ${item.example.replace(/[“”]/g, '')}`, {
        lang,
        rate,
        onStart: () => { if (waveEl) waveEl.classList.add('is-playing'); },
        onEnd: () => { if (waveEl) waveEl.classList.remove('is-playing'); },
      });
    };

    if (wordsEl) {
      wordsEl.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-word-idx]');
        if (!btn) return;
        idx = Number(btn.dataset.wordIdx);
        render();
      });
    }
    if (rateBar) {
      rateBar.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-rate]');
        if (!btn) return;
        rate = Number(btn.dataset.rate);
        rateBar.querySelectorAll('.segmented-btn').forEach((el) => el.classList.toggle('is-active', el === btn));
      });
    }
    if (playUkBtn) playUkBtn.addEventListener('click', () => play('en-GB'));
    if (playUsBtn) playUsBtn.addEventListener('click', () => play('en-US'));

    render();
  }

  /* === AVVIO AUTOMATICO PER PAGINA === */
  document.addEventListener('DOMContentLoaded', () => {
    initSiteChrome();
    const page = document.body.dataset.page || 'home';
    if (page === 'home') initHomePage();
    else if (page === 'quiz') initQuizPage();
    else if (page === 'esercizi') initEserciziPage();
    else if (page === 'dialogo') initDialogoPage();
    else if (page === 'cultura') initCulturaPage();
    else if (page === 'pronuncia') initPronunciaPage();
  });
})();
