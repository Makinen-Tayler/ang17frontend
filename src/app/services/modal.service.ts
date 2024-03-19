import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUserModalComponent } from '../components/modals/add-user-modal/add-user-modal.component';
import { ConfirmModalComponent } from '../components/modals/confirm-modal/confirm-modal.component';
import { CreatePostModalComponent } from '../components/modals/create-post-modal/create-post-modal.component';
@Injectable({
  providedIn: 'root'
})
export class ModalService {


  constructor(private dialog: MatDialog) { }

  openAddRealModal(): void {
    this.dialog.open(AddUserModalComponent);
  }

  closeModal(): void {
    this.dialog.closeAll();
  }

  openConfirmModal(title: string, message: string): Promise<boolean> {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: { title, message }
    });

    return dialogRef.afterClosed().toPromise();
  }

  openCreatePostModal() {
    this.dialog.open(CreatePostModalComponent);
  }
}
