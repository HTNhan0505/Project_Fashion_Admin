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
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
  displayedColumns: string[] = [
    'orderID',
    'address',
    'status',
    'price',
    'updtaed_at',
  ];
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

  }

  ngOnInit() {
    this.getOrderList();
  }

  // get product
  getOrderList() {
    this._proService.getOrderList().subscribe({
      next: (res) => {
        console.log(res)
        this.dataSource2 = new MatTableDataSource(res.data);
        this.dataSource2.paginator = this.paginator;
      },

    });

  }
}
