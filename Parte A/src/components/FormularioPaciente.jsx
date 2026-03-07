import React, { useState, useEffect } from 'react'
import '../App.css'

export default function FormularioPaciente({ pacienteAEditar, onGuardar, onCancelar }) {
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [dni, setDni] = useState('')
  const [telefono, setTelefono] = useState('')
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (pacienteAEditar) {
      setNombre(pacienteAEditar.nombre || '')
      setApellido(pacienteAEditar.apellido || '')
      setDni(pacienteAEditar.dni || '')
      setTelefono(pacienteAEditar.telefono || '')
      setErrors({})
    } else {
      setNombre('')
      setApellido('')
      setDni('')
      setTelefono('')
      setErrors({})
    }
  }, [pacienteAEditar])

  function validar() {
    const errs = {}
    if (!nombre.trim()) errs.nombre = 'Nombre obligatorio'
    if (!apellido.trim()) errs.apellido = 'Apellido obligatorio'
    const dniTrim = dni.trim()
    if (!/^[0-9]{7,8}$/.test(dniTrim)) {
      errs.dni = 'DNI debe tener 7 u 8 dígitos'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!validar()) return
    const paciente = {
      id: pacienteAEditar ? pacienteAEditar.id : Date.now(),
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      dni: dni.trim(),
      telefono: telefono.trim(),
    }
    onGuardar(paciente)
    if (!pacienteAEditar) {
      // limpiar solo en modo alta
      setNombre('')
      setApellido('')
      setDni('')
      setTelefono('')
    }
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <input
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      {errors.nombre && <div className="error">{errors.nombre}</div>}
      <input
        placeholder="Apellido"
        value={apellido}
        onChange={(e) => setApellido(e.target.value)}
      />
      {errors.apellido && <div className="error">{errors.apellido}</div>}
      <input
        placeholder="DNI"
        value={dni}
        onChange={(e) => setDni(e.target.value)}
      />
      {errors.dni && <div className="error">{errors.dni}</div>}
      <input
        placeholder="Teléfono (opcional)"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
      />
      <button type="submit">
        {pacienteAEditar ? 'Guardar cambios' : 'Agregar paciente'}
      </button>
      {pacienteAEditar && onCancelar && (
        <button type="button" onClick={onCancelar} style={{marginLeft:'0.5rem'}}>
          Cancelar
        </button>
      )}
    </form>
  )
}
