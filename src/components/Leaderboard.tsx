import React from 'react';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonText,
  IonIcon,
  IonSpinner,
  IonList,
  IonItem,
  IonAvatar,
  IonBadge,
} from '@ionic/react';
import { trophy, medal } from 'ionicons/icons';
import { useLeaderboard } from '../hooks/useLeaderboard';
import './Leaderboard.css';

const Leaderboard: React.FC = () => {
  const { leaderboard, currentUserRank, loading, error } = useLeaderboard();

  const getMedalColor = (rank: number): string => {
    if (rank === 1) return 'warning'; // Gold
    if (rank === 2) return 'medium'; // Silver
    if (rank === 3) return 'danger'; // Bronze
    return 'primary';
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return trophy;
    return medal;
  };

  if (loading) {
    return (
      <IonCard className="leaderboard-card">
        <IonCardHeader>
          <IonCardTitle>🏆 Ranking</IonCardTitle>
        </IonCardHeader>
        <IonCardContent className="loading-container">
          <IonSpinner />
        </IonCardContent>
      </IonCard>
    );
  }

  if (error) {
    return (
      <IonCard className="leaderboard-card">
        <IonCardHeader>
          <IonCardTitle>🏆 Ranking</IonCardTitle>
        </IonCardHeader>
        <IonCardContent color="danger">
          <IonText>{error}</IonText>
        </IonCardContent>
      </IonCard>
    );
  }

  return (
    <IonCard className="leaderboard-card">
      <IonCardHeader>
        <IonCardTitle>🏆 Ranking</IonCardTitle>
      </IonCardHeader>
      <IonCardContent className="leaderboard-content">
        {leaderboard.length === 0 ? (
          <IonText>
            <p className="no-data">No hay datos de ranking aún</p>
          </IonText>
        ) : (
          <IonList className="leaderboard-list">
            {leaderboard.map((entry, index) => (
              <IonItem
                key={entry.userId}
                className={`leaderboard-item ${entry.isCurrentUser ? 'current-user' : ''} ${
                  index < 5 ? 'top-5' : 'outside-top-5'
                }`}
              >
                <div className="rank-badge">
                  <IonBadge color={getMedalColor(entry.rank)}>
                    {entry.rank <= 3 ? (
                      <IonIcon icon={getRankIcon(entry.rank)} />
                    ) : (
                      <span>#{entry.rank}</span>
                    )}
                  </IonBadge>
                </div>

                <div className="player-info">
                  <div className="player-name">
                    {entry.isCurrentUser ? (
                      <>
                        <strong>{entry.userName}</strong>
                        <span className="you-badge">(Tú)</span>
                      </>
                    ) : (
                      <strong>{entry.userName}</strong>
                    )}
                  </div>
                </div>

                <div className="player-points">
                  <span className="points-value">{entry.points}</span>
                  <span className="points-label">pts</span>
                </div>
              </IonItem>
            ))}
          </IonList>
        )}

        {currentUserRank && currentUserRank.rank > 5 && (
          <div className="user-position-info">
            <IonText>
              <p>
                Tu posición: <strong>#{currentUserRank.rank}</strong> con{' '}
                <strong>{currentUserRank.points}</strong> puntos
              </p>
            </IonText>
          </div>
        )}
      </IonCardContent>
    </IonCard>
  );
};

export default Leaderboard;
