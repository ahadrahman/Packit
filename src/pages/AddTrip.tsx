import React from 'react';
import {IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonBackButton, IonMenuButton} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './AddTrip.css';
import AddTripForm from "../components/AddTripForm";

const AddTrip: React.FC = () => {
  return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/trips"/>
            </IonButtons>
            <IonTitle>Add Trip</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <AddTripForm />
        </IonContent>
      </IonPage>
  );
};

export default AddTrip;
