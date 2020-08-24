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

export let allTrips: Trip[] = [];

const Trips: React.FC = () => {

  const [trips, setTrips] = useState([]);

  let tripsRef = firebase.database().ref('/trips');

  useEffect(() => {
      tripsRef.on('value', snapshot => {
        let data = snapshot.val();
        if (data != null) {
          setTrips(Object.values(data));
          allTrips = allTrips.concat(Object.values(data));
          console.log(allTrips);
        }
      });

  }, [] );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Your Trips</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {
            trips.length ? (
              trips.map((tr: Trip) => (
                <IonItem href={"trips/" + tr.tripName} >
                  <IonLabel>
                    <h2>{tr.tripName}</h2>
                  </IonLabel>
                </IonItem>
              ))
            ) : (
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>No Trips found. Why don't you add one?</IonCardTitle>
                </IonCardHeader>
              </IonCard>
            )
          }
        </IonList>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton href="/addtrip">
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Trips;
