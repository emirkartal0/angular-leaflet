import { Injectable } from '@angular/core';
import { Sensor } from '../types/sensor.type';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export abstract class BaseDataService {
    constructor() {}

    abstract getSensorData(): Observable<Sensor[]>;
}
