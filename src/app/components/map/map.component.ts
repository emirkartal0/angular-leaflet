import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  ViewChild,
} from '@angular/core';
import * as Leaflet from 'leaflet';
import {
  OPEN_STREET_MAP,
  OPEN_STREET_MAP_ATTRIBUTION,
} from '../../shared/utils/constants';
@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements AfterViewInit {
  @ViewChild('map', { static: true })
  mapContainer!: ElementRef<HTMLDivElement>;

  private map!: Leaflet.Map;

  constructor() {}

  ngAfterViewInit(): void {
    if (!this.mapContainer) return;
    this.map = Leaflet.map(this.mapContainer.nativeElement).setView(
      [51.505, -0.09],
      13
    );

    Leaflet.tileLayer(OPEN_STREET_MAP, {
      attribution: OPEN_STREET_MAP_ATTRIBUTION,
      maxZoom: 18,
    }).addTo(this.map);

    const icon = Leaflet.icon({
      iconUrl: 'assets/icons/map-pin.svg',
      iconAnchor: [18, 56],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    // viewContainerRef
    const el = document.createElement('div');
    el.innerHTML = 'Hello World!';
    el.style.width = '100px';
    el.style.height = '100px';
    el.style.backgroundColor = 'red';

    const marker = Leaflet.marker([51.505, -0.09], { icon: icon }).addTo(
      this.map
    );

    marker.bindPopup(el, {
      closeButton: false,
      offset: [-20, 20],
      className: 'popup',
    });
  }
}
