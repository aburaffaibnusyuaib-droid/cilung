'use client';

import React from 'react';
import { X, Download, MessageCircle, ShieldCheck } from 'lucide-react';

export default function Qris({ isOpen, onClose, totalPrice, onProceedWA }) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md transition-all"
      onClick={onClose}
    >
      {/* MODAL CONTAINER: Dibuat auto-height, tanpa overflow, lebar pas */}
      <div 
        className="w-full max-w-[340px] bg-white rounded-3xl shadow-2xl relative animate-in fade-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()} 
      >
        {/* HEADER: Tombol Close (X) dengan Hover Merah Muter ala Cart */}
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={onClose}
            className="group w-8 h-8 rounded-full bg-slate-100 hover:bg-red-600 text-slate-500 hover:text-white flex items-center justify-center transition-all duration-200 active:scale-90 shadow-sm border border-slate-200/80 hover:border-red-600"
            title="Tutup QRIS"
          >
            <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300 stroke-[2.5]" />
          </button>
        </div>

        {/* KONTEN: Jarak dipadatkan biar muat 1 layar tanpa scroll */}
        <div className="pt-6 pb-6 px-5 flex flex-col items-center text-center font-sans">
          
          <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mb-2.5 shrink-0">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
          </div>
          
          <h3 
            className="text-base font-black text-slate-900 uppercase tracking-tight mb-1"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Pembayaran QRIS
          </h3>
          <p className="text-[10px] text-slate-500 font-medium mb-4 leading-relaxed px-2">
            Scan kode di bawah ini menggunakan aplikasi e-Wallet atau m-Banking Anda.
          </p>

          {/* AREA QR CODE: Ukuran proporsional, border tipis bersih */}
          <div className="bg-white border-2 border-slate-100 rounded-xl p-2.5 mb-4 shadow-sm inline-block">
            <img 
              src="/qrasli.jpg" 
              alt="QRIS Takoyaki Siboy" 
              className="w-40 h-40 object-contain rounded-lg mix-blend-multiply"
            />
          </div>

          {/* TOTAL BAYAR: Padding atas-bawah dirapatkan (py-2.5) */}
          <div className="w-full bg-slate-50 rounded-xl py-2.5 px-3 mb-4 border border-slate-100 shrink-0">
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-0.5" style={{ fontFamily: "'Montserrat', sans-serif" }}>Total Tagihan</p>
            <p 
              className="text-2xl font-black text-red-600 tracking-tighter"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Rp {totalPrice?.toLocaleString('id-ID')}
            </p>
          </div>

          {/* ACTION BUTTONS: Space-y dirapatkan */}
          <div className="w-full space-y-2 shrink-0">
            <a 
              href="/qris-kotak.jpeg" 
              download="QRIS-Takoyaki-Siboy.jpeg"
              className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] py-2.5 rounded-xl transition-colors"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Simpan Gambar QRIS</span>
            </a>

            <button 
              onClick={onProceedWA}
              className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-[11px] py-2.5 rounded-xl uppercase tracking-wide transition-all shadow-md active:scale-95"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <MessageCircle className="w-3.5 h-3.5 fill-slate-950" />
              <span>Kirim Bukti Transfer ke WA</span>
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}