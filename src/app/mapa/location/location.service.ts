import { Injectable } from '@angular/core';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor() {}

  initMap() {
    const map = L.map('map', {
      center: [51.32, 22.6034],
      zoom: 13,
    });
    const tiles = L.tileLayer(
      'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ2xpd3NvbjQiLCJhIjoiY2s4NThuNXI4MDB5ZzNkdGM0N2JqOWtzbSJ9.4e1uDT7egy90EJMkhXu7QA',
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'your.mapbox.access.token',
      }
    ).addTo(map);
    tiles.addTo(map);
    return map;
  }

  public locationNavi(map): void {
    map.locate({ setView: true, maxZoom: 13 });
    map.on('locationfound', onLocationFound);
    function onLocationFound(e): void {
      const markerHtmlStyles = `
      background-color: #5E97F6;
      width: 1rem;
      height: 1rem;
      display: block;
      border-radius: 3rem 3rem 3rem;
      transform: rotate(45deg);
      border: 5px solid #5E97F6`;

      const naviIcon = L.divIcon({
        className: 'my-custom-pin',
        iconAnchor: [15, 15],
        popupAnchor: [0, -15],
        html: `<span style="${markerHtmlStyles}" />`,
      });

      const radius = e.accuracy;
      const marker = new L.Marker(e.latlng, { icon: naviIcon });
      marker
        .addTo(map)
        // .bindPopup('<h4><b>TUTAJ JESTEŚ</b></h4>')
        .closePopup();
      L.circle(e.latlng, radius).addTo(map);
    }
  }
}
