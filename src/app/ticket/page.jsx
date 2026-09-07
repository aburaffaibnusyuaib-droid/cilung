'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  CheckCircle2, Clock, Flame, Receipt, 
  ChevronRight, Store, Sparkles, AlertCircle
} from 'lucide-react';

/* ================= VECTOR INSTAGRAM ICON ================= */
const InstagramIcon = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

function TicketContent() {
  const searchParams = useSearchParams();
  const targetId = searchParams.get('id');

  const [isMounted, setIsMounted] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  useEffect(() => {
    setIsMounted(true);

    const syncTicketData = () => {
      try {
        const historyOrders = JSON.parse(localStorage.getItem('siboy_order_history') || '[]');
        const kitchenOrders = JSON.parse(localStorage.getItem('siboy_kitchen_orders') || '[]');

        if (historyOrders.length === 0) {
          setCurrentOrder(null);
          return;
        }

        // Cari berdasarkan ID spesifik dari URL, atau default ke pesanan terbaru
        const matchedHistory = targetId 
          ? historyOrders.find(h => h.id === targetId) 
          : historyOrders[0];

        if (!matchedHistory) {
          setCurrentOrder(null);
          return;
        }

        // Cek status real-time pesanan tersebut di dapur
        const activeInKitchen = kitchenOrders.find(k => k.id === matchedHistory.id);

        let liveStatus = 'ready'; // Default siap diambil jika sudah selesai/diangkat dari dapur
        let liveQueue = '#01';

        if (activeInKitchen) {
          liveStatus = activeInKitchen.status; // 'pending' | 'cooking'
          liveQueue = activeInKitchen.qNo || '#01';
        }

        setCurrentOrder({
          ...matchedHistory,
          status: liveStatus,
          queueNumber: liveQueue
        });
      } catch (e) {}
    };

    syncTicketData();
    window.addEventListener('storage', syncTicketData);
    return () => window.removeEventListener('storage', syncTicketData);
  }, [targetId]);

  const statusConfig = {
    pending: {
      bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-800', 
      iconBg: 'bg-amber-500', icon: <Clock className="w-5 h-5 text-white animate-pulse" />,
      title: 'Antrean Masuk', desc: 'Menunggu koki meracik'
    },
    cooking: {
      bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', 
      iconBg: 'bg-blue-500', icon: <Flame className="w-5 h-5 text-white animate-bounce" />,
      title: 'Sedang Dimasak', desc: 'Takoyaki sedang di wajan'
    },
    ready: {
      bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-800', 
      iconBg: 'bg-emerald-500', icon: <CheckCircle2 className="w-5 h-5 text-white" />,
      title: 'Pesanan Siap!', desc: 'Silakan ambil di kasir'
    }
  };

  if (!isMounted) return null;

  if (!currentOrder) {
    return (
      <div className="min-h-screen bg-slate-200 flex justify-center items-center p-4">
        <div className="w-full max-w-[420px] bg-white rounded-3xl p-8 text-center shadow-xl">
          <Store className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h2 className="text-lg font-black text-slate-800 uppercase">Pesanan Tidak Ditemukan</h2>
          <p className="text-xs text-slate-400 mt-1">
            {targetId ? `Transaksi dengan kode "${targetId}" tidak ditemukan.` : 'Belum ada transaksi di kasir.'}
          </p>
        </div>
      </div>
    );
  }

  const activeTheme = statusConfig[currentOrder.status] || statusConfig.pending;

  return (
    <div className="min-h-screen bg-slate-200 flex justify-center items-start sm:items-center sm:p-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div className="w-full max-w-[480px] bg-[#faf9f6] h-[100dvh] sm:h-auto sm:max-h-[90vh] sm:rounded-[2rem] sm:shadow-2xl relative flex flex-col overflow-hidden">
        
        {/* Background Grid */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-40" style={{ backgroundSize: '24px 24px', backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)' }} />

        {/* HEADER BRAND */}
        <div className="pt-6 pb-3 px-5 sm:px-6 flex items-center gap-3 relative z-10 shrink-0">
          <div className="w-10 h-10 bg-red-600 text-white rounded-xl flex items-center justify-center shadow-md">
            <Store className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-black uppercase tracking-tight text-slate-800 leading-none" style={{ fontFamily: "'Montserrat', sans-serif" }}>SIBOY<span className="text-amber-500">POS</span></h1>
            <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mt-0.5">Live E-Receipt & Order Tracker</p>
          </div>
        </div>

        <div className="flex-1 flex flex-col p-4 sm:px-6 pt-2 relative z-10 overflow-hidden">
          
          {/* 1. KARTU ANTREAN & STATUS DINAMIS */}
          <div className={`rounded-2xl p-4 border-2 transition-all duration-500 flex items-center justify-between mb-4 shrink-0 shadow-sm ${activeTheme.bg} ${activeTheme.border}`}>
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest opacity-60 mb-0.5">No. Antrean</p>
              <h2 className={`text-4xl font-black tracking-tighter leading-none ${activeTheme.text}`}>{currentOrder.queueNumber}</h2>
            </div>
            <div className="flex items-center gap-3 text-right">
              <div>
                <h3 className={`text-xs font-black uppercase tracking-wider ${activeTheme.text}`}>{activeTheme.title}</h3>
                <p className={`text-[10px] font-bold opacity-70 ${activeTheme.text}`}>{activeTheme.desc}</p>
              </div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-inner shrink-0 ${activeTheme.iconBg}`}>
                {activeTheme.icon}
              </div>
            </div>
          </div>

          {/* 2. STRUK RINCIAN PESANAN */}
          <div className="bg-white rounded-2xl border-2 border-slate-100 shadow-sm flex flex-col flex-1 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 border-t-[3px] border-dashed border-slate-200"></div>

            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 shrink-0">
              <div className="flex items-center gap-2">
                <Receipt className="w-4 h-4 text-slate-400" />
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-700">Rincian Belanja</h4>
              </div>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{currentOrder.id} • {currentOrder.time}</span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 [&::-webkit-scrollbar]:hidden">
              {currentOrder.items && Array.isArray(currentOrder.items) ? (
                currentOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start pb-2.5 border-b border-slate-50 last:border-0">
                    <div className="flex-1 pr-3">
                      <p className="text-xs font-black text-slate-900 leading-none mb-1">{item.qty}x {item.name}</p>
                      <p className="text-[9px] font-bold text-slate-500 leading-relaxed">
                        Topping: {item.toppings} <br />
                        {item.veg} • {item.spicy}
                      </p>
                    </div>
                    <span className="text-xs font-black text-slate-800 whitespace-nowrap">
                      Rp {(item.price * item.qty).toLocaleString('id-ID')}
                    </span>
                  </div>
                ))
              ) : (
                <div className="flex justify-between items-start">
                  <div className="flex-1 pr-3">
                    <p className="text-xs font-black text-slate-900 leading-none mb-1">{currentOrder.type}</p>
                    <p className="text-[9px] font-bold text-slate-500 leading-relaxed">
                      Topping: {currentOrder.toppings || '-'} <br />
                      {currentOrder.veg} • {currentOrder.spicy}
                    </p>
                  </div>
                  <span className="text-xs font-black text-slate-800 whitespace-nowrap">{currentOrder.total}</span>
                </div>
              )}
            </div>

            <div className="p-4 bg-slate-50 border-t border-dashed border-slate-200 shrink-0">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1">Total Lunas</p>
                  <div className="inline-flex items-center gap-1 bg-emerald-100/50 border border-emerald-200 px-1.5 py-0.5 rounded text-[8px] font-black text-emerald-700 uppercase">
                    <CheckCircle2 className="w-2.5 h-2.5" /> LUNAS ({currentOrder.pay})
                  </div>
                </div>
                <p className="text-xl font-black text-slate-900 tracking-tight">
                  {currentOrder.total}
                </p>
              </div>
            </div>
          </div>

          {/* 3. PROMO INSTAGRAM */}
          <a 
            href="https://instagram.com/takoyakisiboy" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="mt-4 block bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-xl p-[2px] shadow-sm hover:scale-[1.02] transition-transform active:scale-95 cursor-pointer shrink-0"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-[10px] px-4 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-pink-600 shadow-inner">
                  <InstagramIcon className="w-3.5 h-3.5" />
                </div>
                <p className="text-[10px] font-black text-white tracking-widest uppercase">Follow @TakoyakiSiboy</p>
              </div>
              <ChevronRight className="w-4 h-4 text-white/70" />
            </div>
          </a>

          <div className="text-center pt-3 pb-1 shrink-0">
            <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-1">
              Powered by Siboy POS <Sparkles className="w-2.5 h-2.5 text-amber-400" />
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function TicketTracker() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">Memuat Karcis...</div>}>
      <TicketContent />
    </Suspense>
  );
}