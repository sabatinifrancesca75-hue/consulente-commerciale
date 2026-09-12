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

## 3 · SARA — Verifica di inglese (terza liceo scienze umane, storia/letteratura Tudor + grammatica B1, alunno disgrafico)

**Percorso:** 1 prompt ben costruito con **due allegati** (verifica esemplare + griglie di valutazione d'istituto) → generazione fila standard + fila DSA + sezione griglie → richiesta PDF.

### ✅ Cosa ha funzionato (da valorizzare)

1. **Il miglior uso della R dei Riferimenti visto finora**: non uno ma due ancoraggi — l'esemplare per la struttura e le **griglie vere dell'istituto** per la valutazione. L'output cita le griglie della scuola invece di inventarne di generiche. Da mostrare in aula come modello.
2. **L'adattamento DSA fa la cosa giusta per la disgrafia**: stessi contenuti e obiettivi (Tudor, sonetto, strutture B1), ma scrittura a mano ridotta al minimo — crocette, word box, completamenti. "Adattare la forma senza abbassare gli obiettivi", applicato.
3. **Prompt singolo solido**: Ruolo, Azione, Restrizioni (60', stesso numero di esercizi, livello B1, profilo DSA). Contenuti storico-letterari verificati quasi tutti corretti (Bosworth, Act of Supremacy 1534, Book of Common Prayer/Edoardo VI, Maria I–Filippo II, sonetto 3 quartine + distico, ABAB CDCD EFEF GG, Fair Youth/Dark Lady); distrattori V/F ben costruiti.

### ⚠️ Errori e rilievi verificati

1. **Il vincolo "B1" non è rispettato item per item**: nella fila standard, Task 2, compaiono il **past perfect** ("by the time Elizabeth died, Shakespeare *had written*…") e il **periodo ipotetico di 3° tipo** ("If Henry VIII *had not wanted*… *might not have happened*") — strutture B1+/B2. Chi svolge una verifica dichiarata B1 viene valutato su strutture mai richieste. Le domande etichettate "Grammar B1" del Task 1 invece sono davvero B1 (present perfect vs past simple, passivo, 1° tipo): la deriva è nei quesiti non etichettati.
2. **I 10 punti fantasma**: i task valgono 24+6+5+5 = **40**, ma il box finale dice "/40 + 10 (Structure) = /50" e la tabella di conversione è su /50. Nessun esercizio attribuisce quei 10 punti; presumibilmente sono i 5+5 delle griglie (conoscenza + competenza linguistica), ma **non è scritto come assegnarli**: così il voto non è calcolabile.
3. **Punteggio DSA ambiguo**: Task 1 DSA "4 marks for each correct item" × 6 item = 24, ma gli item contengono da 1 a 3 spazi ciascuno (10 in tutto): quanto vale un item con 2 lacune giuste su 3? Nessuna regola di punteggio parziale.
4. **Nessuna chiave di correzione** — per le domande aperte del Task 1 standard (4 punti l'una) mancano risposte attese e descrittori. Pattern d'aula ormai stabile.
5. **Misure DSA da catalogo, non dal profilo**: la scheda elenca OpenDyslexic e "non si valutano gli errori ortografici" — misure per dislessia/disortografia, non per **disgrafia**. La misura centrale (ridurre la scrittura) per fortuna è quella giusta; ma il tempo è lasciato come alternativa non decisa ("fino al 30% in più *o* riduzione dei quesiti") e la fila DSA non dichiara la propria durata. Da scegliere e scrivere: 60' con item ridotti, oppure 75–80'.
6. **Font dichiarato, da verificare sul file**: il riepilogo promette "carattere ad alta leggibilità (Verdana)" nel PDF. Precedente Manuela: dichiarava Verdana, il file era in Noto Sans. Prima dell'uso: due minuti sulle proprietà del PDF.
7. *(minore)* "The Spanish Armada **attacked** the English fleet in 1588": storicamente approssimativo — l'Armada veniva a scortare l'invasione e furono soprattutto gli inglesi ad attaccare (brulotti, Gravelines). In una verifica la frase diventa un "fatto": meglio "was defeated by" (come nella fila DSA, che infatti è corretta).

### 🔧 Audit del prompt — la riscrittura

> "Sei un docente di lingua e letteratura inglese del triennio di un liceo delle scienze umane. Partendo dalla verifica allegata (stessa struttura: 4 task, stessi pesi), genera una verifica di 60 minuti sugli stessi argomenti, con quesiti di grammatica **solo di livello B1** — ammessi: present perfect vs past simple, passivo, periodo ipotetico di 1° tipo; **esclusi**: past perfect, 3° tipo. Aggiungi la fila per un alunno **disgrafico**: stessi obiettivi e contenuti, scrittura a mano ridotta al minimo (scelte multiple, word box), misura sul tempo dichiarata (scegli: quesiti ridotti in 60' oppure +30%). Per entrambe le file: chiave di correzione completa con risposte attese, regola per i punteggi parziali nei completamenti, e somma dei punteggi che torni esattamente col totale della tabella di conversione — se prevedi punti non legati ai task, spiega chi li attribuisce e come, agganciandoli alle griglie allegate."

### 💬 Spunti da restituire (in positivo)

1. "Hai allegato le griglie vere della scuola invece di farle inventare: è l'uso più maturo della R dei Riferimenti che ho visto nel corso — l'output parla la lingua del tuo istituto. Da copiare tutti."
2. "Il vincolo 'B1' va collaudato item per item: nella fila standard sono entrati past perfect e 3° tipo, che B1 non sono — e chi corregge penalizzerebbe errori su strutture mai dichiarate. Nel prompt, il livello si scrive come lista: 'ammesse queste strutture, escluse queste'."
3. "Rifai sempre i conti del punteggio: i task valgono 40 ma il totale è 50 — quei 10 punti 'Structure' non li assegna nessun esercizio. È lo stesso collaudo della griglia di Caterina: la somma la verifichiamo noi."

---

## Pattern ricorrenti dell'aula (si aggiorna man mano)

| Pattern | Visto in | Cosa riprendere in aula |
|---|---|---|
| "Correggi" generico → la macchina rigenera invece di correggere (e perde pezzi) | Caterina | Il Critico va sempre con una Restrizione + richiesta di elencare le modifiche (audit di conformità) |
| Griglia/punteggi accettati senza ricalcolo (contraddizioni, somme che non tornano) | Caterina · Sara (i 10 punti "Structure" che nessun task assegna) | Checklist domanda 7: la verifica sulla fonte primaria — rifare i calcoli e le somme |
| Dichiarazioni sul formato non mantenute nel file (font, layout) | Manuela · Sara (da verificare: "Verdana" promesso nel PDF) | Verificare le proprietà del file, non la prosa — la "carbonara" tipografica |
| Verifiche generate senza soluzioni svolte → esercizi mal posti non emergono | Manuela · Sara | Chiedere sempre chiave e soluzioni passo passo come collaudo: "la verifica che non sai risolvere tu non entra in classe" |
| Rifiuti infondati dello strumento ("non posso, sono solo un modello") | Manuela | Riprovare/riformulare: l'instabilità è normale, non è un verdetto |
| Vincolo di livello dichiarato ma non rispettato item per item (B1 → strutture B2) | Sara | Il livello è una Restrizione da scrivere come lista chiusa ("ammesse… escluse…") e da collaudare quesito per quesito |
| Misure DSA da catalogo, non calibrate sul profilo specifico | Caterina (v2) · Sara (misure per dislessia su un profilo disgrafico; tempo lasciato come alternativa) | La misura si sceglie dal profilo (disgrafia ≠ dislessia ≠ disortografia) e si dichiara per iscritto — mai lasciata come "oppure" |
| *(in attesa dei prossimi lavori)* | | |

---
*Documento di lavoro riservato alla formatrice — contiene valutazioni sui lavori dei corsisti: non condividere nella cartella del corso. Elaborato con il supporto dell'IA e revisionato dalla formatrice.*
