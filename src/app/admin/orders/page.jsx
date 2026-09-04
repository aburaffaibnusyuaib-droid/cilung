'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, FileText, Download, Filter, MoreHorizontal, ChevronLeft, ChevronRight, 
  X, LayoutDashboard, ChefHat, ClipboardList, Ticket, Settings2, LogOut, Store, Eye, Printer, Trash2, Receipt
} from 'lucide-react';

export default function OrderHistory() {
  const router = useRouter();
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [period, setPeriod] = useState('today');
  const [activeDropdown, setActiveDropdown] = useState(null); 
  const [searchTerm, setSearchTerm] = useState(''); 
  const [isMounted, setIsMounted] = useState(false);
  
  // State baru untuk Pop-up Modal "Lihat Detail"
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    setIsMounted(true);
    const auth = localStorage.getItem('admin_auth');
    if (!auth) router.push('/admin/login');
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    router.push('/');
  };

  // ================= DATA TRANSAKSI =================
  const [historyData, setHistoryData] = useState([
    { id: 'SB-101', date: '04 Sep 2026', time: '13:15', name: 'Budi Santoso', type: 'Porsi Besar (10 pcs)', toppings: 'Keju Mozza, Sosis', veg: 'Kol & Daun Bawang', spicy: 'Pedas Sedang (Lv 2)', total: 'Rp 17.000', pay: 'QRIS', stat: 'Selesai' },
    { id: 'SB-102', date: '04 Sep 2026', time: '13:20', name: 'Siti Rahma', type: 'Porsi Special (15 pcs)', toppings: 'Katsuobushi', veg: 'Tanpa Sayur', spicy: 'Tidak Pedas', total: 'Rp 22.000', pay: 'CASH', stat: 'Menunggu' },
    { id: 'SB-103', date: '04 Sep 2026', time: '13:25', name: 'Dafa (Ojol)', type: 'Porsi Sedang (7 pcs)', toppings: 'Kornet, Keju', veg: 'Full Sayur', spicy: 'Sangat Pedas (Lv 5)', total: 'Rp 12.000', pay: 'CASH', stat: 'Batal' },
    { id: 'SB-104', date: '04 Sep 2026', time: '13:40', name: 'Anisa', type: 'Porsi Besar (10 pcs)', toppings: 'Crabstick', veg: 'Kol Saja', spicy: 'Pedas Sedang (Lv 3)', total: 'Rp 17.000', pay: 'QRIS', stat: 'Selesai' },
    { id: 'SB-105', date: '04 Sep 2026', time: '14:05', name: 'Mikel', type: 'Porsi Sedang (7 pcs)', toppings: 'Sosis', veg: 'Full Sayur', spicy: 'Tidak Pedas', total: 'Rp 12.000', pay: 'CASH', stat: 'Menunggu' },
  ]);

  // ================= LOGIKA PENCARIAN =================
  const filteredData = historyData.filter(item => 
    item.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ================= FUNGSI AKSI =================
  const handleDelete = (id) => {
    if (confirm(`Yakin ingin menghapus data transaksi ${id}?`)) {
      setHistoryData(historyData.filter(item => item.id !== id));
      setActiveDropdown(null);
    }
  };

  const handlePrintStruk = (id) => {
    alert(`Mensimulasikan print struk thermal Bluetooth untuk transaksi: ${id}`);
    setActiveDropdown(null);
  };

  const exportToExcel = () => {
    const headers = ['ID Transaksi', 'Tanggal', 'Waktu', 'Pelanggan', 'Menu Utama', 'Topping', 'Sayur', 'Pedas', 'Total Bayar', 'Metode', 'Status'];
    const csvContent = [
      headers.join(','),
      ...filteredData.map(r => `"${r.id}","${r.date}","${r.time}","${r.name}","${r.type}","${r.toppings}","${r.veg}","${r.spicy}","${r.total}","${r.pay}","${r.stat}"`)
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `Laporan_Siboy_${new Date().toLocaleDateString('id-ID')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = () => window.print();

  return (
    <div className="min-h-screen bg-[#faf9f6] text-slate-900 relative pb-16 overflow-x-hidden print:bg-white print:pb-0" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      
      <div className="absolute inset-0 pointer-events-none z-0 print:hidden" style={{ backgroundSize: '32px 32px', backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.04) 1px, transparent 1px)' }} />

      <div className={`max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 relative z-10 space-y-6 transition-all duration-300 ${isSidebarOpen ? 'opacity-40 blur-sm pointer-events-none' : ''}`}>
        
        {/* ================= HEADER ================= */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl border-2 border-slate-100 p-4 sm:p-5 sm:px-7 shadow-sm flex items-center justify-between gap-4 print:hidden">
          <div className="flex items-center gap-3 sm:gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="w-10 h-10 sm:w-12 sm:h-12 bg-white text-red-600 hover:bg-red-50 border-2 border-slate-100 hover:border-red-200 rounded-xl sm:rounded-2xl transition-all flex flex-col items-center justify-center gap-1 sm:gap-1.5 shadow-sm active:scale-95 cursor-pointer group">
              <span className="w-4 sm:w-5 h-0.5 bg-red-600 rounded-full transition-all group-hover:w-5 sm:group-hover:w-6" />
              <span className="w-3 sm:w-4 h-0.5 bg-red-600 rounded-full transition-all group-hover:w-5 sm:group-hover:w-6" />
              <span className="w-4 sm:w-5 h-0.5 bg-red-600 rounded-full transition-all group-hover:w-5 sm:group-hover:w-6" />
            </button>
            <div>
              <h1 className="text-xl sm:text-3xl font-black uppercase tracking-tight text-slate-800 leading-none" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                ORDER <span className="text-indigo-600">HISTORY</span>
              </h1>
              <p className="text-[10px] sm:text-xs font-bold text-slate-400 mt-1 hidden sm:block">Laporan transaksi & audit bahan baku.</p>
            </div>
          </div>
        </div>

        {/* KOP SURAT (PRINT PDF) */}
        <div className="hidden print:block text-center border-b-2 border-slate-800 pb-4 mb-6 pt-8">
          <h1 className="text-2xl font-black uppercase tracking-widest text-slate-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>TAKOYAKI SIBOY</h1>
          <p className="text-sm font-bold text-slate-600 mt-1">Laporan Penjualan & Audit Operasional</p>
          <p className="text-xs text-slate-500 mt-1">
            Dicetak pada: {isMounted ? `${new Date().toLocaleDateString('id-ID')} ${new Date().toLocaleTimeString('id-ID')}` : 'Loading...'}
          </p>
        </div>

        {/* ================= TABLE CARD ================= */}
        <div className="bg-white rounded-3xl border-2 border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-visible print:border-slate-300 print:shadow-none print:rounded-none">
          
          <div className="p-5 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4 print:hidden">
            <div className="relative w-full lg:max-w-xs">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari ID, Nama Pelanggan..." 
                className="w-full bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-indigo-400 transition-colors shadow-inner" 
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 shadow-sm">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Periode:</span>
                <select value={period} onChange={(e) => setPeriod(e.target.value)} className="bg-transparent text-xs font-bold text-slate-700 outline-none cursor-pointer">
                  <option value="today">Hari Ini</option>
                  <option value="week">7 Hari Terakhir</option>
                  <option value="month">Bulan Ini</option>
                </select>
              </div>

              <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>

              <button onClick={exportToPDF} className="flex-1 sm:flex-none flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-rose-600 bg-rose-50 border border-rose-200 px-4 py-2.5 rounded-xl hover:bg-rose-100 transition-colors shadow-sm cursor-pointer active:scale-95">
                <FileText className="w-4 h-4" /> PDF
              </button>
              <button onClick={exportToExcel} className="flex-1 sm:flex-none flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-2.5 rounded-xl hover:bg-emerald-100 transition-colors shadow-sm cursor-pointer active:scale-95">
                <Download className="w-4 h-4" /> Excel
              </button>
            </div>
          </div>

          <div className="overflow-x-auto pb-10 sm:pb-0 min-h-[300px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 print:bg-slate-100 border-b border-slate-100 print:border-slate-300 text-[10px] font-black uppercase tracking-widest text-slate-400 print:text-slate-800">
                  <th className="p-4 pl-6 whitespace-nowrap">ID Transaksi</th>
                  <th className="p-4 whitespace-nowrap">Pelanggan</th>
                  <th className="p-4 whitespace-nowrap">Menu Utama</th>
                  <th className="p-4 whitespace-nowrap">Total & Bayar</th>
                  <th className="p-4 whitespace-nowrap text-center">Status</th>
                  <th className="p-4 pr-6 whitespace-nowrap text-center print:hidden">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 print:divide-slate-300">
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-10 text-slate-400 font-bold text-sm">Tidak ada transaksi yang cocok.</td>
                  </tr>
                ) : (
                  filteredData.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="p-4 pl-6">
                        <span className="font-mono text-xs font-black text-slate-800 block">{row.id}</span>
                        <span className="text-[9px] font-bold text-slate-400">{row.date} • {row.time}</span>
                      </td>
                      <td className="p-4">
                        <span className="text-xs font-bold text-slate-800 block">{row.name}</span>
                      </td>
                      {/* RINCIAN PESANAN DISEDERHANAKAN DI TABEL */}
                      <td className="p-4">
                        <span className="text-xs font-black text-slate-900 block">{row.type}</span>
                        <span className="text-[9px] font-bold text-slate-400 block mt-0.5 hidden print:block">
                          Topping: {row.toppings} | {row.spicy}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="text-xs font-black text-slate-800 block mb-1">{row.total}</span>
                        {/* CARA PEMBAYARAN TETAP MUNCUL */}
                        <span className={`inline-block text-[8px] font-black uppercase px-2 py-0.5 rounded-md border ${row.pay === 'QRIS' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                          {row.pay}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`inline-block text-[9px] font-black uppercase px-2.5 py-1 rounded-full border print:border-slate-400
                          ${row.stat === 'Menunggu' ? 'bg-amber-100 text-amber-700 border-amber-200' : 
                            row.stat === 'Selesai' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 
                            'bg-rose-100 text-rose-700 border-rose-200'} print:text-black print:bg-transparent`}>
                          {row.stat}
                        </span>
                      </td>
                      
                      <td className="p-4 pr-6 text-center relative print:hidden">
                        <button 
                          onClick={() => setActiveDropdown(activeDropdown === row.id ? null : row.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer"
                        >
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                        
                        {activeDropdown === row.id && (
                          <>
                            <div className="fixed inset-0 z-10" onClick={() => setActiveDropdown(null)}></div>
                            <div className="absolute right-8 top-10 z-20 w-36 bg-white border border-slate-100 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden flex flex-col py-1 animate-in fade-in zoom-in-95 duration-100">
                              {/* TOMBOL LIHAT DETAIL MEMICU MODAL */}
                              <button onClick={() => { setSelectedOrder(row); setActiveDropdown(null); }} className="flex items-center gap-2 px-3 py-2 text-[10px] font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-colors text-left cursor-pointer">
                                <Eye className="w-3.5 h-3.5" /> Lihat Detail
                              </button>
                              <button onClick={() => handlePrintStruk(row.id)} className="flex items-center gap-2 px-3 py-2 text-[10px] font-bold text-slate-600 hover:bg-slate-50 hover:text-amber-600 transition-colors text-left cursor-pointer">
                                <Printer className="w-3.5 h-3.5" /> Cetak Struk
                              </button>
                              <div className="h-px bg-slate-100 my-1"></div>
                              <button onClick={() => handleDelete(row.id)} className="flex items-center gap-2 px-3 py-2 text-[10px] font-bold text-rose-600 hover:bg-rose-50 transition-colors text-left cursor-pointer">
                                <Trash2 className="w-3.5 h-3.5" /> Hapus Data
                              </button>
                            </div>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="p-4 sm:p-5 border-t border-slate-100 flex items-center justify-between bg-slate-50/30 rounded-b-3xl print:hidden">
            <button className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-800 transition-colors cursor-pointer">
              <ChevronLeft className="w-4 h-4" /> Prev
            </button>
            <div className="flex items-center gap-1.5">
              <button className="w-7 h-7 rounded-lg bg-indigo-600 text-white text-[10px] font-black shadow-sm shadow-indigo-500/30 flex items-center justify-center cursor-pointer">1</button>
              <button className="w-7 h-7 rounded-lg bg-transparent hover:bg-slate-100 text-slate-500 text-[10px] font-black flex items-center justify-center transition-colors cursor-pointer">2</button>
              <button className="w-7 h-7 rounded-lg bg-transparent hover:bg-slate-100 text-slate-500 text-[10px] font-black flex items-center justify-center transition-colors cursor-pointer">3</button>
              <span className="text-slate-400 px-1 text-xs">...</span>
              <button className="w-7 h-7 rounded-lg bg-transparent hover:bg-slate-100 text-slate-500 text-[10px] font-black flex items-center justify-center transition-colors cursor-pointer">12</button>
            </div>
            <button className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-800 transition-colors cursor-pointer">
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ================= MODAL LIHAT DETAIL PESANAN ================= */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={() => setSelectedOrder(null)}></div>
          
          <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden relative z-10 shadow-2xl animate-in zoom-in-95 duration-200">
            {/* Header Modal */}
            <div className="bg-slate-50 p-5 border-b border-slate-100 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
                  <Receipt className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wider text-slate-800" style={{ fontFamily: "'Montserrat', sans-serif" }}>Detail Pesanan</h3>
                  <p className="font-mono text-xs font-bold text-indigo-600 mt-0.5">{selectedOrder.id}</p>
                </div>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-rose-500 hover:border-rose-200 transition-colors cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body Modal (Rincian) */}
            <div className="p-6 space-y-5">
              <div className="flex justify-between items-end pb-4 border-b border-slate-100/80">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Pelanggan</p>
                  <p className="text-sm font-black text-slate-800">{selectedOrder.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Waktu</p>
                  <p className="text-xs font-bold text-slate-600">{selectedOrder.time} WIB</p>
                </div>
              </div>

              <div>
                <p className="text-base font-black text-slate-900 mb-3">{selectedOrder.type}</p>
                <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-500">Topping</span>
                    <span className="text-slate-800 text-right">{selectedOrder.toppings}</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-500">Sayur</span>
                    <span className="text-slate-800 text-right">{selectedOrder.veg}</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-500">Level Pedas</span>
                    <span className="text-rose-600 text-right">{selectedOrder.spicy}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Modal */}
            <div className="bg-slate-900 p-6 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Total Pembayaran</p>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black text-white">{selectedOrder.total}</span>
                  <span className="text-[8px] font-black uppercase px-2 py-0.5 rounded border border-slate-700 text-slate-300 bg-slate-800">{selectedOrder.pay}</span>
                </div>
              </div>
            </div>
          </div>
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
          
          <button onClick={() => { setIsSidebarOpen(false); router.push('/admin/kitchen'); }} className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-slate-600 hover:bg-amber-50 hover:text-amber-600 font-bold text-sm transition-all cursor-pointer group">
            <div className="flex items-center gap-3">
              <ChefHat className="w-5 h-5 text-slate-400 group-hover:text-amber-500 transition-colors" /> Kitchen View
            </div>
            <span className="bg-sky-50 text-sky-600 text-[10px] font-black px-2 py-0.5 rounded-lg border border-sky-100">4 Antre</span>
          </button>

          <button onClick={() => { setIsSidebarOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-indigo-600 text-white font-black text-sm shadow-[0_4px_20px_rgb(79,70,229,0.3)] transition-all cursor-pointer">
            <ClipboardList className="w-5 h-5" /> Order History
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