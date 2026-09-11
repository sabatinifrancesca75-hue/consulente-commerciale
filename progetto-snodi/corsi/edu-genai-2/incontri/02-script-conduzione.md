# Script di conduzione — Incontro 2: Il prompt perfetto

**Venerdì 11 settembre 2026, 15:30–18:30, Google Meet** — Formatrice: Prof.ssa Sabatini • Tutor: Prof. Bonelli

**Impianto aggiornato** sul materiale "Il prompt perfetto" (C.R.A.F.T./3C, 4R, pattern avanzati, T.A.P.E., checklist — adattato dal percorso "Il Genio non è l'AI, sei tu"/FMD), con in apertura l'esercitazione "Rompere e riparare" ereditata dall'incontro 1. Deck: `02-gamma-deck-prompt.md` (25 card).

**Obiettivi:** i corsisti sanno costruire un prompt con C.R.A.F.T. (e la versione tascabile 3C) e filtrarlo con le 4R; conoscono tassonomia inversa, pattern Catena/Critico e Context Conveyor; escono con un prompt-template professionale nel proprio stile (con esemplare few-shot) caricato nella Prompt-libreria; applicano T.A.P.E. e la checklist delle 7 domande; hanno visto la scala di autonomia e la demo dell'agente.

## Scaletta

| Orario | Blocco | Conduzione | Materiali |
|---|---|---|---|
| 15:30–15:35 | Apertura | Copertina + rotta. Aggancio: "mercoledì la teoria dell'allucinazione — oggi la sperimentate e imparate a governarla" | Deck card 1–2 |
| 15:35–16:05 | **Rompere e riparare** | Card 3: lancio (3') → stanze in coppia: Parte A 12' + Parte B 8' → restituzione 8' con card 4 (un falso per coppia nel Doc "Falsi trovati"). Chiudere con la domanda-ponte: "e se il problema fosse come le parliamo?" | Scheda [→ inc. 2], Doc Falsi trovati |
| 16:05–16:20 | La posta in gioco | Card 5–7: espande o sostituisce · due linguaggi ("statisticamente brillante, eticamente cieca") · regista cognitivo + etimologia *promptus*/DOS | Deck |
| 16:20–16:30 | Perché il prompt conta | Card 8–9: qualità input→output; evidenza EEF −31% e PromptHive −50%; ciclo Prompt→Elaborazione→Output→**Interpretazione**; ELIZA | Deck |
| 16:30–16:50 | **C.R.A.F.T. + 3C** | Card 10–12: i 5 elementi; la prova del contrasto (verifica equazioni: "domanda" vs "strumento"); le 3C come versione tascabile — "un modello, due marce" | Deck |
| 16:50–16:55 | Pausa | Card 13 | — |
| 16:55–17:10 | **Le 4R** | Card 14–15: due briglie prima (Riferimenti, Restrizione), due rifiniture dopo (Revisione, Ripetizione); affondo sulla R più preziosa (caso sentenze) — aggancio esplicito al grounding di mercoledì | Deck |
| 17:10–17:20 | **Demo dal vivo** | Card 16: "spiegami il Romanticismo" vs C.R.A.F.T.+R per una quarta scientifico (con profili sintetici DSA/plusdotato) + 2 iterazioni live (domanda difficile; versione alta leggibilità). Se allucina: fermarsi e mostrarlo — "l'errore in diretta È la demo" | Gemini |
| 17:20–17:32 | Livelli e pattern | Card 17–20: Bloom + tassonomia inversa; Catena e Critico; **Unplanning/Slow AI** (aggancio all'incontro 1: "la regola di mercoledì ha il suo pattern" — presentazione del metodo + prompt compatto in scheda 2-bis; l'esperienza completa è all'incontro 6); Context Conveyor | Deck |
| 17:32–18:07 | **Laboratorio** | Card 20–21: il prompt-template personale = C.R.A.F.T. + Esemplare (few-shot) + almeno una R. Procedura 5'+15'+5'+10'. Obiettivo minimo: un template funzionante a testa nella Prompt-libreria | Scheda 2, Prompt-libreria |
| 18:07–18:15 | Etica e controllo | Card 22–23: T.A.P.E. con le micro-azioni (leggerle: sono frasi da incollare) + checklist delle 7 domande ("una sola risposta no = non entra in classe") | Deck |
| 18:15–18:25 | Dal prompt all'agente | Card 24: scala di autonomia + demo "Il lunedì se lo prepara l'agente" (Run now sulla riga demo). Piano B: i 3 Gems | Kit demo-agente |
| 18:25–18:30 | Chiusura | Card 25: consegne (template in libreria entro lunedì 14; argomento UdA per mercoledì) + chiusura "Il genio non è la macchina: il genio siete voi". Firma registro | — |

## Apertura parola per parola — 15:30–16:07

*Il testo tra «virgolette» si pronuncia; le [parentesi] sono regia. Nodo risolto: le stanze restano aperte per A+B di seguito, quindi TUTTO il lancio — Parte A, frase ponte e micro-demo NotebookLM — si fa in plenaria prima di aprirle; il passaggio A→B lo scandisce un avviso in chat.*

### ⏱ 15:30 — Apertura

«Buon pomeriggio a tutte e a tutti, bentornati. Mercoledì vi ho mostrato io una macchina che inventa bibliografie perfette. Oggi si comincia al contrario: la rompete voi — e poi la riparate voi. Subito al lavoro; la teoria arriva dopo, quando ve la sarete guadagnata. Ecco la rotta del pomeriggio [CARD rotta, 30 secondi sui blocchi], e ora l'esercitazione.»

### ⏱ 15:35 — Lancio di «Rompere e riparare» [CARD esercitazione]

«L'esercitazione ha due parti, ve le spiego entrambe adesso perché nelle stanze lavorerete in autonomia.

**Parte A — Rompere.** Aprite Gemini con l'account d'istituto — d'istituto, mi raccomando. Chiedete una bibliografia di cinque titoli, con autore, anno ed editore, sul tema più di nicchia della vostra disciplina che vi viene in mente: più è specifico, meglio funziona l'esperimento. Poi verificate i primi tre titoli con una ricerca vera. E annotate nel documento condiviso "Falsi trovati" il falso più interessante che scovate — occhio alla categoria regina: il "quasi giusto", autore vero e titolo inventato. È quello che passa le verifiche frettolose.

E quando l'avrete rotta, non la cambiamo: **la ripariamo**. Stessa intelligenza artificiale, un vincolo in più — le diamo noi le fonti e le vietiamo di uscirne. Si chiama grounding, e lo strumento è NotebookLM. Ve lo mostro in un minuto, guardate lo schermo.

[REGIA — micro-demo NotebookLM, schermo condiviso, 90 secondi, gesti lenti:]

Primo gesto: vado su notebooklm.google.com — sempre con l'account d'istituto — e clicco "Nuovo notebook". Ecco: NotebookLM è un'IA con il guinzaglio — risponde *solo* dai documenti che le caricate voi. Niente oceano statistico: solo le vostre fonti.

Secondo gesto: carico le fonti. Nella cartella del corso trovate due PDF pronti — "PDF 1", gli Orientamenti etici per gli educatori della Commissione europea, e "PDF 2", l'AI Act. Li trascino qui. [attendere l'elaborazione] Se preferite usare due PDF affidabili della vostra disciplina, sul tema che avete appena "rotto", ancora meglio.

Terzo gesto: scrivo la domanda qui in basso. [digitare una domanda d'esempio, es. "cosa dicono queste fonti sull'uso dell'IA nella valutazione degli studenti?"] E guardate la risposta: questi numeretti sono **citazioni** — le clicco, e mi porta al punto esatto del PDF. Questo, mercoledì, l'abbiamo chiamato grounding.

E l'ultima mossa, la più istruttiva — non saltatela: quando avete finito, chiedetegli una cosa che nei vostri PDF *non c'è*. E vi dico io cosa guardare, perché l'ho testato ieri sera: a un notebook caricato con documenti sul diritto d'autore ho chiesto la ricetta della carbonara — e me l'ha data. Quindi il guinzaglio non è assoluto: a volte risponde lo stesso, pescando dal modello generale. Il segnale affidabile è un altro: **le citazioni**. Se la risposta non ha i numeretti, non viene dalle vostre fonti — qualunque cosa dica. Fidatevi dei numeretti, non della prosa. Ne parliamo alla restituzione.

[REGIA: incollare in chat la riga-promemoria: "PARTE A: Gemini (account istituto) → bibliografia 5 titoli tema di nicchia → verifica 3 → falso più bello nel Doc 'Falsi trovati' · PARTE B: notebooklm.google.com (account istituto) → nuovo notebook → carica i 2 PDF della cartella (o 2 tuoi) → stessa domanda → clicca le citazioni → chiedi una cosa che NON c'è"]

In coppia, nelle stanze: undici minuti per la Parte A, poi vi avviso in chat e passate alla B. Ci rivediamo qui alle sedici meno un minuto. Via.»

[REGIA: aprire le stanze ~15:41. Girare con il tutor. Alle 15:52 avviso in chat: "→ PASSATE ALLA PARTE B: NotebookLM". Alle 15:57: "2 minuti, poi si rientra".]

### ⏱ 15:59 — Restituzione [Doc "Falsi trovati" proiettato]

«Bentornati. Giro veloce: un falso esemplare per coppia — disciplina, prompt, il falso più bello. Trenta secondi ciascuna. [REGIA: giro a rotazione, annotare nel Doc. Se emergono "quasi giusti", sottolinearli: sono l'oro.]

E ora la domanda che conta: nella Parte B, chi ha rifatto la stessa domanda in NotebookLM — cosa è cambiato? [raccogliere 2-3 risposte: citazioni, risposte più caute] E chi ha chiesto la cosa che nelle fonti non c'era — cosa ha fatto la macchina? [REGIA: gli esiti saranno misti — alcuni "ha detto che non c'è", altri "ha risposto lo stesso". Entrambi servono.]

Avete visto entrambi gli esiti, ed entrambi sono la lezione. Quando dice "nelle fonti non c'è": ottimo, è il guinzaglio che funziona. Quando risponde lo stesso — come la mia carbonara di ieri sera — guardate la risposta: **le citazioni non ci sono**. È il segnale: quella risposta non viene dalle vostre fonti, viene dal modello. La regola operativa del grounding è questa: **fidatevi dei numeretti, non della prosa**. Il grounding non elimina la verifica — la rende possibile e veloce.

E allora, il punto del pomeriggio. Stessa domanda, due regimi: in A una risposta **inventata con sicurezza**, in B una risposta **citata con la pagina** — o smascherabile in un colpo d'occhio quando la pagina non c'è. Cos'è cambiato? Non la macchina: **il design**. Tenetelo a mente per tutto il pomeriggio, perché la domanda vera di oggi è questa: e se il problema non fosse solo la macchina, ma **come le parliamo**? Da qui si parte.»

[→ si prosegue con la CARD "Espande o sostituisce?" — il testo parlato dei blocchi teorici è nel documento "Il prompt perfetto".]

## Note di regia

- **Rompere e riparare in apertura** è l'aggancio perfetto: *prima di imparare a chiedere bene, vedete perché non ci si fida della risposta*. Tenere i tempi stretti: la restituzione è un giro secco, il Doc "Falsi trovati" si riapre agli incontri 4-5.
- **La frase-cardine del pomeriggio** è "statisticamente brillante, eticamente cieca": lanciarla alla card 6 e richiamarla a T.A.P.E. (card 22) — apre e chiude il cerchio.
- **La prova del contrasto (card 11) è l'argomento più convincente**: leggere i due prompt ad alta voce, con calma. La chiusa da non perdere: "nel primo caso ho fatto una domanda; nel secondo ho progettato uno strumento".
- **Demo Romanticismo:** collaudarla il giorno prima con screenshot di riserva (come per la demo bibliografia). I profili della classe sono sintetici — dirlo: è la regola d'oro in azione. Se in output compare un dato inventato: fermarsi, correggerlo in diretta con la R dei Riferimenti — "l'errore in diretta è la demo".
- **Nel laboratorio l'obiettivo minimo resta uno:** un template funzionante a testa, nel formato standard, caricato nella Prompt-libreria (primo artefatto collettivo del corso). L'Esemplare few-shot è il passaggio che fa la differenza: insistere — e **nominare la tecnica**: "l'Esemplare ha un nome tecnico, few-shot; fin qui era zero-shot (solo istruzioni); istruzioni + esemplari è la coppia professionale" (il termine è nel descrittore ufficiale del calendario).
- **Copyright e licenze (descrittore ufficiale — 2' alle 18:07, card dedicata dopo T.A.P.E.):** le tre regole — output generato senza tutela ma lavoro revisionato sì; mai testi integrali protetti nei prompt; CC BY-NC-SA per la libreria dello Snodo.
- **La R dei Riferimenti dal vivo in NotebookLM** (invece che raccontata): caricare il DM 166, chiedere "elenca i quattro pilastri e indica la pagina", mostrare le citazioni cliccabili. Così NotebookLM appare due volte con due ruoli: riparazione (apertura) e strumento della R (seconda parte).
- **Infografica Epistemia (NotebookLM):** proiettarla alla card "Epistemia" (o postarla in chat come takeaway a fine blocco). Tre accortezze: aggiungere a voce la frattura mancante del *parsing* (esempio del sarcasmo: "bell'affare!" davanti all'oggetto rotto — noi leggiamo la scena, la macchina spezzetta simboli); se qualcuno contesta "Random Walk", tradurre in "predizione probabilistica del token"; valorizzare il riquadro "audit dei processi" come anticipazione del Pattern della Catena. Caricare il PNG nella cartella dell'incontro 2 prima della lezione.
- **Card Unplanning (Slow AI):** è il richiamo esplicito alla card 9-bis di mercoledì — dire proprio "la regola che avete scritto mercoledì ha un pattern operativo". Se il tempo regge, micro-demo di 2': incollare il prompt compatto, mostrare che l'IA *rifiuta* di dare il piano e fa una domanda — l'effetto sorpresa vale più di ogni spiegazione. Se il tempo non regge: solo la card + "provatelo a casa, il prompt è nella scheda". Non anticipare le missioni disciplinari: sono il materiale dell'incontro 6.
- **T.A.P.E. va veloce** perché la privacy è già patrimonio dell'incontro 1: qui il punto nuovo sono le micro-azioni — frasi pronte da scrivere *dentro* il prompt (specie l'anti-bluff: "se non puoi citare fonti verificabili, scrivilo").
- **Demo agente:** collaudare il flusso il giorno prima con la riga "Derivata di una funzione". Piano B pronto: i tre Gems con gli stessi template.
- Chiudere con l'aggancio al project work: da mercoledì serve l'argomento dell'UdA.

## Checklist pre-incontro

- [ ] 3 materiali "di riserva" per chi arriva senza il proprio
- [ ] Demo Romanticismo (prima/dopo + 2 iterazioni) collaudata + screenshot di riserva
- [ ] Doc "Falsi trovati" pronto e linkato (esercitazione d'apertura)
- [ ] Cartella "Prompt-libreria" in Drive con un Doc intestato per corsista
- [ ] Flusso demo-agente collaudato (o Gems di piano B pronti)
- [ ] Scheda 2 aggiornata (C.R.A.F.T. + Esemplare + 4R) linkata nei materiali
- [ ] Deck generato da `02-gamma-deck-prompt.md` (tema wireframe)
