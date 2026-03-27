import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput, IonCard } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import './Auth.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      history.push('/home');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="auth-content">
        <IonCard className="auth-card">
          <div className="auth-container">
            <h2>Sign In</h2>

            <IonInput
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onIonChange={(e) => setEmail(e.detail.value || '')}
            />

            <IonInput
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onIonChange={(e) => setPassword(e.detail.value || '')}
            />

            {error && <p className="error-message">{error}</p>}

            <IonButton
              expand="block"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </IonButton>

            <p className="auth-link">
              Don't have an account? 
              <IonButton 
                fill="clear" 
                onClick={() => history.push('/register')}
                className="text-button"
              >
                Register
              </IonButton>
            </p>
          </div>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Login;
