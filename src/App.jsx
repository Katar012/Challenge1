import React, { useEffect, useState } from 'react'
import './App.css'
import Loader from './components/Loader'
import AddContact from './components/AddContact'
import ContactsList from './components/ContactsList'

const initialContactsData = [
  { id: 1, name: 'Jordas', phone: '555-1234' },
  { id: 2, name: 'Dasjor', phone: '555-5678' },
  { id: 3, name: 'Silverstein', phone: '555-9012' },
]

function App() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [time, setTime] = useState(new Date())

  // Simulate initial data loading
  useEffect(() => {
    const t = setTimeout(() => {
      setContacts(initialContactsData)
      setLoading(false)
    }, 1800)
    return () => clearTimeout(t)
  }, [])

  // Un reloj de mas
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  // Añadir contacto
  function addContact(name, phone) {
    const id = Date.now()
    const newContact = { id, name, phone }
    setContacts((c) => [newContact, ...c])
    console.log('Added contact', newContact)
  }

  // Borrar contacto
  function deleteContact(id) {
    setContacts((c) => c.filter((x) => x.id !== id))
    console.log('Deleted contact id', id)
  }

  console.log('contacts count:', contacts.length)

  return (
    <div className="app">
      <header>
        <h1>Contacts</h1>
        <div className="meta">
          <div>Time: {time.toLocaleTimeString()}</div>
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

export default App
