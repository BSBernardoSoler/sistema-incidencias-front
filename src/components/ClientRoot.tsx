// components/ClientRoot.tsx
'use client'

import { ReactNode } from 'react'
import Provider from '../components/provider/provider'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from '@/redux/store/store'
import { ThemeProvider } from '@/context/ThemeContext'
import { SidebarProvider } from '@/context/SidebarContext'
import { Toaster } from 'react-hot-toast'
import AlertSocketProvider from './provider/alertsSocketsProvider'

export default function ClientRoot({ children }: { children: ReactNode }) {
  return (
    <Provider>
      <ReduxProvider store={store}>
        <AlertSocketProvider>
        <ThemeProvider>
          <SidebarProvider>
            <Toaster position="top-center" />
            {children}
          </SidebarProvider>
        </ThemeProvider>
        </AlertSocketProvider>
      </ReduxProvider>
    </Provider>
  )
}
