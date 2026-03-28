import React from 'react';
import { IonItem, IonLabel, IonButton } from '@ionic/react';

export interface Contact {
  id?: string;
  name: string;
  email: string;
}

interface ContactItemProps {
  contact: Contact;
  onDelete: (id: string) => void;
  disabled?: boolean;
}

const ContactItem: React.FC<ContactItemProps> = ({ contact, onDelete, disabled = false }) => {
  return (
    <IonItem>
      <IonLabel>
        <h2>{contact.name}</h2>
        <p>{contact.email}</p>
      </IonLabel>
      <IonButton slot="end" color="danger" onClick={() => onDelete(contact.id!)} disabled={disabled}>
        Borrar
      </IonButton>
    </IonItem>
  );
};

export default ContactItem;
