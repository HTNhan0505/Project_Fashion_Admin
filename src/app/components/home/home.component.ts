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
import { EventEmitterService } from 'src/app/service/event-emitter.service';
import { Subscription } from 'rxjs'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  clickEventSubscription: Subscription;
  updateCategory: Subscription;
  displayedColumns: string[] = [
    'productId',
    'listImage',
    'productName',
    'detail',
    'price',
    'quantity',
    'gender',
    'categoryName',
    'action'
  ];
  displayedColumns2: string[] = [
    'categoryId',
    'name',
    'detail',
    'gender',
    'action'
  ];
  nameRender: any
  dataSource!: MatTableDataSource<any>;
  dataSource2!: MatTableDataSource<any>;
  pageNumber = 0;
  pageSize = 5; // Số sản phẩm hiển thị trên mỗi trang
  total: number = 0
  isLoading = false

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    public product: ProductService,
    private route: Router,
    private _proService: ProductService,
    private _coreService: CoreService,
    private EventEmitterService: EventEmitterService
  ) {
    this.clickEventSubscription = this.EventEmitterService.getClickEvent().subscribe(() => {
      this.getProductList();
    })
    this.updateCategory = this.EventEmitterService.getClickEvent().subscribe(() => {
      this.getCategoryist();
    })
  }

  ngOnInit() {
    this.nameRender = 'Category'
    this.getProductList();
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
  getProductList() {

    this._proService.getProductList(this.pageNumber, this.pageSize).subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.sort = this.sort;
        this.total = Math.ceil(res.total / this.pageSize)
        this.isLoading = false
      },

    });

  }


  getCategoryist() {
    this._proService.getCategoryList().subscribe({
      next: (res) => {
        this.dataSource2 = new MatTableDataSource(res.data);
        this.dataSource2.sort = this.sort;
        this.dataSource2.paginator = this.paginator;

      },

    });
  }
  nextPage() {
    this.isLoading = true
    if (this.pageNumber < this.total) {
      this.pageNumber++;
      this.getProductList();
    }

  }
  previousPage() {
    this.isLoading = true

    if (this.pageNumber > 0) {
      this.pageNumber = 0;
      this.getProductList();
    }
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
          this.getProductList();
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
        this.getProductList();
      },

    });
  }

  toggleTypeRender() {
    if (this.nameRender == 'Category') {
      this.nameRender = 'Product'
      this.getCategoryist()

    } else {
      this.nameRender = 'Category'
      this.getProductList()
    }
  }
  getOrders() {
    this.route.navigate(['orders'])
    // this.getOrderList()
  }
  getAmount() {
    this.route.navigate(['amount'])
  }

}
