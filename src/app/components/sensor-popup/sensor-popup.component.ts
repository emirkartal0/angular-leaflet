import { Component, Input } from '@angular/core';
import { Sensor } from '../../shared/types/sensor.type';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-sensor-popup',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './sensor-popup.component.html',
    styleUrl: './sensor-popup.component.css',
})
export class SensorPopupComponent {
    @Input() sensor!: Sensor;
    protected PopupState = PopupState;
    protected popupState: PopupState = PopupState.INFORMATION;

    newTemperature: number = 0;
    newHumidity: number = 0;

    temperatureChange(e: Event) {
        const inputEl = e.target as HTMLInputElement;
        const val = Number(inputEl.value);
        this.newTemperature = val;
    }

    updateTemperature() {
        this.sensor.tempature.set(this.newTemperature);
        this.setPage(PopupState.INFORMATION);
    }

    humidityChange(e: Event) {
        const inputEl = e.target as HTMLInputElement;
        const val = Number(inputEl.value);
        this.newHumidity = val;
    }

    updateHumidity() {
        this.sensor.humidity.set(this.newHumidity);
        this.setPage(PopupState.INFORMATION);
    }

    setPage(state: PopupState) {
        this.popupState = state;
    }

    cancel() {
        this.setPage(PopupState.INFORMATION);
    }
}

enum PopupState {
    INFORMATION,
    TEMPERATURE,
    HUMIDITY,
}
