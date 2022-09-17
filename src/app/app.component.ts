import { Component } from '@angular/core';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'StockTracker';
  symbols: string[] = [];

  constructor(public storageService: LocalStorageService){
    this.symbols = this.storageService.getData("symbols", true) ?? [];
  }

  onSavedSymbol(symbol:string){
    if(this.symbols.indexOf(symbol) === -1){
      this.symbols = [symbol];
    }
  }
}
