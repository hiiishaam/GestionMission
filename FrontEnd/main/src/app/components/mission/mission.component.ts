import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MissionService } from '../../services/services';
import { Mission } from '../../model/Models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card'; 

import { Add } from './add-mission-dialog/add-mission-dialog.component';
import { Edit } from './edit-mission-dialog/edit-mission-dialog.component';
import { Delete } from './delete-mission-dialog/delete-mission-dialog.component';

@Component({
  selector: 'app-mission',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule
  ],
  templateUrl: './mission.component.html'
})
export class AppMissionComponent {
  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  data: Mission[] = [];
  dataSource = new MatTableDataSource<Mission>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: MissionService, public dialog: MatDialog) {
    this.Load();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  Load(): void {
    this.data = this.service.Get();
    this.dataSource.data = this.data;
  }

  add(): void {
    const dialogRef = this.dialog.open(Add, {
      width: '2000px',
      data: { data: { id: 0, name: '' } }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.service.Add(result);
        this.Load();
      }
    });
  }
  // Méthode pour ouvrir le dialog d'édition
  edit(data: Mission): void {
    const dialogRef = this.dialog.open(Edit, {
      width: '400px',
      data: { data: { ...data } }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.service.Update(result);  // Mettre à jour l'employé
        this.Load();  // Recharger la liste après modification
      }
    });
  }
    // Méthode pour afficher la confirmation avant suppression
  delete(id: number): void {
    const dialogRef = this.dialog.open(Delete, {
      width: '400px',
      data: { data: { id: id } }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.service.Delete(id);
        this.Load();
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}