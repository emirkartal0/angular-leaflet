import { WritableSignal } from '@angular/core';

export type Sensor = {
    id: string;
    name: string;
    label: string;
    isSelected: WritableSignal<boolean>;
    tempature: WritableSignal<number>;
    humidity: WritableSignal<number>;
    latitude: number;
    longitude: number;
    battery: number;
    date: Date;
};
