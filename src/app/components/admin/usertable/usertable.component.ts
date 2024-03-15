import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../modules/materialmodule';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule, SortDirection} from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatTab } from '@angular/material/tabs';

export interface User {
  UserId: string;
  Username: string;
  Email: string;
}


@Component({
  selector: 'app-usertable',
  standalone: true,
  imports: [MaterialModule, RouterModule, MatSortModule, MatPaginatorModule],
  templateUrl: './usertable.component.html',
  styleUrl: './usertable.component.scss'
})
export class UsertableComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['UserId', 'Username', 'Email'];
  resultsLength = 0;
  dataSource: User[] = [];
  constructor(private userService: UserService, private toastr: ToastrService, private router: Router) {
    this.loadUsers();
   }


   loadUsers() {
    this.userService.getUsers().subscribe({
      next: (res: any) => {
        console.log(res);
        this.dataSource = res.map((item: { userId: any; username: any; email: any; }) => ({
          UserId: item.userId,
          Username: item.username,
          Email: item.email
        })) as User[];
        this.resultsLength = res.length;
        // this.toastr.success(res.message, "Success!", { timeOut: 6000 });
      },
      error: (error: any) => {
        console.log(error);
        this.toastr.error(error.error.message, "Error!", { timeOut: 3000 });
      }
    });
  }
}
