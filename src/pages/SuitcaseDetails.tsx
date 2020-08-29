import React, {useContext, useState} from "react";
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
  IonToolbar,
  IonRow,
  IonGrid,
  IonCol, IonItemDivider, IonLabel, IonActionSheet
} from "@ionic/react";
import {RouteComponentProps} from "react-router";
import {TripsContext} from "../TripsState";
import {SuitcasesContextProvider} from "../SuitcasesState";
import Trip from "../classes/Trip";
import Suitcase from "../classes/Suitcase";
import './SuitcaseDetails.css';
import {add, camera, image, trash, close} from "ionicons/icons";
import {CameraResultType, CameraSource, CameraPhoto, Plugins, Camera} from "@capacitor/core";
import { useCamera } from '@ionic/react-hooks/camera';
import firebase from "firebase";
import {Photo, usePhotoGallery} from "../usePhotoGallery";
import {computerVision} from "../analyseImage";

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


    // if (image instanceof Camera) {
    //   console.log(image.base64String);
    // }
    // let captureDataUrl = 'data:image/jpeg;base64,' + image.base64String;

  const { deletePhoto, photos, takePhoto } = usePhotoGallery(currentTrip.tripName, currentSuitcase.suitcaseName);
  const [photoSelected, setPhotoToDelete] = useState<Photo>();

  return (
    <SuitcasesContextProvider tripID={currentTrip.id}>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref={`/trips/${currentTrip.tripName}`}/>
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

          <IonItemDivider>
            <IonLabel>Items</IonLabel>
          </IonItemDivider>

          <IonGrid>
            <IonRow>
              {photos.map((photo, index) => (
                <IonCol size="6" key={index}>
                  <IonImg onClick={() => setPhotoToDelete(photo)} src={photo.base64 ?? photo.webviewPath} />
                  <div className="myOverlay">
                    <div className="card-title">{photo.description}</div>
                  </div>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>

          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton>
              <IonIcon icon={add} />
            </IonFabButton>
            <IonFabList side="top">
              <IonFabButton onClick={t => takePhoto()}>
                <IonIcon icon={camera} />
              </IonFabButton>
              <IonFabButton>
                <IonIcon icon={image} />
              </IonFabButton>
            </IonFabList>
          </IonFab>

          <IonActionSheet
            isOpen={!!photoSelected}
            buttons={[{
              text: 'Delete',
              role: 'destructive',
              icon: trash,
              handler: () => {
                if (photoSelected) {
                  deletePhoto(photoSelected);
                  setPhotoToDelete(undefined);
                }
              }
            }, {
              text: 'Cancel',
              icon: close,
              role: 'cancel'
            }, {
              text: 'Computer Vision',
              role: 'destructive',
              handler: () => {
                if (photoSelected) {
                  computerVision(photoSelected);
                }
              }
            }]}
            onDidDismiss={() => setPhotoToDelete(undefined)}
          />

        </IonContent>
      </IonPage>
    </SuitcasesContextProvider>
  );
};

export default SuitcaseDetails;