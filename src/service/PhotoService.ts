import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../database";

export default {
  async savePicture(userID:string , picData: { uri: RequestInfo; }) {
    // get the image data from local storage
    const response = await fetch(picData.uri);
    const imageBlob = await response.blob();

    // upload the image data to Storage after creating a unique filename/ID
    const timeStamp = new Date();
    const timeString = timeStamp.toISOString();
    const fileName = `${userID  }_${  timeString  }.jpg`;
    const fileRef = ref(storage, `images/${  fileName}`);
    await uploadBytes(fileRef, imageBlob);

    // get the downloadURL for the fileRef we just saved
    const downloadURL = await getDownloadURL(fileRef);
    console.log(downloadURL);
    return downloadURL
  }
};
