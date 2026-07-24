# Revisione del codice — Erreciesse Pro (24/07/2026)

Questo branch contiene il codice dell'app **con tutte le correzioni applicate** dopo la revisione completa.

## Correzioni applicate

### Sicurezza (critiche)

1. **`firestore.rules` riscritte**: prima qualsiasi account Google al mondo poteva leggere e
   modificare tutti i dati aziendali. Ora l'accesso è limitato a una lista di email autorizzate
   (`admin@erreciesse.it`, `sabatini.francesca75@gmail.com`) con email verificata, più la
   validazione di base su ordini e magazzino.
   ⚠️ **Le regole NON sono attive finché non vengono pubblicate**: console Firebase →
   Firestore Database → Regole → incollare il contenuto di `firestore.rules` → Pubblica.
2. **Pulsante "Semina Dati"**: ora è visibile solo agli amministratori e chiede conferma
   esplicita, perché sovrascrive giacenze/ordini/clienti con dati di prova.
3. **`handleFirestoreError`** non espone più email e dati dell'utente nei log e non rilancia
   JSON grezzo verso l'interfaccia.

### Perdita dati (critiche)

4. **Elimina cliente**: usava `setDoc({}, {merge:false})` che svuotava la scheda senza
   eliminarla (restava una card "fantasma"). Ora usa `deleteDoc`.
5. **Codici cliente/ordine univoci**: prima erano casuali su 1.000 combinazioni (clienti) o
   basati sulle ultime 4 cifre dell'orologio (ordini): le collisioni sovrascrivevano dati
   esistenti in silenzio. Ora usano `crypto.randomUUID()`.
6. **Magazzino con più utenti**: scarico merce e ritiri calcolavano la nuova giacenza dal
   valore visualizzato a schermo; con due utenti simultanei una modifica andava persa.
   Ora usano `increment()` di Firestore (somma/sottrazione atomica sul server).

### Calcoli errati

7. **Stato `ritirato` inesistente**: fabbisogno componenti e previsione incassi escludevano
   uno stato che l'app non usa mai, quindi contavano per sempre anche gli ordini già
   consegnati/incassati. Ora il fabbisogno considera solo gli ordini nelle 4 fasi di officina
   e la previsione esclude gli ordini completati/incassati.
8. **Prezzo unitario**: `parseInt` troncava i centesimi (1500,50 → 1500). Ora `parseFloat`.

### Modulo Google Workspace

9. **Import ordini idempotente**: l'ID ordine è ora derivato da file+riga, quindi reimportare
   lo stesso foglio aggiorna gli ordini invece di duplicarli.
10. **Niente più dati inventati**: se il foglio non ha intestazioni riconoscibili l'import si
    ferma con un avviso (prima importava colonne a caso con valore fittizio di €1.000 a riga);
    un valore mancante viene importato come 0 da correggere a mano.
11. **Linguette dei fogli**: cliccare una scheda ("Foglio2"…) ora carica davvero quella scheda
    (prima ricaricava sempre la prima).
12. Rimossa la parola chiave `'fe'` che faceva riconoscere come colonna SDI qualsiasi
    intestazione contenente "fe" (es. "riferimento").

### Pulizia

13. `package.json`: rimosse librerie mai usate (`@google/genai`, `express`, `dotenv`, `tsx`,
    `framer-motion`, `@types/express`); `xlsx` aggiornata alla 0.20.3 ufficiale SheetJS
    (la 0.18.5 di npm ha vulnerabilità note); progetto rinominato `erreciesse-pro`.
14. `index.html`: titolo "Erreciesse Pro" e `lang="it"`; rimosso il vecchio `index.html`
    obsoleto che era nel repository.
15. Rimosso il test di connessione che girava prima del login (produceva un errore inutile
    in console a ogni avvio).
16. Le notifiche ora si accodano invece di cancellare la precedente.

## Come applicare le correzioni al progetto locale

1. Scaricare questo branch (`claude/company-app-code-review-fr40hk`) o copiare i file
   sopra il progetto locale (`src/`, `index.html`, `package.json`, `firestore.rules`).
2. `npm install` (il `package.json` è cambiato).
3. **Pubblicare le nuove `firestore.rules` dalla console Firebase** (passaggio indispensabile:
   senza questo la falla di sicurezza resta aperta).
4. `npm run dev` per provare in locale.

> Nota: nel repository mancano ancora `firebase-applet-config.json`, `vite.config.ts`,
> `tsconfig.json`, `metadata.json` e `firebase-blueprint.json` (non sono stati caricati):
> per compilare da questo repository da zero vanno aggiunti dal progetto locale.

## Raccomandazioni future (non bloccanti)

- Collegare gli ordini al **codice** cliente anziché al nome (rinominare un cliente oggi
  scollega i suoi ordini passati).
- Rinnovo automatico del token Google Workspace (oggi scade dopo ~1 ora: bisogna
  ripremere "Sincronizza Token").
- Regole Firestore più strette: transizioni di stato, chiavi strette, ruoli
  (vedi `security_spec.md`).
- Backup periodici di Firestore (esportazione pianificata) prima dell'uso in produzione.
