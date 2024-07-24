import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

interface props {
    children : React.ReactNode
}

const ReactQueryProvider = ({children}:props) => {

    const client = new QueryClient()
  return (
    <QueryClientProvider client={client}>
        {children}
    </QueryClientProvider>
  )
}

export default ReactQueryProvider