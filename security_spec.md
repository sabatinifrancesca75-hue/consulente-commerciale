# Security Specification: Erreciesse Pro

## Stato implementazione (revisione del 24/07/2026)

Le regole in `firestore.rules` implementano oggi:

- ✅ **Lista di email autorizzate** (`isAuthorized()`): solo `admin@erreciesse.it` e
  `sabatini.francesca75@gmail.com` (email verificata obbligatoria) possono leggere/scrivere.
  Qualsiasi altro account Google viene rifiutato dal server, anche se riesce ad autenticarsi nell'app.
- ✅ **Validazione ordini**: campi obbligatori presenti e tipizzati, `quantita > 0`, `valore >= 0`,
  `status` limitato agli stati reali dell'app (`lavaggio`, `sabbiatura`, `verniciatura`,
  `omologazione`, `attesa_incasso`, `completato`).
- ✅ **Validazione magazzino**: `giacenza` deve essere un numero (può essere negativa: rappresenta il "manco").
- ✅ **Negazione globale di default**: le collezioni non elencate sono inaccessibili.

NON ancora implementati (miglioramenti futuri, non bloccanti):

- ⏳ Vincolo sulle transizioni di stato (es. impedire `lavaggio` → `completato` diretto).
- ⏳ Controllo relazionale che `modello` esista nella collezione `models`.
- ⏳ Chiavi strette (rifiuto di campi extra non previsti).
- ⏳ Verifica `createdAt == request.time`.
- ⏳ Ruoli differenziati (es. solo l'amministratore modifica i prezzi in `raw_materials`).

> Nota: la versione precedente di questo documento dichiarava `PERMISSION_DENIED` per 12 payload
> di attacco, ma nessuno di quei controlli era presente nelle regole. Questo documento ora riflette
> lo stato reale.

## 1. Data Invariants

- Solo gli utenti nella lista autorizzata possono leggere/scrivere i dati.
- Gli stati validi di un ordine sono: `lavaggio` → `sabbiatura` → `verniciatura` → `omologazione`
  → `attesa_incasso` → `completato` (lo stato `ritirato` non esiste nell'app).
- Le quantità degli ordini sono sempre positive; il valore non è mai negativo.
- Le giacenze di magazzino possono essere negative (rappresentano il fabbisogno scoperto)
  ma devono essere numeri; gli aggiornamenti avvengono con `increment()` per essere sicuri
  con più utenti simultanei.

## 2. Gestione della lista autorizzati

Per aggiungere o rimuovere un collaboratore:

1. Aprire la console Firebase → Firestore Database → Regole.
2. Modificare la lista email dentro `isAuthorized()` (tutte minuscole).
3. Aggiornare la costante `ADMIN_EMAILS` in `src/App.tsx` se la persona deve anche
   vedere il pulsante "Semina Dati".
4. Pubblicare le regole.
