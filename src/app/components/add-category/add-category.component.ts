import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from 'src/app/service/core.service';
import { ProductService } from 'src/app/service/product.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventEmitterService } from 'src/app/service/event-emitter.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent implements OnInit {
  empForm: FormGroup;
  isErrorFormat = false;
  isGender: any;
  isLoading = false

  constructor(
    private _fb: FormBuilder,
    private _proService: ProductService,
    private _dialogRef: MatDialogRef<AddCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService,
    public snackBar: MatSnackBar,
    public http: HttpClient,
    private EventEmitterService: EventEmitterService
  ) {
    this.empForm = this._fb.group({
      name: '',
      detail: '',
      gender: '',
      _id: ''
    });
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }
  checkFormatAdmin() {
    if (
      this.empForm.value['name'] === '' ||
      this.empForm.value['detail'] === '' ||
      this.empForm.value['gender'] === ''
    ) {
      this.isErrorFormat = true;
    } else {
      this.isErrorFormat = false;
    }
  }
  onFormSubmit() {
    this.checkFormatAdmin();
    if (this.data) {
      if (this.empForm.invalid) {
        this._coreService.openSnackBar('Fields can not empty');
      } else {
        this._proService
          .updateCategory(this.data.categoryId, this.empForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Category update successfully');
              this._dialogRef.close(true);
              this.isLoading = false
            },
            error: (err: any) => {
              this._coreService.openSnackBar('Update Category error');

              console.error(err);
            },
          });

      }
    } else {
      this._proService.addCategory(this.empForm.value).subscribe({
        next: (val: any) => {
          this._coreService.openSnackBar('Category added successfully');
          this.EventEmitterService.sendClickEvent()
          this._dialogRef.close(true);
        },

        error: (err: any) => {
          this._coreService.openSnackBar('Add Category error');

          console.error(err);
        },
      });

    }

  }
}
