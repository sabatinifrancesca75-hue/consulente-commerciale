# Il problema dei 2 Sigma — scheda documentale verificata

*Materiale di approfondimento per i corsisti · Edu-GenAI 2, incontro 4*
*Ogni dato di questa scheda è stato ricondotto alla fonte primaria. Dove la verifica non è stata completata, è scritto.*

---

## 1 · La storia in cinque righe

Nel **1984** Benjamin Bloom pubblica su *Educational Researcher* un articolo destinato a diventare famoso: gli studenti seguiti **uno a uno** da un tutor, con metodo *mastery learning*, ottengono risultati superiori di **due deviazioni standard** rispetto ai coetanei in classe normale. Tradotto: lo studente mediano del gruppo con tutor supera il **98%** della classe convenzionale.

Bloom stesso non lo presentò come una soluzione ma come **un problema**: quel risultato è irraggiungibile su scala, perché un tutor per studente non se lo può permettere nessun sistema scolastico. Da quarant'anni la ricerca cerca di riprodurre quell'effetto con mezzi sostenibili.

**La risposta breve di quarant'anni di ricerca:** il "2 sigma" non si replica sul campo; l'effetto reale del tutoraggio si colloca **tra un terzo e tre quarti di deviazione standard** — molto meno di 2, ma comunque tra gli interventi più efficaci che conosciamo in didattica.

---

## 2 · I numeri, con la fonte

| Dato | Valore | Fonte | Stato |
|---|---|---|---|
| Tutoraggio 1:1 + mastery vs classe convenzionale | **≈ 2,0 σ** (50° → 98° percentile) | Bloom 1984 | Da confermare sul PDF originale |
| Mastery learning d'aula da solo | **≈ 1,0 σ** (84° percentile) | Bloom 1984 | Da confermare sul PDF originale |
| Correlazione attitudine–esito: convenzionale → mastery → tutoraggio | **r ≈ .60 → .35 → .25** | Bloom 1984 | Da confermare sul PDF originale |
| Campione degli esperimenti di Bloom | ~75 studenti per coorte, classi 4ª/5ª/8ª, **3 settimane**, temi *probabilità* e *cartografia* | Anania (1981-83), Burke (1983-84), tesi dirette da Bloom | Da confermare sul PDF originale |
| Mastery learning, meta-analisi su 108 studi | **≈ 0,52 σ** (50° → 69° percentile) | Kulik, Kulik & Bangert-Drowns 1990, *Review of Educational Research* 60(2) | Da confermare |
| Mastery learning: prove dei ricercatori vs test standardizzati | forte divario; su test standardizzati l'effetto **quasi si annulla** | Slavin 1987, *Review of Educational Research* 57(2) | Da confermare |
| **Tutoraggio umano** (meta-analisi) | **d = 0,79** | VanLehn 2011, *Educational Psychologist* 46(4) | ✅ **Verificato** |
| **ITS a passi vincolati** (step-based) | **d = 0,76** | VanLehn 2011 | ✅ **Verificato** |
| ITS a sotto-passi (substep-based) | **d = 0,40** | VanLehn 2011 | ✅ **Verificato** |
| Sistemi a risposta finale (CAI answer-based) | **d ≈ 0,31** *(stima delle rassegne precedenti)* | VanLehn 2011 | ⚠️ Attribuzione da precisare |
| **ITS, meta-analisi su 50 valutazioni** | **mediana 0,66 σ** (50° → 75° percentile) | Kulik & Fletcher 2016, *Review of Educational Research* 86(1) | ✅ **Verificato** |
| **Tutoraggio scolastico, 96 RCT PreK-12** | **0,37 σ** aggregato | Nickow, Oreopoulos & Quan — NBER w27476 (2020); poi *American Educational Research Journal* (2024) | ✅ **Verificato** |
| IA generativa, pratica assistita | **+48%** (GPT base) · **+127%** (GPT Tutor) | Bastani et al. | Da confermare sul PDF dell'autore |
| IA generativa, esame senza IA | **−17%** (GPT base) · **nessuna differenza** dal controllo (GPT Tutor) | Bastani et al. | Da confermare sul PDF dell'autore |

**Il "catalogo delle variabili modificabili" di Bloom** (1984) — gli effetti che secondo lui, combinati, potevano avvicinare i 2 sigma in classe:

| Intervento | Effetto stimato | Percentile |
|---|---|---|
| Tutoraggio individuale 1:1 | 2,00 | 98° |
| Rinforzo didattico | 1,20 | 88° |
| Indizi e spiegazioni strutturate · feedback e correzione · tempo attivo sul compito · partecipazione attiva · competenze di studio | 1,00 | 84° |
| Apprendimento cooperativo · compiti con feedback graduato | 0,80 | 79° |
| Prerequisiti cognitivi · clima di classe | 0,60 | 73° |

> ⚠️ **Il limite dell'ipotesi**: Bloom assumeva che questi effetti si **sommassero**. Non è così — agiscono in buona parte sugli stessi meccanismi (attenzione, memoria di lavoro, motivazione), quindi si sovrappongono e i rendimenti sono decrescenti. È la ragione per cui "impilare" buone pratiche non ha mai prodotto 2 sigma.

---

## 3 · Perché il 2 sigma non si replica

Tre ragioni, tutte metodologiche — e tutte utili da conoscere quando leggiamo *qualunque* studio sull'efficacia didattica:

1. **Campione e durata minimi.** Tre settimane, ~75 studenti, argomenti scelti apposta **fuori dal programma** (probabilità, cartografia) per azzerare le conoscenze pregresse. Condizioni pulite in laboratorio, prive di validità ecologica: su un curricolo annuale con prerequisiti ramificati l'effetto si diluisce.
2. **Le prove erano fatte dagli sperimentatori.** Test interni, allineati agli item usati durante le correzioni. È il fattore che gonfia di più gli effect size: quando si misura con prove standardizzate indipendenti, l'effetto crolla. (È il punto di Slavin 1987, e lo ritrova anche Kulik & Fletcher 2016 sugli ITS.)
3. **La famosa curva a tre campane era un disegno.** Non un modello interpolato sui dati: una figura stilizzata per illustrare il concetto.

**La lettura onesta**, quella da portare in aula: *il numero esatto è discusso, l'ordine di grandezza no.* Il tutoraggio individuale resta tra le cose che funzionano di più e che non ci siamo mai potuti permettere. È il problema che l'IA promette di risolvere.

---

## 4 · Il punto che riguarda noi

**VanLehn 2011** è lo studio più interessante per questo corso: un tutor software a **passi vincolati** (0,76) è praticamente equivalente a un tutor umano (0,79), mentre un sistema che controlla **solo la risposta finale** si ferma a ~0,31.

> La differenza non sta nell'empatia né nella presenza fisica: sta nella **granularità dell'intervento** — cogliere l'errore nel momento in cui avviene, e impedire che lo studente prosegua su un assunto sbagliato.

**Bastani et al.** completa il quadro sul versante generativo: un modello **senza vincoli pedagogici** aumenta la prestazione mentre è acceso e la peggiora quando si spegne (−17%); lo stesso modello **con guardrail socratici** azzera il danno. Il che porta alla conclusione operativa dell'incontro: *senza design fa danno, con design il danno si azzera* — e il design si chiama **fading**.

---

## 5 · Bibliografia, in tre livelli

### 🟢 Fonti primarie — queste si citano

- **Bloom, B. S. (1984)**, *The 2 Sigma Problem: The Search for Methods of Group Instruction as Effective as One-to-One Tutoring*, **Educational Researcher, 13(6), 4–16**. Testo integrale: https://gwern.net/doc/psychology/1984-bloom.pdf
- **Slavin, R. E. (1987)**, *Mastery Learning Reconsidered*, **Review of Educational Research, 57(2), 175–213**.
- **Kulik, C.-L. C., Kulik, J. A. & Bangert-Drowns, R. L. (1990)**, *Effectiveness of Mastery Learning Programs: A Meta-Analysis*, **Review of Educational Research, 60(2), 265–299**. PDF: https://www.uky.edu/~gmswan3/575/kulik_kulik_Bangert-Drowns_1990.pdf
- **VanLehn, K. (2011)**, *The Relative Effectiveness of Human Tutoring, Intelligent Tutoring Systems, and Other Tutoring Systems*, **Educational Psychologist, 46(4), 197–221**. Scheda ERIC: https://eric.ed.gov/?id=EJ946764
- **Kulik, J. A. & Fletcher, J. D. (2016)**, *Effectiveness of Intelligent Tutoring Systems: A Meta-Analytic Review*, **Review of Educational Research, 86(1), 42–78**. Scheda ERIC: https://eric.ed.gov/?id=EJ1090502
- **Nickow, A., Oreopoulos, P. & Quan, V. (2020)**, *The Impressive Effects of Tutoring on PreK-12 Learning: A Systematic Review and Meta-Analysis of the Experimental Evidence*, **NBER Working Paper 27476**; versione pubblicata: *American Educational Research Journal* (2024). https://www.nber.org/papers/w27476
- **Bastani, H. et al.**, *Generative AI Without Guardrails Can Harm Learning: Evidence from High School Mathematics*. Copia dell'autore: https://hamsabastani.github.io/education_llm.pdf
- **von Hippel, P. T.**, *Two-Sigma Tutoring: Separating Science Fiction from Science Fact*, **Education Next**. https://www.educationnext.org/two-sigma-tutoring-separating-science-fiction-from-science-fact/

### 🟠 Utili per orientarsi, non da citare in bibliografia

- Voce **Wikipedia** "Bloom's 2 sigma problem" — buon punto di partenza, non una fonte.
- **ERIC**, **JSTOR**, **Semantic Scholar**, **SagePub** — repertori per arrivare alle fonti primarie.
- Articoli giornalistici di settore (es. le dichiarazioni di Sal Khan sulla riprogettazione di Khanmigo): vanno attribuiti come dichiarazioni, non come evidenza.

### 🔴 Da non usare come fonte

Nella documentazione di partenza comparivano anche: blog commerciali di aziende di e-learning, blog personali, post su Medium, **una copia del paper di Bastani caricata su Scribd** da terzi (esiste la copia dell'autore: usare quella), la **pagina-profilo** di un ricercatore su ResearchGate (non è un lavoro), la **sezione commenti** di un blog, siti di marketing di prodotti didattici, un editore a pagamento.

> Non è una questione di snobismo accademico: quelle pagine **riportano i numeri di seconda o terza mano**, ed è lì che gli errori si moltiplicano.

---

## 6 · Cosa abbiamo trovato facendo l'audit *(il metodo, che è la parte più utile)*

Questa scheda nasce dalla verifica di un dossier di ricerca generato con l'IA. Il dossier era **ben scritto, ben strutturato e sostanzialmente corretto nell'impianto** — e proprio per questo è un caso di studio perfetto. Tre cose emerse:

**1. I numeri erano immagini.** Tutti gli effect size erano equazioni renderizzate come PNG. Conseguenze: nella tabella riassuntiva finale — la parte che un docente copierebbe per citarla — **quasi tutte le celle mostrano solo "d =" o "d ≈" senza il valore**, e diversi numeri nel corpo del testo risultano troncati. Il documento *sembra* documentatissimo, ma i dati non ci sono. In più non è accessibile: uno screen reader su quel file non legge nessun numero.

> 📌 **La regola:** i dati si chiedono in **testo**, mai dentro un'immagine. Se l'output arriva come immagine, i numeri vanno ricopiati e verificati a mano.

**2. Le note nel testo puntavano alle fonti sbagliate.** La bibliografia conteneva le fonti primarie giuste, ma il richiamo più frequente nel testo — quello che regge le affermazioni principali — rimandava a **un blog aziendale di marketing**, e la tabella di Bloom era attribuita a **Wikipedia** invece che a Bloom, il cui testo integrale era però presente in bibliografia.

> 📌 **La regola:** bibliografia ricca ≠ fonti verificate. **Si controlla il richiamo, non l'elenco.**

**3. Alcuni valori non coincidono con le fonti.** Il dato di Kulik & Fletcher riportato nella tabella non corrisponde alla mediana pubblicata (**0,66**), e l'effect size del mastery learning compariva come 0,50 anziché **0,52**. Piccole cose — ma sono esattamente le piccole cose che poi finiscono in una slide e vengono ripetute per anni.

**Cosa è stato verificato davvero, e come:** i valori di **VanLehn 2011**, **Kulik & Fletcher 2016** e **Nickow, Oreopoulos & Quan 2020** sono stati controllati sulle fonti; i dati di **Bloom 1984**, **Slavin 1987** e **Bastani et al.** sono coerenti con la letteratura ma restano da confermare sul PDF originale — ed è segnato nella tabella al §2.

> **È la stessa regola che vale per le vostre verifiche:** fidatevi del file, non della prosa. E quando il numero conta, andate alla fonte.

---
*Materiale del corso Edu-GenAI 2 — Snodo VOLTERRA AI-MASTER HUB.*
