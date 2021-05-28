import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EMPTY, Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { ICompany, IShareholder, IShareholdersTableMetaData } from 'src/app/common/models/shareholder.model';
import { SharesDataService } from 'src/app/common/services/shares-data.service';
import { DeleteUserConfirmationDialogComponent } from '../delete-user-confirmation-dialog/delete-user-confirmation-dialog.component';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { SplitStockDialogComponent } from '../split-stock-dialog/split-stock-dialog.component';

@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.scss']
})
export class DasboardComponent implements OnInit {
  public company$: Observable<ICompany> = EMPTY;
  public shareholdersData$: Observable<IShareholder[]> = EMPTY;
  public companySharesData$: Observable<IShareholdersTableMetaData> = EMPTY;
  constructor(
    private readonly shareholdersService: SharesDataService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.company$ = this.shareholdersService.getCompanyWithSharesData$().pipe(
      tap(console.log),
      shareReplay()
    );
    this.shareholdersData$ = this.company$.pipe(
      map(company => company.shareholders)
    );
    this.companySharesData$ = this.company$.pipe(
      map(company => {
        return Object.entries(company.outstandingSharesByType).reduce((acc, [key, value]) => {
          const shareType = acc.totalSharesByType.find(({ type }) => type === key);
          if (shareType) {
            acc.totalCost = acc.totalCost + (value!.cost * value!.sharesCount);
            shareType.totalCost = shareType.totalCost + value!.cost * value!.sharesCount
            return acc
          } else {
            const newType = {
              cost: value!.cost,
              type: key,
              totalCost: value!.cost * value!.sharesCount
            }
            acc.totalCost = acc.totalCost + newType.totalCost;
            acc.totalSharesByType.push(newType)
            return acc
          }
        }, { totalCost: 0, totalSharesByType: [] } as IShareholdersTableMetaData)
      })
    )
  }

  public onEditShareholder(shareholder: IShareholder, companyInfo: ICompany): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent);
    dialogRef.componentInstance.company = companyInfo; 
    dialogRef.componentInstance.shareholder= shareholder
    dialogRef.afterClosed().subscribe(shareholder => {
      if(shareholder) {
        this.shareholdersService.updateShareholder(shareholder)
      }
    })
  }

  public onDeleteShareholder(shareholder: IShareholder): void {
    const dialogRef = this.dialog.open(DeleteUserConfirmationDialogComponent);
    dialogRef.componentInstance.shareholderName = shareholder.name;
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if(confirmed) {
        this.shareholdersService.deleteShareholder(shareholder.id)
      }
    });
  }

  public onSplitShares(company: ICompany): void {
    const dialogRef = this.dialog.open(SplitStockDialogComponent);
    dialogRef.componentInstance.company = company;
    dialogRef.afterClosed().subscribe(splitData => {
      if(splitData) {
        const {type, from, to} = splitData
        this.shareholdersService.performSharesSplit(type, from , to);
      }
    })
  }

  public onNewShareholder(companyInfo: ICompany): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent)
    dialogRef.componentInstance.company = companyInfo; 
    dialogRef.afterClosed().subscribe(shareholder => {
      if(shareholder) {
        this.shareholdersService.createShareholder(shareholder)
      }
    })
  }

}
