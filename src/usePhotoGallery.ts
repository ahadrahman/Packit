import { useState, useEffect } from "react";
import { useCamera } from '@ionic/react-hooks/camera';
import { useFilesystem, base64FromPath } from '@ionic/react-hooks/filesystem';
import { useStorage } from '@ionic/react-hooks/storage';
import { isPlatform } from '@ionic/react';
import { CameraResultType, CameraSource, CameraPhoto, Capacitor, FilesystemDirectory } from "@capacitor/core";
import {computerVision} from "./analyseImage";

const PHOTO_STORAGE = "photos";

export function usePhotoGallery(tripName: string, suitcaseName: string) {

  let identifier:string = tripName + "_" + suitcaseName;

  const { getPhoto } = useCamera();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const { deleteFile, getUri, readFile, writeFile } = useFilesystem();
  const { get, set } = useStorage();

  useEffect(() => {
    const loadSaved = async () => {

      // set(PHOTO_STORAGE, "");

      const photosString = await get(PHOTO_STORAGE);
      const photos = (photosString ? JSON.parse(photosString) : []) as Photo[];
      let toReturnPhotos: Photo[] = [];
      if (photos.length) {
        for (let photo of photos) {
          if (photo.filepath.includes(identifier) && !(identifier.includes("Loading..."))) {
            const file = await readFile({
              path: photo.filepath,
              directory: FilesystemDirectory.Data
            });
            photo.base64 = `data:image/jpeg;base64,${file.data}`;
            toReturnPhotos.push(photo);
          } else {
            // deletePhoto(photo);
          }

        }
      }
      setPhotos(toReturnPhotos);
    };
    loadSaved();
  }, [get, readFile, identifier]);

  const takePhoto = async (): Promise<Photo> => {
    const cameraPhoto = await getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });
    const fileName = new Date().getTime() + "-" + identifier + '.jpeg';
    const savedFileImage = await savePicture(cameraPhoto, fileName);
    const newPhotos = [savedFileImage, ...photos];
    setPhotos(newPhotos);
    set(PHOTO_STORAGE, JSON.stringify(newPhotos.map(p => {
      // Don't save the base64 representation of the photo data,
      // since it's already saved on the Filesystem
      const photoCopy = { ...p };
      delete photoCopy.base64;
      return photoCopy;
    })));
    // eslint-disable-next-line no-restricted-globals
    // location.reload();
    return savedFileImage;
  };

  const savePicture = async (photo: CameraPhoto, fileName: string): Promise<Photo> => {
    const base64Data = await base64FromPath(photo.webPath!);
    const savedFile = await writeFile({
      path: fileName,
      data: base64Data,
      directory: FilesystemDirectory.Data
    });

    // Get Computer Vision terms here

    // Use webPath to display the new image instead of base64 since it's
    // already loaded into memory
    return {
      filepath: fileName,
      webviewPath: photo.webPath,
      identifier: identifier,
      description: "unnamed", //Set Computer Vision term here
    };
  };


  const deletePhoto = async (photo: Photo) => {
    // Remove this photo from the Photos reference data array
    const newPhotos = photos.filter(p => p.filepath !== photo.filepath);

    // Update photos array cache by overwriting the existing photo array
    set(PHOTO_STORAGE, JSON.stringify(newPhotos));

    // delete photo file from filesystem
    const filename = photo.filepath.substr(photo.filepath.lastIndexOf('/') + 1);
    await deleteFile({
      path: filename,
      directory: FilesystemDirectory.Data
    });
    setPhotos(newPhotos);
  };

  return {
    deletePhoto,
    photos,
    takePhoto
  };
}


export interface Photo {
  filepath: string;
  webviewPath?: string;
  base64?: string;
  identifier: string;
  description?: string;
}