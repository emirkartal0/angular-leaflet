import {
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { Sensor } from '../../shared/types/sensor.type';
import { Subject, takeUntil } from 'rxjs';
import { BaseDataService } from '../../shared/services/base-data.service';
import { SensorCardComponent } from '../sensor-card/sensor-card.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-devices',
    standalone: true,
    imports: [FormsModule, SensorCardComponent, CommonModule],
    templateUrl: './devices.component.html',
    styleUrl: './devices.component.css',
})
export class DevicesComponent implements OnInit, OnDestroy {
    private unsub$: Subject<void> = new Subject<void>();
    private sensors: Sensor[] = [];
    public filteredSensors: Sensor[] = [];
    public searchQuery: string = '';

    constructor(private dataService: BaseDataService) {}

    ngOnInit(): void {
        this.dataService
            .getSensorData()
            .pipe(takeUntil(this.unsub$))
            .subscribe({
                next: (data) => {
                    this.sensors = data;
                    this.filteredSensors = data;
                },
                error: (err) => {
                    console.error(err);
                },
                complete: () => {
                    console.log('complete');
                },
            });

        this.dataService.selectedSensorId$
            .pipe(takeUntil(this.unsub$))
            .subscribe((id) => {
                const element = document.getElementById(id);
                element?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                });
            });
    }

    filterSensors(): void {
        const query = this.searchQuery.toLowerCase();
        this.filteredSensors = this.sensors.filter((sensor) =>
            sensor.name.toLowerCase().includes(query)
        );
    }

    scrollToSensor(el: Event): void {
        const element = el.target as HTMLElement;
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    ngOnDestroy(): void {
        this.unsub$.next();
    }
}
