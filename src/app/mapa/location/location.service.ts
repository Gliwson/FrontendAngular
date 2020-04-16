import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { PositionsService } from '../position/positions.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private UrlGoogleSheet = environment.configURLGoogleSheets;

  constructor(private position: PositionsService) {}

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

  addPointToMap(param: string, map) {
    this.position.getPoint(param).subscribe((value) => {
      value.forEach((e) => {
        const myCustomColour = e.colorsComments;
        const myCustomColour2 = e.colorsName;

        const markerHtmlStyles3 = `
        background-color: ${myCustomColour};
        width: 1rem;
        height: 1rem;
        display: block;
        left: -1.5rem;
        top: -1.5rem;
        position: relative;
        border-radius: 3rem 3rem 0;
        transform: rotate(45deg);
        border: 5px solid ${myCustomColour2}`;

        const icon3 = L.divIcon({
          className: 'my-custom-pin',
          iconAnchor: [0, 15],
          popupAnchor: [0, -15],
          html: `<span style="${markerHtmlStyles3}" />`,
        });
        const urlow = this.UrlGoogleSheet + 'edit#gid=0&range=A' + e.id + ':H' + e.id;
        new L.Marker([e.x, e.y], { icon: icon3 })
          .addTo(map)
          .bindPopup(
            '<div id="content">' +
              '<div id="siteNotice">' +
              '</div>' +
              '<h4 id="firstHeading" class="firstHeading">Pozycja w arkuszu: ' +
              e.id +
              '<br>' +
              e.name +
              '</h4>' +
              '<div id="bodyContent">' +
              '<p>Uwagi: ' +
              e.comments +
              '</p>' +
              '<p>' +
              '<a target="_blank" href="' +
              e.locationHref +
              '">Lokalizacja</a>' +
              '</p>' +
              '<p>' +
              '<a target="_blank" href="' +
              e.dyskHref +
              '">Dysk</a>' +
              '</p>' +
              '<p>' +
              '<a target="_blank" href="' +
              urlow +
              '">Lokalizacja do ARKUSZA</a>' +
              '</p>' +
              '</div>' +
              '</div>'
          )
          .closePopup();
      });
    });
  }

  public locationNavi(map): void {
    map.locate({ setView: true, maxZoom: 13 });

    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);

    let currentPosition: any;
    let currentAccuracy: any;

    function onLocationError(e) {
      alert(e.message);
    }

    function onLocationFound(e): void {
      if (currentPosition) {
        map.removeLayer(currentPosition);
        map.removeLayer(currentAccuracy);
      }
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
      currentPosition = L.marker(e.latlng, { icon: naviIcon })
        .addTo(map)
        .bindPopup('<h4><b>Tutaj Jesteś</b></h4>')
        .openPopup();
      currentAccuracy = L.circle(e.latlng, radius).addTo(map);
    }
  }
}
