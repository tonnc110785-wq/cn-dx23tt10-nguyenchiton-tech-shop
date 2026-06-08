import { RootLayout } from '@payloadcms/next/layouts'
import config from '@payload-config'
import React from 'react'
import '@payloadcms/next/css'
import { importMap } from './admin/importMap'
import { serverFunction } from './serverFunction'

export default function PayloadAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  )
}
