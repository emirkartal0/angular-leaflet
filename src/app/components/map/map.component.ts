import { Component } from '@angular/core';
import { LeafletDirective } from '../../shared/directives/leaflet.directive';
@Component({
	selector: 'app-map',
	standalone: true,
	imports: [LeafletDirective],
	templateUrl: './map.component.html',
	styleUrl: './map.component.css',
})
export class MapComponent {}
