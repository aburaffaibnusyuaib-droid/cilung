'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  DollarSign, ShoppingBag, Clock, LogOut, ChefHat, TrendingUp, Sparkles, ArrowUpRight,
  Settings2, X, Plus, Edit3, Trash2, Check, AlertCircle, ClipboardList, Ticket, LayoutDashboard, Store 
} from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [period, setPeriod] = useState('today');
  const [activeHour, setActiveHour] = useState(2);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('admin_auth');
    if (!auth) router.push('/admin/login');
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    router.push('/');
  };

  // ================= STATE CRUD TOPPING DENGAN WARNA DISTINCT =================
  const [toppings, setToppings] = useState([
    { id: 1, name: 'Katsuobushi', pct: 92, baseColor: '#ef4444', stroke: '#ef4444', stat: 'Aman' }, // Merah
    { id: 2, name: 'Keju Mozza', pct: 85, baseColor: '#eab308', stroke: '#eab308', stat: 'Aman' },  // Kuning Emas
    { id: 3, name: 'Sosis Ayam', pct: 45, baseColor: '#f97316', stroke: '#f97316', stat: 'Menipis' }, // Oranye
    { id: 4, name: 'Crabstick', pct: 20, baseColor: '#0ea5e9', stroke: '#0ea5e9', stat: 'Kritis' },  // Biru Muda
    { id: 5, name: 'Kornet Gurih', pct: 0, baseColor: '#8b5cf6', stroke: '#94a3b8', stat: 'Habis' }  // Ungu (Berubah abu-abu krn habis)
  ]);

  const [prices, setPrices] = useState({ kecil: 6000, besar: 12000, special: 17000 });
  const [formTop, setFormTop] = useState({ id: null, name: '', pct: 100 });
  const [showForm, setShowForm] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSaveTopping = () => {
    if (!formTop.name.trim()) return setErrorMsg('Nama topping tidak kosong.');
    if (formTop.name.length > 15) return setErrorMsg('Maks 15 huruf.');
    
    const newStat = formTop.pct == 0 ? 'Habis' : (formTop.pct < 30 ? 'Kritis' : (formTop.pct < 70 ? 'Menipis' : 'Aman'));

    if (formTop.id) {
      setToppings(toppings.map(t => {
        if (t.id === formTop.id) {
          const newStroke = formTop.pct == 0 ? '#94a3b8' : t.baseColor;
          return { ...t, name: formTop.name, pct: parseInt(formTop.pct), stroke: newStroke, stat: newStat };
        }
        return t;
      }));
    } else {
      // Auto-assign random palette color for new items
      const palette = ['#ef4444', '#eab308', '#f97316', '#0ea5e9', '#8b5cf6', '#10b981'];
      const assignColor = palette[toppings.length % palette.length];
      const newStroke = formTop.pct == 0 ? '#94a3b8' : assignColor;
      setToppings([...toppings, { id: Date.now(), name: formTop.name, pct: parseInt(formTop.pct), baseColor: assignColor, stroke: newStroke, stat: newStat }]);
    }
    setShowForm(false); setFormTop({ id: null, name: '', pct: 100 }); setErrorMsg('');
  };

  const handleEdit = (top) => { setFormTop({ id: top.id, name: top.name, pct: top.pct }); setShowForm(true); setErrorMsg(''); };
  const handleDelete = (id) => setToppings(toppings.filter(t => t.id !== id));
  
  const toggleHabis = (id, currentPct) => {
    setToppings(toppings.map(t => {
      if (t.id === id) {
        const newPct = currentPct === 0 ? 100 : 0;
        const newStat = newPct === 0 ? 'Habis' : 'Aman';
        const newStroke = newPct === 0 ? '#94a3b8' : t.baseColor;
        return { ...t, pct: newPct, stat: newStat, stroke: newStroke };
      }
      return t;
    }));
  };

  // ================= DATA STATIK UI & LOGIKA KALKULASI =================
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

  // Logic Donut Chart Presisi Tinggi
  const rawPortionData = [
    { label: 'Porsi Besar', pcs: 15, color: '#ef4444' }, // Merah Siboy
    { label: 'Porsi Sedang', pcs: 9, color: '#3b82f6' }, // Biru Kontras
    { label: 'Special', pcs: 4, color: '#10b981' }       // Hijau Emerald
  ];

  const totalPcs = rawPortionData.reduce((acc, curr) => acc + curr.pcs, 0);
  let cumulativeOffset = 0;
  
  const portionData = rawPortionData.map(slice => {
    const pct = totalPcs > 0 ? (slice.pcs / totalPcs) * 100 : 0;
    const currentOffset = cumulativeOffset;
    cumulativeOffset -= pct; 
    
    return {
      ...slice,
      pct: Math.round(pct),
      exactPct: pct,
      dash: `${pct} 100`,
      offset: `${currentOffset}`
    };
  });

  return (
    <div className="min-h-screen bg-[#faf9f6] text-slate-900 relative pb-16 overflow-x-hidden" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundSize: '32px 32px', backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.04) 1px, transparent 1px)' }} />

      <div className={`max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 relative z-10 space-y-6 transition-all duration-300 ${isDrawerOpen || isSidebarOpen ? 'opacity-40 blur-sm pointer-events-none' : ''}`}>
        
        {/* ================= HEADER (Mobile Responsive Optimized) ================= */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl border-2 border-slate-100 p-4 sm:p-5 sm:px-7 shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between w-full">
            
            <div className="flex items-center gap-3 sm:gap-4">
              <button 
                onClick={() => setIsSidebarOpen(true)} 
                className="w-10 h-10 sm:w-12 sm:h-12 bg-white text-red-600 hover:bg-red-50 border-2 border-slate-100 hover:border-red-200 rounded-xl sm:rounded-2xl transition-all flex flex-col items-center justify-center gap-1 sm:gap-1.5 shadow-sm active:scale-95 cursor-pointer group"
              >
                <span className="w-4 sm:w-5 h-0.5 bg-red-600 rounded-full transition-all group-hover:w-5 sm:group-hover:w-6" />
                <span className="w-3 sm:w-4 h-0.5 bg-red-600 rounded-full transition-all group-hover:w-5 sm:group-hover:w-6" />
                <span className="w-4 sm:w-5 h-0.5 bg-red-600 rounded-full transition-all group-hover:w-5 sm:group-hover:w-6" />
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
                onClick={() => setIsOpen(!isOpen)} 
                className={`relative inline-flex h-6 w-11 sm:h-7 sm:w-14 items-center rounded-full transition-colors cursor-pointer shadow-inner ${isOpen ? 'bg-emerald-500' : 'bg-slate-300'}`}
              >
                <span className={`inline-block h-4 w-4 sm:h-5 sm:w-5 transform rounded-full bg-white shadow transition-transform ${isOpen ? 'translate-x-6 sm:translate-x-8' : 'translate-x-1'}`}/>
              </button>
            </div>
          </div>

          <div className="flex sm:hidden w-full">
             <select 
               value={period} 
               onChange={(e) => setPeriod(e.target.value)}
               className="w-full bg-slate-50 border border-slate-200 text-xs font-black uppercase tracking-wider text-slate-700 py-2.5 px-3 rounded-xl outline-none"
             >
               <option value="today">Performa Hari Ini</option>
               <option value="week">Performa 7 Hari</option>
               <option value="month">Performa Bulan Ini</option>
             </select>
          </div>
          <div className="hidden sm:flex bg-slate-100/80 p-1.5 rounded-2xl w-fit items-center gap-1 border border-slate-200/60 self-end md:self-auto md:absolute md:left-1/2 md:-translate-x-1/2 md:top-1/2 md:-translate-y-1/2">
            {[{ id: 'today', label: 'Hari Ini' }, { id: 'week', label: '7 Hari' }, { id: 'month', label: 'Bulan Ini' }].map((tab) => (
              <button key={tab.id} onClick={() => setPeriod(tab.id)} className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer ${period === tab.id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ================= 3 KARTU METRIK FULL GRADIENT ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-5 sm:p-6 text-white shadow-[0_12px_30px_rgb(16,185,129,0.2)] flex flex-col justify-between hover:-translate-y-1 transition-transform">
            <div>
              <div className="flex items-center justify-between text-white/80 mb-2">
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest">Total Pendapatan</span>
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl sm:rounded-2xl bg-white/20 flex items-center justify-center"><DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-white" /></div>
              </div>
              <p className="text-2xl sm:text-3xl font-black text-white tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>{metrics[period].rev}</p>
            </div>
            <div className="pt-3 sm:pt-4 mt-4 sm:mt-5 border-t border-white/20 flex items-center justify-between text-[10px] sm:text-xs font-bold text-white/90">
              <span className="flex items-center gap-1.5"><TrendingUp className="w-3.5 h-3.5"/> {metrics[period].growth}</span><span className="text-white/70 font-medium">{metrics[period].note}</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-5 sm:p-6 text-white shadow-[0_12px_30px_rgb(245,158,11,0.2)] flex flex-col justify-between hover:-translate-y-1 transition-transform">
            <div>
              <div className="flex items-center justify-between text-white/80 mb-2">
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest">Porsi Keluar</span>
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl sm:rounded-2xl bg-white/20 flex items-center justify-center"><ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-white" /></div>
              </div>
              <p className="text-2xl sm:text-3xl font-black text-white tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>{metrics[period].sold} <span className="text-sm sm:text-lg font-bold text-white/80">Kotak</span></p>
            </div>
            <div className="pt-3 sm:pt-4 mt-4 sm:mt-5 border-t border-white/20 flex items-center justify-between text-[10px] sm:text-xs font-bold text-white/90">
              <span className="text-white/70 font-medium">Rata-rata pesanan</span><span>{metrics[period].avg}</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-3xl p-5 sm:p-6 text-white shadow-[0_12px_30px_rgb(14,165,233,0.2)] flex flex-col justify-between hover:-translate-y-1 transition-transform">
            <div>
              <div className="flex items-center justify-between text-white/80 mb-2">
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest">Antrean Aktif</span>
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl sm:rounded-2xl bg-white/20 flex items-center justify-center"><Clock className="w-4 h-4 sm:w-5 sm:h-5 text-white" /></div>
              </div>
              <p className="text-2xl sm:text-3xl font-black text-white tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>4 <span className="text-sm sm:text-lg font-bold text-white/80">Pesanan</span></p>
            </div>
            <div className="pt-3 sm:pt-4 mt-4 sm:mt-5 border-t border-white/20 flex items-center justify-between text-[10px] sm:text-xs font-bold text-white/90">
              <span className="text-white/80 font-medium">Belum dimasak</span>
              <button onClick={() => router.push('/admin/kitchen')} className="inline-flex items-center gap-1 bg-white/20 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg hover:bg-white/30 text-white font-black cursor-pointer transition-colors">
                Kitchen View <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* ================= 3 GRAFIK ELEGAN ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* Wave Area (Jam Ramai) - INTERAKTIF & FIXED OFFSIDE TOOLTIP */}
          <div className="lg:col-span-5 bg-white rounded-3xl border-2 border-slate-100 p-5 sm:p-6 shadow-sm flex flex-col justify-between relative">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div><h3 className="text-sm font-black uppercase tracking-wider text-slate-800" style={{ fontFamily: "'Montserrat', sans-serif" }}>Jam Ramai</h3><p className="text-[11px] font-bold text-slate-400 mt-0.5">Gelombang order harian</p></div>
              <div className="text-right">
                <span className="text-[10px] font-black text-red-600 bg-red-50 border border-red-100 px-2.5 py-1 rounded-md shadow-sm">
                  Top: Pukul {hourlyWave.reduce((prev, curr) => (prev.val > curr.val) ? prev : curr).hour}
                </span>
              </div>
            </div>
            
            <div className="w-full pt-8 pb-2 relative">
              {/* Tooltip Fix Posisi X to Persentase Lebar SVG */}
              {isTooltipVisible && (
                <div 
                  className="absolute z-20 bg-slate-800 text-white text-[10px] font-black uppercase tracking-wider px-3 py-2 rounded-lg shadow-xl pointer-events-none transform -translate-x-1/2 transition-all duration-200"
                  style={{ 
                    left: `${(hourlyWave[activeHour].x / 470) * 100}%`, 
                    top: '-5px' 
                  }}
                >
                  <span className="text-amber-400">{hourlyWave[activeHour].hour} WIB</span> • {hourlyWave[activeHour].val} Pcs
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45"></div>
                </div>
              )}

              <svg viewBox="0 0 470 110" className="w-full h-32 overflow-visible" onMouseLeave={() => setIsTooltipVisible(false)}>
                <defs><linearGradient id="glow" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#dc2626" stopOpacity="0.3" /><stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" /></linearGradient></defs>
                <line x1="25" y1="20" x2="445" y2="20" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="25" y1="55" x2="445" y2="55" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="25" y1="90" x2="445" y2="90" stroke="#e2e8f0" strokeWidth="1" />
                <path d="M 25 75 Q 60 45 95 45 T 165 15 T 235 30 T 305 55 T 375 68 T 445 85 L 445 90 L 25 90 Z" fill="url(#glow)" />
                <path d="M 25 75 Q 60 45 95 45 T 165 15 T 235 30 T 305 55 T 375 68 T 445 85" fill="none" stroke="#dc2626" strokeWidth="3.5" strokeLinecap="round" />
                
                {hourlyWave.map((pt, i) => (
                  <g 
                    key={i} 
                    className="cursor-pointer group" 
                    onClick={() => { setActiveHour(i); setIsTooltipVisible(true); }}
                    onMouseEnter={() => { setActiveHour(i); setIsTooltipVisible(true); }}
                  >
                    <circle cx={pt.x} cy={pt.y} r="15" fill="transparent" />
                    <circle cx={pt.x} cy={pt.y} r={activeHour === i ? 6.5 : 4} className={`transition-all duration-300 ${activeHour === i ? 'fill-red-600 stroke-white stroke-[3px]' : 'fill-slate-300 group-hover:fill-red-500 group-hover:r-[5px]'}`} />
                    <text x={pt.x} y="106" fontSize="9.5" textAnchor="middle" className={`font-bold transition-all ${activeHour === i ? 'fill-red-600 font-black' : 'fill-slate-400'}`}>{pt.hour.split(':')[0]}</text>
                  </g>
                ))}
              </svg>
            </div>
          </div>

          {/* Pill Bars (Tren Mingguan) */}
          <div className="lg:col-span-3 bg-white rounded-3xl border-2 border-slate-100 p-5 sm:p-6 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div><h3 className="text-sm font-black uppercase tracking-wider text-slate-800" style={{ fontFamily: "'Montserrat', sans-serif" }}>Siklus</h3><p className="text-[11px] font-bold text-slate-400 mt-0.5">Penjualan harian</p></div>
            </div>
            <div className="h-32 flex items-end justify-between gap-1.5 pt-4 border-b border-slate-100 pb-2 mt-4">
              {daysTraffic.map((d, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group cursor-default">
                  <span className="text-[9px] font-black text-slate-300 group-hover:text-slate-700 transition-colors">{d.count}</span>
                  <div className="w-2.5 sm:w-3 h-24 bg-slate-50 border border-slate-100 rounded-full flex flex-col justify-end p-[1px] shadow-inner">
                    <div className={`w-full rounded-full transition-all duration-500 ${d.peak ? 'bg-gradient-to-t from-red-600 to-amber-500 shadow-sm' : 'bg-slate-300 group-hover:bg-slate-400'}`} style={{ height: d.pct }} />
                  </div>
                  <span className="text-[9px] font-bold text-slate-500">{d.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Donut Chart (Dinamis & Presisi Tinggi) */}
          <div className="lg:col-span-4 bg-white rounded-3xl border-2 border-slate-100 p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row gap-6 items-center">
             <div className="flex-1 w-full text-left sm:border-r border-slate-100 sm:pr-4">
                <div className="pb-2 border-b border-slate-100 mb-3">
                  <h3 className="text-sm font-black uppercase tracking-wider text-slate-800" style={{ fontFamily: "'Montserrat', sans-serif" }}>Tipe Kardus</h3>
                  <p className="text-[11px] font-bold text-slate-400 mt-0.5">Total {totalPcs} Box</p>
                </div>
                
                <div className="flex flex-col gap-2.5">
                  {portionData.map((slice, i) => (
                    <div key={i} className="flex flex-col gap-0.5">
                       <div className="flex items-center justify-between text-[10px] font-bold">
                         <div className="flex items-center gap-1.5">
                           <span className="w-2.5 h-2.5 rounded-[3px] shadow-sm" style={{ backgroundColor: slice.color }}></span>
                           <span className="text-slate-600 uppercase">{slice.label}</span>
                         </div>
                         <span className="text-slate-900 font-black">{slice.pct}%</span>
                       </div>
                       <p className="text-[9px] font-bold text-slate-400 ml-4">{slice.pcs} Terjual</p>
                    </div>
                  ))}
                </div>
             </div>
             
             <div className="relative w-28 h-28 sm:w-32 sm:h-32 shrink-0">
                <svg className="w-full h-full -rotate-90 drop-shadow-sm" viewBox="0 0 36 36">
                  <path stroke="#f1f5f9" strokeWidth="5" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  {portionData.map((slice, i) => (
                    <path
                      key={i}
                      strokeDasharray={slice.dash}
                      strokeDashoffset={slice.offset}
                      strokeWidth="5"
                      strokeLinecap="butt"
                      stroke={slice.color}
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      className="transition-all duration-1000 ease-out hover:stroke-[6.5px] cursor-pointer"
                    />
                  ))}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                   <span className="text-3xl font-black text-slate-800 leading-none">{totalPcs}</span>
                   <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">Kotak</span>
                </div>
             </div>
          </div>
        </div>

        {/* ================= 5 MINI CARDS RING TOPPING (DESAIN MINIMALIS) ================= */}
        <div className="bg-white rounded-3xl border-2 border-slate-100 p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-800" style={{ fontFamily: "'Montserrat', sans-serif" }}>Prediksi Stok Topping</h3>
            </div>
            <button onClick={() => setIsDrawerOpen(true)} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-600 bg-white hover:bg-slate-50 px-4 py-2 rounded-xl border-2 border-slate-100 transition-colors cursor-pointer shadow-sm">
              <Settings2 className="w-4 h-4" /> Atur Stok
            </button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {toppings.length === 0 && <p className="col-span-full text-sm font-bold text-slate-400 text-center py-4">Semua topping dihapus.</p>}
            {toppings.map((top, idx) => (
              <div key={idx} className="bg-white border-2 border-slate-100 rounded-2xl p-4 transition-all duration-300 hover:border-slate-300 hover:shadow-md flex flex-col gap-3 group">
                <span className={`text-xs font-black truncate ${top.stat === 'Habis' ? 'text-slate-400 line-through' : 'text-slate-800'}`}>{top.name}</span>
                
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 shrink-0">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <path className="text-slate-100" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <path strokeDasharray={`${top.pct}, 100`} strokeWidth="4" strokeLinecap="round" stroke={top.stroke} fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-slate-600">{top.pct}%</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Status</span>
                    <p className="text-[11px] font-black uppercase" style={{ color: top.stroke }}>{top.stat}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ================= DRAWER PANEL KANAN (CRUD MENU) ================= */}
      {isDrawerOpen && <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity" onClick={() => setIsDrawerOpen(false)} />}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out border-l border-slate-200 flex flex-col ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div><h2 className="text-lg font-black uppercase tracking-tight text-slate-800" style={{ fontFamily: "'Montserrat', sans-serif" }}>Kelola Katalog</h2><p className="text-xs font-bold text-slate-400 mt-1">Sistem manajemen harga & stok.</p></div>
          <button onClick={() => setIsDrawerOpen(false)} className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 cursor-pointer"><X className="w-5 h-5" /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          <section>
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2 mb-4">Update Harga Porsi</h3>
            <div className="grid grid-cols-3 gap-3">
              {Object.keys(prices).map((key) => (
                <div key={key} className="bg-slate-50 border border-slate-200 p-3 rounded-2xl">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">{key}</span>
                  <input type="number" value={prices[key]} onChange={(e) => setPrices({...prices, [key]: e.target.value})} className="w-full text-xs font-black text-slate-800 bg-white border border-slate-200 rounded-lg px-2 py-1.5 focus:border-red-500 outline-none" />
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-4">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Manajemen Topping</h3>
              {!showForm && (<button onClick={() => { setFormTop({ id: null, name: '', pct: 100 }); setShowForm(true); }} className="text-[10px] font-black uppercase text-emerald-600 flex items-center gap-1 hover:underline cursor-pointer"><Plus className="w-3 h-3" /> Tambah Varian</button>)}
            </div>
            {showForm && (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-4">
                <div className="flex justify-between items-center mb-3"><span className="text-xs font-black uppercase text-slate-800">{formTop.id ? 'Edit Topping' : 'Topping Baru'}</span><button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-red-500 cursor-pointer"><X className="w-4 h-4"/></button></div>
                {errorMsg && <p className="text-[10px] text-red-500 font-bold mb-2 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errorMsg}</p>}
                <div className="space-y-3">
                  <div><label className="text-[10px] font-bold text-slate-500 block mb-1">Nama (Maks 15 Huruf)</label><input type="text" maxLength={15} value={formTop.name} onChange={(e) => setFormTop({...formTop, name: e.target.value})} className="w-full text-xs font-bold px-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-emerald-400" /></div>
                  <div><label className="text-[10px] font-bold text-slate-500 block mb-1">Stok Tersedia ({formTop.pct}%)</label><input type="range" min="0" max="100" value={formTop.pct} onChange={(e) => setFormTop({...formTop, pct: e.target.value})} className="w-full accent-emerald-500 cursor-pointer" /></div>
                  <button onClick={handleSaveTopping} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black uppercase py-2.5 rounded-xl transition-colors cursor-pointer shadow-sm">Simpan Data</button>
                </div>
              </div>
            )}
            <div className="space-y-3">
              {toppings.map((top) => (
                <div key={top.id} className="bg-white border-2 border-slate-100 rounded-2xl p-3 flex items-center justify-between hover:border-slate-300 transition-colors group">
                  <div className="flex-1">
                    <h4 className={`text-sm font-black ${top.stat === 'Habis' ? 'text-slate-400 line-through' : 'text-slate-800'}`}>{top.name}</h4>
                    <div className="flex items-center gap-2 mt-1"><span className={`w-2 h-2 rounded-[2px]`} style={{ backgroundColor: top.stroke }}></span><span className="text-[10px] font-bold text-slate-500 uppercase">{top.pct}% • {top.stat}</span></div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button onClick={() => toggleHabis(top.id, top.pct)} className="w-8 h-8 rounded-lg bg-slate-50 text-slate-500 hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer border border-slate-200" title="Set Habis/Ada"><Settings2 className="w-4 h-4" /></button>
                    <button onClick={() => handleEdit(top)} className="w-8 h-8 rounded-lg bg-slate-50 text-slate-500 hover:bg-sky-100 hover:text-sky-600 hover:border-sky-200 flex items-center justify-center transition-colors cursor-pointer border border-slate-200"><Edit3 className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(top.id)} className="w-8 h-8 rounded-lg bg-slate-50 text-slate-500 hover:bg-red-100 hover:text-red-600 hover:border-red-200 flex items-center justify-center transition-colors cursor-pointer border border-slate-200"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* ================= DRAWER PANEL KIRI: CLEAN OFF-WHITE DENGAN CUSTOM HOVER ================= */}
      {isSidebarOpen && <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 transition-opacity" onClick={() => setIsSidebarOpen(false)} />}
      <div className={`fixed top-0 left-0 h-full w-[280px] bg-[#fdfcf9] shadow-2xl z-[60] transform transition-transform duration-300 ease-out flex flex-col border-r border-slate-200 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Brand Header */}
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

        {/* Menu Navigasi (Dengan Hover Warna Khusus) */}
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-3 mb-3">Navigasi Utama</p>
          
          <button onClick={() => { setIsSidebarOpen(false); router.push('/admin'); }} className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-red-600 text-white font-black text-sm shadow-[0_4px_20px_rgb(220,38,38,0.3)] transition-all cursor-pointer">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </button>
          
          <button onClick={() => { setIsSidebarOpen(false); router.push('/admin/kitchen'); }} className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-slate-600 hover:bg-amber-50 hover:text-amber-600 font-bold text-sm transition-all cursor-pointer group">
            <div className="flex items-center gap-3">
              <ChefHat className="w-5 h-5 text-slate-400 group-hover:text-amber-500 transition-colors" /> Kitchen View
            </div>
            <span className="bg-sky-50 text-sky-600 text-[10px] font-black px-2 py-0.5 rounded-lg border border-sky-100">4 Antre</span>
          </button>

          <button onClick={() => { setIsSidebarOpen(false); router.push('/admin/orders'); }} className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 font-bold text-sm transition-all cursor-pointer group">
            <ClipboardList className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 transition-colors" /> Order History
          </button>

          <button onClick={() => { setIsSidebarOpen(false); window.open('/ticket', '_blank'); }} className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 font-bold text-sm transition-all cursor-pointer group mt-2 border border-transparent hover:border-emerald-100">
            <Ticket className="w-5 h-5 text-slate-400 group-hover:text-emerald-500 transition-colors" /> Demo Karcis HP
          </button>
        </div>

        {/* Footer Sidebar */}
        <div className="p-5 border-t border-slate-100 bg-slate-50/50 space-y-3">
          <button onClick={() => { setIsSidebarOpen(false); setIsDrawerOpen(true); }} className="w-full flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 hover:border-slate-300 hover:text-slate-900 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-sm cursor-pointer hover:-translate-y-0.5">
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