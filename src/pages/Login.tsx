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

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { login } = useAuth();
  const history = useHistory();

  const handleLogin = async () => {
    try {
      setErrorMsg('');
      setLoading(true);
      await login(email, password);
      history.push('/home');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Error en login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Iniciar Sesión</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="auth-content">
        <IonCard className="auth-card">
          <IonCardContent>
            <div className="auth-form">
              <h2>Bienvenido</h2>
              
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

              <IonButton
                expand="block"
                onClick={handleLogin}
                disabled={loading || !email || !password}
              >
                {loading ? <IonSpinner name="crescent" /> : 'Ingresar'}
              </IonButton>

              <IonText color="medium">
                <p className="center-text">
                  ¿No tienes cuenta?{' '}
                  <a href="/register">Regístrate aquí</a>
                </p>
              </IonText>
            </div>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Login;
