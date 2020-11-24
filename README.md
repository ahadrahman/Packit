# Packit Ionic App - WIP
This is a work in progress app that I have been developing designed to help make packing easier,
using the Ionic React framework. This is not an official build, and has not yet been configured to run on
devices natively. 

## Setting Up
This app connects to three APIs, and needs their appropriate API keys to get started:
- Firebase (https://firebase.google.com/docs/web/setup)
- Azure Computer Vision (https://azure.microsoft.com/en-us/services/cognitive-services/computer-vision/#product-overview)
- Open Weather (https://openweathermap.org/api)

Before the app can run, you need to create a `credentials.ts` file in the `src` folder.
The following structure needs to be copied.
```
export const firebaseConfig = {
  apiKey: "YOUR FIREBASE API KEY GOES HERE",
  authDomain: "xs-data-hangout-r.firebaseapp.com",
  databaseURL: "https://xs-data-hangout-r.firebaseio.com",
  projectId: "xs-data-hangout-r",
  storageBucket: "xs-data-hangout-r.appspot.com",
  messagingSenderId: "531839097404",
  appId: "1:531839097404:web:4098b4ab6b1e0ba3fcc139"
};

export const COMPUTER_VISION_SUBSCRIPTION_KEY = "YOUR AZURE COMPUTER VISION API GOES HERE";

export const COMPUTER_VISION_ENDPOINT = "https://swen325-assignment1-app.cognitiveservices.azure.com/";

export const OPEN_WEATHER_KEY = "YOUR OPEN WEATHER API KEY GOES HERE";
```

## Launching the App
To run on your web browser, run the command `ionic serve` or `npm start`.
The app's UI changes based on the user's device (iOS or Android). To see this in action, use your browser's
developer tools to select a device to emulate.

## Screenshots
To see screenshots of my app in action, click [here]().
