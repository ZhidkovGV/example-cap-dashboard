import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { ICompany, IShareholder, ISharesData, ShareType } from '../models/shareholder.model';
import * as companyMock from '../mocks/company.mock.json';

@Injectable({
  providedIn: 'root'
})
export class SharesDataService {
  private companyMock: ICompany = (companyMock as any).default;
  private company$ = new BehaviorSubject<ICompany>(this.companyMock);

  constructor() {
  }

  public getCompanyWithSharesData$(): Observable<ICompany> {
    return this.company$.asObservable();
  }

  public deleteShareholder(shareholderId: string): void {
    const filteredShareholder = this.companyMock.shareholders.filter(shareholder => shareholder.id !== shareholderId);
    this.companyMock = { ...this.companyMock, shareholders: filteredShareholder };
    this.company$.next(this.companyMock);
  }

  public createShareholder(shareholder: IShareholder): void {
    const newShareholders = [...this.companyMock.shareholders, shareholder];
    this.companyMock = { ...this.companyMock, shareholders: newShareholders };
    this.company$.next(this.companyMock);
  }

  public updateShareholder(updatedShareholder: IShareholder): void {
    const { shareholders } = this.companyMock;
    const shareholderIndex = shareholders.findIndex((shareholder) => {
      return shareholder.id === updatedShareholder.id;
    })
    const newShareholders = [...shareholders];
    newShareholders[shareholderIndex] = updatedShareholder;
    this.companyMock = { ...this.companyMock, shareholders: newShareholders }
    this.company$.next(this.companyMock);
  }

  public performSharesSplit(type: ShareType, from: number, to: number): void {
    const {outstandingSharesByType, shareholders} = this.companyMock;
    const currentShareValue = outstandingSharesByType[type];
    const newShareTypeValue = this._updateShares(currentShareValue as ISharesData, from, to);
    const newSharesByType = {...this.companyMock.outstandingSharesByType, [type]: newShareTypeValue}
    const newShareholders = shareholders.map((shareholder) => {
      const ownedShares = shareholder.sharesByType[type];
      if(ownedShares) {
        const newShares = this._updateShares(ownedShares as ISharesData, from, to);
        const newSharesByType = {...shareholder.sharesByType, [type]: newShares}
        return {...shareholder, sharesByType: newSharesByType}
      } else {
        return shareholder
      }
    });

    this.companyMock = {...this.companyMock, shareholders: newShareholders, outstandingSharesByType: newSharesByType}
    this.company$.next(this.companyMock);
  }

  private _updateShares(sharesData: ISharesData, from: number, to: number): ISharesData {
    const newShareValue = {} as Partial<ISharesData>;
    newShareValue.cost = sharesData.cost * from / to;
    newShareValue.sharesCount = Math.floor(sharesData.sharesCount / from * to);
    return newShareValue as ISharesData;
  }

}
