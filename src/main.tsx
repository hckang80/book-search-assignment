import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { QueryProvider } from './contexts/query/QueryProvider.tsx';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';
import { BookSearch, BookFavorites } from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        index: true,
        Component: () => <Navigate to="/search" replace />
      },
      {
        path: 'search',
        Component: BookSearch
      },
      {
        path: 'favorites',
        Component: BookFavorites
      },
      {
        path: '*',
        Component: () => <Navigate to="/search" replace />
      }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  </StrictMode>
);
