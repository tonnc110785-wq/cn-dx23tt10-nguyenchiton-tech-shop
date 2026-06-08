import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { Media } from './collections/Media'
import { Categories } from './collections/Categories'
import { Products } from './collections/Products'
import { ContactMessages } from './collections/ContactMessages'
import { Orders } from './collections/Orders'
import { Users } from './collections/Users'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
    meta: {
      titleSuffix: '- Điện Máy TechShop',
    },
  },
  collections: [
    Users,
    Media,
    Categories,
    Products,
    ContactMessages,
    Orders,
  ],
  secret: process.env.PAYLOAD_SECRET || 'default-secret',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || 'mongodb://localhost:27017/dien-may-website',
  }),
  upload: {
    limits: {
      fileSize: 5000000,
    },
  },
})
