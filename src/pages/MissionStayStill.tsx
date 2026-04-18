import React, { useEffect, useState, useRef } from 'react';
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
import { arrowBack, checkmarkCircle, warningOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { useStillDetection } from '../hooks/useStillDetection';
import { useMissions } from '../hooks/useMissions';
import './MissionPage.css';

const MissionStayStill: React.FC = () => {
  const history = useHistory();
  const { completeMission } = useMissions();
  const { isStill, movementDetected, loading, error, startDetection, stopDetection } =
    useStillDetection();

  const [missionStarted, setMissionStarted] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(10);
  const [missionCompleted, setMissionCompleted] = useState(false);
  const [countdownStarted, setCountdownStarted] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const REQUIRED_SECONDS = 10;

  // Limpiar timer al desmontar
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (missionStarted) {
        stopDetection();
      }
    };
  }, [missionStarted, stopDetection]);

  // Manejar el countdown
  useEffect(() => {
    if (!missionStarted || !countdownStarted) {
      return;
    }

    // Si se detecta movimiento, resetear el countdown
    if (movementDetected) {
      setSecondsRemaining(10);
      setCountdownStarted(false);
      return;
    }

    // Si no se detecta movimiento, comenzar countdown
    if (!movementDetected && isStill) {
      timerRef.current = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            // Tiempo completado
            handleMissionComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }
  }, [missionStarted, countdownStarted, movementDetected, isStill]);

  // Vibraciones y completar misión
  const handleMissionComplete = async () => {
    try {
      // Vibración de éxito
      await Haptics.impact({ style: ImpactStyle.Heavy });
      await new Promise((resolve) => setTimeout(resolve, 100));
      await Haptics.impact({ style: ImpactStyle.Light });

      // Completar misión 3
      completeMission(3);
      setMissionCompleted(true);

      // Detener detección
      stopDetection();

      // Redirigir a Home después de 2 segundos
      setTimeout(() => {
        history.push('/home');
      }, 2000);
    } catch (err) {
      console.error('Error completing mission:', err);
    }
  };

  const handleStartMission = async () => {
    try {
      setMissionStarted(true);
      setSecondsRemaining(10);
      setCountdownStarted(true);
      await startDetection();
    } catch (err) {
      console.error('Error starting mission:', err);
    }
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
              <h2 style={{ marginTop: '20px', color: '#2dd36f' }}>¡Increíble!</h2>
              <p>Permaneciste quieto 10 segundos</p>
              <p style={{ fontSize: '14px', color: '#666' }}>+30 puntos ganados</p>
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
              if (missionStarted) stopDetection();
              history.goBack();
            }}
            fill="clear"
          >
            <IonIcon icon={arrowBack} />
          </IonButton>
          <IonTitle>Permanencia activa</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <div style={{ marginTop: '20px' }}>
          {/* Instrucciones */}
          <IonCard>
            <IonCardContent>
              <IonText>
                <h3>Objetivo</h3>
                <p>
                  Mantén tu dispositivo completamente quieto durante 10 segundos sin mover.
                </p>
                <p style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
                  El contador se reiniciará si detectamos movimiento.
                </p>
              </IonText>
            </IonCardContent>
          </IonCard>

          {!missionStarted ? (
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
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
                  error ? 'Reintentar' : 'Comenzar Misión'
                )}
              </IonButton>
            </div>
          ) : (
            <>
              {/* Estado del acelerómetro */}
              <IonCard
                style={{ marginTop: '20px' }}
                color={movementDetected ? 'warning' : 'success'}
              >
                <IonCardContent>
                  <div style={{ textAlign: 'center' }}>
                    <div
                      style={{
                        fontSize: '40px',
                        marginBottom: '8px',
                      }}
                    >
                      {movementDetected ? '⚠️' : '✓'}
                    </div>
                    <IonText>
                      <p style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                        {movementDetected ? 'Se detectó movimiento' : 'Dispositivo quieto'}
                      </p>
                      <p style={{ fontSize: '12px' }}>
                        {movementDetected
                          ? 'Intenta mantener el dispositivo más quieto'
                          : 'Perfecto, continúa así'}
                      </p>
                    </IonText>
                  </div>
                </IonCardContent>
              </IonCard>

              {/* Countdown Timer */}
              <IonCard style={{ marginTop: '20px' }}>
                <IonCardContent>
                  <div style={{ textAlign: 'center' }}>
                    <IonText>
                      <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>
                        Tiempo restante
                      </p>
                    </IonText>

                    <div
                      style={{
                        fontSize: '80px',
                        fontWeight: 'bold',
                        color: secondsRemaining <= 3 ? '#ff9100' : '#2dd36f',
                        marginBottom: '20px',
                      }}
                    >
                      {secondsRemaining}
                    </div>

                    <IonProgressBar
                      value={1 - secondsRemaining / REQUIRED_SECONDS}
                      color={secondsRemaining <= 3 ? 'warning' : 'success'}
                    />

                    <IonText style={{ fontSize: '12px', marginTop: '12px' }}>
                      <p>
                        Progreso: {REQUIRED_SECONDS - secondsRemaining} /{' '}
                        {REQUIRED_SECONDS} segundos
                      </p>
                    </IonText>
                  </div>
                </IonCardContent>
              </IonCard>

              {/* Instrucciones adicionales */}
              {movementDetected && (
                <IonCard color="danger" style={{ marginTop: '16px' }}>
                  <IonCardContent>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <IonIcon icon={warningOutline} style={{ fontSize: '24px' }} />
                      <IonText>
                        <p style={{ margin: '0', fontSize: '14px' }}>
                          ⏱️ Contador reiniciado. ¡Mantén el teléfono quieto!
                        </p>
                      </IonText>
                    </div>
                  </IonCardContent>
                </IonCard>
              )}

              {/* Cancelar misión */}
              <div style={{ marginTop: '24px', textAlign: 'center' }}>
                <IonButton
                  onClick={() => {
                    stopDetection();
                    setMissionStarted(false);
                    setSecondsRemaining(10);
                    setCountdownStarted(false);
                  }}
                  color="medium"
                  size="small"
                >
                  Cancelar misión
                </IonButton>
              </div>
            </>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MissionStayStill;
