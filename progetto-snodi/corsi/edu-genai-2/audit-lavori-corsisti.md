# Registro degli audit — I lavori dei corsisti (Edu-GenAI 2)

*Documento di lavoro della formatrice. Una sezione per corsista: cosa ha funzionato, errori verificati nel materiale, audit dei prompt con le riscritture, spunti da restituire. In coda: i pattern ricorrenti dell'aula, da riprendere in apertura d'incontro. Aggiornato man mano che arrivano i lavori.*

**Metodo di analisi:** audit C.R.A.F.T. dei prompt · qualità dell'iterazione (4ª R) · controllo Riferimenti e privacy · verifica dei contenuti sulla fonte primaria (ricalcolo).

---

## 1 · CATERINA — Test d'ingresso di matematica (prima liceo scientifico, da modello del liceo artistico, 2 studenti DSA)

**Percorso:** 4 prompt — generazione da file allegato → "rivedi e correggi" → "riproduci le figure correttamente" → richiesta PDF finale.

### ✅ Cosa ha funzionato (da valorizzare)

1. **R dei Riferimenti usata d'istinto**: partita da un file ancorato (il test dell'artistico) con il vincolo "mantenendo lo stesso formato" — non ha fatto generare dal nulla.
2. **Privacy impeccabile**: "la classe presenta due studenti DSA" — profilo sintetico, niente nomi né diagnosi. Esempio da citare in aula.
3. **Ha iterato tre volte**, incluso un "rivedi e correggi" che è il Pattern del Critico usato prima di conoscerlo, e un occhio attento sulle figure sbagliate.

### ⚠️ Errori verificati nel materiale (da correggere prima dell'uso in classe)

**Versione 1:**
- **Quesito 21 — griglia SBAGLIATA**: la tabella dà "125"; il risultato corretto è **3** (lo svolgimento esteso della stessa risposta arriva a 3: contraddizione interna).
- **Quesito 16 — griglia in contraddizione**: tabella 3/2, svolgimento 9/4. Corretto: **9/4**.
- **Quesito 12 — opzione duplicata**: "600 €" compare due volte tra le alternative.

**Versione 2 ("corretta"):**
- **Misura DSA errata e incoerente**: "riduzione quantitativa del 30% del punteggio totale o tempo aggiuntivo fino a 15 minuti" — concettualmente sbagliata (si riducono semmai i quesiti a parità di obiettivi, mai il punteggio) e incoerente con la v1 (che diceva correttamente +30% di tempo = 75'). **Il formulario compensativo della v1 è sparito.**
- **Quesito 20**: calcoli formalmente giusti ma risultato **50645/4 = 12.661,25** con divisione 225:(−30) intermedia — espressione che "non chiude": da riprogettare per un test d'ingresso.

**Il punto didattico chiave:** al prompt "rivedi e correggi", Gemini **non ha corretto: ha rigenerato un test nuovo** (quesiti diversi), perdendo pezzi buoni (formulario, alta leggibilità) e introducendo errori nuovi. Comportamento tipico del Critico senza Restrizione.

### 🔧 Audit dei prompt — le riscritture

**Prompt di revisione** (originale: "rivedi il compito proposto e modifica eventuali errori") →
> "Rivedi il test SENZA cambiare i quesiti: correggi solo gli errori di calcolo, le opzioni duplicate e le incoerenze tra griglia e svolgimenti. Ricalcola ogni risposta della griglia mostrando i passaggi. Alla fine elenca in tabella TUTTE le modifiche fatte, quesito per quesito. Non toccare la sezione DSA."

**Prompt iniziale** (buono; mancavano Ruolo e due Criteri) →
> "Sei un docente di matematica esperto di valutazione nel primo biennio del liceo scientifico. Partendo dal test d'ingresso allegato (liceo artistico), creane uno per una classe prima dello scientifico mantenendo formato e struttura. Vincoli: 20 quesiti, 60 minuti, ogni quesito con 4 opzioni tutte diverse, risultati delle espressioni che chiudano su numeri semplici. La classe ha due studenti DSA: prevedi misure compensative coerenti con la L. 170/2010 (+30% di tempo, formulario allegato, alta leggibilità) senza ridurre il punteggio. In coda: griglia con soluzioni ricalcolate passo passo."

### 💬 Spunti da restituire (formulati in positivo)

1. "Hai fatto d'istinto tre cose che insegneremo col loro nome — Riferimenti, profilo sintetico, Critico. Il passo in più: quando chiedi 'correggi', la macchina tende a rifare; aggiungi 'solo gli errori, non cambiare i quesiti, elencami le modifiche' e la revisione resta sotto il tuo controllo."
2. "La griglia di correzione va sempre ricalcolata da noi: nel tuo test la macchina si contraddice due volte tra tabella e svolgimento (Q21: dice 125, è 3). È la settima domanda della checklist — 'ho revisionato personalmente l'output?' — quella che salva la prova prima che finisca sui banchi."

---

## 2 · MANUELA — Verifica di matematica per alunna ipovedente (quarta liceo scientifico, geometria nello spazio)

**Percorso:** 3 prompt — generazione da documento esemplare con vincoli di accessibilità → "trasforma in PDF" (rifiutato con motivazione falsa) → secondo tentativo riuscito. PDF finale analizzato tecnicamente.

### ✅ Cosa ha funzionato (da valorizzare)

1. **I vincoli di accessibilità più precisi dell'aula**: Verdana 22, 2 ore, "usa strumenti digitali" — Format e Target da manuale; e la scelta giusta di adattare la forma senza abbassare gli obiettivi.
2. **Riferimenti**: partita dal documento esemplare.
3. **Privacy**: "un'alunna ipovedente, classe quarta" — profilo sintetico, nessun nome.
4. **Instabilità gestita bene**: al primo "trasforma in PDF" Gemini ha risposto "non posso, sono solo un modello linguistico" (falso); lei ha riprovato e ha ottenuto il file.

### ⚠️ Errori e rilievi verificati

1. **Il PDF non mantiene la promessa (verificato sul file)**: Gemini dichiara "Verdana a 22 punti"; l'analisi tecnica del PDF dà corpo 22 pt ✓ ma font **Noto Sans, non Verdana** ✗. Funzionalmente accettabile (sans-serif leggibile), ma se il PDP prescrive Verdana il documento non è conforme. Punto formativo: la macchina ha dichiarato una proprietà verificabile del file, ed è falsa.
2. **Esercizio 2 matematicamente MAL POSTO — da rifare**: chiede la retta per P(1;−1;2) parallela al piano x−y+2z+1=0 E perpendicolare alla retta r di direzione (1;−1;2). Normale del piano e direzione di r sono lo stesso vettore: le due condizioni coincidono → **infinite soluzioni**, nessuna retta unica.
3. **Mancano le soluzioni svolte**: rubrica vuota (senza descrittori né punteggi) e nessuna griglia. Se le soluzioni fossero state chieste, l'IA si sarebbe incagliata sull'Es. 2 e l'errore sarebbe emerso prima della classe.
4. **Da chiarire con la corsista**: l'esemplare citato è una "Verifica PEI obiettivi minimi", ma la verifica generata è a difficoltà piena (con calcoli pesanti: punto di tangenza T(7/9; −20/9; 10/9)). Corretto per ipovisione senza bisogni cognitivi — ma cosa prevede il PEI/PDP dell'alunna? Il salto di difficoltà deve deciderlo la docente.

### 🔧 Audit del prompt — la riscrittura

> "Sei un docente di matematica del triennio del liceo scientifico, esperto di didattica accessibile. Partendo dal documento allegato, genera una verifica di geometria nello spazio con lo stesso numero di esercizi, per un'alunna ipovedente di quarta che svolge la prova con strumenti digitali. Vincoli: font Verdana 22, interlinea 1,5, equazioni linearizzate senza parentesi graffe di sistema; durata 2 ore; ogni esercizio deve avere una e una sola soluzione; difficoltà: [conforme al PEI: obiettivi minimi / programma standard]. In coda: soluzioni complete svolte passo passo e rubrica con descrittori e punteggi. Dopo la generazione, verifica tu stesso di saper risolvere ogni esercizio e segnala eventuali quesiti mal posti."

### 💬 Spunti da restituire (in positivo)

1. "I tuoi vincoli di accessibilità sono i migliori che ho visto: precisi, misurabili. Proprio perché misurabili, misurali: il PDF dice Verdana 22 ma il font vero è un altro (la dimensione sì, è giusta). Due minuti sulle proprietà del file — fidati del file, non della prosa."
2. "Chiedi sempre le soluzioni svolte insieme alla verifica: non per risparmiarti i calcoli, ma come collaudo — l'esercizio 2 non ha soluzione unica, e se l'IA avesse dovuto risolverlo se ne sarebbe accorta lei per prima. La verifica che non sai risolvere tu, non entra in classe."


---

## Pattern ricorrenti dell'aula (si aggiorna man mano)

| Pattern | Visto in | Cosa riprendere in aula |
|---|---|---|
| "Correggi" generico → la macchina rigenera invece di correggere (e perde pezzi) | Caterina | Il Critico va sempre con una Restrizione + richiesta di elencare le modifiche (audit di conformità) |
| Griglia/soluzioni accettate senza ricalcolo (contraddizioni interne non viste) | Caterina | Checklist domanda 7: la verifica sulla fonte primaria — qui, rifare i calcoli |
| Dichiarazioni sul formato non mantenute nel file (font, layout) | Manuela | Verificare le proprietà del file, non la prosa — la "carbonara" tipografica |
| Verifiche generate senza soluzioni svolte → esercizi mal posti non emergono | Manuela | Chiedere sempre le soluzioni passo passo come collaudo: "la verifica che non sai risolvere tu non entra in classe" |
| Rifiuti infondati dello strumento ("non posso, sono solo un modello") | Manuela | Riprovare/riformulare: l'instabilità è normale, non è un verdetto |
| *(in attesa dei prossimi lavori)* | | |

---
*Documento di lavoro riservato alla formatrice — contiene valutazioni sui lavori dei corsisti: non condividere nella cartella del corso. Elaborato con il supporto dell'IA e revisionato dalla formatrice.*
