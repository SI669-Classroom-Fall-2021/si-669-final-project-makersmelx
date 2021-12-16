import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { encode } from 'base-64';
import { storage } from '../database';

export default {
  async savePicture(userID: string, picData: { uri: RequestInfo }) {
    // get the image data from local storage
    const response = await fetch(picData.uri);
    const imageBlob = await response.blob();

    // upload the image data to Storage after creating a unique filename/ID
    const timeStamp = new Date().toISOString();
    const fileName = `${encode(`${userID}_${timeStamp}`)}.jpg`;
    const fileRef = ref(storage, `images/${fileName}`);
    await uploadBytes(fileRef, imageBlob);

    // get the downloadURL for the fileRef we just saved
    return getDownloadURL(fileRef);
  },
};
