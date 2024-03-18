import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../modules/materialmodule';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, SortDirection } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTable } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ModalService } from '../../../services/modal.service';

export interface User {
  UserId: string;
  Username: string;
  Email: string;
  isEditing: boolean;
  canDelete: boolean;

}


@Component({
  selector: 'app-usertable',
  standalone: true,
  imports: [MaterialModule, RouterModule, MatSortModule, MatPaginatorModule, MatTableModule, FormsModule, CommonModule, NgIf],
  templateUrl: './usertable.component.html',
  styleUrl: './usertable.component.scss'
})
export class UsertableComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;
  displayedColumns: string[] = ['select', 'UserId', 'Username', 'Email', 'edit'];
  resultsLength = 0;
  dataSource!: MatTableDataSource<User>;
  selection = new SelectionModel<User>(true, []);
  filterValue: string = '';


  constructor(private userService: UserService, private toastr: ToastrService, private router: Router, private modalService: ModalService) {
    this.loadUsers();
  }


  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource<User>(res.map((item: { userId: any; username: any; email: any; }) => ({
          UserId: item.userId,
          Username: item.username,
          Email: item.email,
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
  toggleEditing(user: User) {

    if (user.isEditing) {
      // Call your save function here
      this.saveChanges(user);
      user.isEditing = !user.isEditing;
      user.canDelete = !user.canDelete;
    } else {
      user.isEditing = !user.isEditing;
      user.canDelete = !user.canDelete;

    }
  }

  saveChanges(user: User) {
    this.userService.updateUser(user.UserId, user.Username, user.Email).subscribe({
      next: (res: any) => {
        this.toastr.success(res.message, "Success!", { timeOut: 350 });
      },
      error: (error: any) => {
        console.log(error);
        this.toastr.error(error.error.message, "Error!", { timeOut: 3000 });
      }
    });
  }

  applyFilter(eventOrValue: Event | string) {
    let filterValue: string;
    if (typeof eventOrValue === 'string') {
      filterValue = eventOrValue;
    } else {
      filterValue = (eventOrValue.target as HTMLInputElement).value;
    }
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  addRealUser() {
    this.modalService.openAddRealModal();
}
  clearFilter() {
    this.filterValue = '';
    this.applyFilter('');
  }
  async openConfirmModal() {
    const confirmed = await this.modalService.openConfirmModal("Delete Users", "Are you sure you want to delete the selected users?");
    if (confirmed) {
      this.removeSelectedUsers();
    } else {
      // Logic if the action is canceled
    }
  }
  addRandomUser(): void {
    const randomUsername = this.generateRandomString(8);
    const randomEmail = this.generateRandomString(8) + '@random.com';
    const randomPassword = this.generateRandomString(10);

    this.userService.addUser(randomUsername, randomEmail, randomPassword).subscribe({
      next: (res: any) => {
        const newUser: User = {
          UserId: res.userDto.userId,
          Username: res.userDto.username,
          Email: res.userDto.email,
          isEditing: false,
          canDelete: false
        };
        this.dataSource.data.push(newUser);
        this.dataSource.data = [...this.dataSource.data];
        this.toastr.success("User added successfully!", "Success!", { timeOut: 500 });
      },
      error: (error: any) => {
        console.log(error);
        this.toastr.error(error.error.message, "Error!", { timeOut: 3000 });
      }
    });
  }

  private generateRandomString(length: number): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  removeUsers(ids: string[]) {
    this.userService.delete(ids).subscribe({
      next: (res: any) => {
        this.selection.clear();
        this.dataSource.data = this.dataSource.data.filter(user => !ids.includes(user.UserId));
        this.toastr.success(res.message, "Success!", { timeOut: 3000 });
      },
      error: (error: any) => {
        console.log(error);
        this.toastr.error(error.error.message, "Error!", { timeOut: 3000 });
      }
    });

  }

  removeSelectedUsers() {
    const selectedUserIds = this.selection.selected.map(user => user.UserId);
    this.removeUsers(selectedUserIds);
  }

  getSelectedRowCount(): number {
    return this.selection.selected.length;
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
