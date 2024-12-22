import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Firestore } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { Item } from './daily-tracking/daily-tracking.model';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private itemsCollection!: AngularFirestoreCollection<Item>;

  constructor(private firestore: Firestore, private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Item>('items');
  }

  getItems(): Observable<Item[]> {
    return this.itemsCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as Item;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  getItemsByUser(userId: string): Observable<Item[]> {
    return this.afs
      .collection<Item>('items', (ref) => ref.where('createdBy', '==', userId))
      .valueChanges({ idField: 'id' });
  }

  addItem(item: Item): Promise<void> {
    return this.itemsCollection
      .add(item)
      .then(() => {
        console.log('Item successfully added!');
      })
      .catch((error) => {
        console.error('Error adding item: ', error);
        throw error;
      });
  }
  updateItem(id: string, item: Partial<Item>): Promise<void> {
    return this.itemsCollection
      .doc(id)
      .update(item)
      .then(() => {
        console.log('Item successfully updated!');
      })
      .catch((error) => {
        console.error('Error updating item: ', error);
        throw error;
      });
  }

  deleteItem(id: string): Promise<void> {
    return this.itemsCollection
      .doc(id)
      .delete()
      .then(() => {
        console.log('Item successfully deleted!');
      })
      .catch((error) => {
        console.error('Error deleting item: ', error);
        throw error;
      });
  }
}
