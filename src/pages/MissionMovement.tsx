import React, { useEffect, useState } from 'react';
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
  IonProgressBar,
} from '@ionic/react';
import { arrowBack, navigateOutline, checkmarkCircle } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useGeolocation } from '../hooks/useGeolocation';
import { useMissions } from '../hooks/useMissions';
import './MissionPage.css';

const MissionMovement: React.FC = () => {
  const history = useHistory();
  const { completeMission } = useMissions();
  const {
    initialPosition,
    currentPosition,
    distance,
    loading,
    error,
    tracking,
    startTracking,
    stopTracking,
  } = useGeolocation();

  const [missionCompleted, setMissionCompleted] = useState(false);
  const REQUIRED_DISTANCE = 50; // 50 metros
  const canComplete = distance >= REQUIRED_DISTANCE;

  useEffect(() => {
    // Cleanup al desmontar
    return () => {
      if (tracking) {
        stopTracking();
      }
    };
  }, [tracking, stopTracking]);

  const handleStartMission = async () => {
    await startTracking();
  };

  const handleCompleteMission = async () => {
    try {
      // Completar la misión 2
      completeMission(2);
      setMissionCompleted(true);

      // Redirigir a Home después de 1.5 segundos
      setTimeout(() => {
        history.push('/home');
      }, 1500);
    } catch (err) {
      console.error('Error completing mission:', err);
    }
  };

  const getProgressPercentage = () => {
    return Math.min((distance / REQUIRED_DISTANCE) * 100, 100);
  };

  const formatDistance = (meters: number) => {
    if (meters < 1000) {
      return `${Math.round(meters)} m`;
    }
    return `${(meters / 1000).toFixed(2)} km`;
  };

  if (missionCompleted) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>¡Misión completada!</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen className="ion-padding">
          <div style={{ marginTop: '60px', textAlign: 'center' }}>
            <IonIcon
              icon={checkmarkCircle}
              style={{ fontSize: '80px', color: '#2dd36f' }}
            />
            <IonText>
              <h2 style={{ marginTop: '20px', color: '#2dd36f' }}>
                ¡Excelente!
              </h2>
              <p>Has recorrido {formatDistance(distance)}</p>
              <p style={{ fontSize: '14px', color: '#666' }}>
                +50 puntos ganados
              </p>
            </IonText>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButton
            slot="start"
            onClick={() => {
              if (tracking) stopTracking();
              history.goBack();
            }}
            fill="clear"
          >
            <IonIcon icon={arrowBack} />
          </IonButton>
          <IonTitle>Moverse 50 metros</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <div style={{ marginTop: '20px' }}>
          {/* Instrucciones */}
          <IonCard>
            <IonCardContent>
              <IonText>
                <h3>Objetivo</h3>
                <p>Recorre al menos 30 metros desde tu posición actual.</p>
              </IonText>
            </IonCardContent>
          </IonCard>

          {/* Estado del GPS */}
          {!tracking ? (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              {error && (
                <IonCard color="danger" style={{ marginBottom: '16px' }}>
                  <IonCardContent>
                    <IonText>
                      <p><strong>Error:</strong> {error}</p>
                    </IonText>
                  </IonCardContent>
                </IonCard>
              )}
              <IonButton
                onClick={handleStartMission}
                disabled={loading}
                size="large"
                color="primary"
              >
                {loading ? (
                  <>
                    <IonSpinner name="crescent" />
                  </>
                ) : (
                  <>
                    <IonIcon icon={navigateOutline} />
                    {error ? 'Reintentar' : 'Comenzar Rastreo'}
                  </>
                )}
              </IonButton>
            </div>
          ) : (
            <>
              {/* Distancia Recorrida */}
              <IonCard style={{ marginTop: '20px' }}>
                <IonCardContent>
                  <div style={{ textAlign: 'center' }}>
                    <IonText>
                      <p style={{ fontSize: '14px', color: '#666' }}>
                        Distancia recorrida
                      </p>
                    </IonText>
                    <div
                      style={{
                        fontSize: '48px',
                        fontWeight: 'bold',
                        color: canComplete ? '#2dd36f' : '#ff9100',
                        marginBottom: '8px',
                      }}
                    >
                      {formatDistance(distance)}
                    </div>
                    <IonText>
                      <p style={{ fontSize: '12px', color: '#999' }}>
                        Necesitas recorrer {REQUIRED_DISTANCE}m
                      </p>
                    </IonText>
                  </div>

                  {/* Progreso Bar */}
                  <div style={{ marginTop: '20px' }}>
                    <IonProgressBar
                      value={getProgressPercentage() / 100}
                      color={canComplete ? 'success' : 'warning'}
                    />
                    <IonText style={{ fontSize: '12px' }}>
                      <p style={{ marginTop: '8px', textAlign: 'center' }}>
                        {Math.round(getProgressPercentage())}%
                      </p>
                    </IonText>
                  </div>
                </IonCardContent>
              </IonCard>

              {/* Posición Actual */}
              {currentPosition && (
                <IonCard style={{ marginTop: '16px' }}>
                  <IonCardContent>
                    <IonText>
                      <p style={{ fontSize: '12px', color: '#666' }}>
                        <strong>Posición actual:</strong>
                      </p>
                      <p style={{ fontSize: '12px', marginTop: '4px' }}>
                        Lat: {currentPosition.latitude.toFixed(6)}
                      </p>
                      <p style={{ fontSize: '12px' }}>
                        Lon: {currentPosition.longitude.toFixed(6)}
                      </p>
                      {currentPosition.accuracy && (
                        <p style={{ fontSize: '12px', color: '#999' }}>
                          Precisión: ±{currentPosition.accuracy.toFixed(0)}m
                        </p>
                      )}
                    </IonText>
                  </IonCardContent>
                </IonCard>
              )}

              {/* Botón para completar */}
              <div style={{ marginTop: '24px', textAlign: 'center' }}>
                {canComplete ? (
                  <IonButton
                    onClick={handleCompleteMission}
                    size="large"
                    color="success"
                  >
                    <IonIcon icon={checkmarkCircle} />
                    Completar Misión
                  </IonButton>
                ) : (
                  <IonText>
                    <p style={{ color: '#ff9100', fontWeight: 'bold' }}>
                      Sigue caminando... Te falta {(REQUIRED_DISTANCE - distance).toFixed(1)}m
                    </p>
                  </IonText>
                )}
              </div>

              {/* Stop Tracking */}
              <div style={{ marginTop: '12px', textAlign: 'center' }}>
                <IonButton
                  onClick={() => {
                    stopTracking();
                  }}
                  color="medium"
                  size="small"
                >
                  Detener rastreo
                </IonButton>
              </div>
            </>
          )}


        </div>
      </IonContent>
    </IonPage>
  );
};

export default MissionMovement;
