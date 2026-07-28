# Bibliografia ragionata per la formazione della formatrice

Percorso di letture per Edu-GenAI 2 (utile in larga parte anche per Ethic-AI 2). Ordinata per priorità: prima lo scaffale essenziale, poi gli approfondimenti per incontro.

## Scaffale essenziale (da leggere per primi)

1. **MIM — Linee guida per l'introduzione dell'Intelligenza Artificiale nelle scuole** (DM 166 del 09/08/2025). Il documento che vincola tutto il corso: antropocentrismo, supervisione umana, valutazione come atto del docente, privacy. Da conoscere quasi a memoria: è la tua copertura normativa in aula.
2. **Ethan Mollick — *Co-intelligenza. Vivere e lavorare con l'IA*** (Luiss University Press, 2024). Il miglior ponte tra funzionamento dei LLM e pratica professionale: i "quattro principi" (invita sempre l'IA al tavolo, sii l'umano nel loop, tratta l'IA come una persona ma dille chi è, assumi che questa sia la peggiore IA che userai mai) sono una struttura riusabile per le tue lezioni.
3. **Nello Cristianini — *Machina sapiens. L'algoritmo che ci ha rubato il segreto della conoscenza*** (Il Mulino, 2024). Spiegazione rigorosa e divulgativa di come funzionano i LLM e perché "sanno senza capire" — la base per l'incontro 1. Se hai tempo, prima *La scorciatoia* (Il Mulino, 2023) dello stesso autore.
4. **Redecker & Punie — *DigCompEdu. Quadro europeo delle competenze digitali dei docenti*** (JRC, 2017; trad. it. a cura di ITD-CNR). Le Aree 3 (Insegnamento) e 5 (Valorizzazione dello studente) con i descrittori B2/C1 sono il linguaggio con cui certifichi le competenze in uscita del corso.
5. **UNESCO — *Guidance for generative AI in education and research*** (2023, agg. successivo). Cornice internazionale: age-appropriateness, validazione pedagogica degli strumenti, capacità umane da proteggere. Insieme ai due **AI Competency Framework UNESCO per docenti e per studenti** (2024): utili per dare respiro internazionale alle slide.
6. **Salman Khan — *Brave New Words*** (2024). La visione del tutoring IA (Khanmigo): scaffolding, socratica, personalizzazione. Perfetto per l'incontro 4 — da leggere con occhio critico (è anche un manifesto di parte).

## Approfondimenti per incontro

### Incontro 1 — Ambiente protetto e regole d'ingaggio
- **Regolamento (UE) 2024/1689 (AI Act)** — lettura mirata: definizioni, piramide dei rischi, Allegato III (istruzione tra gli ambiti ad alto rischio: perché i vostri usi restano fuori), obblighi di trasparenza per i sistemi a rischio limitato.
- **Legge 132/2025** — principi nazionali su IA, minori e istruzione.
- **Garante Privacy — *La scuola a prova di privacy*** (vademecum): il quadro GDPR scolastico in linguaggio accessibile.
- Documentazione **Google Workspace for Education** su Gemini/NotebookLM e trattamento dati (i termini che ti permettono di dire "i dati non addestrano i modelli").

### Incontro 2 — Prompting
- **Google Prompting Essentials / Guida al prompting per Gemini for Educators** — il riferimento operativo coerente con gli strumenti del corso.
- **Wei et al. — "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models"** (2022) — basta l'introduzione: ti dà il fondamento scientifico del CoT che insegnerai.
- **Bowen & Watson — *Teaching with AI*** (Johns Hopkins UP, 2024) — capitoli su assignment e materiali: ricco di esempi trasferibili al secondo ciclo.

### Incontro 3 — UdA interattive
- **DigCompEdu Area 3** (rilettura mirata con i descrittori di progressione).
- **Wiggins & McTighe — *Understanding by Design*** (anche solo la logica del backward design: dagli esiti attesi all'attività, l'IA entra per ultima).
- **Panciroli & Rivoltella — *Pedagogia algoritmica. Per una riflessione educativa sull'intelligenza artificiale*** (Scholé, 2023) — la voce pedagogica italiana: dà profondità teorica alla progettazione.

### Incontro 4 — Scaffolding e personalizzazione
- **Wood, Bruner & Ross — "The Role of Tutoring in Problem Solving"** (Journal of Child Psychology and Psychiatry, 1976) — l'articolo che ha coniato "scaffolding": citarlo con precisione dà autorevolezza.
- **Bloom — "The 2 Sigma Problem"** (Educational Researcher, 1984) — il problema del tutoring 1:1 che l'IA promette di affrontare: apertura ideale della lezione.
- **CAST — Universal Design for Learning Guidelines** — la cornice inclusiva dentro cui collocare la personalizzazione con IA (BES/DSA).

### Incontro 5 — Data literacy, bias e valutazione
- **Cathy O'Neil — *Armi di distruzione matematica*** (Bompiani, 2017) — casi concreti di bias algoritmico, ottimi come materiale d'aula.
- **Bender, Gebru et al. — "On the Dangers of Stochastic Parrots"** (FAccT 2021) — la critica scientifica di riferimento ai LLM: rischi, bias nei dati, costi ambientali (utile anche per Ethic-AI 2).
- **Luciano Floridi — *Etica dell'intelligenza artificiale. Sviluppi, opportunità, sfide*** (Raffaello Cortina, 2022) — il quadro etico sistematico, in italiano.
- **DigComp 3.0** (JRC, novembre 2025 — trad. it. ufficiale del Dipartimento per la Trasformazione Digitale, 30/03/2026): la versione di riferimento da citare in aula — IA integrata trasversalmente in tutte le 21 competenze, 4 livelli di padronanza, nuovi learning outcomes su GenAI, disinformazione e benessere digitale. DigComp 2.2 (2022) resta utile solo per l'appendice "citizens interacting with AI".

## Evidenza empirica recente (integrata dalla ricognizione di luglio 2026)

Studi da conoscere per fondare empiricamente le affermazioni del corso — dettaglio e valutazione di affidabilità in `fonti-aggiornate-ricognizione.md`:

- **Bastani et al. — "Generative AI without guardrails can harm learning"** (PNAS, 2025) — RCT pre-registrato su ~1.000 studenti di scuola superiore: uso libero di ChatGPT → −17% alla prova senza IA; tutor con guardrail → danno annullato. *La* citazione per l'incontro 4.
- **Kestin et al. — "AI tutoring outperforms in-class active learning"** (Scientific Reports, 2025) — il contro-caso positivo: tutor IA ben progettato batte l'active learning (contesto universitario).
- **Meta-analisi di 35 studi sperimentali su ChatGPT** (Humanities & Social Sciences Communications, 2026) e **Deng et al. 2025** (62 studi): effetti positivi moderati, forte eterogeneità — il quadro d'insieme da presentare con onestà.
- ⚠️ **Wang & Fan (HSSC 2025) — RITRATTATA**: non citare come evidenza; usare come caso di fact-checking.
- ⚠️ **Kosmyna et al. (MIT) — "Your Brain on ChatGPT"** (2025): preprint su ~54 soggetti, sovra-mediatizzato; citare solo con cautela esplicita, come caso di studio sulla comunicazione della scienza.
- **EEF/NFER — ChatGPT in Lesson Preparation, Teacher Choices Trial** (Inghilterra, RCT su 259 docenti di secondaria): −31% tempo di pianificazione a qualità invariata, *se* accompagnato da una guida d'uso. Evidenza motivazionale per l'incontro 2.
- **Indagine INDIRE–Tecnica della Scuola** (Didacta 2025, 1.803 docenti): 52,4% usa già l'IA nella didattica — il dato per calibrare il livello d'ingresso dei corsisti.
- **Sperimentazione MIM assistente IA 2024–26** (15 istituti, 4 regioni, valutazione INVALSI): da monitorare — la valutazione ufficiale non risulta ancora pubblicata a luglio 2026.

## Dai documenti UNESCO/OCSE forniti dalla formatrice (integrazione luglio 2026)

Analisi completa in `approfondimento-unesco-oecd.md`. I quattro da studiare:

- **OECD — *Digital Education Outlook 2026: Exploring Effective Uses of Generative AI in Education*** — la fonte empirica più aggiornata: dati TALIS 2024 sui docenti (36% usa l'IA, 75% si sente impreparato), RCT sui tutor (Tutor CoPilot: +9 punti con i tutor inesperti), "metacognitive laziness", meta-analisi Vaccaro (la sinergia umano-IA va progettata, non presunta). Priorità assoluta.
- **UNESCO-UNEVOC — *Integrating AI in TVET*** (2026) — la più operativa: i 5 livelli di coinvolgimento IA per la progettazione e le 4 categorie di valutazione col "non-delegable anchor" (già integrate nelle schede 3a e 6); indicazioni specifiche per tecnici/professionali e alternanza.
- **UNESCO — *AI and the future of education: Disruptions, dilemmas and directions*** (2025) — antologia critica d'autore (Bender sulla "forma senza significato", Aerts sulle learning echo chambers, Perkins & Roe sull'era post-plagiarism): materiale di discussione per gli incontri 1, 4 e 5.
- **UNESCO — *AI and education: Protecting the rights of learners*** (2025) — la privacy come diritto; il dato Common Sense (solo il 20% dei prodotti ed-tech supera standard minimi di privacy); la citazione-missione: «AI should support the learning process without reducing cognitive abilities» (Racc. etica IA 2021, §104).

⚠️ Nota: il **GEM Report 2026** fornito è l'edizione su accesso ed equità, non quella sulla tecnologia — per le posizioni GEM su tecnologia/IA procurarsi il **GEM 2023 *Technology in education: A tool on whose terms?***.

## Formazione continua (dopo il corso)
- **Paolo Benanti — *Human in the loop. Decisioni umane e intelligenze artificiali*** (Mondadori Università, 2022) — approfondisce il principio cardine delle Linee guida MIM; ponte naturale verso Ethic-AI 2.
- **OECD — *Opportunities, guidelines and guardrails for effective and equitable use of AI in education*** (2023) — per la prospettiva di policy comparata.
- Newsletter/blog di Ethan Mollick (*One Useful Thing*) — per restare aggiornata sugli sviluppi con taglio didattico.

> Nota pratica: caricando le fonti normative (DM 166/2025, AI Act, DigCompEdu) in un notebook di **NotebookLM** ti costruisci un assistente di studio con grounding sulle fonti ufficiali — ed è anche una demo perfetta da mostrare al primo incontro: studiare l'IA usando l'IA nel modo che insegnerai.
