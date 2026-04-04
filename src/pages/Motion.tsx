// @ts-ignore
import { useState, useEffect } from 'react';
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
import { Motion } from '@capacitor/motion';

interface Acceleration {
  x: number;
  y: number;
  z: number;
}

const MotionPage = () => {
  const [acceleration, setAcceleration] = useState<Acceleration | null>(null);
  const [status, setStatus] = useState<string>('Ready');
  const [isWatching, setIsWatching] = useState<boolean>(false);

  const handleStartWatch = async () => {
    try {
      await Motion.addListener('accel', (event: any) => {
        setAcceleration({
          x: event.acceleration?.x || 0,
          y: event.acceleration?.y || 0,
          z: event.acceleration?.z || 0
        });
      });
      setStatus('Watching motion...');
      setIsWatching(true);
    } catch (error) {
      setStatus(`Error: ${error}`);
    }
  };

  const handleStopWatch = async () => {
    try {
      await Motion.removeAllListeners();
      setStatus('Motion watching stopped');
      setIsWatching(false);
    } catch (error) {
      setStatus(`Error: ${error}`);
    }
  };

  useEffect(() => {
    return () => {
      if (isWatching) {
        Motion.removeAllListeners();
      }
    };
  }, [isWatching]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Motion / Accelerometer</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonCard>
          <IonCardContent>
            <IonText>Status: {status}</IonText>
            {acceleration && (
              <>
                <IonText>X: {acceleration.x.toFixed(2)}</IonText>
                <IonText>Y: {acceleration.y.toFixed(2)}</IonText>
                <IonText>Z: {acceleration.z.toFixed(2)}</IonText>
              </>
            )}
          </IonCardContent>
        </IonCard>

        <IonButton
          expand="block"
          onClick={handleStartWatch}
          disabled={isWatching}
          className="ion-margin-top"
        >
          Start Watching
        </IonButton>

        <IonButton
          expand="block"
          onClick={handleStopWatch}
          disabled={!isWatching}
        >
          Stop Watching
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default MotionPage;
