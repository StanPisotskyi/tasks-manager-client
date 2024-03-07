import {Component, Inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef
} from "@angular/material/dialog";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {NgClass, NgForOf} from "@angular/common";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

@Component({
  selector: 'app-comment-form-modal',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    CKEditorModule,
    NgForOf,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './comment-form-modal.component.html',
  styleUrl: './comment-form-modal.component.css'
})
export class CommentFormModalComponent {
  form: FormGroup;

  validInputClass: string = 'form-control';
  invalidInputClass: string = 'form-control is-invalid';

  ckEditor = ClassicEditor;

  constructor(
    private dialogRef: MatDialogRef<CommentFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    console.log(this.data);
    this.form = this.fb.group({
      text: [this.data?.comment?.text, Validators.required]
    });
  }

  save() {

  }
}
