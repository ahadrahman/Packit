import React from 'react';
import {
  IonAvatar,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon, IonItem, IonItemDivider,
  IonItemGroup, IonLabel,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Suitcases.css';
import {add} from "ionicons/icons";
import blue from '../img/suitcases/blue.png'; // Tell webpack this JS file uses this image

const Suitcases: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Your Suitcases</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItemGroup>
          <IonItemDivider>
            <IonLabel>Australia Trip</IonLabel>
          </IonItemDivider>

          <IonItem href="">
            <IonAvatar slot="start">
              <img src={blue}/>
            </IonAvatar>
            <IonLabel>Clothing bag</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Gifts bag</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Toiletries</IonLabel>
          </IonItem>

        </IonItemGroup>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton href="/addtrip">
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>

      </IonContent>
    </IonPage>
  );
};

export default Suitcases;
