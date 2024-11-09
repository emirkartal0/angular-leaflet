import { Injectable, signal } from '@angular/core';
import { Sensor } from '../types/sensor.type';
import { Observable, of, Subject } from 'rxjs';
import { BaseDataService } from './base-data.service';

@Injectable({
    providedIn: 'root',
})
export class MockDataService extends BaseDataService {
    private readonly sensorLocations: string[] = [
        '1 nolu kapı',
        '2 nolu kapı',
        'Salon',
        'Çalışma Odası',
        'Yatak Odası',
        'Mutfak',
        'Çocuk Odası',
        'Balkon kapısı',
    ];

    private sensorData: Sensor[] = [];
    public selectedSensorId$: Subject<string> = new Subject();
    public unSelectedSensorId$: Subject<string> = new Subject();

    constructor() {
        super();
        this.generateMockData();
    }

    public getSensorData(): Observable<Sensor[]> {
        return of(this.sensorData);
    }

    public selectSensor(id: string): void {
        this.sensorData.forEach((sensor) => {
            sensor.isSelected.set(false);
        });
        this.selectedSensorId$.next(id);
        this.sensorData
            .find((sensor) => sensor.id === id)
            ?.isSelected.set(true);
    }

    public unselectSensor(id: string): void {
        this.sensorData
            .find((sensor) => sensor.id === id)
            ?.isSelected.set(false);
    }

    private generateMockData(): void {
        for (const location of this.sensorLocations) {
            this.sensorData.push({
                id: crypto.randomUUID(),
                name: location,
                isSelected: signal(false),
                temperature: signal(Math.round(Math.random() * 25 + 10)),
                humidity: signal(Math.round(Math.random() * 15 + 15)),
                battery: Math.random() * 100,
                latitude: Math.random() * 5 + 37,
                longitude: Math.random() * 18 + 27,
                date: new Date(
                    Date.now() - Math.random() * 1000 * 60 * 60 * 24
                ),
            });
        }
    }
}
