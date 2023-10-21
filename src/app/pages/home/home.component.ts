import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from 'src/app/components/add-product/add-product.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _dialog: MatDialog,) { }

  ngOnInit() {
  }
  openAddEditEmpForm() {
    this._dialog.open(AddProductComponent);
    // dialogRef.afterClosed().subscribe({
    //   next: (val) => {
    //     if (val) {
    //       this.getEmployeeList();
    //     }
    //   },
    // });
  }

}
