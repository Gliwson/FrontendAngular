import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-easybutton';
import 'leaflet-easybutton/src/easy-button.css';
@Injectable({
  providedIn: 'root',
})
export class ButtonService {
  constructor() {}

  currentLocation(map: any) {
    L.easyButton('<h3><span class="star">&curren;</span><h3/>', function Location() {
      map.locate({ setView: true, maxZoom: 16 });
    }).addTo(map);
  }
}
