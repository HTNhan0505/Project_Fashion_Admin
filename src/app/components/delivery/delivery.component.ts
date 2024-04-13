import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss'],
})
export class DeliveryComponent {
  date: any = '';
  location: any = '';
  estimate_date: any = '';
  status: any = '';
  constructor(
    public product: ProductService,
    private _activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getDelivery(this._activeRoute.snapshot.paramMap.get('query'));
  }
  getDelivery(id: any) {
    this.product.getDelivery(id).subscribe(
      (result) => {
        this.date = result.data.created_at
        this.location = result.data.address
        this.estimate_date = result.data.deliveryDate;
        this.status = result.data.deliveryStatus
      },
      (error) => {
        console.error('Lỗi:', error);
      }
    );
  }
}
