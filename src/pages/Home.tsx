import { useHistory } from 'react-router-dom';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonButtons, IonText, IonCard, IonCardContent } from '@ionic/react';
import { useAuth } from '../contexts/AuthContext';
import { useMissions } from '../hooks/useMissions';
import MissionItem from '../components/MissionItem';
import ProgressBar from '../components/ProgressBar';
import Leaderboard from '../components/Leaderboard';
import './Home.css';

const Home: React.FC = () => {
  const { user, logout } = useAuth();
  const history = useHistory();
  const { missions, getTotalPoints, getCompletedCount, getProgressPercentage, totalMissions } = useMissions();

  const handleLogout = async () => {
    await logout();
    history.push('/login');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Misiones</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleLogout}>Logout</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Misiones</IonTitle>
          </IonToolbar>
        </IonHeader>

        <ProgressBar
          percentage={getProgressPercentage()}
          completed={getCompletedCount()}
          total={totalMissions}
        />

        <IonCard className="points-card">
          <IonCardContent>
            <div className="points-display">
              <IonText>
                <span className="points-label">Puntos totales:</span>
              </IonText>
              <IonText>
                <span className="points-value">{getTotalPoints()}</span>
              </IonText>
            </div>
          </IonCardContent>
        </IonCard>

        <Leaderboard />

        <div className="missions-list">
          {missions.map((mission) => (
            <MissionItem key={mission.id} mission={mission} onComplete={() => {}} />
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
