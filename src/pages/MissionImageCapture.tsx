import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonText,
  IonSpinner,
  IonCard,
  IonCardContent,
  IonIcon,
} from '@ionic/react';
import { arrowBack } from 'ionicons/icons';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { useHistory } from 'react-router-dom';
import { useMissions } from '../hooks/useMissions';
import './MissionPage.css';

const MissionImageCapture: React.FC = () => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();
  const { completeMission } = useMissions();

  const takePhoto = async () => {
    try {
      setLoading(true);
      setError(null);

      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });

      setPhoto(image.dataUrl || null);
    } catch (err) {
      console.error('Error taking photo:', err);
      setError('Error al tomar la foto. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const savePhoto = async () => {
    if (!photo) {
      setError('Por favor toma una foto primero');
      return;
    }

    try {
      setLoading(true);

      // Completar la misión 1
      completeMission(1);

      // Redirigir a Home después de 1 segundo
      setTimeout(() => {
        history.push('/home');
      }, 1000);
    } catch (err) {
      console.error('Error saving photo:', err);
      setError('Error al guardar. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const retakePhoto = () => {
    setPhoto(null);
    setError(null);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButton slot="start" onClick={() => history.goBack()} fill="clear">
            <IonIcon icon={arrowBack} />
          </IonButton>
          <IonTitle>Tomar foto</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <div style={{ marginTop: '20px' }}>
          {photo ? (
            <IonCard>
              <IonCardContent>
                <img
                  src={photo}
                  alt="Captured"
                  style={{
                    width: '100%',
                    maxHeight: '300px',
                    borderRadius: '8px',
                    marginBottom: '16px',
                  }}
                />
                <IonText>
                  <p style={{ textAlign: 'center', marginBottom: '16px' }}>
                    ¿Deseas guardar esta foto?
                  </p>
                </IonText>

                <div
                  style={{
                    display: 'flex',
                    gap: '8px',
                    marginTop: '12px',
                  }}
                >
                  <IonButton
                    expand="block"
                    onClick={savePhoto}
                    disabled={loading}
                    color="success"
                  >
                    {loading ? <IonSpinner name="crescent" /> : 'Guardar'}
                  </IonButton>
                  <IonButton
                    expand="block"
                    onClick={retakePhoto}
                    disabled={loading}
                    color="medium"
                  >
                    Retomar
                  </IonButton>
                </div>
              </IonCardContent>
            </IonCard>
          ) : (
            <IonCard>
              <IonCardContent style={{ textAlign: 'center' }}>
                <IonText>
                  <p>Toca el botón para tomar una foto con la cámara</p>
                </IonText>

                <IonButton onClick={takePhoto} disabled={loading} size="large">
                  {loading ? <IonSpinner name="crescent" /> : '📷 Tomar Foto'}
                </IonButton>
              </IonCardContent>
            </IonCard>
          )}

          {error && (
            <IonCard color="danger" style={{ marginTop: '16px' }}>
              <IonCardContent>
                <IonText>
                  <p>{error}</p>
                </IonText>
              </IonCardContent>
            </IonCard>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MissionImageCapture;
