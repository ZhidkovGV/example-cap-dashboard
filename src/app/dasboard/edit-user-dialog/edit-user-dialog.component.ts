import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ICompany, IShareholder, ISharesData, ShareType } from 'src/app/common/models/shareholder.model';
import { v4 } from 'uuid';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss']
})
export class EditUserDialogComponent implements OnInit {
  @Input()
  public shareholder: IShareholder
  @Input()
  public company: ICompany;
  public form: FormGroup;
  public typeControls: string[] = []

  constructor(
    private dialogRef: MatDialogRef<EditUserDialogComponent>,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.typeControls = Object.keys(this.company.outstandingSharesByType)
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      ...Object.keys(this.company.outstandingSharesByType).reduce((acc, key) => {
        const companyShare = this.company.outstandingSharesByType[key as ShareType]?.sharesCount ?? 0
        const shareholdersOwned = this.company.shareholders.reduce((sharesCount, shareholder) => {
          return sharesCount + (shareholder.sharesByType[key as ShareType]?.sharesCount ?? 0)
        }, 0)
        const shareholderOwnedBefore = this.shareholder?.sharesByType[key as ShareType]?.sharesCount ?? 0;
        const sharesLeft = companyShare - shareholdersOwned + shareholderOwnedBefore
        acc[key] = [0, [(control: AbstractControl) => (console.log(sharesLeft), Validators.max(sharesLeft)(control))]]
        return acc;
      }, {} as { [key: string]: any })
    })
    if (this.shareholder) {
      const sharesMap = Object.entries(this.shareholder.sharesByType).reduce((acc, [key, value]) => {
        acc[key] = value?.sharesCount || 0;
        return acc
      }, {} as { [key: string]: number })
      this.form.patchValue({
        name: this.shareholder.name, ...sharesMap
      })
    }
  }

  public saveShareholder(): void {
    const { name, ...shares } = this.form.getRawValue()
    const sharesByType = Object.entries(shares).reduce((shares, [type, count]) => {
      shares[type as ShareType] = {
        cost: this.company.outstandingSharesByType[type as ShareType]?.cost ?? 0,
        sharesCount: +(count as string)
      }
      return shares
    }, {} as Record<ShareType, ISharesData>)
    const shareholder: IShareholder = { name, sharesByType, id: this.shareholder?.id ?? v4() }
    this.dialogRef.close(shareholder);
  }
}
