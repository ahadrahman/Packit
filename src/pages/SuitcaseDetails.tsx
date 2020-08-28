import React, {useContext} from "react";
import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonHeader,
  IonIcon,
  IonImg,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import {RouteComponentProps} from "react-router";
import {TripsContext} from "../TripsState";
import {SuitcasesContextProvider} from "../SuitcasesState";
import Trip from "../classes/Trip";
import Suitcase from "../classes/Suitcase";
import './SuitcaseDetails.css';
import {add, camera, image} from "ionicons/icons";
import {CameraResultType, CameraSource, CameraPhoto, Plugins, Camera} from "@capacitor/core";
import { useCamera } from '@ionic/react-hooks/camera';

interface SuitcaseDetailsProps extends RouteComponentProps<{
  id: string;
  suitcaseID: string;
}> {}


const SuitcaseDetails: React.FC<SuitcaseDetailsProps> = ({match}) => {
  let tripName: string = match.params.id;
  let suitcaseName: string = match.params.suitcaseID;

  const { trips } = useContext(TripsContext);
  let currentTrip: Trip = new Trip("Loading...", new Date(1975, 7, 26), new Date(1975, 8, 26));
  trips.forEach((t: Trip) => {
    if (t.tripName === tripName) {
      currentTrip = t;
    }
  });

  // const suitcases = SuitcasesContextProvider({null; currentTrip.id}); //Somehow pass a tripID here to get the suitcases

  //
  // console.log(currentTrip);
  //



  let suitcases = currentTrip.suitcases;
  let currentSuitcase: Suitcase = new Suitcase("Loading...", "green");

  for (let x of Object.entries(suitcases)) {
    if (x[1].suitcaseName === suitcaseName) {
      currentSuitcase = new Suitcase(x[1].suitcaseName, x[1].colour);
    }
  }
  // let itemhref = "trips/" + currentTrip.tripName + "/" + currentSuitcase.suitcaseName + "/additem";

  const { getPhoto } = useCamera();

  const takePhoto = async () => {
    const image = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });
    console.log(image);
  };

  return (
    <SuitcasesContextProvider tripID={currentTrip.id}>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/trips"/>
            </IonButtons>
            <IonTitle>
              Inside {suitcaseName} Suitcase
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonCard>
            {/*  <IonAvatar slot="start">*/}
                <IonImg src={`../assets/suitcases/${currentSuitcase.colour}.png`} className="suitcaseDetails"/>
              {/*</IonAvatar>*/}
              <IonCardHeader>
                <IonCardTitle>
                  {currentSuitcase.suitcaseName}
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                This suitcase is part of your {currentTrip.tripName} trip.
              </IonCardContent>
          </IonCard>

          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton>
              <IonIcon icon={add} />
            </IonFabButton>
            <IonFabList side="top">
              <IonFabButton onClick={() => takePhoto()}>
                <IonIcon icon={camera} />
              </IonFabButton>
              <IonFabButton>
                <IonIcon icon={image} />
              </IonFabButton>
            </IonFabList>
          </IonFab>

        </IonContent>
      </IonPage>
    </SuitcasesContextProvider>
  );
};

export default SuitcaseDetails;