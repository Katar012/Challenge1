import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import '../App.css'

export default function PerfilUsuario({ user, onUpdate }) {
  const history = useHistory()
  const [name, setName] = useState(user.name || '')
  const [preview, setPreview] = useState(user.avatar || '')
  const [file, setFile] = useState(null)

  function handleFileChange(e) {
    const f = e.target.files && e.target.files[0]
    if (f) {
      setFile(f)
      const reader = new FileReader()
      reader.onload = () => setPreview(reader.result)
      reader.readAsDataURL(f)
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    const updated = {
      ...user,
      name: name.trim() || user.name,
      avatar: preview || ''
    }
    onUpdate(updated)
    history.push('/dashboard')
  }

  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()

  return (
    <div className="app profile">
      <header>
        <h1>Perfil de usuario</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          {preview ? (
            <img src={preview} alt="Avatar" className="avatar-large" />
          ) : (
            <div className="avatar-placeholder">{initials}</div>
          )}
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <input
            type="text"
            placeholder="Nombre completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit">Guardar</button>
        </form>
      </main>
    </div>
  )
}
