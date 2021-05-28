import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { ShareholdersTableComponent } from './shareholders-table/shareholders-table.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ConverToPercentsPipe } from './conver-to-percents.pipe';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    ShareholdersTableComponent,
    ConverToPercentsPipe,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatPaginatorModule
  ],
  exports: [ShareholdersTableComponent]
})
export class ShareholdersTableModule { }
