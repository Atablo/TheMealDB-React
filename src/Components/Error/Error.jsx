import React from 'react';

// Componente que se encarga de lanzar un error al usuario
export default function Error() {
  return (
    <div className="container">
      <div className="row flex-wrap justify-content-center m-2 mt-4">
        <h4 className="card-title mb-4 bg-danger rounded-2 p-2 text-center">
          {/* Mostramos el texto del error */}
          We couldn&apos;t find this resource sorry!!
        </h4>
      </div>
    </div>
  );
}
