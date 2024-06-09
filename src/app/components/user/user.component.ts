
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/service/core.service';
import { ProductService } from 'src/app/service/product.service';
import { EventEmitterService } from 'src/app/service/event-emitter.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  clickEventSubscription: Subscription;
  dataSource!: MatTableDataSource<any>;

  displayedColumns2: string[] = [
    'user_id',
    'name',
    'email',
    'phone',
    'action'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  constructor(private _dialog: MatDialog,
    public product: ProductService,
    private route: Router,
    private _coreService: CoreService,
    private EventEmitterService: EventEmitterService) {
    this.clickEventSubscription = this.EventEmitterService.getClickEvent().subscribe(() => {
      this.getUserList();
    })
  }

  ngOnInit() {
    this.getUserList()
  }

  getUserList() {
    this.product.userList().subscribe({
      next: (res: any) => {
        console.log("********Data", res.data)
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      },

    });
  }
  openEditForm(data: any) {
    const dialogRef = this._dialog.open(EditUserComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getUserList();
        }
      },
    });
  }

  // Filter
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
