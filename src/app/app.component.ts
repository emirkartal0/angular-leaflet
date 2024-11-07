import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as Leaflet from 'leaflet';
import 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/images/marker-icon.png';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'leaflet-angular';
  ngOnInit(): void {
    const map = Leaflet.map('map').setView([51.505, -0.09], 8);
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; Emir Kartal',
    }).addTo(map);

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

    const marker = Leaflet.marker([51.505, -0.09], { icon: icon }).addTo(map);

    marker.bindPopup(el, {
      closeButton: false,
      offset: [-20, 20],
      className: 'popup',
    });
  }
}
