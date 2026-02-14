import React from 'react'
import '../App.css'

export default function ContactsList({ contacts, onDelete }) {
  if (!contacts || contacts.length === 0) {
    return <div className="empty">Sin contactos</div>
  }

  return (
    <div className="contacts">
      {contacts.map((c) => (
        <div className="contact" key={c.id}>
          <div className="info">
            <div className="name">{c.name}</div>
            <div className="phone">{c.phone}</div>
          </div>
          <div>
            <button onClick={() => onDelete(c.id)}>Eliminar</button>
          </div>
        </div>
      ))}
    </div>
  )
}
