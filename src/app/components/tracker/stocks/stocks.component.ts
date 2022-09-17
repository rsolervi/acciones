import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { StockApiService } from 'src/app/services/stock-api.service';
import { Stock } from '../../../models/stock';

@Component({
  selector: 'stt-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss'],
})
export class StocksComponent implements OnInit, OnChanges {
  @Input() newSymbols: string[] = [];
  symbols: string[] = [];
  data: Stock[] = [];
  loading: boolean = false;

  constructor(
    public storageService: LocalStorageService,
    public stocksApi: StockApiService
  ) {}

  ngOnInit(): void {
    //
  }

  private getDataSymbols() {
    const obsSimbolos = [];
    for (const symbol of this.newSymbols) {
      obsSimbolos.push(
        this.stocksApi.getCompanyName(symbol).pipe(
          switchMap((empresa: string) => {
            if(empresa !== null){
              return this.stocksApi.getStock(symbol).pipe(
                map((s) => {
                  s.name = empresa;
                  return s;
                })
              );
            } else {
              this.storageService.removeArrayElement("symbols", symbol);
              return of(null);
            }
          })
        )
      );
    }
    if (obsSimbolos && obsSimbolos.length > 0) {
      this.loading = true;
      forkJoin(obsSimbolos).subscribe((res) => {
          res.forEach(e => {
            if(e !== null){
              this.data.push(e);
            }
          });
          //this.data = this.data.concat(res);
        this.loading = false;
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getDataSymbols();
  }
}
