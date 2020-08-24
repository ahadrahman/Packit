import { useForm, Controller } from "react-hook-form";
import React, {useState} from 'react';
import {IonList, IonItem, IonLabel, IonText, IonInput, IonDatetime, IonButton} from '@ionic/react';
import Trip from "../classes/Trip";
import firebase from "firebase";

const AddTripForm: React.FC = () => {
  const { control, register, handleSubmit, errors, formState } = useForm();

  const [trips, setTrips] = useState();

  const onSubmit = (data: any) => {
    let trip: Trip = new Trip(data.tripName, data.startDate, data.endDate);
    let tripsRef = firebase.database().ref('/trips');
    tripsRef.push({
      tripName: trip.tripName,
      startDate: trip.startDate,
      endDate: trip.endDate,
    });
  };

  return (
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <IonList lines="full" class="ion-no-margin ion-no-padding">

            <IonItem>
              <IonLabel position="floating">
                Trip Name
                <IonText color="danger">*</IonText>
              </IonLabel>
              <IonInput name="tripName" required type="text" ref={register({ required: true })}>
              </IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">
                Start Date
              </IonLabel>
              <IonDatetime name="startDate" value="2020-07-31" placeholder="Select Date" ref={register({ required: true })}>
              </IonDatetime>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">
                End Date
              </IonLabel>
              <IonDatetime name="endDate" value="2020-07-31" placeholder="Select Date" ref={register({ required: true })}>
              </IonDatetime>
            </IonItem>
          </IonList>

          <IonButton expand="block" type="submit" class="ion-no-margin">
            Add Trip
          </IonButton>
        </form>
      </div>
  );
};

export default AddTripForm;
