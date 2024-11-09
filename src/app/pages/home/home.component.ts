import { Component } from '@angular/core';
import { MapComponent } from '../../components/map/map.component';
import { DevicesComponent } from '../../components/devices/devices.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [MapComponent, DevicesComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent {}
