import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { StockApiService } from 'src/app/services/stock-api.service';
import { Stock } from '../../../models/stock';

@Component({
  selector: 'stt-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss']
})
export class StocksComponent implements OnInit, OnChanges {

  @Input() newSymbols:string[] = [];
  symbols:string[] = [];
  data?: Stock[];

  constructor(
    public storageService: LocalStorageService,
    public stocksApi: StockApiService) { }


  ngOnInit(): void {
    //
  }

  private getDataSymbols() {
    const obsSimbolos = [];
    for (const symbol of this.newSymbols) {
      obsSimbolos.push(this.stocksApi.getStock(symbol).pipe(
        switchMap(s => this.stocksApi.getCompanyName(symbol).pipe(
          map((empresa: string) => {
            s.name = empresa;
            return s;
          })
        ))
      ));
    }
    if (obsSimbolos) {
      forkJoin(obsSimbolos).subscribe( res => {
        if(Array.isArray(this.data) && this.data.length > 0){
          this.data = this.data.concat(res);
        } else {
          this.data = res;
        }
      })
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getDataSymbols();
  }

}
