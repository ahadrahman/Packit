import { useForm, Controller } from "react-hook-form";
import React, {useState} from 'react';
import {IonList, IonItem, IonLabel, IonText, IonInput, IonDatetime, IonButton, IonToast} from '@ionic/react';
import Trip from "../classes/Trip";
import firebase from "firebase";

const AddTripForm: React.FC = () => {
  const { control, register, handleSubmit, errors, formState } = useForm();
  const [showToast, setShowToast] = useState(false);

  const onSubmit = (data: any) => {
    let trip: Trip = new Trip(data.tripName, data.startDate, data.endDate, data.location);
    let tripsRef = firebase.database().ref('/trips');
    let tripID = tripsRef.push({
      tripName: trip.tripName,
      startDate: trip.startDate,
      endDate: trip.endDate,
      location: trip.location,
    }).key;
    if (tripID != null) {
      tripsRef.child(tripID).update({'id': tripID});
    }
    setShowToast(true);
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
              <IonLabel position="floating">
                Location
                <IonText color="danger">*</IonText>
              </IonLabel>
              <IonInput name="location" required type="text" ref={register({ required: true })}>
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
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Trip has been added successfully."
          duration={2000}
        />
      </div>
  );
};

export default AddTripForm;
