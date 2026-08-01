export const storeData = {
  name: "Kedai Laras",
  tagline: "Menata Waktu, Merawat Rasa",
  description: "Menyajikan aneka minuman dan hidangan penutup lokal pilihan dengan cita rasa khas dan bahan berkualitas.",
  whatsappNumber: "6281234567890", // Ganti dengan nomor WA UMKM (format 62)
  address: "Jl. Pemuda No. 45, Jakarta Timur",
  hours: "08.00 - 21.00 WIB",
  isOpen: true,
  socials: {
    instagram: "https://instagram.com",
    tiktok: "https://tiktok.com"
  }
};

export const categories = [
  { id: "all", name: "Semua Menu" },
  { id: "minuman", name: "Minuman" },
  { id: "makanan", name: "Makanan" },
  { id: "snack", name: "Cemilan" }
];

export const products = [
  {
    id: 1,
    name: "Kopi Susu Laras",
    category: "minuman",
    price: 18000,
    rating: 4.9,
    isBestSeller: true,
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=600&auto=format&fit=crop",
    description: "Espresso paduan biji kopi pilihan dengan susu segar dan gula aren asli."
  },
  {
    id: 2,
    name: "Matcha Latte Premium",
    category: "minuman",
    price: 22000,
    rating: 4.8,
    isBestSeller: true,
    image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=600&auto=format&fit=crop",
    description: "Bubuk matcha murni impor Jepang dipadu susu segar gurih."
  },
  {
    id: 3,
    name: "Roti Bakar Cokelat Keju",
    category: "snack",
    price: 15000,
    rating: 4.7,
    isBestSeller: false,
    image: "https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?q=80&w=600&auto=format&fit=crop",
    description: "Roti gandum tebal panggang renyah dengan isian cokelat lumer dan keju melimpah."
  },
  {
    id: 4,
    name: "Nasi Goreng Spesial Laras",
    category: "makanan",
    price: 25000,
    rating: 4.9,
    isBestSeller: true,
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=600&auto=format&fit=crop",
    description: "Nasi goreng rempah khas nusantara disajikan dengan telur mata sapi dan ayam suwir."
  }
];