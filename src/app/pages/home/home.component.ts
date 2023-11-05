import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddCategoryComponent } from 'src/app/components/add-category/add-category.component';
import { AddProductComponent } from 'src/app/components/add-product/add-product.component';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _dialog: MatDialog, public product: ProductService, private route: Router) { }

  ngOnInit() {
  }
  openAddEditEmpForm(Component: string) {
    if (!this.product.getToken()) {
      this.route.navigateByUrl('/login')
    } else {
      switch (Component) {
        case 'product':
          this._dialog.open(AddProductComponent);
          break
        case 'category':
          this._dialog.open(AddCategoryComponent);
          break
        default:
          break

      }
    }


    // dialogRef.afterClosed().subscribe({
    //   next: (val) => {
    //     if (val) {
    //       this.getEmployeeList();
    //     }
    //   },
    // });
  }

  // Log out
  logOutAccount() {
    this.route.navigateByUrl('/login')
    localStorage.removeItem("token");
    localStorage.removeItem("refeshToken");
  }

}
