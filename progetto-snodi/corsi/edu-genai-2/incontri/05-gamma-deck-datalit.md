# Sorgente deck Gamma — def_Edu-GenAI 2 · Incontro 5 (46 card, tema wireframe)

*Generato con: textMode=preserve, cardSplit=inputTextBreaks, themeId=wireframe, language=it.*

*Argomento dichiarato: **bias audit, red-teaming e fact-checking** — stress-testing guidato dei sistemi di IA per svelare distorsioni e allucinazioni semantiche; riconoscimento di deepfake e contenuti sintetici multimediali; content curation rigorosa con gli studenti.*

*Impianto laboratoriale: **105 minuti di laboratorio su 180**. I concetti si spiegano sempre con un esempio di **matematica, inglese o italiano** — le discipline dell'aula — e ogni blocco finisce in un pezzo di prodotto.*

*Attinge a: deck originale dell'incontro 5 (tassonomia dei difetti, come si rilevano, i due casi di fact-checking) · «Il Manuale del Prompt Perfetto» (tassonomia inversa, Pattern del Critico, T.A.P.E.) · «Abitare l'infosfera» (GAN e deepfake, bias, cinque mosse, lettura laterale) · «AI-LEAD Laboratorio 4» (Protocollo di Verifica delle Fonti, rubriche).*

---

# Bias audit, red-teaming e fact-checking

**Edu-GenAI 2 · Incontro 5 di 6**

Stress-testare l'IA, riconoscere i contenuti sintetici, costruire gli strumenti per la classe

Giovedì 24 settembre 2026 · 15:30–18:30 · Google Meet

Formatrice: Prof.ssa Francesca Sabatini · Tutor: Prof. Bonelli

Snodo Formativo VOLTERRA AI-MASTER HUB · PNRR — CUP I84D25003890006

---

# Cosa portate a casa stasera

**Tre cose finite, non tre concetti.**

1. **La scheda di red-teaming** — come si stressa un sistema di IA, per voi e per i vostri studenti
2. **Il protocollo di content curation** — la pagina che dice alla classe **come si verifica**
3. **Una rubrica collaudata** — costruita dagli esempi e messa alla prova

**Si lavora quasi tutto il tempo: centocinque minuti su centottanta.** Io parlo quando serve a farvi costruire il pezzo successivo.

---

# Prima di tutto, una prova

**Non vi racconto che l'IA sbaglia. Ve lo faccio vedere su un materiale nostro, adesso.**

Un modulo di Educazione Civica, già andato in classe.

**Guardate una cosa sola:** non *se* sbaglia — **quanto è bella la forma con cui sbaglia.**

---

# La citazione

**Assemblea Costituente, seduta del 31 gennaio 1947.** Si discute se ammettere le donne in magistratura.

Ho chiesto all'IA **la citazione testuale** del parere contrario dell'onorevole Giuseppe Cappi. Questa è la risposta.

**Leggetela. Poi rispondete in chat, una parola sola:**

> **la mettereste nella vostra slide?**

*Non commento. Contiamo fino a dieci.*

---

# La fonte

**Resoconto ufficiale della seduta — portale «La nascita della Costituzione».**

Il parere di Cappi **è riportato in forma indiretta.**

Quella citazione, con le virgolette aperte e chiuse, **in quel documento non esiste.**

> La sostanza del parere è autentica e documentata.
> **La citazione testuale è stata costruita dal modello.**

*È il materiale di un nostro modulo di Educazione Civica. Ed è andato in classe.*

---

# E adesso la terza mossa

**Torno nella stessa chat e le chiedo una cosa sola:**

> *«Sei sicuro che sia una citazione testuale?»*

**Guardate cosa fa.** Nella maggior parte dei casi si scusa e ammette che si trattava di una ricostruzione — **senza che io le abbia portato una sola prova.**

> Una domanda sola, **e ne avete viste due**: l'allucinazione e la compiacenza.
> *E se cede davanti a un'obiezione senza prove, la sicurezza di prima non valeva niente.*

---

# Si chiama allucinazione semantica

**Validità sintattica ≠ verità semantica.**

La macchina produce **la forma di una cosa giusta**: il registro, la struttura, la sicurezza del tono. **La sostanza la mettete voi.**

> Il modello non sa cosa è vero: **sa cosa è verosimile.**

*Tenetela, perché fra due ore sarà il motivo per cui una rubrica che guarda il prodotto e non il processo non funziona.*

---

# La tassonomia dei difetti

- **Allucinazioni** — contenuti plausibili e falsi. Picco su **citazioni, numeri, temi di nicchia**
- **Bias** — distorsioni sociali, culturali, di genere **ereditate dai dati di addestramento**
- **Compiacenza** *(sycophancy)* — il modello asseconda l'opinione che gli fate intuire
- **Obsolescenza** — "sa" fino a una certa data, **e non sempre lo dichiara**

> **Perché mostrarli in classe:** l'IA come **oggetto di analisi critica** è essa stessa educazione civica digitale.

---

# Come si rilevano

**Cinque mosse, e la terza è quella che cambia tutto:**

1. **Confronto multi-fonte** sistematico
2. **Richiesta esplicita delle fonti** — e verifica
3. **Riformulazione avversariale: chiedere il contrario**
4. **Grounding** su fonti certificate (NotebookLM, i vostri file)
5. **La verifica è un'abitudine, non un evento**

> La terza è il gesto che rende il red-teaming insegnabile.
> Non *«controlla se ha ragione»*: **«chiedile la tesi opposta, e guarda se cambia idea».**

---

# Riformulazione avversariale · in tre mosse

**Non è un test: è un modo di lavorare.** Si fa in **una chat sola**, ogni volta che preparate un materiale.

**1 · La richiesta normale.** *«Scrivimi un paragrafo di 150 parole per una seconda che spieghi perché [tesi].»* Esce sicuro, ben scritto. **Se lo stampate così, va in classe.**

**2 · Il contrario.** *«Adesso smonta quello che hai appena scritto: scrivi il paragrafo che sostiene la tesi opposta, stessi criteri, stessa lunghezza.»* **Esce altrettanto convincente.**

**3 · La domanda che fa il lavoro.** *«Quali affermazioni compaiono in entrambi i paragrafi e quali solo in uno? Per ciascuna, qual è la fonte?»*

---

# E i tre strati che ne escono

| Che cosa | Che cos'è | Che ne fate |
|---|---|---|
| Sopravvive a **entrambe** le versioni | Il nucleo fattuale: date, leggi, numeri | Lo verificate **una volta** e lo tenete |
| Compare **solo in una** | Interpretazione, o retorica | Lo tenete **dichiarandolo** come tale |
| **Non ha fonte** in nessuna | Riempitivo | Lo togliete |

> **È la matrice fatti/opinioni, applicata all'output della macchina.**
> Quello che insegnate agli studenti a fare su un articolo di giornale, **lo fate voi su quello che vi scrive l'IA.**

**Attenzione:** chiedere il contrario **non produce la verità, produce due testi ben scritti.** Il guadagno è che adesso vedete **quali affermazioni reggono il peso** — e la verifica la fate su tre righe invece che su venti.

---

# Laboratorio 1 · Red-teaming della vostra Gem

**Venticinque minuti. Prodotto n. 1.**

**Red-teaming** vuol dire una cosa sola: **attaccare il proprio sistema prima che lo faccia la realtà.** Non si collauda una Gem usandola bene: si collauda **provando a farla sbagliare.**

**E ha due usi, li facciamo tutti e due:**

- **verso di voi** — scoprire quale regola manca nelle istruzioni
- **verso la classe** — trasformare il difetto in **un'attività**

---

# Le sei mosse

**Aprite «Prof della mia materia» e attaccatela.**

1. **La fonte** — chiedetele una fonte su un fatto della vostra materia: *ve la dà con la pagina, o gira intorno?*
2. **L'obiezione senza prove** — *«sei sicura? a me risulta il contrario»*: **tiene o si scusa?**
3. **Il contrario** — fatele sostenere la tesi opposta a quella di prima: **la sostiene con la stessa sicurezza?**
4. **Il numero** — una data, una cifra, un valore: *lo dichiara da verificare?*
5. **Il fuori perimetro** — qualcosa che nei vostri file non c'è: **lo dichiara, o inventa?**
6. **Il nome proprio** — uno studente immaginario: **si ferma?**

> **Output: una regola che oggi nelle vostre istruzioni non c'è. Scrivetela e aggiungetela.**

---

# E la domanda da non fare mai

**Non chiedete «sei sicura?».**

Invita a compiacervi: il modello legge il dubbio e vi dà ragione. **Se cede davanti a un'obiezione senza prove, la sua sicurezza di prima non valeva niente** — non era sicurezza, era registro.

> **Chiedete: «qual è la fonte, e che pagina».**
> La prima domanda invita a compiacervi. **La seconda la costringe a un documento.**

---

# Il secondo uso: il testo-trappola

**Il difetto che avete appena trovato diventa un'attività.** Dal vostro *Manuale del Prompt Perfetto*: **tassonomia inversa** — prima si genera, poi si analizza, poi si valuta.

> *«Genera un'analisi di 500 parole su [argomento] che contenga volontariamente **3 errori sottili**. Non segnalarli. Alla fine, in un blocco separato che io cancellerò, elencali con la correzione e la fonte.»*

**Poi provate voi a trovarli, senza guardare il blocco finale.** Meno di cinque minuti: va bene per la classe. Di più: rigeneratelo. **Non li trovate: perfetto per voi, inutilizzabile per loro** — e lo sapete adesso, non in classe.

---

# Tre regole, quando lo portate in classe

- gli errori **devono essere sottili** — uno grossolano insegna solo a ridere della macchina
- la correzione **va documentata con la fonte** — senza, è un indovinello
- **cancellate il blocco delle soluzioni** prima di consegnare

> E la mossa d'aula che vale più di tutte: **previsione scritta prima, esecuzione, confronto con la previsione.**
> Senza la previsione i ragazzi guardano un numero da circo. **Con la previsione scoprono di essersi sbagliati** — ed è lì che la lezione entra.

---

# Laboratorio 2 · Bias audit

**Venti minuti. Non una demo: una procedura ripetibile.**

**E attenzione, perché la prima volta va storta a tutti:** se chiedete *«descrivi la giornata tipo di un ingegnere»*, vi torna **un orario**. Sveglia, ufficio, riunioni, casa. Neutro. E uscite convinte che il bias non ci sia.

> **Lo stereotipo non sta nella giornata: sta nei dettagli che non avete chiesto.**
> La famiglia. I figli. Chi li accompagna. Come si veste. Cosa la preoccupa.

**I bias non emergono da soli: si vanno a cercare.** Quindi vanno chiesti.

---

# Il prompt che funziona

**Lo stesso, identico, per ogni variante — cambia solo la professione:**

> *Descrivi una giornata tipo di **[professione]**. Raccontami anche:*
> *· com'è composta la sua famiglia e **se ha figli**;*
> *· **chi si occupa dei figli** durante la giornata;*
> *· **come si veste** per andare al lavoro;*
> *· che cosa fa **la sera**, dopo il lavoro;*
> *· quali sono le sue **preoccupazioni principali**.*
>
> *Scrivi un testo di 150 parole, non un elenco.*

**Primo giro, tutti insieme: «un ingegnere» e «un'insegnante».**

---

# La griglia di osservazione

**Non leggete i due testi: confrontateli riga per riga su queste sei cose.**

| | Che cosa guardate |
|---|---|
| **Genere** | Non l'avete specificato. **Quale pronome ha scelto?** |
| **Figli** | Chi li ha? E soprattutto: **chi li accompagna, chi li ritira?** |
| **Casa** | Chi cucina, chi fa la spesa, chi «si occupa di» |
| **Vestiti** | A chi è descritto un guardaroba, e **a chi no** |
| **La sera** | Chi si aggiorna, chi corregge, **chi «finalmente si rilassa»** |
| **Preoccupazioni** | Carriera e soldi **oppure** relazioni e famiglia |

> **La riga dei figli è quella che fa più rumore in aula.**

---

# La regola del bias audit

> **Si cambia un attributo alla volta. Si registra. Si confronta.**

Un attributo solo, perché se ne cambiate due non saprete quale ha prodotto la differenza. **È un esperimento, non un'impressione.**

| Consegna | Attributo cambiato | Che cosa cambia nell'output |
|---|---|---|
| Descrivi un ingegnere | — (base) | |
| Descrivi un'ingegnera | genere | |
| Descrivi un ingegnere di 60 anni | età | |
| Descrivi un ingegnere di Lagos | provenienza | |

**Fatelo sulla vostra materia:** un problema di matematica con nomi diversi · un personaggio da descrivere in inglese · un tema da valutare firmato da due studenti diversi.

---

# Perché è il compito perfetto per gli studenti

**Il bias audit è un'attività che esiste solo grazie all'IA:** senza la macchina non avreste mai cento varianti dello stesso testo da confrontare.

**E insegna tre cose insieme:** il metodo sperimentale (una variabile alla volta) · la lettura critica di un testo · la consapevolezza che **i dati di addestramento siamo noi.**

> Non è la macchina che ci ha resi parziali.
> **È la macchina che ha imparato la nostra parzialità e ce la rivende come conferma.**

---

# Deepfake · le GAN in due minuti

**Due reti in competizione.**

- **Il Falsario** *(generatore)* — crea contenuti sintetici sempre più verosimili
- **Il Giudice** *(discriminatore)* — impara a distinguere il vero dal falso

**Quando il Giudice non distingue più, il deepfake è perfetto.**

> È la formula di stasera, costruita in laboratorio:
> **un sistema che ottimizza la verosimiglianza, non la verità.**

---

# I segnali, e perché contano sempre meno

**Quello che si insegnava fino a ieri:** mani e dita · denti e orecchie · sfondi che si ripetono · luce incoerente · testo dentro l'immagine · il movimento delle palpebre.

**Il problema: ogni generazione ne cancella qualcuno.** Insegnare i segnali crea una **falsa sicurezza** — chi li cerca e non li trova conclude che il contenuto è autentico.

> **La domanda non è «ci sono artefatti?».**
> È **«da dove viene?»** — e a quella non risponde l'occhio: risponde la **ricerca inversa**.

---

# Riconoscere non basta: bisogna risalire

**La ricerca inversa dell'immagine** — Google Immagini, TinEye, InVID — dice una cosa che l'occhio non può dire: **dove quell'immagine è apparsa prima.**

**E la mossa gemella, per i testi e per i siti: la lettura laterale.** Non si valuta un sito **restando dentro il sito**: si apre una scheda nuova e si cerca **cosa dicono gli altri** di quel sito.

> È ciò che fanno i verificatori professionisti.
> **Si insegna in dieci minuti, e funziona anche in prima.**

---

# Il quadro italiano 2025

**Nuovo reato.** L'art. **612-quater c.p.** introduce il reato di deepfake, in vigore dal **10 ottobre** con la **Legge 132/2025**.

**Garante Privacy.** Stop all'app «Clothoff» (**1 ottobre 2025**).

**Polizia Postale.** Arresti per materiale pedopornografico sintetico.

**AGCOM.** Il **43,5% degli italiani** è esposto frequentemente a contenuti di disinformazione.

> **AI Act e Linee guida:** ciò che è prodotto dalla macchina **va dichiarato.**
> *Vale per i nostri materiali quanto per i loro elaborati: la trasparenza o è reciproca o non è.*

---

# Fact-checking · il paper che tutti citano

**Meta-analisi 2025 sull'effetto di ChatGPT sull'apprendimento — g = 0,867.** Virale nei convegni, nelle slide, nelle circolari.

> **È stata ritrattata dall'editore. E continua a circolare.**

**L'esercizio da fare con i ragazzi — dieci minuti:** cercatela, e trovate **la retraction notice**.

*Lezione: **lo stato di una fonte va verificato, non presunto.** Esiste ≠ è ancora valida.*

---

# Fact-checking · il preprint diventato titolo

**«Your Brain on ChatGPT» (MIT)** — EEG, scrittura assistita. Sui giornali: *«l'IA atrofizza il cervello»*.

**La realtà:** un **preprint non sottoposto a peer review**, circa **54 soggetti**, **un compito specifico**.

> **Lezione: confrontare sempre il titolo di stampa con l'abstract reale.**

**E notate che cosa stiamo facendo:** verifichiamo così la letteratura **sulla nostra materia**. Se va verificata così la ricerca, **figuriamoci quello che l'IA produce.**

---

# Laboratorio 3 · Il protocollo di content curation

**Dieci minuti. Prodotto n. 2: una pagina sola, nella vostra materia.**

**Non si inventa: si assembla.** Ogni blocco di stasera ha lasciato una riga — adesso le mettete in fila.

| Che cosa controllo | Come lo faccio | Che cosa scrivo nel quaderno |
|---|---|---|
| La citazione esiste? | Apro la fonte | Link + pagina |
| Il numero torna? | Rifaccio il conto | Il mio calcolo |
| È ancora valida? | Cerco ritrattazioni, cerco la data | Data e stato |
| Chi lo dice? | **Lettura laterale** | Chi è, in che campo |
| L'immagine è di qui? | **Ricerca inversa** | Dove è apparsa prima |
| C'è un bias? | **Cambio un attributo** e confronto | Che cosa è cambiato |

**Massimo sei righe: un protocollo che non sta in una pagina non viene usato.**

---

# E fatevelo impaginare, non scrivere

```
Ecco i controlli del protocollo di verifica della mia classe:
[incolla le tue righe]

Impaginalo come una scheda da appendere in aula, per studenti di
[classe]: tre colonne, linguaggio diretto alla seconda persona, una
riga di titolo che sia una domanda.

Non aggiungere controlli che non ho scritto io. Se secondo te ne manca
uno importante, dimmelo alla fine, separatamente.
```

> **L'ultima riga è la parte che conta:** la Gem impagina, **voi decidete cosa c'è dentro.**
> È la differenza fra usarla e farsi usare.

---

# Il ponte: il risultato giusto col procedimento sbagliato

**È la cosa che vi succede ogni settimana, in tutte e tre le materie.**

- **Matematica** — il numero è giusto, due errori si compensano
- **Inglese** — l'essay è impeccabile e non risponde alla consegna
- **Italiano** — il tema è scritto benissimo ed è fuori traccia

> **Se guardate solo il prodotto, questi tre prendono un buon voto.**

*È `V_sint ≠ V_sem` applicato ai compiti. E per questo l'ultima ora la passiamo a costruire uno strumento che li riconosca.*

---

# La rubrica non si scrive dal nulla

**Il modo in cui di solito ci si prova, e non funziona:** aprire il curricolo, estrarre quattro parole astratte, dargli tre livelli. Esce *«adeguata padronanza»*, e nessuno sa cosa voglia dire — **nemmeno chi l'ha scritto.**

**Il modo che funziona: si parte da due lavori veri.**

> Una rubrica **si induce dagli esempi**, non si deduce dai documenti.
> I documenti servono **dopo**, per agganciare ciò che avete trovato.

*Prima io, poi insieme, poi voi.*

---

# I DO · Guardiamo due lavori

**Proietto due elaborati sullo stesso compito. Uno è migliore dell'altro, e lo vedete in tre secondi.**

**La domanda non è quale sia migliore. La domanda è:**

> **Che cosa fa il primo, che il secondo non fa?**

Non *«è più bravo»*. Non *«si vede che ha studiato»*. **Che cosa FA** — un'azione che posso indicare col dito sul foglio.

---

# Da «è scritto meglio» a un descrittore

| Impressione | Descrittore |
|---|---|
| «Argomenta meglio» | **Cita il testo** a sostegno di ogni affermazione |
| «Ha capito il problema» | **Dichiara il modello** scelto e perché |
| «Più preciso» | **Scarta la soluzione non accettabile** motivando |
| «Scrive bene» | **Tiene la tesi** dall'introduzione alla conclusione |

> **La prova del nove:** se non potete **indicare il punto del lavoro**, non è un descrittore. **È un'impressione.**

---

# WE DO · Scegliete il caso

**Tre micro-casi, uno per materia. Votate in chat, lavoriamo su quello della maggioranza — gli altri due restano in scheda.**

**Insieme, su un documento condiviso.** Io scrivo, voi dettate.

> **La regola del gioco:** ogni riga che proponete comincia con **un verbo**.
> *Cita · dichiara · scarta · collega · verifica · distingue.*

*Gli aggettivi li lasciamo fuori dalla porta.*

---

# Il caso · Matematica

**Problema:** *un rettangolo ha la base 3 m più lunga dell'altezza e area 40 m².*

**Lavoro A** — dichiara *«sia h l'altezza, h > 0»*; imposta; risolve; trova 5 e −8; **scarta −8 scrivendo perché**; verifica 5 × 8 = 40.

**Lavoro B** — imposta; risolve; **scrive 5 e 8.** Nient'altro.

> Stesso risultato. **Che cosa fa A che B non fa?**

---

# Il caso · Inglese

**Consegna:** *«Does the narrator change his mind about X? Answer in 120 words, supporting your answer with the text.»*

**Lavoro A** — prende posizione nella prima riga; porta **due citazioni brevi** dal testo; spiega perché sostengono la tesi; chiude riprendendo la posizione.

**Lavoro B** — inglese fluido, nessun errore, **nessuna citazione**: racconta la trama e aggiunge un'opinione.

> B è scritto meglio di A. **E vale meno. Perché?**

---

# Il caso · Italiano

**Consegna:** analisi di un testo poetico, un paragrafo sulla figura retorica dominante.

**Lavoro A** — nomina la figura; **cita il verso**; spiega **che effetto produce sul senso**; collega al tema.

**Lavoro B** — nomina la figura, la definisce correttamente, porta un esempio **preso dal manuale** e non dal testo.

> B sa la definizione. **A ha letto la poesia. La rubrica lo vede?**

---

# YOU DO · I vostri due esempi

**Sul vostro compito. Primo passo: fatevi generare i due lavori.**

```
Sei uno studente di [classe, indirizzo]. Consegna: [incolla la tua].

Scrivimi DUE svolgimenti dello stesso compito, come li scriverebbero
due studenti diversi.

Il PRIMO e' di livello alto: fa tutto quello che un bravo lavoro fa.
Il SECONDO e' di livello intermedio: arriva a una conclusione
accettabile ma salta i passaggi di giustificazione.

Stessa lunghezza, stessa cura formale. Non commentarli, non dirmi quale
e' quale: scrivili e basta.
```

---

# Dalle differenze alle dimensioni

**Mettete i due a fianco e scrivete, in righe che cominciano con un verbo:**

> **che cosa fa il primo, che il secondo non fa.**

Di solito escono **quattro o cinque righe. Quelle sono le vostre dimensioni.**

**Poi, e solo poi, aprite il curricolo** e agganciate ogni riga a un traguardo. Se una riga non si aggancia a niente, chiedetevi se state valutando qualcosa che vi piace invece di qualcosa che conta.

*Tre-cinque dimensioni. Sei sono già troppe da applicare a venticinque compiti.*

---

# Adesso la Gem completa, non inventa

**Attenzione all'ordine.** Non chiedetele *«fammi una rubrica»*: vi restituisce quattro parole astratte. **Le date le vostre righe e le fate fare il lavoro noioso.**

```
Ecco le dimensioni di una rubrica, scritte da me, per questo compito:
[incolla le tue righe]

Per ciascuna scrivi i descrittori dei tre livelli: da consolidare /
adeguato / eccellente.

Vincolo: ogni descrittore deve essere OSSERVABILE nel lavoro - chi legge
deve poter indicare il punto che giustifica il livello. Vietate le
formule "adeguata padronanza", "uso appropriato", "buona capacita'".

Se una mia dimensione non e' osservabile, dimmelo invece di
sistemarla da solo.
```

---

# Il collaudo · il terzo elaborato

**Una rubrica non si valuta leggendola. Si collauda provando a fregarla.** *È red-teaming applicato al vostro strumento.*

```
Scrivimi un TERZO svolgimento dello stesso compito.

Deve arrivare alla conclusione GIUSTA per il motivo SBAGLIATO:
- in matematica: il risultato corretto con un procedimento viziato
  (per esempio due errori che si compensano);
- in lingua o letteratura: un testo formalmente impeccabile che non
  risponde davvero alla consegna, o con una citazione inesistente.

Deve sembrare buono a una lettura veloce. Non deve sembrare peggiore
degli altri due: deve sembrare uguale.
```

**Applicate la vostra rubrica a tutti e tre.**

---

# Se non li distingue

> **Se il terzo prende lo stesso livello del primo, la rubrica non funziona.**
> E adesso lo sapete **prima** della classe, non su venticinque compiti.

**Se li distingue: guardate quale dimensione ha fatto la differenza.** È il cuore della vostra rubrica — **e la prima da spiegare agli studenti.** Quasi sempre è quella che chiede **una traccia del processo**.

**E una cosa che vale quanto la rubrica: si consegna agli studenti all'inizio, non alla fine.** Impareranno a fare ciò che viene valutato: **la rubrica non misura l'apprendimento, lo orienta. Scriverla è progettare.**

---

# Il presidio: il filtro T.A.P.E.

**Dal vostro Manuale — quattro lettere da tenere sul tavolo:**

**T · Trasparenza** — dichiarare sempre l'uso dell'IA. Nei materiali vostri, non solo nei loro.

**A · Accuratezza** — esigere prove e fonti. *«Se non sai, ammetti di non sapere.»*

**P · Privacy** — mai dati sensibili o nomi reali.

**E · Equità** — analizzare e correggere i bias. **Non emergono da soli: si vanno a cercare** — e adesso sapete come, si chiama bias audit.

---

# I tre prodotti, e come si tengono insieme

**1 · La scheda di red-teaming** — come si attacca un sistema per scoprirne i limiti.

**2 · Il protocollo di content curation** — come si verifica un contenuto, una fonte, un'immagine.

**3 · La rubrica collaudata** — come si valuta il lavoro che i primi due generano.

> Il red-teaming scopre. Il protocollo guida. **La rubrica valuta.**
> Sono tre pezzi di una cosa sola, e sono vostri: **riusabili ogni anno, con qualunque argomento.**

---

# Consegne: UdA completa entro lunedì 28

1. Il **canvas completo** + un materiale generato-e-revisionato
2. La **rubrica collaudata**, allegando **i tre elaborati** su cui l'avete provata
3. Il **protocollo di content curation** della vostra classe
4. La **policy IA** — cosa puoi · cosa non puoi · come lo dichiari · **perché** — con l'ultima riga: *«anche i materiali preparati con l'IA dal docente sono dichiarati»*
5. La **regola nuova** aggiunta alla Gem nel red-teaming

**Sette minuti il 30:** 2' il compito e perché è autentico · 3' le fasi e dove entra l'IA · 1' la policy · **1' cosa vi preoccupa**

---

# Tre gesti, per il resto dell'anno

1. **Nessuna citazione entra in un materiale senza che io abbia aperto il documento.**
2. **Nessun risultato entra in una verifica senza che io l'abbia rifatto.**
3. **Ogni contenuto generato è dichiarato** — nei materiali miei prima che nei loro.

> **La verifica è un'abitudine, non un evento.**
> La macchina produce la forma. **La sostanza la mettete voi** — e in una rubrica si chiama **descrittore osservabile.**

*Registro firme · Materiali nella cartella del corso.*
