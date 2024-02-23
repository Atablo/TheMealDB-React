import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Principal() {
    return (
        <>
            <div>
                <h3>Menú Pokemon:</h3>
                <ul>
                    <li><Link to={'detalles'}>Detalles</Link></li>
                    <li><Link to={'searchByName'}>Busqueda por nombre</Link></li>
                </ul>
            </div>
            <Outlet />
        </>)

}
