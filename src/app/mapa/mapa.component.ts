import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { LocationService } from './location/location.service';
import { PositionsService } from './position/positions.service';
import { PointDifference } from './position/modules/point-difficult.enum';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css'],
})
export class MapaComponent implements AfterViewInit {
  constructor(private location: LocationService, private position: PositionsService) {}

  ngAfterViewInit(): void {
    const map = this.location.initMap();
    this.location.locationNavi(map);

    this.position.getPoint(PointDifference.ALL).subscribe((value) => {
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
        const urlow =
          'https://docs.google.com/spreadsheets/d/1sxkhqRCVJ5bRDAxgIY3TjZJ9-_3OB-osAGDrsnRz8GE/' +
          'edit#gid=0&range=A' +
          e.id +
          ':H' +
          e.id;
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
}
