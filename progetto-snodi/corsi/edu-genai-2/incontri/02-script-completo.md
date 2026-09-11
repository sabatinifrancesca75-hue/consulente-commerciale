# Script completo — Incontro 2: Il prompt perfetto

**Venerdì 11 settembre 2026, 15:30–18:30 · Google Meet** — Conduzione parola per parola, allineata al deck v2 (27 card: https://gamma.app/docs/mllhtxwhs00hflz) + card "Copyright e licenze" da incollare dopo T.A.P.E. Le [parentesi] sono regia. Se un blocco sfora si taglia la teoria, mai il laboratorio.

---

## ⏱ 15:30 — Apertura [CARD 1–2]

«Buon pomeriggio a tutte e a tutti, bentornati. Mercoledì vi ho mostrato io una macchina che inventa bibliografie perfette. Oggi si comincia al contrario: la rompete voi — e poi la riparate voi. Subito al lavoro; la teoria arriva dopo, quando ve la sarete guadagnata. Ecco la rotta del pomeriggio [30 secondi sulla card rotta: esercitazione, teoria del prompt, C.R.A.F.T., 4R e demo, laboratorio, etica, agente], e ora l'esercitazione.»

## ⏱ 15:35 — Lancio di «Rompere e riparare» [CARD 3]

«L'esercitazione ha due parti, ve le spiego entrambe adesso perché nelle stanze lavorerete in autonomia.

Parte A — Rompere. Aprite Gemini con l'account d'istituto — d'istituto, mi raccomando. Chiedete una bibliografia di cinque titoli, con autore, anno ed editore, sul tema più di nicchia della vostra disciplina che vi viene in mente: più è specifico, meglio funziona l'esperimento. Poi verificate i primi tre titoli con una ricerca vera. E annotate nel documento condiviso "Falsi trovati" il falso più interessante che scovate — occhio alla categoria regina: il "quasi giusto", autore vero e titolo inventato. È quello che passa le verifiche frettolose.

E quando l'avrete rotta, non la cambiamo: la ripariamo. Stessa intelligenza artificiale, un vincolo in più — le diamo noi le fonti e le vietiamo di uscirne. Si chiama grounding, e lo strumento è NotebookLM. Ve lo mostro in un minuto, guardate lo schermo.

[REGIA — micro-demo NotebookLM, schermo condiviso, 90 secondi, gesti lenti]

Primo gesto: vado su notebooklm.google.com — sempre con l'account d'istituto — e clicco "Nuovo notebook". NotebookLM è un'IA con il guinzaglio: risponde dai documenti che le caricate voi. Niente oceano statistico: le vostre fonti.

Secondo gesto: carico le fonti. Nella cartella del corso trovate due PDF pronti — "PDF 1", gli Orientamenti etici per gli educatori della Commissione europea, e "PDF 2", l'AI Act. Li trascino qui. [attendere l'elaborazione] Se preferite usare due PDF affidabili della vostra disciplina, sul tema che avete appena "rotto", ancora meglio.

Terzo gesto: scrivo la domanda qui in basso. [es. "cosa dicono queste fonti sull'uso dell'IA nella valutazione degli studenti?"] E guardate la risposta: questi numeretti sono citazioni — le clicco, e mi portano al punto esatto del PDF. Questo, mercoledì, l'abbiamo chiamato grounding.

E l'ultima mossa, la più istruttiva — non saltatela: quando avete finito, chiedetegli una cosa che nei vostri PDF non c'è. E vi dico io cosa guardare, perché l'ho testato ieri sera: a un notebook caricato con documenti sul diritto d'autore ho chiesto la ricetta della carbonara — e me l'ha data. Quindi il guinzaglio non è assoluto: a volte risponde lo stesso, pescando dal modello generale. Il segnale affidabile è un altro: le citazioni. Se la risposta non ha i numeretti, non viene dalle vostre fonti — qualunque cosa dica. Fidatevi dei numeretti, non della prosa. Ne parliamo alla restituzione.

[REGIA: incollare in chat: "PARTE A: Gemini (account istituto) → bibliografia 5 titoli tema di nicchia → verifica 3 → falso più bello nel Doc 'Falsi trovati' · PARTE B: notebooklm.google.com (account istituto) → nuovo notebook → carica i 2 PDF della cartella (o 2 tuoi) → stessa domanda → clicca le citazioni → chiedi una cosa che NON c'è e guarda se ci sono i numeretti"]

In coppia, nelle stanze: undici minuti per la Parte A, poi vi avviso in chat e passate alla B. Ci rivediamo qui alle sedici meno un minuto. Via.»

[REGIA: stanze aperte ~15:41. Girare col tutor. 15:52 in chat: "→ PASSATE ALLA PARTE B: NotebookLM". 15:57: "2 minuti, poi si rientra".]

## ⏱ 15:59 — Restituzione [CARD 4, Doc "Falsi trovati" proiettato]

«Bentornati. Giro veloce: un falso esemplare per coppia — disciplina, prompt, il falso più bello. Trenta secondi ciascuna. [REGIA: a rotazione, annotare nel Doc; sottolineare i "quasi giusti".]

E ora la domanda che conta: nella Parte B, chi ha rifatto la stessa domanda in NotebookLM — cosa è cambiato? [2-3 risposte] E chi ha chiesto la cosa che nelle fonti non c'era — cosa ha fatto la macchina? [REGIA: esiti misti — "ha detto che non c'è" e "ha risposto lo stesso". Entrambi servono.]

Avete visto entrambi gli esiti, ed entrambi sono la lezione. Quando dice "nelle fonti non c'è": è il guinzaglio che funziona. Quando risponde lo stesso — come la mia carbonara di ieri sera — guardate: le citazioni non ci sono. Quella risposta non viene dalle vostre fonti: viene dal modello. La regola operativa del grounding: fidatevi dei numeretti, non della prosa. Il grounding non elimina la verifica — la rende possibile e veloce.

E allora, il punto del pomeriggio. Stessa domanda, due regimi: in A una risposta inventata con sicurezza, in B una risposta citata con la pagina — o smascherabile in un colpo d'occhio quando la pagina non c'è. Cos'è cambiato? Non la macchina: il design. Tenetelo a mente, perché la domanda vera di oggi è: e se il problema non fosse solo la macchina, ma come le parliamo? Da qui si parte.»

---

## ⏱ 16:07 — [CARD 5 · Espande o sostituisce?]

«Partiamo da una domanda sola, e vi chiedo di tenerla in tasca per tutto il pomeriggio: l'intelligenza artificiale espande o sostituisce l'uomo?

[pausa] Fermiamoci un attimo sulla portata storica di ciò che stiamo vivendo. Per migliaia di anni il linguaggio articolato — quello che costruisce concetti astratti, che argomenta, che inventa mondi — è stato solo nostro. Oggi, per la prima volta nella storia, una macchina interagisce e comunica attraverso il linguaggio. Non è un dettaglio tecnico: è un cambiamento antropologico.

E allora la tentazione è pensare che, se la macchina "parla", possa anche pensare al posto nostro. Ma il rovesciamento che vi propongo è questo: il nostro compito non è usare un software, come si usa un foglio di calcolo. È dirigere una forza cognitiva. E la risposta alla domanda — espande o sostituisce? — non dipende dalla macchina: dipende da chi tiene in mano il prompt. Se lo tiene chi non sa cosa chiedere, l'IA sostituisce, appiattisce, impoverisce. Se lo tiene un docente che sa cosa vuole e perché, l'IA espande, potenzia, moltiplica. La stessa macchina, due destini opposti — e a decidere siete voi.»

## [CARD 6 · Due linguaggi a confronto]

«Per dirigere questa forza, dobbiamo capire come "pensa". Il nostro linguaggio nasce da tre radici. Dall'esperienza: quando dico "mare", nella mia testa non c'è una definizione — c'è l'odore della salsedine, un'estate precisa, un ricordo. Dalla conoscenza del mondo: so che il fuoco brucia perché vivo in un corpo, in una fisica, in una cultura. E dall'etica: so distinguere ciò che è giusto da ciò che è utile.

Il linguaggio dell'IA nasce da tutt'altro: dati massivi, pura statistica. La macchina non "sa" che il fuoco brucia; ha calcolato che, nella sconfinata quantità di testi che ha letto, dopo "il fuoco" la parola "brucia" è statisticamente probabile. E per darvi la misura: secondo il matematico Alfio Quarteroni, entro la fine del 2025 abbiamo accumulato circa 200 zettabyte di dati — mille miliardi di miliardi di byte l'uno. Numeri che non riusciamo nemmeno a immaginare.

[pausa] Ed eccoci alla frase che è il cuore del pomeriggio, tenetela a mente: l'intelligenza artificiale è statisticamente brillante, ma eticamente cieca. Brillante, perché su quei 200 zettabyte fa previsioni impressionanti. Cieca, perché dietro non c'è coscienza: c'è statistica guidata dal nostro input. E se è cieca, ha bisogno di qualcuno che veda per lei. Quel qualcuno siete voi.»

## [CARD 7 · Epistemia] — proiettare anche l'infografica

«E questa condizione — la risposta brillante di una macchina cieca — ha un nome, che si sta affermando proprio in questi mesi: epistemia. È quando la fluidità del linguaggio sostituisce la giustificazione della conoscenza: leggo una risposta impeccabile e sento di sapere — senza aver fatto il lavoro di verificare.

Guardate [infografica]: il nostro cervello usa da sempre la fluidità come scorciatoia per stimare la credibilità — chi scrive bene, di solito, sa. Con l'IA questa scorciatoia si rompe: è il "fluente non vuol dire vero" di mercoledì, portato alla scala della società. Il rischio collettivo è accettare la coerenza formale come sostituto della verità fondata — "credibile ma non verificato", dice la lavagna.

[REGIA: aggiungere a voce la frattura mancante dall'infografica — la lettura della situazione: "e c'è una differenza che la lavagna non mostra: se dico 'ah, davvero un bell'affare!' davanti a un oggetto rotto, voi leggete la scena e capite il sarcasmo; la macchina spezzetta simboli e calcola. Noi analizziamo un mondo; lei una sequenza di caratteri." Se contestano "Random Walk": "è un'immagine — il termine esatto è predizione probabilistica del token".]

La contromisura non è smettere di usare l'IA: è l'alfabetizzazione epistemica — routine di verifica scritte dentro il prompt. Ed è esattamente il metodo di oggi: tutto ciò che vedrete da qui alle diciotto e trenta serve a non cadere nell'epistemia.»

## [CARD 8 · Il docente come regista cognitivo]

«E arriviamo al vostro ruolo, con un'immagine: il docente come regista cognitivo. Pensate a un regista di cinema: l'attore ha talento, la telecamera è tecnologia sofisticata, ma senza qualcuno che dica "questa scena così, con questa luce, per questo scopo" non nasce un film — nasce materiale grezzo. L'IA è l'attore e la telecamera insieme: potentissima, senza direzione.

Perché serve la vostra regia? Per una ragione semplice: l'IA non conosce il contesto. Non sa chi siete. Non sa chi sono i vostri studenti — se avete tre alunni con DSA, un neoarrivato, una classe svogliata alle otto del mattino. Non sa il vostro obiettivo didattico né cosa dice il vostro PTOF. Tutto questo glielo dovete dare voi. E il luogo dove glielo date si chiama prompt.

E c'è una bella conferma nell'etimologia: "prompt" viene dal latino promptus, "pronto, disponibile". Chi ha qualche capello grigio ricorderà i computer a schermo nero, il DOS: un cursore lampeggiava — C:\> — e diceva una cosa sola: il computer è pronto a ricevere un comando. Oggi è cambiato tutto e non è cambiato niente: il prompt è ancora il momento in cui la macchina si mette a disposizione. La differenza è che oggi non le diamo un comando tecnico: le diamo un'intenzione pedagogica. E tradurre un'intenzione pedagogica in un'istruzione che l'algoritmo esegue — questa, colleghi, è la nuova competenza digitale del docente.»

## ⏱ 16:22 — [CARD 9 · Perché il prompt conta]

«"Va bene," direte, "ma quanto conta davvero come scrivo la richiesta?" Conta tutto. Il principio è brutale: la qualità dell'output dipende dalla qualità dell'input. Non esiste un prompt pigro che generi un risultato brillante.

Due conseguenze concrete. La prima: un prompt ben strutturato riduce le allucinazioni — l'avete visto un'ora fa con le vostre mani. La seconda: un prompt consapevole tutela i dati. E qui una frase da tenere: sapere cosa non scrivere è importante quanto sapere cosa scrivere.

E ne vale la pena, i numeri lo dicono: in un trial inglese su 259 docenti, l'uso guidato dell'IA nella preparazione delle lezioni ha ridotto il tempo di pianificazione del 31 per cento — a qualità invariata. E nella co-creazione di materiali, il carico cognitivo percepito si dimezza. Non è magia: è metodo. Vediamolo.»

## [CARD 10 · Come funziona l'interazione]

«Un minuto di "sotto il cofano". Il ciclo è sempre lo stesso, quattro passi: Prompt — la vostra istruzione; Elaborazione — la macchina calcola; Output — la risposta; e Interpretazione. L'ultimo passo è vostro, ed è il più importante: l'output non è un verdetto, è una bozza che voi interpretate, validate, correggete.

E una nota che vi tranquillizza: questi strumenti sono dialogici, mantengono memoria del contesto dentro la conversazione — potete correggerli, chiedere di riformulare, andare avanti. La logica non è di ieri: già negli anni Sessanta, al MIT, un programma di nome ELIZA simulava un dialogo con uno psicoterapeuta. Nuova è la potenza; antico è il principio: la macchina risponde a chi la sa interrogare.»

## ⏱ 16:28 — [CARD 11 · C.R.A.F.T.]

«Ed eccoci al cuore operativo. Come si costruisce un prompt che funziona? Con un acronimo che vi porterete a casa: C.R.A.F.T. — che in inglese significa "artigianato", e non è un caso: scrivere un buon prompt è un mestiere artigiano. Cinque elementi.

C, Context — il contesto: disciplina, classe, cosa sanno già. Senza questo, l'IA spara nel mucchio.

R, Role — il ruolo: l'identità che assegnate alla macchina. "Sei un esperto di didattica per alunni con DSA", "sei un editor severo". Perché? Perché costringe il modello a pescare nella zona giusta dei suoi dati, col lessico e la prospettiva giusti.

A, Action — l'azione: il compito esatto, e qui la regola d'oro: verbo forte. Non "parlami della fotosintesi", ma "sintetizza in 5 punti", "confronta", "genera", "correggi", "simula". Il verbo generico produce risposte generiche.

F, Format — il formato: tabella, elenco, mappa, script. Se non lo dite, la macchina sceglie per voi — e sceglie quasi sempre il muro di testo.

T, Target — il destinatario o l'obiettivo: "per studenti che devono preparare un dibattito", "perché comprendano il rischio, non i tecnicismi".

E badate: ogni lettera che togliete si sente. Via il Ruolo, cala la competenza. Via il Formato, arriva il muro di testo. Via il Target, il tono va a caso.»

## [CARD 12 · La prova del contrasto]

«Ve lo dimostro con un contrasto, perché a parole sembra ovvio e non lo è. Il prompt più comune del mondo: "fammi una verifica sulle equazioni di secondo grado". Cosa manca? Tutto. La macchina non sa per che classe, non sa il vostro ruolo, non sa quante domande, in che forma, con che obiettivo. Vi restituirà una verifica media, per uno studente medio che non esiste.

Ora lo stesso compito vestito con C.R.A.F.T. [leggere con calma]: "Contesto: seconda liceo scientifico, appena concluse le equazioni di secondo grado. Ruolo: sei un insegnante di matematica esperto in didattica per competenze. Azione: crea una verifica di dieci esercizi a difficoltà crescente. Formato: tabella con colonne esercizio, spazio svolgimento e punteggio, più una griglia di correzione a parte. Target: valutare se sanno riconoscere e impostare, non solo risolvere."

Sentite la differenza? Nel primo caso ho fatto una domanda. Nel secondo ho progettato uno strumento.»

## [CARD 13 · Le 3C]

«Ora, una cosa onesta: cinque elementi, in corsa tra una lezione e l'altra, sono tanti. Per questo esiste la versione tascabile: le 3C. Contesto — chi sei e a chi ti rivolgi. Compito — cosa deve fare, con un verbo forte. Criteri — come lo voglio. Non è un modello diverso: è lo stesso C.R.A.F.T. compresso — Contesto e Ruolo confluiscono nel Contesto, l'Azione diventa il Compito, Formato e Target diventano i Criteri.

Regola pratica: quando progettate con calma, C.R.A.F.T. completo; quando siete di corsa, le 3C bastano. Un modello, due marce.»

## ⏱ 16:50 — [CARD 14 · Pausa]

«Cinque minuti veri. Al ritorno: i quattro filtri che trasformano un buon prompt in un prompt affidabile.»

---

## ⏱ 16:55 — [CARD 15 · Le 4R]

«Bentornati. C.R.A.F.T. costruisce lo scheletro. Ma per passare da un buon prompt a un prompt affidabile servono filtri di qualità: le 4R.

Prima R, Riferimenti — le fonti. Il vostro anti-allucinazione: "usa solo il testo che ti ho caricato", "cita il paragrafo". La macchina smette di inventare e lavora sul vostro materiale verificato.

Seconda R, Restrizione — la pertinenza: "massimo 200 parole", "escludi le date successive al 1945". Delimitare il campo tiene la macchina sul pezzo.

Terza R, Revisione — l'inclusività: "riscrivi questo testo per uno studente con dislessia, frasi brevi, senza subordinate". Un lavoro che a mano costa un'ora, così un minuto — mantenendo il controllo.

Quarta R, Ripetizione — l'iterazione. Il prompt raramente è perfetto al primo colpo: "troppo lungo, dimezzalo", "questo esempio non va bene per la mia classe, cambialo". Molti colleghi si scoraggiano al primo tentativo — "vedi, ha sbagliato, non serve". Ma il primo prompt è quasi sempre una bozza: il vero mestiere è nel dialogo che segue. Non cercate il prompt perfetto: cercate la conversazione perfetta.

Un modo per ricordarle: le prime due mettono le briglie prima, le altre due rifiniscono dopo.»

## [CARD 16 · La R più preziosa — dal vivo in NotebookLM]

«E sulla prima R voglio insistere, perché risolve il problema che più vi spaventa. Ve lo mostro dal vivo, con lo strumento che avete usato un'ora fa.

[REGIA — schermo condiviso su NotebookLM, notebook già pronto con l'AI Act caricato:] Senza fonti, chiedere "elencami cinque sentenze della Corte Costituzionale sul diritto all'istruzione" a un chatbot libero produce un elenco con numeri e anni plausibili — alcune vere, alcune false, e a colpo d'occhio non le distinguete. Ora guardate qui: ho caricato l'AI Act, e chiedo: "elenca le pratiche vietate dall'articolo 5 e indica la pagina". [eseguire] Risposta con i numeretti — li clicco — eccola, la pagina del regolamento.

Ho trasformato un generatore di verosimiglianza in un assistente di ricerca. E questa mossa da oggi sapete scriverla dentro qualunque prompt, anche fuori da NotebookLM: "basandoti esclusivamente sul documento caricato… e cita la pagina". È il grounding di mercoledì, diventato una riga di testo.»

## ⏱ 17:10 — [CARD 17 · Demo: da "spiegami il Romanticismo" al progetto di lezione]

[REGIA: demo collaudata; screenshot di riserva. Gemini a schermo condiviso.]

«E ora tutto il metodo in azione, su un caso vero. Il prima: "spiegami il Romanticismo". [eseguire o mostrare screenshot] Un paragrafo enciclopedico — corretto e dimenticabile.

Ora costruiamolo insieme. Contesto: quarta liceo scientifico. Ruolo: sei un instructional designer esperto di didattica inclusiva. Azione: progetta 30 minuti di lezione sul Romanticismo con un aggancio emotivo iniziale. Formato: fasi con tempi e materiali proiettabili. Target: una classe reale — e notate come lo scrivo, con profili sintetici, mai nomi: "due studenti con DSA, uno studente plusdotato che si annoia". E aggiungo una R: "usa solo il capitolo che ti ho caricato". [eseguire]

Guardate cosa è cambiato: dal cosa al come. Tempi scanditi, stimoli multisensoriali per i DSA, una sfida laterale per il plusdotato, il focus scienza-e-natura calibrato sull'indirizzo scientifico. Non ho chiesto contenuti: ho chiesto una strategia d'aula.

E ora le iterazioni — la quarta R in azione: "aggiungi tre domande di verifica, una a difficoltà alta". [eseguire] "Riscrivi l'introduzione con frasi brevi, per uno studente con difficoltà di lettura." [eseguire] Stesso contenuto, tre versioni, tre minuti. Provate a immaginare quanto vi sarebbe costato a mano — l'IA non vi toglie tempo di insegnamento: ve ne restituisce.

[Se compare un errore o un dato inventato: fermarsi e mostrarlo — "vedete? qui ha allucinato: ecco perché la R dei Riferimenti. L'errore in diretta non è un incidente della demo: è la demo".]»

## ⏱ 17:20 — [CARD 18 · Bloom e la tassonomia inversa]

«Fin qui il come scrivere. Ora una domanda più profonda: a quale livello di pensiero voglio far lavorare lo studente? Ci guida la tassonomia di Bloom: "elenca" attiva il ricordo, "spiega con un'analogia" la comprensione, "analizza le cause" l'analisi, "identifica i bias" la valutazione. Scegliere il livello significa decidere che studente sto formando in quel momento.

Ma c'è una svolta pensata per l'era dell'IA: la tassonomia inversa. Il problema: l'IA è fulminea ai livelli bassi — ricorda e riassume in due secondi. Se lascio lì lo studente, la macchina gli ruba il lavoro. Allora capovolgo la piramide: parto dall'alto, dalla creazione — lo studente genera subito, con l'IA, un prodotto. Poi lo faccio scendere: analizza quell'output, trova gli errori, i bias, cosa manca. E attraverso la critica arriva alla comprensione profonda. Il segreto è tutto qui: lo studente lavora sull'output della macchina, non lo subisce.»

## [CARD 19 · Pattern Catena e Critico]

«E quando prendete confidenza, due pattern che simulano la logica e la critica umana.

Il Pattern della Catena — chain of thought: "risolvi passo dopo passo, spiega il ragionamento, e solo alla fine dai la conclusione". Controintuitivo ma potentissimo: esplicitando i passaggi la macchina sbaglia meno — come lo studente costretto a mostrare i calcoli. E per voi c'è un vantaggio didattico enorme: il ragionamento mostrato si porta in classe — "dove ha ragionato bene? dove ha preso una scorciatoia?". L'errore della macchina diventa materiale didattico.

Il Pattern del Critico: "analizza l'output che hai appena prodotto, trova i tre punti più deboli, riscrivili". La macchina che rilegge la macchina, sotto la vostra supervisione — e intanto insegnate, anche agli studenti che guardano, che nessun primo tentativo è intoccabile.

Un'avvertenza: questi pattern simulano la logica, non la possiedono. Il giudice ultimo restate voi.»

## [CARD 20 · L'Unplanning — Slow AI]

«E c'è un terzo pattern, il più contro-intuitivo di tutti. Vi ricordate la regola di mercoledì — attivazione cognitiva prima, IA dopo — e il suo nome, Slow AI? Ecco il suo pattern operativo: l'unplanning.

Unplanning significa prendere una lezione che insegnate da anni nello stesso modo e decostruirla, introducendo incertezza strutturata: vincoli e obiettivi rigidi, percorso aperto. E il prompt che lo fa è rovesciato rispetto a tutti quelli visti finora: è ostinatamente socratico — mai risposte pronte, una domanda alla volta, solo possibilità: "cosa succederebbe se…", "e se provassimo a…". La proprietà delle idee resta a voi. Con la regola "Prima l'Umano": l'IA mai come primo passo — prima la vostra progettazione, poi la macchina come cassa di risonanza.

Qui il prompt serve a impedire all'IA di rispondere — e a costringere voi a pensare. [Se il tempo regge, micro-demo 2': incollare il prompt compatto della scheda 2-bis e mostrare che l'IA rifiuta di dare il piano e fa una domanda.] Il prompt completo è nella scheda 2-bis: provatelo a casa. E l'esperienza integrale la vivremo all'ultimo incontro.»

## [CARD 21 · Context Conveyor]

«Ultima tecnica, per un problema che avrete già sperimentato: nelle conversazioni lunghe l'IA perde il filo. Quattro dichiarazioni da taschino: "All'interno dell'ambito X" — ristabilisce i confini. "Considera Y" — le rielenca ciò che deve tenere presente. "Ignora Z" — scarta ciò che non serve più. E quando la conversazione è troppo ingarbugliata: "ricominciamo da capo" — lavagna pulita.»

---

## ⏱ 17:32 — [CARD 22 · Laboratorio: il prompt-template]

«E ora tocca a voi: il momento per cui vi ho chiesto di portare un vostro materiale. Obiettivo: trasformarlo in un prompt-template riusabile, nel vostro stile.

La struttura è C.R.A.F.T. più due potenziamenti. Il primo: l'Esemplare — incollate nel template un pezzo del vostro materiale come modello di stile. E vi regalo il nome tecnico: si chiama few-shot, "con pochi esempi". Fin qui abbiamo lavorato zero-shot — solo istruzioni; quando invece mostrate alla macchina uno o due esemplari del vostro stile, invece di descriverlo a parole, la qualità sale di colpo: la macchina imita meglio di quanto ascolti. Istruzioni più esemplari: la coppia professionale. Il secondo potenziamento: almeno una R scritta dentro — un Riferimento o una Restrizione.

La procedura, sulla scheda 2: cinque minuti per capire cosa rende "vostro" il materiale; quindici per scrivere il template; cinque per generare, confrontare con l'originale e rigenerare con un vincolo in più; dieci per lo scambio in coppia — eseguite il template del collega senza spiegazioni a voce: l'output è all'altezza? Poi salvate nella Prompt-libreria, nel formato standard.

[REGIA: stanze o lavoro individuale con coppie per lo scambio; girare col tutor; chi è senza materiale riceve uno dei 3 di riserva. Obiettivo minimo: un template funzionante a testa, caricato in libreria.]

Via — ci rivediamo alle diciotto e cinque.»

## ⏱ 18:05 — [CARD 23 · Prompt-libreria, 2']

«[REGIA: mostrare la libreria che si popola] Guardatela: è il primo artefatto collettivo del corso. Ogni template che caricate servirà anche ai colleghi del territorio, attraverso la libreria dello Snodo — e questo ci porta dritti all'ultima cosa seria di oggi.»

## ⏱ 18:07 — [CARD 24 · T.A.P.E.] + [CARD Copyright]

«L'etica, in forma operativa: quattro principi, e per ciascuno una micro-azione — una frase da scrivere dentro il prompt.

T, Trasparenza: dichiarate sempre l'uso dell'IA — in coda al materiale: "assistenza IA usata per…, con versione e data". Non è ammettere una debolezza: è la stessa onestà con cui chiediamo agli studenti di citare le fonti.

A, Accuratezza — e questa micro-azione è potentissima: "se non puoi citare fonti verificabili, scrivi: SENZA FONTI VERIFICABILI". Costringete la macchina a dichiarare la propria incertezza invece di mascherarla. Nella scheda 2-quater trovate una batteria intera di frasi come questa — le frasi di igiene epistemica: una per gruppo nel prompt che conta, e l'epistemia di cui parlavamo alle quattro non vi tocca più.

P, Privacy: mai dati personali di studenti — lo sapete da mercoledì. La micro-azione in più: "rileva eventuali dati personali e sostituiscili con omissis".

E, Equità: "elenca tre possibili bias in questo testo e riscrivilo in modo inclusivo".

E siccome i vostri materiali stanno per entrare in una libreria condivisa, tre regole su copyright e licenze [CARD Copyright]. Uno: l'output puramente generato non ha tutela autorale — ma il vostro lavoro di selezione, correzione e adattamento sì: i materiali revisionati sono lavoro professionale vostro. Due: non incollate nei prompt testi integrali protetti di terzi — brani d'autore, eserciziari: riassunti, estratti brevi, materiali vostri. Tre: ciò che entra nella libreria dello Snodo viaggia con licenza Creative Commons — la consigliata è CC BY-NC-SA: riusabile dai colleghi, con attribuzione, non a fini commerciali, stessa licenza.»

## [CARD 24-bis · L'audit: il controllo che ha un nome]

«Prima dell'ultimo strumento, vi do la parola che tiene insieme tutto quello che avete visto oggi: audit. Viene dal mondo del controllo di qualità e significa una cosa precisa: verificare qualcosa contro criteri dichiarati — non rileggere a sensazione, non "mi sembra che vada bene": controllare punto per punto contro una lista di requisiti. E nel nostro mestiere con l'IA l'audit si fa in due direzioni.

La prima: l'audit dell'input — il mio prompt è a norma? I criteri li avete imparati oggi: c'è il Contesto? il Ruolo? un verbo forte? il Formato? il Target? le fonti? la privacy? E qui il colpo elegante: questo controllo potete delegarlo alla macchina stessa. Guardate questa frase [leggerla dalla card]: "Prima di eseguire questo prompt, analizzalo: verifica se contiene Contesto, Ruolo, Azione con verbo forte, Formato e Target. Elenca gli elementi mancanti e proponi la versione migliorata. Non eseguire finché non approvo." È il Pattern del Critico applicato all'input invece che all'output: la macchina fa l'audit del vostro prompt, prima ancora di lavorare. Provatelo: è dieci secondi, e vi educa la mano.

La seconda direzione: l'audit del processo — non giudico solo cosa mi ha risposto, ma come ci è arrivata. Gli strumenti li avete già: il Pattern della Catena — "mostra il ragionamento passo passo" — mi fa vedere dove sbaglia, non solo se sbaglia. E le citazioni — "indica fonte e pagina" — mi fanno risalire all'origine di ogni affermazione. La differenza è tutta qui: una risposta senza processo posso solo crederla o non crederla; una risposta col processo esposto posso verificarla pezzo per pezzo. Ve lo ricordate sull'infografica di oggi pomeriggio? "Non solo il risultato: valutare trasparenza e affidabilità del processo" — eccolo, l'audit dei processi.

E notate la coerenza con mercoledì: è esattamente la postura del deployer — chi mette in uso sistemi su altre persone ha il dovere di documentare e supervisionare il processo, non solo di guardare i risultati. Dalla governance della scuola al singolo prompt, il principio è lo stesso: niente si accetta sulla fiducia della bella prosa. È l'antidoto all'epistemia.

E allora, l'ultimo strumento di oggi è proprio questo: il vostro protocollo di audit dell'input, in sette domande.»

## [CARD 25 · La checklist finale]

«Eccole, e prima di usare qualunque output, sette domande — dieci secondi che salvano una lezione: ho definito l'obiettivo didattico? ho assegnato un ruolo autorevole? ho specificato destinatario e livello? ho inserito vincoli e criteri? ho chiesto di citare le fonti? ho garantito la privacy? e la più importante: ho revisionato personalmente l'output? [pausa] Se anche una sola risposta è no, quell'output non entra in classe.»

## ⏱ 18:15 — [CARD 26 · Dal prompt all'agente]

«Ultima finestra, sul futuro prossimo. Il template che avete scritto oggi è riusabile a mano. E se si eseguisse da solo? Esiste una scala di autonomia: zero, tutto manuale; uno, assistito; due, esecuzione in blocco supervisionata; tre, si attiva da solo ma voi revisionate; quattro, autonomo con controlli a campione — solo per l'amministrativo; cinque — mai. Il perimetro didattico sano è tra due e tre. La valutazione resta a livello uno: l'algoritmo propone, il docente dispone.

E ve lo mostro: si chiama "Il lunedì se lo prepara l'agente". [REGIA: demo del flusso — Run now sulla riga demo "Derivata di una funzione"; piano B: i tre Gems.] Un flusso legge il programma della settimana e prepara le bozze dei materiali — bozze, che il docente revisiona. Il kit completo è nella cartella Demo agente: chi vuole sperimentare, agli incontri quattro e cinque costruiremo assistenti personalizzati.»

## ⏱ 18:25 — [CARD 27 · Chiusura]

«Tre consegne, semplici. Uno: rifinite il template e caricatelo nella Prompt-libreria entro lunedì quattordici. Due: usatelo almeno una volta su un materiale reale. Tre — la più importante: scegliete l'argomento della vostra Unità di Apprendimento, perché martedì quindici si apre il project work, il cuore del corso.

E chiudo tornando alla domanda dell'inizio: espande o sostituisce? Ora avete la risposta. Il futuro della didattica non è l'intelligenza artificiale: è l'intelligenza umana amplificata. La macchina è lo strumento più potente che abbiamo mai avuto tra le mani, ma resta uno strumento — la mano, la testa e il cuore sono i vostri. Il genio non è la macchina. Il genio siete voi. Grazie, e a martedì.»

[Firma del registro.]

---

## Contingenze e tagli d'emergenza

- **Se alle 16:10 la restituzione è lunga:** comprimere le card 9-10 (perché conta + interazione) a una frase ciascuna: "input di qualità = output di qualità" / "l'output è una bozza, l'interpretazione è vostra".
- **Se alle 16:50 C.R.A.F.T. non è finito:** saltare la card 13 (3C) — recuperarla in una riga al lancio del laboratorio ("versione tascabile sulla scheda").
- **Se alle 17:20 siete indietro:** Bloom (card 18) in 2 frasi; saltare la micro-demo unplanning (resta la card + "provatelo a casa"); Conveyor in 30 secondi.
- **Se alle 18:10 il blocco etica è lungo:** la card audit si comprime a una frase-ponte ("questo controllo sistematico ha un nome, audit — sull'input è la checklist che segue, sul processo sono Catena e citazioni") e si passa alla checklist.
- **Se la demo Romanticismo non allucina e fila liscia:** nessun problema — la lezione è la trasformazione, non l'errore. Se allucina: è la demo.
- **Se il laboratorio parte lento:** i 3 materiali di riserva; obiettivo minimo un template a testa.
- **Mai tagliare:** l'esercitazione d'apertura con la restituzione, C.R.A.F.T. con la prova del contrasto, il laboratorio, la checklist, le consegne.
