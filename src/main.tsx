import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { QueryProvider } from './context/query/QueryProvider.tsx';
import { Theme } from '@radix-ui/themes';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <Theme>
        <App />
      </Theme>
    </QueryProvider>
  </StrictMode>
);
