import React from 'react';
import { Contact } from './ContactItem';
import ContactItem from './ContactItem';

interface ContactListProps {
  contacts: Contact[];
  onDelete: (id: string) => void;
  disabled?: boolean;
}

const ContactList: React.FC<ContactListProps> = ({ contacts, onDelete, disabled = false }) => {
  if (contacts.length === 0) {
    return <p style={{ padding: '1rem' }}>No hay contactos.</p>;
  }

  return (
    <div>
      {contacts.map(c => (
        <ContactItem key={c.id} contact={c} onDelete={onDelete} disabled={disabled} />
      ))}
    </div>
  );
};

export default ContactList;
