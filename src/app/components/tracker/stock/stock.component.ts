import { Component, Input, OnInit } from '@angular/core';
import { Stock } from '../../../models/stock';

@Component({
  selector: 'stt-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {

  @Input() data?: Stock;

  constructor() { }

  ngOnInit(): void {
  }

}
