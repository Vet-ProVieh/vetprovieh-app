import { WebComponent, Indexable } from "@tomuench/vetprovieh-shared/lib";
import { GeoEvent } from "../../models/geo";
import { IGeoProvider } from "../../providers/geo/IGeoProvider";
import { OpenStreetMapNomatim } from "../../providers/geo/OpenStreetMapNomatim";



@WebComponent({
    extends: "button",
    tag: 'geo-button'
})
export class GeoCoordButton extends HTMLButtonElement {

    // GeoProvider to load remote-Coordinates
    private geoProvider: IGeoProvider = new OpenStreetMapNomatim();

    // Type of loading
    private _loadType: GeoButtionType = GeoButtionType.device;

    /**
     * Observed Attributes
     */
    static get observedAttributes() {
        return ['loadType'];
    }

    constructor() {
        super();
        this.addEventListener("click", () => {
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
     * @param position 
     */
    private _emitGeoCoordinates(position: Position) {
        let event = new GeoEvent(position.coords.latitude, position.coords.longitude);
        console.log(event);
        this.dispatchEvent(event)
    }

    /**
     * Load Geocoordinates dependent on loadTyp
     */
    private _loadGeoCoordinates() {
        switch (this.loadType) {
            case GeoButtionType.device:
                this.loadCoordinatesFromDevice();
                break;
            case GeoButtionType.openstreet:
                this.loadCoordinatesFromService();
                break;
        }
    }

    /**
     * Load Coordinates from device
     */
    private loadCoordinatesFromDevice() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this._emitGeoCoordinates.bind(this),
                () => console.log("ERROR"));

        }
    }

    private loadCoordinatesFromService() {
        // this.geoProvider.loadCoordinates()
    }
}


enum GeoButtionType {
    device = "device",
    openstreet = "openstreet"
}