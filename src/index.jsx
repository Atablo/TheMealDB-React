import { StrictMode, React } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // Ponemos el StrictMode para resaltar y prevenir posibles problemas en la aplicación
  <StrictMode>
    {/* Envolvemos toda la aplicacion con browserRouter para que funcionen las rutas */}
    <BrowserRouter>
      {/* Incluimos el componente principal en la página */}
      <App />
    </BrowserRouter>
  </StrictMode>,

);
