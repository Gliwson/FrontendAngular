import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LocationService } from './location/location.service';
import { LayerGroupService } from './buttons/layer-group.service';
import { ButtonService } from './buttons/button.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css'],
})
export class MapaComponent implements AfterViewInit {
  constructor(private location: LocationService, private layer: LayerGroupService, private button: ButtonService) {}

  ngAfterViewInit(): void {
    const map = this.location.initMap();
    this.location.locationNavi(map);
    this.layer.add(map);
    this.button.currentLocation(map);
  }
}
