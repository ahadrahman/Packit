import { useForm, Controller } from "react-hook-form";
import React, {useContext, useState} from 'react';
import {
  IonList,
  IonItem,
  IonLabel,
  IonText,
  IonInput,
  IonDatetime,
  IonButton,
  IonSelectOption,
  IonSelect,
  IonRadioGroup,
  IonListHeader,
  IonRadio, IonAvatar
} from '@ionic/react';
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
    let suitcase: Suitcase = new Suitcase(data.suitcaseName, data.suitcaseColour);
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
      colour: suitcase.colour,
    }).key;
    if (suitcaseID != null) {
      dbRef.child(suitcaseID).update({'id': suitcaseID});
      // suitcase.setID(suitcaseID);
      // currentTrip.suitcases.push(suitcase);
    }
    dbRef.child("/0").remove();
    // tripsRef.child(currentTrip.id).update({'suitcases': "will put suitcases here"});



  };

  return (
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <IonList lines="full" class="ion-no-margin ion-no-padding">

            <IonItem>
              <IonLabel position="floating">
                Suitcase Name
                <IonText color="danger">*</IonText>
              </IonLabel>
              <IonInput name="suitcaseName" required type="text" ref={register({ required: true })}>
              </IonInput>
            </IonItem>

            <IonRadioGroup value="blue" name="suitcaseColour" ref={register({ required: true })}>
              <IonListHeader>
                <IonLabel>Suitcase Colour</IonLabel>
              </IonListHeader>

              <IonItem>
                <IonAvatar slot="start">
                  <img src="../assets/suitcases/blue.png"/>
                </IonAvatar>
                <IonRadio slot="start" value="blue" />
              </IonItem>

              <IonItem>
                <IonAvatar slot="start">
                  <img src="../assets/suitcases/green.png"/>
                </IonAvatar>
                <IonRadio slot="start" value="green" />
              </IonItem>

              <IonItem>
                <IonAvatar slot="start">
                  <img src="../assets/suitcases/red.png"/>
                </IonAvatar>
                <IonRadio slot="start" value="red" />
              </IonItem>

              <IonItem>
                <IonAvatar slot="start">
                  <img src="../assets/suitcases/yellow.png"/>
                </IonAvatar>
                <IonRadio slot="start" value="yellow" />
              </IonItem>
            </IonRadioGroup>

          </IonList>

          <IonButton expand="block" type="submit" class="ion-no-margin">
            Add Suitcase
          </IonButton>
        </form>
      </div>
  );
};

export default AddSuitcaseForm;
