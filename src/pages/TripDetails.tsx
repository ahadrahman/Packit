import {IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from "@ionic/react";
import React from "react";
import {RouteComponentProps} from "react-router";
import {allTrips} from "./Trips";
import Trip from "../classes/Trip";

interface TripDetailsProps extends RouteComponentProps<{
  id: string;
}> {}


const TripDetails: React.FC<TripDetailsProps> = ({match}) => {
  let currentTrip:Trip = findTrip(match.params.id);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/trips"/>
          </IonButtons>
          <IonTitle>{currentTrip.tripName}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

      </IonContent>
    </IonPage>
  );
};

export default TripDetails;

function findTrip(tripName: string): Trip {
  console.log(allTrips);
  for (let trip of allTrips) {
    if (trip.tripName === tripName) {
      return trip;
    }
  }
  return allTrips[0];
}