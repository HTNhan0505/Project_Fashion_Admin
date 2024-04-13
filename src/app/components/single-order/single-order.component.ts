import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { tree } from 'd3';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-single-order',
  templateUrl: './single-order.component.html',
  styleUrls: ['./single-order.component.scss']
})
export class SingleOrderComponent {
  dataSource!: MatTableDataSource<any>;
  totalPrice: any
  status: any
  status2: any
  isLoading: any = false

  displayedColumns: string[] = [
    'cartItemID',
    'listImage',
    'productName',
    'itemQuantity',
    'price',
  ];
  constructor(
    public product: ProductService,
    private route: Router,
    private _activeRoute: ActivatedRoute,
  ) {

  }
  ngOnInit(): void {
    this.getSingleOrder(this._activeRoute.snapshot.paramMap.get('query'));
  }

  getSingleOrder(id: any) {
    this.product.getSingleOrder(id).subscribe((result) => {
      this.dataSource = new MatTableDataSource(result.Items);
      if (result.status == 'SUCCESS') {
        this.status = true
        this.status2 = false
      } else if (result.status == 'CANCELED') {
        this.status = true
        this.status2 = true
      } else {
        this.status = false
        this.status2 = true
      }

      if (result.status == 'SUCCESS' || result.status == 'CANCELED') {
        this.status = true
      } else {
        this.status = false
      }
      this.calculateTotal(result.Items)
    });
  }
  // Filter
  applyFilter(event: Event) {

  }
  calculateTotal(product: any) {
    let total = 0
    for (let item of product) {
      total += item.price
    }
    this.totalPrice = total.toLocaleString('en-US');
  }



  navigateDelivery() {
    this.route.navigate([`delivery/${this._activeRoute.snapshot.paramMap.get('query')}`])
  }
  confirmOrder() {
    this.isLoading = true
    this.product.confirmOrder(this._activeRoute.snapshot.paramMap.get('query')).subscribe(
      response => {
        this.getSingleOrder(this._activeRoute.snapshot.paramMap.get('query'))
        this.isLoading = false

      },
      error => {

      }
    )
  }
}
