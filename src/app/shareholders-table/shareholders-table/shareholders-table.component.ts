import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IShareholder, IShareholdersTableMetaData, ShareType } from 'src/app/common/models/shareholder.model';

interface ITableShareholder extends IShareholder {
  totalShares: number;
  totalProcent: number;
}

const defaultColumns = ['actions', 'name', 'totalShares', 'totalProcent'];
@Component({
  selector: 'app-shareholders-table',
  templateUrl: './shareholders-table.component.html',
  styleUrls: ['./shareholders-table.component.scss']
})
export class ShareholdersTableComponent implements OnInit, OnChanges {
  @Input()
  public shareholders: IShareholder[];
  @Input()
  public tableMetadata: IShareholdersTableMetaData;
  public displayedColumns = [...defaultColumns]
  public additionalColumns: string[] = [];
  public dataSource: MatTableDataSource<ITableShareholder>
  public typeColumnsDisplayUnit: Partial<Record<ShareType, 'number' | 'percents'>> = {}
  @ViewChild(MatSort, { static: false })
  public set sort(value: MatSort) {
    this.dataSource.sort = value;
  };
  @ViewChild(MatPaginator)
  public set paginator(value: MatPaginator) {
    this.dataSource.paginator = value;
  };
  @Output()
  public editShareholder = new EventEmitter<IShareholder>();
  @Output()
  public deleteShareholder = new EventEmitter<IShareholder>();

  constructor() { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.shareholders) {
      this._initDataSource(this.shareholders, this.tableMetadata);
    }
  }

  public ngOnInit(): void {
    if (this.shareholders) {
      this._initDataSource(this.shareholders, this.tableMetadata);
    }
  }

  public editShareholderClick(shareholder: IShareholder): void {
    this.editShareholder.emit(shareholder);
  }

  public deleteShareholderClick(shareholder: IShareholder): void {
    this.deleteShareholder.emit(shareholder);
  }

  public selectUnitForType(type: ShareType): void {
    this.typeColumnsDisplayUnit[type] = this.typeColumnsDisplayUnit[type] === 'number' ? 'percents' : 'number';
    this.typeColumnsDisplayUnit = { ...this.typeColumnsDisplayUnit };
  }

  public preventClick(event: MouseEvent) {
    event.stopPropagation();
  }

  private _initDataSource(shareholders: IShareholder[], companyMetaData: IShareholdersTableMetaData): void {
    const tableData: ITableShareholder[] = shareholders.map(shareholder => {
      const totalShareCost = Object.entries(shareholder.sharesByType).reduce((acc, [_, sharesData]) => {
        return sharesData!.cost * sharesData!.sharesCount + acc
      }, 0);
      return {
        ...shareholder,
        totalProcent: +(totalShareCost / companyMetaData.totalCost * 100).toFixed(2),
        totalShares: Object.values(shareholder.sharesByType).reduce((acc, v) => acc + v!.sharesCount, 0)
      }
    });
    this.additionalColumns = [...new Set(shareholders?.flatMap((shareholder) => {
      return (Object.keys(shareholder.sharesByType))
    }))] as string[]
    this.typeColumnsDisplayUnit = companyMetaData.totalSharesByType.map(type => type.type).reduce((acc, key) => {
      acc[key] = 'number';
      return acc;
    }, {} as any);
    this.displayedColumns = [...new Set([...this.displayedColumns, ...this.additionalColumns])]
    this.dataSource = new MatTableDataSource(tableData);
    this.dataSource.sort = this.sort
    this.dataSource.sortingDataAccessor = (data, headerId) => {
      if (!defaultColumns.some(column => column === headerId)) {
        return 0 - (data.sharesByType[headerId as ShareType]?.sharesCount ?? 0);
      }
      return typeof (data as any)[headerId] === 'number' ? 0 - (data as any)[headerId] : (data as any)[headerId];
    };

  }

}
