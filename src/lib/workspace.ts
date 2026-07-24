/**
 * Google Workspace API Integration Service
 * Reads Google Drive files, Google Sheets, and Google Docs
 */

export interface WorkspaceFile {
  id: string;
  name: string;
  mimeType: string;
  modifiedTime: string;
  webViewLink?: string;
  iconLink?: string;
  size?: string;
}

export interface SheetRangeData {
  range: string;
  majorDimension: string;
  values: string[][];
  sheetNames?: string[];
  activeSheetName?: string;
}

export function getWorkspaceAccessToken(): string | null {
  return sessionStorage.getItem('google_workspace_access_token');
}

/**
 * Searches and lists recent Google Drive documents (Sheets, Excel, Docs, PDFs, CSVs, etc.)
 */
export async function listDriveFiles(accessToken: string): Promise<WorkspaceFile[]> {
  const query = encodeURIComponent(
    "trashed = false and (" +
    "mimeType = 'application/vnd.google-apps.spreadsheet' or " +
    "mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' or " +
    "mimeType = 'application/vnd.ms-excel' or " +
    "mimeType = 'text/csv' or " +
    "mimeType = 'application/vnd.google-apps.document' or " +
    "mimeType = 'application/pdf' or " +
    "mimeType = 'application/vnd.google-apps.shortcut'" +
    ")"
  );
  const url = `https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name,mimeType,modifiedTime,webViewLink,iconLink,size)&orderBy=modifiedTime%20desc&pageSize=100&includeItemsFromAllDrives=true&supportsAllDrives=true`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Token Google Workspace scaduto. Effettua nuovamente il login con Google.");
    }
    const errText = await response.text();
    throw new Error(`Errore Google Drive API: ${response.statusText} (${errText})`);
  }

  const data = await response.json();
  return data.files || [];
}

import * as XLSX from 'xlsx';

/**
 * Helper to parse CSV/TSV data into structured SheetRangeData
 */
function parseCSVToSheetData(csvText: string): SheetRangeData {
  const lines = csvText.split(/\r?\n/).filter(line => line.trim().length > 0);
  let maxCols = 0;
  const rawValues: string[][] = lines.map(line => {
    // Detect delimiter (; or , or \t)
    const delimiter = line.includes(';') ? ';' : line.includes('\t') ? '\t' : ',';
    const cells = line.split(delimiter).map(cell => cell.replace(/^"(.*)"$/, '$1').trim());
    if (cells.length > maxCols) maxCols = cells.length;
    return cells;
  });

  const values = rawValues.map(row => {
    const r = [...row];
    while (r.length < maxCols) r.push('');
    return r;
  });

  return {
    range: 'Dati Estratti (CSV/Excel)',
    majorDimension: 'ROWS',
    values,
  };
}

/**
 * Helper to parse binary ArrayBuffer (Excel .xlsx, .xls, CSV) into structured SheetRangeData
 */
function parseArrayBufferToSheetData(buffer: ArrayBuffer, fileName?: string, targetSheetName?: string): SheetRangeData {
  try {
    const workbook = XLSX.read(buffer, { type: 'array' });
    const sheetNames = workbook.SheetNames && workbook.SheetNames.length > 0 ? workbook.SheetNames : ['Foglio1'];
    const sheetName = targetSheetName && sheetNames.includes(targetSheetName) ? targetSheetName : sheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Convert worksheet to 2D array of string values
    const jsonRows = XLSX.utils.sheet_to_json<any[]>(worksheet, { header: 1, defval: '', raw: false });
    
    let maxCols = 0;
    jsonRows.forEach(row => {
      if (Array.isArray(row) && row.length > maxCols) {
        maxCols = row.length;
      }
    });

    const values: string[][] = jsonRows.map(row => {
      const r = Array.isArray(row) ? row.map(cell => (cell !== null && cell !== undefined ? String(cell).trim() : '')) : [];
      while (r.length < maxCols) r.push('');
      return r;
    });

    return {
      range: fileName ? `${fileName} (${sheetName})` : `Foglio Excel (${sheetName})`,
      majorDimension: 'ROWS',
      values,
      sheetNames,
      activeSheetName: sheetName,
    };
  } catch (e) {
    console.warn("SheetJS ArrayBuffer parsing failed, falling back to text CSV", e);
    const textDecoder = new TextDecoder('utf-8');
    const csvText = textDecoder.decode(buffer);
    return parseCSVToSheetData(csvText);
  }
}

/**
 * Fetches content/values from a Google Sheet, Excel, or CSV file
 */
export async function getSpreadsheetValues(
  accessToken: string,
  spreadsheetId: string,
  range = 'A1:Z100',
  mimeType?: string,
  sheetName?: string
): Promise<SheetRangeData> {
  const isGoogleAppsSheet = mimeType === 'application/vnd.google-apps.spreadsheet';
  // Se è indicata una scheda specifica, leggila; altrimenti Google usa la prima
  const effectiveRange = sheetName ? `'${sheetName}'!${range}` : range;

  // Strategy 1: For native Google Sheets, try Google Sheets API v4
  if (isGoogleAppsSheet) {
    try {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(effectiveRange)}`;
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.values) {
          return data;
        }
      }
    } catch (e) {
      console.warn("Sheets API v4 failed for native Google Sheet, trying Export", e);
    }

    // Strategy 2: Native Google Sheet Export to CSV or XLSX
    try {
      const exportUrl = `https://www.googleapis.com/drive/v3/files/${spreadsheetId}/export?mimeType=application/vnd.openxmlformats-officedocument.spreadsheetml.sheet&supportsAllDrives=true`;
      const exportRes = await fetch(exportUrl, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (exportRes.ok) {
        const buffer = await exportRes.arrayBuffer();
        return parseArrayBufferToSheetData(buffer, "Google Sheet", sheetName);
      }
    } catch (e) {
      console.warn("Drive Export XLSX failed, trying CSV export", e);
    }

    try {
      const csvExportUrl = `https://www.googleapis.com/drive/v3/files/${spreadsheetId}/export?mimeType=text/csv&supportsAllDrives=true`;
      const csvRes = await fetch(csvExportUrl, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (csvRes.ok) {
        const csvText = await csvRes.text();
        return parseCSVToSheetData(csvText);
      }
    } catch (e) {
      console.warn("CSV export failed", e);
    }
  }

  // Strategy 3: For binary uploaded Excel (.xlsx, .xls, .csv), download directly via alt=media
  try {
    const downloadUrl = `https://www.googleapis.com/drive/v3/files/${spreadsheetId}?alt=media&supportsAllDrives=true`;
    const res = await fetch(downloadUrl, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (res.ok) {
      const buffer = await res.arrayBuffer();
      return parseArrayBufferToSheetData(buffer, undefined, sheetName);
    }
  } catch (e) {
    console.warn("Direct media download failed", e);
  }

  // Strategy 4: Fallback to Google Sheets API v4 in case mimeType wasn't passed accurately
  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(effectiveRange)}`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (response.ok) {
      const data = await response.json();
      if (data && data.values) {
        return data;
      }
    }
  } catch (e) {
    console.warn("Final fallback Sheets API v4 failed", e);
  }

  throw new Error("Impossibile leggere il foglio o file Excel. Assicurati che il file non sia vuoto e di disporre dei permessi di accesso.");
}

/**
 * Fetches metadata of a Google Sheet (sheet names/tabs)
 */
export async function getSpreadsheetMetadata(accessToken: string, spreadsheetId: string) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?fields=sheets.properties`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Errore metadati Google Sheet: ${response.statusText}`);
  }

  return await response.json();
}

/**
 * Fetches plain text content from a Google Document
 */
export async function getGoogleDocContent(accessToken: string, documentId: string): Promise<{ title: string; bodyText: string }> {
  const url = `https://docs.googleapis.com/v1/documents/${documentId}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Errore lettura Google Doc: ${response.statusText}`);
  }

  const data = await response.json();
  let fullText = '';
  
  if (data.body?.content) {
    for (const element of data.body.content) {
      if (element.paragraph?.elements) {
        for (const elem of element.paragraph.elements) {
          if (elem.textRun?.content) {
            fullText += elem.textRun.content;
          }
        }
      }
    }
  }

  return {
    title: data.title || 'Documento senza titolo',
    bodyText: fullText.trim(),
  };
}
