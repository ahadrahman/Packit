import React, {useContext, useEffect, useState} from 'react';
import {
  IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon, IonItem, IonLabel, IonList,
  IonModal,
  IonPage, IonTabButton,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { add } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
import './Trips.css';
import Trip from "../classes/Trip";
import firebase from "firebase";
import {TripsContextConsumer, Trips} from "../TripsState";

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
