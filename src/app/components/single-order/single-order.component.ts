import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-single-order',
  templateUrl: './single-order.component.html',
  styleUrls: ['./single-order.component.scss']
})
export class SingleOrderComponent {
  dataSource!: MatTableDataSource<any>;
  totalPrice: any

  displayedColumns: string[] = [
    'cartItemID',
    'listImage',
    'productName',
    'itemQuantity',
    'price',
  ];
  constructor(
    public product: ProductService,
    private _activeRoute: ActivatedRoute,
  ) {

  }
  ngOnInit(): void {
    this.getSingleOrder(this._activeRoute.snapshot.paramMap.get('query'));
  }

  getSingleOrder(id: any) {
    this.product.getSingleOrder(id).subscribe((result) => {
      this.dataSource = new MatTableDataSource(result.Items);
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
}
