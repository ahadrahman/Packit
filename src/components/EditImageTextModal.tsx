import React, {useState} from "react";
import {
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonText,
  IonInput,
  IonRadioGroup, IonListHeader, IonAvatar, IonRadio, IonButton, IonImg
} from "@ionic/react";
import {Photo} from "../usePhotoGallery";
import { useForm} from "react-hook-form";
import {Tags, TagsContextConsumer, TagsContextProvider} from "../ComputerVisionState";
import './EditImageTextModal.css';


const MyModal: React.FC<{photo:Photo}> = ({photo}) => {
  let currentPhoto = photo;

  const { control, register, handleSubmit, errors, formState } = useForm();
  const [selected, setSelected] = useState<string>('custom-text');

  const onSubmit = (data: any) => {
    console.log(data);
    if (data.optionSelected === "custom-text") {
      currentPhoto.description = data.itemName;
      console.log(currentPhoto);
    } else {
      currentPhoto.description = data.optionSelected;
    }
  };

  return (
    <IonContent>
    <TagsContextProvider photo={currentPhoto}>
      <div>
        <IonToolbar color="primary">
          <IonTitle>Name Item</IonTitle>
        </IonToolbar>
        <form onSubmit={handleSubmit(onSubmit)}>
          <IonList lines="full" class="ion-no-margin ion-no-padding">

            <img src={currentPhoto.base64 ?? currentPhoto.webviewPath} className="item-picture"/>

            <IonItem>
              <IonLabel position="floating">
                Custom Item Name
                <IonText color="danger">*</IonText>
              </IonLabel>
              <IonInput name="itemName" required type="text" disabled={selected !== "custom-text"} ref={register({ required: false })} value={photo.description}>
              </IonInput>
            </IonItem>


            <IonRadioGroup value={selected} name="optionSelected" onIonChange={e => setSelected(e.detail.value)} ref={register({ required: true })}>
              <IonListHeader>
                <IonLabel>Computer Vision Suggestions</IonLabel>
              </IonListHeader>

              <IonItem>
                <IonRadio slot="start" value="custom-text" />
                Custom Text
              </IonItem>
              <TagsContextConsumer>
                { (context : Tags) =>
					        <IonList>
                    {(context.tags.length) ? context.tags.map((s: string) =>
                      <IonItem>
                        <IonRadio slot="start" value={s}/>
                        {s}
                      </IonItem>
                    ) : (
                      <IonItem>
                        No Tags Found
                      </IonItem>
                    )
                    }
                      </IonList>
                    }
                  </TagsContextConsumer>
            </IonRadioGroup>


          </IonList>

          <IonButton expand="block" type="submit" class="ion-no-margin">
            Rename Item
          </IonButton>
        </form>
      </div>
    </TagsContextProvider>
      </IonContent>
  )
};

export default MyModal;