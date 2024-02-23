import React from 'react';
import ReactDOM from 'react-dom';


import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Principal from './Componentes/Principal';
import Error from './Componentes/Error';
import Search from './Componentes/Search';
import Detalles from './Componentes/Detalles';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Principal />,
    errorElement: <Error />,
    children: [{
      path: "/searchByName",
      element: <Search />,
    },

    ],
  },
  {
    path: "/detalles",
    element: <Detalles />
  }
]);

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById('root')
);
