'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Menu, X, LayoutDashboard, ChefHat, ClipboardList, Ticket, Settings2, LogOut, 
  Store, Bell, BellOff, Flame, CheckCircle2, RotateCcw, AlertTriangle, Clock
} from 'lucide-react';

export default function KitchenView() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  
  // State untuk Fitur Undo (Toast Notification)
  const [toastMessage, setToastMessage] = useState(null);
  const [lastFinishedOrder, setLastFinishedOrder] = useState(null);

  useEffect(() => {
    setIsMounted(true);
    const auth = localStorage.getItem('admin_auth');
    if (!auth) router.push('/admin/login');
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    router.push('/');
  };

  // ================= DATA MOCKUP KDS =================
  const [orders, setOrders] = useState([
    { id: 'SB-101', qNo: '#01', time: '13:15', timer: '8 Menit', status: 'cooking', name: 'Budi Santoso', type: 'Porsi Besar (10 pcs)', toppings: 'Keju Mozza, Sosis', veg: 'Kol & Daun Bawang', spicy: 'Pedas Sedang (Lv 2)', note: '' },
    { id: 'SB-102', qNo: '#02', time: '13:20', timer: '3 Menit', status: 'pending', name: 'Siti Rahma', type: 'Porsi Special (15 pcs)', toppings: 'Katsuobushi', veg: 'Tanpa Sayur', spicy: 'Tidak Pedas', note: 'Katsuobushi pisah di plastik' },
    { id: 'SB-104', qNo: '#03', time: '13:40', timer: 'Baru Masuk', status: 'pending', name: 'Anisa', type: 'Porsi Besar (10 pcs)', toppings: 'Crabstick', veg: 'Kol Saja', spicy: 'Pedas Sedang (Lv 3)', note: '' },
    { id: 'SB-105', qNo: '#04', time: '14:05', timer: 'Baru Masuk', status: 'pending', name: 'Mikel', type: 'Porsi Sedang (7 pcs)', toppings: 'Sosis', veg: 'Full Sayur', spicy: 'Tidak Pedas', note: '' },
  ]);

  // ================= FUNGSI ALUR KERJA (FLOW) =================
  const moveToCooking = (id) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: 'cooking' } : o));
  };

  const finishOrder = (order) => {
    setOrders(orders.filter(o => o.id !== order.id));
    setLastFinishedOrder(order);
    setToastMessage(`Pesanan ${order.qNo} (${order.name}) Selesai!`);
    
    // Auto-hide toast setelah 5 detik
    setTimeout(() => {
      setToastMessage(null);
      setLastFinishedOrder(null);
    }, 5000);
  };

  const undoFinish = () => {
    if (lastFinishedOrder) {
      setOrders([...orders, lastFinishedOrder].sort((a, b) => a.qNo.localeCompare(b.qNo)));
      setToastMessage(null);
      setLastFinishedOrder(null);
    }
  };

  // Filter Data per Kolom
  const pendingOrders = orders.filter(o => o.status === 'pending');
  const cookingOrders = orders.filter(o => o.status === 'cooking');

  return (
    <div className="min-h-screen bg-[#faf9f6] text-slate-900 relative pb-24 overflow-x-hidden" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      
      <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundSize: '32px 32px', backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.04) 1px, transparent 1px)' }} />

      <div className={`max-w-[1600px] mx-auto px-3 sm:px-6 pt-4 sm:pt-6 relative z-10 transition-all duration-300 ${isSidebarOpen ? 'opacity-40 blur-sm pointer-events-none' : ''}`}>
        
        {/* ================= COMPACT HEADER ================= */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl border-2 border-slate-100 p-3 sm:px-5 shadow-sm flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsSidebarOpen(true)} className="w-10 h-10 bg-white text-red-600 hover:bg-red-50 border-2 border-slate-100 hover:border-red-200 rounded-xl transition-all flex flex-col items-center justify-center gap-1 shadow-sm active:scale-95 cursor-pointer group">
              <span className="w-4 h-0.5 bg-red-600 rounded-full transition-all group-hover:w-5" />
              <span className="w-3 h-0.5 bg-red-600 rounded-full transition-all group-hover:w-5" />
              <span className="w-4 h-0.5 bg-red-600 rounded-full transition-all group-hover:w-5" />
            </button>
            <div>
              <h1 className="text-lg sm:text-2xl font-black uppercase tracking-tight text-slate-800 leading-none" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                KITCHEN <span className="text-amber-500">VIEW</span>
              </h1>
              <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 mt-0.5">Sistem Monitor Dapur (KDS)</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSoundEnabled(!isSoundEnabled)} 
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all cursor-pointer shadow-sm ${isSoundEnabled ? 'bg-indigo-50 text-indigo-600 border-indigo-200' : 'bg-slate-50 text-slate-400 border-slate-200'}`}
              title="Notifikasi Suara Dapur"
            >
              {isSoundEnabled ? <Bell className="w-4 h-4 animate-pulse" /> : <BellOff className="w-4 h-4" />}
              <span className="hidden sm:block">{isSoundEnabled ? 'Suara Aktif' : 'Suara Mati'}</span>
            </button>
          </div>
        </div>

        {/* ================= KANBAN BOARD (2 KOLOM) ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          
          {/* KOLOM 1: ANTREAN MASUK */}
          <div className="bg-slate-100/50 rounded-3xl p-4 sm:p-5 border-2 border-slate-200/60 min-h-[500px]">
            <div className="flex items-center justify-between mb-4 border-b-2 border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-slate-400 animate-pulse"></span>
                <h2 className="text-sm font-black uppercase tracking-widest text-slate-700">Antrean Masuk</h2>
              </div>
              <span className="bg-white text-slate-800 text-[10px] font-black px-2.5 py-1 rounded-lg border-2 border-slate-200 shadow-sm">{pendingOrders.length} Pesanan</span>
            </div>
            
            <div className="space-y-4">
              {pendingOrders.length === 0 && <p className="text-center text-sm font-bold text-slate-400 mt-10">Tidak ada antrean baru.</p>}
              {pendingOrders.map(order => (
                <div key={order.id} className="bg-white border-l-4 border-l-slate-400 border-y-2 border-r-2 border-slate-100 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-3 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl font-black text-slate-800 tracking-tighter leading-none">{order.qNo}</span>
                      <div>
                        <span className="text-[10px] font-black text-slate-400 block mb-0.5">{order.id}</span>
                        <span className="text-xs font-bold text-slate-600">{order.time} WIB</span>
                      </div>
                    </div>
                    {/* SLA Timer Badge */}
                    <div className={`flex items-center gap-1 text-[10px] font-black uppercase px-2 py-1 rounded-md border ${order.timer.includes('Menit') && parseInt(order.timer) > 5 ? 'bg-red-50 text-red-600 border-red-200 animate-pulse' : 'bg-slate-50 text-slate-500 border-slate-200'}`}>
                      <Clock className="w-3 h-3" /> {order.timer}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-black text-slate-900 leading-tight mb-1">{order.type}</h3>
                    <p className="text-xs font-bold text-slate-500">Atas Nama: <span className="text-slate-800 uppercase">{order.name}</span></p>
                  </div>

                  {/* Modifiers Badges (Jelas & Terbaca) */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    <span className="inline-flex text-[10px] font-black uppercase bg-slate-100 text-slate-600 border border-slate-200 px-2.5 py-1 rounded-lg">
                      Topping: {order.toppings}
                    </span>
                    <span className="inline-flex text-[10px] font-black uppercase bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-lg">
                      Sayur: {order.veg}
                    </span>
                    <span className="inline-flex text-[10px] font-black uppercase bg-red-50 text-red-700 border border-red-200 px-2.5 py-1 rounded-lg">
                      Level: {order.spicy}
                    </span>
                    {order.note && (
                      <span className="inline-flex items-center gap-1 w-full mt-1 text-[10px] font-black uppercase bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1.5 rounded-lg">
                        <AlertTriangle className="w-3.5 h-3.5" /> CATATAN: {order.note}
                      </span>
                    )}
                  </div>

                  <button onClick={() => moveToCooking(order.id)} className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black uppercase tracking-widest py-3 rounded-xl transition-colors shadow-[0_4px_15px_rgb(79,70,229,0.3)] cursor-pointer active:scale-95">
                    <Flame className="w-4 h-4" /> Mulai Masak
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* KOLOM 2: SEDANG DIMASAK */}
          <div className="bg-amber-50/50 rounded-3xl p-4 sm:p-5 border-2 border-amber-200/50 min-h-[500px]">
            <div className="flex items-center justify-between mb-4 border-b-2 border-amber-200 pb-3">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-500" />
                <h2 className="text-sm font-black uppercase tracking-widest text-amber-700">Sedang Dimasak</h2>
              </div>
              <span className="bg-amber-500 text-white text-[10px] font-black px-2.5 py-1 rounded-lg shadow-sm">{cookingOrders.length} Wajan</span>
            </div>
            
            <div className="space-y-4">
              {cookingOrders.length === 0 && <p className="text-center text-sm font-bold text-amber-400 mt-10">Belum ada yang dimasak.</p>}
              {cookingOrders.map(order => (
                <div key={order.id} className="bg-white border-l-4 border-l-amber-500 border-y-2 border-r-2 border-amber-100 rounded-2xl p-4 sm:p-5 shadow-md transition-all">
                  <div className="flex justify-between items-start mb-3 border-b border-amber-100 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl font-black text-amber-600 tracking-tighter leading-none">{order.qNo}</span>
                      <div>
                        <span className="text-[10px] font-black text-amber-400 block mb-0.5">{order.id}</span>
                        <span className="text-xs font-bold text-slate-600">{order.time} WIB</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-black text-slate-900 leading-tight mb-1">{order.type}</h3>
                    <p className="text-xs font-bold text-slate-500">Atas Nama: <span className="text-slate-800 uppercase">{order.name}</span></p>
                  </div>

                  {/* Modifiers Badges */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    <span className="inline-flex text-[10px] font-black uppercase bg-slate-100 text-slate-600 border border-slate-200 px-2.5 py-1 rounded-lg">Topping: {order.toppings}</span>
                    <span className="inline-flex text-[10px] font-black uppercase bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-lg">Sayur: {order.veg}</span>
                    <span className="inline-flex text-[10px] font-black uppercase bg-red-50 text-red-700 border border-red-200 px-2.5 py-1 rounded-lg">Level: {order.spicy}</span>
                    {order.note && (
                      <span className="inline-flex items-center gap-1 w-full mt-1 text-[10px] font-black uppercase bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1.5 rounded-lg">
                        <AlertTriangle className="w-3.5 h-3.5" /> CATATAN: {order.note}
                      </span>
                    )}
                  </div>

                  <button onClick={() => finishOrder(order)} className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black uppercase tracking-widest py-3 rounded-xl transition-colors shadow-[0_4px_15px_rgb(16,185,129,0.3)] cursor-pointer active:scale-95">
                    <CheckCircle2 className="w-4 h-4" /> Angkat & Selesai
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ================= UNDO TOAST NOTIFICATION ================= */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-4 animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-bold">{toastMessage}</span>
          <div className="w-px h-5 bg-slate-700 mx-1"></div>
          <button onClick={undoFinish} className="flex items-center gap-1.5 text-xs font-black uppercase text-amber-400 hover:text-amber-300 transition-colors cursor-pointer">
            <RotateCcw className="w-3.5 h-3.5" /> Batal (Undo)
          </button>
        </div>
      )}

      {/* ================= DRAWER PANEL KIRI ================= */}
      {isSidebarOpen && <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 transition-opacity" onClick={() => setIsSidebarOpen(false)} />}
      <div className={`fixed top-0 left-0 h-full w-[280px] bg-[#fdfcf9] shadow-2xl z-[60] transform transition-transform duration-300 ease-out flex flex-col border-r border-slate-200 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center border border-red-100 shadow-sm">
               <Store className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black uppercase text-slate-800 tracking-tight leading-none" style={{ fontFamily: "'Montserrat', sans-serif" }}>SIBOY<span className="text-amber-500">POS</span></h2>
              <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mt-1">Gerobak Digital</p>
            </div>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-3 mb-3">Navigasi Utama</p>
          
          <button onClick={() => { setIsSidebarOpen(false); router.push('/admin'); }} className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-slate-600 hover:bg-red-50 hover:text-red-600 font-bold text-sm transition-all cursor-pointer group">
            <LayoutDashboard className="w-5 h-5 text-slate-400 group-hover:text-red-500 transition-colors" /> Dashboard
          </button>
          
          {/* ACTIVE STATE: KITCHEN VIEW (Amber Theme) */}
          <button onClick={() => { setIsSidebarOpen(false); }} className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl bg-amber-500 text-white font-black text-sm shadow-[0_4px_20px_rgb(245,158,11,0.3)] transition-all cursor-pointer group">
            <div className="flex items-center gap-3">
              <ChefHat className="w-5 h-5" /> Kitchen View
            </div>
            <span className="bg-amber-400 text-amber-900 text-[10px] font-black px-2 py-0.5 rounded-lg shadow-inner">{pendingOrders.length} Antre</span>
          </button>

          <button onClick={() => { setIsSidebarOpen(false); router.push('/admin/orders'); }} className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 font-bold text-sm transition-all cursor-pointer group mt-2">
            <ClipboardList className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 transition-colors" /> Order History
          </button>

          <button onClick={() => { setIsSidebarOpen(false); window.open('/ticket', '_blank'); }} className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 font-bold text-sm transition-all cursor-pointer group mt-2 border border-transparent hover:border-emerald-100">
            <Ticket className="w-5 h-5 text-slate-400 group-hover:text-emerald-500 transition-colors" /> Demo Karcis HP
          </button>
        </div>

        <div className="p-5 border-t border-slate-100 bg-slate-50/50 space-y-3">
          <button onClick={() => { setIsSidebarOpen(false); router.push('/admin'); }} className="w-full flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 hover:border-slate-300 hover:text-slate-900 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-sm cursor-pointer hover:-translate-y-0.5">
            <Settings2 className="w-4 h-4" /> Atur Stok Topping
          </button>
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 bg-transparent border border-transparent text-slate-500 hover:bg-red-50 hover:border-red-100 hover:text-red-600 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer">
            <LogOut className="w-4 h-4" /> Keluar Akun
          </button>
        </div>

      </div>

    </div>
  );
}