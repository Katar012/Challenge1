import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItemSliding,
  IonItem,
  IonLabel,
  IonItemOptions,
  IonItemOption,
  IonAlert,
  IonReorderGroup,
  IonReorder,
} from '@ionic/react';
import TaskInput from '../components/TaskInput';

interface Visit {
  id: number;
  description: string;
  status: 'pendiente' | 'en_camino' | 'cancelado';
  cancelReason?: string;
}

const STORAGE_KEY = 'visitas';

const VisitasPage: React.FC = () => {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setVisits(JSON.parse(raw));
      } catch {
        //ignora
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(visits));
  }, [visits]);

  const addVisit = (desc: string) => {
    const newVisit: Visit = {
      id: Date.now(),
      description: desc,
      status: 'pendiente',
    };
    setVisits(prev => [newVisit, ...prev]);
  };

  const markEnCamino = (id: number) => {
    setVisits(prev =>
      prev.map(v => (v.id === id ? { ...v, status: 'en_camino' } : v))
    );
  };

  const askCancel = (id: number) => {
    setSelectedId(id);
    setAlertOpen(true);
  };

  const doCancel = (reason: string) => {
    if (selectedId !== null) {
      setVisits(prev =>
        prev.map(v =>
          v.id === selectedId
            ? { ...v, status: 'cancelado', cancelReason: reason }
            : v
        )
      );
    }
    setAlertOpen(false);
    setSelectedId(null);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Visitas (agenda del día)</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Visitas</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div style={{ padding: '1rem' }}>
          <TaskInput placeholder="Nueva visita" onAdd={addVisit} />
          <IonReorderGroup
            disabled={false}
            onIonItemReorder={e => {
              const pending = visits.filter(v => v.status === 'pendiente');
              const others = visits.filter(v => v.status !== 'pendiente');
              const reordered = e.detail.complete(pending);
              setVisits([...reordered, ...others]);
            }}
          >
            {visits.map(v => (
              <IonItemSliding key={v.id}>
                <IonItem>
                  <IonLabel>
                    {v.description}
                    {v.status !== 'pendiente' && (
                      <div style={{ fontSize: '0.8rem' }}>
                        {v.status === 'en_camino'
                          ? 'En camino'
                          : `Cancelado: ${v.cancelReason || ''}`}
                      </div>
                    )}
                  </IonLabel>
                  {v.status === 'pendiente' && <IonReorder slot="end" />}
                </IonItem>
                <IonItemOptions side="start">
                  <IonItemOption
                    color="primary"
                    onClick={() => markEnCamino(v.id)}
                  >
                    En camino
                  </IonItemOption>
                  <IonItemOption
                    color="danger"
                    onClick={() => askCancel(v.id)}
                  >
                    Cancelar
                  </IonItemOption>
                </IonItemOptions>
                <IonItemOptions side="end">
                  <IonItemOption
                    color="secondary"
                    routerLink={`/tabs/visitas/${v.id}`}
                  >
                    Ver detalle
                  </IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            ))}
          </IonReorderGroup>

          <IonAlert
            isOpen={alertOpen}
            header="Confirmar cancelación"
            inputs={[
              {
                name: 'reason',
                type: 'text',
                placeholder: 'Motivo de cancelación',
              },
            ]}
            buttons={[
              { text: 'Cancelar', role: 'cancel' },
              {
                text: 'Aceptar',
                handler: data => {
                  doCancel(data.reason || '');
                },
              },
            ]}
            onDidDismiss={() => setAlertOpen(false)}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default VisitasPage;
