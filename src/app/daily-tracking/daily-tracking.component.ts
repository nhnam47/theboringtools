import { Component } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent } from '../card/card.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { CardDetailComponent } from '../card-detail/card-detail.component';
import { Item } from './daily-tracking.model';
import { MatIconModule } from '@angular/material/icon';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import moment from 'moment';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-daily-tracking',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, MatIconModule],
  templateUrl: './daily-tracking.component.html',
  styleUrl: './daily-tracking.component.scss',
})
export class DailyTrackingComponent {
  items$: Observable<Item[]> | undefined;
  newItem: Item = {
    title: '',
    description: '',
    startDay: Timestamp.fromDate(new Date()),
    createdDate: Timestamp.fromDate(new Date()),
    location: '',
    imageUrl: '',
    createdBy: '',
  };
  userId: string | null = null;

  constructor(
    private firestoreService: FirestoreService,
    public dialog: MatDialog,
    private auth: Auth
  ) {}

  ngOnInit(): void {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.userId = user.uid;
        console.log(this.userId);
        this.loadItems();
      }
    });

    // this.items$ = this.firestoreService.getItems();
  }

  loadItems(): void {
    if (this.userId) {
      this.items$ = this.firestoreService.getItemsByUser(this.userId);
    }
  }

  addItem(): void {
    const dialogRef = this.dialog.open(CardDetailComponent, {
      width: '400px',
      data: {
        title: '',
        description: '',
        startDay: new Date(),
        createdDate: new Date(),
        location: '',
        imageUrl: '',
        createdBy: this.userId,
      },
    });
    console.log('Adding item', this.userId);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      if (result) {
        const newItem: Item = {
          ...result,
          startDay: moment(result.startDay).valueOf(), // Convert to timestamp
          createdDate: moment(result.createdDate).valueOf(), // Convert to timestamp
        };
        this.firestoreService.addItem(result).then(() => {
          console.log('Item added');
        });
      }
    });
  }
  updateItem(item: Item, result: any): void {
    if (item.id) {
      this.firestoreService
        .updateItem(item.id, {
          title: item.title,
          description: item.description,
          startDay: item.startDay, // Convert to Date object
          createdDate: item.createdDate, // Convert to timestamp
          imageUrl: item.imageUrl,
        })
        .then(() => {
          console.log('Item updated');
        });
    }
  }

  deleteItem(id: string): void {
    console.log('Deleting item', id);
    this.firestoreService.deleteItem(id).then(() => {
      console.log('Item deleted');
    });
  }

  openCardDetail(item: any) {
    const dialogRef = this.dialog.open(CardDetailComponent, {
      width: '400px',
      data: {
        ...item,
        startDay: item.startDay.toDate(),
        createdDate: item.createdDate.toDate(),
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateItem(item.id, result);
      }
    });
  }

  confirmDelete(item: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      if (result) {
        this.deleteItem(item.id);
      }
    });
  }
}
