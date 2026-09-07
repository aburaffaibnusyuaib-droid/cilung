'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, X, Plus, Minus, Check, Ban, Leaf, Flame, Store, 
  ShoppingCart, Trash2, CheckCircle2, Printer, QrCode,
  Banknote, ScanLine, Menu
} from 'lucide-react';

import AdminSidebar from '@/components/AdminSidebar';

/* ================= VECTOR FOOD ICONS ================= */
const SausageHorizontalIcon = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="8" width="18" height="8" rx="4" /><path d="M8 8v8" /><path d="M12 8v8" /><path d="M16 8v8" /></svg>
);
const BeefSteakIcon = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 6.5C17.5 4 13.5 3 9 4.5S3 9 3 13.5c0 4.5 3.5 7.5 8 7.5s9.5-3 9.5-7.5c0-2.5-.5-5-1.5-7z" /><ellipse cx="10" cy="11.5" rx="2.5" ry="1.8" fill="currentColor" fillOpacity="0.2" /><path d="M14 9.5c1.5 1 2.5 3 1.5 5" /><path d="M7 16c1.5.5 3 0 4-.5" /></svg>
);
const CrabIcon = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><ellipse cx="12" cy="14" rx="5" ry="4" /><path d="M7 11c-2-3-4-2-4 1 0 2 2 3 4 2" /><path d="M17 11c2-3 4-2 4 1 0 2-2 3-4 2" /><path d="M6 15l-3 2" /><path d="M6 17l-2 3" /><path d="M18 15l3 2" /><path d="M18 17l2 3" /></svg>
);
const CheeseWedgeIcon = ({ className = 'w-4.5 h-4.5' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 18h18L18 8 3 13v5z" /><path d="M3 13l15-5" /><circle cx="8" cy="15.5" r="1" fill="currentColor" /><circle cx="14" cy="14" r="1.3" fill="currentColor" /><circle cx="12" cy="11" r="0.8" fill="currentColor" /></svg>
);
const KatsuobushiIcon = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 8c3-3 7 0 9-1s4 4 1 5-6 1-8 3-4-4-2-7z" /><path d="M11 16c2-2 5 0 7-1" /></svg>
);
const TomatoIcon = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="14" r="7.5" /><path d="M12 6.5V3" /><path d="M9.5 5.5c1.5 1 2.5 1 2.5 1s1 0 2.5-1" /></svg>
);
const MayoSwirlIcon = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 9c2.5-3 5.5 3 8 0s4-3 8 0" /><path d="M4 15c2.5-3 5.5 3 8 0s4-3 8 0" /></svg>
);

const TOPPING_ICON_MAP = {
  'Sosis Ayam': <SausageHorizontalIcon className="w-4 h-4 text-orange-500" />,
  'Kornet Gurih': <BeefSteakIcon className="w-4 h-4 text-rose-700" />,
  'Crabstick': <CrabIcon className="w-4 h-4 text-red-500" />,
  'Keju Mozza': <CheeseWedgeIcon className="w-4.5 h-4.5 text-amber-500" />,
  'Katsuobushi': <KatsuobushiIcon className="w-4 h-4 text-yellow-700" />,
};

/* ================= MODAL KUSTOMISASI MENU ================= */
function MenuModal({ product, toppingsStock, onClose, onAddToCart }) {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [pakaiSayur, setPakaiSayur] = useState(true);
  const [selectedSaus, setSelectedSaus] = useState(['pedas', 'mayones']);
  const [spicyLevel, setSpicyLevel] = useState('Level 2');
  const [catatan, setCatatan] = useState('');

  const unitPrice = product.price || 6000;
  const totalPrice = unitPrice * quantity;

  const sausOptions = [
    { id: 'pedas', label: 'Saus Pedas', icon: <Flame className="w-4 h-4 text-red-600 stroke-[2.2]" />, activeStyle: 'border-red-600 text-red-700 bg-red-50', checkStyle: 'bg-red-600' },
    { id: 'tomat', label: 'Saus Tomat', icon: <TomatoIcon className="w-4 h-4 text-rose-600" />, activeStyle: 'border-rose-500 text-rose-700 bg-rose-50', checkStyle: 'bg-rose-500' },
    { id: 'mayones', label: 'Mayones', icon: <MayoSwirlIcon className="w-4 h-4 text-amber-500" />, activeStyle: 'border-amber-400 text-amber-700 bg-amber-50', checkStyle: 'bg-amber-400' },
    { id: 'tanpasaus', label: 'Tanpa Saus', icon: <Ban className="w-4 h-4 text-slate-400 stroke-[2.2]" />, activeStyle: 'border-slate-400 text-slate-600 bg-slate-50', checkStyle: 'bg-slate-500' },
  ];

  const handleToggleTopping = (name) => {
    if (name === 'Tanpa Topping') return setSelectedToppings(['Tanpa Topping']);
    let updated = selectedToppings.filter((item) => item !== 'Tanpa Topping');
    if (updated.includes(name)) updated = updated.filter((item) => item !== name);
    else updated.push(name);
    setSelectedToppings(updated);
  };

  const handleToggleSaus = (id) => {
    if (id === 'tanpasaus') return setSelectedSaus(['tanpasaus']);
    let updated = selectedSaus.filter((item) => item !== 'tanpasaus');
    if (updated.includes(id)) updated = updated.filter((item) => item !== id);
    else updated.push(id);
    setSelectedSaus(updated);
  };

  const handleAdd = () => {
    const orderData = {
      cartId: Date.now(),
      ...product,
      qty: quantity,
      totalPrice,
      customs: {
        toppings: selectedToppings.length > 0 ? selectedToppings : ['Tanpa Topping (Polos)'],
        veg: pakaiSayur ? 'Pakai Sayur (Kol & Daun Bawang)' : 'Tanpa Sayur',
        sauce: selectedSaus.length > 0 ? selectedSaus : ['Tanpa Saus'],
        spicyLevel: selectedSaus.includes('pedas') ? spicyLevel : null,
        note: catatan
      }
    };
    onAddToCart(orderData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="w-full max-w-xl bg-white rounded-[2rem] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden relative z-10 animate-in zoom-in-95 duration-200">
        
        {/* Header Modal */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 rounded-full overflow-hidden shadow-sm shrink-0 bg-slate-100">
              <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight leading-none" style={{ fontFamily: "'Montserrat', sans-serif" }}>{product.name}</h3>
                {product.pcs && <span className="text-[10px] font-black bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">{product.pcs}</span>}
              </div>
              <p className="text-sm font-black text-red-600 mt-1">Rp {unitPrice.toLocaleString('id-ID')}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-600 flex items-center justify-center transition-colors cursor-pointer"><X className="w-5 h-5 stroke-[2.5]" /></button>
        </div>

        {/* Body Racikan */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 bg-[#fcfcfc] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          
          {/* Topping Dinamis */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black uppercase text-slate-800 tracking-wider">PILIH TOPPING</label>
              <span className="text-[10px] text-slate-400 font-bold">Bisa Mix</span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {toppingsStock.map((topping) => {
                const isHabis = topping.status === 'Habis';
                const isSelected = selectedToppings.includes(topping.name);
                const icon = TOPPING_ICON_MAP[topping.name] || <Flame className="w-4 h-4 text-amber-500" />;

                return (
                  <button 
                    key={topping.id} 
                    type="button"
                    disabled={isHabis}
                    onClick={() => handleToggleTopping(topping.name)} 
                    className={`group py-3 px-4 rounded-2xl border-2 transition-all duration-200 flex items-center justify-between ${
                      isHabis 
                        ? 'bg-slate-100/70 border-slate-200 text-slate-400 opacity-60 cursor-not-allowed'
                        : isSelected 
                          ? 'border-amber-500 text-amber-900 bg-amber-50 shadow-sm cursor-pointer' 
                          : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600 cursor-pointer'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-5 h-5 shrink-0">{icon}</div>
                      <div className="text-left truncate">
                        <span className={`font-bold text-xs block truncate ${isHabis ? 'line-through' : ''}`}>{topping.name}</span>
                        {topping.status === 'Menipis' && <span className="text-[8px] font-black uppercase text-amber-600">Menipis</span>}
                        {isHabis && <span className="text-[8px] font-black uppercase text-red-500">Habis</span>}
                      </div>
                    </div>
                    {isSelected && !isHabis && (
                      <div className="w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-white stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}

              <button 
                type="button"
                onClick={() => handleToggleTopping('Tanpa Topping')} 
                className={`group py-3 px-4 rounded-2xl border-2 transition-all duration-200 flex items-center justify-between cursor-pointer ${
                  selectedToppings.includes('Tanpa Topping') 
                    ? 'border-slate-400 text-slate-700 bg-slate-100 shadow-sm' 
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Ban className="w-4 h-4 text-slate-400 stroke-[2.2]" />
                  <span className="font-bold text-xs">Tanpa Topping</span>
                </div>
                {selectedToppings.includes('Tanpa Topping') && (
                  <div className="w-4 h-4 rounded-full bg-slate-500 flex items-center justify-center">
                    <Check className="w-3 h-3 text-white stroke-[3]" />
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Sayuran */}
          <div className="space-y-3">
            <label className="text-xs font-black uppercase text-slate-800 tracking-wider">SAYURAN</label>
            <div className="grid grid-cols-2 gap-2.5">
              <button 
                type="button"
                onClick={() => setPakaiSayur(true)} 
                className={`group py-3 px-4 rounded-2xl border-2 transition-all duration-200 flex items-center justify-between cursor-pointer ${pakaiSayur ? 'border-emerald-500 text-emerald-800 bg-emerald-50 shadow-sm' : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600'}`}
              >
                <div className="flex items-center gap-2.5"><Leaf className={`w-5 h-5 stroke-[2.2] ${pakaiSayur ? 'text-emerald-500' : 'text-slate-400'}`} /><span className="font-bold text-xs">Pakai Sayur</span></div>
                {pakaiSayur && <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center"><Check className="w-3 h-3 text-white stroke-[3]" /></div>}
              </button>
              <button 
                type="button"
                onClick={() => setPakaiSayur(false)} 
                className={`group py-3 px-4 rounded-2xl border-2 transition-all duration-200 flex items-center justify-between cursor-pointer ${!pakaiSayur ? 'border-slate-400 text-slate-700 bg-slate-100 shadow-sm' : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600'}`}
              >
                <div className="flex items-center gap-2.5"><Ban className="w-5 h-5 stroke-[2.2] text-slate-400" /><span className="font-bold text-xs">Tanpa Sayur</span></div>
                {!pakaiSayur && <div className="w-4 h-4 rounded-full bg-slate-500 flex items-center justify-center"><Check className="w-3 h-3 text-white stroke-[3]" /></div>}
              </button>
            </div>
          </div>

          {/* Saus */}
          <div className="space-y-3">
            <label className="text-xs font-black uppercase text-slate-800 tracking-wider">PILIHAN SAUS</label>
            <div className="grid grid-cols-2 gap-2.5">
              {sausOptions.map((saus) => (
                <button 
                  key={saus.id} 
                  type="button"
                  onClick={() => handleToggleSaus(saus.id)} 
                  className={`group py-3 px-4 rounded-2xl border-2 transition-all duration-200 flex items-center justify-between cursor-pointer ${selectedSaus.includes(saus.id) ? `${saus.activeStyle} shadow-sm` : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600'}`}
                >
                  <div className="flex items-center gap-2.5"><div className="w-5 h-5">{saus.icon}</div><span className="font-bold text-xs">{saus.label}</span></div>
                  {selectedSaus.includes(saus.id) && <div className={`w-4 h-4 rounded-full flex items-center justify-center ${saus.checkStyle}`}><Check className="w-3 h-3 text-white stroke-[3]" /></div>}
                </button>
              ))}
            </div>

            {/* Area Level Pedas */}
            <div className="h-[76px] w-full transition-all duration-300 overflow-hidden">
              {selectedSaus.includes('pedas') && (
                <div className="bg-red-50 p-3.5 rounded-2xl border-2 border-red-100 h-full animate-in fade-in flex flex-col justify-center">
                  <p className="text-[10px] font-black uppercase tracking-widest text-red-700 mb-1.5">Level Kepedasan</p>
                  <div className="flex gap-2">
                    {['Level 1', 'Level 2', 'Level 3'].map(lvl => (
                      <button 
                        key={lvl} 
                        type="button"
                        onClick={() => setSpicyLevel(lvl)} 
                        className={`flex-1 py-1.5 text-xs font-black uppercase rounded-xl border-2 transition-colors cursor-pointer ${spicyLevel === lvl ? 'bg-red-600 text-white border-red-600 shadow-md shadow-red-500/20' : 'bg-white text-red-600 border-red-200 hover:bg-red-100'}`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Catatan Khusus */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 px-1">Catatan Khusus (Opsional):</label>
            <textarea 
              value={catatan} 
              onChange={(e) => setCatatan(e.target.value)} 
              placeholder="Contoh: Sausnya dipisah ya bang..." 
              rows={2} 
              className="w-full bg-white border-2 border-slate-200 rounded-2xl p-4 text-xs font-bold text-slate-800 focus:outline-none focus:border-red-400 focus:ring-4 focus:ring-red-50 transition-all resize-none" 
            />
          </div>
        </div>

        {/* Action Bar Bawah */}
        <div className="p-4 bg-white flex items-center justify-between gap-4 shrink-0 rounded-b-[2rem] border-t border-slate-100">
          <div className="flex items-center gap-3 bg-slate-50 p-1.5 rounded-2xl border border-slate-200">
            <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 rounded-xl bg-white hover:bg-slate-100 flex items-center justify-center text-slate-600 shadow-sm active:scale-95 cursor-pointer"><Minus className="w-4 h-4 stroke-[2.5]" /></button>
            <span className="font-black text-sm text-slate-900 w-5 text-center">{quantity}</span>
            <button type="button" onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 rounded-xl bg-red-600 hover:bg-red-700 flex items-center justify-center text-white shadow-sm shadow-red-500/30 active:scale-95 cursor-pointer"><Plus className="w-4 h-4 stroke-[2.5]" /></button>
          </div>
          <button 
            type="button"
            onClick={handleAdd} 
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-4 px-6 rounded-2xl text-xs font-black tracking-widest uppercase flex items-center justify-between shadow-lg shadow-red-600/25 active:scale-[0.98] cursor-pointer transition-all"
          >
            <span>TAMBAH KE KERANJANG</span>
            <span className="bg-white/20 px-2.5 py-1 rounded-lg">Rp {totalPrice.toLocaleString('id-ID')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= HALAMAN KASIR POS UTAMA ================= */
export default function POSPage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // State Harga Paten & Stok Topping Terhubung ke Dashboard
  const [prices, setPrices] = useState({ kecil: 6000, besar: 12000, special: 17000 });
  const [toppingsStock, setToppingsStock] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // 3 Menu Paten Siboy
  const catalogMenus = [
    { 
      id: 'M1', 
      name: 'Porsi Kecil', 
      pcs: '5 pcs', 
      price: prices.kecil, 
      desc: 'Cemilan pas takoyaki gurih hangat isi 5 butir.', 
      img: 'https://images.unsplash.com/photo-1592914610354-fd354d45fe82?q=80&w=400&auto=format&fit=crop' 
    },
    { 
      id: 'M2', 
      name: 'Porsi Besar', 
      pcs: '10 pcs', 
      price: prices.besar, 
      desc: 'Porsi favorit isi 10 butir nikmat kenyang mantap.', 
      img: 'https://images.unsplash.com/photo-1592914610354-fd354d45fe82?q=80&w=400&auto=format&fit=crop' 
    },
    { 
      id: 'M3', 
      name: 'Porsi Special', 
      pcs: '15 pcs', 
      price: prices.special, 
      desc: 'Porsi puas rame-rame 15 butir dengan topping melimpah.', 
      img: 'https://images.unsplash.com/photo-1592914610354-fd354d45fe82?q=80&w=400&auto=format&fit=crop' 
    }
  ];

  // Sinkronisasi data harga dan topping dari localStorage
  useEffect(() => {
    setIsMounted(true);
    const auth = localStorage.getItem('admin_auth');
    if (!auth) router.push('/admin/login');

    const syncWithDashboard = () => {
      try {
        const savedPrices = localStorage.getItem('siboy_prices');
        if (savedPrices) setPrices(JSON.parse(savedPrices));

        const savedToppings = localStorage.getItem('siboy_toppings');
        if (savedToppings) {
          setToppingsStock(JSON.parse(savedToppings));
        } else {
          setToppingsStock([
            { id: 1, name: 'Katsuobushi', status: 'Aman' },
            { id: 2, name: 'Keju Mozza', status: 'Aman' },
            { id: 3, name: 'Sosis Ayam', status: 'Menipis' },
            { id: 4, name: 'Crabstick', status: 'Aman' },
            { id: 5, name: 'Kornet Gurih', status: 'Habis' }
          ]);
        }
      } catch (e) {}
    };

    syncWithDashboard();
    window.addEventListener('storage', syncWithDashboard);
    return () => window.removeEventListener('storage', syncWithDashboard);
  }, [router]);

  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [orderType, setOrderType] = useState('Take Away');
  
  // State Interaksi & Modal
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [paymentMode, setPaymentMode] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [queueNumber, setQueueNumber] = useState(1);
  const [lastOrderId, setLastOrderId] = useState('');

  const handleAddToCart = (orderData) => setCart([...cart, orderData]);
  const updateQty = (cartId, delta) => setCart(cart.map(item => item.cartId === cartId ? { ...item, qty: Math.max(1, item.qty + delta) } : item));
  const removeFromCart = (cartId) => setCart(cart.filter(item => item.cartId !== cartId));
  const totalAkhir = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

  const initPayment = (mode) => {
    if (cart.length === 0) return alert("Keranjang kosong!");
    if (!customerName.trim()) return alert("Nama pemesan wajib diisi!");
    setPaymentMode(mode);
    if (mode === 'qris') setPaymentAmount(totalAkhir);
    else setPaymentAmount('');
  };

  // Proses Bayar: Kirim data otomatis ke Kitchen KDS, Order History & Live Ticket
  const processPayment = () => {
    if (paymentMode === 'cash' && Number(paymentAmount) < totalAkhir) {
      return alert("Nominal uang tunai kurang!");
    }

    const orderId = `SB-${Date.now().toString().slice(-4)}`;
    const now = new Date();
    const formattedDate = now.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
    const formattedTime = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    const formattedQNo = `#${String(queueNumber).padStart(2, '0')}`;

    // 1. Kirim Order Otomatis ke Kitchen Display System (KDS)
    const newKitchenOrder = {
      id: orderId,
      qNo: formattedQNo,
      time: formattedTime,
      timer: 'Baru Masuk',
      status: 'pending',
      name: customerName,
      type: cart.map(item => `${item.qty}x ${item.name}`).join(' + '),
      toppings: cart.flatMap(item => item.customs.toppings).filter((v, i, a) => a.indexOf(v) === i).join(', '),
      veg: cart[0]?.customs.veg || 'Pakai Sayur',
      spicy: cart[0]?.customs.spicyLevel ? `Pedas (${cart[0].customs.spicyLevel})` : 'Normal',
      note: cart.map(item => item.customs.note).filter(Boolean).join('; ')
    };

    try {
      const existingKitchen = JSON.parse(localStorage.getItem('siboy_kitchen_orders') || '[]');
      localStorage.setItem('siboy_kitchen_orders', JSON.stringify([...existingKitchen, newKitchenOrder]));
    } catch (e) {}

    // 2. Kirim Data Transaksi Otomatis ke Order History
    const newHistoryEntry = {
      id: orderId,
      timestamp: now.getTime(),
      date: formattedDate,
      time: formattedTime,
      name: customerName,
      type: cart.map(item => `${item.qty}x ${item.name}`).join(' + '),
      items: cart.map(item => ({
        name: item.name,
        qty: item.qty,
        price: item.price,
        toppings: item.customs.toppings.join(', '),
        veg: item.customs.veg,
        spicy: item.customs.spicyLevel ? `Pedas (${item.customs.spicyLevel})` : 'Normal',
        note: item.customs.note || ''
      })),
      toppings: cart.flatMap(item => item.customs.toppings).filter((v, i, a) => a.indexOf(v) === i).join(', '),
      veg: cart[0]?.customs.veg || 'Pakai Sayur',
      spicy: cart[0]?.customs.spicyLevel ? `Pedas (${cart[0].customs.spicyLevel})` : 'Normal',
      total: `Rp ${totalAkhir.toLocaleString('id-ID')}`,
      rawTotal: totalAkhir,
      pay: paymentMode === 'cash' ? 'CASH' : 'QRIS',
      stat: 'Selesai'
    };

    try {
      const existingHistory = JSON.parse(localStorage.getItem('siboy_order_history') || '[]');
      localStorage.setItem('siboy_order_history', JSON.stringify([newHistoryEntry, ...existingHistory]));
      window.dispatchEvent(new Event('storage'));
    } catch (e) {}

    setLastOrderId(orderId);
    setPaymentMode(null);
    setShowSuccessModal(true);
  };

  const resetOrder = () => {
    setCart([]); 
    setCustomerName(''); 
    setPaymentAmount(''); 
    setQueueNumber(prev => prev + 1); 
    setShowSuccessModal(false);
  };

  const formatSaus = (sauceArr, level) => {
    const labels = sauceArr.map(s => s === 'pedas' ? 'Saus Pedas' : s === 'tomat' ? 'Saus Tomat' : s === 'mayones' ? 'Mayones' : 'Tanpa Saus');
    let text = labels.join(' + ');
    if (level) text += ` (${level})`;
    return text;
  };

  const filteredMenus = catalogMenus.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-[#faf9f6] text-slate-900 flex overflow-hidden relative" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      
      {/* Background Grid Style */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundSize: '32px 32px', backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.04) 1px, transparent 1px)' }} />

      {/* ================= AREA KIRI: KATALOG MENU ================= */}
      <div className="flex-1 flex flex-col h-screen relative z-10 lg:pr-[420px]">
        
        {/* Header Terminal Kasir */}
        <div className="px-6 sm:px-8 py-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <button 
              type="button"
              onClick={() => setIsSidebarOpen(true)} 
              className="w-12 h-12 bg-white text-slate-800 hover:bg-slate-100 border-2 border-slate-100 rounded-2xl transition-all flex flex-col items-center justify-center gap-1 shadow-sm cursor-pointer active:scale-95"
            >
              <Menu className="w-6 h-6 stroke-[2.5]" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-md border-2 border-slate-800">
                <Store className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tight leading-none text-slate-800" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  SIBOY<span className="text-amber-500">POS</span>
                </h2>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">Terminal Kasir Cepat</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative w-64 hidden md:block">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Cari porsi takoyaki..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border-2 border-slate-200 text-xs font-bold text-slate-800 rounded-full pl-10 pr-4 py-3 outline-none focus:border-slate-800 shadow-sm transition-colors" 
              />
            </div>
          </div>
        </div>

        {/* Grid 3 Kartu Menu Paten */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-8 pb-32 lg:pb-8 relative z-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 lg:gap-6">
            {filteredMenus.map((item) => (
              <div 
                key={item.id} 
                onClick={() => setSelectedProduct(item)} 
                className="bg-white rounded-3xl p-3 border-2 border-slate-100 transition-all duration-300 cursor-pointer group flex flex-col hover:-translate-y-1.5 hover:shadow-xl hover:shadow-slate-500/10 hover:border-slate-300 active:scale-[0.98]"
              >
                <div className="aspect-[4/3] w-full relative bg-slate-100 rounded-[1.25rem] overflow-hidden mb-3 shrink-0">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                </div>
                <div className="px-2 pb-2 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Takoyaki Siboy</span>
                      <span className="text-[9px] font-black bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">{item.pcs}</span>
                    </div>
                    <h3 className="text-base font-black text-slate-800 mt-0.5 leading-tight">{item.name}</h3>
                    <p className="text-[10px] text-slate-400 truncate mt-1">{item.desc}</p>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                    <span className="text-base font-black text-red-600">Rp {item.price.toLocaleString('id-ID')}</span>
                    <div className="w-9 h-9 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                      <Plus className="w-5 h-5 stroke-[2.5]" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= AREA KANAN: FLOATING CART PANEL ================= */}
      <div className="fixed inset-y-0 right-0 w-full lg:w-[420px] bg-transparent lg:p-6 pointer-events-none z-40 flex lg:block justify-end">
        <div className="w-full lg:w-full h-full bg-white lg:rounded-[2rem] shadow-[-10px_0_40px_rgb(0,0,0,0.08)] flex flex-col overflow-hidden pointer-events-auto border-2 border-slate-100">
          
          {/* Header Keranjang */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center"><ShoppingCart className="w-5 h-5" /></div>
              <div><h3 className="text-sm font-black uppercase tracking-wider text-slate-900 leading-none">KERANJANG</h3><p className="text-[10px] font-bold text-amber-600 mt-1 uppercase tracking-widest bg-amber-50 inline-block px-2 py-0.5 rounded border border-amber-100">✨ {cart.length} Pesanan</p></div>
            </div>
          </div>

          {/* Form Pelanggan */}
          <div className="p-6 pb-4 border-b border-slate-50 space-y-4 shrink-0 bg-slate-50/50">
            <div className="flex gap-2">
              <button 
                type="button"
                onClick={() => setOrderType('Take Away')} 
                className={`flex-1 py-3 text-[10px] font-black uppercase rounded-2xl transition-all cursor-pointer border-2 ${
                  orderType === 'Take Away' 
                    ? 'bg-blue-500 border-blue-600 text-white shadow-md shadow-blue-500/20' 
                    : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                }`}
              >
                Take Away
              </button>
              <button 
                type="button"
                onClick={() => setOrderType('Dine In')} 
                className={`flex-1 py-3 text-[10px] font-black uppercase rounded-2xl transition-all cursor-pointer border-2 ${
                  orderType === 'Dine In' 
                    ? 'bg-red-600 border-red-700 text-white shadow-md shadow-red-600/20' 
                    : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                }`}
              >
                Dine In
              </button>
            </div>

            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1.5 block px-1">NAMA PEMESAN *</label>
              <input 
                type="text" 
                placeholder="Ketik nama pembeli..." 
                value={customerName} 
                onChange={(e) => setCustomerName(e.target.value)} 
                className="w-full bg-white border-2 border-slate-200 text-xs font-bold text-slate-800 rounded-2xl px-4 py-3.5 outline-none focus:border-slate-800 focus:ring-4 focus:ring-slate-100 transition-all" 
              />
            </div>
          </div>

          {/* List Keranjang */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-white [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-300 gap-4">
                <ShoppingCart className="w-16 h-16 stroke-[1]" />
                <p className="text-xs font-black uppercase tracking-widest">Belum Ada Pesanan</p>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.cartId} className="bg-white border-2 border-slate-100 rounded-2xl p-4 shadow-sm relative group animate-in slide-in-from-right-4 duration-300">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">{item.name}</h4>
                      <span className="text-sm font-black text-red-600">Rp {(item.price * item.qty).toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => removeFromCart(item.cartId)} className="w-8 h-8 rounded-lg bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>

                  {/* Badges Racikan */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    <span className="inline-flex text-[9px] font-black uppercase bg-amber-50 text-amber-700 border border-amber-200 px-2 py-1 rounded-md">
                      ✨ {item.customs.toppings.join(', ')}
                    </span>
                    <span className="inline-flex text-[9px] font-black uppercase bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-1 rounded-md">
                      🥬 {item.customs.veg}
                    </span>
                    {item.customs.sauce[0] !== 'Tanpa Saus' && (
                      <span className="inline-flex text-[9px] font-black uppercase bg-rose-50 text-rose-700 border border-rose-200 px-2 py-1 rounded-md">
                        🔥 {formatSaus(item.customs.sauce, item.customs.spicyLevel)}
                      </span>
                    )}
                  </div>

                  {/* Qty Controls */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <span className="text-[10px] font-black uppercase text-slate-400">Porsi:</span>
                    <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl p-1">
                      <button onClick={() => updateQty(item.cartId, -1)} className="w-7 h-7 bg-white rounded-lg flex items-center justify-center text-slate-600 shadow-sm active:scale-95 cursor-pointer"><Minus className="w-3.5 h-3.5" /></button>
                      <span className="text-xs font-black w-4 text-center">{item.qty}</span>
                      <button onClick={() => updateQty(item.cartId, 1)} className="w-7 h-7 bg-red-600 text-white rounded-lg flex items-center justify-center shadow-sm active:scale-95 cursor-pointer"><Plus className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout (Tunai & QRIS) */}
          <div className="p-6 bg-white border-t border-slate-100 shrink-0 shadow-[0_-10px_20px_rgb(0,0,0,0.03)] z-10">
            <div className="flex justify-between items-end mb-4">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Pembayaran:</span>
              <span className="text-3xl font-black text-red-600 tracking-tight leading-none">Rp {totalAkhir.toLocaleString('id-ID')}</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button 
                type="button"
                onClick={() => initPayment('cash')} 
                className="flex items-center justify-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-2 border-emerald-200 text-xs font-black uppercase tracking-widest py-3.5 rounded-2xl transition-all active:scale-[0.98] cursor-pointer"
              >
                <Banknote className="w-4 h-4" /> Bayar Tunai
              </button>
              <button 
                type="button"
                onClick={() => initPayment('qris')} 
                className="flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white border-2 border-sky-500 hover:border-sky-600 shadow-lg shadow-sky-500/25 text-xs font-black uppercase tracking-widest py-3.5 rounded-2xl transition-all active:scale-[0.98] cursor-pointer"
              >
                <QrCode className="w-4 h-4" /> Via QRIS
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL RACIKAN */}
      <MenuModal 
        product={selectedProduct} 
        toppingsStock={toppingsStock}
        onClose={() => setSelectedProduct(null)} 
        onAddToCart={handleAddToCart} 
      />

      {/* MODAL BAYAR TUNAI */}
      {paymentMode === 'cash' && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-[2rem] w-full max-w-sm overflow-hidden relative shadow-2xl p-7 animate-in zoom-in-95">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-black uppercase text-slate-800 tracking-tight">Kalkulator Tunai</h2>
              <button onClick={() => setPaymentMode(null)} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"><X className="w-4 h-4" /></button>
            </div>
            
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 mb-5 text-center">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Tagihan</p>
              <p className="text-2xl font-black text-red-600">Rp {totalAkhir.toLocaleString('id-ID')}</p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-black text-slate-400">Rp</span>
                <input 
                  type="number" 
                  autoFocus
                  placeholder="Ketik uang tunai..." 
                  value={paymentAmount || ''} 
                  onChange={(e) => setPaymentAmount(Number(e.target.value))}
                  className="w-full bg-white border-2 border-slate-200 rounded-2xl pl-11 pr-4 py-4 text-base font-black text-slate-800 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => setPaymentAmount(totalAkhir)} className="py-2.5 text-xs font-black uppercase rounded-xl border-2 border-slate-100 bg-white text-slate-600 hover:border-emerald-500 hover:text-emerald-600 cursor-pointer">Uang Pas</button>
                <button onClick={() => setPaymentAmount(20000)} className="py-2.5 text-xs font-black uppercase rounded-xl border-2 border-slate-100 bg-white text-slate-600 hover:border-emerald-500 hover:text-emerald-600 cursor-pointer">Rp 20.000</button>
                <button onClick={() => setPaymentAmount(50000)} className="py-2.5 text-xs font-black uppercase rounded-xl border-2 border-slate-100 bg-white text-slate-600 hover:border-emerald-500 hover:text-emerald-600 cursor-pointer">Rp 50.000</button>
                <button onClick={() => setPaymentAmount(100000)} className="py-2.5 text-xs font-black uppercase rounded-xl border-2 border-slate-100 bg-white text-slate-600 hover:border-emerald-500 hover:text-emerald-600 cursor-pointer">Rp 100.000</button>
              </div>
            </div>

            {paymentAmount >= totalAkhir && totalAkhir > 0 && (
               <div className="flex items-center justify-between mb-5 bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                 <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700">Kembalian:</span>
                 <span className="text-lg font-black text-emerald-600">Rp {(paymentAmount - totalAkhir).toLocaleString('id-ID')}</span>
               </div>
            )}

            <button onClick={processPayment} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-2xl text-xs font-black tracking-widest uppercase shadow-lg shadow-emerald-500/30 active:scale-95 transition-all cursor-pointer">Selesaikan Transaksi</button>
          </div>
        </div>
      )}

      {/* MODAL BAYAR QRIS */}
      {paymentMode === 'qris' && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-[2rem] w-full max-w-sm overflow-hidden relative shadow-2xl p-7 animate-in zoom-in-95 flex flex-col items-center text-center">
            <button onClick={() => setPaymentMode(null)} className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 cursor-pointer"><X className="w-4 h-4" /></button>
            
            <div className="bg-sky-100 text-sky-600 rounded-2xl px-4 py-1.5 mb-5 flex items-center gap-2">
              <ScanLine className="w-4 h-4" /> <span className="text-[10px] font-black uppercase tracking-widest">Pembayaran QRIS</span>
            </div>

            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Tagihan</p>
            <p className="text-3xl font-black text-sky-600 mb-6">Rp {totalAkhir.toLocaleString('id-ID')}</p>

            <div className="bg-white p-2 border-4 border-dashed border-slate-200 rounded-[2rem] mb-6 shadow-inner">
              <QrCode className="w-48 h-48 text-slate-800" />
            </div>

            <p className="text-xs font-bold text-slate-500 mb-6">Minta pelanggan memindai QR di atas menggunakan aplikasi e-Wallet atau M-Banking.</p>

            <button onClick={processPayment} className="w-full bg-sky-500 hover:bg-sky-600 text-white py-4 rounded-2xl text-xs font-black tracking-widest uppercase shadow-lg shadow-sky-500/30 active:scale-95 transition-all cursor-pointer">Verifikasi Lunas</button>
          </div>
        </div>
      )}

      {/* MODAL SUKSES (Cetak Struk & Scan Karcis Unik) */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-[2.5rem] w-full max-w-sm overflow-hidden relative shadow-2xl p-6 sm:p-7 flex flex-col items-center text-center animate-in zoom-in-90 duration-300">
            
            <div className="w-14 h-14 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-2 animate-bounce">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            
            <span className="text-3xl font-black text-slate-900 tracking-tighter leading-none mb-1">
              #{String(queueNumber).padStart(2, '0')}
            </span>
            <h2 className="text-base font-black uppercase tracking-tight text-slate-800 mb-0.5" style={{ fontFamily: "'Montserrat', sans-serif" }}>Transaksi Berhasil!</h2>
            <p className="text-[11px] font-bold text-slate-500 mb-4">Atas Nama: <span className="text-slate-800 uppercase font-black">{customerName}</span> ({orderType})</p>

            {/* QR Code Dinamis Khusus Pesanan Ini */}
            <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-3.5 mb-4 flex flex-col items-center w-full">
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">Scan Karcis Pelanggan (Live Tracker)</p>
              <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-200 mb-2">
                <QrCode className="w-28 h-28 text-slate-800" />
              </div>
              <button 
                type="button"
                onClick={() => window.open(`/ticket?id=${lastOrderId}`, '_blank')}
                className="text-[10px] font-black uppercase text-indigo-600 hover:text-indigo-700 hover:underline flex items-center gap-1 cursor-pointer"
              >
                🔗 Buka Karcis Pesanan Ini ({lastOrderId})
              </button>
            </div>

            {/* Rincian Struk Singkat */}
            <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 mb-4 text-left text-xs space-y-1.5">
              <div className="flex justify-between font-bold text-slate-500">
                <span>Total Tagihan</span><span className="font-black text-slate-800">Rp {totalAkhir.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between font-bold text-slate-500">
                <span>Bayar ({paymentMode === 'cash' ? 'Tunai' : 'QRIS'})</span><span className="font-black text-slate-800">Rp {Number(paymentAmount).toLocaleString('id-ID')}</span>
              </div>
              {paymentMode === 'cash' && (
                <div className="flex justify-between font-black text-emerald-600 pt-1 border-t border-slate-200">
                  <span>Kembalian</span><span>Rp {(paymentAmount - totalAkhir).toLocaleString('id-ID')}</span>
                </div>
              )}
            </div>

            <div className="w-full space-y-2">
              <button onClick={() => window.print()} className="w-full flex items-center justify-center gap-2 bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 text-xs font-black uppercase tracking-widest py-3 rounded-xl transition-all cursor-pointer">
                <Printer className="w-4 h-4" /> Cetak Struk Kertas
              </button>
              <button onClick={resetOrder} className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black uppercase tracking-widest py-3 rounded-xl transition-all shadow-md cursor-pointer">
                Order Baru (Selanjutnya)
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Global Sidebar Admin */}
      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
    </div>
  );
}