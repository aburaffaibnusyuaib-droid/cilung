'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  DollarSign, ShoppingBag, Clock, TrendingUp, ArrowUpRight,
  Settings2, X, Plus, Trash2, AlertCircle, RefreshCw, CheckCircle2
} from 'lucide-react';

import AdminSidebar from '@/components/AdminSidebar';

// Data Paten Porsi Menu Siboy
const INITIAL_PRICES = {
  kecil: 6000,
  besar: 12000,
  special: 17000
};

const INITIAL_TOPPINGS = [
  { id: 1, name: 'Katsuobushi', status: 'Aman', color: '#10b981', pct: 100 },
  { id: 2, name: 'Keju Mozza', status: 'Aman', color: '#10b981', pct: 100 },
  { id: 3, name: 'Sosis Ayam', status: 'Menipis', color: '#f59e0b', pct: 40 },
  { id: 4, name: 'Crabstick', status: 'Aman', color: '#10b981', pct: 100 },
  { id: 5, name: 'Kornet Gurih', status: 'Habis', color: '#ef4444', pct: 0 }
];

export default function AdminDashboard() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [period, setPeriod] = useState('today');
  const [activeHour, setActiveHour] = useState(2);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // State Harga & Topping Terpusat
  const [prices, setPrices] = useState(INITIAL_PRICES);
  const [toppings, setToppings] = useState(INITIAL_TOPPINGS);
  const [newToppingName, setNewToppingName] = useState('');
  const [toppingError, setToppingError] = useState('');

  useEffect(() => {
    const auth = localStorage.getItem('admin_auth');
    if (!auth) router.push('/admin/login');

    // Baca Harga dari Storage
    try {
      const savedPrices = localStorage.getItem('siboy_prices');
      if (savedPrices) setPrices(JSON.parse(savedPrices));
      else localStorage.setItem('siboy_prices', JSON.stringify(INITIAL_PRICES));

      const savedToppings = localStorage.getItem('siboy_toppings');
      if (savedToppings) setToppings(JSON.parse(savedToppings));
      else localStorage.setItem('siboy_toppings', JSON.stringify(INITIAL_TOPPINGS));
    } catch (e) {}
  }, [router]);

  // Update Harga Cepat
  const handlePriceChange = (key, value) => {
    const val = parseInt(value, 10) || 0;
    const updated = { ...prices, [key]: val };
    setPrices(updated);
    localStorage.setItem('siboy_prices', JSON.stringify(updated));

    // Sinkronkan ke menu items POS
    const menuCatalog = [
      { id: 'M1', name: 'Porsi Kecil', pcs: '5 pcs', price: updated.kecil, desc: 'Takoyaki gurih isi 5 butir.', img: 'https://images.unsplash.com/photo-1592914610354-fd354d45fe82?q=80&w=400&auto=format&fit=crop', isAvailable: true },
      { id: 'M2', name: 'Porsi Besar', pcs: '10 pcs', price: updated.besar, desc: 'Porsi favorit isi 10 butir kenyang.', img: 'https://images.unsplash.com/photo-1592914610354-fd354d45fe82?q=80&w=400&auto=format&fit=crop', isAvailable: true },
      { id: 'M3', name: 'Porsi Special', pcs: '15 pcs', price: updated.special, desc: 'Porsi puas isi 15 butir melimpah.', img: 'https://images.unsplash.com/photo-1592914610354-fd354d45fe82?q=80&w=400&auto=format&fit=crop', isAvailable: true }
    ];
    localStorage.setItem('siboy_menus', JSON.stringify(menuCatalog));
    window.dispatchEvent(new Event('storage'));
  };

  // Toggle 3 Status: Aman -> Menipis -> Habis
  const cycleToppingStatus = (id) => {
    const updated = toppings.map(t => {
      if (t.id === id) {
        if (t.status === 'Aman') return { ...t, status: 'Menipis', color: '#f59e0b', pct: 40 };
        if (t.status === 'Menipis') return { ...t, status: 'Habis', color: '#ef4444', pct: 0 };
        return { ...t, status: 'Aman', color: '#10b981', pct: 100 };
      }
      return t;
    });
    setToppings(updated);
    localStorage.setItem('siboy_toppings', JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
  };

  const handleAddTopping = () => {
    if (!newToppingName.trim()) return setToppingError('Nama varian tidak boleh kosong.');
    if (newToppingName.length > 15) return setToppingError('Maksimal 15 karakter.');

    const newEntry = {
      id: Date.now(),
      name: newToppingName.trim(),
      status: 'Aman',
      color: '#10b981',
      pct: 100
    };
    const updated = [...toppings, newEntry];
    setToppings(updated);
    localStorage.setItem('siboy_toppings', JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));

    setNewToppingName('');
    setToppingError('');
  };

  const handleDeleteTopping = (id) => {
    const updated = toppings.filter(t => t.id !== id);
    setToppings(updated);
    localStorage.setItem('siboy_toppings', JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
  };

  // Metrik & Data Grafik
  const metrics = {
    today: { rev: 'Rp 345.000', sold: '28', avg: 'Rp 12.300', growth: '+15%', note: 'vs kemarin' },
    week: { rev: 'Rp 2.450.000', sold: '194', avg: 'Rp 12.600', growth: '+8.4%', note: 'vs minggu lalu' },
    month: { rev: 'Rp 9.870.000', sold: '810', avg: 'Rp 12.180', growth: '+12.1%', note: 'performa stabil' }
  };

  const hourlyWave = [
    { hour: '16:00', x: 25, y: 75, val: 4 }, { hour: '17:00', x: 95, y: 45, val: 12 },
    { hour: '18:00', x: 165, y: 15, val: 18 }, { hour: '19:00', x: 235, y: 30, val: 15 },
    { hour: '20:00', x: 305, y: 55, val: 9 }, { hour: '21:00', x: 375, y: 68, val: 6 },
    { hour: '22:00', x: 445, y: 85, val: 2 }
  ];

  const daysTraffic = [
    { day: 'Sen', pct: '45%', count: 20 }, { day: 'Sel', pct: '55%', count: 24 }, { day: 'Rab', pct: '50%', count: 22 },
    { day: 'Kam', pct: '65%', count: 29 }, { day: 'Jum', pct: '88%', count: 38, peak: true }, { day: 'Sab', pct: '100%', count: 44, peak: true },
    { day: 'Min', pct: '72%', count: 32 }
  ];

  const rawPortionData = [
    { label: 'Porsi Besar', pcs: 15, color: '#ef4444' },
    { label: 'Porsi Sedang', pcs: 9, color: '#3b82f6' },
    { label: 'Special', pcs: 4, color: '#10b981' }
  ];

  const totalPcs = rawPortionData.reduce((acc, curr) => acc + curr.pcs, 0);
  let cumulativeOffset = 0;
  
  const portionData = rawPortionData.map(slice => {
    const pct = totalPcs > 0 ? (slice.pcs / totalPcs) * 100 : 0;
    const currentOffset = cumulativeOffset;
    cumulativeOffset -= pct; 
    return { ...slice, pct: Math.round(pct), exactPct: pct, dash: `${pct} 100`, offset: `${currentOffset}` };
  });

  return (
    <div className="min-h-screen bg-[#faf9f6] text-slate-900 relative pb-16 overflow-x-hidden" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundSize: '32px 32px', backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.04) 1px, transparent 1px)' }} />

      <div className={`max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 relative z-10 space-y-6 transition-all duration-300 ${isDrawerOpen || isSidebarOpen ? 'opacity-40 blur-sm pointer-events-none' : ''}`}>
        
        {/* HEADER */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl border-2 border-slate-100 p-4 sm:p-5 sm:px-7 shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3 sm:gap-4">
              <button 
                type="button"
                onClick={() => setIsSidebarOpen(true)} 
                className="w-10 h-10 sm:w-12 sm:h-12 bg-white text-red-600 hover:bg-red-50 border-2 border-slate-100 hover:border-red-200 rounded-xl sm:rounded-2xl transition-all flex flex-col items-center justify-center gap-1 sm:gap-1.5 shadow-sm active:scale-95 cursor-pointer"
              >
                <span className="w-4 sm:w-5 h-0.5 bg-red-600 rounded-full" />
                <span className="w-3 sm:w-4 h-0.5 bg-red-600 rounded-full" />
                <span className="w-4 sm:w-5 h-0.5 bg-red-600 rounded-full" />
              </button>

              <div className="flex flex-col">
                <div className="flex items-center gap-1 sm:gap-2">
                  <span className="text-xl sm:text-3xl font-black uppercase tracking-tight text-slate-800" style={{ fontFamily: "'Montserrat', sans-serif" }}>SIBOY</span>
                  <span className="text-xl sm:text-3xl font-black uppercase tracking-tight text-red-600 relative inline-block" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    POS <svg className="absolute w-full h-2 sm:h-3.5 -bottom-0.5 sm:-bottom-1 left-0 text-amber-400 z-[-1]" viewBox="0 0 100 20" preserveAspectRatio="none"><path d="M5 12 Q 30 5 70 12 T 95 12" stroke="currentColor" strokeWidth="6" strokeLinecap="round" fill="transparent" /></svg>
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs font-bold text-slate-400 hidden sm:block">Sistem Manajemen Gerobak Digital</p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <span className={`text-[10px] sm:text-xs font-black uppercase tracking-wider ${isOpen ? 'text-emerald-600' : 'text-slate-400'}`}>
                {isOpen ? 'Buka' : 'Tutup'}
              </span>
              <button 
                type="button"
                onClick={() => setIsOpen(!isOpen)} 
                className={`relative inline-flex h-6 w-11 sm:h-7 sm:w-14 items-center rounded-full transition-colors cursor-pointer shadow-inner ${isOpen ? 'bg-emerald-500' : 'bg-slate-300'}`}
              >
                <span className={`inline-block h-4 w-4 sm:h-5 sm:w-5 transform rounded-full bg-white shadow transition-transform ${isOpen ? 'translate-x-6 sm:translate-x-8' : 'translate-x-1'}`}/>
              </button>
            </div>
          </div>

          <div className="hidden sm:flex bg-slate-100/80 p-1.5 rounded-2xl w-fit items-center gap-1 border border-slate-200/60 self-end md:self-auto md:absolute md:left-1/2 md:-translate-x-1/2 md:top-1/2 md:-translate-y-1/2">
            {[{ id: 'today', label: 'Hari Ini' }, { id: 'week', label: '7 Hari' }, { id: 'month', label: 'Bulan Ini' }].map((tab) => (
              <button key={tab.id} onClick={() => setPeriod(tab.id)} className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer ${period === tab.id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3 KARTU METRIK */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-5 sm:p-6 text-white shadow-[0_12px_30px_rgb(16,185,129,0.2)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-white/80 mb-2">
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest">Total Pendapatan</span>
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/20 flex items-center justify-center"><DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-white" /></div>
              </div>
              <p className="text-2xl sm:text-3xl font-black text-white tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>{metrics[period].rev}</p>
            </div>
            <div className="pt-3 border-t border-white/20 flex items-center justify-between text-[10px] sm:text-xs font-bold text-white/90">
              <span className="flex items-center gap-1.5"><TrendingUp className="w-3.5 h-3.5"/> {metrics[period].growth}</span><span className="text-white/70">{metrics[period].note}</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-5 sm:p-6 text-white shadow-[0_12px_30px_rgb(245,158,11,0.2)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-white/80 mb-2">
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest">Porsi Keluar</span>
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/20 flex items-center justify-center"><ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-white" /></div>
              </div>
              <p className="text-2xl sm:text-3xl font-black text-white tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>{metrics[period].sold} <span className="text-sm font-bold text-white/80">Kotak</span></p>
            </div>
            <div className="pt-3 border-t border-white/20 flex items-center justify-between text-[10px] sm:text-xs font-bold text-white/90">
              <span className="text-white/70">Rata-rata order</span><span>{metrics[period].avg}</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-3xl p-5 sm:p-6 text-white shadow-[0_12px_30px_rgb(14,165,233,0.2)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-white/80 mb-2">
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest">Antrean Aktif</span>
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/20 flex items-center justify-center"><Clock className="w-4 h-4 sm:w-5 sm:h-5 text-white" /></div>
              </div>
              <p className="text-2xl sm:text-3xl font-black text-white tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>4 <span className="text-sm font-bold text-white/80">Pesanan</span></p>
            </div>
            <div className="pt-3 border-t border-white/20 flex items-center justify-between text-[10px] sm:text-xs font-bold text-white/90">
              <span className="text-white/80">Belum dimasak</span>
              <button onClick={() => router.push('/admin/kitchen')} className="inline-flex items-center gap-1 bg-white/20 px-2 py-1 rounded-lg hover:bg-white/30 text-white font-black cursor-pointer transition-colors">
                Kitchen <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* GRAFIK-GRAFIK */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-5 bg-white rounded-3xl border-2 border-slate-100 p-5 sm:p-6 shadow-sm flex flex-col justify-between relative">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div><h3 className="text-sm font-black uppercase tracking-wider text-slate-800" style={{ fontFamily: "'Montserrat', sans-serif" }}>Jam Ramai</h3><p className="text-[11px] font-bold text-slate-400 mt-0.5">Gelombang order harian</p></div>
              <span className="text-[10px] font-black text-red-600 bg-red-50 border border-red-100 px-2.5 py-1 rounded-md">Top: 18:00</span>
            </div>
            <div className="w-full pt-8 pb-2 relative">
              <svg viewBox="0 0 470 110" className="w-full h-32 overflow-visible">
                <path d="M 25 75 Q 60 45 95 45 T 165 15 T 235 30 T 305 55 T 375 68 T 445 85" fill="none" stroke="#dc2626" strokeWidth="3.5" strokeLinecap="round" />
                {hourlyWave.map((pt, i) => (
                  <g key={i} className="cursor-pointer" onClick={() => setActiveHour(i)}>
                    <circle cx={pt.x} cy={pt.y} r={activeHour === i ? 6 : 4} className={activeHour === i ? 'fill-red-600 stroke-white stroke-[3px]' : 'fill-slate-300'} />
                    <text x={pt.x} y="106" fontSize="9.5" textAnchor="middle" className="font-bold fill-slate-400">{pt.hour.split(':')[0]}</text>
                  </g>
                ))}
              </svg>
            </div>
          </div>

          <div className="lg:col-span-3 bg-white rounded-3xl border-2 border-slate-100 p-5 sm:p-6 shadow-sm flex flex-col justify-between">
            <div className="pb-3 border-b border-slate-100">
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-800" style={{ fontFamily: "'Montserrat', sans-serif" }}>Siklus</h3>
              <p className="text-[11px] font-bold text-slate-400 mt-0.5">Penjualan harian</p>
            </div>
            <div className="h-32 flex items-end justify-between gap-1.5 pt-4 border-b border-slate-100 pb-2 mt-4">
              {daysTraffic.map((d, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                  <div className="w-2.5 sm:w-3 h-24 bg-slate-50 border border-slate-100 rounded-full flex flex-col justify-end p-[1px]">
                    <div className={`w-full rounded-full ${d.peak ? 'bg-gradient-to-t from-red-600 to-amber-500' : 'bg-slate-300'}`} style={{ height: d.pct }} />
                  </div>
                  <span className="text-[9px] font-bold text-slate-500">{d.day}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 bg-white rounded-3xl border-2 border-slate-100 p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row gap-6 items-center">
            <div className="flex-1 w-full text-left sm:border-r border-slate-100 sm:pr-4">
              <div className="pb-2 border-b border-slate-100 mb-3">
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-800" style={{ fontFamily: "'Montserrat', sans-serif" }}>Tipe Kardus</h3>
                <p className="text-[11px] font-bold text-slate-400 mt-0.5">Total {totalPcs} Box</p>
              </div>
              <div className="flex flex-col gap-2.5">
                {portionData.map((slice, i) => (
                  <div key={i} className="flex items-center justify-between text-[10px] font-bold">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-[3px]" style={{ backgroundColor: slice.color }}></span>
                      <span className="text-slate-600 uppercase">{slice.label}</span>
                    </div>
                    <span className="text-slate-900 font-black">{slice.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path stroke="#f1f5f9" strokeWidth="5" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                {portionData.map((slice, i) => (
                  <path key={i} strokeDasharray={slice.dash} strokeDashoffset={slice.offset} strokeWidth="5" strokeLinecap="butt" stroke={slice.color} fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                ))}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-slate-800 leading-none">{totalPcs}</span>
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">Kotak</span>
              </div>
            </div>
          </div>
        </div>

        {/* MINI CARDS MONITOR STOK BAHAN & TOPPING */}
        <div className="bg-white rounded-3xl border-2 border-slate-100 p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-800" style={{ fontFamily: "'Montserrat', sans-serif" }}>Status Ketersediaan Topping</h3>
              <p className="text-[11px] font-bold text-slate-400 mt-0.5">Klik tombol kartu untuk mengganti status seketika.</p>
            </div>
            <button 
              type="button"
              onClick={() => setIsDrawerOpen(true)} 
              className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-700 bg-white hover:bg-slate-50 px-4 py-2.5 rounded-xl border-2 border-slate-200 transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <Settings2 className="w-4 h-4 text-slate-500" /> Atur Harga & Bahan
            </button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {toppings.map((top) => (
              <div 
                key={top.id} 
                onClick={() => cycleToppingStatus(top.id)}
                className={`border-2 rounded-2xl p-4 transition-all duration-200 cursor-pointer flex flex-col justify-between gap-3 select-none ${
                  top.status === 'Aman' ? 'bg-white border-slate-100 hover:border-emerald-300 hover:shadow-md' :
                  top.status === 'Menipis' ? 'bg-amber-50/50 border-amber-200 hover:border-amber-300' :
                  'bg-slate-50 border-slate-200 opacity-60'
                }`}
                title="Klik untuk ubah: Aman -> Menipis -> Habis"
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-black truncate ${top.status === 'Habis' ? 'text-slate-400 line-through' : 'text-slate-800'}`}>{top.name}</span>
                  <RefreshCw className="w-3 h-3 text-slate-300" />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md border ${
                    top.status === 'Aman' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                    top.status === 'Menipis' ? 'bg-amber-100 text-amber-800 border-amber-300 animate-pulse' :
                    'bg-slate-200 text-slate-600 border-slate-300'
                  }`}>
                    {top.status}
                  </span>
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: top.color }}></span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* DRAWER RINGKAS: QUICK PRICE & STOK TOPPING */}
      {isDrawerOpen && <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm z-40 transition-opacity" onClick={() => setIsDrawerOpen(false)} />}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out border-l border-slate-200 flex flex-col ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header Drawer */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <h2 className="text-lg font-black uppercase tracking-tight text-slate-800" style={{ fontFamily: "'Montserrat', sans-serif" }}>Pengaturan Kasir & Gerobak</h2>
            <p className="text-xs font-bold text-slate-400 mt-0.5">Ubah harga jual porsi & status stok bahan.</p>
          </div>
          <button onClick={() => setIsDrawerOpen(false)} className="w-9 h-9 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 cursor-pointer shadow-sm">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8 [&::-webkit-scrollbar]:hidden">
          
          {/* SECTION 1: QUICK PRICE UPDATE */}
          <section className="space-y-3">
            <div className="border-b border-slate-100 pb-2">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-800">Quick Price Update</h3>
              <p className="text-[10px] font-bold text-slate-400">Harga langsung ter-update di Terminal Kasir POS</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between bg-slate-50 border border-slate-200 p-3.5 rounded-2xl">
                <div>
                  <h4 className="text-xs font-black text-slate-800">Porsi Kecil (5 pcs)</h4>
                  <span className="text-[10px] text-slate-400 font-bold">Menu Standar</span>
                </div>
                <div className="relative w-28">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-black text-slate-400">Rp</span>
                  <input 
                    type="number" 
                    value={prices.kecil} 
                    onChange={(e) => handlePriceChange('kecil', e.target.value)} 
                    className="w-full bg-white border border-slate-200 text-xs font-black text-right pr-3 pl-7 py-2 rounded-xl outline-none focus:border-red-500" 
                  />
                </div>
              </div>

              <div className="flex items-center justify-between bg-slate-50 border border-slate-200 p-3.5 rounded-2xl">
                <div>
                  <h4 className="text-xs font-black text-slate-800">Porsi Besar (10 pcs)</h4>
                  <span className="text-[10px] text-slate-400 font-bold">Paling Laris</span>
                </div>
                <div className="relative w-28">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-black text-slate-400">Rp</span>
                  <input 
                    type="number" 
                    value={prices.besar} 
                    onChange={(e) => handlePriceChange('besar', e.target.value)} 
                    className="w-full bg-white border border-slate-200 text-xs font-black text-right pr-3 pl-7 py-2 rounded-xl outline-none focus:border-red-500" 
                  />
                </div>
              </div>

              <div className="flex items-center justify-between bg-slate-50 border border-slate-200 p-3.5 rounded-2xl">
                <div>
                  <h4 className="text-xs font-black text-slate-800">Porsi Special (15 pcs)</h4>
                  <span className="text-[10px] text-slate-400 font-bold">Porsi Puas</span>
                </div>
                <div className="relative w-28">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-black text-slate-400">Rp</span>
                  <input 
                    type="number" 
                    value={prices.special} 
                    onChange={(e) => handlePriceChange('special', e.target.value)} 
                    className="w-full bg-white border border-slate-200 text-xs font-black text-right pr-3 pl-7 py-2 rounded-xl outline-none focus:border-red-500" 
                  />
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 2: KELOLA TOPPING & STATUS */}
          <section className="space-y-4">
            <div className="border-b border-slate-100 pb-2">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-800">Kelola Bahan & Topping</h3>
              <p className="text-[10px] font-bold text-slate-400">Klik status untuk mengganti (Aman / Menipis / Habis)</p>
            </div>

            {/* Input Tambah Topping Baru */}
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Tambah varian baru..." 
                value={newToppingName}
                onChange={(e) => setNewToppingName(e.target.value)}
                className="flex-1 text-xs font-bold px-3 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-red-500 bg-slate-50" 
              />
              <button 
                type="button" 
                onClick={handleAddTopping} 
                className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-xl text-xs font-black uppercase cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {toppingError && <p className="text-[10px] text-red-500 font-bold">{toppingError}</p>}

            {/* List Topping */}
            <div className="space-y-2.5">
              {toppings.map((top) => (
                <div key={top.id} className="bg-white border-2 border-slate-100 rounded-2xl p-3 flex items-center justify-between hover:border-slate-200">
                  <div>
                    <h4 className={`text-xs font-black ${top.status === 'Habis' ? 'text-slate-400 line-through' : 'text-slate-800'}`}>{top.name}</h4>
                    <span className="text-[9px] text-slate-400 font-bold">Status Bahan</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      type="button"
                      onClick={() => cycleToppingStatus(top.id)}
                      className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                        top.status === 'Aman' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        top.status === 'Menipis' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        'bg-slate-100 text-slate-500 border-slate-200'
                      }`}
                    >
                      {top.status}
                    </button>
                    <button 
                      type="button" 
                      onClick={() => handleDeleteTopping(top.id)} 
                      className="w-7 h-7 rounded-lg text-slate-300 hover:text-red-500 flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>

      <AdminSidebar 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
        onOpenSettings={() => setIsDrawerOpen(true)} 
      />

    </div>
  );
}