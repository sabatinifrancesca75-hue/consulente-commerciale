# Demo "Il lunedì se lo prepara l'agente" — kit di costruzione

Flusso dimostrativo per Edu-GenAI 2 (incontro 2 del 7/9, chiusura "dal prompt all'agente") e per il modulo pieno in AI-Lead. Tutto il kit è a rischio privacy zero: nessun dato di studenti, differenziazione per profilo e mai per persona.

## Contenuto del kit

| File | Uso |
|---|---|
| `programma_settimanale_esempio.csv` | Struttura + righe di esempio del foglio sorgente (da importare in Google Sheets) |
| `prompt-scheda-base.md` | Template Gemini — versione base con esercizi graduati |
| `prompt-alta-leggibilita.md` | Template Gemini — versione ad alta leggibilità (profilo BES/DSA) |
| `prompt-potenziamento.md` | Template Gemini — versione di potenziamento |

## 1. Preparazione del foglio sorgente (5 minuti, una volta sola)

Creare un Google Sheet **`Programma_settimanale`** con due tab:

**Tab `Programma`** — una riga per argomento/classe (vedi CSV di esempio):

| Colonna | Contenuto | Esempio |
|---|---|---|
| `settimana` | Lunedì di riferimento (AAAA-MM-GG) | 2026-09-14 |
| `classe` | Solo sigla, MAI nomi di studenti | 4B |
| `disciplina` | Materia | Matematica |
| `argomento` | Tema della settimana | Derivata di una funzione: definizione e significato geometrico |
| `obiettivi` | 2–3 obiettivi osservabili, separati da ";" | Calcolare la derivata come limite del rapporto incrementale; interpretare la derivata come pendenza della tangente |
| `tipo_attivita` | Formato atteso | Scheda di esercizi con parte teorica |
| `note_docente` | Vincoli o agganci (facoltativa) | Collegare alla velocità istantanea vista in fisica |
| `stato` | `DA_GENERARE` → l'agente la processa e scrive `GENERATO` | DA_GENERARE |

**Tab `Esecuzioni`** (log anti-automation-bias, la compila l'agente): `data_esecuzione, settimana, classe, argomento, esito, link_cartella`.

> Regola d'oro da ripetere in aula: in questo foglio non entra **mai** un nome, un'iniziale o un riferimento a uno studente specifico. "Alta leggibilità" è un profilo di materiale, non una lista di persone.

## 2. Il flusso in Workspace Studio (costruzione live in aula, ~20 minuti)

- **Trigger:** pianificato — ogni venerdì ore 17:00.
- **Passo 1 — Lettura:** leggi dal foglio `Programma_settimanale`/tab `Programma` le righe con `stato = DA_GENERARE` e `settimana` = settimana entrante. Le colonne diventano variabili del flusso: `{{classe}}`, `{{disciplina}}`, `{{argomento}}`, `{{obiettivi}}`, `{{tipo_attivita}}`, `{{note_docente}}`.
- **Passi 2–4 — Generazione (3 passi Gemini):** un passo per template; incollare il contenuto dei tre file `prompt-*.md` nel campo istruzioni, lasciando i segnaposto `{{...}}` che Studio sostituisce con i valori del foglio.
- **Passo 5 — Archiviazione:** crea tre Google Doc in `Drive/Materiali/{{classe}}/{{settimana}}/` con nomi:
  - `BOZZA - {{argomento}} - base`
  - `BOZZA - {{argomento}} - alta leggibilita`
  - `BOZZA - {{argomento}} - potenziamento`
- **Passo 6 — Human-in-the-loop:** messaggio Google Chat (o email) al docente: *"📚 Bozze pronte per {{classe}} — {{argomento}}. Tre versioni in [link cartella]. Da rivedere prima dell'uso: nulla va in classe col prefisso BOZZA."*
- **Passo 7 — Chiusura ciclo:** aggiorna `stato = GENERATO` e aggiungi riga nel tab `Esecuzioni`.

**I guardrail sono nel design, non nella buona volontà:** prefisso `BOZZA -`, notifica di revisione obbligatoria, log delle esecuzioni, nessun canale verso gli studenti.

## 3. Scaletta della demo in aula (20 minuti, incontro 2)

1. **(3')** Mostrare il problema: "quanto tempo passate a fare tre versioni della stessa scheda?" — aggancio al trial EEF (−31% sul planning).
2. **(2')** La scala di autonomia (slide): questo flusso è un livello 3 — parte da solo, ma consegna *bozze*.
3. **(8')** Costruzione live del flusso in Studio (o mostrare il flusso già pronto ed eseguirlo con "Run now" sulla riga demo del CSV).
4. **(4')** Aprire i tre documenti generati: confrontare le versioni — *stesso obiettivo, tre scaffolding diversi*. Far notare dove l'output va corretto: la revisione è il punto, non un difetto.
5. **(3')** Il semaforo dei processi (🟢🟡🔴) + la regola di governance: ogni agente si censisce nella mappa degli usi IA dell'istituto (sul modello della mappatura EDPS per le istituzioni UE).

**Riga demo consigliata** (già nel CSV): Matematica, 4B, "Derivata di una funzione" — parla al liceo scientifico ospite ed è ricca di possibilità di differenziazione; in aula con docenti di altre discipline, generare live una seconda riga proposta da loro (Storia o Scienze) per mostrare che i template sono disciplinari-agnostici.

## 4. Piano B (se Workspace Studio non è attivo sul dominio)

La demo regge anche a **livello 2 (batch supervisionato)**, stessa pedagogia:
1. Creare tre **Gems** ("Generatore scheda base", "Generatore alta leggibilità", "Generatore potenziamento"), incollando i template come istruzioni di sistema del Gem.
2. Il lunedì il docente incolla nel Gem la riga del foglio (30 secondi) e salva l'output in Drive.
3. In aula si spiega: "il giorno in cui Studio è attivo, questi tre Gems diventano i passi 2–4 del flusso automatico — i prompt non cambiano".

Questo è anche l'argomento didattico più importante: **il valore sta nei prompt-template e nei guardrail, non nella piattaforma**. Il prompting insegnato nell'incontro 2 è il motore; l'agente è solo il telaio.

## 5. Note di conformità (da dire esplicitamente in aula)

- Ambiente: solo Workspace for Education dell'istituto (sandbox, dati non usati per addestramento).
- L'agente va censito nella mappa degli usi IA dell'istituto (indicazione EDPS) — per la demo del corso è censito come "flusso didattico di preparazione materiali, nessun dato personale".
- I materiali generati diventano didattici solo dopo revisione e rimozione del prefisso BOZZA: human-in-the-loop by design (DM 166/2025).
