import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Tasks } from './assets/tasks/Tasks.tsx'
import { Box } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { makeServer } from './mirage/server'

const queryClient = new QueryClient()

makeServer();

const pageContainerSx = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  minHeight: '100vh',
  width: '100%',
  pt: 4,
}



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Box sx={pageContainerSx}>
        <Tasks tasks={[]} />
      </Box>
    </QueryClientProvider>
  </StrictMode>,
)
