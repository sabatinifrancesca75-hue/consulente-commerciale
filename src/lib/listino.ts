/**
 * Listino 2026 (Mod. C01 Rev.06) — prezzi IVA esclusa.
 *
 * Sistema prezzi Erreciesse:
 *  - tutti i clienti partono dal listino base "45%"
 *  - alcuni clienti hanno uno sconto AGGIUNTIVO (3%, 5%, 10%...) definito nel
 *    foglio "sconti clienti" di Drive: prezzo = base × (1 − sconto/100)
 *    (verificato sui listini pubblicati: la variante 45%+5% coincide con
 *    base × 0,95 su tutte le voci)
 *
 * I nomi modello sono quelli canonici dell'app (programmaParser.mappaModello).
 * Aggiornare questo file quando esce il nuovo listino o cambiano gli sconti.
 */

/** Vendita serbatoi (nuovi e rigenerati) — listino base 45% */
export const LISTINO_VENDITA: Record<string, number> = {
  // Nuovi fuori terra / interro
  'Lino 295 FT': 671.00,
  'Lino 295 INT': 770.00,
  'Lino 500 FT': 726.00,
  'Lino 500 INT': 825.00,
  '750 FT': 792.00,
  '750 INT': 902.00,
  'C1000 V FT': 1056.00,
  'C1000 V INT': 1210.00,
  // Rigenerati fuori terra / interro
  '1000 S INT': 687.50,
  '1000 H FT RIGENERATO': 539.00,
  '1000 H INT RIGENERATO': 770.00,
  '1000 V FT RIGENERATO': 561.00,
  '1000 V INT RIGENERATO': 792.00,
  '1650 V INT RIGENERATO': 935.00,
  '1750 H FT RIGENERATO': 715.00,
  '1750 H INT RIGENERATO': 990.00,
  '3000 H FT RIGENERATO': 990.00,
  '3000 H INT RIGENERATO': 1210.00,
  '5000 H FT RIGENERATO': 1650.00,
  '5000 H INT RIGENERATO': 1760.00,
};

/** Rigenerazione di serbatoi del cliente (conto lavorazione, codici R) — base 45% */
export const LISTINO_RIGENERAZIONE: Record<string, number> = {
  'Lino 500 FT': 396.00,
  'Lino 500 INT': 550.00,
  '1000 S FT': 407.00,
  '1000 S INT': 572.00,
  '1000 H FT RIGENERATO': 407.00,
  '1000 H INT RIGENERATO': 572.00,
  '1000 V FT RIGENERATO': 407.00,
  '1000 V INT RIGENERATO': 572.00,
  '1650 V INT RIGENERATO': 660.00,
  '1750 H FT RIGENERATO': 451.00,
  '1750 H INT RIGENERATO': 660.00,
  '3000 H FT RIGENERATO': 616.00,
  '3000 H INT RIGENERATO': 814.00,
  '5000 H FT RIGENERATO': 544.50,
  '5000 H INT RIGENERATO': 1210.00,
};

/**
 * Listino PRIVATI 2026 (Mod. C01-PV Rev.04) — prezzi IVA INCLUSA,
 * kit regolatori incluso, pagamento anticipato.
 * Usato per le righe "PRIVATI" (per i privati con nome e cognome
 * il prezzo va indicato/verificato a mano).
 */
export const LISTINO_PRIVATI: Record<string, number> = {
  'Lino 295 FT': 1100.00,
  'Lino 295 INT': 1200.00,
  'Lino 500 FT': 1200.00,
  'Lino 500 INT': 1300.00,
  '750 FT': 1300.00,
  '750 INT': 1400.00,
  '1000 H FT RIGENERATO': 1100.00,
  '1000 H INT RIGENERATO': 1300.00,
  '1000 V FT RIGENERATO': 1200.00,
  '1000 V INT RIGENERATO': 1300.00,
  '1650 V INT RIGENERATO': 1400.00,
  '1750 H FT RIGENERATO': 1200.00,
  '1750 H INT RIGENERATO': 1500.00,
  '3000 H FT RIGENERATO': 1600.00,
  '3000 H INT RIGENERATO': 2100.00,
  '5000 H FT RIGENERATO': 2700.00,
  '5000 H INT RIGENERATO': 2900.00,
};

/** True se il nome cliente indica la riga aggregata dei privati */
export function isClientePrivato(cliente: string | null | undefined): boolean {
  return /PRIVAT/i.test(cliente || '');
}

/**
 * Sconto AGGIUNTIVO per cliente (dal foglio "sconti clienti" di Drive).
 * Chi non è in elenco ha solo il 45% base (sconto aggiuntivo 0).
 * Le chiavi vengono confrontate ignorando spazi/punteggiatura, quindi
 * "CANTONE" copre anche "CANTONE ENERGIA SRL".
 */
export const SCONTI_AGGIUNTIVI_CLIENTI: Record<string, number> = {
  'CANTONE': 3,
  'EVERGAS': 3,
  'IZZO GAS': 5,
  'AVERSANA': 5,
  'TUTTOGAS': 5,
  'REAL GAS': 5,
  'DELIVERY GAS': 5,
  'AUTOGAS RIVIERA': 5,
  'NARIGAS': 10,
  'CAPITAL': 10,
  'BENECO': 10,
  'SERYGAS': 10,
  'ESSENERGIA': 30,
};

function normalizzaNome(s: string): string {
  return s.toUpperCase().replace(/[^A-Z0-9]/g, '');
}

/** Sconto aggiuntivo (in %) spettante a un cliente; 0 se non previsto */
export function scontoAggiuntivoPerCliente(cliente: string | null | undefined): number {
  if (!cliente) return 0;
  const nome = normalizzaNome(cliente);
  if (!nome) return 0;
  for (const [chiave, sconto] of Object.entries(SCONTI_AGGIUNTIVI_CLIENTI)) {
    if (nome.includes(normalizzaNome(chiave))) return sconto;
  }
  return 0;
}

/**
 * Prezzo di listino per un modello, null se non a listino.
 * Con contoLavorazione=true usa il listino rigenerazione (codici R).
 * scontoAggiuntivo è la percentuale extra del cliente (es. 5 per 45%+5%).
 * Con privato=true usa il listino privati (IVA inclusa, senza sconti).
 */
export function prezzoListino(
  modello: string,
  contoLavorazione = false,
  scontoAggiuntivo = 0,
  privato = false
): number | null {
  if (privato && !contoLavorazione) {
    return LISTINO_PRIVATI[modello] ?? null;
  }
  const listino = contoLavorazione ? LISTINO_RIGENERAZIONE : LISTINO_VENDITA;
  const base = listino[modello];
  if (base === undefined) return null;
  const prezzo = base * (1 - scontoAggiuntivo / 100);
  return Math.round(prezzo * 100) / 100;
}
