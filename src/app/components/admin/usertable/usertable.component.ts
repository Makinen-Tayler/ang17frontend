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
import {SelectionModel} from '@angular/cdk/collections';

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

  displayedColumns: string[] = ['select', 'UserId', 'Username', 'Email'];
  resultsLength = 0;
  dataSource!: MatTableDataSource<User>;
  selection = new SelectionModel<User>(true, []);

  constructor(private userService: UserService, private toastr: ToastrService, private router: Router) {
    this.loadUsers();
   }


   loadUsers() {
    this.userService.getUsers().subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource<User>(res.map((item: { userId: any; username: any; email: any; }) => ({
          UserId: item.userId,
          Username: item.username,
          Email: item.email
        })));
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.resultsLength = res.length;
      },
      error: (error: any) => {
        console.log(error);
        this.toastr.error(error.error.message, "Error!", { timeOut: 3000 });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addUser() {
    // const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length);
    // this.dataSource.push(ELEMENT_DATA[randomElementIndex]);
    // this.table.renderRows();
  }

  removeUser(id: string) {
    this.userService.delete(id).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (error: any) => {
        console.log(error);
        this.toastr.error(error.error.message, "Error!", { timeOut: 3000 });
      }
    });
    
  }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
      return this.selection.selected.length === this.dataSource?.data?.length;
    }
    
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    toggleAllRows() {
      if (this.isAllSelected()) {
        this.selection.clear();
        return;
      }
  
      this.selection.select(...this.dataSource.data);
    }
  
    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: User): string {
      if (!row) {
        return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.UserId + 1}`;
    }

}
