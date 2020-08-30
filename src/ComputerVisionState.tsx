import React, { createContext, useState, useEffect } from 'react';
import {Photo} from "./usePhotoGallery";
import {computerVision} from "./analyseImage";

export interface Tags {
  tags : string[]
}

let TagsContext = createContext({} as Tags);

function TagsContextProvider(props: { children: React.ReactNode; photo: Photo}) {
  let currentPhoto = props.photo;
  const [tags, setTags] = useState([] as string[]);

  useEffect(() => {
    setTags(computerVision(currentPhoto));
  }, []); // Nifty trick with useEffect from: https://css-tricks.com/run-useeffect-only-once/

  return (
    <TagsContext.Provider value={{tags : tags}}>{props.children}</TagsContext.Provider>
  )
}

let TagsContextConsumer = TagsContext.Consumer;

export { TagsContext, TagsContextProvider, TagsContextConsumer };