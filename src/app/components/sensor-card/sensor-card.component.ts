import { Component, Input } from '@angular/core';
import { Sensor } from '../../shared/types/sensor.type';
import { CommonModule } from '@angular/common';
import { BaseDataService } from '../../shared/services/base-data.service';
import { DateTimePipe } from '../../shared/pipes/date-time.pipe';

@Component({
    selector: 'app-sensor-card',
    standalone: true,
    imports: [CommonModule, DateTimePipe],
    templateUrl: './sensor-card.component.html',
    styleUrl: './sensor-card.component.css',
})
export class SensorCardComponent {
    @Input() sensor!: Sensor;

    constructor(private dataService: BaseDataService) {}

    selectSensor() {
        this.dataService.selectSensor(this.sensor.id);
    }
}
