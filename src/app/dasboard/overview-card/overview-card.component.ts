import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { ICompany, ShareType } from 'src/app/common/models/shareholder.model';
import { chartOptions } from './chart-options';

@Component({
  selector: 'app-overview-card',
  templateUrl: './overview-card.component.html',
  styleUrls: ['./overview-card.component.scss']
})
export class OverviewCardComponent implements OnInit {
  @Input()
  public company: ICompany;
  public chart: Chart;
  public shareTypes: { type: ShareType, cost: number, sharesAmount: number }[]
  constructor() { }

  ngOnInit(): void {
    this._init();
  }

  ngOnChanges(): void {
    this._init();
  }

  private _init(): void {
    this.shareTypes = Object.entries(this.company.outstandingSharesByType).map(([shareType, shareData]) => {
      return { type: shareType as ShareType, cost: shareData!.cost, sharesAmount: shareData!.sharesCount }
    })
    const chartOptionsWithData = {
      ...chartOptions,
      xAxis: { categories: Object.keys(this.company.outstandingSharesByType) },
      series: Object.entries(this.company.outstandingSharesByType).map(([shareType, shareData]) => {
        return { name: shareType, data: [shareData!.cost * shareData!.sharesCount] }
      })
    }
    this.chart = new Chart(chartOptionsWithData as any)
  }

}
