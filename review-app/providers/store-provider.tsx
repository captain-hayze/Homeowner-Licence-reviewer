'use client'

import { type ReactNode, createContext, useState, useContext } from 'react'
import { useStore } from 'zustand'

import { type AppStore, createAppStore } from '@/stores/app-store'

export type AppStoreApi = ReturnType<typeof createAppStore>

export const AppStoreContext = createContext<AppStoreApi | undefined>(
  undefined,
)

export interface StoreProviderProps {
  children: ReactNode
}

export const AppStoreProvider = ({
  children,
}: StoreProviderProps) => {
  const [ appStore ] = useState(() => createAppStore())
  return (
    <AppStoreContext.Provider value={appStore}>
      {children}
    </AppStoreContext.Provider>
  )
}

export const useAppStore = <T,>(
  selector: (store: AppStore) => T,
): T => {
  const appStoreContext = useContext(AppStoreContext)
  if (!appStoreContext) {
    throw new Error(`useAppStore must be used within AppStoreContext`)
  }

  return useStore(appStoreContext, selector)
}