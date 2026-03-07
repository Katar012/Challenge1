import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
} from '@ionic/react';

interface Visit {
  id: number;
  description: string;
  status: 'pendiente' | 'en_camino' | 'cancelado';
  cancelReason?: string;
}

const DetalleVisitaPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [visit, setVisit] = useState<Visit | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem('visitas');
    if (raw) {
      try {
        const list: Visit[] = JSON.parse(raw);
        const found = list.find(v => v.id.toString() === id);
        if (found) {
          setVisit(found);
        }
      } catch {
        // ignore
      }
    }
  }, [id]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Detalle de visita</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {visit ? (
          <>
            <h2>{visit.description}</h2>
            <p>Estado: {visit.status.replace('_', ' ')}</p>
            {visit.status === 'cancelado' && (
              <p>Motivo: {visit.cancelReason}</p>
            )}
            <IonButton routerLink="/tabs/visitas" fill="outline">
              Volver a la lista
            </IonButton>
          </>
        ) : (
          <p>Visita no encontrada.</p>
        )}
      </IonContent>
    </IonPage>
  );
};

export default DetalleVisitaPage;
