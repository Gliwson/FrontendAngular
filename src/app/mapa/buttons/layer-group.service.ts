import { Injectable } from '@angular/core';
import { LocationService } from '../location/location.service';
import * as L from 'leaflet';
import { PointDifference } from '../position/modules/point-difficult.enum';

@Injectable({
  providedIn: 'root',
})
export class LayerGroupService {
  constructor(private location: LocationService) {}

  add(map) {
    const note = L.layerGroup();
    const completedWorks = L.layerGroup();
    const offWork = L.layerGroup();
    const facture = L.layerGroup();
    const rest = L.layerGroup();
    const all = L.layerGroup();
    this.location.addPointToMap(PointDifference.ALL, all);
    this.location.addPointToMap(PointDifference.COMMENTS, note);
    this.location.addPointToMap(PointDifference.DONE, completedWorks);
    this.location.addPointToMap(PointDifference.OFF, offWork);
    this.location.addPointToMap(PointDifference.INVOICED, facture);
    this.location.addPointToMap(PointDifference.OTHER, rest);

    const overlayMaps = {
      UWAGI: note,
      'WYKONANE PRACE NA ZIELONO': completedWorks,
      'WYŁĄCZENIA ZAKŁADOWSKIE': offWork,
      ZAFAKTUROWANE: facture,
      RESZTA: rest,
      WSZYSTKIE: all,
    };
    map.addLayer(note);
    L.control.layers(overlayMaps).addTo(map);
  }
}
