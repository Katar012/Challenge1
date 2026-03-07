import React from 'react'
import '../App.css'

export default function TablaPacientes({ pacientes, onEditar, onEliminar }) {
  if (!pacientes || pacientes.length === 0) {
    return <div className="empty">Sin pacientes</div>
  }

  function handleDelete(id) {
    if (window.confirm('¿Desea eliminar este paciente?')) {
      onEliminar(id)
    }
  }

  return (
    <table className="pacientes-table" style={{width:'100%', borderCollapse:'collapse'}}>
      <thead>
        <tr>
          <th>Nombre completo</th>
          <th>DNI</th>
          <th>Teléfono</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {pacientes.map((p) => (
          <tr key={p.id} style={{borderBottom:'1px solid #ddd'}}>
            <td>{p.nombre} {p.apellido}</td>
            <td>{p.dni}</td>
            <td>{p.telefono}</td>
            <td>
              <button onClick={() => onEditar(p)} style={{marginRight:'0.5rem'}}>Editar</button>
              <button onClick={() => handleDelete(p.id)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
