import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sensors App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol size="12" className="ion-padding">
              <IonButton expand="block" onClick={() => history.push('/haptics')}>
                Haptics / Vibration
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12" className="ion-padding">
              <IonButton expand="block" onClick={() => history.push('/notifications')}>
                Local Notifications
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12" className="ion-padding">
              <IonButton expand="block" onClick={() => history.push('/geolocation')}>
                Geolocation
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12" className="ion-padding">
              <IonButton expand="block" onClick={() => history.push('/camera')}>
                Camera
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12" className="ion-padding">
              <IonButton expand="block" onClick={() => history.push('/motion')}>
                Motion / Accelerometer
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12" className="ion-padding">
              <IonButton expand="block" onClick={() => history.push('/filesystem')}>
                Filesystem
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
