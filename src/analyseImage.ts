import { COMPUTER_VISION_SUBSCRIPTION_KEY, COMPUTER_VISION_ENDPOINT} from "./credentials";
import {Photo} from "./usePhotoGallery";
import {details, visualFeatures} from "@azure/cognitiveservices-computervision/esm/models/parameters";
import {VisualFeatureTypes} from "@azure/cognitiveservices-computervision/esm/models";
// import {VisualFeatureTypes} from "@azure/cognitiveservices-computervision/esm/models";
const async = require('async');
const fs = require('fs');
const https = require('https');
const path = require("path");
const createReadStream = require('fs').createReadStream;
const sleep = require('util').promisify(setTimeout);
const ComputerVisionClient = require('@azure/cognitiveservices-computervision').ComputerVisionClient;
const ApiKeyCredentials = require('@azure/ms-rest-js').ApiKeyCredentials;

export function computerVision(photo: Photo) {
  async.series([
    async function () {
      const computerVisionClient = new ComputerVisionClient(
        new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': COMPUTER_VISION_SUBSCRIPTION_KEY } }), COMPUTER_VISION_ENDPOINT);
      if (photo.base64) {
        const describeURL = makeBlob(photo.base64); //image url goes here
        if (describeURL !== undefined) {
          // Request parameters.
          let visualFeatures: VisualFeatureTypes[] = ["Tags"];
          // Analyze URL image
          // console.log('Analyzing URL image to describe...', describeURL.split('/').pop());
          const caption = (await computerVisionClient.describeImageInStream(describeURL, visualFeatures));
          console.log("AZURE RETURN STATEMENT HERE:");
          console.log(caption);
          // console.log(`This may be ${caption.text} (${caption.confidence.toFixed(2)} confidence)`);
        }
      }

    },
    function () {
      return new Promise((resolve) => {
        resolve();
      })
    }
  ], (err: any) => {
    throw (err);
  });
}

function makeBlob(dataURL: string) {
  var BASE64_MARKER = ';base64,';
  if (dataURL.indexOf(BASE64_MARKER) == -1) {
    var parts = dataURL.split(',');
    var contentType = parts[0].split(':')[1];
    var raw = decodeURIComponent(parts[1]);
    return new Blob([raw], { type: contentType });
  }
  var parts = dataURL.split(BASE64_MARKER);
  var contentType = parts[0].split(':')[1];
  var raw = window.atob(parts[1]);
  var rawLength = raw.length;

  var uInt8Array = new Uint8Array(rawLength);

  for (var i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: contentType });
}

// computerVision();