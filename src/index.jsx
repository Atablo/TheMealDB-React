import { StrictMode, React } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<<<<<<< HEAD
  // Así toda la aplicación estará envuelta con BrowserRouter
  <StrictMode>
    <BrowserRouter>
=======
  // Ponemos el StrictMode para resaltar y prevenir posibles problemas en la aplicación
  <StrictMode>
    {/* Envolvemos toda la aplicacion con browserRouter para que funcionen las rutas */}
    <BrowserRouter>
      {/* Incluimos el componente principal en la página */}
>>>>>>> origin/johnny
      <App />
    </BrowserRouter>
  </StrictMode>,

);
