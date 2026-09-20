import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: Ambil daftar paket menu
export async function GET() {
  try {
    const menus = await prisma.menu.findMany({
      orderBy: { price: 'asc' },
    });
    return NextResponse.json({ success: true, data: menus });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Gagal mengambil data menu', error: error.message },
      { status: 500 }
    );
  }
}

// POST: Tambah menu baru
export async function POST(request) {
  try {
    const body = await request.json();
    const { slug, name, pcs, price, image, badge, isAvailable } = body;

    const newMenu = await prisma.menu.create({
      data: {
        slug,
        name,
        pcs,
        price: parseInt(price),
        image: image || '/produk.jpg',
        badge: badge || null,
        isAvailable: isAvailable ?? true,
      },
    });

    return NextResponse.json({ success: true, data: newMenu }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Gagal menambahkan menu', error: error.message },
      { status: 500 }
    );
  }
}

// PUT: Perbarui harga menu dari Dashboard Admin
export async function PUT(request) {
  try {
    const body = await request.json();
    const { slug, price } = body;

    if (!slug || price === undefined) {
      return NextResponse.json(
        { success: false, message: 'Slug menu dan harga baru wajib diisi' },
        { status: 400 }
      );
    }

    const updatedMenu = await prisma.menu.update({
      where: { slug },
      data: { price: parseInt(price, 10) },
    });

    return NextResponse.json({ success: true, data: updatedMenu });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Gagal memperbarui harga menu', error: error.message },
      { status: 500 }
    );
  }
}