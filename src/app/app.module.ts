import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MapaComponent } from './mapa/mapa.component';
import { HttpClientModule } from '@angular/common/http';
import { LocationService } from './mapa/location/location.service';
import { PositionsService } from './mapa/position/positions.service';

@NgModule({
  declarations: [AppComponent, MapaComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [LocationService, PositionsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
