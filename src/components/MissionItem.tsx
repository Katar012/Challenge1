import { IonCard, IonCardContent, IonButton, IonBadge, IonIcon } from '@ionic/react';
import { checkmarkCircle, radioButtonOff } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { Mission } from '../types/mission';
import './MissionItem.css';

interface MissionItemProps {
  mission: Mission;
  onComplete: (missionId: number) => void;
}

const MissionItem: React.FC<MissionItemProps> = ({ mission, onComplete }) => {
  const history = useHistory();

  const handleStartMission = () => {
    history.push(mission.route);
  };

  return (
    <IonCard className={`mission-card mission-${mission.status}`}>
      <IonCardContent>
        <div className="mission-header">
          <div className="mission-status">
            <IonIcon
              icon={mission.status === 'completed' ? checkmarkCircle : radioButtonOff}
              className={`status-icon ${mission.status}`}
            />
          </div>
          <div className="mission-info">
            <h2 className="mission-title">{mission.title}</h2>
            <p className="mission-description">{mission.description}</p>
          </div>
          <div className="mission-points">
            <IonBadge color={mission.status === 'completed' ? 'success' : 'warning'}>
              +{mission.points}
            </IonBadge>
          </div>
        </div>
        <div className="mission-action">
          <IonButton
            expand="block"
            onClick={handleStartMission}
            disabled={mission.status === 'completed'}
            color={mission.status === 'completed' ? 'medium' : 'primary'}
          >
            {mission.status === 'completed' ? 'Completada' : 'Iniciar'}
          </IonButton>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default MissionItem;
