import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Sesuaikan dengan instance Prisma kamu

const INITIAL_TOPPINGS = [
  { name: 'Katsuobushi', status: 'Aman', color: '#10b981', pct: 100 },
  { name: 'Keju Mozza', status: 'Aman', color: '#10b981', pct: 100 },
  { name: 'Sosis Ayam', status: 'Menipis', color: '#f59e0b', pct: 40 },
  { name: 'Crabstick', status: 'Aman', color: '#10b981', pct: 100 },
  { name: 'Kornet Gurih', status: 'Habis', color: '#ef4444', pct: 0 },
];

// GET: Mengambil seluruh daftar topping dari database
export async function GET() {
  try {
    let toppings = await prisma.topping.findMany({
      orderBy: { createdAt: 'asc' },
    });

    // Seed otomatis jika tabel Topping di database masih kosong
    if (toppings.length === 0) {
      await prisma.topping.createMany({
        data: INITIAL_TOPPINGS,
      });
      toppings = await prisma.topping.findMany({
        orderBy: { createdAt: 'asc' },
      });
    }

    return NextResponse.json({ success: true, data: toppings });
  } catch (error) {
    console.error('Gagal mengambil data topping:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal mengambil data topping' },
      { status: 500 }
    );
  }
}

// POST: Menambahkan topping baru
export async function POST(req) {
  try {
    const { name } = await req.json();
    if (!name || !name.trim()) {
      return NextResponse.json(
        { success: false, error: 'Nama topping tidak boleh kosong' },
        { status: 400 }
      );
    }

    const created = await prisma.topping.create({
      data: {
        name: name.trim(),
        status: 'Aman',
        color: '#10b981',
        pct: 100,
      },
    });

    return NextResponse.json({ success: true, data: created });
  } catch (error) {
    console.error('Gagal menambahkan topping:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal menambahkan topping' },
      { status: 500 }
    );
  }
}

// PUT: Memperbarui status ketersediaan topping (Aman -> Menipis -> Habis)
export async function PUT(req) {
  try {
    const { id, status, color, pct } = await req.json();

    const updated = await prisma.topping.update({
      where: { id },
      data: { status, color, pct },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('Gagal memperbarui status topping:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal memperbarui topping' },
      { status: 500 }
    );
  }
}

// DELETE: Menghapus topping dari daftar
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID topping diperlukan' },
        { status: 400 }
      );
    }

    await prisma.topping.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Topping berhasil dihapus' });
  } catch (error) {
    console.error('Gagal menghapus topping:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal menghapus topping' },
      { status: 500 }
    );
  }
}