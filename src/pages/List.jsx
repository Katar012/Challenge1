import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader'
import AddContact from '../components/AddContact'
import ContactsList from '../components/ContactsList'
import miImagen from '../assets/user-avatar.png'

const initialContactsData = [
  { id: 1, name: 'Jordas', phone: '555-1234' },
  { id: 2, name: 'Dasjor', phone: '555-5678' },
  { id: 3, name: 'Silverstein', phone: '555-9012' },
]

import { useHistory } from 'react-router-dom'

export default function List({ onLogout }) {
  const history = useHistory()
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => {
      setContacts(initialContactsData)
      setLoading(false)
    }, 1800)
    return () => clearTimeout(t)
  }, [])


  function addContact(name, phone) {
    const id = Date.now()
    const newContact = { id, name, phone }
    setContacts((c) => [newContact, ...c])
    console.log('Added contact', newContact)
  }

  function deleteContact(id) {
    setContacts((c) => c.filter((x) => x.id !== id))
    console.log('Deleted contact id', id)
  }

  function handleLogout() {
    localStorage.removeItem('logged')
    onLogout && onLogout()
    history.push('/login')
  }

  return (
    <div className="app">
      <header>
        <img src={miImagen} alt="Logo" />
        <h1>Contacts</h1>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
        <div className="meta">
          <div>Items: {contacts.length}</div>
        </div>
      </header>

      {loading ? (
        <Loader />
      ) : (
        <main>
          <AddContact onAdd={addContact} />
          <ContactsList contacts={contacts} onDelete={deleteContact} />
        </main>
      )}
    </div>
  )
}
