import { IonProgressBar, IonText } from '@ionic/react';
import './ProgressBar.css';

interface ProgressBarProps {
  percentage: number;
  completed: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage, completed, total }) => {
  return (
    <div className="progress-container">
      <div className="progress-header">
        <IonText>
          <h3 className="progress-title">Progreso de misiones</h3>
        </IonText>
        <IonText>
          <span className="progress-fraction">{completed}/{total}</span>
        </IonText>
      </div>
      <IonProgressBar value={percentage / 100} />
      <div className="progress-percentage">
        <IonText>
          <span>{percentage}% completado</span>
        </IonText>
      </div>
    </div>
  );
};

export default ProgressBar;
