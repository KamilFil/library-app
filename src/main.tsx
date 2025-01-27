import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import './index.css';
import { BasicAppBar } from './components/BasicAppBar/BasicAppBar';
import { Footer } from './components/Footer/Footer';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#40E0D0',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F5F5F5',
    },
    text: {
      primary: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    allVariants: {
      color: '#FFFFFF',
    },
  },
});

const queryClient = new QueryClient();
const router = createRouter({ routeTree });
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <BasicAppBar />
        <Footer />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
);
