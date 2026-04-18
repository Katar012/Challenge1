import { useState, useCallback, useEffect } from 'react';
import { Mission, INITIAL_MISSIONS } from '../types/mission';
import { auth } from '../firebase/config';

export interface UserData {
  points: number;
  missions: Array<{ id: number; completed: boolean }>;
}

export const useMissions = () => {
  const [missions, setMissions] = useState<Mission[]>(INITIAL_MISSIONS);
  const [loading, setLoading] = useState(true);

  const userId = auth.currentUser?.uid;

  // Cargar datos al montar
  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const loadUserData = async () => {
      try {
        // Intentar cargar de localStorage primero
        const localData = localStorage.getItem(`user_${userId}`);
        if (localData) {
          const parsed = JSON.parse(localData) as UserData;
          applyDataToMissions(parsed);
        } else {
          // Si no hay datos locales, usar iniciales
          setMissions(INITIAL_MISSIONS);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        setMissions(INITIAL_MISSIONS);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [userId]);

  const applyDataToMissions = (data: UserData) => {
    setMissions((prevMissions: Mission[]) =>
      prevMissions.map((mission) => {
        const savedMission = data.missions.find((m) => m.id === mission.id);
        return savedMission
          ? { ...mission, status: savedMission.completed ? 'completed' : 'pending' }
          : mission;
      })
    );
  };

  const completeMission = useCallback(
    (missionId: number) => {
      if (!userId) return;

      setMissions((prevMissions) => {
        const updatedMissions = prevMissions.map((mission) =>
          mission.id === missionId
            ? { ...mission, status: 'completed' as const }
            : mission
        );

        // Guardar en localStorage y Firebase
        const newUserData: UserData = {
          points: getTotalPointsFromMissions(updatedMissions),
          missions: updatedMissions.map((m) => ({
            id: m.id,
            completed: m.status === 'completed',
          })),
        };

        localStorage.setItem(`user_${userId}`, JSON.stringify(newUserData));
        saveToFirebase(userId, newUserData);

        return updatedMissions;
      });
    },
    [userId]
  );

  const getTotalPointsFromMissions = (missionsArray: Mission[]) => {
    return missionsArray
      .filter((mission) => mission.status === 'completed')
      .reduce((sum, mission) => sum + mission.points, 0);
  };

  const getTotalPoints = useCallback(() => {
    return getTotalPointsFromMissions(missions);
  }, [missions]);

  const getCompletedCount = useCallback(() => {
    return missions.filter((mission) => mission.status === 'completed').length;
  }, [missions]);

  const getProgressPercentage = useCallback(() => {
    const total = missions.length;
    const completed = getCompletedCount();
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  }, [missions, getCompletedCount]);

  const saveToFirebase = async (userId: string, data: UserData) => {
    try {
      const response = await fetch(
        `https://parcial2-faad8-default-rtdb.firebaseio.com/users/${userId}.json`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        console.error('Error saving to Firebase');
      }
    } catch (error) {
      console.error('Error syncing to Firebase:', error);
    }
  };

  return {
    missions,
    completeMission,
    getTotalPoints,
    getCompletedCount,
    getProgressPercentage,
    totalMissions: missions.length,
    loading,
  };
};
