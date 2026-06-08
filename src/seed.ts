import { getPayload } from 'payload'
import config from './payload.config'

const CATEGORIES = [
  { name: 'Tivi', slug: 'tivi', description: 'Các loại tivi LCD, OLED, QLED từ các thương hiệu hàng đầu' },
  { name: 'Điều hòa', slug: 'dieu-hoa', description: 'Máy lạnh, điều hòa không khí tiết kiệm điện' },
  { name: 'Tủ lạnh', slug: 'tu-lanh', description: 'Tủ lạnh mini, side by side, ngăn đông trên/dưới' },
  { name: 'Máy giặt', slug: 'may-giat', description: 'Máy giặt cửa trước, cửa trên, máy sấy' },
  { name: 'Laptop', slug: 'may-tinh-xach-tay', description: 'Laptop văn phòng, gaming, đồ họa' },
  { name: 'Điện thoại', slug: 'dien-thoai', description: 'Điện thoại thông minh chính hãng' },
  { name: 'Lò vi sóng', slug: 'lo-vi-song', description: 'Lò vi sóng, lò nướng đa năng' },
  { name: 'Máy lọc nước', slug: 'may-loc-nuoc', description: 'Máy lọc nước RO, nano, điện phân' },
]

const PRODUCTS = [
  // Tivi
  {
    name: 'Smart TV Samsung 55 inch 4K QLED QA55Q80C',
    slug: 'samsung-qled-55-q80c',
    categorySlug: 'tivi',
    price: 14990000,
    originalPrice: 18000000,
    brand: 'Samsung',
    shortDescription: 'Smart TV QLED 4K 55 inch, Tizen OS, 4 HDMI, WiFi, Bluetooth 5.0',
    featured: true,
    inStock: true,
    specifications: [
      { key: 'Kích thước màn hình', value: '55 inch' },
      { key: 'Độ phân giải', value: '4K Ultra HD (3840 x 2160)' },
      { key: 'Công nghệ hình ảnh', value: 'QLED' },
      { key: 'Tần số quét', value: '120Hz' },
      { key: 'Hệ điều hành', value: 'Tizen OS' },
      { key: 'Kết nối', value: '4 HDMI, 2 USB, WiFi, Bluetooth 5.0' },
    ],
  },
  {
    name: 'Smart TV LG OLED 65 inch C3 OLED65C3PSA',
    slug: 'lg-oled-65-c3',
    categorySlug: 'tivi',
    price: 28900000,
    originalPrice: 35000000,
    brand: 'LG',
    shortDescription: 'OLED evo 4K 65 inch, α9 Gen6 AI Processor, Dolby Atmos, webOS 23',
    featured: true,
    inStock: true,
    specifications: [
      { key: 'Kích thước', value: '65 inch' },
      { key: 'Công nghệ', value: 'OLED evo' },
      { key: 'Độ phân giải', value: '4K (3840 x 2160)' },
      { key: 'Âm thanh', value: 'Dolby Atmos, 60W' },
      { key: 'Hệ điều hành', value: 'webOS 23' },
    ],
  },
  {
    name: 'Android TV Sony 43 inch KD-43X75WL',
    slug: 'sony-android-tv-43-x75wl',
    categorySlug: 'tivi',
    price: 8490000,
    originalPrice: 10990000,
    brand: 'Sony',
    shortDescription: 'Android TV 4K 43 inch, Bộ xử lý X1, Google TV, Chromecast tích hợp',
    featured: false,
    inStock: true,
    specifications: [
      { key: 'Kích thước', value: '43 inch' },
      { key: 'Độ phân giải', value: '4K HDR' },
      { key: 'Hệ điều hành', value: 'Google TV' },
      { key: 'Âm thanh', value: '20W' },
    ],
  },
  // Điều hòa
  {
    name: 'Điều hòa Daikin Inverter 1.5 HP FTKB35WMVMV',
    slug: 'daikin-inverter-15hp-ftkb35',
    categorySlug: 'dieu-hoa',
    price: 9490000,
    originalPrice: 11500000,
    brand: 'Daikin',
    shortDescription: 'Điều hòa Inverter 1.5 HP, tiết kiệm điện, lọc không khí, chế độ Dry, Gas R32',
    featured: true,
    inStock: true,
    specifications: [
      { key: 'Công suất', value: '1.5 HP (12000 BTU)' },
      { key: 'Công nghệ', value: 'Inverter' },
      { key: 'Gas làm lạnh', value: 'R32' },
      { key: 'Điện năng tiêu thụ', value: '885W' },
      { key: 'Diện tích phòng', value: '15 - 20 m²' },
    ],
  },
  {
    name: 'Điều hòa Panasonic 1 HP CS/CU-PU9XKH-8',
    slug: 'panasonic-inverter-1hp-pu9xkh',
    categorySlug: 'dieu-hoa',
    price: 7990000,
    originalPrice: 9200000,
    brand: 'Panasonic',
    shortDescription: 'Điều hòa Inverter 1 HP, chống virus nanoX, 3D Airflow, Gas R32',
    featured: false,
    inStock: true,
    specifications: [
      { key: 'Công suất', value: '1 HP (9000 BTU)' },
      { key: 'Công nghệ', value: 'Inverter' },
      { key: 'Diện tích', value: '10 - 15 m²' },
      { key: 'Gas', value: 'R32' },
    ],
  },
  {
    name: 'Điều hòa LG Dual Cool 2 HP V18WIN1',
    slug: 'lg-dual-cool-2hp-v18win1',
    categorySlug: 'dieu-hoa',
    price: 13290000,
    originalPrice: 15500000,
    brand: 'LG',
    shortDescription: 'Điều hòa Dual Inverter 2 HP, làm lạnh nhanh, lọc bụi mịn PM1.0',
    featured: false,
    inStock: true,
    specifications: [
      { key: 'Công suất', value: '2 HP (18000 BTU)' },
      { key: 'Công nghệ', value: 'Dual Inverter' },
      { key: 'Diện tích', value: '25 - 35 m²' },
    ],
  },
  // Tủ lạnh
  {
    name: 'Tủ lạnh Samsung Inverter 382L RT38CG6584S9SV',
    slug: 'samsung-inverter-382l-rt38cg',
    categorySlug: 'tu-lanh',
    price: 8990000,
    originalPrice: 11490000,
    brand: 'Samsung',
    shortDescription: 'Tủ lạnh 2 cánh, Inverter 382L, Twin Cooling Plus, ngăn rau quả SpaceMax',
    featured: true,
    inStock: true,
    specifications: [
      { key: 'Dung tích', value: '382 lít' },
      { key: 'Loại', value: '2 cánh ngăn đông dưới' },
      { key: 'Công nghệ', value: 'Inverter' },
      { key: 'Màu sắc', value: 'Bạc' },
      { key: 'Kích thước', value: '595 x 670 x 1780 mm' },
    ],
  },
  {
    name: 'Tủ lạnh LG GN-B222PS Inverter 225L',
    slug: 'lg-inverter-225l-gnb222ps',
    categorySlug: 'tu-lanh',
    price: 5490000,
    originalPrice: 6500000,
    brand: 'LG',
    shortDescription: 'Tủ lạnh 2 cánh 225L, Multi Air Flow, Smart Inverter, tiết kiệm 36%',
    featured: false,
    inStock: true,
    specifications: [
      { key: 'Dung tích', value: '225 lít' },
      { key: 'Công nghệ', value: 'Smart Inverter' },
      { key: 'Loại', value: '2 cánh' },
    ],
  },
  {
    name: 'Tủ lạnh Panasonic Side by Side 550L NR-JX55MBVN',
    slug: 'panasonic-side-by-side-550l',
    categorySlug: 'tu-lanh',
    price: 19500000,
    originalPrice: 24000000,
    brand: 'Panasonic',
    shortDescription: 'Tủ lạnh side by side 550L, làm đá tự động, ngăn mềm 0°C, PrimeFresh',
    featured: false,
    inStock: true,
    specifications: [
      { key: 'Dung tích', value: '550 lít' },
      { key: 'Loại', value: 'Side by Side' },
      { key: 'Làm đá', value: 'Tự động' },
    ],
  },
  // Máy giặt
  {
    name: 'Máy giặt Samsung Inverter 9kg WW90T3040WW/SV',
    slug: 'samsung-may-giat-9kg-ww90t3040',
    categorySlug: 'may-giat',
    price: 6990000,
    originalPrice: 8490000,
    brand: 'Samsung',
    shortDescription: 'Máy giặt cửa trước 9kg, Inverter, lồng giặt Bubble Drum, vệ sinh lồng giặt tự động',
    featured: true,
    inStock: true,
    specifications: [
      { key: 'Khối lượng giặt', value: '9 kg' },
      { key: 'Loại', value: 'Cửa trước' },
      { key: 'Tốc độ vắt', value: '1200 vòng/phút' },
      { key: 'Công nghệ', value: 'Inverter' },
    ],
  },
  {
    name: 'Máy giặt LG T2351VSAB Inverter 10.5kg',
    slug: 'lg-may-giat-10-5kg-t2351',
    categorySlug: 'may-giat',
    price: 5290000,
    originalPrice: 6800000,
    brand: 'LG',
    shortDescription: 'Máy giặt cửa trên 10.5kg, Inverter, Smart Diagnosis, lồng giặt ít bị rối đồ',
    featured: false,
    inStock: true,
    specifications: [
      { key: 'Khối lượng', value: '10.5 kg' },
      { key: 'Loại', value: 'Cửa trên' },
      { key: 'Công nghệ', value: 'Smart Inverter' },
    ],
  },
  // Laptop
  {
    name: 'Laptop Dell Inspiron 15 3530 Core i5-1334U',
    slug: 'dell-inspiron-15-3530-i5',
    categorySlug: 'may-tinh-xach-tay',
    price: 13490000,
    originalPrice: 16000000,
    brand: 'Dell',
    shortDescription: 'Core i5-1334U, RAM 8GB, SSD 512GB, màn 15.6" FHD, Win 11, pin 54Whr',
    featured: true,
    inStock: true,
    specifications: [
      { key: 'CPU', value: 'Intel Core i5-1334U' },
      { key: 'RAM', value: '8GB DDR4' },
      { key: 'Ổ cứng', value: 'SSD 512GB NVMe' },
      { key: 'Màn hình', value: '15.6 inch FHD IPS 120Hz' },
      { key: 'Card đồ họa', value: 'Intel Iris Xe Graphics' },
      { key: 'Hệ điều hành', value: 'Windows 11 Home' },
      { key: 'Pin', value: '54Whr, ~8 tiếng' },
    ],
  },
  {
    name: 'Laptop Asus VivoBook 15 X1504ZA Core i5-1235U',
    slug: 'asus-vivobook-15-x1504za',
    categorySlug: 'may-tinh-xach-tay',
    price: 12990000,
    originalPrice: 15500000,
    brand: 'Asus',
    shortDescription: 'Core i5-1235U, RAM 8GB, SSD 512GB, màn 15.6" FHD, thiết kế mỏng nhẹ',
    featured: false,
    inStock: true,
    specifications: [
      { key: 'CPU', value: 'Intel Core i5-1235U' },
      { key: 'RAM', value: '8GB DDR4' },
      { key: 'Ổ cứng', value: 'SSD 512GB' },
      { key: 'Màn hình', value: '15.6 inch FHD' },
      { key: 'Trọng lượng', value: '1.7 kg' },
    ],
  },
  {
    name: 'Laptop HP Pavilion 15-eh3091AU Ryzen 5 7530U',
    slug: 'hp-pavilion-15-eh3091-r5',
    categorySlug: 'may-tinh-xach-tay',
    price: 11490000,
    originalPrice: 14000000,
    brand: 'HP',
    shortDescription: 'AMD Ryzen 5 7530U, RAM 8GB, SSD 512GB, 15.6" FHD, AMD Radeon Graphics',
    featured: false,
    inStock: true,
    specifications: [
      { key: 'CPU', value: 'AMD Ryzen 5 7530U' },
      { key: 'RAM', value: '8GB DDR4' },
      { key: 'Ổ cứng', value: 'SSD 512GB' },
      { key: 'Màn hình', value: '15.6 inch FHD' },
    ],
  },
  // Điện thoại
  {
    name: 'Samsung Galaxy S24 FE 5G 256GB',
    slug: 'samsung-galaxy-s24-fe-256gb',
    categorySlug: 'dien-thoai',
    price: 11490000,
    originalPrice: 14000000,
    brand: 'Samsung',
    shortDescription: 'Exynos 2500, RAM 8GB, 256GB, màn 6.7" Super AMOLED 120Hz, camera 50MP, AI Galaxy',
    featured: true,
    inStock: true,
    specifications: [
      { key: 'Chip xử lý', value: 'Exynos 2500' },
      { key: 'RAM', value: '8GB' },
      { key: 'Bộ nhớ', value: '256GB' },
      { key: 'Màn hình', value: '6.7 inch Super AMOLED 120Hz' },
      { key: 'Camera sau', value: '50MP + 10MP + 8MP' },
      { key: 'Pin', value: '4700mAh, sạc 25W' },
    ],
  },
  {
    name: 'Điện thoại Xiaomi Redmi Note 13 Pro 4G 256GB',
    slug: 'xiaomi-redmi-note-13-pro-256gb',
    categorySlug: 'dien-thoai',
    price: 5290000,
    originalPrice: 6800000,
    brand: 'Xiaomi',
    shortDescription: 'Helio G99 Ultra, RAM 8GB, 256GB, màn 6.67" AMOLED 200Hz, camera 200MP',
    featured: false,
    inStock: true,
    specifications: [
      { key: 'Chip', value: 'MediaTek Helio G99 Ultra' },
      { key: 'RAM', value: '8GB' },
      { key: 'Bộ nhớ', value: '256GB' },
      { key: 'Màn hình', value: '6.67 inch AMOLED 200Hz' },
      { key: 'Camera', value: '200MP + 8MP + 2MP' },
      { key: 'Pin', value: '5000mAh, sạc 67W' },
    ],
  },
  // Lò vi sóng
  {
    name: 'Lò vi sóng Panasonic NN-ST34HMYUE 25L',
    slug: 'panasonic-lo-vi-song-25l-nn-st34',
    categorySlug: 'lo-vi-song',
    price: 1990000,
    originalPrice: 2490000,
    brand: 'Panasonic',
    shortDescription: 'Lò vi sóng 25L, 900W, 8 mức công suất, đĩa quay inox, hẹn giờ 35 phút',
    featured: false,
    inStock: true,
    specifications: [
      { key: 'Dung tích', value: '25 lít' },
      { key: 'Công suất', value: '900W' },
      { key: 'Mức công suất', value: '8 mức' },
    ],
  },
  // Máy lọc nước
  {
    name: 'Máy lọc nước RO Kangaroo KG10G3 10 lõi',
    slug: 'kangaroo-kg10g3-ro-10-loi',
    categorySlug: 'may-loc-nuoc',
    price: 3490000,
    originalPrice: 4500000,
    brand: 'Kangaroo',
    shortDescription: 'Máy lọc nước RO 10 lõi, bình chứa 10L, loại bỏ 99.9% vi khuẩn, nấm mốc',
    featured: false,
    inStock: true,
    specifications: [
      { key: 'Số lõi lọc', value: '10 lõi' },
      { key: 'Công nghệ', value: 'RO (Reverse Osmosis)' },
      { key: 'Bình chứa', value: '10 lít' },
      { key: 'Lưu lượng', value: '15 - 20 lít/giờ' },
    ],
  },
]

async function seed() {
  console.log('🌱 Bắt đầu seed dữ liệu...')
  const payload = await getPayload({ config })

  // Seed categories
  console.log('📁 Tạo danh mục...')
  const categoryMap: Record<string, string> = {}

  for (const cat of CATEGORIES) {
    const existing = await payload.find({
      collection: 'categories',
      where: { slug: { equals: cat.slug } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      categoryMap[cat.slug] = String(existing.docs[0].id)
      console.log(`  ⏭️  Bỏ qua danh mục "${cat.name}" (đã tồn tại)`)
      continue
    }

    const created = await payload.create({
      collection: 'categories',
      data: cat,
    })
    categoryMap[cat.slug] = String(created.id)
    console.log(`  ✅ Tạo danh mục: ${cat.name}`)
  }

  // Seed products
  console.log('\n📦 Tạo sản phẩm...')
  for (const prod of PRODUCTS) {
    const existing = await payload.find({
      collection: 'products',
      where: { slug: { equals: prod.slug } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      console.log(`  ⏭️  Bỏ qua sản phẩm "${prod.name}" (đã tồn tại)`)
      continue
    }

    const { categorySlug, ...productData } = prod
    await payload.create({
      collection: 'products',
      data: {
        ...productData,
        category: categoryMap[categorySlug] as string,
      },
    })
    console.log(`  ✅ Tạo: ${prod.name}`)
  }

  console.log('\n✨ Seed hoàn thành!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('❌ Lỗi seed:', err)
  process.exit(1)
})
