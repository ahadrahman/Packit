import {
  IonBackButton,
  IonButtons,
  IonCard, IonCardContent,
  IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonContent,
  IonHeader, IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem, IonItemDivider, IonItemGroup, IonList, IonFab, IonFabButton, IonIcon
} from "@ionic/react";
import React, {useContext, useEffect, useState} from "react";
import {RouteComponentProps} from "react-router";
import Trip from "../classes/Trip";
import {Trips, TripsContext, TripsContextConsumer} from "../TripsState";
import firebase from "firebase";
import {add} from "ionicons/icons";
import {Suitcases, SuitcasesContext, SuitcasesContextConsumer, SuitcasesContextProvider} from "../SuitcasesState";
import Suitcase from "../classes/Suitcase";

interface TripDetailsProps extends RouteComponentProps<{
  id: string;
}> {}


const TripDetails: React.FC<TripDetailsProps> = ({match}) => {

  const { trips } = useContext(TripsContext);
  const { suitcases } = useContext(SuitcasesContext);

  console.log(suitcases);

  let currentTripName: string = match.params.id;
  let currentTrip: Trip = new Trip("Loading...", new Date(1975, 1, 1), new Date(1975, 1, 1));

  trips.forEach((t: Trip) => {
    if (t.tripName === currentTripName) {
      currentTrip = t;
    }
  });

  let content: string = formatDate(currentTrip);
  let suitcasehref = "trips/" + currentTripName + "/addsuitcase";

  return (
    <SuitcasesContextProvider tripID={currentTrip.id}>
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

          <IonItemDivider>
            <IonLabel>Suitcases</IonLabel>
          </IonItemDivider>

          <SuitcasesContextConsumer>
            { (context : Suitcases) =>
              <IonList>
                { (context.suitcases.length)
                  ? context.suitcases.map((s: Suitcase) =>
                    <IonItem href="">
                      <IonLabel>
                        <h2>{s.suitcaseName}</h2>
                      </IonLabel>
                    </IonItem>
                  ) : (
                    <IonCard>
                      <IonCardHeader>
                        <IonCardTitle>No Suitcases found. Why don't you add one?</IonCardTitle>
                      </IonCardHeader>
                    </IonCard>
                  )
                }
              </IonList>
            }
          </SuitcasesContextConsumer>

          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton href={suitcasehref}>
              <IonIcon icon={add} />
            </IonFabButton>
          </IonFab>

        </IonContent>
      </IonPage>
    </SuitcasesContextProvider>
  );
};

function formatDate(t: Trip): string {
  if (t.tripName === "Loading...") {
    return "Loading..."
  } else {
    return t.startDate + " to " + t.endDate;
  }
}

export default TripDetails;
