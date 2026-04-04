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
  IonText,
  IonSpinner
} from '@ionic/react';
import { Geolocation } from '@capacitor/geolocation';

interface Location {
  latitude: number;
  longitude: number;
  accuracy: number;
}

const GeolocationPage = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [status, setStatus] = useState<string>('Ready');
  const [loading, setLoading] = useState<boolean>(false);

  const handleGetLocation = async () => {
    try {
      setLoading(true);
      const coordinates = await Geolocation.getCurrentPosition();
      setLocation({
        latitude: coordinates.coords.latitude,
        longitude: coordinates.coords.longitude,
        accuracy: coordinates.coords.accuracy || 0
      });
      setStatus('Location obtained!');
    } catch (error) {
      setStatus(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleWatchLocation = async () => {
    try {
      setLoading(true);
      const watchId = await Geolocation.watchPosition({}, (position: any) => {
        if (position && position.coords) {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy || 0
          });
          setStatus('Location updated!');
        }
      });
      setStatus(`Watching location (ID: ${watchId})`);
    } catch (error) {
      setStatus(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Geolocation</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonCard>
          <IonCardContent>
            <IonText>Status: {status}</IonText>
            {loading && <IonSpinner />}
            {location && (
              <>
                <IonText>Latitude: {location.latitude}</IonText>
                <IonText>Longitude: {location.longitude}</IonText>
                <IonText>Accuracy: {location.accuracy.toFixed(2)}m</IonText>
              </>
            )}
          </IonCardContent>
        </IonCard>

        <IonButton expand="block" onClick={handleGetLocation} className="ion-margin-top">
          Get Current Location
        </IonButton>

        <IonButton expand="block" onClick={handleWatchLocation}>
          Watch Location
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default GeolocationPage;
