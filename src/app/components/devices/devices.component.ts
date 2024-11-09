import { Component, OnDestroy, OnInit } from '@angular/core';
import { Sensor } from '../../shared/types/sensor.type';
import { MockDataService } from '../../shared/services/mock-data.service';
import { Subject, takeUntil } from 'rxjs';
import { BaseDataService } from '../../shared/services/base-data.service';
import { SensorCardComponent } from "../sensor-card/sensor-card.component";

@Component({
    selector: 'app-devices',
    standalone: true,
    imports: [SensorCardComponent],
    templateUrl: './devices.component.html',
    styleUrl: './devices.component.css',
})
export class DevicesComponent implements OnInit, OnDestroy {
    private unsub$: Subject<void> = new Subject<void>();
    public sensors: Sensor[] = [];
    constructor(private dataService: BaseDataService) {}

    ngOnInit(): void {
        this.dataService
            .getSensorData()
            .pipe(takeUntil(this.unsub$))
            .subscribe({
                next: (data) => {
                    this.sensors = data;
                },
                error: (err) => {
                    console.error(err);
                },

                complete: () => {
                    console.log('complete');
                },
            });
    }

    ngOnDestroy(): void {
        this.unsub$.next();
    }
}
