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
import { Haptics, ImpactStyle } from '@capacitor/haptics';

const HapticsPage = () => {
  const [status, setStatus] = useState<string>('Ready');

  const handleVibrate = async () => {
    try {
      await Haptics.vibrate();
      setStatus('Vibrated!');
    } catch (error) {
      setStatus(`Error: ${error}`);
    }
  };

  const handleImpactLight = async () => {
    try {
      await Haptics.impact({ style: ImpactStyle.Light });
      setStatus('Light impact!');
    } catch (error) {
      setStatus(`Error: ${error}`);
    }
  };

  const handleImpactMedium = async () => {
    try {
      await Haptics.impact({ style: ImpactStyle.Medium });
      setStatus('Medium impact!');
    } catch (error) {
      setStatus(`Error: ${error}`);
    }
  };

  const handleImpactHeavy = async () => {
    try {
      await Haptics.impact({ style: ImpactStyle.Heavy });
      setStatus('Heavy impact!');
    } catch (error) {
      setStatus(`Error: ${error}`);
    }
  };

  const handleSelectionStart = async () => {
    try {
      await Haptics.selectionStart();
      setStatus('Selection started!');
    } catch (error) {
      setStatus(`Error: ${error}`);
    }
  };

  const handleSelectionChanged = async () => {
    try {
      await Haptics.selectionChanged();
      setStatus('Selection changed!');
    } catch (error) {
      setStatus(`Error: ${error}`);
    }
  };

  const handleSelectionEnd = async () => {
    try {
      await Haptics.selectionEnd();
      setStatus('Selection ended!');
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
          <IonTitle>Haptics / Vibration</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonCard>
          <IonCardContent>
            <IonText>{status}</IonText>
          </IonCardContent>
        </IonCard>

        <IonButton expand="block" onClick={handleVibrate} className="ion-margin-top">
          Simple Vibrate
        </IonButton>

        <IonButton expand="block" onClick={handleImpactLight}>
          Light Impact
        </IonButton>

        <IonButton expand="block" onClick={handleImpactMedium}>
          Medium Impact
        </IonButton>

        <IonButton expand="block" onClick={handleImpactHeavy}>
          Heavy Impact
        </IonButton>

        <IonButton expand="block" onClick={handleSelectionStart}>
          Selection Start
        </IonButton>

        <IonButton expand="block" onClick={handleSelectionChanged}>
          Selection Changed
        </IonButton>

        <IonButton expand="block" onClick={handleSelectionEnd}>
          Selection End
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default HapticsPage;
