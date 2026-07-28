/**
 * Snodo Formativo "VOLTERRA AI-MASTER HUB" – Liceo Scientifico "Vito Volterra", Ciampino (RM)
 *
 * Crea automaticamente i tre Google Moduli di pre-adesione ai percorsi IA
 * secondo il Blueprint Google Moduli Pre-adesione:
 *   1. Scuole del Primo Ciclo
 *   2. Scuole del Secondo Ciclo
 *   3. Dirigenti Scolastici e Segreteria (percorso A2 – Smart-Gov & Segreteria)
 *
 * COME USARLO
 *   1. Aprire https://script.google.com con l'account Google della scuola
 *   2. Nuovo progetto → incollare questo file → salvare
 *   3. Eseguire la funzione "creaTuttiIModuli" (autorizzare i permessi richiesti)
 *   4. I tre moduli compaiono nel Drive; i link di modifica e di compilazione
 *      vengono stampati nel "Log di esecuzione"
 *
 * Prima di eseguire, sostituire la scadenza segnaposto qui sotto.
 */

var SCADENZA = '[gg/mm/2026]'; // ← sostituire con la data di scadenza reale
var EMAIL_REFERENTE = 'snodo.ai@liceovolterra.edu.it';

var MESSAGGIO_CONFERMA =
  'Grazie, la tua pre-adesione è registrata. Riceverai conferma ' +
  "dell'attivazione del gruppo e le istruzioni per l'iscrizione ufficiale " +
  'su Scuola Futura. Per informazioni: ' + EMAIL_REFERENTE + '.';

var MESSAGGIO_CONFERMA_A2 =
  'Grazie, la tua pre-adesione al percorso Smart-Gov & Segreteria è ' +
  "registrata. Riceverai conferma e le istruzioni per l'iscrizione " +
  'ufficiale su Scuola Futura. Per informazioni: ' + EMAIL_REFERENTE + '.';

var PERCORSI_PRIMO_CICLO = [
  'A3 – Edu-GenAI 1 (18h, online) · 17-22-23-29 set, 1-8 ott · 16:30-19:30',
  'A5 – Ethic-AI 1 (18h, online) · 15-22-29 ott, 5-10-19 nov · 16:30-19:30',
  'Lab 04 – Cyber-Safety M4 (7h, presenza) · 14-21-28 set',
  'Lab 12 – Cyber-Safety M4 (7h, presenza) · 18-25 set, 2 ott',
  'Lab 01 – Inclusive-AI M1 (7h, presenza) · 23-30 set, 7 ott',
  'Lab 02 – Creative-Content M2 (7h, presenza) · 30 set, 7-14 ott'
];

var PERCORSI_SECONDO_CICLO = [
  'A4 – Edu-GenAI 2 (18h, online) · 2-7-9-11-15-24 set · 15:30-18:30',
  'A6 – Ethic-AI 2 (18h, online) · 28 set, 1-5-7-12-19 ott · 15:30-18:30',
  'Lab 11 – AI-Socratic M3 (7h, presenza) · 8-16-22 set',
  'Lab 15 – AI-Socratic M3 (7h, presenza) · 10-17-24 set',
  'Lab 03 – AI-Socratic M3 (7h, presenza) · 17-24 set, 1 ott',
  'Lab 19 – AI-Socratic M3 (7h, presenza) · 21-29 set, 2 ott',
  'Lab 23 – AI-Socratic M3 (7h, presenza) · 23-30 set, 8 ott',
  'Lab 06 – Creative-Content M2 (7h, presenza) · 15-22-29 set',
  'Lab 14 – Creative-Content M2 (7h, presenza) · 24 set, 1-5 ott',
  'Lab 16 – Cyber-Safety M4 (7h, presenza) · 16-23-30 set',
  'Lab 24 – Cyber-Safety M4 (7h, presenza) · 17-24 set, 1 ott'
];

/** Punto di ingresso: crea i tre moduli in un colpo solo. */
function creaTuttiIModuli() {
  creaModuloPrimoCiclo();
  creaModuloSecondoCiclo();
  creaModuloDsSegreteria();
}

function creaModuloPrimoCiclo() {
  var form = FormApp.create(
    'Pre-adesione ai percorsi IA – Snodo Volterra – Scuole del Primo Ciclo'
  );
  form.setDescription(
    'Modulo di pre-adesione ai percorsi formativi sull’Intelligenza ' +
    'Artificiale (Tipologia A e laboratori) rivolti alle scuole del primo ' +
    'ciclo. Compilare entro il ' + SCADENZA + '. Referente: ' +
    EMAIL_REFERENTE + '.'
  );
  applicaImpostazioni(form, MESSAGGIO_CONFERMA);

  aggiungiAnagrafica(form);
  aggiungiSceltaMultipla(form, 'Ordine della scuola di servizio',
    ['Infanzia', 'Primaria', 'Secondaria di I grado'], true);
  aggiungiSceltaMultipla(form, 'Ruolo / qualifica',
    ['Docente a tempo indeterminato', 'Docente a tempo determinato'], true);
  aggiungiPercorsi(form, PERCORSI_PRIMO_CICLO);
  aggiungiConsensoGdpr(form);

  logLink(form, 'MODULO 1 – Primo Ciclo');
  return form;
}

function creaModuloSecondoCiclo() {
  var form = FormApp.create(
    'Pre-adesione ai percorsi IA – Snodo Volterra – Scuole del Secondo Ciclo'
  );
  form.setDescription(
    'Modulo di pre-adesione ai percorsi formativi sull’Intelligenza ' +
    'Artificiale (Tipologia A e laboratori) rivolti alle scuole del secondo ' +
    'ciclo. Compilare entro il ' + SCADENZA + '. Referente: ' +
    EMAIL_REFERENTE + '.'
  );
  applicaImpostazioni(form, MESSAGGIO_CONFERMA);

  aggiungiAnagrafica(form);
  aggiungiSceltaMultipla(form, 'Tipologia dell’istituto di servizio',
    ['Liceo', 'Istituto Tecnico', 'Istituto Professionale'], true);
  aggiungiSceltaMultipla(form, 'Ruolo / qualifica',
    ['Docente a tempo indeterminato', 'Docente a tempo determinato'], true);
  aggiungiPercorsi(form, PERCORSI_SECONDO_CICLO);
  aggiungiConsensoGdpr(form);

  logLink(form, 'MODULO 2 – Secondo Ciclo');
  return form;
}

function creaModuloDsSegreteria() {
  var form = FormApp.create(
    'Pre-adesione – Smart-Gov & Segreteria – Snodo Volterra'
  );
  form.setDescription(
    'Modulo di pre-adesione al percorso Smart-Gov & Segreteria (A2, 9h, ' +
    'online), riservato a Dirigenti Scolastici, DSGA e personale ' +
    'amministrativo. Calendario: 14 e 22 settembre, 6 ottobre 2026, ore ' +
    '15:00-18:00. Compilare entro il ' + SCADENZA + '.'
  );
  applicaImpostazioni(form, MESSAGGIO_CONFERMA_A2);

  aggiungiAnagrafica(form, 'Necessario per Scuola Futura');
  aggiungiSceltaMultipla(form, 'Ruolo / qualifica',
    ['Dirigente Scolastico', 'DSGA', 'Assistente amministrativo',
     'Altro personale ATA'], true);
  aggiungiSceltaMultipla(form,
    'Conferma partecipazione al percorso A2 – Smart-Gov & Segreteria',
    ['Confermo la partecipazione', 'Interessato/a, devo verificare le date'],
    true);
  aggiungiConsensoGdpr(form);

  logLink(form, 'MODULO 3 – DS e Segreteria (A2)');
  return form;
}

/* ------------------------------------------------------------------ */
/* Blocchi riutilizzabili                                              */
/* ------------------------------------------------------------------ */

/** Domande 1-6, comuni a tutti i moduli. */
function aggiungiAnagrafica(form, notaMeccanografico) {
  form.addTextItem().setTitle('Cognome').setRequired(true);
  form.addTextItem().setTitle('Nome').setRequired(true);

  var cf = form.addTextItem()
    .setTitle('Codice fiscale')
    .setHelpText(
      '16 caratteri. Dal CF si ricavano data di nascita e genere ' +
      '(indicatori di monitoraggio PNRR).')
    .setRequired(true);
  cf.setValidation(
    FormApp.createTextValidation()
      .setHelpText('Inserire un codice fiscale valido di 16 caratteri.')
      .requireTextMatchesPattern('^[A-Za-z0-9]{16}$')
      .build());

  var email = form.addTextItem()
    .setTitle('Email istituzionale')
    .setRequired(true);
  email.setValidation(
    FormApp.createTextValidation()
      .setHelpText('Inserire un indirizzo email valido.')
      .requireTextIsEmail()
      .build());

  form.addTextItem()
    .setTitle('Denominazione della scuola di servizio')
    .setRequired(true);

  form.addTextItem()
    .setTitle('Codice meccanografico della scuola')
    .setHelpText(notaMeccanografico ||
      'Necessario per l’identificazione su Scuola Futura')
    .setRequired(true);
}

function aggiungiSceltaMultipla(form, titolo, opzioni, obbligatoria) {
  form.addMultipleChoiceItem()
    .setTitle(titolo)
    .setChoiceValues(opzioni)
    .setRequired(obbligatoria);
}

/** Domande 9-10: percorso prescelto ed eventuale seconda scelta. */
function aggiungiPercorsi(form, percorsi) {
  form.addListItem()
    .setTitle('Percorso prescelto')
    .setHelpText(
      'Scelta singola: le fasce orarie di molti percorsi si sovrappongono.')
    .setChoiceValues(percorsi)
    .setRequired(true);

  form.addListItem()
    .setTitle('Eventuale secondo percorso di interesse')
    .setHelpText(
      'Facoltativo: serve solo come riserva per la formazione dei gruppi.')
    .setChoiceValues(percorsi.concat(['Nessuno']))
    .setRequired(false);
}

/** Ultima domanda: consenso GDPR come casella di controllo obbligatoria. */
function aggiungiConsensoGdpr(form) {
  form.addCheckboxItem()
    .setTitle(
      'Consenso al trattamento dei dati personali (Reg. UE 2016/679 – GDPR)')
    .setChoiceValues(
      ['Ho preso visione dell’informativa e acconsento al trattamento ' +
       'dei dati.'])
    .setRequired(true);
}

/** Impostazioni comuni previste dal blueprint. */
function applicaImpostazioni(form, messaggioConferma) {
  form.setCollectEmail(true);        // Raccogli gli indirizzi email
  form.setShuffleQuestions(false);   // Ordine delle domande fisso
  form.setProgressBar(true);         // Mostra barra di avanzamento
  form.setConfirmationMessage(messaggioConferma);
  // Limita a 1 risposta: consigliato, ma richiede l'accesso con un account
  // Google. Per docenti esterni senza account istituzionale lasciare
  // disattivo e deduplicare in base al codice fiscale.
  // Per attivarlo, decommentare la riga seguente:
  // form.setLimitOneResponsePerUser(true);
}

function logLink(form, etichetta) {
  Logger.log('%s\n  Modifica:     %s\n  Compilazione: %s',
    etichetta, form.getEditUrl(), form.getPublishedUrl());
}
