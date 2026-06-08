import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { customerName, phone, address, note, paymentMethod, items, totalAmount } = body

    if (!customerName || !phone || !address || !items?.length) {
      return NextResponse.json({ error: 'Thiếu thông tin bắt buộc' }, { status: 400 })
    }

    const payload = await getPayloadClient()
    const order = await payload.create({
      collection: 'orders',
      data: { customerName, phone, address, note, paymentMethod, items, totalAmount },
    })

    return NextResponse.json({ success: true, orderCode: order.orderCode, id: order.id })
  } catch (err) {
    console.error('Order creation error:', err)
    return NextResponse.json({ error: 'Không thể tạo đơn hàng' }, { status: 500 })
  }
}
