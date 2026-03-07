import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader'
import miImagen from '../assets/user-avatar.png'
import FormularioPaciente from '../components/FormularioPaciente'
import TablaPacientes from '../components/TablaPacientes'

// initial data in case localStorage is empty (optional)
const initialPatientsData = [
  { id: 1, nombre: 'Jordas', apellido: 'Perez', dni: '1234567', telefono: '555-1234' },
  { id: 2, nombre: 'Dasjor', apellido: 'Gomez', dni: '2345678', telefono: '555-5678' },
]

import { useHistory } from 'react-router-dom'

export default function Dashboard({ user, onLogout }) {
  const history = useHistory()
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)
  const [pacienteAEditar, setPacienteAEditar] = useState(null)
  const [searchText, setSearchText] = useState('') // state for buscador

  useEffect(() => {
    // load pacientes from localStorage, simulate delay
    const stored = localStorage.getItem('medicare_pacientes')
    const data = stored ? JSON.parse(stored) : initialPatientsData
    const t = setTimeout(() => {
      setPatients(data)
      setLoading(false)
    }, 800)
    return () => clearTimeout(t)
  }, [])


  function guardarPaciente(paciente) {
    // when saving we can optionally clear search or leave intact
    setPatients((prev) => {
      const exists = prev.find((p) => p.id === paciente.id)
      let updated
      if (exists) {
        updated = prev.map((p) => (p.id === paciente.id ? paciente : p))
      } else {
        updated = [paciente, ...prev]
      }
      localStorage.setItem('medicare_pacientes', JSON.stringify(updated))
      return updated
    })
    setPacienteAEditar(null)
  }

  function editarPaciente(p) {
    setPacienteAEditar(p)
  }

  function eliminarPaciente(id) {
    setPatients((prev) => {
      const updated = prev.filter((p) => p.id !== id)
      localStorage.setItem('medicare_pacientes', JSON.stringify(updated))
      return updated
    })
  }

  function handleLogout() {
    localStorage.removeItem('user')
    onLogout && onLogout()
    history.push('/login')
  }

  const initials = user
    ? user.name
        .split(' ')
        .map((w) => w[0])
        .join('')
        .toUpperCase()
    : ''

  function goProfile() {
    history.push('/perfil')
  }

  return (
    <div className="app">
      <header>
        <h1>Pacientes</h1>
        {/* avatar / initials clickable to open perfil */}
        {user && (
          <div onClick={goProfile} className="avatar-container">
            {user.avatar ? (
              <img src={user.avatar} alt="avatar" className="avatar-header" />
            ) : (
              <div className="avatar-placeholder">{initials}</div>
            )}
          </div>
        )}
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
        {/* statistics shown only if not recepcionista */}
        {user && user.role !== 'recepcionista' && (
          <div className="meta">
            <div>Items: {patients.length}</div>
          </div>
        )}
      {/* justificación: el estado de búsqueda "searchText" vive en Dashboard porque
          es compartido entre el formulario y la tabla. Si se moviera dentro de
          TablaPacientes, el padre no podría controlar qué filas se muestran durante
          operaciones como edición o eliminación, y el filtro se perdería al
          re-crear la tabla. Mantenerlo arriba facilita también restaurar el valor
          si se navega a otras vistas, y respeta la "lifting state up" de React. */}
      </header>

      {loading ? (
        <Loader />
      ) : (
        <main>
          {/* form for alta/edición */}
          <FormularioPaciente
            pacienteAEditar={pacienteAEditar}
            onGuardar={guardarPaciente}
            onCancelar={() => setPacienteAEditar(null)}
          />

          {/* buscador */}
          <input
            type="text"
            placeholder="Buscar por nombre, apellido o DNI"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="search-input"
            style={{width:'100%', padding:'0.5rem', margin:'1rem 0', borderRadius:'6px', border:'1px solid #ddd'}}
          />

          {/* lista de pacientes filtrada */}
          <TablaPacientes
            pacientes={patients.filter((p) => {
              const term = searchText.toLowerCase().trim()
              if (!term) return true
              return (
                (`${p.nombre} ${p.apellido}`.toLowerCase().includes(term) ||
                  p.dni.toLowerCase().includes(term))
              )
            })}
            onEditar={editarPaciente}
            onEliminar={eliminarPaciente}
          />
        </main>
      )}
    </div>
  )
}
