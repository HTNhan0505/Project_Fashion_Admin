import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from 'src/app/service/core.service';
import { ProductService } from 'src/app/service/product.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  empForm: FormGroup;
  isErrorFormat = false;
  isGender: any;
  category: any = [
    {
      id: '1',
      name: 'Áo thun',
      detail: ''
    },
    {
      id: '2',
      name: 'Áo khoác',
      detail: ''
    },
    {
      id: '3',
      name: 'Quần ngắn',
      detail: ''
    },
    {
      id: '4',
      name: 'Quần dài',
      detail: ''
    }
  ]

  constructor(
    private _fb: FormBuilder,
    private _proService: ProductService,
    private _dialogRef: MatDialogRef<AddCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService,
    public snackBar: MatSnackBar,
    public http: HttpClient,
  ) {
    this.empForm = this._fb.group({
      name: '',
      detail: '',
      isMen: '',
    });
  }

  ngOnInit(): void {
    this.isErrorFormat = false;

    this.empForm.patchValue(this.data);
  }

  setPrice(value: any) {
    if (typeof value !== 'number') {
      let formattedNumber = value.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      this.empForm.value['price'] = formattedNumber
    }
  }

  checkFormatAdmin() {
    if (
      this.empForm.controls['productName']['value'] == '' ||
      this.empForm.controls['detail']['value'] == '' ||
      this.empForm.controls['price']['value'] == '' ||
      this.empForm.controls['quantity']['value'] == '' ||
      this.empForm.controls['isMen']['value'] == '' ||
      this.empForm.controls['categoryId']['value'] == ''
    ) {
      this.isErrorFormat = true;
    } else {
      this.isErrorFormat = false;
    }
  }
  onFormSubmit() {
    this.checkFormatAdmin();


    if (this.isErrorFormat == true) {
      this._coreService.openSnackBar('Fields can not empty');
    } else {
      this.empForm.value['price'] = +this.empForm.value['price']
      if (this.empForm.controls['isMen']['value'] == '-1') {
        delete this.empForm.value['isMen']
      }
      this._proService.addProduct(this.empForm.value).subscribe({
        next: (val: any) => {
          this._coreService.openSnackBar('Product added successfully');
          this._dialogRef.close(true);
        },

        error: (err: any) => {
          this._coreService.openSnackBar('Add product error');

          console.error(err);
        },
      });
    }
  }
}
