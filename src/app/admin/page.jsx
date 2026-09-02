'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  DollarSign, 
  ShoppingBag, 
  Clock, 
  LogOut, 
  Store,
  ChefHat,
  TrendingUp,
  Activity,
  Sparkles,
  ChevronRight,
  ArrowUpRight
} from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [period, setPeriod] = useState('today');
  const [activeHour, setActiveHour] = useState(2); // Jam 18:00 default

  useEffect(() => {
    const auth = localStorage.getItem('admin_auth');
    if (!auth) {
      router.push('/admin/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    router.push('/');
  };

  // Metrik sesuai periode
  const metrics = {
    today: { rev: 'Rp 345.000', sold: '28', avg: 'Rp 12.300', growth: '+15%', note: 'dibanding kemarin' },
    week: { rev: 'Rp 2.450.000', sold: '194', avg: 'Rp 12.600', growth: '+8.4%', note: 'dibanding minggu lalu' },
    month: { rev: 'Rp 9.870.000', sold: '810', avg: 'Rp 12.180', growth: '+12.1%', note: 'performa stabil' }
  };

  // Titik Kurva Area Jam Ramai (SVG Smooth Wave)
  const hourlyWave = [
    { hour: '16:00', x: 25, y: 75, val: 4, desc: 'Lapak Buka' },
    { hour: '17:00', x: 95, y: 45, val: 12, desc: 'Bubaran Sekolah' },
    { hour: '18:00', x: 165, y: 15, val: 18, desc: 'Puncak Antrean Maghrib' },
    { hour: '19:00', x: 235, y: 30, val: 15, desc: 'Pesanan Warga Sekitar' },
    { hour: '20:00', x: 305, y: 55, val: 9, desc: 'Mulai Melandai' },
    { hour: '21:00', x: 375, y: 68, val: 6, desc: 'Sisa Adonan Terakhir' },
    { hour: '22:00', x: 445, y: 85, val: 2, desc: 'Persiapan Tutup' }
  ];

  // Data Hari Ramai (Pill Slender Bars)
  const daysTraffic = [
    { day: 'Sen', pct: '45%', count: 20 },
    { day: 'Sel', pct: '55%', count: 24 },
    { day: 'Rab', pct: '50%', count: 22 },
    { day: 'Kam', pct: '65%', count: 29 },
    { day: 'Jum', pct: '88%', count: 38, peak: true },
    { day: 'Sab', pct: '100%', count: 44, peak: true },
    { day: 'Min', pct: '72%', count: 32 }
  ];

  // 5 Topping dengan Circular Ring Lembut
  const toppings = [
    { name: 'Katsuobushi', pct: 92, stroke: '#ef4444', text: 'Restock Cepat', sub: 'Wajib ada tiap cup' },
    { name: 'Keju Mozza', pct: 85, stroke: '#f59e0b', text: 'Sangat Laris', sub: 'Favorit anak muda' },
    { name: 'Sosis Ayam', pct: 68, stroke: '#10b981', text: 'Stok Aman', sub: 'Permintaan stabil' },
    { name: 'Crabstick', pct: 52, stroke: '#06b6d4', text: 'Porsi Cukup', sub: 'Beli takaran wajar' },
    { name: 'Kornet Gurih', pct: 36, stroke: '#8b5cf6', text: 'Tersisa Banyak', sub: 'Kurangi kulakan' }
  ];

  return (
    <div className="min-h-screen bg-[#faf9f6] text-slate-900 relative pb-16" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      
      {/* Background Grid Sesuai Landing Page */}
      <div 
        className="absolute inset-0 pointer-events-none z-0" 
        style={{
          backgroundSize: '32px 32px',
          backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.04) 1px, transparent 1px)'
        }} 
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 relative z-10 space-y-6">
        
        {/* ================= HEADER ================= */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl border-2 border-slate-100 p-5 sm:px-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-slate-800" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                DASHBOARD
              </span>
              <span className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-red-600 relative inline-block" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                SIBOY
                <svg className="absolute w-[115%] h-3.5 -bottom-1 -left-[7%] text-amber-400 z-[-1]" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M5 12 Q 30 5 70 12 T 95 12" stroke="currentColor" strokeWidth="6" strokeLinecap="round" fill="transparent" />
                </svg>
              </span>
            </div>
            <p className="text-xs font-bold text-slate-400 mt-1">Ringkasan kasir harian & prediksi bahan baku kedai.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Filter Periode */}
            <div className="bg-slate-100/80 p-1.5 rounded-2xl flex items-center gap-1 border border-slate-200/60">
              {[
                { id: 'today', label: 'Hari Ini' },
                { id: 'week', label: '7 Hari' },
                { id: 'month', label: 'Bulan Ini' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setPeriod(tab.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    period === tab.id 
                      ? 'bg-white text-slate-900 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tombol Kitchen */}
            <button
              onClick={() => router.push('/admin/kitchen')}
              className="flex items-center gap-2 bg-slate-900 hover:bg-red-600 text-white px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-red-500/20 active:scale-95 cursor-pointer"
            >
              <ChefHat className="w-4 h-4 text-amber-300" />
              <span>Kitchen View</span>
            </button>

            {/* Status Lapak */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider border-2 transition-all duration-200 cursor-pointer ${
                isOpen 
                  ? 'bg-emerald-50/80 border-emerald-400/80 text-emerald-700' 
                  : 'bg-red-50/80 border-red-400/80 text-red-600'
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isOpen ? 'bg-emerald-400' : 'bg-red-400'}`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${isOpen ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
              </span>
              <span>{isOpen ? 'Lapak Buka' : 'Lapak Tutup'}</span>
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="p-2.5 bg-white border-2 border-slate-100 hover:border-red-200 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-2xl transition-all cursor-pointer shadow-sm"
              title="Keluar"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ================= 3 KARTU METRIK UTAMA ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          
          <div className="bg-white rounded-3xl border-2 border-slate-100 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-lg hover:border-emerald-200 transition-all group">
            <div className="flex items-center justify-between text-slate-400 mb-3">
              <span className="text-[11px] font-black uppercase tracking-widest">Total Pendapatan</span>
              <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-black text-slate-800 tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              {metrics[period].rev}
            </p>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 mt-2">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{metrics[period].growth}</span>
              <span className="text-slate-400 font-medium">{metrics[period].note}</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl border-2 border-slate-100 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-lg hover:border-amber-200 transition-all group">
            <div className="flex items-center justify-between text-slate-400 mb-3">
              <span className="text-[11px] font-black uppercase tracking-widest">Porsi Keluar</span>
              <div className="w-9 h-9 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShoppingBag className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-black text-slate-800 tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              {metrics[period].sold} <span className="text-base text-slate-400 font-bold">Kotak</span>
            </p>
            <p className="text-xs font-bold text-slate-400 mt-2">
              Rata-rata: <span className="text-slate-700">{metrics[period].avg} / pesanan</span>
            </p>
          </div>

          <div className="bg-white rounded-3xl border-2 border-slate-100 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-lg hover:border-sky-200 transition-all group flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-slate-400 mb-3">
                <span className="text-[11px] font-black uppercase tracking-widest">Antrean Belum Dimasak</span>
                <div className="w-9 h-9 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Clock className="w-5 h-5" />
                </div>
              </div>
              <p className="text-3xl font-black text-slate-800 tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                4 <span className="text-base text-slate-400 font-bold">Pesanan</span>
              </p>
            </div>
            <button 
              onClick={() => router.push('/admin/kitchen')}
              className="inline-flex items-center gap-1.5 text-xs font-black text-sky-600 hover:text-sky-700 mt-3 group-hover:underline cursor-pointer"
            >
              <span>Buka Kitchen View</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* ================= 2 GRAFIK ELEGAN SEJAJAR ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* GRAFIK 1: SMOOTH WAVE AREA (JAM RAMAI) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border-2 border-slate-100 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-800" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Jam Ramai Penjualan
                </h3>
                <p className="text-[11px] font-bold text-slate-400 mt-0.5">Gelombang pesanan masuk sepanjang sore - malam</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-black text-red-600 bg-red-50 border border-red-100 px-2.5 py-1 rounded-full inline-block">
                  {hourlyWave[activeHour].hour} • {hourlyWave[activeHour].val} Porsi
                </span>
                <p className="text-[10px] font-bold text-slate-400 mt-1">{hourlyWave[activeHour].desc}</p>
              </div>
            </div>

            {/* Smooth SVG Wave */}
            <div className="w-full pt-6 pb-2">
              <svg viewBox="0 0 470 110" className="w-full h-36 overflow-visible">
                <defs>
                  <linearGradient id="takoyakiGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#dc2626" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Horizontal Soft Lines */}
                <line x1="25" y1="20" x2="445" y2="20" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="25" y1="55" x2="445" y2="55" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="25" y1="90" x2="445" y2="90" stroke="#e2e8f0" strokeWidth="1" />

                {/* Area Gradient Shading */}
                <path 
                  d="M 25 75 Q 60 45 95 45 T 165 15 T 235 30 T 305 55 T 375 68 T 445 85 L 445 90 L 25 90 Z" 
                  fill="url(#takoyakiGlow)" 
                />

                {/* Main Curved Line */}
                <path 
                  d="M 25 75 Q 60 45 95 45 T 165 15 T 235 30 T 305 55 T 375 68 T 445 85" 
                  fill="none" 
                  stroke="#dc2626" 
                  strokeWidth="3.5" 
                  strokeLinecap="round" 
                />

                {/* Interactive Points */}
                {hourlyWave.map((pt, i) => (
                  <g key={i} className="cursor-pointer group" onClick={() => setActiveHour(i)}>
                    <circle 
                      cx={pt.x} 
                      cy={pt.y} 
                      r={activeHour === i ? 6.5 : 4} 
                      className={`transition-all duration-300 ${activeHour === i ? 'fill-red-600 stroke-white stroke-[3px]' : 'fill-slate-300 group-hover:fill-red-500'}`}
                    />
                    <text 
                      x={pt.x} 
                      y="106" 
                      fontSize="9.5" 
                      textAnchor="middle" 
                      className={`font-bold ${activeHour === i ? 'fill-red-600 font-black' : 'fill-slate-400'}`}
                    >
                      {pt.hour.split(':')[0]}
                    </text>
                  </g>
                ))}
              </svg>
            </div>

            <div className="bg-slate-50 rounded-2xl p-3 flex items-center justify-between text-xs font-bold text-slate-500 border border-slate-100">
              <span className="flex items-center gap-1.5 text-amber-600">
                <Sparkles className="w-3.5 h-3.5" /> Rekomendasi:
              </span>
              <span className="text-slate-700">Mulai tuang adonan penuh loyang jam 17:30 WIB</span>
            </div>
          </div>

          {/* GRAFIK 2: SLENDER PILL BARS (TREN HARI RAMAI) */}
          <div className="lg:col-span-5 bg-white rounded-3xl border-2 border-slate-100 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-800" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Hari Ramai Penjualan
                </h3>
                <p className="text-[11px] font-bold text-slate-400 mt-0.5">Siklus penjualan mingguan</p>
              </div>
              <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                Weekend Ramai
              </span>
            </div>

            {/* Slender Pill Bars */}
            <div className="h-40 flex items-end justify-between gap-3 pt-4 border-b border-slate-100 pb-2">
              {daysTraffic.map((d, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group cursor-default">
                  <span className="text-[10px] font-black text-slate-300 group-hover:text-slate-700 transition-colors">
                    {d.count}
                  </span>
                  
                  {/* Track container */}
                  <div className="w-3 sm:w-3.5 h-28 bg-slate-100 rounded-full flex flex-col justify-end p-0.5">
                    <div 
                      className={`w-full rounded-full transition-all duration-500 ${
                        d.peak 
                          ? 'bg-gradient-to-t from-amber-500 to-red-500 shadow-sm' 
                          : 'bg-slate-300 group-hover:bg-slate-400'
                      }`}
                      style={{ height: d.pct }}
                    />
                  </div>

                  <span className="text-[10px] font-bold text-slate-500">{d.day}</span>
                </div>
              ))}
            </div>

            <p className="text-[11px] font-bold text-slate-400 text-center mt-2">
              Puncak omset terjadi pada hari <strong className="text-slate-800">Jumat & Sabtu</strong>.
            </p>
          </div>

        </div>

        {/* ================= 5 MINI CARDS RING TOPPING ================= */}
        <div className="bg-white rounded-3xl border-2 border-slate-100 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-800" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Prediksi Stok 5 Topping
              </h3>
              <p className="text-[11px] font-bold text-slate-400 mt-0.5">Panduan belanja bahan baku esok hari berdasarkan pesanan keluar.</p>
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-200 self-start sm:self-auto">
              5 Bahan Utama
            </span>
          </div>

          {/* 5 Soft Ring Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {toppings.map((top, idx) => (
              <div 
                key={idx}
                className="bg-slate-50/70 hover:bg-white rounded-2xl border-2 border-slate-100 hover:border-slate-200 p-4 transition-all duration-300 hover:shadow-sm flex flex-col justify-between gap-3 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-800 truncate">{top.name}</span>
                  <span className="text-xs font-black" style={{ color: top.stroke }}>{top.pct}%</span>
                </div>

                {/* Soft Donut Radial SVG */}
                <div className="flex items-center gap-3">
                  <div className="relative w-11 h-11 shrink-0">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-slate-200"
                        strokeWidth="3.5"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        strokeDasharray={`${top.pct}, 100`}
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        stroke={top.stroke}
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-slate-400">
                      {idx + 1}
                    </span>
                  </div>

                  <div>
                    <p className="text-[11px] font-black text-slate-800 leading-tight">{top.text}</p>
                    <p className="text-[9.5px] font-bold text-slate-400 mt-0.5">{top.sub}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}