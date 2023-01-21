/* eslint-disable */

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "../lib/firebase";

export const useStorage = (file) => {
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);

  const upload = async () => {
    const date = new Date().getTime();

    const storageRef = ref(storage, `${file?.name + date}`);

    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then(async (downloadURL) => {
            setUrl(downloadURL);
          })
          .catch((e) => console.log(e));
      }
    );
  };

  useEffect(() => {
    if(file){
      upload();
    }else{
      return;
    }
  }, [file]);

  return { url, progress, setProgress, setUrl };
};
