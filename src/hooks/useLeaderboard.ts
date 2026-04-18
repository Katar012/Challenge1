import { useState, useEffect } from 'react';
import { auth } from '../firebase/config';

export interface LeaderboardEntry {
  userId: string;
  userName: string;
  points: number;
  rank: number;
  isCurrentUser: boolean;
}

export const useLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [currentUserRank, setCurrentUserRank] = useState<LeaderboardEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userId = auth.currentUser?.uid;
  const userName = auth.currentUser?.email?.split('@')[0] || 'Usuario';

  useEffect(() => {
    const fetchLeaderboard = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Fetch all users and their points from Firebase Realtime Database
        const response = await fetch(
          'https://parcial2-faad8-default-rtdb.firebaseio.com/users.json'
        );

        if (!response.ok) {
          throw new Error('Error fetching leaderboard');
        }

        const data = await response.json();

        if (!data) {
          setLeaderboard([]);
          setCurrentUserRank(null);
          return;
        }

        // Transform data to array and sort by points
        const entries: LeaderboardEntry[] = Object.entries(data)
          .map(([uid, userData]: [string, any]) => ({
            userId: uid,
            userName: uid === userId ? userName : `User_${uid.substring(0, 6)}`,
            points: userData?.points || 0,
            rank: 0,
            isCurrentUser: uid === userId,
          }))
          .sort((a, b) => b.points - a.points);

        // Assign ranks
        entries.forEach((entry, index) => {
          entry.rank = index + 1;
        });

        // Get top 5
        const top5 = entries.slice(0, 5);

        // Find current user
        const userEntry = entries.find((entry) => entry.isCurrentUser);

        // If user is not in top 5, we'll show top 5 + user's position
        let finalLeaderboard = top5;
        if (userEntry && userEntry.rank > 5) {
          // Show top 5 + current user
          finalLeaderboard = [...top5, userEntry];
        }

        setLeaderboard(finalLeaderboard);
        setCurrentUserRank(userEntry || null);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError('Error al cargar el ranking');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();

    // Refresh every 10 seconds
    const interval = setInterval(fetchLeaderboard, 10000);

    return () => clearInterval(interval);
  }, [userId, userName]);

  return {
    leaderboard,
    currentUserRank,
    loading,
    error,
  };
};
