# Edu-GenAI 2 — Piano di studio e approfondimento della formatrice

**Corso:** Edu-GenAI 2 — Didattica Aumentata e Data Literacy (18 ore, secondo ciclo)
**Formatrice:** Prof.ssa Sabatini — **Tutor:** Prof. Bonelli
**Calendario operativo (da Avviso):** 6 incontri online sincroni da 3 ore, ore 15:00–18:00 — 2, 7, 9, 11, 15, 24 settembre
**Riferimenti:** progetto M4C1I2.1-2026-1745-P-65156 — CUP I84D25003890006 — DigCompEdu Aree 3 e 5, DigComp 3.0 Aree 1 e 4

> ⚠️ **Nota di coerenza:** la scheda impaginata articola il corso in 7 incontri misti (5h+4h online + 9h in presenza), mentre l'Avviso pubblicato prevede 6 incontri da 3h interamente online sincroni. La modalità online sincrona è ammissibile per la Tipologia A (come da candidatura). Il documento operativo di riferimento è **l'Avviso**: allineare la scheda impaginata prima della pubblicazione sul sito, mantenendo invariati i contenuti.

---

## Incontro 1 — mer 2/9 — Ambiente protetto e regole d'ingaggio

**Obiettivo della formatrice:** aprire il corso fissando il perimetro tecnico e normativo dentro cui tutto il resto avverrà; dare sicurezza ai docenti diffidenti.

**Nuclei concettuali da padroneggiare**
- Architettura dell'ambiente protetto: Google Workspace for Education Plus, Gemini in Workspace, NotebookLM — cosa significa "i dati non addestrano i modelli", dove stanno i dati, ruoli titolare/responsabile del trattamento.
- Come funziona un LLM a livello divulgativo ma rigoroso: token, predizione probabilistica, finestra di contesto, temperatura; perché "allucina" (non recupera fatti, genera sequenze plausibili) e perché il RAG/grounding su fonti (NotebookLM) mitiga il fenomeno.
- Quadro normativo essenziale da saper esporre in 20 minuti: GDPR (basi giuridiche a scuola, minori), AI Act — classificazione dei rischi e perché gli strumenti usati sono a "rischio limitato", obblighi di trasparenza; L. 132/2025; DM 166/2025 (Linee guida IA nelle scuole) — principi di antropocentrismo e supervisione umana; Privacy by Design/by Default; cosa è una DPIA e cosa dice quella d'istituto.
- La regola operativa non negoziabile: **nessun dato personale di studenti negli strumenti IA** — come si lavora lo stesso (dati sintetici, pseudonimizzazione, casi-tipo).

**Studio consigliato (in ordine):** DM 166/2025 integrale; sintesi AI Act per l'educazione (cap. su sistemi ad alto rischio in ambito istruzione, All. III); Cristianini *Machina sapiens* capp. su funzionamento LLM; guida NotebookLM/Gemini for Education di Google; **DigComp 3.0** (JRC nov. 2025, trad. it. ufficiale 30/03/2026) — l'IA è ora trasversale a tutte le 21 competenze e i livelli passano da 8 a 4: usare questa versione nelle slide, non il 2.2.

**Dati di contesto da usare in apertura:** indagine INDIRE–Tecnica della Scuola (Didacta 2025, 1.803 docenti): il 52,4% dei docenti usa già l'IA a supporto della didattica, il 10% come strumento compensativo — il corso non parte da zero, parte da usi spontanei da mettere in sicurezza. Citare anche la sperimentazione MIM 2024–26 dell'assistente IA (15 istituti in 4 regioni, valutazione INVALSI in corso) per collocare lo Snodo nel quadro nazionale.

**Da preparare:** slide sul "viaggio di un prompt" (cosa succede tecnicamente); demo live di un'allucinazione indotta e della sua correzione con grounding; patto d'aula del corso.

---

## Incontro 2 — lun 7/9 — Prompting per la progettazione didattica

**Obiettivo:** trasformare i corsisti da utenti occasionali a progettisti di prompt riusabili per la didattica di indirizzo.

**Nuclei concettuali**
- Anatomia del prompt efficace: ruolo, contesto, compito, formato, vincoli, esempi. Differenza tra zero-shot, few-shot (dare esemplari dello stile/output atteso) e chain-of-thought (esplicitare il ragionamento passo-passo).
- Prompt come artefatto professionale: prompt-libreria di dipartimento, versionamento, adattamento per disciplina (matematica/fisica vs. discipline umanistiche vs. indirizzi tecnici).
- Generazione e adattamento di risorse: semplificazione/complessificazione di testi, batterie di esercizi graduati, testi paralleli per livelli.
- Copyright e licenze: chi è autore dell'output GenAI (orientamento attuale: no tutela autorale per output puramente generati), licenze Creative Commons per i materiali prodotti, citazione trasparente dell'uso di IA.

**Evidenza da portare in aula:** trial EEF/NFER inglese (RCT indipendente, 259 docenti di secondaria in 68 scuole): ChatGPT **con una guida d'uso** riduce del **31% il tempo di pianificazione** (~25 min/settimana) a qualità invariata al blind review. Il messaggio: il risparmio arriva con metodo, non con l'uso naïf — ed è esattamente ciò che questo incontro insegna.

**Studio consigliato:** guida al prompting di Google (Prompting Essentials / guida Gemini for Educators); Mollick *Co-intelligenza* (capp. sui "4 principi" e sull'IA come co-docente); un paper leggibile su few-shot/CoT (anche solo le sezioni introduttive di "Chain-of-Thought Prompting Elicits Reasoning in LLMs", Wei et al. 2022); rapporto EEF/NFER "ChatGPT in Lesson Preparation — Teacher Choices Trial" (almeno l'executive summary).

**Da preparare:** template di prompt didattico da compilare in diretta; esercitazione a coppie "stesso obiettivo, prompt diversi, confronto output"; avvio della prompt-libreria condivisa (Doc/Sheet di corso).

---

## Incontro 3 — mer 9/9 — Progettare UdA interattive con l'IA

**Obiettivo:** ancorare l'IA alla progettazione curricolare vera (DigCompEdu Area 3): non "attività spot" ma UdA transdisciplinari.

**Nuclei concettuali**
- Struttura di un'UdA aumentata: competenze target (dal PECUP dell'indirizzo), compito autentico, fasi con/senza IA, prodotto finale, valutazione. L'IA come **partner conversazionale attivo** della ricerca dello studente, non come distributore di risposte.
- Transdisciplinarità nel secondo ciclo: aggancio STEM e discipline di indirizzo; co-design con la classe (lo studente co-progettista, non solo destinatario).
- Compiti autentici e artefatti multimediali: criteri di autenticità (Wiggins), prodotti valutabili.
- Il project work del corso parte qui: ogni corsista imposta la propria UdA (consegna finale richiesta per l'attestato).

**Dato di contesto per calibrare le UdA:** Rapporto INVALSI 2026 (rilevazione competenze digitali su ~600 scuole): oltre l'80% degli studenti al secondo anno del secondo grado raggiunge almeno il livello intermedio, ~7 su 10 il livello avanzato in uscita — le UdA possono assumere una base digitale solida e puntare in alto sulla dimensione critica.

**Studio consigliato:** DigCompEdu (testo JRC, Area 3 con i descrittori di livello B2/C1 — sono il tuo linguaggio di certificazione; nota: il quadro è del 2017, integrarlo in aula con i learning outcomes IA di DigComp 3.0); Bowen & Watson *Teaching with AI* (parte sulle attività e assignment ridisegnati); UNESCO *Guidance for generative AI in education and research* (sezione sugli usi didattici co-creativi).

**Da preparare:** canvas UdA (template condiviso), 2 UdA-esempio complete (una STEM, una umanistica/di indirizzo), rubrica di qualità dell'UdA che userai al project work finale — consegnarla già ora crea trasparenza valutativa.

---

## Incontro 4 — ven 11/9 — Scaffolding mediato e personalizzazione

**Obiettivo:** il cuore pedagogico del corso (DigCompEdu Area 5): differenziazione con l'IA per BES, DSA e valorizzazione del talento, più il raccordo PCTO.

**Nuclei concettuali**
- Fondamenta teoriche da saper citare con precisione: zona di sviluppo prossimale (Vygotskij), scaffolding (Wood, Bruner & Ross 1976), **fading** come rimozione graduale del supporto verso l'autonomia — è ciò che distingue il tutor IA ben progettato dalla "delega cognitiva" che il progetto vuole contrastare.
- Tutoraggio socratico: progettare chatbot tutor che domandano invece di rispondere; **correzione ritardata** (il tutor non dà la soluzione, guida a trovarla); istruzioni di sistema per Gemini/Gems che implementano questi comportamenti.
- Personalizzazione operativa: adattamenti per DSA (semplificazione lessicale, mappe, sintesi vocale), BES, potenziamento per eccellenze; il principio: l'IA adatta il *mezzo*, il docente presidia l'*obiettivo* (PDP/PEI restano atti del consiglio di classe — non si caricano su strumenti IA).
- PCTO: simulazioni di colloqui, analisi di casi aziendali, orientamento — con i vincoli privacy visti all'incontro 1.

**Evidenza da portare in aula — il cuore empirico del corso:** RCT di **Bastani et al. (PNAS 2025)** su ~1.000 studenti di scuola superiore: con ChatGPT "libero" la performance assistita sale (+48%) ma all'esame senza IA gli studenti vanno *peggio* del controllo (−17%); la versione tutor **con guardrail** annulla il danno. In contrappunto, **Kestin et al. (Scientific Reports 2025)**: un tutor IA progettato su principi pedagogici fa apprendere più dell'active learning in presenza (contesto universitario, da dichiarare). Insieme dimostrano la tesi dell'incontro: non "IA sì/no" ma *come è progettato il tutor* — guardrail, domande socratiche, fading.

**Studio consigliato:** Khan *Brave New Words* (visione del tutor IA, cap. su Khanmigo); Bloom "The 2 Sigma Problem" (1984 — il problema che il tutoring 1:1 pone alla scuola, cornice perfetta per la lezione); Wood, Bruner & Ross "The Role of Tutoring in Problem Solving" (1976); Bastani et al., "Generative AI without guardrails can harm learning" (PNAS 2025) e Kestin et al. (Sci. Rep. 2025) — almeno abstract e figure principali; linee guida CAST sull'Universal Design for Learning (UDL) come cornice della personalizzazione.

**Da preparare:** un Gem/chatbot tutor socratico funzionante da mostrare e clonare; esercitazione "scrivi le istruzioni di sistema del tuo tutor disciplinare"; casi-studio BES/DSA con dati fittizi.

---

## Incontro 5 — mar 15/9 — Data literacy e valutazione assistita

**Obiettivo:** chiudere il cerchio critico (DigComp 3.0 Aree 1 e 4): leggere i dati, riconoscere bias e allucinazioni, valutare con l'IA senza cederle la valutazione.

**Nuclei concettuali**
- Data literacy del docente: lettura critica dei dati di apprendimento (analytics di Classroom/Moduli), correlazione ≠ causazione, rischio di profilazione degli studenti.
- Tassonomia dei difetti dell'IA da saper dimostrare dal vivo: allucinazioni semantiche, bias sociali/culturali/di genere, stereotipi, sycophancy (compiacenza verso l'utente). Tecniche di rilevazione: confronto multi-fonte, richiesta di fonti, riformulazione avversariale.
- Valutazione assistita: rubriche co-progettate con l'IA, feedback formativo generato e **sempre revisionato**; principio **Human-in-the-loop** come vincolo normativo (Linee guida MIM 2025: la valutazione è atto proprio e insostituibile del docente) e non solo metodologico.
- Integrità accademica nel secondo ciclo: politiche d'istituto sull'uso dichiarato dell'IA da parte degli studenti; perché i "detector di IA" sono inaffidabili e non vanno usati come prova.

**Due casi di fact-checking da usare come esercitazione (la data literacy applicata a se stessa):**
1. La meta-analisi **Wang & Fan 2025** (il famoso g = 0.867 sull'apprendimento con ChatGPT) è stata **ritrattata** dall'editore ma continua a circolare in convegni e articoli divulgativi — esercizio: cercarla, scoprire la retraction, discutere come si verifica lo stato di una fonte.
2. Lo studio MIT **"Your Brain on ChatGPT"** ("l'IA atrofizza il cervello"): preprint non peer-reviewed su ~54 soggetti, mediatizzato ben oltre i dati — esercizio: confrontare i titoli di stampa con l'abstract reale.
Chiudere presentando onestamente lo stato della letteratura: meta-analisi con effetti positivi moderati (Deng 2025; HSSC 2026) vs. RCT che mostrano danni senza guardrail — l'incertezza è essa stessa contenuto didattico.

**Studio consigliato:** O'Neil *Armi di distruzione matematica* (bias algoritmici sui casi concreti — miniera di esempi per la lezione); Bender et al. "On the Dangers of Stochastic Parrots" (2021, anche solo §4–6); Linee guida MIM DM 166/2025 (rilettura mirata: valutazione e supervisione umana); Floridi *Etica dell'intelligenza artificiale* (capp. su bias e responsabilità); una delle meta-analisi recenti (es. quella di 35 studi sperimentali su Nature HSSC 2026) per padroneggiare il quadro d'insieme.

**Da preparare:** batteria di prompt "trappola" per far emergere bias/allucinazioni in diretta; dossier del caso Wang & Fan e del caso MIT (screenshot titoli vs. fonte); esercitazione di co-costruzione rubrica su un elaborato reale anonimizzato; bozza di policy d'aula sull'uso dell'IA da discutere.

---

## Incontro 6 — gio 24/9 — Project work e restituzione finale

**Obiettivo:** valutare le UdA aumentate prodotte, consolidare la comunità di pratica, chiudere gli adempimenti.

**Nuclei concettuali e regia**
- Peer review strutturata: protocollo in 3 fasi (presentazione 7', feedback caldo/freddo con rubrica, ripresa dell'autore) — modello dei tuning protocols.
- Valutazione degli elaborati con la rubrica consegnata all'incontro 3; verbalizzazione degli esiti ai fini dell'attestato (frequenza ≥70% = 13 ore + consegna UdA).
- Semina della continuità: la prompt-libreria e le UdA confluiscono nel repository dello Snodo (diffusione territoriale, Art. 4); invito ai laboratori Tipologia B come luogo di sperimentazione in classe delle UdA prodotte.

**Da preparare:** griglia di peer review; scaletta con i tempi contingentati; modulo di gradimento finale (serve anche per il monitoraggio PNRR); registro presenze completo per la rendicontazione.

---

## Adempimenti trasversali della formatrice (promemoria UCS)

- Registro presenze firmato/tracciato per ogni incontro (soglia attestato: 13 ore).
- Timesheet formatore coerente con UCS € 156/h (formatore+tutor) — 18 ore.
- Conservazione dei materiali prodotti nel fascicolo di progetto (CUP su ogni documento).
- Raccolta dati partecipanti per indicatori comuni C10I* (genere/età) al primo incontro.
