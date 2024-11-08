import { Injectable, signal } from '@angular/core';
import { Sensor } from '../types/sensor.type';
import { Observable, of } from 'rxjs';
import { BaseDataService } from './base-data.service';

@Injectable({
    providedIn: 'root',
})
export class MockDataService extends BaseDataService {
    private readonly sensorLocations: string[] = [
        '1 nolu kapı',
        '1 nolu kapı',
        'Salon',
        'Çalışma Odası',
        'Yatak Odası',
        'Mutfak',
        'Çocuk Odası',
        'Balkon kapısı',
    ];

    private sensorData: Sensor[] = [];

    constructor() {
        super();
        this.generateMockData();
    }

    getSensorData(): Observable<Sensor[]> {
        return of(this.sensorData);
    }

    private generateMockData() {
        for (const location of this.sensorLocations) {
            this.sensorData.push({
                id: crypto.randomUUID(),
                name: 'Sıcaklık ve Nem Sensörü',
                label: location,
                isSelected: signal(false),
                tempature: signal(Math.round(Math.random() * 25 + 10)),
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
