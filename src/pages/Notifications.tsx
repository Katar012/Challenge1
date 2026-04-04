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
  IonInput,
  IonItem,
  IonLabel
} from '@ionic/react';
import { LocalNotifications } from '@capacitor/local-notifications';

const NotificationsPage = () => {
  const [status, setStatus] = useState<string>('Ready');
  const [title, setTitle] = useState<string>('Hello');
  const [body, setBody] = useState<string>('This is a notification');

  const handleNotification = async () => {
    try {
      await LocalNotifications.requestPermissions();
      
      await LocalNotifications.schedule({
        notifications: [
          {
            title: title,
            body: body,
            id: Math.floor(Math.random() * 10000),
            schedule: { at: new Date(Date.now() + 1000 * 5) },
            sound: undefined,
            actionTypeId: '',
            attachments: undefined,
            autoCancel: true,
          }
        ]
      });
      setStatus('Notification scheduled!');
    } catch (error) {
      setStatus(`Error: ${error}`);
    }
  };

  const handleImmediateNotification = async () => {
    try {
      await LocalNotifications.requestPermissions();
      
      await LocalNotifications.schedule({
        notifications: [
          {
            title: 'Immediate',
            body: 'This shows instantly!',
            id: Math.floor(Math.random() * 10000),
          }
        ]
      });
      setStatus('Immediate notification sent!');
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
          <IonTitle>Local Notifications</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonCard>
          <IonCardContent>
            <IonText>{status}</IonText>
          </IonCardContent>
        </IonCard>

        <IonItem>
          <IonLabel>Title:</IonLabel>
          <IonInput
            value={title}
            onIonChange={(e: any) => setTitle(e.detail.value || '')}
            placeholder="Enter title"
          />
        </IonItem>

        <IonItem>
          <IonLabel>Body:</IonLabel>
          <IonInput
            value={body}
            onIonChange={(e: any) => setBody(e.detail.value || '')}
            placeholder="Enter body"
          />
        </IonItem>

        <IonButton expand="block" onClick={handleNotification} className="ion-margin-top">
          Schedule in 5 seconds
        </IonButton>

        <IonButton expand="block" onClick={handleImmediateNotification}>
          Send Immediate
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default NotificationsPage;
