import React, {useContext, useEffect, useState} from 'react';
import {
  IonButton,
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

const Trips: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Your Trips</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        <IonList>
          {displayTrips()}
        </IonList>
        {/*<IonHeader collapse="condense">*/}
        {/*  <IonToolbar>*/}
        {/*    <IonTitle size="large">Your Trips</IonTitle>*/}
        {/*  </IonToolbar>*/}
        {/*</IonHeader>*/}
        {/*<ExploreContainer name="Your Trips Page" />*/}

        {/*Add Trip Button on bottom right*/}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton href="/addtrip">
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>

      </IonContent>
    </IonPage>
  );
};

function displayTrips() {
  useEffect(() => {
      toReturn.push(
        <IonItem>
          <IonLabel>
            <h2>{data.tripName}</h2>
            <h3>{data.startDate} - {data.endDate}</h3>
          </IonLabel>
        </IonItem>
    }, [data]
  )
  // let toReturn: any[] = [];
  //
  // for (let t of useContext()) { //Todo: Change this useState.trips
  //   toReturn.push(
  //     <IonItem>
  //       <IonLabel>
  //         <h2>{t.tripName}</h2>
  //         <h3>{t.startDate} - {t.endDate}</h3>
  //       </IonLabel>
  //     </IonItem>
  //   )
  // }
  //
  // return toReturn
}


export default Trips;
