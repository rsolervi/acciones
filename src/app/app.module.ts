import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StockDetailComponent } from './components/stock-detail/stock-detail.component';
import { StockTrackerModule } from './components/tracker/stock-tracker.module';


@NgModule({
  declarations: [
    AppComponent,
    StockDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StockTrackerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
