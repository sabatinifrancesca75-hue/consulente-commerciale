/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Home, Package, Factory, AlertTriangle, ChevronRight, Plus, 
  CheckCircle2, TrendingUp, X, BarChart3, Wallet, Truck, 
  HandCoins, Split, Activity, ShoppingCart, Check, Euro, Clock,
  Menu, Copy, CheckCircle, Info, LogOut, LogIn, Users, Phone, Mail, Download,
  User as UserIcon, Search, Trash2, Filter, Settings, Bell, 
  DownloadIcon, FileText, LayoutDashboard, Database, ArrowRight, FileSpreadsheet
} from 'lucide-react';
import { WorkspaceModule } from './components/WorkspaceModule';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  setDoc,
  deleteDoc,
  increment,
  query,
  orderBy,
  serverTimestamp,
  writeBatch
} from 'firebase/firestore';
import { onAuthStateChanged, signOut, type User } from 'firebase/auth';
import { db, auth, signInWithGoogle, handleFirestoreError, OperationType } from './firebase';
import { prezzoListino, scontoAggiuntivoPerCliente, isClientePrivato } from './lib/listino';

// Fasi della produzione ordinate
const STAGES = [
  { id: 'lavaggio', label: 'Lavaggio', color: 'bg-blue-500', border: 'border-blue-500' },
  { id: 'sabbiatura', label: 'Sabbiatura', color: 'bg-amber-500', border: 'border-amber-500' },
  { id: 'verniciatura', label: 'Verniciatura', color: 'bg-emerald-500', border: 'border-emerald-500' },
  { id: 'omologazione', label: 'Omologazione', color: 'bg-purple-600', border: 'border-purple-600' }
];

// Fasi ancora attive in officina: i componenti non sono ancora stati scalati dal magazzino
const ACTIVE_STAGE_IDS = STAGES.map(s => s.id);

// Email autorizzate alle funzioni di amministrazione (es. caricamento dati di prova).
// Tenere allineata alla lista in firestore.rules.
const ADMIN_EMAILS = ['admin@erreciesse.it', 'sabatini.francesca75@gmail.com'];

// Distinta Base (DI.BA) - Collegamento pezzi a modello
const DIBA: Record<string, { components: { id: string, qty: number }[] }> = {
  "Lino 295 FT": { components: [{ id: "ST20", qty: 1 }, { id: "FONDO800C", qty: 2 }, { id: "LAMIERA P355NH", qty: 107 }] },
  "Lino 295 INT": { components: [{ id: "ST20", qty: 1 }, { id: "FONDO800C", qty: 2 }, { id: "ANODO 1.0", qty: 1 }] },
  "Lino 500 FT": { components: [{ id: "ST20", qty: 1 }, { id: "FONDO800C", qty: 2 }, { id: "LAMIERA P355NH", qty: 140 }] },
  "Lino 500 INT": { components: [{ id: "ST20", qty: 1 }, { id: "FONDO800C", qty: 2 }, { id: "ANODO 1.0", qty: 1 }] },
  "1000 H FT RIGENERATO": { components: [{ id: "ST20", qty: 1 }, { id: "EU20", qty: 1 }, { id: "VRN20", qty: 1 }, { id: "VL25", qty: 2 }] },
  "1000 H INT RIGENERATO": { components: [{ id: "ST20", qty: 1 }, { id: "EU20", qty: 1 }, { id: "VRN20", qty: 1 }, { id: "ANODO 1.0", qty: 2 }] },
  "1000 V FT RIGENERATO": { components: [{ id: "ST20", qty: 1 }, { id: "EU20", qty: 1 }, { id: "VRN20", qty: 1 }, { id: "VL25", qty: 2 }] },
  "1000 V INT RIGENERATO": { components: [{ id: "ST20", qty: 1 }, { id: "EU20", qty: 1 }, { id: "VRN20", qty: 1 }, { id: "ANODO 1.0", qty: 2 }] },
  "1650 V INT RIGENERATO": { components: [{ id: "ST25", qty: 1 }, { id: "EU25", qty: 1 }, { id: "VRN20", qty: 1 }, { id: "ANODO 1.0", qty: 2 }] },
  "1750 H FT RIGENERATO": { components: [{ id: "ST25", qty: 1 }, { id: "EU25", qty: 1 }, { id: "VRN20", qty: 1 }, { id: "VL25", qty: 2 }] },
  "1750 H INT RIGENERATO": { components: [{ id: "ST25", qty: 1 }, { id: "EU25", qty: 1 }, { id: "VRN20", qty: 1 }, { id: "ANODO 1.0", qty: 2 }] },
  "3000 H FT RIGENERATO": { components: [{ id: "ST25", qty: 1 }, { id: "EU25", qty: 1 }, { id: "VRN20", qty: 1 }, { id: "VL25", qty: 2 }] },
  "3000 H INT RIGENERATO": { components: [{ id: "ST25", qty: 1 }, { id: "EU25", qty: 1 }, { id: "VRN20", qty: 1 }, { id: "ANODO 1.0", qty: 2 }] },
  "5000 H FT RIGENERATO": { components: [{ id: "ST32", qty: 1 }, { id: "EU30", qty: 1 }, { id: "VRN20", qty: 1 }, { id: "VL25", qty: 2 }] },
  "5000 H INT RIGENERATO": { components: [{ id: "ST32", qty: 1 }, { id: "EU30", qty: 1 }, { id: "VRN20", qty: 1 }, { id: "ANODO 1.0", qty: 4 }] }
};

interface Order {
  id: string;
  clienteId: string;
  modello: string;
  quantita: number;
  status: string;
  valore: number;
  metodoPagamento: string;
  incassato: boolean;
  note?: string;
  createdAt: any;
  updatedAt: any;
}

interface InventoryItem {
  id: string;
  giacenza: number;
  costo?: number; // assente per i componenti importati dai file di magazzino
  nota?: string;
}

interface Customer {
  id: string;
  nome: string;
  piva: string;
  email: string;
  telefono: string;
  citta: string;
  indirizzoFatturazione: string;
  indirizzoSpedizione: string;
  codiceSDI: string;
  createdAt: any;
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'produzione' | 'consegne' | 'cassa' | 'magazzino' | 'clienti' | 'stats' | 'workspace'>('dashboard');
  const [notifications, setNotifications] = useState<{id: number, msg: string}[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showCopyModal, setShowCopyModal] = useState(false);
  
  const [isSeeding, setIsSeeding] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  // Distinte base caricate da Firestore (es. importate dalla scheda DI.BA.)
  const [modelsDb, setModelsDb] = useState<Record<string, { components: { id: string; qty: number }[] }>>({});

  const [showAddOrder, setShowAddOrder] = useState(false);
  const [showArrivoMerce, setShowArrivoMerce] = useState(false);
  const [arrivoData, setArrivoData] = useState({ componentId: '', qty: 0 });
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ 
    nome: '', 
    piva: '', 
    email: '', 
    telefono: '', 
    citta: '',
    indirizzoFatturazione: '',
    indirizzoSpedizione: '',
    codiceSDI: ''
  });

  const [newOrder, setNewOrder] = useState({ 
    clienteId: '', 
    modello: 'Lino 295 FT', 
    quantita: 1, 
    prezzoUnitario: 0, 
    metodoPagamento: 'Rimessa Diretta',
    note: ''
  });

  const handleAddCustomer = async () => {
    if (!newCustomer.nome) return;
    try {
      // ID univoco: evita che due clienti ricevano lo stesso codice sovrascrivendosi
      const customerId = `CUST-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
      
      // Se l'indirizzo di spedizione è vuoto, usa quello di fatturazione
      const shippingAddress = newCustomer.indirizzoSpedizione.trim() || newCustomer.indirizzoFatturazione.trim();
      
      await setDoc(doc(db, 'customers', customerId), {
        ...newCustomer,
        indirizzoSpedizione: shippingAddress,
        id: customerId,
        createdAt: serverTimestamp()
      });
      setShowAddCustomer(false);
      setNewCustomer({ 
        nome: '', 
        piva: '', 
        email: '', 
        telefono: '', 
        citta: '',
        indirizzoFatturazione: '',
        indirizzoSpedizione: '',
        codiceSDI: ''
      });
      setNotifications(prev => [...prev, { id: Date.now(), msg: `Nuovo cliente ${newCustomer.nome} registrato!` }]);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'customers');
    }
  };

  const deleteCustomer = async (id: string) => {
    if (!window.confirm("Eliminare questo cliente?")) return;
    try {
      await deleteDoc(doc(db, 'customers', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `customers/${id}`);
    }
  };

  const handleArrivoMerce = async () => {
    if (!arrivoData.componentId || arrivoData.qty <= 0) return;
    try {
      const item = inventory.find(i => i.id === arrivoData.componentId);
      if (!item) return;

      // increment() somma sul server: nessuna perdita di dati se più utenti operano insieme
      await updateDoc(doc(db, 'inventory', item.id), {
        giacenza: increment(arrivoData.qty),
        updatedAt: serverTimestamp()
      });

      setShowArrivoMerce(false);
      setNotifications(prev => [...prev, {
        id: Date.now(),
        msg: `Caricati ${arrivoData.qty} pezzi di ${item.id} in magazzino.`
      }]);
      setArrivoData({ componentId: '', qty: 0 });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `inventory/${arrivoData.componentId}`);
    }
  };

  // Auth Listener
  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  // Firestore Listeners
  useEffect(() => {
    if (!user) return;

    const qOrders = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const unsubOrders = onSnapshot(qOrders, (snapshot) => {
      const ordersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Order[];
      setOrders(ordersData);
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'orders'));

    const unsubInventory = onSnapshot(collection(db, 'inventory'), (snapshot) => {
      const inventoryData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as InventoryItem[];
      setInventory(inventoryData);
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'inventory'));

    const unsubCustomers = onSnapshot(collection(db, 'customers'), (snapshot) => {
      setCustomers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Customer)));
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'customers'));

    const unsubModels = onSnapshot(collection(db, 'models'), (snapshot) => {
      const m: Record<string, { components: { id: string; qty: number }[] }> = {};
      snapshot.docs.forEach(d => {
        const data = d.data() as any;
        if (data && Array.isArray(data.components)) m[d.id] = { components: data.components };
      });
      setModelsDb(m);
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'models'));

    return () => {
      unsubOrders();
      unsubInventory();
      unsubCustomers();
      unsubModels();
    };
  }, [user]);

  // Distinta base attiva: quella su Firestore (reale, importata dai file)
  // ha la precedenza; quella fissa nel codice fa da riserva.
  const dibaAttiva = useMemo(() => ({ ...DIBA, ...modelsDb }), [modelsDb]);

  // CALCOLO FABBISOGNO E ANALISI FINANZIARIA
  const analysis = useMemo(() => {
    const req: Record<string, number> = {};
    orders.forEach(o => {
      // Solo gli ordini ancora in officina: dopo il ritiro i componenti sono già stati scalati
      if (o && ACTIVE_STAGE_IDS.includes(o.status)) {
        const d = dibaAttiva[o.modello];
        if (d && d.components) {
          d.components.forEach(c => {
            req[c.id] = (req[c.id] || 0) + (c.qty * (o.quantita || 0));
          });
        }
      }
    });

    const alerts = inventory.map(i => {
      if (!i || !i.id) return null;
      const net = (i.giacenza || 0) - (req[i.id] || 0);
      return { ...i, mancante: net < 0 ? Math.abs(net) : 0 };
    }).filter((a): a is any => a !== null && a.mancante > 0);

    let incassoMese1 = 0;
    let incassoMese2 = 0;

    const statusCounts: Record<string, number> = {};
    const customerStats: Record<string, number> = {};

    orders.forEach(o => {
      statusCounts[o.status] = (statusCounts[o.status] || 0) + 1;
      customerStats[o.clienteId] = (customerStats[o.clienteId] || 0) + o.valore;

      if (o.incassato || o.status === 'completato') {
        // Ordine già incassato: non rientra nella previsione di cassa
      } else if (o.status === 'omologazione' || o.status === 'attesa_incasso') {
        incassoMese1 += (o.valore * 0.5);
        incassoMese2 += (o.valore * 0.5);
      } else {
        incassoMese1 += (o.valore * 0.2);
      }
    });

    const pieData = STAGES.map(s => ({
      name: s.label,
      value: statusCounts[s.id] || 0
    })).filter(d => d.value > 0);

    const barData = Object.entries(customerStats)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);

    return { alerts, incassoMese1, incassoMese2, pieData, barData };
  }, [orders, inventory, dibaAttiva]);

  const handleAddOrder = async () => {
    const totale = newOrder.prezzoUnitario * newOrder.quantita;
    if (!newOrder.clienteId || !newOrder.modello || newOrder.quantita <= 0 || newOrder.prezzoUnitario <= 0) {
      alert("Compila tutti i campi obbligatori!");
      return;
    }
    try {
      // ID univoco: le ultime 4 cifre dell'orologio si ripetono e sovrascriverebbero ordini esistenti
      const orderId = `ORD-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
      await setDoc(doc(db, 'orders', orderId), {
        ...newOrder,
        id: orderId,
        valore: totale,
        status: 'lavaggio',
        incassato: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      setShowAddOrder(false);
      setNewOrder({ 
        clienteId: '', 
        modello: 'Lino 295 FT', 
        quantita: 1, 
        prezzoUnitario: 0, 
        metodoPagamento: 'Rimessa Diretta',
        note: ''
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'orders');
    }
  };

  const seedData = async () => {
    if (isSeeding) return;
    if (!user?.email || !ADMIN_EMAILS.includes(user.email.toLowerCase())) {
      alert("Solo un amministratore può caricare i dati di prova.");
      return;
    }
    if (!window.confirm("ATTENZIONE: i dati di prova SOVRASCRIVONO ordini, clienti e giacenze di magazzino con gli stessi codici. Usare solo su un database vuoto o di test. Procedere?")) return;
    setIsSeeding(true);
    
    try {
      const batch = writeBatch(db);

      for (const [name, data] of Object.entries(DIBA)) {
        batch.set(doc(db, 'models', name), data);
      }

      const initialInventory = [
        { id: 'ST20', giacenza: 50, costo: 10.83 },
        { id: 'ST25', giacenza: 30, costo: 9.81 },
        { id: 'ST32', giacenza: 15, costo: 16.74 },
        { id: 'EU20', giacenza: 40, costo: 19.17 },
        { id: 'EU25', giacenza: 25, costo: 29.44 },
        { id: 'EU30', giacenza: 10, costo: 48.31 },
        { id: 'VRN20', giacenza: 60, costo: 12.11 },
        { id: 'VL25', giacenza: 45, costo: 11.32 },
        { id: 'FONDO800C', giacenza: 20, costo: 12.00 },
        { id: 'LAMIERA P355NH', giacenza: 2000, costo: 1.13 },
        { id: 'ANODO 1.0', giacenza: 100, costo: 14.00 }
      ];
      for (const item of initialInventory) {
        batch.set(doc(db, 'inventory', item.id), {
          giacenza: item.giacenza,
          costo: item.costo
        });
      }

      const initialOrders = [
        { id: 'ORD-01', clienteId: 'EMILGAS SRL', modello: 'Lino 295 FT', quantita: 5, status: 'lavaggio', valore: 6000, metodoPagamento: 'Pagamento tre rate 30,60,90', incassato: false },
        { id: 'ORD-02', clienteId: 'FRATELLI CECCARELLI', modello: 'Lino 500 INT', quantita: 2, status: 'omologazione', valore: 3400, metodoPagamento: 'Rimessa Diretta', incassato: false },
        { id: 'ORD-03', clienteId: 'GASNEEDS', modello: '1000 H FT RIGENERATO', quantita: 3, status: 'verniciatura', valore: 4500, metodoPagamento: 'Pagamento anticipato', incassato: false }
      ];
      for (const order of initialOrders) {
        batch.set(doc(db, 'orders', order.id), {
          ...order,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }

      const initialCustomers = [
        { 
          id: 'CUST-001', 
          nome: 'EMILGAS SRL', 
          piva: '01234567890', 
          email: 'vincenzo@emilgas.it', 
          telefono: '051 123456', 
          citta: 'Bologna',
          indirizzoFatturazione: 'Via dell\'Industria 12, Bologna',
          indirizzoSpedizione: 'Via dell\'Industria 12, Bologna',
          codiceSDI: 'KRRH6B9'
        },
        { 
          id: 'CUST-002', 
          nome: 'FRATELLI CECCARELLI', 
          piva: '09876543210', 
          email: 'ordini@ceccarelli.it', 
          telefono: '0541 654321', 
          citta: 'Rimini',
          indirizzoFatturazione: 'Viale Adriatico 45, Rimini',
          indirizzoSpedizione: 'Viale Adriatico 45, Rimini',
          codiceSDI: 'M5ITOJA'
        },
        { 
          id: 'CUST-003', 
          nome: 'GASNEEDS', 
          piva: '05554443332', 
          email: 'admin@gasneeds.com', 
          telefono: '+39 333 111222', 
          citta: 'Milano',
          indirizzoFatturazione: 'Piazza del Duomo 1, Milano',
          indirizzoSpedizione: 'Via Brenta 10, Milano',
          codiceSDI: 'SUBM70N'
        }
      ];
      for (const cust of initialCustomers) {
        batch.set(doc(db, 'customers', cust.id), {
          ...cust,
          createdAt: serverTimestamp()
        });
      }

      await batch.commit();
      alert("Dati di test caricati con successo!");
    } catch (err: any) {
      alert(`Errore caricamento dati: ${err.message || String(err)}`);
    } finally {
      setIsSeeding(false);
    }
  };

  const handleCopyLink = () => {
    try {
      const url = window.location.href;
      const el = document.createElement('textarea');
      el.value = url;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      alert("Link copiato negli appunti!");
    } catch (err) {
      setShowCopyModal(true);
    }
  };

  const moveOrder = async (id: string) => {
    const order = orders.find(o => o.id === id);
    if (!order) return;

    const currIdx = STAGES.findIndex(s => s.id === order.status);
    if (currIdx !== -1 && currIdx < STAGES.length - 1) {
      const nextStatus = STAGES[currIdx + 1].id;
      try {
        await updateDoc(doc(db, 'orders', id), {
          status: nextStatus,
          updatedAt: serverTimestamp()
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `orders/${id}`);
      }
    }
  };

  const confirmPickup = async (id: string) => {
    const order = orders.find(o => o.id === id);
    if (!order) return;
    
    try {
      const diba = dibaAttiva[order.modello];
      if (diba && diba.components) {
        for (const comp of diba.components) {
          // increment() scala sul server: sicuro anche con più utenti simultanei
          await setDoc(doc(db, 'inventory', comp.id), {
            giacenza: increment(-(comp.qty * order.quantita)),
          }, { merge: true });
        }
      }

      await updateDoc(doc(db, 'orders', id), {
        status: 'attesa_incasso',
        updatedAt: serverTimestamp()
      });

      const acconto = (order.metodoPagamento === 'Rimessa Diretta' ? order.valore : order.valore * 0.5);
      setNotifications(prev => [...prev, {
        id: Date.now(),
        msg: `Ritiro registrato per ${order.clienteId}. In attesa dell'incasso di €${acconto.toLocaleString()}.`
      }]);

    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `orders/${id}`);
    }
  };

  const confirmPayment = async (id: string) => {
    try {
      await updateDoc(doc(db, 'orders', id), { 
        status: 'completato',
        incassato: true,
        updatedAt: serverTimestamp()
      });
      setNotifications(prev => [...prev, {
        id: Date.now(),
        msg: `Incasso confermato! Ordine completato e contabilizzato.`
      }]);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `orders/${id}`);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-900 text-white">
        <Activity className="text-blue-500 animate-spin mr-3" size={40} />
        <span className="font-bold text-lg uppercase tracking-wider">Caricamento Erreciesse Pro...</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900 p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-12 rounded-3xl shadow-2xl space-y-8 max-w-md w-full text-center"
        >
          <div className="bg-blue-600 w-20 h-20 rounded-2xl mx-auto flex items-center justify-center text-white shadow-xl shadow-blue-500/30">
            <Factory size={40} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase italic">Erreciesse Pro</h1>
            <p className="text-slate-500 text-sm font-semibold mt-2">Sistema ERP Desktop • Produzione & Cash Flow</p>
          </div>
          <button 
            onClick={signInWithGoogle}
            className="w-full flex items-center justify-center gap-3 bg-slate-900 text-white py-4 px-6 rounded-2xl font-bold uppercase tracking-wider hover:bg-slate-800 transition-all shadow-lg active:scale-98 cursor-pointer"
          >
            <LogIn size={20} /> Accedi con Google
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 flex flex-col lg:flex-row antialiased">
      
      {/* Modal Fallback Copia Link */}
      <AnimatePresence>
        {showCopyModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-sm"
          >
            <div className="bg-white p-8 rounded-3xl max-w-md w-full space-y-4 shadow-2xl">
              <h3 className="font-black text-slate-800 uppercase tracking-tight text-lg">Copia il Link</h3>
              <p className="text-xs text-slate-500">Copia manualmente questo indirizzo:</p>
              <input readOnly value={window.location.href} className="w-full p-3 bg-slate-100 rounded-xl text-xs font-mono border border-slate-200" />
              <button onClick={() => setShowCopyModal(false)} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold uppercase text-xs">Chiudi</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DESKTOP WIDESCREEN SIDEBAR NAVIGATION */}
      <aside className="w-full lg:w-72 bg-slate-900 text-slate-300 flex-shrink-0 flex flex-col justify-between border-r border-slate-800 p-6 lg:min-h-screen lg:sticky lg:top-0 lg:h-screen overflow-y-auto">
        <div className="space-y-8">
          {/* Logo & Brand Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2.5 rounded-xl text-white shadow-lg shadow-blue-600/30">
                <Factory size={22} />
              </div>
              <div>
                <h1 className="font-black text-white text-lg tracking-tight uppercase italic leading-none">Erreciesse</h1>
                <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">Widescreen ERP</span>
              </div>
            </div>
            {/* Mobile Nav Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="lg:hidden p-2 text-slate-400 hover:text-white"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop Nav Items */}
          <nav className={`space-y-1.5 ${isMobileMenuOpen ? 'block' : 'hidden lg:block'}`}>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3 px-3">Moduli Operativi</p>
            
            <SidebarBtn 
              icon={<Home size={20}/>} 
              label="Dashboard & KPI" 
              active={activeTab === 'dashboard'} 
              badge={analysis.alerts.length > 0 ? `${analysis.alerts.length}` : undefined}
              badgeColor="bg-red-500"
              onClick={() => { setActiveTab('dashboard'); setIsMobileMenuOpen(false); }} 
            />
            
            <SidebarBtn 
              icon={<Factory size={20}/>} 
              label="Officina Lino" 
              active={activeTab === 'produzione'} 
              badge={`${orders.filter(o => ACTIVE_STAGE_IDS.includes(o.status)).length}`}
              badgeColor="bg-blue-600"
              onClick={() => { setActiveTab('produzione'); setIsMobileMenuOpen(false); }} 
            />
            
            <SidebarBtn 
              icon={<Truck size={20}/>} 
              label="Logistica Elena" 
              active={activeTab === 'consegne'} 
              badge={`${orders.filter(o => o.status === 'omologazione').length}`}
              badgeColor="bg-amber-500"
              onClick={() => { setActiveTab('consegne'); setIsMobileMenuOpen(false); }} 
            />

            <SidebarBtn 
              icon={<HandCoins size={20}/>} 
              label="Cassa & Contabilità" 
              active={activeTab === 'cassa'} 
              badge={orders.filter(o => o.status === 'attesa_incasso').length > 0 ? `${orders.filter(o => o.status === 'attesa_incasso').length}` : undefined}
              badgeColor="bg-purple-600"
              onClick={() => { setActiveTab('cassa'); setIsMobileMenuOpen(false); }} 
            />

            <SidebarBtn 
              icon={<Package size={20}/>} 
              label="Gestione Magazzino" 
              active={activeTab === 'magazzino'} 
              onClick={() => { setActiveTab('magazzino'); setIsMobileMenuOpen(false); }} 
            />

            <SidebarBtn 
              icon={<Users size={20}/>} 
              label="Anagrafica Clienti" 
              active={activeTab === 'clienti'} 
              badge={`${customers.length}`}
              badgeColor="bg-slate-700"
              onClick={() => { setActiveTab('clienti'); setIsMobileMenuOpen(false); }} 
            />

            <SidebarBtn 
              icon={<BarChart3 size={20}/>} 
              label="Business Intelligence" 
              active={activeTab === 'stats'} 
              onClick={() => { setActiveTab('stats'); setIsMobileMenuOpen(false); }} 
            />

            <SidebarBtn 
              icon={<FileSpreadsheet size={20}/>} 
              label="Google Workspace" 
              active={activeTab === 'workspace'} 
              badge="Drive"
              badgeColor="bg-emerald-600"
              onClick={() => { setActiveTab('workspace'); setIsMobileMenuOpen(false); }} 
            />
          </nav>
        </div>

        {/* Sidebar Footer Actions & User Info */}
        <div className={`pt-6 border-t border-slate-800 space-y-4 ${isMobileMenuOpen ? 'block' : 'hidden lg:block'}`}>
          <div className="flex items-center gap-3 p-3 bg-slate-800/60 rounded-2xl border border-slate-800">
            <div className="w-9 h-9 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-sm border border-blue-500/20">
              {user.email?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate">{user.email}</p>
              <p className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Connesso
              </p>
            </div>
            <button 
              onClick={() => signOut(auth)} 
              className="p-2 text-slate-400 hover:text-red-400 transition-colors" 
              title="Disconnetti"
            >
              <LogOut size={18} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <button 
              onClick={handleCopyLink} 
              className="flex items-center justify-center gap-1.5 p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold transition-all"
            >
              <Copy size={14} /> Copia Link
            </button>
            {user.email && ADMIN_EMAILS.includes(user.email.toLowerCase()) && (
              <button
                onClick={seedData}
                disabled={isSeeding}
                className="flex items-center justify-center gap-1.5 p-2.5 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-xl font-bold transition-all disabled:opacity-50"
              >
                {isSeeding ? <Activity size={14} className="animate-spin" /> : <Plus size={14} />} Semina Dati
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* MAIN WIDESCREEN CONTENT CONTAINER */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen bg-slate-100">
        
        {/* TOP BAR / HEADER */}
        <header className="bg-white border-b border-slate-200 px-6 lg:px-10 py-4 flex flex-wrap justify-between items-center sticky top-0 z-40 shadow-xs gap-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Sistema Erreciesse Pro</span>
            <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase">
              {activeTab === 'dashboard' && 'Dashboard & Panoramica'}
              {activeTab === 'produzione' && 'Officina Lino — Stato Lavorazioni'}
              {activeTab === 'consegne' && 'Logistica Elena — Ritiro & Consegna'}
              {activeTab === 'cassa' && 'Cassa & Contabilità (Patri)'}
              {activeTab === 'magazzino' && 'Gestione Scorte Magazzino'}
              {activeTab === 'clienti' && 'Anagrafica & Sedi Clienti'}
              {activeTab === 'stats' && 'Business Intelligence & Report'}
              {activeTab === 'workspace' && 'Google Workspace — Documenti & Fogli Google'}
            </h2>
          </div>

          {/* Quick Header Action Buttons */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowAddOrder(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider shadow-md shadow-blue-600/20 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Plus size={16} /> Nuovo Ordine
            </button>

            <button 
              onClick={() => setShowArrivoMerce(true)}
              className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider shadow-md shadow-amber-600/20 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Package size={16} /> Scarico Merce
            </button>

            <button 
              onClick={() => setShowAddCustomer(true)}
              className="bg-slate-800 hover:bg-slate-900 text-white px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider shadow-md active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Users size={16} /> Nuovo Cliente
            </button>
          </div>
        </header>

        {/* MAIN VIEW CONTENT AREA */}
        <main className="p-6 lg:p-10 space-y-8 max-w-[1920px] w-full mx-auto flex-1">
          
          {/* Active Notifications Banner */}
          <AnimatePresence>
            {notifications.map(n => (
              <motion.div 
                key={n.id} 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-blue-900 text-white p-5 rounded-2xl shadow-xl border border-blue-400 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-amber-400 p-2.5 rounded-xl text-blue-900 font-bold shrink-0">
                    <ShoppingCart size={22} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-blue-300 tracking-widest">Notifica Operativa</p>
                    <p className="text-sm font-bold mt-0.5">{n.msg}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setNotifications([])} 
                  className="bg-white text-blue-900 px-4 py-2 rounded-xl text-xs font-black uppercase hover:bg-blue-50 transition-colors shrink-0"
                >
                  Conferma
                </button>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Hero Cashflow Header Card */}
              <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="relative z-10 space-y-2">
                  <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full w-fit text-[10px] font-black uppercase tracking-widest text-blue-200">
                    <TrendingUp size={12} /> Flusso Cassa Previsto (30 Giorni)
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-black tracking-tight">€ {analysis.incassoMese1.toLocaleString()}</h2>
                  <p className="text-xs text-blue-200 max-w-xl font-medium">
                    Stima calcolata sugli ordini in lavorazione e in omologazione. Registra gli incassi nella sezione Cassa per confermare il saldo effettivo in banca.
                  </p>
                </div>
                <div className="flex items-center gap-3 relative z-10">
                  <button 
                    onClick={() => setShowAddOrder(true)}
                    className="bg-white text-blue-900 hover:bg-blue-50 px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider shadow-lg active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Plus size={18} /> Crea Nuovo Ordine
                  </button>
                </div>
              </div>

              {/* Quick KPI Grid across widescreen */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-black text-slate-400 uppercase">Mancanti Scorta</span>
                    <AlertTriangle className="text-red-500" size={18} />
                  </div>
                  <p className="text-2xl font-black text-red-600">{analysis.alerts.length} pz</p>
                  <p className="text-[10px] text-slate-400 mt-1 font-semibold">In fabbisogno</p>
                </div>

                <div 
                  onClick={() => setActiveTab('consegne')}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-black text-slate-400 uppercase">Pronti Ritiro</span>
                    <Truck className="text-blue-500 group-hover:scale-110 transition-transform" size={18} />
                  </div>
                  <p className="text-2xl font-black text-slate-800">{orders.filter(o => o.status === 'omologazione').length}</p>
                  <p className="text-[10px] text-blue-600 font-bold flex items-center gap-1 mt-1">Logistica Elena <ChevronRight size={12}/></p>
                </div>

                <div 
                  onClick={() => setActiveTab('cassa')}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-purple-300 transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-black text-slate-400 uppercase">Da Incassare</span>
                    <HandCoins className="text-purple-500 group-hover:scale-110 transition-transform" size={18} />
                  </div>
                  <p className="text-2xl font-black text-slate-800">{orders.filter(o => o.status === 'attesa_incasso').length}</p>
                  <p className="text-[10px] text-purple-600 font-bold flex items-center gap-1 mt-1">Verifica Patri <ChevronRight size={12}/></p>
                </div>

                <div 
                  onClick={() => setActiveTab('magazzino')}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-amber-300 transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-black text-slate-400 uppercase">Scorte Basse</span>
                    <Package className="text-amber-500 group-hover:scale-110 transition-transform" size={18} />
                  </div>
                  <p className="text-2xl font-black text-slate-800">{inventory.filter(i => i.giacenza < 10).length}</p>
                  <p className="text-[10px] text-amber-600 font-bold flex items-center gap-1 mt-1">Arrivo Merce <ChevronRight size={12}/></p>
                </div>

                <div 
                  onClick={() => setActiveTab('clienti')}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-slate-400 transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-black text-slate-400 uppercase">Totale Clienti</span>
                    <Users className="text-slate-600 group-hover:scale-110 transition-transform" size={18} />
                  </div>
                  <p className="text-2xl font-black text-slate-800">{customers.length}</p>
                  <p className="text-[10px] text-slate-600 font-bold flex items-center gap-1 mt-1">Anagrafica <ChevronRight size={12}/></p>
                </div>

                <div 
                  onClick={() => setActiveTab('stats')}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-300 transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-black text-slate-400 uppercase">Analisi BI</span>
                    <BarChart3 className="text-indigo-500 group-hover:scale-110 transition-transform" size={18} />
                  </div>
                  <p className="text-2xl font-black text-slate-800">Report</p>
                  <p className="text-[10px] text-indigo-600 font-bold flex items-center gap-1 mt-1">Grafici & Stats <ChevronRight size={12}/></p>
                </div>
              </div>

              {/* Two Column Section on Desktop */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Critical Fabbisogno Card */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
                      <AlertTriangle size={18} className="text-red-500" /> Fabbisogno Componenti Critici
                    </h3>
                    <button onClick={() => setShowArrivoMerce(true)} className="text-xs font-bold text-amber-600 uppercase hover:underline">
                      + Scarico Fornitore
                    </button>
                  </div>

                  {analysis.alerts.length > 0 ? (
                    <div className="space-y-3">
                      {analysis.alerts.map(a => (
                        <div key={a.id} className="flex justify-between items-center p-3.5 bg-red-50/70 border border-red-100 rounded-2xl">
                          <div>
                            <p className="font-black text-slate-900 text-sm uppercase">{a.id}</p>
                            <p className="text-[10px] text-slate-500 font-bold">Giacenza attuale: {a.giacenza} pz</p>
                          </div>
                          <span className="bg-red-600 text-white px-3 py-1.5 rounded-xl font-black text-xs">
                            Mancano {a.mancante} pz
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 text-center text-slate-400 font-semibold text-sm">
                      <CheckCircle size={32} className="text-emerald-500 mx-auto mb-2" />
                      Tutte le scorte sono sufficienti per gli ordini in corso.
                    </div>
                  )}
                </div>

                {/* Officina Overview Card */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
                      <Activity size={18} className="text-blue-600" /> Avanzamento Officina
                    </h3>
                    <button onClick={() => setActiveTab('produzione')} className="text-xs font-bold text-blue-600 uppercase hover:underline flex items-center gap-1">
                      Vai a Officina <ArrowRight size={14} />
                    </button>
                  </div>

                  <div className="flex gap-2 h-3 rounded-full overflow-hidden bg-slate-100 p-0.5">
                    {STAGES.map(s => {
                      const count = orders.filter(o => o.status === s.id).length;
                      return <div key={s.id} className={`${s.color} h-full rounded-full transition-all`} style={{ flex: count + 0.2 }}></div>
                    })}
                  </div>

                  <div className="grid grid-cols-4 gap-3 pt-2">
                    {STAGES.map(s => {
                      const count = orders.filter(o => o.status === s.id).length;
                      return (
                        <div key={s.id} className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center">
                          <span className={`inline-block w-2 h-2 rounded-full ${s.color} mb-1`}></span>
                          <p className="text-[10px] font-black text-slate-400 uppercase">{s.label}</p>
                          <p className="text-lg font-black text-slate-900 mt-0.5">{count}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: OFFICINA LINO (4-COLUMN WIDESCREEN KANBAN BOARD) */}
          {activeTab === 'produzione' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Spostamento serbatoi attraverso le fasi di produzione Lino
                </p>
                <button 
                  onClick={() => setShowAddOrder(true)} 
                  className="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-black uppercase shadow-sm flex items-center gap-1.5"
                >
                  <Plus size={16} /> Nuovo Ordine
                </button>
              </div>

              {/* 4-COLUMN KANBAN BOARD ON WIDESCREEN */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
                {STAGES.map((s) => {
                  const stageOrders = orders.filter(o => o.status === s.id);
                  return (
                    <div key={s.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 space-y-4 min-h-[500px] flex flex-col">
                      <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <span className={`w-3 h-3 rounded-full ${s.color}`}></span>
                          <h3 className="font-black text-slate-900 uppercase text-sm">{s.label}</h3>
                        </div>
                        <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full text-xs font-black">
                          {stageOrders.length}
                        </span>
                      </div>

                      <div className="space-y-3 flex-1">
                        {stageOrders.map(o => (
                          <motion.div 
                            layout
                            key={o.id} 
                            className={`bg-slate-50 p-4 rounded-2xl border-2 space-y-3 hover:shadow-md transition-all ${o.metodoPagamento === 'Rimessa Diretta' ? 'border-amber-400' : 'border-slate-200'}`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="bg-blue-100 text-blue-800 text-[9px] font-black px-2 py-0.5 rounded uppercase truncate max-w-[120px]">
                                {o.clienteId}
                              </span>
                              <span className="text-[9px] font-bold text-slate-400 uppercase">
                                {o.id}
                              </span>
                            </div>

                            <div>
                              <h4 className="font-black text-slate-900 text-sm uppercase">{o.modello}</h4>
                              <p className="text-xs text-slate-500 font-bold mt-0.5">Quantità: {o.quantita} pz</p>
                              <p className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5">{o.metodoPagamento}</p>
                            </div>

                            {o.note && (
                              <p className="text-[10px] bg-white p-2 rounded-xl border border-slate-200 text-slate-600 italic">
                                "{o.note}"
                              </p>
                            )}

                            {s.id !== 'omologazione' && (
                              <button 
                                onClick={() => moveOrder(o.id)} 
                                className="w-full bg-white hover:bg-blue-50 text-blue-600 border border-blue-200 py-2 rounded-xl font-black text-[10px] uppercase transition-all flex items-center justify-center gap-1 shadow-2xs"
                              >
                                Avanza <ChevronRight size={14} />
                              </button>
                            )}
                          </motion.div>
                        ))}

                        {stageOrders.length === 0 && (
                          <div className="h-40 flex items-center justify-center text-center text-slate-300 font-bold text-xs uppercase border-2 border-dashed border-slate-100 rounded-2xl">
                            Nessun serbatoio
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: LOGISTICA ELENA */}
          {activeTab === 'consegne' && (
            <div className="space-y-6">
              <div className="bg-amber-50 p-5 rounded-2xl border border-amber-200 flex items-center gap-4">
                <Info className="text-amber-600 shrink-0" size={24} />
                <p className="text-xs text-amber-900 font-semibold leading-relaxed">
                  Elena, registra qui il ritiro appena il cliente preleva la merce. I componenti verranno scalati dal magazzino e l'ordine passerà automaticamente alla verifica incasso.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {orders.filter(o => o.status === 'omologazione').map(o => (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    key={o.id} 
                    className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4"
                  >
                    <div className="flex justify-between items-start">
                      <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                        Pronto per Consegna
                      </span>
                      <p className="text-lg font-black text-slate-900">€ {o.valore.toLocaleString()}</p>
                    </div>

                    <div>
                      <h4 className="font-black text-slate-900 text-lg uppercase leading-tight">{o.clienteId}</h4>
                      <p className="text-sm font-bold text-slate-600 uppercase mt-1">{o.modello} ({o.quantita} pz)</p>
                      <p className="text-xs text-slate-400 font-semibold uppercase mt-0.5">{o.metodoPagamento}</p>
                    </div>

                    {o.note && (
                      <div className="text-xs bg-blue-50 p-3 rounded-2xl border border-blue-100 font-bold text-blue-800 italic">
                        Note: {o.note}
                      </div>
                    )}

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Pagamento previsto:</p>
                        <p className="text-base font-black text-blue-600">€ {(o.metodoPagamento === 'Rimessa Diretta' ? o.valore : o.valore * 0.5).toLocaleString()}</p>
                      </div>
                      <button 
                        onClick={() => confirmPickup(o.id)} 
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-black text-xs uppercase shadow-md active:scale-95 transition-all cursor-pointer"
                      >
                        Registra Ritiro
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {orders.filter(o => o.status === 'omologazione').length === 0 && (
                <div className="bg-white p-16 rounded-3xl border border-slate-200 text-center space-y-3">
                  <Truck size={48} className="text-slate-200 mx-auto" />
                  <p className="text-slate-400 font-black uppercase text-sm">Nessun serbatoio in attesa di ritiro</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: CASSA & CONTABILITÀ */}
          {activeTab === 'cassa' && (
            <div className="space-y-8">
              {/* Pending Patri Verification */}
              {orders.filter(o => o.status === 'attesa_incasso').length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
                    <Wallet size={18} className="text-purple-600" /> Ordini da Verificare & Incassare (Patri)
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {orders.filter(o => o.status === 'attesa_incasso').map(o => (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        key={o.id} 
                        className="bg-white p-6 rounded-3xl border border-purple-200 shadow-sm space-y-4"
                      >
                        <div className="flex justify-between items-start">
                          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                            Attesa accredito
                          </span>
                          <p className="text-lg font-black text-slate-900">€ {o.valore.toLocaleString()}</p>
                        </div>
                        <div>
                          <h4 className="font-black text-slate-900 text-base uppercase">{o.clienteId}</h4>
                          <p className="text-xs text-slate-500 font-bold uppercase">{o.metodoPagamento}</p>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-2xl border border-purple-100 flex justify-between items-center">
                          <span className="text-sm font-black text-purple-700">€ {(o.metodoPagamento === 'Rimessa Diretta' ? o.valore : o.valore * 0.5).toLocaleString()}</span>
                          <button 
                            onClick={() => confirmPayment(o.id)} 
                            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl font-black text-xs uppercase shadow-md active:scale-95 transition-transform cursor-pointer"
                          >
                            Registra Incasso
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* 6 Month Cashflow Projection Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
                    <BarChart3 size={18} className="text-blue-600" /> Proiezione Entrate 6 Mesi
                  </h3>
                  <div className="space-y-4">
                    {[
                      { m: 'Mese Corrente', val: analysis.incassoMese1 },
                      { m: '+30 Giorni', val: analysis.incassoMese2 },
                      { m: '+60 Giorni', val: analysis.incassoMese1 * 0.8 },
                      { m: '+90 Giorni', val: analysis.incassoMese2 * 1.2 }
                    ].map((item, idx) => (
                      <div key={idx} className="space-y-1.5">
                        <div className="flex justify-between text-xs font-black uppercase">
                          <span className="text-slate-600">{item.m}</span>
                          <span className="text-blue-600">€ {item.val.toLocaleString()}</span>
                        </div>
                        <div className="h-3 bg-slate-100 rounded-full border border-slate-200 overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(100, (item.val / 20000) * 100)}%` }}
                            className={`h-full ${item.val > 0 ? 'bg-blue-600' : 'bg-slate-300'}`}
                          ></motion.div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Raw Materials Cost Reference Table */}
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
                    <Package size={18} className="text-blue-600" /> Listino Materie Prime (Media Prezzi)
                  </h3>
                  <div className="space-y-3">
                    {[
                      { item: "Valvola ST20", price: "€ 10,83" },
                      { item: "Valvola ST25", price: "€ 9,81" },
                      { item: "Anodo 1.0", price: "€ 14,00" },
                      { item: "Lamiera P355", price: "€ 1,13" }
                    ].map((m, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <span className="text-sm font-bold text-slate-800">{m.item}</span>
                        <span className="text-sm font-black text-blue-600">{m.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: GESTIONE MAGAZZINO */}
          {activeTab === 'magazzino' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 flex items-center gap-3 flex-1 mr-4">
                  <Info className="text-amber-600 shrink-0" size={20} />
                  <p className="text-xs text-amber-900 font-semibold">
                    Registra lo scarico merce dei fornitori per incrementare le scorte in tempo reale.
                  </p>
                </div>
                <button 
                  onClick={() => setShowArrivoMerce(true)}
                  className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-3 rounded-xl font-black text-xs uppercase tracking-wider shadow-md active:scale-95 transition-all flex items-center gap-2 cursor-pointer shrink-0"
                >
                  <Plus size={16} /> Registra Arrivo
                </button>
              </div>

              {/* Multi-column grid for components */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                {inventory.sort((a, b) => a.giacenza - b.giacenza).map(item => (
                  <div key={item.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
                    <div>
                      <h4 className="font-black text-slate-900 text-base uppercase">{item.id}</h4>
                      <p className="text-xs text-slate-400 font-semibold mt-0.5">
                        {typeof item.costo === 'number' ? `Costo Un.: €${item.costo.toFixed(2)}` : 'Costo da inserire'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`text-2xl font-black ${item.giacenza < 5 ? 'text-red-600' : 'text-slate-800'}`}>{item.giacenza}</p>
                      <p className="text-[10px] font-black text-slate-400 uppercase">Disponibili</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: ANAGRAFICA CLIENTE */}
          {activeTab === 'clienti' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <p className="text-xs font-bold text-slate-500 uppercase">Gestione contatti e indirizzi di spedizione</p>
                <button 
                  onClick={() => setShowAddCustomer(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-black text-xs uppercase shadow-md active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Plus size={16} /> Nuovo Cliente
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {customers.map(c => (
                  <div key={c.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="bg-blue-50 p-3 rounded-2xl text-blue-600">
                          <UserIcon size={24} />
                        </div>
                        <button 
                          onClick={() => deleteCustomer(c.id)} 
                          className="text-slate-300 hover:text-red-500 p-1.5 transition-colors"
                          title="Elimina cliente"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      <h4 className="font-black text-slate-900 uppercase text-lg leading-tight">{c.nome}</h4>
                      <p className="text-xs text-slate-500 font-bold uppercase mt-1">
                        {c.citta} • P.IVA: {c.piva} {c.codiceSDI && `• SDI: ${c.codiceSDI}`}
                      </p>

                      <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                        {c.indirizzoFatturazione && (
                          <p className="pl-3 border-l-2 border-slate-300">
                            <strong className="text-slate-800">Sede Legale:</strong> {c.indirizzoFatturazione}
                          </p>
                        )}
                        {c.indirizzoSpedizione && (
                          <p className="pl-3 border-l-2 border-blue-400">
                            <strong className="text-blue-700">Spedizione:</strong> {c.indirizzoSpedizione}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span className="flex items-center gap-1 font-bold text-blue-600"><Phone size={12}/> {c.telefono}</span>
                      <span className="flex items-center gap-1 font-semibold"><Mail size={12}/> {c.email}</span>
                    </div>
                  </div>
                ))}

                {customers.length === 0 && (
                  <div className="col-span-full py-20 text-center text-slate-300 font-black uppercase text-sm">
                    Nessun cliente registrato
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 7: BUSINESS INTELLIGENCE */}
          {activeTab === 'stats' && (
            <div className="space-y-8">
              {/* Financial KPI Header Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-3xl border border-blue-200">
                  <p className="text-xs font-black uppercase text-blue-500 mb-1">Portafoglio Ordini Totale</p>
                  <p className="text-3xl font-black text-blue-800">€ {orders.reduce((acc, o) => acc + o.valore, 0).toLocaleString()}</p>
                </div>
                <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-200">
                  <p className="text-xs font-black uppercase text-emerald-600 mb-1">Incassato Registrato Totale</p>
                  <p className="text-3xl font-black text-emerald-800">€ {orders.filter(o => o.incassato).reduce((acc, o) => acc + o.valore, 0).toLocaleString()}</p>
                </div>
              </div>

              {/* Two Widescreen Charts Side by Side */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">Distribuzione Ordini Produzione</h3>
                  <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={analysis.pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={70}
                          outerRadius={95}
                          paddingAngle={6}
                          dataKey="value"
                        >
                          {analysis.pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={['#3b82f6', '#f59e0b', '#10b981', '#8b5cf6'][index % 4]} />
                          ))}
                        </Pie>
                        <RechartsTooltip />
                        <Legend wrapperStyle={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">Top Clienti per Volume Affari (€)</h3>
                  <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={analysis.barData} layout="vertical" margin={{ left: 20, right: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                        <XAxis type="number" hide />
                        <YAxis 
                          dataKey="name" 
                          type="category" 
                          tick={{ fontSize: 10, fontWeight: 800, fill: '#475569' }} 
                          width={120}
                        />
                        <RechartsTooltip 
                          contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                          itemStyle={{ fontSize: '11px', fontWeight: 'bold' }}
                        />
                        <Bar dataKey="value" fill="#3b82f6" radius={[0, 10, 10, 0]} barSize={24} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: GOOGLE WORKSPACE INTEGRATION */}
          {activeTab === 'workspace' && (
            <WorkspaceModule onImportNotification={(msg) => setNotifications(prev => [...prev, { id: Date.now(), msg }])} />
          )}

        </main>
      </div>

      {/* MODAL ARRIVO MERCE */}
      <AnimatePresence>
        {showArrivoMerce && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white p-8 rounded-3xl w-full max-w-lg space-y-6 shadow-2xl"
            >
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <h3 className="font-black text-slate-900 uppercase text-lg">Scarico Merce Fornitore</h3>
                <button onClick={() => setShowArrivoMerce(false)} className="text-slate-400 hover:text-slate-600 p-2"><X size={20}/></button>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-black uppercase text-slate-500">Seleziona Componente</label>
                  <select 
                    className="w-full p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-sm font-bold"
                    value={arrivoData.componentId}
                    onChange={e => setArrivoData({...arrivoData, componentId: e.target.value})}
                  >
                    <option value="">Scegli componente...</option>
                    {inventory.map(i => <option key={i.id} value={i.id}>{i.id} (Giacenza: {i.giacenza})</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-black uppercase text-slate-500">Quantità Ricevuta</label>
                  <input 
                    type="number"
                    placeholder="Q.tà"
                    className="w-full p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-sm font-bold"
                    value={arrivoData.qty || ''}
                    onChange={e => setArrivoData({...arrivoData, qty: parseInt(e.target.value) || 0})}
                  />
                </div>
                <button 
                  onClick={handleArrivoMerce}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white py-4 rounded-xl font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-600/20 active:scale-98 transition-all mt-4 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Package size={18} /> Carica Magazzino
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL NUOVO CLIENTE */}
      <AnimatePresence>
        {showAddCustomer && (
          <div className="fixed inset-0 z-[160] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white p-8 rounded-3xl w-full max-w-xl space-y-5 shadow-2xl"
            >
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <h3 className="text-xl font-black text-slate-900 uppercase">Nuovo Cliente</h3>
                <button onClick={() => setShowAddCustomer(false)} className="text-slate-400 hover:text-slate-600"><X size={20}/></button>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-black uppercase text-slate-500">Ragione Sociale *</label>
                  <input 
                    placeholder="Es. EMILGAS SRL"
                    className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 text-sm font-bold"
                    value={newCustomer.nome}
                    onChange={e => setNewCustomer({...newCustomer, nome: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-black uppercase text-slate-500">Partita IVA</label>
                    <input 
                      placeholder="12345678901"
                      className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 text-sm font-bold"
                      value={newCustomer.piva}
                      onChange={e => setNewCustomer({...newCustomer, piva: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-black uppercase text-slate-500">Codice SDI</label>
                    <input 
                      placeholder="KRRH6B9"
                      className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 text-sm font-bold"
                      value={newCustomer.codiceSDI}
                      onChange={e => setNewCustomer({...newCustomer, codiceSDI: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-black uppercase text-slate-500">Sede Legale / Fatturazione</label>
                  <input 
                    placeholder="Via dell'Industria 12, Bologna"
                    className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 text-sm font-bold"
                    value={newCustomer.indirizzoFatturazione}
                    onChange={e => setNewCustomer({...newCustomer, indirizzoFatturazione: e.target.value})}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-black uppercase text-slate-500">Indirizzo di Spedizione (lascia vuoto se uguale alla sede)</label>
                  <input 
                    placeholder="Via dell'Industria 12, Bologna"
                    className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 text-sm font-bold"
                    value={newCustomer.indirizzoSpedizione}
                    onChange={e => setNewCustomer({...newCustomer, indirizzoSpedizione: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-black uppercase text-slate-500">Città</label>
                    <input 
                      placeholder="Bologna"
                      className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 text-sm font-bold"
                      value={newCustomer.citta}
                      onChange={e => setNewCustomer({...newCustomer, citta: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-black uppercase text-slate-500">Telefono</label>
                    <input 
                      placeholder="051 123456"
                      className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 text-sm font-bold"
                      value={newCustomer.telefono}
                      onChange={e => setNewCustomer({...newCustomer, telefono: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-black uppercase text-slate-500">Email</label>
                    <input 
                      type="email"
                      placeholder="info@cliente.it"
                      className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 text-sm font-bold"
                      value={newCustomer.email}
                      onChange={e => setNewCustomer({...newCustomer, email: e.target.value})}
                    />
                  </div>
                </div>

                <button 
                  onClick={handleAddCustomer}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-black uppercase tracking-wider shadow-lg shadow-blue-600/20 active:scale-98 transition-all cursor-pointer mt-2"
                >
                  Salva Cliente
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL CREA ORDINE */}
      <AnimatePresence>
        {showAddOrder && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white p-8 rounded-3xl w-full max-w-xl space-y-5 shadow-2xl"
            >
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <h3 className="font-black text-slate-900 uppercase text-lg">Crea Nuovo Ordine Produzione</h3>
                <button onClick={() => setShowAddOrder(false)} className="text-slate-400 hover:text-slate-600"><X size={20}/></button>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-black uppercase text-slate-500">Cliente *</label>
                  <select 
                    className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 text-sm font-bold"
                    value={newOrder.clienteId}
                    onChange={e => {
                      const clienteId = e.target.value;
                      // Ricalcola il prezzo con lo sconto del cliente (o listino privati)
                      const prezzo = prezzoListino(newOrder.modello, false, scontoAggiuntivoPerCliente(clienteId), isClientePrivato(clienteId));
                      setNewOrder({
                        ...newOrder,
                        clienteId,
                        prezzoUnitario: prezzo ?? newOrder.prezzoUnitario
                      });
                    }}
                  >
                    <option value="">Seleziona cliente...</option>
                    {customers.map(c => <option key={c.id} value={c.nome}>{c.nome}</option>)}
                  </select>
                  <button 
                    onClick={() => { setShowAddOrder(false); setActiveTab('clienti'); setShowAddCustomer(true); }} 
                    className="text-xs font-bold text-blue-600 uppercase hover:underline mt-1 inline-block"
                  >
                    + Aggiungi Nuovo Cliente
                  </button>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-black uppercase text-slate-500">Modello Serbatoio *</label>
                  <select 
                    className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 text-sm font-bold"
                    value={newOrder.modello}
                    onChange={e => {
                      const modello = e.target.value;
                      // Propone in automatico il prezzo del Listino 2026 con lo
                      // sconto aggiuntivo del cliente selezionato (modificabile)
                      const prezzo = prezzoListino(modello, false, scontoAggiuntivoPerCliente(newOrder.clienteId), isClientePrivato(newOrder.clienteId));
                      setNewOrder({
                        ...newOrder,
                        modello,
                        prezzoUnitario: prezzo ?? newOrder.prezzoUnitario
                      });
                    }}
                  >
                    {Object.keys(dibaAttiva).sort().map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-black uppercase text-slate-500">Prezzo Unitario (€) *</label>
                    <input 
                      type="number"
                      placeholder="Prezzo"
                      className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 text-sm font-bold"
                      value={newOrder.prezzoUnitario || ''}
                      onChange={e => setNewOrder({...newOrder, prezzoUnitario: parseFloat(e.target.value) || 0})}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-black uppercase text-slate-500">Quantità Pezzi *</label>
                    <input 
                      type="number"
                      placeholder="Q.tà"
                      className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 text-sm font-bold"
                      value={newOrder.quantita || ''}
                      onChange={e => setNewOrder({...newOrder, quantita: parseInt(e.target.value) || 0})}
                    />
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200 flex justify-between items-center">
                  <span className="text-xs font-black uppercase text-blue-600">Totale Calcolato Ordine</span>
                  <span className="text-lg font-black text-blue-900">€ {(newOrder.prezzoUnitario * newOrder.quantita).toLocaleString()}</span>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-black uppercase text-slate-500">Condizioni di Pagamento</label>
                  <select 
                    className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 text-sm font-bold"
                    value={newOrder.metodoPagamento}
                    onChange={e => setNewOrder({...newOrder, metodoPagamento: e.target.value})}
                  >
                    <option value="Rimessa Diretta">Rimessa Diretta</option>
                    <option value="Pagamento anticipato">Pagamento anticipato</option>
                    <option value="Pagamento a 30 gg">Pagamento a 30 gg</option>
                    <option value="Pagamento a 60 gg">Pagamento a 60 gg</option>
                    <option value="Pagamento a 90 gg">Pagamento a 90 gg</option>
                    <option value="Pagamento tre rate 30,60,90">Pagamento tre rate 30,60,90</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-black uppercase text-slate-500">Note per l'Officina</label>
                  <textarea 
                    placeholder="Specifiche tecniche o istruzioni speciali..."
                    className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 text-sm font-bold h-20 resize-none"
                    value={newOrder.note}
                    onChange={e => setNewOrder({...newOrder, note: e.target.value})}
                  />
                </div>

                <button 
                  onClick={handleAddOrder}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-black uppercase tracking-wider shadow-lg shadow-blue-600/20 active:scale-98 transition-all cursor-pointer"
                >
                  Crea Ordine In Produzione
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

// Sidebar Button Helper Component
interface SidebarBtnProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  badge?: string;
  badgeColor?: string;
  onClick: () => void;
}

function SidebarBtn({ icon, label, active, badge, badgeColor = 'bg-blue-600', onClick }: SidebarBtnProps) {
  return (
    <button 
      onClick={onClick} 
      className={`w-full flex items-center justify-between p-3.5 rounded-2xl font-bold text-sm transition-all cursor-pointer ${
        active 
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
          : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
      }`}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span>{label}</span>
      </div>
      {badge && (
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase text-white ${active ? 'bg-white/20' : badgeColor}`}>
          {badge}
        </span>
      )}
    </button>
  );
}
