import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PokemonListPage from './pages/pokemon-list/pokemon-list-page';

const router = createBrowserRouter([
  {
    path: "/",
    element: <PokemonListPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
