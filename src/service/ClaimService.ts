import { collection, doc, getDoc, onSnapshot, writeBatch } from 'firebase/firestore';
import database, { collectionName } from '../database';
import WishService from './WishService';

export interface IClaim {
  wishID: string;
  wisher: string;
  state: ClaimState;
  claimedAt: any;
  completedAt: any;
  image: string;
  name: string;
  price: number;
  claimID: string; // 目前这个和wishID完全一致！！！！！
}

enum ClaimState {
  Default = 0,
  Completed = 1,
}

const subCollectionOfUser = 'claim';

export default {
  async claimWish(userID: string, friendID: string, wishID: string) {
    // todo: validate user and friend are friends
    const wishRef = WishService.getWishRef(friendID, wishID);
    const wishSnap = await getDoc(wishRef);
    const wishInfo = wishSnap.data();
    const wisherRef = doc(database, collectionName, friendID);
    const wisherSnap = await getDoc(wisherRef);
    const wisherInfo = wisherSnap.data();
    const batch = writeBatch(database);
    if(wishInfo && wisherInfo){
      batch.update(wishRef, { state: 1, claimed: userID });
      batch.set(doc(collection(database, collectionName, userID, subCollectionOfUser, wishInfo.key)), {
      wishID: wishInfo.key,
      wisher: wisherInfo.ID,
      claimedAt: new Date(),
      state: ClaimState.Default,
      image: wishInfo.image,
      name: wishInfo.name,
      price: wishInfo.price,
      claimID: wishInfo.key
      } as IClaim);
      await batch.commit();
    }else{
      console.error("Failed to claim wish")
    }
    
  },
  /**
   *
   * @param userID
   * @param friendID
   * @param wishID: should be fetched already when displaying the claim so that there is no need to get the ref from the claim doc again here
   * @param claimID
   */
  async declaimWish(userID: string, friendID: string, wishID: string, claimID: string) {
    const claimRef = doc(database, collectionName, userID, subCollectionOfUser, claimID);
    const wishRef = WishService.getWishRef(friendID, wishID);
    const batch = writeBatch(database);
    batch.update(wishRef, { state: WishService.WishState.Default, claimed: '' });
    batch.delete(claimRef);
    await batch.commit();
  },
  async completeClaim(userID: string, friendID: string, wishID: string, claimID: string) {
    // todo: check the claim is claimed by the user
    const claimRef = doc(database, collectionName, userID, subCollectionOfUser, claimID);
    const wishRef = WishService.getWishRef(friendID, wishID);
    const batch = writeBatch(database);
    batch.update(wishRef, { state: WishService.WishState.Completed, completedAt: new Date() });
    batch.update(claimRef, { state: ClaimState.Completed, completedAt: new Date() });
    await batch.commit();
  },
  /**
   * Subscribe the collection of a user's wishes
   * @param userID
   * @param onNext
   */
  onSnapshotUserClaim(userID: string, onNext: any) {
    return onSnapshot(collection(database, collectionName, userID, subCollectionOfUser), onNext);
  },
  subCollectionOfUser,
  ClaimState
};
