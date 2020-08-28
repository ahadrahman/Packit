import React from 'react';
import {IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonBackButton, IonMenuButton} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import AddSuitcaseForm from "../components/AddSuitcaseForm";
import {RouteComponentProps} from "react-router";

interface AddItem extends RouteComponentProps<{
  id: string;
  suitcaseID: string;
}> {}

const AddItem: React.FC<AddItem> = ({match}) => {
  let tripName = match.params.id;
  let suitcaseName = match.params.suitcaseID;
  return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              {/*{`../assets/suitcases/${s.colour}.png`}*/}
              <IonBackButton defaultHref={`/trips/${tripName}/${suitcaseName}`}/>
            </IonButtons>
            <IonTitle>Add Item for {suitcaseName} for {tripName}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <AddSuitcaseForm nameOfTrip={tripName}/>
        </IonContent>
      </IonPage>
  );
};

export default AddItem;
