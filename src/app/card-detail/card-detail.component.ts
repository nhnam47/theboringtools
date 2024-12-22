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
  ],
  templateUrl: './card-detail.component.html',
  styleUrl: './card-detail.component.scss',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardDetailComponent {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CardDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      title: [data.title || '', Validators.required],
      description: [data.description || '', Validators.required],
      startDay: [data.startDay || new Date(), Validators.required],
      createdDate: [data.createdDate || new Date(), Validators.required],
      location: [data.location || '', Validators.required],
      imageUrl: [data.imageUrl || ''],
      createdBy: [data.createdBy || ''],
    });
  }

  onSave(): void {
    console.log(this.form.value);
    console.log(this.form.valid)
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
