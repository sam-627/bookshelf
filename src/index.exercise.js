import { loadDevTools } from './dev-tools/load'
import './bootstrap'
import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

// ignore the rootRef in this file. I'm just doing it here to make
// the tests I write to check your work easier.
export const rootRef = {}
loadDevTools(() => {
  const root = createRoot(document.getElementById('root'))
  root.render(<QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>)
  rootRef.current = root
})
