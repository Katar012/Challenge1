import { useState, useEffect, useRef } from 'react';
import { Geolocation, PositionError } from '@capacitor/geolocation';

export interface Position {
  latitude: number;
  longitude: number;
  accuracy?: number;
  timestamp: number;
}

// Calcular distancia entre dos coordenadas usando fórmula Haversine
const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Radio de la Tierra en km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c * 1000; // Devolver en metros
};

export const useGeolocation = () => {
  const [initialPosition, setInitialPosition] = useState<Position | null>(null);
  const [currentPosition, setCurrentPosition] = useState<Position | null>(null);
  const [distance, setDistance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tracking, setTracking] = useState(false);
  const watchIdRef = useRef<string | null>(null);

  // Obtener posición inicial
  const startTracking = async () => {
    try {
      setLoading(true);
      setError(null);

      // Solicitar permisos
      const permission = await Geolocation.requestPermissions();
      if (permission.location !== 'granted') {
        setError('Permisos de ubicación denegados. Por favor, habilita los permisos de ubicación en la configuración de tu dispositivo.');
        setLoading(false);
        return;
      }

      // Obtener posición inicial
      const initialPos = await Geolocation.getCurrentPosition();

      const initial: Position = {
        latitude: initialPos.coords.latitude,
        longitude: initialPos.coords.longitude,
        accuracy: initialPos.coords.accuracy || undefined,
        timestamp: Date.now(),
      };

      setInitialPosition(initial);
      setCurrentPosition(initial);
      setDistance(0);
      setTracking(true);

      // Comenzar a rastrear cambios de posición
      watchIdRef.current = await Geolocation.watchPosition(
        {},
        (position, err) => {
          if (err) {
            console.error('Error tracking position:', err);
            return;
          }

          if (position) {
            const current: Position = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              accuracy: position.coords.accuracy || undefined,
              timestamp: Date.now(),
            };

            setCurrentPosition(current);

            // Calcular distancia
            if (initial) {
              const dist = calculateDistance(
                initial.latitude,
                initial.longitude,
                current.latitude,
                current.longitude
              );
              setDistance(dist);
            }
          }
        }
      );

      setLoading(false);
    } catch (err) {
      console.error('Error starting tracking:', err);
      const error = err as PositionError;
      setError(error.message || 'Error al obtener la ubicación');
      setLoading(false);
    }
  };

  // Detener rastreo
  const stopTracking = () => {
    if (watchIdRef.current) {
      Geolocation.clearWatch({ id: watchIdRef.current });
      watchIdRef.current = null;
    }
    setTracking(false);
  };

  // Cleanup
  useEffect(() => {
    return () => {
      stopTracking();
    };
  }, []);

  return {
    initialPosition,
    currentPosition,
    distance,
    loading,
    error,
    tracking,
    startTracking,
    stopTracking,
  };
};
