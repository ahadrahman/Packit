import React from "react";
import {IonHeader, IonToolbar, IonTitle, IonContent} from "@ionic/react";
import {Photo} from "../usePhotoGallery";


const MyModal: React.FC<{photo:Photo}> = ({photo}) => {
  let currentPhoto = photo;
    return (
      <div>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>{currentPhoto.description}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <p>This is the modal content.</p>
      </IonContent>
      </div>
  )
};

export default MyModal;