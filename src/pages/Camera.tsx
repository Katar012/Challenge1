// @ts-ignore
import { useState } from 'react';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonText
} from '@ionic/react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

const CameraPage = () => {
  const [photo, setPhoto] = useState<string | undefined>();
  const [status, setStatus] = useState<string>('Ready');

  const handleTakePhoto = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl
      });
      setPhoto(image.dataUrl);
      setStatus('Photo taken!');
    } catch (error) {
      setStatus(`Error: ${error}`);
    }
  };

  const handlePickPhoto = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos
      });
      setPhoto(image.dataUrl);
      setStatus('Photo picked!');
    } catch (error) {
      setStatus(`Error: ${error}`);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Camera</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonCard>
          <IonCardContent>
            <IonText>{status}</IonText>
          </IonCardContent>
        </IonCard>

        {photo && (
          <IonCard>
            <>{/* @ts-ignore */}
            <div style={{ width: '100%' }}>
              {/* @ts-ignore */}
              <img src={photo} alt="Captured" style={{ maxWidth: '100%', height: 'auto' }} />
            </div></>
          </IonCard>
        )}

        <IonButton expand="block" onClick={handleTakePhoto} className="ion-margin-top">
          Take Photo
        </IonButton>

        <IonButton expand="block" onClick={handlePickPhoto}>
          Pick Photo
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default CameraPage;
