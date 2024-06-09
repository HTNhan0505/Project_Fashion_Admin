import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CoreService } from 'src/app/service/core.service';
import { ProductService } from 'src/app/service/product.service';
import { EventEmitterService } from 'src/app/service/event-emitter.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {

  isLoading = false
  empForm: FormGroup;
  isErrorFormat = false;

  province = '';
  district = '';
  ward = '';

  selectedProvince: any;
  selectedCity: any;
  selectedWard: any;

  provinces!: any[];
  cities!: any[];
  wards!: any[];


  constructor(
    private _fb: FormBuilder,
    private _proService: ProductService,
    private _dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService,
    public snackBar: MatSnackBar,
    public http: HttpClient,
    private EventEmitterService: EventEmitterService
  ) {
    this.empForm = this._fb.group({
      user_id: '',
      first_name: '',
      last_name: '',
      street: '',
      province: '',
      district: '',
      ward: '',
      email: '',
      phone: '',
      isActive: Boolean
    });
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
    console.log(this.data)
    if (this.data !== null) {
      this.isErrorFormat = false

      this.selectedProvince = this.data.province
      this.selectedCity = this.data.district
      this.selectedWard = this.data.ward

      this.getProvince()
      this.getDistrict()
      this.getWard()


      this.setLocaleValue()

    }
  }

  // Check format form để trả về true false
  checkFormatAdmin() {
    if (
      this.empForm.value['first_name'] == '' ||
      this.empForm.value['last_name'] == '' ||
      this.empForm.value['email'] == '' ||
      this.empForm.value['phone'] == ''
    ) {
      this.isErrorFormat = true;
    } else {
      this.isErrorFormat = false;
    }
  }


  onFormSubmit() {
    this.checkFormatAdmin()
    if (this.isErrorFormat === true) {
      this._coreService.openSnackBar('Tất cả các thông tin phải được điền đầy đủ');
    } else {
      this.isLoading = true
      this._proService
        .updateUser(this.data.user_id, this.empForm.value)
        .subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Product update successfully');
            this._dialogRef.close(true);
            this.EventEmitterService.sendClickEvent()
            this.isLoading = false
          },
          error: (err: any) => {
            this._coreService.openSnackBar('Product update error');
            this.isLoading = false

            console.error(err);
          },
        });
    }

  }

  getProvince() {
    this._proService.getProvinces().subscribe(
      (data: any) => {
        this.provinces = data.data;
      },
      (error) => { }
    );
  }
  getDistrict() {
    this._proService.getCities(parseInt(this.selectedProvince)).subscribe(
      (data: any) => {
        this.cities = data.data;
      },
      (error) => { }
    );
  }
  getWard() {
    this._proService.getWard(parseInt(this.selectedCity)).subscribe(
      (data: any) => {
        this.wards = data.data;
      },
      (error) => { }
    );
  }


  onProvinceChange() {
    this.province = this.selectedProvince;
    this.setLocaleValue()
    this.getDistrict()
  }
  onCityChange() {
    this.district = this.selectedCity;
    this.setLocaleValue()
    this.getWard()
  }

  onWardChange() {
    this.ward = this.selectedWard;
    this.setLocaleValue()
  }

  setLocaleValue() {
    this.empForm.value['province'] = this.selectedProvince
    this.empForm.value['district'] = this.selectedCity
    this.empForm.value['ward'] = this.selectedWard
  }

  onToggle(event: MatSlideToggleChange) {
    this.empForm.value['isActive'] = event.checked;
  }
}
