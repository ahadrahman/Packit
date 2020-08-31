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
  IonCol, IonItemDivider, IonLabel, IonActionSheet, IonModal, IonButton,
} from "@ionic/react";
import {RouteComponentProps} from "react-router";
import {TripsContext} from "../TripsState";
import {SuitcasesContextProvider} from "../SuitcasesState";
import Trip from "../classes/Trip";
import Suitcase from "../classes/Suitcase";
import './SuitcaseDetails.css';
import {add, camera, trash, close, pencilOutline} from "ionicons/icons";
import firebase from "firebase";
import {Photo, usePhotoGallery} from "../usePhotoGallery";
import MyModal from "../components/EditImageTextModal";

interface SuitcaseDetailsProps extends RouteComponentProps<{
  id: string;
  suitcaseID: string;
}> {}


const SuitcaseDetails: React.FC<SuitcaseDetailsProps> = ({match}) => {
  let tripName: string = match.params.id;
  let suitcaseName: string = match.params.suitcaseID;

  const { trips } = useContext(TripsContext);
  let currentTrip: Trip = new Trip("Loading...", new Date(1975, 7, 26), new Date(1975, 8, 26), "Wellington");
  trips.forEach((t: Trip) => {
    if (t.tripName === tripName) {
      currentTrip = t;
    }
  });

  let suitcases = currentTrip.suitcases;
  let currentSuitcase: Suitcase = new Suitcase("Loading...", "default");

  for (let x of Object.entries(suitcases)) {
    if (x[1].suitcaseName === suitcaseName) {
      currentSuitcase = new Suitcase(x[1].suitcaseName, x[1].colour);
      currentSuitcase.setID(x[1].id);
    }
  }

  const { deletePhoto, photos, takePhoto } = usePhotoGallery(currentTrip.tripName, currentSuitcase.suitcaseName);
  const [photoSelected, setPhotoSelected] = useState<Photo>();
  const [showModal, setShowModal] = useState(false);

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

          {photoSelected ? (
            <IonModal isOpen={showModal} cssClass='my-custom-class' onDidDismiss={() => setPhotoSelected(undefined)}>
              <MyModal photo={photoSelected}/>
                <IonButton onClick={() => setShowModal(false)} >Close</IonButton>
            </IonModal>
          ) : (<div></div>)
          }

          <IonCard>
                <IonImg src={`../assets/suitcases/${currentSuitcase.colour}.png`} className="suitcaseDetails"/>
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
                  <IonImg onClick={() => setPhotoSelected(photo)} src={photo.base64 ?? photo.webviewPath} />
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
              <IonFabButton color="secondary" onClick={() => takePhoto()}>

              <IonIcon icon={camera} />
              </IonFabButton>
            </IonFabList>
          </IonFab>


          <IonFab vertical="bottom" horizontal="start" slot="fixed" >
            <IonFabButton href={`/trips/${currentTrip.tripName}`} onClick={() => deleteSuitcase(currentTrip, currentSuitcase)} color="danger">
              <IonIcon icon={trash} />
            </IonFabButton>
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
                  setPhotoSelected(undefined);
                }
              }
            }, {
              text: 'Cancel',
              icon: close,
              role: 'cancel',
              handler: () => {
                if (photoSelected) {
                  setPhotoSelected(undefined);
                }
              }
            },
              {
              text: 'Edit Text',
              icon: pencilOutline,
              role: 'destructive',
              handler: () => {
                if (photoSelected) {
                  setShowModal(true)
                }
              }
            }

            ]}
            // onDidDismiss={() => setPhotoSelected(undefined)}
          />

        </IonContent>
      </IonPage>
    </SuitcasesContextProvider>
  );
};

function deleteSuitcase(t: Trip, s: Suitcase) {
  console.log(s.id);
  let dbRef = firebase.database().ref('/trips/' + t.id + '/suitcases/' + s.id);
  dbRef.remove();
}

export default SuitcaseDetails;