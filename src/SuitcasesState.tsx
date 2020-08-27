import React, { createContext, useState, useEffect } from 'react';
import firebase from "firebase";
import Suitcase from "./classes/Suitcase";

export interface Suitcases {
  suitcases : Suitcase[]
}

let SuitcasesContext = createContext({} as Suitcases);

function SuitcasesContextProvider(props: { children: React.ReactNode; tripID: string}) {

  let tripID = props.tripID;
  console.log(tripID);
  const [suitcases, setSuitcases] = useState([] as Suitcase[]);

  let dbRef = firebase.database().ref('/trips/' + tripID + '/suitcases');

  console.log(dbRef);

  useEffect(() => {
    dbRef.on('value', snapshot => {
      let data = snapshot.val();
      if (data != null) {
        setSuitcases(Object.values(data));
        console.log(Object.values(data));
      }
    });
  }, [tripID]); // Nifty trick with useEffect from: https://css-tricks.com/run-useeffect-only-once/

  return (
    <SuitcasesContext.Provider value={{suitcases : suitcases}}>{props.children}</SuitcasesContext.Provider>
  )
}

let SuitcasesContextConsumer = SuitcasesContext.Consumer;

export { SuitcasesContext, SuitcasesContextProvider, SuitcasesContextConsumer };