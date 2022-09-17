import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Sentiment } from '../models/sentiment';
import { Stock } from '../models/stock';

@Injectable({
  providedIn: 'root'
})
export class StockApiService {

  urlBase: string = 'https://finnhub.io/api/v1';
  token: string = 'bu4f8kn48v6uehqi3cqg';

  constructor(public http: HttpClient) { }

  public getStock(symbol: string): Observable<Stock> {
    return this.http.get(`${this.urlBase}/quote?symbol=${symbol}&token=${this.token}`).pipe(
      map( (ob: any) => {
        return {
          currentPrice: ob.c,
          change: ob.d,
          percent: ob.p,
          highPrice: ob.h,
          lowPrice: ob.l,
          openPrice: ob.o,
          previousClosePrice: ob.pc
        } as Stock;
      })
    )
  }

  public getCompanyName(symbol: string): Observable<string>{
    return this.http.get(`${this.urlBase}/search?q=${symbol}&token=${this.token}`).pipe(
      map( (ob: any) => {
        if(ob.count > 0){
          const company = ob.result[0];
          if(company.symbol === symbol){
            return company.description;
          } else {
            return null;
          }
        } else {
          return null;
        }
      })
    )
  }

  public getSentiment(symbol: string, from: Date, to: Date): Observable<Sentiment>{
    return this.http.get<Sentiment>(`${this.urlBase}/stock/insider-sentiment?symbol=${symbol}&from=${from}&to=${to}&token=${this.token}`);
  }

}
