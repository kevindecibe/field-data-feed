import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 60 * 1000, // 30 minutos
      refetchInterval(query) {
        if (query.queryKey[0] === 'feeds') {
          return 5 * 60 * 1000; // 5 minutos
        }
        return false;
      },
    },
  },
});

async function enableMocking() {
  // Comento esta línea para que cargue el mock en prod
  /* if (process.env.NODE_ENV === 'production') return; */

  console.info('Loading mock service worker...');
  const { worker } = await import('./mocks/browser');
  return worker.start({
    onUnhandledRequest: 'bypass',
  });
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <div className='min-h-screen w-[99vw] bg-winter-primary'>
          <App />
        </div>
      </QueryClientProvider>
    </React.StrictMode>
  );
});
