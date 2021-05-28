import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import { ShareholdersTableModule } from '../shareholders-table/shareholders-table.module';
import { PieChartModule } from '../pie-chart/pie-chart.module';

import { HeaderComponent } from './header/header.component';
import { DasboardComponent } from './dasboard/dasboard.component';
import { DeleteUserConfirmationDialogComponent } from './delete-user-confirmation-dialog/delete-user-confirmation-dialog.component';
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';
import { SplitStockDialogComponent } from './split-stock-dialog/split-stock-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverviewCardComponent } from './overview-card/overview-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { ChartModule } from 'angular-highcharts';

@NgModule({
  declarations: [
    DasboardComponent,
    HeaderComponent,
    DeleteUserConfirmationDialogComponent,
    EditUserDialogComponent,
    SplitStockDialogComponent,
    OverviewCardComponent
  ],
  imports: [
    CommonModule,
    ShareholdersTableModule,
    PieChartModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatSelectModule,
    ChartModule 
  ],
  exports: [DasboardComponent]
})
export class DasboardModule { }
