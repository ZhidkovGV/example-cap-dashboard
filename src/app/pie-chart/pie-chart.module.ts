import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { ChartModule } from 'angular-highcharts';



@NgModule({
  declarations: [
    PieChartComponent
  ],
  imports: [
    CommonModule,
    ChartModule
  ]
})
export class PieChartModule { }
