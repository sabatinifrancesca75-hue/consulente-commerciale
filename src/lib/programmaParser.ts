/**
 * Parser dedicato ai fogli "PROGRAMMA" di Erreciesse (Mod. R46–R50):
 * PROGRAMMA LAVORAZIONE, PROGRAMMA CONSEGNE SETTIMANALE, PROGRAMMA INIZIALE,
 * PROGRAMMA ORDINI, PROGRAMMA CONTO LAVORAZIONE e le schede settimanali.
 *
 * Struttura riconosciuta:
 *  - riga intestazione con "DATA PARTENZA" / "DATA ORDINE" e i modelli in colonna
 *    (295, 500 V, 575 V, 750, C1000 V, 500 4 FORI, 1000 S/H/V, 1650, 1750, 3000, 5000)
 *  - riga successiva con i sottotipi FT / IN (celle unite nel foglio originale:
 *    il nome modello compare solo nella prima delle due colonne e va propagato)
 *  - righe dati: cliente in colonna A, riferimento ordine in colonna B
 *    (es. "ORD. 288 DEL 06/07/2026"), quantità nelle colonne modello, NOTE in fondo
 *  - righe di totale/fase da scartare (TOTALE..., MAGAZZINO, CLIENTI, ecc.)
 */

export interface ParsedProgramOrder {
  cliente: string;
  modello: string;
  quantita: number;
  riferimento: string;
  numeroOrdine: string | null;
  dataOrdine: string | null;
  note: string;
  pagato: boolean;
  pronto: boolean; // proviene da una sezione CONSEGNE: pronto per il ritiro
  contoLavorazione: boolean;
  sezione: string;
}

// Mappa etichetta colonna + FT/IN -> nome modello usato nell'app (DI.BA)
const MODEL_MAP: Record<string, { FT?: string; IN?: string }> = {
  '295': { FT: 'Lino 295 FT', IN: 'Lino 295 INT' },
  '500': { FT: 'Lino 500 FT', IN: 'Lino 500 INT' },
  '500 V': { FT: 'Lino 500 FT', IN: 'Lino 500 INT' },
  '1000 H': { FT: '1000 H FT RIGENERATO', IN: '1000 H INT RIGENERATO' },
  '1000 V': { FT: '1000 V FT RIGENERATO', IN: '1000 V INT RIGENERATO' },
  '1650': { FT: '1650 V FT RIGENERATO', IN: '1650 V INT RIGENERATO' },
  '1750': { FT: '1750 H FT RIGENERATO', IN: '1750 H INT RIGENERATO' },
  '1750 H': { FT: '1750 H FT RIGENERATO', IN: '1750 H INT RIGENERATO' },
  '3000': { FT: '3000 H FT RIGENERATO', IN: '3000 H INT RIGENERATO' },
  '3000 H': { FT: '3000 H FT RIGENERATO', IN: '3000 H INT RIGENERATO' },
  '5000': { FT: '5000 H FT RIGENERATO', IN: '5000 H INT RIGENERATO' },
  '5000 H': { FT: '5000 H FT RIGENERATO', IN: '5000 H INT RIGENERATO' },
};

// Etichette di colonna che NON sono modelli (totali, note, kit)
const COLONNE_NON_MODELLO = /^(TOT\.?|TOTALE|NOTE|KIT)/i;

// Quantità massima plausibile per una singola cella ordine: protegge da
// celle numeriche che non sono quantità (matricole, importi, anni...)
const MAX_QTY = 200;

function normalizza(v: unknown): string {
  return String(v ?? '').replace(/\s+/g, ' ').trim();
}

function mappaModello(label: string, sub: 'FT' | 'IN'): string {
  const m = MODEL_MAP[label.toUpperCase()];
  if (m && m[sub]) return m[sub] as string;
  return `${label.toUpperCase()} ${sub === 'IN' ? 'INT' : 'FT'}`;
}

interface ColonnaMappata {
  col: number;
  modello: string;
}

interface Blocco {
  colonne: ColonnaMappata[];
  noteCol: number;
}

/** Riconosce la riga intestazione: "DATA PARTENZA"/"DATA ORDINE" seguita da una riga FT/IN */
function costruisciBlocco(rigaModelli: string[], rigaSottotipi: string[]): Blocco | null {
  const ftin = rigaSottotipi.filter(c => /^(FT|IN)$/i.test(c)).length;
  if (ftin < 4) return null;

  const colonne: ColonnaMappata[] = [];
  let noteCol = -1;
  let etichettaCorrente = '';

  for (let c = 0; c < Math.max(rigaModelli.length, rigaSottotipi.length); c++) {
    const etichetta = normalizza(rigaModelli[c]);
    if (etichetta) {
      if (/^NOTE$/i.test(etichetta)) noteCol = c;
      // Le etichette di totale/note/kit interrompono la propagazione del modello
      etichettaCorrente = COLONNE_NON_MODELLO.test(etichetta) || /^DATA /i.test(etichetta)
        ? ''
        : etichetta;
    }
    const sub = normalizza(rigaSottotipi[c]).toUpperCase();
    if (etichettaCorrente && (sub === 'FT' || sub === 'IN')) {
      colonne.push({ col: c, modello: mappaModello(etichettaCorrente, sub as 'FT' | 'IN') });
    }
  }

  return colonne.length >= 4 ? { colonne, noteCol } : null;
}

/** True se il foglio ha il formato dei programmi Erreciesse (Mod. R46–R50) */
export function detectProgrammaErreciesse(values: string[][]): boolean {
  for (let r = 0; r < values.length - 1; r++) {
    const riga = (values[r] || []).map(normalizza);
    if (riga.some(c => /^DATA (PARTENZA|ORDINE)/i.test(c))) {
      const blocco = costruisciBlocco(riga, (values[r + 1] || []).map(normalizza));
      if (blocco) return true;
    }
  }
  return false;
}

/**
 * Estrae le righe ordine (cliente × modello × quantità) da un foglio programma.
 * Le sezioni "PROGRAMMA LAVORAZIONE" (fasi di produzione, Mod. R46) vengono
 * saltate: contengono conteggi di fase, non ordini cliente.
 */
export function parseProgrammaErreciesse(values: string[][]): ParsedProgramOrder[] {
  const ordini: ParsedProgramOrder[] = [];
  let blocco: Blocco | null = null;
  let sezione = '';

  for (let r = 0; r < values.length; r++) {
    const celle = (values[r] || []).map(normalizza);
    if (celle.every(c => !c)) continue;

    // Titolo di sezione (può comparire in qualsiasi colonna)
    const titolo = celle.find(c =>
      /^PROGRAMMA (LAVORAZIONE|CONSEGNE|INIZIALE|ORDINI|CONTO LAVORAZIONE)/i.test(c)
    );
    if (titolo) sezione = titolo.toUpperCase();

    // Nuova intestazione? Ricostruisce la mappa colonne del blocco corrente
    if (celle.some(c => /^DATA (PARTENZA|ORDINE)/i.test(c)) && r + 1 < values.length) {
      const nuovo = costruisciBlocco(celle, (values[r + 1] || []).map(normalizza));
      if (nuovo) {
        blocco = nuovo;
        r += 1; // salta la riga FT/IN
        continue;
      }
    }

    if (!blocco) continue;

    // Le sezioni di sole fasi produzione non generano ordini
    if (/PROGRAMMA LAVORAZIONE/.test(sezione)) continue;

    const cliente = celle[0];
    if (!cliente) continue;
    if (!/[A-Za-z]/.test(cliente)) continue; // scarta righe numeriche (matricole ecc.)
    if (/^(TOTALE|TOTALI|CLIENTI|FASI DI LAVORAZIONE|MAGAZZINO|DATA)/i.test(cliente)) continue;

    const riferimento = celle[1] || '';
    const note = blocco.noteCol >= 0 ? (celle[blocco.noteCol] || '') : '';

    const matchOrd = riferimento.match(/ORD\.?\s*(\d+)?\s*(?:A VOCE\s*)?DEL\s*(\d{1,2}\/\d{1,2}\/\d{2,4})/i);
    const numeroOrdine = matchOrd?.[1] || null;
    const dataOrdine = matchOrd?.[2] || null;

    const testoRiga = `${riferimento} ${note}`.toUpperCase();
    const pagato = testoRiga.includes('PAGATO');
    const contoLavorazione = /C[\/.]?\s*LAVORAZIONE|C\/DEPOSITO/i.test(testoRiga)
      || /CONTO LAVORAZIONE/.test(sezione);
    const pronto = /CONSEGNE/.test(sezione);

    for (const { col, modello } of blocco.colonne) {
      const grezzo = celle[col];
      if (!grezzo) continue;
      const qty = parseInt(grezzo, 10);
      if (isNaN(qty) || qty <= 0 || qty > MAX_QTY) continue;
      if (String(qty) !== grezzo.replace(/^\+/, '')) continue; // solo interi "puliti"

      ordini.push({
        cliente,
        modello,
        quantita: qty,
        riferimento,
        numeroOrdine,
        dataOrdine,
        note,
        pagato,
        pronto,
        contoLavorazione,
        sezione: sezione || 'PROGRAMMA',
      });
    }
  }

  return ordini;
}
