import {
    AfterViewInit,
    ComponentRef,
    Directive,
    ElementRef,
    inject,
    Input,
    OnInit,
    ViewContainerRef,
} from '@angular/core';
import * as Leaflet from 'leaflet';
import {
    OPEN_STREET_MAP,
    OPEN_STREET_MAP_ATTRIBUTION,
} from '../utils/constants';
import { SensorPopupComponent } from '../../components/sensor-popup/sensor-popup.component';
import { BaseDataService } from '../services/base-data.service';
import { Sensor } from '../types/sensor.type';
import { toObservable } from '@angular/core/rxjs-interop';

@Directive({
    selector: '[leaflet]',
    standalone: true,
})
export class LeafletDirective implements OnInit {
    private map!: Leaflet.Map;
    private icon!: Leaflet.Icon;
    private layer!: Leaflet.TileLayer;

    constructor(
        private element: ElementRef,
        private viewContainerRef: ViewContainerRef,
        private dataService: BaseDataService
    ) {
        this.initializeAssets();
    }
    ngOnInit(): void {
        this.map = Leaflet.map(this.element.nativeElement)
            .setView([39, 34], 5)
            .addLayer(this.layer);

        this.dataService.getSensorData().subscribe((data: Sensor[]) => {
            data.forEach((sensor) => {
                this.renderMarker(sensor);
            });
        });
    }

    renderMarker(sensor: Sensor) {
        const marker = Leaflet.marker([sensor.latitude, sensor.longitude], {
            icon: this.icon,
        }).addTo(this.map);

        let popupComponent: ComponentRef<SensorPopupComponent> =
            this.viewContainerRef.createComponent(SensorPopupComponent);
        popupComponent.instance.sensor = sensor;

        marker.on('popupopen', () => {
            this.dataService.selectSensor(sensor.id);
        });

        marker.on('popupclose', () => {
			this.dataService.unselectSensor(sensor.id);
        });

		this.dataService.selectedSensorId$.subscribe((id) => {
			if (id === sensor.id) {
				marker.openPopup();
			}
		})

		this.dataService.unSelectedSensorId$.subscribe((id) => {
			if (id === sensor.id) {
				marker.closePopup();
			}
		})

        marker
            .bindPopup(popupComponent.location.nativeElement, {
                closeButton: false,
                minWidth: 200,
                className: 'shadow-xl',
            })
            .openPopup()
            .closePopup(); // prevent viewContainerRef from creating component on the parent element
    }

    initializeAssets() {
        this.icon = Leaflet.icon({
            iconUrl: 'assets/icons/map-pin.svg',
            iconAnchor: [18, 56],
            popupAnchor: [-112, 166],
            shadowSize: [41, 41],
            className: 'z-50',
        });

        this.layer = Leaflet.tileLayer(OPEN_STREET_MAP, {
            attribution: OPEN_STREET_MAP_ATTRIBUTION,
            maxZoom: 18,
        });
    }
}
