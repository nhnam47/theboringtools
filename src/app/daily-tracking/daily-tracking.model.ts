import { Timestamp } from 'firebase/firestore';

export interface Item {
  id?: string;
  title: string;
  description: string;
  startDay: Timestamp;
  createdDate?: Timestamp;
  location: string;
  imageUrl?: string;
  createdBy?: string;
}
