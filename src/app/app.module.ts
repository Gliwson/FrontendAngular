import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MapaComponent } from './mapa/mapa.component';
import { HttpClientModule } from '@angular/common/http';
import { LocationService } from './mapa/location/location.service';
import { PositionsService } from './mapa/position/positions.service';
import { LayerGroupService } from './mapa/buttons/layer-group.service';
import { ButtonService } from './mapa/buttons/button.service';

@NgModule({
  declarations: [AppComponent, MapaComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [LocationService, PositionsService, LayerGroupService, ButtonService],
  bootstrap: [AppComponent],
})
export class AppModule {}
