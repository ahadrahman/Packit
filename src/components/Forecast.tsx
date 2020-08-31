import React, { useState } from 'react';
import {OPEN_WEATHER_KEY} from "../credentials";
import Conditions from "./Conditions.js";
import {IonCard, IonCardHeader, IonCardTitle} from "@ionic/react";

const weatherKey = OPEN_WEATHER_KEY;

const Forecast: React.FC<{cityName: string}> = ({cityName}) => {
  let city = cityName;
  let [responseObj, setResponseObj] = useState({});
  if (city !== "Loading...") {

    fetch('https://api.openweathermap.org/data/2.5/weather?units=celsius&q=' + city + '&appid=' + weatherKey)
      .then(response => response.json())
      .then(response => {
        setResponseObj(response)
      })
      .catch(err => {
        console.log(err);
      });

    return (
      <div>
        <Conditions responseObj={responseObj}/>
      </div>
    );
  } else {
    return (
      <div>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Loading...</IonCardTitle>
          </IonCardHeader>
        </IonCard>
      </div>
    )
  }
};

export default Forecast;