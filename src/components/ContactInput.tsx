import React, { useState, FormEvent } from 'react';
import { IonItem, IonInput, IonButton } from '@ionic/react';

interface ContactInputProps {
  onAdd: (name: string, email: string) => void;
  disabled?: boolean;
}

const ContactInput: React.FC<ContactInputProps> = ({ onAdd, disabled = false }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim()) {
      onAdd(name.trim(), email.trim());
      setName('');
      setEmail('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <IonItem>
        <IonInput
          placeholder="Nombre"
          value={name}
          onIonChange={e => setName(e.detail.value!)}
          disabled={disabled}
        />
      </IonItem>
      <IonItem>
        <IonInput
          placeholder="Email"
          value={email}
          onIonChange={e => setEmail(e.detail.value!)}
          disabled={disabled}
        />
      </IonItem>
      <IonButton type="submit" expand="block" disabled={disabled} color={disabled ? 'medium' : 'primary'}>
        {disabled ? 'Sin conexión' : 'Añadir Contacto'}
      </IonButton>
    </form>
  );
};

export default ContactInput;
