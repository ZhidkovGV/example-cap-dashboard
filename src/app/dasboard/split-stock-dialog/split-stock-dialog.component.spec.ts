import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitStockDialogComponent } from './split-stock-dialog.component';

describe('SplitStockDialogComponent', () => {
  let component: SplitStockDialogComponent;
  let fixture: ComponentFixture<SplitStockDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SplitStockDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitStockDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
