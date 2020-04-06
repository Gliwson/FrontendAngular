import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { LocationService } from './location/location.service';
import { PositionsService } from './position/positions.service';
import { PointDifference } from './position/modules/point-difficult.enum';
import 'leaflet-easybutton';
import 'leaflet-easybutton/src/easy-button.css';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css'],
})
export class MapaComponent implements AfterViewInit {
  constructor(private location: LocationService, private position: PositionsService) {}

  ngAfterViewInit(): void {
    const map = this.location.initMap();
    const note = L.layerGroup();
    const completedWorks = L.layerGroup();
    const offWork = L.layerGroup();
    const facture = L.layerGroup();
    const rest = L.layerGroup();
    const all = L.layerGroup();

    this.location.locationNavi(map);

    this.location.addPointToMap(PointDifference.ALL, all);
    this.location.addPointToMap(PointDifference.COMMENTS, note);
    this.location.addPointToMap(PointDifference.DONE, completedWorks);
    this.location.addPointToMap(PointDifference.OFF, offWork);
    this.location.addPointToMap(PointDifference.INVOICED, facture);
    this.location.addPointToMap(PointDifference.OTHER, rest);

    const overlayMaps = {
      UWAGI: note,
      'WYKONANE PRACE NA ZIELONO': completedWorks,
      'WYLACZENIA ZAKLADOWSKIE': offWork,
      ZAFAKTUROWANE: facture,
      RESZTA: rest,
      WSZYSTKIE: all,
    };
    map.addLayer(note);
    L.control.layers(overlayMaps).addTo(map);

    L.easyButton('<h3><span class="star">&curren;</span><h3/>', function Location() {
      map.locate({ setView: true, maxZoom: 16 });
    }).addTo(map);
  }
}
