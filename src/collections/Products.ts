import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Tên sản phẩm',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      required: true,
      unique: true,
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      label: 'Danh mục',
      required: true,
    },
    {
      name: 'price',
      type: 'number',
      label: 'Giá bán (VNĐ)',
      required: true,
    },
    {
      name: 'originalPrice',
      type: 'number',
      label: 'Giá gốc (VNĐ)',
    },
    {
      name: 'brand',
      type: 'text',
      label: 'Thương hiệu',
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      label: 'Mô tả ngắn',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Mô tả chi tiết',
    },
    {
      name: 'images',
      type: 'array',
      label: 'Hình ảnh sản phẩm',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'specifications',
      type: 'array',
      label: 'Thông số kỹ thuật',
      fields: [
        {
          name: 'key',
          type: 'text',
          label: 'Tên thông số',
        },
        {
          name: 'value',
          type: 'text',
          label: 'Giá trị',
        },
      ],
    },
    {
      name: 'inStock',
      type: 'checkbox',
      label: 'Còn hàng',
      defaultValue: true,
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Sản phẩm nổi bật',
      defaultValue: false,
    },
  ],
}
