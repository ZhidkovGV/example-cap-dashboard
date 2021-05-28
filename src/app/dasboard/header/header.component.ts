import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() 
  public companyName: string | undefined;
  @Output()
  public splitShares = new EventEmitter<void>();
  @Output()
  public newShareholser = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  public onSplitClick(): void {
    this.splitShares.emit();
  }

  public onNewShareholderClick(): void {
    this.newShareholser.emit();
  }
}
