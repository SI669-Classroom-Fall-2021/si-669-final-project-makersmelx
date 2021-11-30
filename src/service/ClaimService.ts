import { collection, doc, writeBatch } from 'firebase/firestore';
import database, { collectionName } from '../database';
import WishService from './WishService';

interface IClaim {
  wishRef: any;
  state: ClaimState;
  claimedAt: any;
  completedAt: any;
}

enum ClaimState {
  Default = 0,
  Completed = 1,
}

const subCollectionOfUser = 'claim';

export default {
  async claimWish(userID: string, friendID: string, wishID: string) {
    const wishRef = WishService.getWishRef(friendID, wishID);
    const batch = writeBatch(database);
    batch.update(wishRef, { state: 1, claimed: userID });
    batch.set(doc(collection(database, collectionName, userID, subCollectionOfUser)), {
      wishRef,
      claimedAt: new Date(),
      state: ClaimState.Default,
    } as IClaim);
    await batch.commit();
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
    batch.update(wishRef, { state: WishService.WishState.Completed });
    batch.update(claimRef, { state: ClaimState.Completed, completedAt: new Date() });
    await batch.commit();
  },
};
