import React from 'react';
import {IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonBackButton} from '@ionic/react';
import AddSuitcaseForm from "../components/AddSuitcaseForm";
import {RouteComponentProps} from "react-router";

interface AddSuitcase extends RouteComponentProps<{
  id: string;
}> {}

const AddSuitcase: React.FC<AddSuitcase> = ({match}) => {
  let tripName = match.params.id;
  return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref={`/trips/${tripName}`}/>
            </IonButtons>
            <IonTitle>Add Suitcase for {tripName}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <AddSuitcaseForm nameOfTrip={tripName}/>
        </IonContent>
      </IonPage>
  );
};

export default AddSuitcase;
