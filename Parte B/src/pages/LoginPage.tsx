import React, { useState } from 'react';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonItem,
  IonLabel,
  IonIcon,
  IonToast,
  IonLoading,
  useIonViewDidEnter,
} from '@ionic/react';
import { eye, eyeOff } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

const MOCK_USER = 'user@mail.com';
const MOCK_PASS = '123';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; message: string }>({
    show: false,
    message: '',
  });

  const history = useHistory();

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (username === MOCK_USER && password === MOCK_PASS) {
        history.replace('/tabs/visitas');
      } else {
        setToast({ show: true, message: 'Credenciales inválidas' });
      }
    }, 1500);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Usuario</IonLabel>
          <IonInput
            value={username}
            onIonChange={e => setUsername(e.detail.value!)}
            placeholder="Ingrese usuario"
            autocapitalize="off"
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Contraseña</IonLabel>
          <IonInput
            value={password}
            type={showPassword ? 'text' : 'password'}
            onIonChange={e => setPassword(e.detail.value!)}
            placeholder="Ingrese contraseña"
          />
          <IonIcon
            slot="end"
            icon={showPassword ? eyeOff : eye}
            onClick={() => setShowPassword(prev => !prev)}
            style={{ cursor: 'pointer' }}
          />
        </IonItem>
        <IonButton expand="block" onClick={handleLogin} style={{ marginTop: '1rem' }}>
          Ingresar
        </IonButton>
        <IonToast
          isOpen={toast.show}
          message={toast.message}
          duration={2000}
          onDidDismiss={() => setToast({ show: false, message: '' })}
          color="danger"
        />
        <IonLoading isOpen={loading} message="Verificando..." duration={0} />
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
