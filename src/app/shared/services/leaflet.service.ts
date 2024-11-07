import { Injectable } from '@angular/core';
import * as Leaflet from 'leaflet';

@Injectable({
  providedIn: 'root',
})
export class LeafletService {

  protected map!: Leaflet.Map;

  constructor() {}
}
