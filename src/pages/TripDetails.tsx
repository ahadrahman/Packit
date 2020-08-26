import {
  IonBackButton,
  IonButtons,
  IonCard, IonCardContent,
  IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import React, {useContext, useEffect, useState} from "react";
import {RouteComponentProps} from "react-router";
import Trip from "../classes/Trip";
import {Trips, TripsContext, TripsContextConsumer} from "../TripsState";
import firebase from "firebase";

interface TripDetailsProps extends RouteComponentProps<{
  id: string;
}> {}


const TripDetails: React.FC<TripDetailsProps> = ({match}) => {

  const { trips } = useContext(TripsContext);

  let currentTripName: string = match.params.id;
  let currentTrip: Trip = new Trip("Loading...", new Date(1975, 1, 1), new Date(1975, 1, 1));

  trips.forEach((t: Trip) => {
    if (t.tripName === currentTripName) {
      currentTrip = t;
    }
  });

  let content: string = formatDate(currentTrip);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/trips"/>
          </IonButtons>
          <IonTitle>
            {currentTrip.tripName} Details
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>{currentTrip.tripName}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            {content}
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

function formatDate(t: Trip): string {
  return t.startDate + " to " + t.endDate;
}

export default TripDetails;
