import { useForm, Controller } from "react-hook-form";
import React, {useContext, useState} from 'react';
import {IonList, IonItem, IonLabel, IonText, IonInput, IonDatetime, IonButton} from '@ionic/react';
import Trip from "../classes/Trip";
import firebase from "firebase";
import Suitcase from "../classes/Suitcase";
import {TripsContext} from "../TripsState";
import {RouteComponentProps} from "react-router";

// type SuitcaseProps {
//   nameOfTrip: string;
// }

const AddSuitcaseForm: React.FC<{nameOfTrip:string}> = ({nameOfTrip}) => {
  let tripName = nameOfTrip;


  const { control, register, handleSubmit, errors, formState } = useForm();
  const { trips } = useContext(TripsContext);

  const onSubmit = (data: any) => {
    let suitcase: Suitcase = new Suitcase(data.suitcaseName);
    let currentTrip: Trip = new Trip("Loading...", new Date(1975, 1, 1), new Date(1975, 1, 1));


    trips.forEach((t: Trip) => {
      if (t.tripName === tripName) {
        currentTrip = t;
      }
    });

    // console.log(currentTrip);
    // if (currentTrip.suitcases[0].suitcaseName === "") {
    //   console.log("got to here")
    //   currentTrip.suitcases[0] = su
    // }
    // currentTrip.suitcases.push(suitcase);
    // console.log(currentTrip);

    let dbRef = firebase.database().ref('/trips/' + currentTrip.id + '/suitcases');
    let suitcaseID = dbRef.push({
      suitcaseName: suitcase.suitcaseName,
    }).key;
    if (suitcaseID != null) {
      dbRef.child(suitcaseID).update({'id': suitcaseID});
    }
    dbRef.child("/0").remove();
    // tripsRef.child(currentTrip.id).update({'suitcases': "will put suitcases here"});


  };

  return (
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <IonList lines="full" class="ion-no-margin ion-no-padding">

            <IonItem>
              {/*<IonLabel>{tripName}</IonLabel>*/}
              <IonLabel position="floating">
                Suitcase Name
                <IonText color="danger">*</IonText>
              </IonLabel>
              <IonInput name="suitcaseName" required type="text" ref={register({ required: true })}>
              </IonInput>
            </IonItem>

          </IonList>

          <IonButton expand="block" type="submit" class="ion-no-margin">
            Add Suitcase
          </IonButton>
        </form>
      </div>
  );
};

export default AddSuitcaseForm;
