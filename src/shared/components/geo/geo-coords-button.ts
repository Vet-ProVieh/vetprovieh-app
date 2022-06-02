import {Indexable, WebComponent} from '@vetprovieh/vetprovieh-shared';
import {GeoEvent} from '../../models/geo';

// eslint-disable-next-line new-cap
@WebComponent({
  extends: 'button',
  tag: 'geo-button',
})
/**
 * Load GeoCord Button
 */
export class GeoCoordButton extends HTMLButtonElement {
    // Type of loading
    private _loadType: GeoButtionType = GeoButtionType.device;

    /**
     * Observed Attributes
     * @return {string[]}
     */
    static get observedAttributes() : string[] {
      return ['loadType'];
    }

    /**
     * Default-Constructor
     */
    constructor() {
      super();
      this.addEventListener('click', () => {
        this._loadGeoCoordinates();
      });
    }

    /**
    * Callback Implementation
    * @param {string} name
    * @param {any} old
    * @param {any} value
    */
    attributeChangedCallback(name: string, old: any, value: any) {
      if (old !== value) {
        (this as Indexable)[name] = value;
      }
    }

    /**
     * Setter
     * @param {GeoButtionType} value
     */
    public set loadType(value: GeoButtionType) {
      if (value !== this.loadType) {
        this._loadType = value;
      }
    }

    /**
     * Getter
     * @return {GeoButtionType}
     */
    public get loadType() {
      return this._loadType;
    }

    /**
     * Emit Event to the outside
     * @param {any} position
     */
    private _emitGeoCoordinates(position: any) {
      const event = new GeoEvent(
          position.coords.latitude,
          position.coords.longitude);
      this.dispatchEvent(event);
    }

    /**
     * Load Geocoordinates dependent on loadTyp
     */
    private _loadGeoCoordinates() {
      if (this.loadType === GeoButtionType.device) {
        this.loadCoordinatesFromDevice();
      }
    }

    /**
     * Load Coordinates from device
     */
    private loadCoordinatesFromDevice() {
      if (navigator.geolocation) {
        navigator.geolocation
            .getCurrentPosition(this._emitGeoCoordinates.bind(this),
                () => console.log('ERROR'));
      }
    }
}


enum GeoButtionType {
    device = 'device'
}
