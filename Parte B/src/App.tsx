import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
// pages
import LoginPage from './pages/LoginPage';
import VisitasPage from './pages/VisitasPage';
import DetalleVisitaPage from './pages/DetalleVisitaPage';
import MisPacientesPage from './pages/MisPacientesPage';
import PerfilMedicoPage from './pages/PerfilMedicoPage';

// icons
import { calendar, people, person } from 'ionicons/icons';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const Tabs: React.FC = () => (
  <IonTabs>
    <IonRouterOutlet>
      <Route exact path="/tabs/visitas">
        <VisitasPage />
      </Route>
      <Route exact path="/tabs/visitas/:id">
        <DetalleVisitaPage />
      </Route>
      <Route exact path="/tabs/pacientes">
        <MisPacientesPage />
      </Route>
      <Route exact path="/tabs/perfil">
        <PerfilMedicoPage />
      </Route>
      <Route exact path="/tabs" render={() => <Redirect to="/tabs/visitas" />} />
    </IonRouterOutlet>
    <IonTabBar slot="bottom">
      <IonTabButton tab="visitas" href="/tabs/visitas">
        <IonIcon icon={calendar} />
        <IonLabel>Visitas</IonLabel>
      </IonTabButton>
      <IonTabButton tab="pacientes" href="/tabs/pacientes">
        <IonIcon icon={people} />
        <IonLabel>Pacientes</IonLabel>
      </IonTabButton>
      <IonTabButton tab="perfil" href="/tabs/perfil">
        <IonIcon icon={person} />
        <IonLabel>Perfil</IonLabel>
      </IonTabButton>
    </IonTabBar>
  </IonTabs>
);

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        {/* pre-login */}
        <Route exact path="/login">
          <LoginPage />
        </Route>

        {/* tabs container */}
        <Route path="/tabs">
          <Tabs />
        </Route>

        {/* redirect root to login */}
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
