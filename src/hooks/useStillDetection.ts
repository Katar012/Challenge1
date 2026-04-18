import { useState, useEffect, useRef, useCallback } from 'react';
import { Motion, MotionOrientation } from '@capacitor/motion';

export interface AccelerometerData {
  x: number;
  y: number;
  z: number;
}

// Determinar si hay movimiento significativo
const isSignificantMovement = (data: AccelerometerData, threshold: number = 0.5): boolean => {
  // Calcular magnitud del vector de aceleración
  const magnitude = Math.sqrt(data.x * data.x + data.y * data.y + data.z * data.z);
  // Si la magnitud es próxima a 9.8 (gravedad), el dispositivo está quieto
  // Si se aleja mucho, hay movimiento
  return Math.abs(magnitude - 9.8) > threshold;
};

export const useStillDetection = (detectionInterval: number = 500) => {
  const [isStill, setIsStill] = useState(true);
  const [
    movementDetected, setMovementDetected,
  ] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const watchIdRef = useRef<string | null>(null);

  const startDetection = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Iniciar monitoreo de acelerómetro
      watchIdRef.current = await Motion.addListener('accel', (event) => {
        const accelData = {
          x: event.acceleration.x || 0,
          y: event.acceleration.y || 0,
          z: event.acceleration.z || 0,
        };

        // Detectar movimiento significativo
        const hasMovement = isSignificantMovement(accelData, 0.8);

        if (hasMovement) {
          setIsStill(false);
          setMovementDetected(true);
        } else {
          setIsStill(true);
          setMovementDetected(false);
        }
      });

      setLoading(false);
    } catch (err) {
      console.error('Error starting motion detection:', err);
      setError('No se puede acceder al acelerómetro del dispositivo');
      setLoading(false);
    }
  }, []);

  const stopDetection = useCallback(async () => {
    if (watchIdRef.current) {
      const listener = await Motion.addListener('accel', () => {});
      await listener.remove();
      watchIdRef.current = null;
    }
    setIsStill(true);
    setMovementDetected(false);
  }, []);

  // Cleanup
  useEffect(() => {
    return () => {
      stopDetection();
    };
  }, [stopDetection]);

  return {
    isStill,
    movementDetected,
    loading,
    error,
    startDetection,
    stopDetection,
  };
};
