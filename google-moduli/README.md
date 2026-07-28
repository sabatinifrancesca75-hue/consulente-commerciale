# Google Moduli – Pre-adesione ai percorsi IA (Snodo Volterra)

Script Google Apps Script che crea automaticamente i tre Google Moduli di
pre-adesione descritti nel *Blueprint Google Moduli Pre-adesione*:

1. **Pre-adesione ai percorsi IA – Snodo Volterra – Scuole del Primo Ciclo**
2. **Pre-adesione ai percorsi IA – Snodo Volterra – Scuole del Secondo Ciclo**
3. **Pre-adesione – Smart-Gov & Segreteria – Snodo Volterra** (percorso A2)

## Come creare i moduli (5 minuti)

1. Aprire [script.google.com](https://script.google.com) con l'account Google
   della scuola (quello che dovrà essere proprietario dei moduli).
2. Cliccare **Nuovo progetto**.
3. Cancellare il contenuto di `Codice.gs` e incollare al suo posto il contenuto
   di [`crea_moduli_preadesione.gs`](crea_moduli_preadesione.gs).
4. **Prima di eseguire**: sostituire in cima al file il segnaposto
   `SCADENZA = '[gg/mm/2026]'` con la data di scadenza reale.
5. Salvare (icona dischetto), selezionare la funzione **`creaTuttiIModuli`**
   nel menu a tendina in alto e premere **Esegui**.
6. Alla prima esecuzione Google chiede l'autorizzazione: **Rivedi
   autorizzazioni → scegli l'account → Avanzate → Vai al progetto → Consenti**.
7. Al termine, aprire il **Log di esecuzione**: contiene per ciascun modulo il
   link di **modifica** e il link di **compilazione** da diffondere. I tre
   moduli compaiono anche nella home di Google Drive / Moduli.

Per creare un solo modulo, eseguire invece `creaModuloPrimoCiclo`,
`creaModuloSecondoCiclo` o `creaModuloDsSegreteria`.

## Cosa viene configurato automaticamente

- Tutte le domande del blueprint, nell'ordine previsto, con obbligatorietà
  corretta.
- **Codice fiscale**: validazione a 16 caratteri alfanumerici.
- **Email istituzionale**: validazione indirizzo email.
- **Percorso prescelto / secondo percorso**: elenchi a discesa con i percorsi
  del ciclo corrispondente (il secondo include l'opzione «Nessuno» ed è
  facoltativo).
- **Consenso GDPR**: casella di controllo obbligatoria.
- Impostazioni: raccolta indirizzi email attiva, ordine domande fisso,
  barra di avanzamento attiva, messaggio di conferma personalizzato.

## Da fare a mano dopo la creazione

- **Limita a 1 risposta**: lo script la lascia disattivata (come da blueprint,
  per non escludere i docenti esterni senza account Google). Per attivarla,
  decommentare la riga `form.setLimitOneResponsePerUser(true)` prima di
  eseguire, oppure attivarla dalle impostazioni del modulo.
- Collegare eventualmente ogni modulo a un **foglio di risposte** (Risposte →
  icona Fogli Google), utile per la deduplica in base al codice fiscale.
- Verificare la data di scadenza nelle descrizioni se non è stata sostituita
  prima dell'esecuzione.
