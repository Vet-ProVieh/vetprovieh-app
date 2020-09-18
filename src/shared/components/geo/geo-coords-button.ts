import { WebComponent } from "@tomuench/vetprovieh-shared/lib";


@WebComponent({
    extends: "button",
    tag: 'geo-button'
})
export class GeoCoordButton extends HTMLButtonElement {


    private _emitGeoCoordinates(position: Position) {
        let event = new GeoEvent(position.coords.latitude, position.coords.longitude);
        this.dispatchEvent(event)
    }

    /**
     * Geokoordniten laden
     */
    private _loadGeoCoordinates() {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this._emitGeoCoordinates,
                () => {
                    console.log("ERROR");
                }
              );
          
        }
    }
}

export class GeoEvent extends Event {

    public lat: number;
    public lon: number;

    constructor(lat: number, lon: number){
        super("geo-loaded");
        this.lat = lat;
        this.lon = lon;
    }
}