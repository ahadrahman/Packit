import React from 'react';
import {
  IonCard, IonCardHeader, IonCardTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon, IonItem, IonLabel, IonList,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { add } from 'ionicons/icons';
import Trip from "../classes/Trip";
import {TripsContextConsumer, Trips} from "../states/TripsState";

const ListTrips: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Your Trips</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <TripsContextConsumer>
          { (context : Trips) =>
            <IonList>
              { (context.trips.length)
                ? context.trips.map((tr: Trip) =>
                    <IonItem href={"trips/" + tr.tripName}>
                      <IonLabel>
                        <h2>{tr.tripName}</h2>
                      </IonLabel>
                    </IonItem>
                ) : (
                  <IonCard>
                    <IonCardHeader>
                      <IonCardTitle>No Trips found. Why don't you add one?</IonCardTitle>
                    </IonCardHeader>
                  </IonCard>
                )
              }
            </IonList>
          }
        </TripsContextConsumer>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton href="/addtrip">
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default ListTrips;
