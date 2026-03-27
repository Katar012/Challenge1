import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput, IonCard } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import './Auth.css';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleRegister = async () => {
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
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
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="auth-content">
        <IonCard className="auth-card">
          <div className="auth-container">
            <h2>Create Account</h2>

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

            <IonInput
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onIonChange={(e) => setConfirmPassword(e.detail.value || '')}
            />

            {error && <p className="error-message">{error}</p>}

            <IonButton
              expand="block"
              onClick={handleRegister}
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Register'}
            </IonButton>

            <p className="auth-link">
              Already have an account? 
              <IonButton 
                fill="clear" 
                onClick={() => history.push('/login')}
                className="text-button"
              >
                Login
              </IonButton>
            </p>
          </div>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Register;
