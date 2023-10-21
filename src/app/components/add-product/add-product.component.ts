import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from 'src/app/service/core.service';
import { ProductService } from 'src/app/service/product.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  empForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _proService: ProductService,
    private _dialogRef: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService,
    public http: HttpClient
  ) {
    this.empForm = this._fb.group({
      productName: '',
      detail: '',
      price: 0,
      quantity: 0
    });
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      this._proService.addProduct(this.empForm.value).subscribe({
        next: (val: any) => {
          this._coreService.openSnackBar('Product added successfully');
          this._dialogRef.close(true);
        },

        error: (err: any) => {
          console.error(err);
        },
      });
    }
  }
}
