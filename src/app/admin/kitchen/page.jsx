'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Bell, BellOff, Flame, CheckCircle2, RotateCcw, AlertTriangle, Clock, Menu
} from 'lucide-react';

import AdminSidebar from '@/components/AdminSidebar';

// DATA CADANGAN AWAL (JIKA STORAGE KOSONG)
const DEFAULT_KITCHEN_ORDERS = [
  { id: 'SB-101', qNo: '#01', time: '13:15', timer: '8 Menit', status: 'cooking', name: 'Budi Santoso', type: 'Porsi Besar (10 pcs)', toppings: 'Keju Mozza, Sosis', veg: 'Kol & Daun Bawang', spicy: 'Pedas Sedang (Lv 2)', note: '' },
  { id: 'SB-102', qNo: '#02', time: '13:20', timer: '3 Menit', status: 'pending', name: 'Siti Rahma', type: 'Porsi Special (15 pcs)', toppings: 'Katsuobushi', veg: 'Tanpa Sayur', spicy: 'Tidak Pedas', note: 'Katsuobushi pisah di plastik' },
  { id: 'SB-104', qNo: '#03', time: '13:40', timer: 'Baru Masuk', status: 'pending', name: 'Anisa', type: 'Porsi Besar (10 pcs)', toppings: 'Crabstick', veg: 'Kol Saja', spicy: 'Pedas Sedang (Lv 3)', note: '' },
  { id: 'SB-105', qNo: '#04', time: '14:05', timer: 'Baru Masuk', status: 'pending', name: 'Mikel', type: 'Porsi Sedang (7 pcs)', toppings: 'Sosis', veg: 'Full Sayur', spicy: 'Tidak Pedas', note: '' },
];

export default function KitchenView() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  
  // State Pesanan KDS Terpusat
  const [orders, setOrders] = useState([]);
  
  // State untuk Fitur Undo (Toast Notification)
  const [toastMessage, setToastMessage] = useState(null);
  const [lastFinishedOrder, setLastFinishedOrder] = useState(null);

  // Inisialisasi Auth & Sinkronisasi Data Dinamis
  useEffect(() => {
    setIsMounted(true);
    const auth = localStorage.getItem('admin_auth');
    if (!auth) router.push('/admin/login');

    const loadOrders = () => {
      try {
        const saved = localStorage.getItem('siboy_kitchen_orders');
        if (saved) {
          setOrders(JSON.parse(saved));
        } else {
          setOrders(DEFAULT_KITCHEN_ORDERS);
          localStorage.setItem('siboy_kitchen_orders', JSON.stringify(DEFAULT_KITCHEN_ORDERS));
        }
      } catch (e) {
        setOrders(DEFAULT_KITCHEN_ORDERS);
      }
    };

    loadOrders();
    window.addEventListener('storage', loadOrders);
    return () => window.removeEventListener('storage', loadOrders);
  }, [router]);

  // Simpan Perubahan ke Storage & Broadcast ke Tab Lain
  const updateOrdersState = (newOrders) => {
    setOrders(newOrders);
    localStorage.setItem('siboy_kitchen_orders', JSON.stringify(newOrders));
    window.dispatchEvent(new Event('storage'));
  };

  // ================= FUNGSI ALUR KERJA (FLOW) =================
  const moveToCooking = (id) => {
    const updated = orders.map(o => o.id === id ? { ...o, status: 'cooking' } : o);
    updateOrdersState(updated);
  };

  const finishOrder = (order) => {
    const updated = orders.filter(o => o.id !== order.id);
    updateOrdersState(updated);
    
    setLastFinishedOrder(order);
    setToastMessage(`Pesanan ${order.qNo} (${order.name}) Selesai!`);
    
    setTimeout(() => {
      setToastMessage(null);
      setLastFinishedOrder(null);
    }, 5000);
  };

  const undoFinish = () => {
    if (lastFinishedOrder) {
      const restored = [...orders, lastFinishedOrder].sort((a, b) => a.qNo.localeCompare(b.qNo));
      updateOrdersState(restored);
      setToastMessage(null);
      setLastFinishedOrder(null);
    }
  };

  const pendingOrders = orders.filter(o => o.status === 'pending');
  const cookingOrders = orders.filter(o => o.status === 'cooking');

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-[#faf9f6] text-slate-900 relative pb-24 overflow-x-hidden" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      
      <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundSize: '32px 32px', backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.04) 1px, transparent 1px)' }} />

      <div className={`max-w-[1600px] mx-auto px-3 sm:px-6 pt-4 sm:pt-6 relative z-10 transition-all duration-300 ${isSidebarOpen ? 'opacity-40 blur-sm pointer-events-none' : ''}`}>
        
        {/* ================= COMPACT HEADER ================= */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl border-2 border-slate-100 p-3 sm:px-5 shadow-sm flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <button 
              type="button"
              onClick={() => setIsSidebarOpen(true)} 
              className="w-12 h-12 bg-white text-amber-500 hover:bg-amber-50 border-2 border-slate-100 hover:border-amber-200 rounded-2xl transition-all flex items-center justify-center shadow-sm cursor-pointer active:scale-95"
            >
              <Menu className="w-6 h-6 stroke-[2.5]" />
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
              type="button"
              onClick={() => setIsSoundEnabled(!isSoundEnabled)} 
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 transition-all cursor-pointer shadow-sm ${isSoundEnabled ? 'bg-indigo-50 text-indigo-600 border-indigo-200 hover:bg-indigo-100' : 'bg-slate-50 text-slate-400 border-slate-200 hover:bg-slate-100'}`}
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
                    <div className={`flex items-center gap-1 text-[10px] font-black uppercase px-2 py-1 rounded-md border-2 ${order.timer.includes('Menit') && parseInt(order.timer) > 5 ? 'bg-red-50 text-red-600 border-red-200 animate-pulse' : 'bg-slate-50 text-slate-500 border-slate-200'}`}>
                      <Clock className="w-3 h-3" /> {order.timer}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-black text-slate-900 leading-tight mb-1">{order.type}</h3>
                    <p className="text-xs font-bold text-slate-500">Atas Nama: <span className="text-slate-800 uppercase font-black">{order.name}</span></p>
                  </div>

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

                  <button 
                    type="button"
                    onClick={() => moveToCooking(order.id)} 
                    className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black uppercase tracking-widest py-3.5 rounded-xl transition-colors shadow-[0_4px_15px_rgb(79,70,229,0.3)] cursor-pointer active:scale-[0.98]"
                  >
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
                    <p className="text-xs font-bold text-slate-500">Atas Nama: <span className="text-slate-800 uppercase font-black">{order.name}</span></p>
                  </div>

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

                  <button 
                    type="button"
                    onClick={() => finishOrder(order)} 
                    className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black uppercase tracking-widest py-3.5 rounded-xl transition-colors shadow-[0_4px_15px_rgb(16,185,129,0.3)] cursor-pointer active:scale-[0.98]"
                  >
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

      {/* ================= SIDEBAR GLOBAL ================= */}
      <AdminSidebar 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
      />

    </div>
  );
}