import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
// import Principal from './Componentes/Principal';
// import Error from './Componentes/Error';
// import Search from './Componentes/Search';
// import Detalles from './Componentes/Detalles';
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Principal />,
//     errorElement: <Error />,
//     children: [{
//       path: "/searchByName",
//       element: <Search />,
//     },

//     ],
//   },
//   {
//     path: "/detalles",
//     element: <Detalles />
//   }
// ]);

// eslint-disable-next-line react/no-deprecated
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter />
  </React.StrictMode>,
);
