/* ==========================================================================
   ENGLISH HUB — SCRIPT UNICO (/app.js)
   Questo file gestisce SOLO la parte interattiva (frasi, quiz, cloze, audio)
   e NON sovrascrive l'HTML di header e footer: puoi modificare l'HTML
   liberamente senza rompere il menu o gli altri componenti.
   ========================================================================== */

(() => {
  /* === 1. CONTENUTI DIDATTICI === */
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
     {
    level: 'A1',
    xp: 15,
    term: 'There is / There are',
    prompt: 'Quale frase descrive correttamente la presenza di due libri sul tavolo?',
    options: [
      'There are two books on the table.',
      'There is two books on the table.',
      'They are two books on the table.',
      'It is two books on the table.',
    ],
    correctIndex: 0,
    explanation: 'Con i sostantivi plurali come “two books” si usa sempre la forma plurale “There are”.',
  },
  {
    level: 'A2',
    xp: 25,
    term: 'Since vs For',
    prompt: 'Completa la frase: “I have lived in this city _____ 2021.”',
    options: [
      'for',
      'from',
      'since',
      'during',
    ],
    correctIndex: 2,
    explanation: '“Since” si usa per indicare il momento esatto in cui è iniziata un’azione (es. 2021), mentre “for” indica la durata totale (es. for five years).',
  },
  {
    level: 'B1',
    xp: 35,
    term: 'Used to vs Be used to',
    prompt: 'Qual è il significato corretto di “I am used to waking up early”?',
    options: [
      'Mi svegliavo presto in passato, ma ora non più.',
      'Sono abituato a svegliarmi presto (non mi pesa).',
      'Devo svegliarmi presto domani mattina.',
      'Ho appena iniziato a svegliarmi presto.',
    ],
    correctIndex: 1,
    explanation: '“Be used to + -ing” indica un’abitudine già acquisita nel presente, a differenza di “used to + infinito” che esprime un’abitudine passata.',
  },
  {
    level: 'B2',
    xp: 45,
    term: 'Third Conditional',
    prompt: 'Quale opzione completa correttamente il periodo ipotetico dell’irrealtà nel passato: “If I had known about the traffic, I _____ earlier.”?',
    options: [
      'would leave',
      'will have left',
      'had left',
      'would have left',
    ],
    correctIndex: 3,
    explanation: 'Il Third Conditional si costruisce con “If + Past Perfect” nella subordinata e “would have + participio passato” nella frase principale.',
  },
  {
    level: 'C1',
    xp: 60,
    term: 'Negative Inversion',
    prompt: 'Scegli la struttura grammaticalmente corretta per enfatizzare la frase: “_____ such a compelling argument.”',
    options: [
      'Seldom I have heard',
      'Seldom have I heard',
      'Seldom did I heard',
      'I seldom have heard',
    ],
    correctIndex: 1,
    explanation: 'Quando un avverbio negativo o restrittivo come “Seldom” viene posto a inizio frase per enfasi, richiede l’inversione tra ausiliare e soggetto (“have I heard”).',
  },
  {
    level: 'C2',
    xp: 80,
    term: 'Subjunctive Mood (Mandative)',
    prompt: 'Individua la forma più appropriata in un registro formale: “The committee insisted that the final report _____ submitted before Friday.”',
    options: [
      'is',
      'was',
      'be',
      'being',
    ],
    correctIndex: 2,
    explanation: 'Dopo verbi di richiesta o insistenza come “insist”, “recommend” o “demand”, l’inglese formale utilizza il congiuntivo mandativo, che corrisponde alla forma base del verbo senza flessioni (“be”).',
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
     {
      category: 'Articoli', level: 'A1',
      beforeBlank: '“She has got ', afterBlank: ' cat and two dogs in her small apartment.”',
      options: ['a', 'an', 'the'], correctIndex: 0,
      ruleTitle: 'Indefinite Article (A/An)', formula: 'a + consonante / an + vocale',
      explanation: 'Si usa “a” perché “cat” è un sostantivo singolare numerabile che inizia per suono consonantico.',
    },
    {
      category: 'Tempi Verbali', level: 'A2',
      beforeBlank: '“They ', afterBlank: ' to Rome last summer for their holidays.”',
      options: ['go', 'went', 'have gone'], correctIndex: 1,
      ruleTitle: 'Past Simple', formula: 'Verbo al passato (seconda colonna o -ed)',
      explanation: 'Si usa il Past Simple (“went”) perché l’azione si è svolta in un momento passato e concluso (“last summer”).',
    },
    {
      category: 'Preposizioni di Tempo', level: 'B1',
      beforeBlank: '“We usually meet up ', afterBlank: ' Friday evenings to play board games.”',
      options: ['in', 'at', 'on'], correctIndex: 2,
      ruleTitle: 'Prepositions of Time', formula: 'on + giorni della settimana',
      explanation: 'Si usa la preposizione “on” prima dei giorni della settimana o delle loro specifiche parti (es. “on Friday evenings”).',
    },
    {
      category: 'Relative Clauses', level: 'B2',
      beforeBlank: '“The restaurant ', afterBlank: ' we had dinner last night was exceptional.”',
      options: ['where', 'which', 'who'], correctIndex: 0,
      ruleTitle: 'Relative Adverb (Where)', formula: 'Sostantivo di luogo + where + Soggetto + Verbo',
      explanation: 'Si usa “where” per indicare il luogo in cui si è svolta un’azione (funziona esattamente come “in which”).',
    },
    {
      category: 'Inversioni', level: 'C1',
      beforeBlank: '“Not until he opened the letter ', afterBlank: ' the full truth about the inheritance.”',
      options: ['did he realize', 'he realized', 'realized he'], correctIndex: 0,
      ruleTitle: 'Negative Inversion with Not until', formula: 'Not until + clause + Aux + Subject + Verb',
      explanation: 'Quando una frase inizia con un’espressione temporale negativa come “Not until”, la principale richiede l’inversione ausiliare-soggetto (“did he realize”).',
    },
    {
      category: 'Inversioni Condizionali', level: 'C2',
      beforeBlank: '“Should you require any further assistance, please ', afterBlank: ' to contact the administration office.”',
      options: ['hesitate not', 'do not hesitate', 'not hesitate'], correctIndex: 1,
      ruleTitle: 'Conditional Inversion with Should', formula: 'Should + Subject + Base Verb',
      explanation: 'Nelle inversioni ipotetiche formali che sostituiscono “If”, la frase principale segue le regole imperative standard (richiede l’ausiliare “do not hesitate”).',
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
     {
    title: 'Ordering at a Specialty Coffee Shop',
    subtitle: 'Chiedere informazioni su ingredienti e personalizzare un ordine al bar',
    location: 'Melbourne · Australia',
    level: 'A2',
    image: '/assets/images/melbourne-cafe.jpeg',
    imageAlt: 'Bancone di una caffetteria moderna a Melbourne con macchina per espresso e tazze in ceramica',
    etiquetteTip: 'In Australia è molto comune usare “No worries” come risposta amichevole a “Thank you” o per rassicurare l’interlocutore.',
    turns: [
      { speaker: 'Barista', alt: false, en: '“Hey there! What can I get started for you this morning?”', it: '“Ciao! Cosa posso prepararti stamattina?”' },
      { speaker: 'Tu', alt: true, en: '“Hi! Could I have a flat white with oat milk, please? Also, do you have any gluten-free pastries?”', it: '“Ciao! Potrei avere un flat white con latte d’avena, per favore? Inoltre, avete dei dolci senza glutine?”' },
      { speaker: 'Barista', alt: false, en: '“No worries at all. We’ve got fresh almond croissants that are completely gluten-free.”', it: '“Nessun problema. Abbiamo dei croissant alle mandorle appena sfornati completamente senza glutine.”' },
      { speaker: 'Tu', alt: true, en: '“Sounds great, I’ll take one of those to go as well.”', it: '“Ottimo, prendo anche uno di quelli da asporto.”' },
    ],
  },
  {
    title: 'Hotel Check-in & Room Issue',
    subtitle: 'Gestire un imprevisto alla reception con cortesia e chiarezza',
    location: 'Edimburgo · Scozia',
    level: 'B1',
    image: '/assets/images/edinburgh-hotel.jpg',
    imageAlt: 'Reception elegante di un hotel storico in pietra nel centro di Edimburgo',
    etiquetteTip: 'Nel Regno Unito iniziare una richiesta o un reclamo con “I’m terribly sorry to bother you, but...” rende il tono subito collaborativo e ben disposto.',
    turns: [
      { speaker: 'Receptionist', alt: false, en: '“Good evening, welcome to The Balmoral. How may I assist you?”', it: '“Buonasera, benvenuto al Balmoral. Come posso aiutarla?”' },
      { speaker: 'Tu', alt: true, en: '“Good evening. I’m terribly sorry to bother you, but the heating in my room doesn’t seem to be working properly.”', it: '“Buonasera. Mi dispiace moltissimo disturbarla, ma il riscaldamento nella mia camera non sembra funzionare correttamente.”' },
      { speaker: 'Receptionist', alt: false, en: '“Oh, I do apologize for the inconvenience. Let me move you to a quieter room on the third floor right away.”', it: '“Oh, mi scuso davvero per l’inconveniente. La sposto subito in una camera più tranquilla al terzo piano.”' },
      { speaker: 'Tu', alt: true, en: '“That would be wonderful, thank you so much for sorting this out so quickly.”', it: '“Sarebbe meraviglioso, grazie mille per aver risolto così velocemente.”' },
    ],
  },
  {
    title: 'Startup Product Pitch & Feedback',
    subtitle: 'Negoziare scadenze e priorità durante una riunione di team',
    location: 'San Francisco · Stati Uniti',
    level: 'B2',
    image: '/assets/images/sf-coworking.jpeg',
    imageAlt: 'Sala riunioni luminosa in uno spazio coworking a San Francisco con lavagna di vetro',
    etiquetteTip: 'Negli ambienti tech americani si usano spesso espressioni idiomatiche come “on the same page” (essere d’accordo/allineati) o “circle back” (tornare su un argomento più tardi).',
    turns: [
      { speaker: 'Product Manager', alt: false, en: '“Before we launch the beta, do you think the onboarding flow feels intuitive enough?”', it: '“Prima di lanciare la beta, pensi che il flusso di onboarding risulti abbastanza intuitivo?”' },
      { speaker: 'Tu', alt: true, en: '“Honestly, the layout is super clean, though users might get stuck on the permissions screen.”', it: '“Onestamente il layout è molto pulito, anche se gli utenti potrebbero bloccarsi sulla schermata dei permessi.”' },
      { speaker: 'Product Manager', alt: false, en: '“Good catch. Let’s simplify that step today and circle back tomorrow morning to review the metrics.”', it: '“Ottima osservazione. Semplifichiamo quel passaggio oggi e riaggiorniamoci domattina per rivedere le metriche.”' },
      { speaker: 'Tu', alt: true, en: '“Sounds like a plan. Glad we’re on the same page.”', it: '“Mi sembra un ottimo piano. Contento che siamo sulla stessa lunghezza d’onda.”' },
    ],
  },
  {
    title: 'Art Gallery Opening & Networking',
    subtitle: 'Conversare di estetica e concetti astratti a un evento culturale',
    location: 'Dublino · Irlanda',
    level: 'C1',
    image: '/assets/images/dublin-gallery.jpg',
    imageAlt: 'Galleria d’arte contemporanea a Dublino con installazioni minimaliste e luci soffuse',
    etiquetteTip: 'In Irlanda la conversazione informale spesso passa dall’ironia leggera a commenti approfonditi; chiedere “What’s your take on...?” è un modo naturale per invitare l’altro a esprimersi.',
    turns: [
      { speaker: 'Curatrice', alt: false, en: '“It’s fascinating how the artist juxtaposes industrial steel with fragile ceramics, isn’t it?”', it: '“È affascinante come l’artista giustapponga l’acciaio industriale alla ceramica fragile, vero?”' },
      { speaker: 'Tu', alt: true, en: '“Absolutely. It evokes a striking tension between permanence and vulnerability.”', it: '“Assolutamente. Evoca una tensione sorprendente tra permanenza e vulnerabilità.”' },
      { speaker: 'Curatrice', alt: false, en: '“That’s spot on. What’s your take on the lighting choices in the main hall?”', it: '“Hai colto proprio nel segno. Qual è la tua opinione sulle scelte di illuminazione nella sala principale?”' },
      { speaker: 'Tu', alt: true, en: '“I’d argue the dim ambient glow forces you to slow down and engage with each piece intimately.”', it: '“Direi che la luce soffusa ti costringe a rallentare e a entrare in contatto con ogni opera in modo intimo.”' },
    ],
  },
     {
    title: 'Literary Criticism & Manuscript Archive',
    subtitle: 'Analizzare manoscritti antichi e discutere scelte critiche in un contesto accademico',
    location: 'Cambridge · Regno Unito',
    level: 'C2',
    image: '/assets/images/cambridge-archive.jpeg',
    imageAlt: 'Manoscritti medievali e guanti di protezione in una biblioteca di ricerca universitaria',
    etiquetteTip: 'Negli ambienti accademici anglosassoni di alto livello, formulare un’obiezione richiede una cortesia formale estrema, introdotta da verbi modali attenuati come “One might wonder whether...”.',
    turns: [
      { speaker: 'Archivist', alt: false, en: '“One might wonder whether the marginalia on folio 42 genuinely belong to the primary scribe.”', it: '“Ci si potrebbe chiedere se le postille a margine sul foglio 42 appartengano autenticamente al copista principale.”' },
      { speaker: 'Tu', alt: true, en: '“That is a compelling hypothesis, though paleographical analysis suggests a later hand intervened during the late fourteenth century.”', it: '“Questa è un’ipotesi affascinante, sebbene l’analisi paleografica suggerisca che una mano successiva sia intervenuta alla fine del XIV secolo.”' },
      { speaker: 'Archivist', alt: false, en: '“An astute observation. We ought to cross-reference the ink composition before publishing our findings.”', it: '“Un’osservazione acuta. Dovremmo incrociare i dati sulla composizione dell’inchiostro prima di pubblicare le nostre conclusioni.”' },
      { speaker: 'Tu', alt: true, en: '“Indeed. I shall coordinate with the conservation laboratory tomorrow morning.”', it: '“Certamente. Mi coordinerò con il laboratorio di conservazione domattina.”' },
    ],
  },
  {
    title: 'Diplomatic Trade Negotiations',
    subtitle: 'Negoziare clausole contrattuali complesse e trattati internazionali in ambito diplomatico',
    location: 'Ginevra · Svizzera',
    level: 'C2',
    image: '/assets/images/geneva-diplomacy.jpeg',
    imageAlt: 'Sala conferenze internazionale con bandiere e delegati in abito formale',
    etiquetteTip: 'Nella diplomazia multilaterale, la fermezza politica viene sempre espressa attraverso un lessico altamente eufemistico e deferente, ad esempio usando “We harbor reservations regarding...”.',
    turns: [
      { speaker: 'Delegato', alt: false, en: '“We harbor reservations regarding the enforceability of Article 9 under current regulatory frameworks.”', it: '“Nutriamo alcune riserve riguardo all’applicabilità dell’Articolo 9 nel quadro normativo attuale.”' },
      { speaker: 'Tu', alt: true, en: '“While your concerns are understandable, diluting the provision would inadvertently undermine the foundational intent of the accord.”', it: '“Sebbene le vostre preoccupazioni siano comprensibili, annacquare la disposizione finirebbe per compromettere inavvertitamente l’intento fondante dell’accordo.”' },
      { speaker: 'Delegato', alt: false, en: '“Perhaps a transitional clause could reconcile both our imperatives without compromising efficacy.”', it: '“Forse una clausola transitoria potrebbe conciliare entrambi i nostri imperativi senza comprometterne l’efficacia.”' },
      { speaker: 'Tu', alt: true, en: '“A judicious compromise. Let us draft an addendum reflecting that nuanced balance.”', it: '“Un compromesso giudizioso. Redigiamo un addendum che rifletta questo delicato equilibrio.”' },
    ],
  },
  {
    title: 'Architectural Heritage Restoration',
    subtitle: 'Discutere la conservazione di edifici storici e materiali di restauro in un comitato tecnico',
    location: 'Firenze · Italia',
    level: 'C1',
    image: '/assets/images/florence-restoration.jpeg',
    imageAlt: 'Dettagli architettonici rinascimentali in pietra serena durante un intervento di restauro',
    etiquetteTip: 'Nelle commissioni di tutela del patrimonio, l’uso di tecnicismi specifici (come *patination*, *structural integrity*, *reversibility*) è essenziale per legittimare la propria posizione tecnica.',
    turns: [
      { speaker: 'Capo Architetto', alt: false, en: '“The proposed synthetic resin risks disrupting the natural breathability of the stone façade over time.”', it: '“La resina sintetica proposta rischia di compromettere nel tempo la naturale traspirabilità della facciata in pietra.”' },
      { speaker: 'Tu', alt: true, en: '“Precisely my concern. We must prioritize reversible interventions that preserve the original lime mortar integrity.”', it: '“Esattamente la mia preoccupazione. Dobbiamo dare priorità a interventi reversibili che preservino l’integrità della malta di calce originale.”' },
      { speaker: 'Capo Architetto', alt: false, en: '“Agreed. We will specify a traditional mineral-based compound instead.”', it: '“Concordo. Specificheremo invece un composto tradizionale a base minerale.”' },
      { speaker: 'Tu', alt: true, en: '“Splendid. That ensures strict adherence to international conservation guidelines.”', it: '“Splendido. Ciò garantisce la stretta osservanza delle linee guida internazionali sulla conservazione.”' },
    ],
  },
  {
    title: 'Philosophical Symposium & Editorial Board',
    subtitle: 'Affrontare concetti epistemologici complessi in un comitato di redazione accademico',
    location: 'Heidelberg · Germania',
    level: 'C2',
    image: '/assets/images/heidelberg-library.jpeg',
    imageAlt: 'Antica biblioteca universitaria con scaffali in legno scuro e testi filosofici rilegati in pelle',
    etiquetteTip: 'Nei dibattiti filosofici di alto livello, confutare una tesi richiede l’uso di locuzioni avverbiali raffinate come “Notwithstanding the merits of this perspective...”.',
    turns: [
      { speaker: 'Direttore', alt: false, en: '“The author posits that empirical verification is secondary to phenomenological intuition in this chapter.”', it: '“L’autore sostiene che la verifica empirica sia secondaria rispetto all’intuizione fenomenologica in questo capitolo.”' },
      { speaker: 'Tu', alt: true, en: '“Notwithstanding the merits of that perspective, such a claim presupposes a decoupling of epistemology from methodology that few contemporary scholars would endorse.”', it: '“Nonostante i meriti di questa prospettiva, tale affermazione presuppone un disaccoppiamento tra epistemologia e metodologia che pochi studiosi contemporanei sosterrebbero.”' },
      { speaker: 'Direttore', alt: false, en: '“A formidable critique. Do you suggest requesting a substantial revision of the theoretical framework?”', it: '“Una critica formidabile. Suggerisce di richiedere una revisione sostanziale dell’impalcatura teorica?”' },
      { speaker: 'Tu', alt: true, en: '“Indispensable, lest the monograph compromise its academic rigour.”', it: '“Indispensabile, affinché la monografia non comprometta il proprio rigore accademico.”' },
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

  /* === 3. MENU MOBILE OPZIONALE (NON SOVRASCRIVE L'HTML) === */
  function initMobileMenu() {
    const toggleBtn = document.querySelector('.mobile-menu-toggle');
    const drawer = document.getElementById('mobile-nav-drawer');
    if (!toggleBtn || !drawer) return;

    toggleBtn.addEventListener('click', () => {
      const isOpen = drawer.classList.toggle('is-open');
      toggleBtn.setAttribute('aria-expanded', String(isOpen));
      toggleBtn.textContent = isOpen ? '✕' : '☰';
    });
  }

  function safeRun(fn) {
    try {
      fn();
    } catch (err) {
      console.warn('English Hub widget warning:', err);
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

    // D. Console Retrò Game & Learn (Quiz A1-C2)
    const gbApp = document.getElementById('gameboy-app');
    if (gbApp) {
      const gbScore = document.getElementById('gb-score');
      const gbStreak = document.getElementById('gb-streak');
      const gbCatTag = document.getElementById('gb-cat-tag');
      const gbCounter = document.getElementById('gb-question-counter');
      const gbText = document.getElementById('gb-question-text');
      const gbOptions = document.getElementById('gb-options-container');
      const gbFeedback = document.getElementById('gb-feedback-banner');
      const gbFeedbackTitle = document.getElementById('gb-feedback-title');
      const gbFeedbackDesc = document.getElementById('gb-feedback-desc');
      const gbNextBtn = document.getElementById('gb-next-btn');
      const gbPowerBtn = document.getElementById('gb-power-btn');
      const gbPowerSwitch = document.getElementById('gb-power-switch');
      const gbPowerLed = document.getElementById('gb-power-led');
      const gbScreenOff = document.getElementById('gb-screen-off');

      const gbState = {
        idx: 0,
        focused: 0,
        selected: null,
        answered: false,
        score: 0,
        streak: 0,
        powerOn: true,
        eliminated: [],
        lifelineUsed: false,
      };
      const gbLetters = ['A', 'B', 'C', 'D'];

      const renderGameboy = () => {
        if (!gbState.powerOn) {
          if (gbScreenOff) gbScreenOff.classList.remove('is-hidden');
          return;
        }
        if (gbScreenOff) gbScreenOff.classList.add('is-hidden');

        const q = QUIZ_QUESTIONS[gbState.idx];
        if (gbCatTag) gbCatTag.textContent = `LIVELLO ${q.level} · ${q.term.toUpperCase()}`;
        if (gbCounter) gbCounter.textContent = `Q ${gbState.idx + 1}/${QUIZ_QUESTIONS.length}`;
        if (gbText) gbText.textContent = q.prompt;
        if (gbScore) gbScore.textContent = String(gbState.score);
        if (gbStreak) gbStreak.textContent = `${gbState.streak}x`;

        if (gbOptions) {
          gbOptions.innerHTML = '';
          q.options.forEach((optText, i) => {
            const isElim = gbState.eliminated.includes(i);
            const isFocused = i === gbState.focused && !gbState.answered;
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'gb-opt-btn';

            if (gbState.answered) {
              if (i === q.correctIndex) btn.classList.add('is-correct');
              else if (i === gbState.selected) btn.classList.add('is-wrong');
              else btn.classList.add('is-dimmed');
              btn.disabled = true;
            } else if (isElim) {
              btn.classList.add('is-eliminated');
              btn.disabled = true;
            } else if (isFocused) {
              btn.classList.add('is-focused');
            }

            btn.innerHTML = `<span class="gb-opt-key">${isFocused ? '►' : gbLetters[i]}</span><span style="flex:1;">${optText}</span>${isElim ? '<span style="font-size:0.625rem;color:#f87171;">50:50</span>' : ''}`;
            btn.addEventListener('click', () => selectGb(i));
            gbOptions.appendChild(btn);
          });
        }

        if (gbFeedback) {
          if (gbState.answered) {
            gbFeedback.classList.remove('is-hidden');
            const ok = gbState.selected === q.correctIndex;
            if (gbFeedbackTitle) gbFeedbackTitle.textContent = ok ? `★ ESATTO! (+${q.xp} PTS)` : '✖ RISPOSTA ERRATA!';
            if (gbFeedbackDesc) gbFeedbackDesc.textContent = q.explanation;
          } else {
            gbFeedback.classList.add('is-hidden');
          }
        }
      };

      const selectGb = (optIdx) => {
        if (!gbState.powerOn || gbState.answered || gbState.eliminated.includes(optIdx)) return;
        gbState.selected = optIdx;
        gbState.answered = true;
        const q = QUIZ_QUESTIONS[gbState.idx];
        if (optIdx === q.correctIndex) {
          gbState.score += q.xp;
          gbState.streak += 1;
        } else {
          gbState.streak = 0;
        }
        renderGameboy();
      };

      const nextGb = () => {
        if (!gbState.powerOn) return;
        gbState.selected = null;
        gbState.answered = false;
        gbState.eliminated = [];
        gbState.lifelineUsed = false;
        gbState.focused = 0;
        gbState.idx = (gbState.idx + 1) % QUIZ_QUESTIONS.length;
        renderGameboy();
      };

      const moveGb = (delta) => {
        if (!gbState.powerOn || gbState.answered) return;
        const total = QUIZ_QUESTIONS[gbState.idx].options.length;
        gbState.focused = (gbState.focused + delta + total) % total;
        renderGameboy();
      };

      const confirmGb = () => {
        if (!gbState.powerOn) return;
        if (gbState.answered) nextGb();
        else selectGb(gbState.focused);
      };

      const lifelineGb = () => {
        if (!gbState.powerOn || gbState.answered || gbState.lifelineUsed) return;
        const q = QUIZ_QUESTIONS[gbState.idx];
        const wrongs = q.options.map((_, i) => i).filter((i) => i !== q.correctIndex);
        gbState.eliminated = wrongs.slice(0, 2);
        gbState.lifelineUsed = true;
        renderGameboy();
      };

      const bindGbClick = (id, handler) => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('click', handler);
      };

      ['a', 'b', 'c', 'd'].forEach((letter, idx) => {
        bindGbClick(`gb-btn-${letter}`, () => {
          if (gbState.answered) nextGb();
          else selectGb(idx);
        });
      });

      bindGbClick('gb-dpad-up', () => moveGb(-1));
      bindGbClick('gb-dpad-down', () => moveGb(1));
      bindGbClick('gb-dpad-left', () => moveGb(-1));
      bindGbClick('gb-dpad-right', () => moveGb(1));
      bindGbClick('gb-dpad-center', confirmGb);
      bindGbClick('gb-btn-select', lifelineGb);
      bindGbClick('gb-btn-start', confirmGb);
      if (gbNextBtn) gbNextBtn.addEventListener('click', nextGb);

      if (gbPowerBtn) {
        gbPowerBtn.addEventListener('click', () => {
          gbState.powerOn = !gbState.powerOn;
          if (gbPowerSwitch) gbPowerSwitch.classList.toggle('is-off', !gbState.powerOn);
          if (gbPowerLed) gbPowerLed.classList.toggle('is-off', !gbState.powerOn);
          renderGameboy();
        });
      }

      renderGameboy();
    } else {
      // Fallback per la card quiz classica se presente
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

    // F. Dialogue Baloon Fumetto
    const dAudio = document.getElementById('home-dialogue-audio');
    const dStack = document.getElementById('home-dialogue-stack');
    const dLevel = document.getElementById('home-dialogue-level');
    const dLoc = document.getElementById('home-dialogue-location');
    const dNext = document.getElementById('home-dialogue-next');
    let homeDialogueIdx = 0;

    const renderHomeDialogue = () => {
      if (!dStack) return;
      const d = DIALOGUES[homeDialogueIdx];
      if (dLevel) dLevel.textContent = `Livello: ${d.level}`;
      if (dLoc) dLoc.textContent = `${d.location} · EN / IT`;
      dStack.innerHTML = d.turns.slice(0, 2).map((t, i) => `
        <div class="dialogue-balloon${i % 2 === 1 ? ' dialogue-balloon--alt' : ''}">
          <div style="font-size: 0.9375rem; font-weight: 800; line-height: 1.4;">${t.en}</div>
          <div style="font-size: 0.8125rem; color: #475569; margin-top: 0.25rem; font-style: italic;">${t.it}</div>
          <div class="balloon-tail" aria-hidden="true"></div>
        </div>
      `).join('');
    };

    if (dStack) renderHomeDialogue();
    if (dNext) {
      dNext.addEventListener('click', () => {
        homeDialogueIdx = (homeDialogueIdx + 1) % DIALOGUES.length;
        renderHomeDialogue();
      });
    }
    if (dAudio) {
      dAudio.addEventListener('click', () => {
        const d = DIALOGUES[homeDialogueIdx];
        const text = d.turns.slice(0, 2).map((t) => t.en.replace(/[“”]/g, '')).join(' ');
        speakEnglish(text, {
          onStart: () => { dAudio.innerHTML = '<span>In riproduzione...</span> <span>🔊</span>'; },
          onEnd: () => { dAudio.innerHTML = '<span>Ascolta</span> <span>🔊</span>'; },
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

    // I. Cinema Video Player con Playlist Laterale
    const cinemaScreen = document.getElementById('cinema-screen');
    const playCenterBtn = document.getElementById('video-play-center-btn');
    const playIcon = document.getElementById('center-play-icon');
    const playBottomBtn = document.getElementById('video-play-btn');
    const muteBtn = document.getElementById('video-mute-btn');
    const volSlider = document.getElementById('video-vol-slider');
    const speedBtn = document.getElementById('video-speed-btn');
    const progressTrack = document.getElementById('video-progress-track');
    const progressFill = document.getElementById('video-progress-fill');
    const timeCurEl = document.getElementById('video-time-cur');
    const timeTotEl = document.getElementById('video-time-tot');
    const overlayTitle = document.getElementById('video-overlay-title');
    const mainHeading = document.getElementById('video-main-heading');
    const mainImg = document.getElementById('main-video-img');
    const lateralList = document.getElementById('video-lateral-list');

    if (cinemaScreen && lateralList) {
      const mainSubtitleEl = document.getElementById('video-main-subtitle');
      const countBadges = document.querySelectorAll('.js-video-count');
      const speeds = [1.0, 1.25, 1.5, 0.75];
      let speedIdx = 0;
      let isPlaying = false;
      let isMuted = false;
      let currentSec = 0;
      let totalSec = 765;
      let timerId = null;
      let currentMode = 'preview'; // 'preview' | 'video' | 'embed'
      let videoEl = null;
      let embedEl = null;

      const parseDuration = (str) => {
        const parts = String(str || '10:00').split(':').map(Number);
        if (parts.length === 2 && !Number.isNaN(parts[0]) && !Number.isNaN(parts[1])) {
          return parts[0] * 60 + parts[1];
        }
        return 600;
      };

      const fmtTime = (sec) => {
        const safe = Math.max(0, Math.floor(sec));
        const m = Math.floor(safe / 60);
        const s = safe % 60;
        return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
      };

      const getEmbedUrl = (url) => {
        if (!url) return null;
        const ytWatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([A-Za-z0-9_-]{6,})/);
        if (ytWatch) return `https://www.youtube.com/embed/${ytWatch[1]}?autoplay=1&rel=0`;
        const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
        if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1`;
        return null;
      };

      const toggleCustomControls = (visible) => {
        const controls = cinemaScreen.querySelector('.cinema-controls');
        if (playCenterBtn) playCenterBtn.style.display = visible ? 'inline-flex' : 'none';
        if (controls) controls.style.display = visible ? 'flex' : 'none';
      };

      const clearMedia = () => {
        if (timerId) {
          window.clearInterval(timerId);
          timerId = null;
        }
        if (videoEl) {
          videoEl.pause();
          videoEl.remove();
          videoEl = null;
        }
        if (embedEl) {
          embedEl.remove();
          embedEl = null;
        }
      };

      const updateProgressUi = () => {
        const dur = currentMode === 'video' && videoEl && videoEl.duration ? videoEl.duration : totalSec;
        const cur = currentMode === 'video' && videoEl ? videoEl.currentTime : currentSec;
        const pct = dur > 0 ? Math.min(100, Math.max(0, (cur / dur) * 100)) : 0;
        if (progressFill) progressFill.style.width = `${pct}%`;
        if (timeCurEl) timeCurEl.textContent = fmtTime(cur);
        if (timeTotEl) timeTotEl.textContent = fmtTime(dur);
      };

      const setPlaying = (nextState) => {
        if (currentMode === 'embed') return;
        isPlaying = nextState;
        cinemaScreen.classList.toggle('is-playing', isPlaying);
        if (playIcon) playIcon.textContent = isPlaying ? '❚❚' : '▶';
        if (playBottomBtn) playBottomBtn.textContent = isPlaying ? '❚❚' : '▶';

        if (currentMode === 'video' && videoEl) {
          if (isPlaying) videoEl.play().catch(() => {});
          else videoEl.pause();
          return;
        }

        if (timerId) {
          window.clearInterval(timerId);
          timerId = null;
        }
        if (isPlaying) {
          timerId = window.setInterval(() => {
            currentSec += speeds[speedIdx];
            if (currentSec >= totalSec) {
              currentSec = 0;
              setPlaying(false);
            }
            updateProgressUi();
          }, 1000);
        }
      };

      const loadItem = (item, autoPlay) => {
        if (!item) return;
        const chapter = item.dataset.chapter || '';
        const title = item.dataset.title || '';
        const subtitle = item.dataset.subtitle || '';
        const duration = item.dataset.duration || '10:00';
        const thumb = item.dataset.thumb || '';
        const src = (item.dataset.src || '').trim();

        clearMedia();
        currentSec = 0;
        totalSec = parseDuration(duration);

        if (overlayTitle) overlayTitle.textContent = chapter ? `${chapter}: ${title}` : title;
        if (mainHeading) mainHeading.textContent = title;
        if (mainSubtitleEl && subtitle) mainSubtitleEl.textContent = subtitle;
        if (mainImg && thumb) {
          mainImg.src = thumb;
          mainImg.style.display = 'block';
        }

        lateralList.querySelectorAll('.cinema-playlist-item').forEach((el) => {
          const active = el === item;
          el.classList.toggle('is-active', active);
          const statusEl = el.querySelector('.playlist-status');
          if (statusEl) statusEl.textContent = active ? 'In riproduzione' : '';
        });

        const embedUrl = getEmbedUrl(src);
        if (embedUrl) {
          currentMode = 'embed';
          toggleCustomControls(false);
          embedEl = document.createElement('iframe');
          embedEl.className = 'cinema-embed-frame';
          embedEl.src = embedUrl;
          embedEl.title = title || 'Video lezione';
          embedEl.allow = 'autoplay; fullscreen; picture-in-picture';
          embedEl.allowFullscreen = true;
          cinemaScreen.appendChild(embedEl);
          return;
        }

        toggleCustomControls(true);
        if (src) {
          currentMode = 'video';
          videoEl = document.createElement('video');
          videoEl.className = 'cinema-video-el';
          videoEl.src = src;
          videoEl.poster = thumb;
          videoEl.playsInline = true;
          videoEl.muted = isMuted;
          videoEl.volume = volSlider ? Number(volSlider.value) / 100 : 0.8;
          videoEl.playbackRate = speeds[speedIdx];
          videoEl.addEventListener('timeupdate', updateProgressUi);
          videoEl.addEventListener('loadedmetadata', updateProgressUi);
          videoEl.addEventListener('ended', () => setPlaying(false));
          cinemaScreen.insertBefore(videoEl, cinemaScreen.firstChild);
        } else {
          currentMode = 'preview';
        }

        updateProgressUi();
        setPlaying(autoPlay);
      };

      const allItems = lateralList.querySelectorAll('.cinema-playlist-item');
      countBadges.forEach((el) => {
        el.textContent = `${allItems.length} Video`;
      });

      if (playCenterBtn) playCenterBtn.addEventListener('click', () => setPlaying(!isPlaying));
      if (playBottomBtn) playBottomBtn.addEventListener('click', () => setPlaying(!isPlaying));

      if (muteBtn) {
        muteBtn.addEventListener('click', () => {
          isMuted = !isMuted;
          muteBtn.textContent = isMuted ? '🔇' : '🔊';
          if (volSlider) volSlider.value = isMuted ? '0' : '80';
          if (videoEl) videoEl.muted = isMuted;
        });
      }

      if (volSlider && muteBtn) {
        volSlider.addEventListener('input', () => {
          const val = Number(volSlider.value);
          isMuted = val === 0;
          muteBtn.textContent = isMuted ? '🔇' : '🔊';
          if (videoEl) {
            videoEl.muted = isMuted;
            videoEl.volume = val / 100;
          }
        });
      }

      if (speedBtn) {
        speedBtn.addEventListener('click', () => {
          speedIdx = (speedIdx + 1) % speeds.length;
          speedBtn.textContent = `${speeds[speedIdx]}x`;
          if (videoEl) videoEl.playbackRate = speeds[speedIdx];
        });
      }

      if (progressTrack) {
        progressTrack.addEventListener('click', (e) => {
          const rect = progressTrack.getBoundingClientRect();
          const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
          if (currentMode === 'video' && videoEl && videoEl.duration) {
            videoEl.currentTime = ratio * videoEl.duration;
          } else {
            currentSec = Math.round(ratio * totalSec);
          }
          updateProgressUi();
        });
      }

      lateralList.addEventListener('click', (e) => {
        const item = e.target.closest('.cinema-playlist-item');
        if (item) loadItem(item, true);
      });

      const initialItem = lateralList.querySelector('.cinema-playlist-item.is-active') || allItems[0];
      if (initialItem) loadItem(initialItem, false);
    }

    // J. Polaroid Audio Button (se presente)
    const polaroidBtn = document.getElementById('polaroid-audio-btn');
    if (polaroidBtn) {
      polaroidBtn.addEventListener('click', () => {
        speakEnglish('A flat white and a warm fruit scone, please!', {
          onStart: () => { polaroidBtn.textContent = 'Audio...'; },
          onEnd: () => { polaroidBtn.textContent = 'Ascolta'; },
        });
      });
    }

    // K. Contenitore Lezioni Statiche HTML (Manuale di Studio)
    const lessonChaptersList = document.getElementById('lesson-chapters-list');
    const lessonCanvas = document.getElementById('lesson-reading-canvas');
    const lessonReadTime = document.getElementById('lesson-read-time');
    const lessonCounter = document.getElementById('lesson-chapter-counter');
    const lessonPageLabel = document.getElementById('lesson-page-label');
    const lessonOpenLink = document.getElementById('lesson-open-link');
    const lessonPrevBtn = document.getElementById('lesson-prev-btn');
    const lessonNextBtn = document.getElementById('lesson-next-btn');
    const lessonZoomBtn = document.getElementById('lesson-zoom-btn');

    if (lessonChaptersList && lessonCanvas) {
      const chapterBtns = Array.from(lessonChaptersList.querySelectorAll('.lesson-chapter-btn'));
      let activeLessonIdx = Math.max(0, chapterBtns.findIndex((b) => b.classList.contains('is-active')));

      const updateNavButtons = () => {
        if (lessonCounter) lessonCounter.textContent = `Lezione ${activeLessonIdx + 1} di ${chapterBtns.length}`;
        if (lessonPageLabel) lessonPageLabel.textContent = `— Scheda ${String(activeLessonIdx + 1).padStart(2, '0')} —`;
        if (lessonPrevBtn) lessonPrevBtn.disabled = activeLessonIdx <= 0;
        if (lessonNextBtn) lessonNextBtn.disabled = activeLessonIdx >= chapterBtns.length - 1;
      };

      const loadLessonAt = async (idx) => {
        const btn = chapterBtns[idx];
        if (!btn) return;
        activeLessonIdx = idx;

        chapterBtns.forEach((b, i) => b.classList.toggle('is-active', i === idx));
        const src = btn.dataset.src || '';
        const time = btn.dataset.time || '~5 min';
        if (lessonReadTime) lessonReadTime.textContent = `Lettura: ${time}`;
        if (lessonOpenLink && src) lessonOpenLink.href = src;
        updateNavButtons();

        if (!src) return;
        try {
          const res = await fetch(src);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const html = await res.text();
          const parsed = new DOMParser().parseFromString(html, 'text/html');
          const docEl = parsed.querySelector('.lesson-doc') || parsed.body;
          lessonCanvas.innerHTML = docEl ? docEl.innerHTML : html;
        } catch {
          lessonCanvas.innerHTML = `<iframe class="lesson-iframe-fallback" src="${src}" title="${btn.dataset.title || 'Lezione HTML'}"></iframe>`;
        }
      };

      lessonChaptersList.addEventListener('click', (e) => {
        const btn = e.target.closest('.lesson-chapter-btn');
        if (!btn) return;
        const idx = chapterBtns.indexOf(btn);
        if (idx !== -1) loadLessonAt(idx);
      });

      if (lessonPrevBtn) {
        lessonPrevBtn.addEventListener('click', () => {
          if (activeLessonIdx > 0) loadLessonAt(activeLessonIdx - 1);
        });
      }

      if (lessonNextBtn) {
        lessonNextBtn.addEventListener('click', () => {
          if (activeLessonIdx < chapterBtns.length - 1) loadLessonAt(activeLessonIdx + 1);
        });
      }

      if (lessonZoomBtn) {
        lessonZoomBtn.addEventListener('click', () => {
          const large = lessonCanvas.classList.toggle('is-large');
          lessonZoomBtn.textContent = large ? 'A-' : 'A+';
        });
      }

      if (chapterBtns.length > 0) loadLessonAt(activeLessonIdx);
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
    safeRun(initMobileMenu);
    const page = document.body.dataset.page || 'home';
    if (page === 'home') safeRun(initHomePage);
    else if (page === 'quiz') safeRun(initQuizPage);
    else if (page === 'esercizi') safeRun(initEserciziPage);
    else if (page === 'dialogo') safeRun(initDialogoPage);
    else if (page === 'cultura') safeRun(initCulturaPage);
    else if (page === 'pronuncia') safeRun(initPronunciaPage);
  });
})();
