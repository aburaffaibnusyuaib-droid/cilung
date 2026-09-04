'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle2, BellRing, Utensils } from 'lucide-react';

export default function TicketPage() {
  // Simulasi: Anggap pembeli ini memegang tiket untuk Order SB-101
  const orderId = 'SB-101'; 
  const orderNo = '01';
  
  const [status, setStatus] = useState('dimasak'); 
  const [notifGranted, setNotifGranted] = useState(false);

  // Minta Izin Notifikasi Web
  const requestNotification = () => {
    if (!("Notification" in window)) {
      alert("Browser ini tidak mendukung notifikasi web.");
      return;
    }
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") setNotifGranted(true);
    });
  };

  useEffect(() => {
    if ("Notification" in window && Notification.permission === "granted") {
      setNotifGranted(true);
    }
  }, []);

  // Polling LocalStorage (Sebagai mock Real-Time Database)
  useEffect(() => {
    const interval = setInterval(() => {
      const dbStatus = localStorage.getItem(`order_status_${orderId}`);
      if (dbStatus === 'selesai' && status !== 'selesai') {
        setStatus('selesai');
        triggerNotification();
      }
    }, 1000); // Cek setiap detik

    return () => clearInterval(interval);
  }, [status]);

  const triggerNotification = () => {
    if (notifGranted) {
      new Notification("Takoyaki Siboy - Pesanan Selesai! 🎉", {
        body: `Pesanan #${orderNo} sudah matang dan hangat. Silakan ambil di gerobak!`,
      });
    }
  };

  return (
    <div className={`min-h-screen flex flex-col justify-center items-center p-4 transition-colors duration-1000 ${status === 'selesai' ? 'bg-emerald-500' : 'bg-[#070a11]'}`} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      
      <div className="w-full max-w-sm bg-white rounded-[2rem] p-8 shadow-2xl relative overflow-hidden transition-all duration-500 hover:-translate-y-2">
        
        {/* Ornamen Potongan Karcis */}
        <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-inherit rounded-full"></div>
        <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-inherit rounded-full"></div>
        <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 border-t-2 border-dashed border-slate-200"></div>

        <div className="text-center pb-10">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-2">Tiket Antrean</h2>
          <span className="text-6xl font-black tracking-tighter text-slate-900 block" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            #{orderNo}
          </span>
          <p className="text-sm font-bold text-slate-500 mt-1">{orderId}</p>
        </div>

        <div className="text-center pt-10">
          {status === 'dimasak' ? (
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mb-4 animate-bounce">
                <Utensils className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>Sedang Dimasak</h3>
              <p className="text-xs font-medium text-slate-500 mt-2 leading-relaxed">
                Mohon tunggu sebentar, Takoyaki pesananmu sedang dipanggang di wajan.
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center animate-in zoom-in duration-500">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-black text-emerald-600 uppercase tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>Pesanan Siap!</h3>
              <p className="text-xs font-medium text-slate-500 mt-2 leading-relaxed">
                Takoyaki sudah hangat dan siap disantap. Silakan tunjukkan tiket ini ke kasir.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="w-full max-w-sm mt-6 text-center">
        {!notifGranted ? (
          <button onClick={requestNotification} className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 px-5 py-3 rounded-2xl backdrop-blur-md transition-all active:scale-95 cursor-pointer border border-white/20">
            <BellRing className="w-4 h-4" /> Nyalakan Notifikasi HP
          </button>
        ) : (
          <p className="text-[11px] font-bold text-white/60 flex items-center justify-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Notifikasi Pop-up Aktif
          </p>
        )}
      </div>

    </div>
  );
}