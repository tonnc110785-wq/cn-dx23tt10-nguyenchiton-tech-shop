import type { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  access: { read: () => true, create: () => true },
  admin: {
    useAsTitle: 'orderCode',
    defaultColumns: ['orderCode', 'customerName', 'phone', 'totalAmount', 'status', 'createdAt'],
  },
  fields: [
    {
      name: 'orderCode',
      type: 'text',
      label: 'Mã đơn hàng',
      admin: { readOnly: true },
    },
    {
      name: 'customerName',
      type: 'text',
      label: 'Họ tên khách hàng',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Số điện thoại',
      required: true,
    },
    {
      name: 'address',
      type: 'text',
      label: 'Địa chỉ giao hàng',
      required: true,
    },
    {
      name: 'note',
      type: 'textarea',
      label: 'Ghi chú',
    },
    {
      name: 'paymentMethod',
      type: 'select',
      label: 'Phương thức thanh toán',
      defaultValue: 'cod',
      options: [
        { label: 'Thanh toán khi nhận hàng (COD)', value: 'cod' },
        { label: 'Chuyển khoản ngân hàng', value: 'transfer' },
      ],
    },
    {
      name: 'items',
      type: 'json',
      label: 'Sản phẩm đặt mua',
    },
    {
      name: 'totalAmount',
      type: 'number',
      label: 'Tổng tiền (VNĐ)',
    },
    {
      name: 'status',
      type: 'select',
      label: 'Trạng thái',
      defaultValue: 'pending',
      options: [
        { label: 'Chờ xác nhận', value: 'pending' },
        { label: 'Đã xác nhận', value: 'confirmed' },
        { label: 'Đang giao hàng', value: 'delivering' },
        { label: 'Hoàn thành', value: 'done' },
        { label: 'Đã hủy', value: 'cancelled' },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === 'create' && !data.orderCode) {
          data.orderCode = 'TS' + Date.now().toString().slice(-8)
        }
        return data
      },
    ],
  },
}
