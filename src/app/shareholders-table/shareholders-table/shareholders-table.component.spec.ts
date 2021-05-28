import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareholdersTableComponent } from './shareholders-table.component';

describe('ShareholdersTableComponent', () => {
  let component: ShareholdersTableComponent;
  let fixture: ComponentFixture<ShareholdersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareholdersTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareholdersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
