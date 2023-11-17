import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AddCategoryComponent } from 'src/app/components/add-category/add-category.component';
import { AddProductComponent } from 'src/app/components/add-product/add-product.component';
import { CoreService } from 'src/app/service/core.service';
import { ProductService } from 'src/app/service/product.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = [
    'Product_ID',
    'listImage',
    'productName',
    'detail',
    'price',
    'quantity',
    'categoryName',
    'action'
  ];
  displayedColumns2: string[] = [
    'categoryId',
    'name',
    'detail',
    'isMen',
    'action'
  ];
  nameRender: any
  dataSource!: MatTableDataSource<any>;
  dataSource2!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    public product: ProductService,
    private route: Router,
    private _proService: ProductService,
    private _coreService: CoreService,
  ) { }

  ngOnInit() {
    this.nameRender = 'Category'
    this.getProductist();
  }
  openAddEditEmpForm(Component: string) {
    if (!this.product.getToken()) {
      this.route.navigateByUrl('/login');
    } else {
      switch (Component) {
        case 'product':
          this._dialog.open(AddProductComponent);
          break;
        case 'category':
          this._dialog.open(AddCategoryComponent);
          break;
        default:
          break;
      }
    }

  }
  // get product
  getProductist() {
    this._proService.getProductList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });

  }
  // get product
  getCategoryist() {
    this._proService.getCategoryList().subscribe({
      next: (res) => {
        this.dataSource2 = new MatTableDataSource(res.data);
        this.dataSource2.sort = this.sort;
        this.dataSource2.paginator = this.paginator;
      },
      error: console.log,
    });
  }
  // Log out
  logOutAccount() {
    this.route.navigateByUrl('/login');
    localStorage.removeItem('token');
    localStorage.removeItem('refeshToken');
  }
  // Filter
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource2.filter = filterValue.trim().toLowerCase();

    if (this.nameRender == 'Category' && this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    if (this.nameRender == 'Category' && this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
  }
  // open edit
  openEditForm(data: any) {
    const dialogRef = this._dialog.open(AddProductComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getProductist();
        }
      },
    });
  }
  openCategoryEditForm(data: any) {
    const dialogRef = this._dialog.open(AddCategoryComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCategoryist();
        }
      },
    });
  }
  deleteProduct(Product_ID: any) {
    this._proService.deleteProduct(Product_ID).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Employee deleted!', 'done');
        this.getProductist();
      },
      error: console.log,
    });
  }
  deleteCategory(categoryId: any) {
    console.log('delete category', categoryId)
  }
  toggleTypeRender() {
    if (this.nameRender == 'Category') {
      this.nameRender = 'Product'
      this.getCategoryist()

    } else {
      this.nameRender = 'Category'
      this.getProductist()
    }
  }
}
