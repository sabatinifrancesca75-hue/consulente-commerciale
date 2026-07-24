import React, { useState, useEffect } from 'react';
import { 
  FileSpreadsheet, FileText, RefreshCw, ExternalLink, Search, 
  Database, Download, CheckCircle, AlertCircle, Key, Layers, 
  Calendar, ArrowRight, ShieldCheck, FileCode, Check, Info,
  Users, UserCheck, Building, Phone, Mail, MapPin
} from 'lucide-react';
import { 
  getWorkspaceAccessToken, 
  listDriveFiles, 
  getSpreadsheetValues, 
  getGoogleDocContent,
  type WorkspaceFile, 
  type SheetRangeData 
} from '../lib/workspace';
import { signInWithGoogle } from '../firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

interface WorkspaceModuleProps {
  onImportNotification?: (msg: string) => void;
}

const isSpreadsheetFile = (file: WorkspaceFile) => {
  if (!file) return false;
  const m = (file.mimeType || '').toLowerCase();
  const n = (file.name || '').toLowerCase();
  return (
    m.includes('spreadsheet') ||
    m.includes('excel') ||
    m.includes('sheet') ||
    m.includes('csv') ||
    n.endsWith('.xlsx') ||
    n.endsWith('.xls') ||
    n.endsWith('.csv')
  );
};

const isDocFile = (file: WorkspaceFile) => {
  if (!file) return false;
  const m = (file.mimeType || '').toLowerCase();
  const n = (file.name || '').toLowerCase();
  return (
    m.includes('document') ||
    m.includes('word') ||
    n.endsWith('.docx') ||
    n.endsWith('.doc')
  );
};

export const WorkspaceModule: React.FC<WorkspaceModuleProps> = ({ onImportNotification }) => {
  const [token, setToken] = useState<string | null>(getWorkspaceAccessToken());
  const [files, setFiles] = useState<WorkspaceFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFileType, setSelectedFileType] = useState<'all' | 'sheets' | 'docs'>('all');
  
  // Selected File Viewer State
  const [selectedFile, setSelectedFile] = useState<WorkspaceFile | null>(null);
  const [sheetData, setSheetData] = useState<SheetRangeData | null>(null);
  const [selectedSheetTab, setSelectedSheetTab] = useState<string | null>(null);
  const [docData, setDocData] = useState<{ title: string; bodyText: string } | null>(null);
  const [contentLoading, setContentLoading] = useState(false);
  const [importing, setImporting] = useState(false);
  const [importSuccessMsg, setImportSuccessMsg] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [autoRefreshEnabled, setAutoRefreshEnabled] = useState(false);

  const loadDriveFiles = async (currentToken: string) => {
    setLoading(true);
    setError(null);
    try {
      const driveFiles = await listDriveFiles(currentToken);
      setFiles(driveFiles);
      setLastUpdated(new Date());
    } catch (err: any) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const t = getWorkspaceAccessToken();
    setToken(t);
    if (t) {
      loadDriveFiles(t);
    }
  }, []);

  // Auto-refresh interval if enabled
  useEffect(() => {
    if (!autoRefreshEnabled || !token || !selectedFile) return;

    const interval = setInterval(() => {
      refreshSelectedFile();
    }, 15000); // 15 seconds

    return () => clearInterval(interval);
  }, [autoRefreshEnabled, token, selectedFile]);

  const handleReconnectGoogle = async () => {
    try {
      await signInWithGoogle();
      const newToken = getWorkspaceAccessToken();
      setToken(newToken);
      if (newToken) {
        await loadDriveFiles(newToken);
      }
    } catch (err: any) {
      setError("Autenticazione Google Workspace fallita. Riprova.");
    }
  };

  const refreshSelectedFile = async () => {
    if (!selectedFile || !token) return;
    setContentLoading(true);
    try {
      if (isSpreadsheetFile(selectedFile)) {
        const data = await getSpreadsheetValues(token, selectedFile.id, 'A1:Z100', selectedFile.mimeType);
        setSheetData(data);
        if (data.sheetNames && data.sheetNames.length > 0) {
          setSelectedSheetTab(data.activeSheetName || data.sheetNames[0]);
        }
      } else {
        const docRes = await getGoogleDocContent(token, selectedFile.id);
        setDocData(docRes);
      }
      setLastUpdated(new Date());
    } catch (err: any) {
      setError(`Errore lettura ${selectedFile.name}: ${err.message}`);
    } finally {
      setContentLoading(false);
    }
  };

  const handleSelectFile = async (file: WorkspaceFile) => {
    setSelectedFile(file);
    setSheetData(null);
    setSelectedSheetTab(null);
    setDocData(null);
    setImportSuccessMsg(null);
    
    if (!token) return;

    setContentLoading(true);
    try {
      if (isSpreadsheetFile(file)) {
        const data = await getSpreadsheetValues(token, file.id, 'A1:Z100', file.mimeType);
        setSheetData(data);
        if (data.sheetNames && data.sheetNames.length > 0) {
          setSelectedSheetTab(data.activeSheetName || data.sheetNames[0]);
        }
      } else {
        const docRes = await getGoogleDocContent(token, file.id);
        setDocData(docRes);
      }
      setLastUpdated(new Date());
    } catch (err: any) {
      setError(`Impossibile leggere il contenuto di ${file.name}: ${err.message}`);
    } finally {
      setContentLoading(false);
    }
  };

  // Smart Auto Import Sheet / Doc Rows into Anagrafica Clienti (Customers)
  const handleImportSheetAsCustomers = async () => {
    if ((!sheetData || !sheetData.values || sheetData.values.length < 1) && !docData?.bodyText) {
      alert("Nessun dato o testo trovato per estrarre l'anagrafica clienti.");
      return;
    }

    setImporting(true);
    try {
      let importedCustomers: Array<{
        nome: string;
        piva: string;
        email: string;
        telefono: string;
        citta: string;
        indirizzoFatturazione: string;
        indirizzoSpedizione: string;
        codiceSDI: string;
      }> = [];

      if (selectedFile && isSpreadsheetFile(selectedFile) && sheetData?.values) {
        const allRows = sheetData.values;

        // Mode A: Tabular search for column headers
        let headerRowIdx = -1;
        let nomeCol = -1;
        let pivaCol = -1;
        let emailCol = -1;
        let telCol = -1;
        let cittaCol = -1;
        let indFattCol = -1;
        let indSpedCol = -1;
        let sdiCol = -1;

        // Scan up to first 10 rows for header keywords
        for (let i = 0; i < Math.min(10, allRows.length); i++) {
          const rowStr = allRows[i].map(c => String(c).toLowerCase());
          
          rowStr.forEach((cell, cIdx) => {
            if (nomeCol === -1 && (cell.includes('client') || cell.includes('ragione') || cell.includes('nome') || cell.includes('spett') || cell.includes('azienda') || cell.includes('ditta') || cell.includes('denominazione'))) {
              nomeCol = cIdx;
              headerRowIdx = i;
            }
            if (pivaCol === -1 && (cell.includes('p.iva') || cell.includes('piva') || cell.includes('partita') || cell.includes('c.f') || cell.includes('codice fiscale') || cell.includes('cf'))) {
              pivaCol = cIdx;
              headerRowIdx = i;
            }
            if (emailCol === -1 && (cell.includes('email') || cell.includes('e-mail') || cell.includes('pec') || cell.includes('mail'))) {
              emailCol = cIdx;
              headerRowIdx = i;
            }
            if (telCol === -1 && (cell.includes('tel') || cell.includes('telefon') || cell.includes('cell') || cell.includes('contatt'))) {
              telCol = cIdx;
              headerRowIdx = i;
            }
            if (cittaCol === -1 && (cell.includes('citt') || cell.includes('comun') || cell.includes('prov') || cell.includes('cap'))) {
              cittaCol = cIdx;
              headerRowIdx = i;
            }
            if (indFattCol === -1 && (cell.includes('indirizz') || cell.includes('fattur') || cell.includes('sede leg') || cell.includes('via') || cell.includes('piazza'))) {
              indFattCol = cIdx;
              headerRowIdx = i;
            }
            if (indSpedCol === -1 && (cell.includes('spediz') || cell.includes('destinaz') || cell.includes('consegna') || cell.includes('sede oper'))) {
              indSpedCol = cIdx;
              headerRowIdx = i;
            }
            if (sdiCol === -1 && (cell.includes('sdi') || cell.includes('cod. dest') || cell.includes('codice dest'))) {
              sdiCol = cIdx;
              headerRowIdx = i;
            }
          });

          if (nomeCol !== -1) break;
        }

        if (nomeCol !== -1) {
          // Process table rows
          const dataRows = allRows.slice(headerRowIdx + 1);
          for (const row of dataRows) {
            const nomeVal = row[nomeCol] ? String(row[nomeCol]).trim() : '';
            if (!nomeVal || nomeVal.toLowerCase().includes('ragione sociale') || nomeVal.toLowerCase().includes('nome cliente')) continue;

            const pivaVal = pivaCol >= 0 && row[pivaCol] ? String(row[pivaCol]).trim() : '';
            const emailVal = emailCol >= 0 && row[emailCol] ? String(row[emailCol]).trim() : '';
            const telVal = telCol >= 0 && row[telCol] ? String(row[telCol]).trim() : '';
            const cittaVal = cittaCol >= 0 && row[cittaCol] ? String(row[cittaCol]).trim() : '';
            const indFattVal = indFattCol >= 0 && row[indFattCol] ? String(row[indFattCol]).trim() : '';
            const indSpedVal = indSpedCol >= 0 && row[indSpedCol] ? String(row[indSpedCol]).trim() : '';
            const sdiVal = sdiCol >= 0 && row[sdiCol] ? String(row[sdiCol]).trim() : '0000000';

            importedCustomers.push({
              nome: nomeVal,
              piva: pivaVal,
              email: emailVal,
              telefono: telVal,
              citta: cittaVal,
              indirizzoFatturazione: indFattVal,
              indirizzoSpedizione: indSpedVal || indFattVal,
              codiceSDI: sdiVal
            });
          }
        } else {
          // Mode B: Key-Value sheet (Scheda Cliente)
          let cust: any = { nome: '', piva: '', email: '', telefono: '', citta: '', indirizzoFatturazione: '', indirizzoSpedizione: '', codiceSDI: '' };
          allRows.forEach(row => {
            const key = String(row[0] || '').toLowerCase().trim();
            const val = String(row[1] || row[2] || '').trim();
            if (!val) return;

            if (key.includes('client') || key.includes('ragione') || key.includes('nome') || key.includes('spett') || key.includes('ditta')) cust.nome = val;
            else if (key.includes('p.iva') || key.includes('piva') || key.includes('partita') || key.includes('c.f')) cust.piva = val;
            else if (key.includes('email') || key.includes('e-mail') || key.includes('pec')) cust.email = val;
            else if (key.includes('tel') || key.includes('cell')) cust.telefono = val;
            else if (key.includes('citt') || key.includes('comun')) cust.citta = val;
            else if (key.includes('indirizz') || key.includes('via')) cust.indirizzoFatturazione = val;
            else if (key.includes('spediz') || key.includes('destinaz')) cust.indirizzoSpedizione = val;
            else if (key.includes('sdi') || key.includes('destinatario')) cust.codiceSDI = val;
          });

          if (cust.nome) {
            importedCustomers.push(cust);
          }
        }
      } else if (docData?.bodyText) {
        // Extract from Google Doc text lines
        const lines = docData.bodyText.split('\n');
        let cust: any = { nome: '', piva: '', email: '', telefono: '', citta: '', indirizzoFatturazione: '', indirizzoSpedizione: '', codiceSDI: '' };
        
        lines.forEach(line => {
          const parts = line.split(/[:=-]/);
          if (parts.length >= 2) {
            const k = parts[0].toLowerCase().trim();
            const v = parts.slice(1).join(':').trim();
            if (k.includes('client') || k.includes('ragione') || k.includes('nome') || k.includes('spett')) cust.nome = v;
            else if (k.includes('p.iva') || k.includes('piva') || k.includes('partita') || k.includes('cf')) cust.piva = v;
            else if (k.includes('email') || k.includes('pec')) cust.email = v;
            else if (k.includes('tel') || k.includes('cell')) cust.telefono = v;
            else if (k.includes('citt') || k.includes('comun')) cust.citta = v;
            else if (k.includes('indirizz') || k.includes('via')) cust.indirizzoFatturazione = v;
            else if (k.includes('spediz') || k.includes('destinaz')) cust.indirizzoSpedizione = v;
            else if (k.includes('sdi')) cust.codiceSDI = v;
          }
        });

        if (cust.nome) {
          importedCustomers.push(cust);
        } else if (docData.title) {
          // Use doc title as customer name
          importedCustomers.push({
            nome: docData.title,
            piva: '',
            email: '',
            telefono: '',
            citta: '',
            indirizzoFatturazione: '',
            indirizzoSpedizione: '',
            codiceSDI: '0000000'
          });
        }
      }

      if (importedCustomers.length === 0) {
        alert("Nessun cliente o anagrafica identificata nel file selezionato.");
        return;
      }

      let count = 0;
      for (const cust of importedCustomers) {
        if (!cust.nome) continue;
        
        const cleanName = cust.nome.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10);
        const custId = cust.piva ? `CUST-${cust.piva.replace(/[^A-Z0-9]/g, '')}` : `CUST-${cleanName || Date.now().toString().slice(-4)}`;

        await setDoc(doc(db, 'customers', custId), {
          id: custId,
          nome: cust.nome,
          piva: cust.piva || '',
          email: cust.email || '',
          telefono: cust.telefono || '',
          citta: cust.citta || '',
          indirizzoFatturazione: cust.indirizzoFatturazione || '',
          indirizzoSpedizione: cust.indirizzoSpedizione || cust.indirizzoFatturazione || '',
          codiceSDI: cust.codiceSDI || '0000000',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        }, { merge: true });

        count++;
      }

      const msg = `Importati con successo ${count} clienti in Anagrafica da "${selectedFile?.name}"!`;
      setImportSuccessMsg(msg);
      if (onImportNotification) onImportNotification(msg);
    } catch (err: any) {
      alert(`Errore durante l'importazione anagrafica: ${err.message}`);
    } finally {
      setImporting(false);
    }
  };

  // Smart Auto Import Sheet Rows into Firestore as Production Orders + Sync Customers
  const handleImportSheetAsOrders = async () => {
    if (!sheetData || !sheetData.values || sheetData.values.length < 1) {
      alert("Il foglio Google o file Excel non contiene dati sufficienti per l'importazione.");
      return;
    }

    setImporting(true);
    try {
      const allRows = sheetData.values;
      let headerRowIdx = 0;
      let clienteCol = -1;
      let modelloCol = -1;
      let quantitaCol = -1;
      let valoreCol = -1;
      let pagamentoCol = -1;
      let noteCol = -1;

      // Scan up to first 10 rows for header keywords
      for (let i = 0; i < Math.min(10, allRows.length); i++) {
        const rowStr = allRows[i].map(c => String(c).toLowerCase());
        
        rowStr.forEach((cell, cIdx) => {
          if (clienteCol === -1 && (cell.includes('client') || cell.includes('ragione') || cell.includes('destinatario') || cell.includes('nome') || cell.includes('spett'))) {
            clienteCol = cIdx;
            headerRowIdx = i;
          }
          if (modelloCol === -1 && (cell.includes('modell') || cell.includes('articol') || cell.includes('descriz') || cell.includes('prodott') || cell.includes('material') || cell.includes('lino') || cell.includes('tessut'))) {
            modelloCol = cIdx;
            headerRowIdx = i;
          }
          if (quantitaCol === -1 && (cell.includes('quant') || cell.includes('qt') || cell.includes('pezzi') || cell.includes('colli') || cell.includes('metri') || cell.includes('n.'))) {
            quantitaCol = cIdx;
            headerRowIdx = i;
          }
          if (valoreCol === -1 && (cell.includes('valor') || cell.includes('prezz') || cell.includes('import') || cell.includes('totale') || cell.includes('eur') || cell.includes('€'))) {
            valoreCol = cIdx;
            headerRowIdx = i;
          }
          if (pagamentoCol === -1 && (cell.includes('pagam') || cell.includes('condiz') || cell.includes('incass') || cell.includes('metodo'))) {
            pagamentoCol = cIdx;
            headerRowIdx = i;
          }
          if (noteCol === -1 && (cell.includes('not') || cell.includes('lott') || cell.includes('rif') || cell.includes('dettagl') || cell.includes('trasport'))) {
            noteCol = cIdx;
            headerRowIdx = i;
          }
        });

        if (clienteCol !== -1 || modelloCol !== -1) {
          break; // Found matching header row
        }
      }

      // Senza intestazioni riconoscibili non importiamo nulla: evita ordini con dati inventati
      if (clienteCol === -1 && modelloCol === -1) {
        alert("Impossibile riconoscere le colonne del foglio (Cliente, Modello, Quantità, Valore...). Aggiungi una riga di intestazione con questi nomi e riprova: nessun ordine è stato importato.");
        return;
      }

      // Fallbacks if no specific keywords were found
      const firstRowLen = allRows[0]?.length || 1;
      if (clienteCol === -1) clienteCol = 0;
      if (modelloCol === -1) modelloCol = 1 < firstRowLen ? 1 : 0;
      if (quantitaCol === -1) quantitaCol = 2 < firstRowLen ? 2 : -1;
      if (valoreCol === -1) valoreCol = 3 < firstRowLen ? 3 : -1;
      if (pagamentoCol === -1) pagamentoCol = 4 < firstRowLen ? 4 : -1;
      if (noteCol === -1) noteCol = 5 < firstRowLen ? 5 : -1;

      const dataRows = allRows.slice(headerRowIdx + 1);
      let count = 0;

      for (const [rowIdx, row] of dataRows.entries()) {
        // Skip empty rows
        const hasData = row.some(cell => String(cell).trim().length > 0);
        if (!hasData) continue;

        const clienteVal = clienteCol >= 0 && row[clienteCol] ? String(row[clienteCol]).trim() : '';
        const modelloVal = modelloCol >= 0 && row[modelloCol] ? String(row[modelloCol]).trim() : '';

        if (!clienteVal && !modelloVal) continue;
        if (clienteVal.toLowerCase().includes('cliente') || clienteVal.toLowerCase().includes('ragione sociale')) continue;

        const clienteId = clienteVal || 'CLIENTE WORKSPACE';
        const modello = modelloVal || 'Lino Erreciesse';

        const quantitaRaw = quantitaCol >= 0 ? parseInt(String(row[quantitaCol]).replace(/[^0-9]/g, ''), 10) : 1;
        const quantita = isNaN(quantitaRaw) || quantitaRaw <= 0 ? 1 : quantitaRaw;

        // Se il valore manca o non è leggibile importiamo 0 (da correggere a mano), mai una cifra inventata
        const valoreRaw = valoreCol >= 0 ? parseFloat(String(row[valoreCol]).replace(',', '.').replace(/[^0-9.]/g, '')) : 0;
        const valore = isNaN(valoreRaw) || valoreRaw < 0 ? 0 : valoreRaw;

        const metodoPagamento = pagamentoCol >= 0 && row[pagamentoCol] ? String(row[pagamentoCol]).trim() : 'Rimessa Diretta';

        let noteParts: string[] = [];
        if (noteCol >= 0 && row[noteCol]) {
          noteParts.push(String(row[noteCol]).trim());
        }
        noteParts.push(`Importato da ${selectedFile?.name || 'File Workspace'}`);
        const note = noteParts.join(' | ');

        // ID legato al file e alla riga: reimportare lo stesso foglio aggiorna gli ordini invece di duplicarli
        const orderId = `ORD-GS-${(selectedFile?.id || 'FILE').slice(0, 8)}-R${rowIdx + 1}`;

        // 1. Create Production Order
        await setDoc(doc(db, 'orders', orderId), {
          id: orderId,
          clienteId,
          modello,
          quantita,
          valore,
          metodoPagamento,
          status: 'lavaggio',
          incassato: false,
          note,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });

        // 2. Also automatically sync/register customer into Anagrafica Clienti
        const cleanCustName = clienteId.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10);
        const custId = `CUST-${cleanCustName || Date.now().toString().slice(-4)}`;
        await setDoc(doc(db, 'customers', custId), {
          id: custId,
          nome: clienteId,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        }, { merge: true });

        count++;
      }

      const msg = `Importati con successo ${count} ordini + aggiornata Anagrafica Clienti da "${selectedFile?.name}"!`;
      setImportSuccessMsg(msg);
      if (onImportNotification) onImportNotification(msg);
    } catch (err: any) {
      alert(`Errore durante l'importazione: ${err.message}`);
    } finally {
      setImporting(false);
    }
  };

  // Import both Customers & Orders simultaneously
  const handleImportAll = async () => {
    await handleImportSheetAsCustomers();
    await handleImportSheetAsOrders();
  };

  const filteredFiles = files.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (selectedFileType === 'sheets') return matchesSearch && isSpreadsheetFile(f);
    if (selectedFileType === 'docs') return matchesSearch && isDocFile(f);
    return matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border border-slate-800">
        <div className="space-y-2">
          <div className="flex items-center gap-2 bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full w-fit text-[10px] font-black uppercase tracking-widest border border-blue-500/30">
            <ShieldCheck size={14} /> Integrato con Google Workspace Aziendale
          </div>
          <h2 className="text-3xl lg:text-4xl font-black tracking-tight uppercase italic">
            Documenti & Fogli Google / Excel
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl font-medium leading-relaxed">
            Scansione automatica e lettura di file da <strong>Drive Personale, Drive Condivisi (Shared Drives)</strong>, Fogli Google, Excel e CSV.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={handleReconnectGoogle}
            className="bg-white hover:bg-slate-100 text-slate-900 px-5 py-3 rounded-2xl font-black text-xs uppercase tracking-wider shadow-lg active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Key size={16} className="text-blue-600" /> {token ? 'Sincronizza Token' : 'Connetti Google Workspace'}
          </button>

          {token && (
            <button 
              onClick={() => loadDriveFiles(token)}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-2xl font-black shadow-lg active:scale-95 transition-all cursor-pointer disabled:opacity-50"
              title="Aggiorna ora da Google Drive"
            >
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            </button>
          )}
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-2xl flex items-center justify-between gap-4 text-xs font-bold">
          <div className="flex items-center gap-2">
            <AlertCircle size={18} className="text-red-600 shrink-0" />
            <span>{error}</span>
          </div>
          <button onClick={handleReconnectGoogle} className="bg-red-600 text-white px-3 py-1.5 rounded-xl font-black uppercase text-[10px]">
            Riautentica Google
          </button>
        </div>
      )}

      {/* Main Grid: File Explorer + Viewer Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Drive File List (5 cols on widescreen) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <h3 className="font-black text-slate-900 uppercase text-sm tracking-tight flex items-center gap-2">
              <Layers size={18} className="text-blue-600" /> File Google Drive ({filteredFiles.length})
            </h3>
            
            {/* Type Filters */}
            <div className="flex bg-slate-100 p-1 rounded-xl text-[10px] font-black uppercase">
              <button 
                onClick={() => setSelectedFileType('all')} 
                className={`px-3 py-1.5 rounded-lg transition-all ${selectedFileType === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'}`}
              >
                Tutti
              </button>
              <button 
                onClick={() => setSelectedFileType('sheets')} 
                className={`px-3 py-1.5 rounded-lg transition-all ${selectedFileType === 'sheets' ? 'bg-white text-emerald-700 shadow-2xs' : 'text-slate-500'}`}
              >
                Fogli/Excel
              </button>
              <button 
                onClick={() => setSelectedFileType('docs')} 
                className={`px-3 py-1.5 rounded-lg transition-all ${selectedFileType === 'docs' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-500'}`}
              >
                Docs
              </button>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
            <input 
              type="text" 
              placeholder="Cerca per nome file Google..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* List of Files */}
          <div className="space-y-2 max-h-[550px] overflow-y-auto pr-1">
            {filteredFiles.map(file => {
              const isSheet = isSpreadsheetFile(file);
              const isSelected = selectedFile?.id === file.id;

              return (
                <div 
                  key={file.id} 
                  onClick={() => handleSelectFile(file)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected 
                      ? 'bg-blue-50/80 border-blue-500 shadow-2xs' 
                      : 'bg-slate-50/50 hover:bg-slate-100/80 border-slate-200/80'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`p-2.5 rounded-xl shrink-0 ${isSheet ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                      {isSheet ? <FileSpreadsheet size={18} /> : <FileText size={18} />}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-black text-slate-900 text-xs truncate">{file.name}</h4>
                      <p className="text-[10px] text-slate-400 font-semibold mt-0.5 flex items-center gap-2">
                        <span>{new Date(file.modifiedTime).toLocaleDateString('it-IT')}</span>
                        <span>•</span>
                        <span className="uppercase">{isSheet ? 'Foglio / Excel' : 'Google Doc'}</span>
                      </p>
                    </div>
                  </div>

                  {file.webViewLink && (
                    <a 
                      href={file.webViewLink} 
                      target="_blank" 
                      rel="noreferrer" 
                      onClick={(e) => e.stopPropagation()} 
                      className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors shrink-0" 
                      title="Apri in Google Drive"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              );
            })}

            {!loading && filteredFiles.length === 0 && (
              <div className="text-center py-16 space-y-2">
                <FileCode size={36} className="text-slate-300 mx-auto" />
                <p className="text-slate-400 font-bold text-xs uppercase">
                  {token ? 'Nessun documento trovato' : 'Connetti il tuo account Google per iniziare'}
                </p>
              </div>
            )}

            {loading && (
              <div className="text-center py-12 text-slate-400 font-bold text-xs uppercase flex items-center justify-center gap-2">
                <RefreshCw size={18} className="animate-spin text-blue-600" /> Scansione Google Drive in corso...
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Live Sheet/Doc Content Inspector (7 cols on widescreen) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm min-h-[550px] flex flex-col justify-between">
          {selectedFile ? (
            <div className="space-y-6 flex-1">
              
              {/* Selected Header */}
              <div className="flex flex-wrap justify-between items-center pb-4 border-b border-slate-100 gap-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-2xl ${isSpreadsheetFile(selectedFile) ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                    {isSpreadsheetFile(selectedFile) ? <FileSpreadsheet size={24} /> : <FileText size={24} />}
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Anteprima In Tempo Reale</span>
                    <h3 className="font-black text-slate-900 text-base">{selectedFile.name}</h3>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button 
                    onClick={refreshSelectedFile}
                    disabled={contentLoading}
                    className="bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 px-3 py-2 rounded-xl text-xs font-black uppercase flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
                    title="Ricarica i dati del file da Google Drive"
                  >
                    <RefreshCw size={14} className={contentLoading ? 'animate-spin' : ''} />
                    Ricarica Dati
                  </button>

                  <button 
                    onClick={() => setAutoRefreshEnabled(!autoRefreshEnabled)}
                    className={`px-3 py-2 rounded-xl text-xs font-black uppercase flex items-center gap-1.5 transition-all cursor-pointer border ${
                      autoRefreshEnabled 
                        ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs' 
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}
                    title="Abilita o disabilita l'aggiornamento automatico ogni 15 secondi"
                  >
                    <RefreshCw size={14} className={autoRefreshEnabled ? 'animate-spin' : ''} />
                    Auto-Sync {autoRefreshEnabled ? 'ON (15s)' : 'OFF'}
                  </button>

                  {/* Action Buttons for Import */}
                  <button 
                    onClick={handleImportSheetAsCustomers}
                    disabled={importing || contentLoading}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-2 rounded-xl text-xs font-black uppercase shadow-sm active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                    title="Estrae e importa i dati cliente (Ragione Sociale, P.IVA, Email, Indirizzo, SDI) nell'Anagrafica Clienti"
                  >
                    {importing ? <RefreshCw size={14} className="animate-spin" /> : <Users size={14} />} 
                    Importa Anagrafica Clienti
                  </button>

                  {isSpreadsheetFile(selectedFile) && sheetData && (
                    <button 
                      onClick={handleImportSheetAsOrders}
                      disabled={importing || contentLoading}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-xl text-xs font-black uppercase shadow-sm active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                      title="Estrae e importa gli ordini di produzione in ERP"
                    >
                      {importing ? <RefreshCw size={14} className="animate-spin" /> : <Download size={14} />} 
                      Importa Ordini
                    </button>
                  )}

                  {isSpreadsheetFile(selectedFile) && sheetData && (
                    <button 
                      onClick={handleImportAll}
                      disabled={importing || contentLoading}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 rounded-xl text-xs font-black uppercase shadow-sm active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                      title="Importa sia le anagrafiche clienti che gli ordini in una sola operazione"
                    >
                      {importing ? <RefreshCw size={14} className="animate-spin" /> : <Database size={14} />} 
                      Importa Tutto
                    </button>
                  )}

                  {selectedFile.webViewLink && (
                    <a 
                      href={selectedFile.webViewLink} 
                      target="_blank" 
                      rel="noreferrer"
                      className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
                    >
                      Apri <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>

              {/* Guide / How-To Banner */}
              <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs">
                <div className="flex items-center gap-2 text-slate-600">
                  <Info size={16} className="text-blue-600 shrink-0" />
                  <span className="font-semibold">
                    Ultima lettura dati: <strong className="text-slate-900">{lastUpdated ? lastUpdated.toLocaleTimeString('it-IT') : 'Adesso'}</strong>
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">
                  Le modifiche fatte su Google Sheets appaiono subito cliccando <strong>"Ricarica Dati"</strong>.
                </p>
              </div>

              {/* Import Notification Banner */}
              {importSuccessMsg && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl flex items-center gap-3 text-xs font-bold">
                  <CheckCircle size={18} className="text-emerald-600 shrink-0" />
                  <span>{importSuccessMsg}</span>
                </div>
              )}

              {/* Content Render */}
              {contentLoading ? (
                <div className="py-20 text-center space-y-3">
                  <RefreshCw size={28} className="animate-spin text-blue-600 mx-auto" />
                  <p className="text-xs font-bold text-slate-400 uppercase">Lettura contenuto da Google API...</p>
                </div>
              ) : (
                <>
                  {/* Google Sheet / Excel Table Render */}
                  {isSpreadsheetFile(selectedFile) && sheetData && (
                    <div className="space-y-3">
                      {/* Sheet Tabs Bar if file has multiple tabs */}
                      {sheetData.sheetNames && sheetData.sheetNames.length > 1 && (
                        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-200 text-xs">
                          <span className="text-[10px] font-black uppercase text-slate-400 mr-1 shrink-0">Fogli:</span>
                          {sheetData.sheetNames.map((sName) => (
                            <button
                              key={sName}
                              onClick={() => {
                                setSelectedSheetTab(sName);
                                // Refresh with selected tab
                                if (token && selectedFile) {
                                  setContentLoading(true);
                                  getSpreadsheetValues(token, selectedFile.id, 'A1:Z100', selectedFile.mimeType, sName)
                                    .then(data => setSheetData(data))
                                    .finally(() => setContentLoading(false));
                                }
                              }}
                              className={`px-3 py-1 rounded-lg text-xs font-bold shrink-0 transition-all cursor-pointer ${
                                (selectedSheetTab || sheetData.activeSheetName) === sName
                                  ? 'bg-emerald-600 text-white shadow-xs font-black'
                                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                              }`}
                            >
                              {sName}
                            </button>
                          ))}
                        </div>
                      )}

                      <div className="flex justify-between items-center text-[10px] font-black uppercase text-slate-400">
                        <span>Sorgente: {sheetData.range}</span>
                        <span>Righe caricate: {sheetData.values?.length || 0}</span>
                      </div>

                      {(() => {
                        const values = sheetData.values || [];
                        const maxCols = values.length > 0 ? Math.max(...values.map(r => r.length), 1) : 1;

                        return (
                          <div className="overflow-x-auto border border-slate-200 rounded-2xl max-h-[420px] bg-white shadow-xs">
                            <table className="w-full text-left border-collapse text-xs">
                              {values.length > 0 ? (
                                <>
                                  <thead>
                                    <tr className="bg-slate-100 text-slate-700 font-black border-b border-slate-200 sticky top-0 z-10">
                                      <th className="p-2 text-center w-10 text-slate-400 bg-slate-200/80 font-mono text-[10px]">#</th>
                                      {Array.from({ length: maxCols }).map((_, cIdx) => {
                                        const colLetter = String.fromCharCode(65 + cIdx);
                                        const headerText = values[0] && values[0][cIdx] ? values[0][cIdx] : '';
                                        return (
                                          <th key={cIdx} className="p-2.5 border-r border-slate-200 last:border-r-0 whitespace-nowrap min-w-[120px]">
                                            <div className="flex flex-col">
                                              <span className="text-[9px] text-slate-400 font-mono font-bold uppercase">{colLetter}</span>
                                              <span className="truncate max-w-[180px] font-black">{headerText || `Col. ${cIdx + 1}`}</span>
                                            </div>
                                          </th>
                                        );
                                      })}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {values.map((row, rIdx) => {
                                      // Highlight first row slightly if it looks like a header
                                      const isHeaderRow = rIdx === 0;
                                      return (
                                        <tr 
                                          key={rIdx} 
                                          className={`border-b border-slate-100 hover:bg-blue-50/60 transition-colors font-medium text-slate-800 ${
                                            isHeaderRow ? 'bg-slate-50 font-bold' : ''
                                          }`}
                                        >
                                          <td className="p-2 text-center text-slate-400 bg-slate-50 font-mono text-[10px] font-bold border-r border-slate-200 select-none">
                                            {rIdx + 1}
                                          </td>
                                          {Array.from({ length: maxCols }).map((_, cIdx) => {
                                            const cellVal = row[cIdx];
                                            const hasVal = cellVal !== undefined && cellVal !== null && String(cellVal).trim() !== '';
                                            return (
                                              <td key={cIdx} className="p-2.5 border-r border-slate-100 last:border-r-0 whitespace-nowrap max-w-[280px] truncate">
                                                {hasVal ? (
                                                  String(cellVal)
                                                ) : (
                                                  <span className="text-slate-300 font-normal italic text-[11px]">-</span>
                                                )}
                                              </td>
                                            );
                                          })}
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </>
                              ) : (
                                <tbody>
                                  <tr>
                                    <td className="p-8 text-center text-slate-400 font-bold">
                                      Nessun dato trovato nel foglio o file Excel.
                                    </td>
                                  </tr>
                                </tbody>
                              )}
                            </table>
                          </div>
                        );
                      })()}
                    </div>
                  )}

                  {/* Google Doc / Word Text Render */}
                  {isDocFile(selectedFile) && docData && (
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4 max-h-[400px] overflow-y-auto">
                      <h4 className="font-black text-slate-900 text-sm uppercase border-b pb-2">{docData.title}</h4>
                      <p className="text-xs text-slate-700 leading-relaxed font-sans whitespace-pre-wrap">
                        {docData.bodyText || "Il documento è vuoto o non contiene testo leggibile."}
                      </p>
                    </div>
                  )}
                </>
              )}

            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-12 space-y-4 text-slate-400">
              <div className="bg-slate-100 p-4 rounded-3xl text-slate-400">
                <Database size={40} />
              </div>
              <div>
                <h4 className="font-black text-slate-700 text-sm uppercase">Seleziona un documento Google</h4>
                <p className="text-xs text-slate-400 font-medium max-w-sm mt-1">
                  Clicca su uno dei fogli o documenti a sinistra per ispezionarne il contenuto in tempo reale o importare dati.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
