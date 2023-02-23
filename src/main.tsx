import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PokemonListPage from "./pages/pokemon-list/pokemon-list-page";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/spacing.scss";
import "./styles/main.scss";
import PokemonDetailPage from "./pages/pokemon-detail/pokemon-detail-page";
import PublicLayout from "./layouts/public-layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        element: <PokemonListPage />,
      },
      {
        path: "pokemons/:name",
        element: <PokemonDetailPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
