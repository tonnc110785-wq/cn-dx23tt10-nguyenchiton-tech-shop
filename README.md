# TechShop – Website Bán Sản Phẩm Điện Máy

Đồ án thực tập cơ sở ngành – Đại học Trà Vinh (TVU)  
**Sinh viên:** Nguyễn Chí Tôn · MSSV 170123297 · Lớp DX23TT10  
**GVHD:** ThS. Nguyễn Hoàng Duy Thiện

---

## Tech Stack

| Lớp | Công nghệ |
|-----|-----------|
| Framework | Next.js 16 (App Router) + TypeScript |
| CMS / Admin | Payload CMS 3 |
| Database | MongoDB 7 |
| Styling | Tailwind CSS 4 |
| Icons | Lucide React |
| Image processing | Sharp |
| Deploy | AWS EC2 (Ubuntu 24.04) + Nginx + PM2 |

---

## Yêu cầu môi trường

- **Node.js** ≥ 20 LTS (`node -v` để kiểm tra)
- **npm** ≥ 10
- **MongoDB** đang chạy trên `localhost:27017`

> Cài MongoDB: https://www.mongodb.com/docs/manual/installation/

---

## Cài đặt & chạy local

### 1. Clone repo

```bash
git clone https://github.com/<username>/dien-may-website.git
cd dien-may-website
```

### 2. Cài dependencies

```bash
npm install
```

### 3. Tạo file `.env`

Tạo file `.env` ở thư mục gốc (cùng cấp `package.json`):

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/dien-may-website

# Payload CMS – tạo chuỗi bất kỳ ≥ 32 ký tự
PAYLOAD_SECRET=your_super_secret_key_at_least_32_chars

# URL công khai (local)
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

> Trên production thay `localhost:27017` bằng URI thực và `localhost:3000` bằng domain/IP.

### 4. Khởi động dev server

```bash
npm run dev
```

Mở trình duyệt:

| URL | Mô tả |
|-----|-------|
| http://localhost:3000 | Website frontend |
| http://localhost:3000/admin | Admin Panel (Payload CMS) |

Lần đầu truy cập `/admin` → Payload tự tạo form đăng ký tài khoản admin đầu tiên.

### 5. Seed dữ liệu mẫu (tuỳ chọn)

```bash
npm run seed
```

Script tạo 8 danh mục + 18 sản phẩm mẫu vào MongoDB.

---

## Cấu trúc thư mục

```
src/
├── app/
│   ├── (frontend)/          # Giao diện người dùng
│   │   ├── page.tsx         # Trang chủ /
│   │   ├── san-pham/        # Danh sách & chi tiết sản phẩm
│   │   ├── gio-hang/        # Giỏ hàng
│   │   ├── dat-hang/        # Đặt hàng / checkout
│   │   ├── tim-kiem/        # Tìm kiếm
│   │   ├── yeu-thich/       # Danh sách yêu thích
│   │   ├── lien-he/         # Liên hệ
│   │   └── layout.tsx       # Layout chung (Header + Footer)
│   ├── (payload)/           # Payload CMS routes
│   └── api/                 # REST API endpoints
├── collections/             # Payload CMS collections
│   ├── Products.ts
│   ├── Categories.ts
│   ├── Orders.ts
│   ├── Media.ts
│   ├── Users.ts
│   └── ContactMessages.ts
├── components/              # React components dùng chung
├── lib/                     # Utilities, helpers
├── payload.config.ts        # Cấu hình Payload CMS
└── seed.ts                  # Script seed dữ liệu
```

---

## Scripts

```bash
npm run dev      # Dev server (hot reload)
npm run build    # Build production
npm run start    # Chạy production build
npm run seed     # Seed dữ liệu mẫu vào MongoDB
npm run lint     # ESLint kiểm tra code
npm run payload  # Payload CMS CLI
```

---

## Deploy lên AWS EC2

Xem hướng dẫn chi tiết tại [`thesis/AWS_EC2_DEPLOY_GUIDE.md`](../thesis/AWS_EC2_DEPLOY_GUIDE.md).

**Tóm tắt:**

```bash
# Trên server (Ubuntu 24.04)
# 1. Cài Node.js 20, MongoDB 7, Nginx, PM2
# 2. Upload code qua SFTP (Xftp)
# 3. Tạo .env với MONGODB_URI và PAYLOAD_SECRET
# 4. Build và chạy
npm install
npm run build
pm2 start npm --name "techshop" -- start
pm2 save && pm2 startup

# 5. Cấu hình Nginx reverse proxy
#    proxy_pass http://127.0.0.1:3000;
```

---

## Collections MongoDB

| Collection | Mô tả |
|-----------|-------|
| `products` | Sản phẩm điện máy (tên, giá, ảnh, thông số) |
| `categories` | Danh mục: Tivi, Điều hòa, Tủ lạnh, Máy giặt, Laptop... |
| `orders` | Đơn hàng (thông tin KH, sản phẩm, trạng thái) |
| `media` | File ảnh upload qua Payload |
| `users` | Tài khoản admin |
| `contact-messages` | Tin nhắn từ trang Liên hệ |

---

## Troubleshooting

**`npm run build` báo lỗi killed / out of memory**

```bash
# Tạo swap 2GB (cần thiết trên VPS 1GB RAM)
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

**Payload không kết nối được MongoDB**

```bash
# Kiểm tra MongoDB đang chạy
sudo systemctl status mongod

# Khởi động nếu chưa chạy
sudo systemctl start mongod
```

**Port 3000 bị chiếm**

```bash
lsof -i :3000
kill -9 <PID>
```

---

## Giấy phép

Đồ án học thuật – Đại học Trà Vinh · 2026
