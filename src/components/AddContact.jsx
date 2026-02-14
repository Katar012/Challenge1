import React, { useState } from 'react'
import '../App.css'

export default function AddContact({ onAdd }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  function handleAdd(e) {
    e.preventDefault()
    if (!name.trim() || !phone.trim()) return
    onAdd(name.trim(), phone.trim())
    setName('')
    setPhone('')
  }

  return (
    <form className="add-form" onSubmit={handleAdd}>
      <input
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Telefono"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button type="submit" onClick={() => console.log('Agregar clicked')}>Agregar</button>
    </form>
  )
}
