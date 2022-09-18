import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { StockApiService } from 'src/app/services/stock-api.service';
import { Sentiment } from '../../models/sentiment';

@Component({
  selector: 'stt-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.scss']
})
export class StockDetailComponent implements OnInit {

  symbol: string = '';
  empresa: string = '';
  loading: boolean = false;
  data?: Sentiment[];

  constructor(
    private route: ActivatedRoute,
    public stocksApi: StockApiService,
    private location: Location) {
      const psymbol = this.route.snapshot.paramMap.get("symbol");
      if(psymbol){
        this.symbol = psymbol;
      }
  }

  ngOnInit(): void {
    const today = new Date();
    const from = new Date(today.setMonth(today.getMonth() - 2));
    this.loading = true;
    const ob$ = this.stocksApi.getCompanyName(this.symbol).pipe(
      switchMap((empresa: string) => {
        if (empresa !== null) {
          this.empresa = empresa;
          return this.stocksApi.getSentiment(this.symbol, from, new Date());
        } else {
          return of(null);
        }
      })
    )
    ob$.subscribe((res:Sentiment[] | null) =>{
      if(res){
        this.data = res;
      }
      this.loading = false;
    })
  }

  back(){
    this.location.back()
  }

}
