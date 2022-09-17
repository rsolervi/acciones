import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Stock } from '../../../models/stock';

@Component({
  selector: 'stt-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit, OnChanges {

  @Input() data?: Stock;

  sube: boolean | null = null;

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.data && this.data.change !== undefined && this.data.change !== null){
      this.sube = this.data.change > 0;
    }

  }

  ngOnInit(): void {
  }

  close():void{
    console.log('close');
  }

}
