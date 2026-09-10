# Materiali operativi — Incontro 2

## Scheda 2 — Il tuo prompt-template professionale (laboratorio, 35')

**Obiettivo:** trasformare un materiale che producete spesso in un prompt-template riusabile, nel vostro stile.

**La struttura del template: C.R.A.F.T. + Esemplare + 4R.**

| Elemento | Domanda-guida | Esempio |
|---|---|---|
| **C** — Context | Disciplina, classe, cosa sanno già? | "Quarta liceo scientifico, appena conclusa la cinematica" |
| **R** — Role | Chi deve essere il modello? | "Sei un docente esperto di fisica del secondo ciclo" |
| **A** — Action | **Verbo forte** + oggetto preciso | "Genera una verifica di 6 esercizi su…" — mai "parlami di" |
| **F** — Format | Struttura obbligatoria dell'output | "3 sezioni; soluzioni in coda separate; max 2 pagine" |
| **T** — Target | Per chi / con quale obiettivo | "Valutare se sanno impostare, non solo risolvere" |
| **+ Esemplare** | Un modello del vostro stile (few-shot) | Incollate un vostro esercizio come esemplare — è il passaggio che fa la differenza |
| **+ 4R** | Almeno un filtro scritto nel template | Riferimenti ("usa solo il documento caricato, cita la pagina") e/o Restrizione ("niente nomi reali; se non puoi citare fonti verificabili, scrivilo") |

**Versione tascabile (3C):** Contesto (=C+R) · Compito (=A) · Criteri (=F+T). Un modello, due marce: C.R.A.F.T. quando progettate con calma, 3C quando siete di corsa.

**Procedura:**
1. (5') Scegliete il materiale portato e identificate cosa lo rende "vostro" (stile delle consegne, gradualità, impaginazione).
2. (15') Scrivete il template: C.R.A.F.T. completo + esemplare + almeno una R.
3. (5') Generate con Gemini. Confrontate con l'originale: cosa manca? Aggiungete UN vincolo e rigenerate (è la 4ª R, la Ripetizione).
4. (10') Scambio in coppia: eseguite il template del collega senza spiegazioni a voce. L'output è all'altezza? Un feedback su cosa funziona + un vincolo suggerito. Poi salvate nella Prompt-libreria.

## Scheda 2-bis — I filtri e i pattern (riferimento rapido)

**Le 4R — i filtri di qualità:**
- **Riferimenti** (anti-allucinazione): "usa solo il documento caricato e cita la pagina" — trasforma un generatore di verosimiglianza in un assistente di ricerca.
- **Restrizione** (pertinenza): "max 200 parole", "escludi le date dopo il 1945".
- **Revisione** (inclusività): "riscrivi per uno studente con dislessia: frasi brevi, niente subordinate".
- **Ripetizione** (iterazione): il primo prompt è una bozza — "troppo lungo, dimezzalo", "adatta l'esempio alla mia classe". Non cercate il prompt perfetto: cercate la conversazione perfetta.

**I pattern avanzati:**
- **Catena** (*chain of thought*): "risolvi passo dopo passo, spiega il ragionamento, conclusione alla fine" — meno errori, e il ragionamento diventa materiale didattico ("dove ha ragionato bene? dove ha preso una scorciatoia?").
- **Critico:** "analizza l'output che hai prodotto, trova i 3 punti più deboli, riscrivili" — la revisione come parte del pensiero.
- **Unplanning / Socratico (Slow AI):** il pattern rovesciato — il prompt impedisce all'IA di rispondere e la costringe a fare domande. Versione compatta da provare:
  ```
  Sei un Facilitatore Pedagogico Socratico (Slow AI, R. Beghetto).
  Aiutami a fare "unplanning" di una mia lezione tradizionale su
  [argomento], introducendo incertezza strutturata. Regole: (1) non
  darmi MAI un piano pronto né una risposta completa; (2) UNA domanda
  alla volta, attendi la mia risposta; (3) solo possibilità: "Cosa
  succederebbe se…", "E se provassimo a…"; (4) inizia chiedendomi quale
  aspetto "troppo familiare" dell'argomento vorrei scardinare.
  ```
  (Il laboratorio completo, con le missioni disciplinari, è all'incontro 6 — scheda 8.)
- **Context Conveyor** (per conversazioni lunghe): "all'interno dell'ambito X" · "considera Y" · "ignora Z" · "ricominciamo da capo".

**La tassonomia inversa (per progettare consegne):** lo studente genera subito con l'IA, poi *scende*: analizza l'output, trova errori e bias, e attraverso la critica arriva alla comprensione. Lavora sull'output, non lo subisce.

## Scheda 2-ter — T.A.P.E. e la checklist finale

**T.A.P.E. — l'etica scritta dentro il prompt (micro-azioni pronte):**
- **T**rasparenza: in coda al materiale → "assistenza IA usata per…, versione e data".
- **A**ccuratezza: nel prompt → "se non puoi citare fonti verificabili, scrivi: SENZA FONTI VERIFICABILI".
- **P**rivacy: nel prompt → "rileva eventuali dati personali e sostituiscili con [omissis]" — e sempre profili sintetici, mai nomi o diagnosi.
- **E**quità: "elenca 3 possibili bias in questo testo e riscrivilo in modo inclusivo".

**La checklist delle 7 domande (10 secondi, prima di usare qualunque output):** obiettivo didattico? ruolo autorevole? destinatario e livello? vincoli e criteri? fonti citate? privacy garantita? revisione personale fatta? — **Se anche una sola risposta è "no", quell'output non entra in classe.**

**Formato standard per la Prompt-libreria:**
```
TITOLO: [es. Verifica graduata di grammatica latina]
DISCIPLINA/CLASSI: [es. Latino, biennio]
COSA PRODUCE: [una riga]
TEMPLATE: [il prompt completo, con segnaposto {argomento}, {classe}…]
NOTE D'USO: [cosa personalizzare, errori visti, versione]
```

## Le tre regole su copyright e trasparenza (promemoria)

1. L'output puramente generato non ha tutela autorale; il vostro lavoro di selezione, correzione e adattamento sì — i materiali revisionati sono lavoro professionale vostro.
2. Dichiarate l'uso dell'IA nei materiali condivisi (nota in coda: "Materiale elaborato con il supporto di IA generativa e revisionato dall'autore").
3. Non incollate nei prompt testi integrali protetti di terzi; per i materiali dello Snodo usate licenze Creative Commons (consigliata CC BY-NC-SA).

## Demo agente — riferimenti

Il kit completo (foglio `Programma_settimanale`, i 3 prompt-template del flusso, guida Workspace Studio e piano B con i Gems) è nella cartella **Demo agente** del corso. La scala di autonomia in sintesi: 0 manuale · 1 assistito · 2 batch supervisionato · 3 trigger+revisione · 4 autonomo con audit (solo amministrativo) · 5 mai. Perimetro didattico: livelli 2–3; valutazione: livello 1.

## Consegne per l'incontro 3

- Rifinire il template e caricarlo nella Prompt-libreria entro lunedì 14.
- Usarlo almeno una volta su un materiale reale.
- Scegliere l'argomento della vostra UdA (project work): si parte mercoledì.
