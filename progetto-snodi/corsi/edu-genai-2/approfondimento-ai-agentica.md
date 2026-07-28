# Approfondimento — IA Agentica e automazione dei processi per il docente

Materiale di studio per la formatrice (Edu-GenAI 2 / AI-Lead), aggiornato al 28/07/2026.

## 1. Cos'è l'IA agentica (e cosa la distingue dal prompting)

Con l'IA generativa "classica" il ciclo è: *prompt → risposta → l'umano agisce*. Un **agente** riceve invece un **obiettivo** e lo persegue con un ciclo autonomo:

```
OBIETTIVO → pianifica → agisce (usa strumenti) → osserva il risultato → corregge → … → CONSEGNA
```

Le quattro proprietà che rendono "agente" un sistema:

1. **Pianificazione** — scompone l'obiettivo in passi ("prepara i materiali della settimana" → leggi il programma, genera le schede, salvale, avvisami).
2. **Uso di strumenti (tool use)** — non solo genera testo: chiama servizi esterni (Drive, Gmail, Calendar, fogli, ricerca web), quindi *produce effetti nel mondo*.
3. **Memoria e stato** — ricorda cosa ha già fatto dentro il compito (e talvolta tra sessioni).
4. **Iterazione autonoma** — valuta i propri risultati intermedi e riprova senza chiedere conferma a ogni passo.

I sistemi **multi-agente** coordinano più agenti specializzati (uno pianifica, uno scrive, uno verifica). Concetto da conoscere perché è la direzione del mercato, non per l'uso scolastico immediato.

**Concetto chiave da insegnare — la scala di autonomia.** L'automazione non è on/off; per ogni processo il docente sceglie il gradino:

| Livello | Chi decide | Esempio |
|---|---|---|
| 0 — Manuale | Docente fa tutto | Correzione tradizionale |
| 1 — Assistito | IA propone su richiesta, docente esegue | Chat con Gemini per una bozza |
| 2 — Batch supervisionato | IA esegue un lotto, docente rivede tutto prima dell'uso | Generazione delle schede della settimana |
| 3 — Trigger + revisione | L'agente parte da solo (evento/orario), consegna bozze al docente | Flusso Workspace Studio con notifica |
| 4 — Autonomo con audit | L'agente completa il ciclo, il docente controlla a campione | Solo processi amministrativi a rischio zero |
| 5 — Pienamente autonomo | Nessuna revisione | **Mai in ambito didattico/valutativo** |

Il perimetro per la scuola: **livelli 2–3 per la didattica, mai oltre il 4 per l'amministrativo, mai il 5**. La valutazione degli studenti resta per norma al livello 1 al massimo (l'IA propone, il docente valuta).

## 2. Il quadro normativo specifico per gli agenti

- **AI Act pienamente applicabile dal 2 agosto 2026** (data di piena applicazione della gran parte degli obblighi, incl. sistemi ad alto rischio). Per gli agenti la questione si sposta: più autonomia = più responsabilità del deployer. Un agente usato per valutare studenti o decidere accessi a percorsi ricade nell'**alto rischio** (All. III, istruzione): fuori dal perimetro dello Snodo.
- **EDPS (Garante europeo della protezione dei dati)** — precisazione d'ambito: il suo "Compass 2026–2027" riguarda la vigilanza sui sistemi IA delle **istituzioni UE**, non le scuole. È però un **modello di governance** da imitare: la sua mappatura ha censito oltre cento sistemi IA in uso negli enti UE (con la GenAI come tecnologia dominante) e segnala che «agentic AI is also being explored and is likely to emerge in the short term». Tradotto per l'istituto: censire ogni flusso automatizzato in una mappa degli usi IA, con titolarità e base giuridica, e inserirlo nel registro dei trattamenti se tocca dati personali — gli obblighi veri per la scuola derivano dall'AI Act e dal DM 166/2025.
- **DM 166/2025**: supervisione umana e insostituibilità del docente valgono a maggior ragione per gli agenti: il principio operativo è **human-in-the-loop by design** — il flusso deve *strutturalmente* fermarsi per la revisione umana prima che l'output raggiunga gli studenti.
- **Automation bias** (distorsione da automazione): il rischio nuovo non è l'errore dell'agente ma la fiducia crescente del docente che smette di controllare. Contromisure da insegnare: revisione a campione programmata, "errori sentinella" (controllare sempre 2-3 output a caso per lotto), log delle esecuzioni.
- **Regola dello Snodo invariata**: nessun dato personale di studenti negli strumenti IA — vale anche per i flussi automatizzati (che è facile violare per distrazione: un agente che legge la casella email del docente *vede* i nomi degli studenti).

## 3. Gli strumenti nell'ecosistema dello Snodo (Google Workspace for Education)

| Strumento | Cosa fa | Livello autonomia | Note |
|---|---|---|---|
| **Gems** (Gemini personalizzati) | Assistenti con istruzioni di sistema fisse, riusabili e condivisibili | 1 | Già nel programma del corso (incontro 4: tutor socratico) |
| **Workspace Studio** | **Costruttore no-code di agenti/flussi**: trigger (evento/orario) + passi che usano Gemini e le app Workspace (Drive, Gmail, Chat, Fogli) | 2–3 | Novità 2026, incluso nel tier Education senza costi aggiuntivi — lo strumento su cui puntare per il corso |
| **NotebookLM** | Agentico "leggero": ricerca e sintesi con grounding sulle fonti caricate | 1–2 | Già in uso nel progetto |
| **Apps Script + API Gemini** | Automazione programmata per casi avanzati | 2–4 | Per il percorso AI-Lead / animatori digitali, non per il corso base |

Strumenti agentici esterni (modalità agente di ChatGPT/Claude, n8n, Make…) esistono e vanno *citati* per completezza culturale, ma sono **fuori dal perimetro DPIA dello Snodo**: la regola per i corsisti è "si automatizza solo dentro l'ambiente protetto d'istituto".

## 4. Caso pratico completo — "Il lunedì se lo prepara l'agente"

Processo reale, a rischio zero privacy (nessun dato di studenti), replicabile da ogni corsista con Workspace Studio.

**Processo da automatizzare:** ogni settimana il docente produce i materiali differenziati per le classi (scheda base, versione semplificata per BES/DSA, versione di potenziamento) a partire dal proprio programma.

**Prima (manuale):** 2–3 ore ogni weekend. **Dopo (livello 3):** ~30 minuti di revisione il lunedì mattina.

**Il flusso, passo per passo:**

1. **Fonte di verità** — un Google Sheet `Programma_settimanale` compilato dal docente: colonne *settimana, classe (es. "3B"), argomento, obiettivi, tipo di attività*. Nessun nome di studente: le personalizzazioni sono per *profilo* ("versione ad alta leggibilità", "versione con scaffolding ridotto"), mai per persona.
2. **Trigger** — Workspace Studio: "ogni venerdì alle 17:00".
3. **Passo agentico 1 (lettura)** — l'agente legge la riga della settimana entrante dal foglio.
4. **Passo agentico 2 (generazione)** — per ogni argomento, tre chiamate Gemini con prompt-template preparati una volta sola (ed è qui che rientra tutto ciò che il corso insegna sul prompting: ruolo, vincoli, esempi few-shot dello stile del docente):
   - scheda base con esercizi graduati;
   - versione ad alta leggibilità (frasi brevi, glossario, mappa concettuale);
   - versione di potenziamento (problema aperto, aggancio interdisciplinare).
5. **Passo agentico 3 (archiviazione)** — salva i tre documenti in `Drive/Materiali/[classe]/[settimana]/` come **BOZZA-** (il prefisso è il guardrail: nulla senza revisione).
6. **Passo human-in-the-loop (obbligatorio)** — messaggio in Google Chat al docente: "Bozze della settimana pronte: [link]. Da rivedere prima dell'uso." Il docente rivede, corregge, rinomina togliendo BOZZA-.
7. **Audit** — l'agente scrive una riga di log in un foglio `Esecuzioni` (data, argomenti processati, esito). Una volta al mese: revisione a campione contro l'automation bias.

**Perché è il caso didatticamente perfetto:** automatizza il lavoro *di preparazione* (dove il trial EEF documenta il risparmio di tempo) e non tocca né la relazione educativa né la valutazione; il guardrail è strutturale, non affidato alla buona volontà; è componibile dai corsisti in un'ora di laboratorio.

**Altri processi automatizzabili, classificati col semaforo:**

- 🟢 **Verde (automatizzare, liv. 3):** rassegna settimanale di fonti per una disciplina (NotebookLM/agente + email di sintesi); generazione di varianti di verifiche *senza somministrazione*; formattazione e archiviazione di materiali; promemoria scadenze del corso; preparazione scalette di riunione dai verbali precedenti.
- 🟡 **Giallo (solo liv. 2, revisione totale):** bozze di feedback formativo su elaborati **anonimizzati**; bozze di comunicazioni alle famiglie (mai invio automatico); analisi aggregata e anonima di risultati di quiz.
- 🔴 **Rosso (non automatizzare):** valutazione e voti; decisioni su percorsi individuali di studenti; qualunque flusso che legga caselle email o registri con dati personali di minori; invio diretto di contenuti agli studenti senza revisione.

## 5. Dove inserirlo nei percorsi dello Snodo

- **Edu-GenAI 2, incontro 2 (7/9):** chiudere con 20 minuti di "dal prompt all'agente" — la scala di autonomia + demo del caso pratico (il prompting appena insegnato diventa il motore del flusso).
- **Edu-GenAI 2, incontro 6 (24/9):** menzione nel project work come possibile evoluzione delle UdA.
- **AI-Lead (formazione formatori):** è qui che il tema merita un modulo pieno — i futuri formatori/animatori costruiscono un flusso Workspace Studio completo e imparano il censimento degli usi richiesto dall'EDPS (mappa degli agenti d'istituto).
- **Smart-Gov & Segreteria:** i processi 🟢 amministrativi (protocollo bozze circolari, riepiloghi, calendari) sono il terreno naturale.

## 6. Letture e risorse per formarsi

1. **EDPS — *The EDPS Compass for its new role under the AI Act, 2026–2027*** (2026): ambito = istituzioni UE, non scuole; da leggere come modello di mappatura degli usi e di enforcement AI Act (audit, ispezioni, sandbox). La frase da citare: «A human-centric AI is a competitive advantage».
2. **Documentazione Google Workspace Studio for Education** + blog Google for Education (annunci BETT 2026): capacità reali e limiti dello strumento che i corsisti useranno.
3. **Mollick — *Co-intelligenza*** (già in bibliografia) e la sua newsletter *One Useful Thing*: i pezzi 2025–26 sugli agenti sono la migliore divulgazione sul "cosa cambia quando l'IA agisce invece di rispondere".
4. **Anthropic — "Building effective agents"** (guida tecnica, 2024): per capire pattern e limiti architetturali (workflow vs. agenti, guardrail) — livello AI-Lead.
5. **AI Act, artt. su obblighi dei deployer + All. III** in vista della piena applicazione del 2/8/2026.
6. Per la cornice critica: la letteratura sull'**automation bias** (studi classici di Parasuraman & Riley su "use, misuse, disuse of automation") — il concetto pedagogicamente più importante dell'intero tema.

> Sintesi in una frase per l'aula: *l'IA generativa scrive per te, l'IA agentica lavora per te — e proprio per questo il mestiere del docente si sposta dal produrre al supervisionare: progettare il flusso, fissare i guardrail, mantenere l'ultima parola.*
