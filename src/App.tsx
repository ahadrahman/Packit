import React from 'react';
import * as firebase from 'firebase/app';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel, IonRoute,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import ListTrips from './pages/ListTrips';
import Suitcases from './pages/Suitcases';
import Tab3 from './pages/Tab3';
import AddTrip from "./pages/AddTrip";

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

/* Theme variables */
import './theme/variables.css';
import {firebaseConfig} from "./credentials";
import TripDetails from "./pages/TripDetails";
import {TripsContextProvider} from "./TripsState";
import AddSuitcase from './pages/AddSuitcase';
import {SuitcasesContextProvider} from "./SuitcasesState";

firebase.initializeApp(firebaseConfig);

const App: React.FC = () => (
  <IonApp>
    <TripsContextProvider>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/trips" component={ListTrips} />
            <Route path="/trips/:id" component={TripDetails} />
            <Route path="/addtrip" component={AddTrip} />
            <Route path="/suitcases" component={Suitcases} exact={true} />
            <Route path="/trips/:id/addsuitcase" component={AddSuitcase} />
            <Route path="/tab3" component={Tab3} />
            <Route path="/" render={() => <Redirect to="/trips" />} exact={true} />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="trips" href="/trips">
              <IonIcon icon={triangle} />
              <IonLabel>Trips</IonLabel>
            </IonTabButton>
            <IonTabButton tab="suitcases" href="/suitcases">
              <IonIcon icon={ellipse} />
              <IonLabel>Suitcases</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab3" href="/tab3">
              <IonIcon icon={square} />
              <IonLabel>Tab 3</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </TripsContextProvider>
  </IonApp>

);

export default App;
