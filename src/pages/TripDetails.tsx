import {
  IonBackButton,
  IonButtons,
  IonCard, IonCardContent,
  IonCardHeader, IonCardTitle,
  IonContent,
  IonHeader, IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem, IonItemDivider, IonList, IonFab, IonFabButton, IonIcon, IonAvatar
} from "@ionic/react";
import React, {useContext, useEffect, useState} from "react";
import {RouteComponentProps} from "react-router";
import Trip from "../classes/Trip";
import {TripsContext} from "../states/TripsState";
import firebase from "firebase";
import {add, trash} from "ionicons/icons";
import {Suitcases, SuitcasesContextConsumer, SuitcasesContextProvider} from "../states/SuitcasesState";
import Suitcase from "../classes/Suitcase";
import Forecast from "../components/Forecast";

interface TripDetailsProps extends RouteComponentProps<{
  id: string;
}> {}


const TripDetails: React.FC<TripDetailsProps> = ({match}) => {

  const { trips } = useContext(TripsContext);

  let currentTripName: string = match.params.id; //Drake Concert
  let currentTrip: Trip = new Trip("Loading...", new Date(1975, 7, 26), new Date(1975, 8, 26), "Loading...");

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

          <Forecast cityName={currentTrip.location}/>

          <IonItemDivider>
            <IonLabel>Suitcases</IonLabel>
          </IonItemDivider>

          <SuitcasesContextConsumer>
            { (context : Suitcases) =>
              <IonList>
                { (context.suitcases.length)
                  ? context.suitcases.map((s: Suitcase) =>
                    <IonItem href={"trips/" + currentTrip.tripName + "/" + s.suitcaseName}>
                      <IonAvatar slot="start">
                        <img src={`../assets/suitcases/${s.colour}.png`}/>
                      </IonAvatar>
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

          <IonFab vertical="bottom" horizontal="start" slot="fixed" >
            <IonFabButton href="/trips" onClick={() => deleteTrip(currentTrip)} color="danger">
              <IonIcon icon={trash} />
            </IonFabButton>
          </IonFab>

        </IonContent>
      </IonPage>
    </SuitcasesContextProvider>
  );
};

function deleteTrip(t: Trip) {
  let dbRef = firebase.database().ref('/trips/' + t.id);
  dbRef.remove();
}

function formatDate(t: Trip): string {
  if (t.tripName === "Loading...") {
    return "Loading..."
  } else {
    return t.startDate + " to " + t.endDate;
  }
}

export default TripDetails;
