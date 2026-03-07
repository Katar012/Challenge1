import React, { useState, ChangeEvent } from 'react';
import { IonAvatar, IonImg, IonItem, IonLabel, IonInput, IonButton } from '@ionic/react';

interface PerfilUsuarioProps {
  name?: string;
  avatar?: string;
  onNameChange?: (name: string) => void;
  onAvatarChange?: (avatar: string) => void;
}

const getInitials = (name: string) => {
  const parts = name.trim().split(' ');
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (
    parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
  ).toUpperCase();
};

const PerfilUsuario: React.FC<PerfilUsuarioProps> = ({
  name = 'Usuario',
  avatar: propAvatar,
  onNameChange,
  onAvatarChange,
}) => {
  const [avatar, setAvatar] = useState<string | undefined>(propAvatar);
  const [preview, setPreview] = useState<string | undefined>(propAvatar);
  const [editingName, setEditingName] = useState(name);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreview(result);
      setAvatar(result);
      if (onAvatarChange) {
        onAvatarChange(result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ textAlign: 'center', padding: '1rem' }}>
      <IonAvatar style={{ margin: '0 auto', width: 96, height: 96 }}>
        {preview ? (
          <IonImg src={preview} />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'var(--ion-color-primary)',
              color: '#fff',
              fontSize: '1.5rem',
            }}
          >
            {getInitials(editingName)}
          </div>
        )}
      </IonAvatar>
      <IonItem>
        <IonLabel position="stacked">Nombre</IonLabel>
        <IonInput
          value={editingName}
          onIonChange={e => {
            const v = e.detail.value!;
            setEditingName(v);
            if (onNameChange) onNameChange(v);
          }}
        />
      </IonItem>
      <IonItem>
        <IonLabel position="stacked">Actualizar avatar</IonLabel>
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </IonItem>
    </div>
  );
};

export default PerfilUsuario;
