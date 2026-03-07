import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonAvatar, IonImg } from '@ionic/react';
import PerfilUsuario from '../components/PerfilUsuario';

const PerfilMedicoPage: React.FC = () => {
  const [avatar, setAvatar] = useState<string | undefined>(undefined);
  const [nombre, setNombre] = useState('Dr. Ejemplo');

  // para iniciales en avatar cuando no hay imagen, toma la primera letra del primer y último nombre
  const getInitials = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length === 0) return '';
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (
      parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
    ).toUpperCase();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Perfil médico</IonTitle>
          <IonAvatar slot="end" style={{ marginRight: '1rem' }}>
            {avatar ? (
              <IonImg src={avatar} />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'var(--ion-color-light)',
                  color: 'var(--ion-color-dark)',
                  fontSize: '1rem',
                }}
              >
                {getInitials(nombre)}
              </div>
            )}
          </IonAvatar>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <PerfilUsuario
          name={nombre}
          avatar={avatar}
          onNameChange={setNombre}
          onAvatarChange={setAvatar}
        />
      </IonContent>
    </IonPage>
  );
};

export default PerfilMedicoPage;
