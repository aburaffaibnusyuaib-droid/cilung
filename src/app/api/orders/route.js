import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: Ambil daftar pesanan, detail single order via ?id=..., ATAU generate antrean harian
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const id = searchParams.get('id');

    // 1. Jika Live Ticket meminta data 1 pesanan spesifik via ?id=SB-...
    if (id) {
      const singleOrder = await prisma.order.findUnique({
        where: { id },
        include: {
          items: true,
        },
      });

      if (!singleOrder) {
        return NextResponse.json(
          { success: false, message: 'Pesanan tidak ditemukan' },
          { status: 404 }
        );
      }

      return NextResponse.json({ success: true, data: singleOrder });
    }

    // 2. Jika Kasir POS meminta nomor antrean harian berikutnya
    if (action === 'next_queue') {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);

      const countToday = await prisma.order.count({
        where: {
          createdAt: {
            gte: startOfDay,
          },
        },
      });

      const nextNumber = countToday + 1;
      const formattedQ = `#${String(nextNumber).padStart(2, '0')}`;
      
      const now = new Date();
      const yy = String(now.getFullYear()).slice(-2);
      const mm = String(now.getMonth() + 1).padStart(2, '0');
      const dd = String(now.getDate()).padStart(2, '0');
      const generatedOrderId = `SB-${yy}${mm}${dd}-${String(nextNumber).padStart(3, '0')}`;

      return NextResponse.json({
        success: true,
        queueNumber: nextNumber,
        formattedQ,
        generatedOrderId,
      });
    }

    // 3. Default: Ambil seluruh daftar pesanan untuk Dapur & Riwayat
    const orders = await prisma.order.findMany({
      include: {
        items: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ success: true, data: orders });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Gagal mengambil data pesanan', error: error.message },
      { status: 500 }
    );
  }
}

// POST: Simpan transaksi baru dari Kasir POS
export async function POST(request) {
  try {
    const body = await request.json();
    const { id, customerName, customerPhone, totalPrice, notes, items, status } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Pesanan harus memiliki minimal 1 item' },
        { status: 400 }
      );
    }

    const orderData = {
      customerName: customerName || 'Pelanggan Walk-in',
      customerPhone: customerPhone || '-',
      totalPrice: parseInt(totalPrice),
      status: status || 'pending',
      notes: notes || null,
      items: {
        create: items.map((item) => ({
          menuName: item.name,
          quantity: parseInt(item.quantity || item.qty),
          price: parseInt(item.price),
        })),
      },
    };

    if (id) {
      orderData.id = id;
    }

    const order = await prisma.order.create({
      data: orderData,
      include: {
        items: true,
      },
    });

    return NextResponse.json({ success: true, data: order }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Gagal mencatat pesanan ke database', error: error.message },
      { status: 500 }
    );
  }
}

// PATCH: Update status pesanan dari Layar Dapur (pending -> cooking -> SELESAI)
export async function PATCH(request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, message: 'ID pesanan dan status wajib diisi' },
        { status: 400 }
      );
    }

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { status },
      include: { items: true },
    });

    return NextResponse.json({ success: true, data: updatedOrder });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Gagal memperbarui status pesanan', error: error.message },
      { status: 500 }
    );
  }
}

// DELETE: Hapus riwayat pesanan dari Supabase
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'ID pesanan diperlukan' },
        { status: 400 }
      );
    }

    await prisma.orderItem.deleteMany({
      where: { orderId: id },
    });

    await prisma.order.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Pesanan berhasil dihapus' });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Gagal menghapus pesanan', error: error.message },
      { status: 500 }
    );
  }
}