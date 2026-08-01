"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [cart, setCart] = useState([]);

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar cartCount={cart.length} onOpenCart={() => alert("Keranjang diklik!")} />
      
      <div className="max-w-6xl mx-auto px-4 py-12 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
          Selamat Datang di Web UMKM Kedai Laras!
        </h2>
        <p className="text-gray-600">
          Navbar dan data dummy berhasil terpasang sempurna. Siap lanjut rakit Hero Section & Katalog Produk!
        </p>
      </div>
    </main>
  );
}