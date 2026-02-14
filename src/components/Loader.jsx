import React from 'react'
import '../App.css'

export default function Loader() {
  return (
    <div className="loader" role="status">
      <div className="spinner" />
      <div>Cargando contactos…</div>
    </div>
  )
}
