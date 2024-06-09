import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-amount',
  templateUrl: './amount.component.html',
  styleUrls: ['./amount.component.scss']
})
export class AmountComponent {
  amount: any = 0
  totalProduct: any
  totalUser: any
  totalOrder: any
  title = 'ng-chart';
  chart: any;
  amountItem: any

  constructor(private route: Router, private _proService: ProductService,) { }
  ngOnInit(): void {
    this.amountItem = [];
    this.handleReport()

  }

  handleReport() {
    this._proService.reportInfo().subscribe({
      next: (res) => {
        let dataMonth = []
        for (let item of res.data.amounts) {
          this.amount += item.TotalAmount;
          dataMonth.push(item.Month)
          if (item.TotalAmount >= 1e9) {
            this.amountItem.push((item.TotalAmount / 1e9)) // Hiển thị tỷ (Billion)
          } else if (item.TotalAmount >= 1e6) {
            this.amountItem.push((item.TotalAmount / 1e6)) // Hiển thị triệu (Million)
          } else {
            this.amountItem.push(item.TotalAmount)
          }
        }
        this.totalProduct = res.data.totalProduct;
        this.totalOrder = res.data.totalOrder;
        this.totalUser = res.data.totalUser

        this.chart = new Chart('canvas', {
          type: 'bar',
          data: {
            labels: dataMonth,
            datasets: [
              {
                label: '# of Amount',
                data: this.amountItem,
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            // maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: function (context) {
                    // Lấy giá trị và nhãn từ dữ liệu biểu đồ
                    let value = context.dataset.data[context.dataIndex];
                    let label = context.dataset.label;
                    return value + ' B';
                  }
                }
              }
            }
          },
        });

        console.log(this.amountItem)
      }
    })
  }
}
