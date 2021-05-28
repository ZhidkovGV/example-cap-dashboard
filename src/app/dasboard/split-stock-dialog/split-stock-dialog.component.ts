import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ICompany, ShareType } from 'src/app/common/models/shareholder.model';

@Component({
  selector: 'app-split-stock-dialog',
  templateUrl: './split-stock-dialog.component.html',
  styleUrls: ['./split-stock-dialog.component.scss']
})
export class SplitStockDialogComponent implements OnInit {
  @Input()
  public company: ICompany;
  public form: FormGroup;
  public shareTypes: ShareType[] = [];

  constructor(
    private dialogRef: MatDialogRef<SplitStockDialogComponent>,
    private formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.shareTypes = Object.keys(this.company.outstandingSharesByType) as ShareType[]
    const defaultType = this.shareTypes[0]
    this.form = this.formBuilder.group({
      type: [defaultType, Validators.required],
      from: [1, Validators.required],
      to: [2, Validators.required]
    })
  }

  public makeSplit(): void {
    const splitData = this.form.getRawValue();
    this.dialogRef.close(splitData);
  }
}
