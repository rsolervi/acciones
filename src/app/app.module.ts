import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { StockDetailComponent } from './components/stock-detail/stock-detail.component';
import { StockTrackerModule } from './components/tracker/stock-tracker.module';
import { SharedModule } from './shared/shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    StockDetailComponent
  ],
  imports: [
    SharedModule,
    StockTrackerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
