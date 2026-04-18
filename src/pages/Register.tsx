import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
  IonCard,
  IonCardContent,
  IonText,
  IonSpinner,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Auth.css';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { signup } = useAuth();
  const history = useHistory();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setErrorMsg('Las contraseñas no coinciden');
      return;
    }

    try {
      setErrorMsg('');
      setLoading(true);
      await signup(email, password);
      history.push('/home');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Error en registro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Registrarse</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="auth-content">
        <IonCard className="auth-card">
          <IonCardContent>
            <div className="auth-form">
              <h2>Crear Cuenta</h2>

              {errorMsg && (
                <IonText color="danger">
                  <p>{errorMsg}</p>
                </IonText>
              )}

              <IonInput
                label="Email"
                labelPlacement="floating"
                type="email"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value || '')}
                disabled={loading}
              />

              <IonInput
                label="Contraseña"
                labelPlacement="floating"
                type="password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value || '')}
                disabled={loading}
              />

              <IonInput
                label="Confirmar Contraseña"
                labelPlacement="floating"
                type="password"
                value={confirmPassword}
                onIonChange={(e) => setConfirmPassword(e.detail.value || '')}
                disabled={loading}
              />

              <IonButton
                expand="block"
                onClick={handleRegister}
                disabled={loading || !email || !password || !confirmPassword}
              >
                {loading ? <IonSpinner name="crescent" /> : 'Registrarse'}
              </IonButton>

              <IonText color="medium">
                <p className="center-text">
                  ¿Ya tienes cuenta?{' '}
                  <a href="/login">Inicia sesión aquí</a>
                </p>
              </IonText>
            </div>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Register;
