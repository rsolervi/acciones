import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared/shared.module';
import { StockSearchComponent } from './search/stock-search.component';
import { StockComponent } from './stock/stock.component';
import { StocksComponent } from './stocks/stocks.component';
import { StockTrackerComponent } from './stock-tracker/stock-tracker.component';



@NgModule({
  declarations: [
    StockSearchComponent,
    StocksComponent,
    StockComponent,
    StockTrackerComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    StockSearchComponent,
    StocksComponent
  ]
})
export class StockTrackerModule { }
