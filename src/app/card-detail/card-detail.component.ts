import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatNativeDateModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-card-detail',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    CommonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './card-detail.component.html',
  styleUrl: './card-detail.component.scss',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardDetailComponent {
  form: FormGroup;
  resizedImage: string | null = null;
  selectedFile: File | null = null;
  isLoading = false;

  constructor(
    public dialogRef: MatDialogRef<CardDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      title: [data.title || '', Validators.required],
      description: [data.description || ''],
      startDay: [data.startDay || new Date(), Validators.required],
      createdDate: [data.createdDate || new Date(), Validators.required],
      location: [data.location || ''],
      imageUrl: [data.imageUrl || ''],
      createdBy: [data.createdBy || ''],
    });
    if (data.imageUrl) {
      this.resizedImage = data.imageUrl;
    }
  }

  onSave(): void {
    console.log(this.form.value);
    console.log(this.form.valid);
    if (this.form.valid) {
      const formData = this.form.value;
      if (this.resizedImage) {
        formData.imageUrl = this.resizedImage;
      }
      this.dialogRef.close(this.form.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onFileSelected(event: Event): void {
    console.log('File selected');
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.isLoading = true;
      this.selectedFile = input.files[0];
      console.log(this.selectedFile);
      this.resizeImage(this.selectedFile);
    }
  }

  resizeImage(file: File): void {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const maxWidth = 800;
        const maxHeight = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }
        canvas.width = width;
        canvas.height = height;
        ctx?.drawImage(img, 0, 0, width, height);
        this.resizedImage = canvas.toDataURL('image/jpeg');
        this.isLoading = false;
        console.log(this.resizedImage);
      };
    };
    reader.readAsDataURL(file);
  }
}
