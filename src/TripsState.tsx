import React, { createContext, useState, useEffect } from 'react';
import Trip from "./classes/Trip";
import firebase from "firebase";

export interface Trips {
  trips : Trip[];
}

let TripsContext = createContext({} as Trips);

function TripsContextProvider(props: { children: React.ReactNode; }) {

  const [trips, setTrips] = useState([] as Trip[]);

  let tripsRef = firebase.database().ref('/trips');

  useEffect(() => {
    tripsRef.on('value', snapshot => {
      let data = snapshot.val();
      if (data != null) {
        setTrips(Object.values(data));
      }
    });
  }, []); // Nifty trick with useEffect from: https://css-tricks.com/run-useeffect-only-once/

  return (
    <TripsContext.Provider value={{trips : trips}}>{props.children}</TripsContext.Provider>
  )
}

let TripsContextConsumer = TripsContext.Consumer;

export { TripsContext, TripsContextProvider, TripsContextConsumer };