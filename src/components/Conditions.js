import React from 'react';
import {IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonAvatar} from "@ionic/react";
import Forecast from "./Forecast";
const Conditions = (props) => {
  // let temp = props.responseObj.main.temp;
  // temp = temp - 273.15;

  return (
    <div>
      {props.responseObj.cod === 200 ?
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonAvatar>
                <img src={`http://openweathermap.org/img/wn/${props.responseObj.weather[0].icon}@2x.png`} />
              </IonAvatar>
            {props.responseObj.name}, {props.responseObj.sys.country}
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            It is currently {Math.round(parseFloat(props.responseObj.main.temp) - 273.15)}°C with {props.responseObj.weather[0].description}.
          </IonCardContent>
        </IonCard>
        : null
      }
    </div>
  )
}
export default Conditions;