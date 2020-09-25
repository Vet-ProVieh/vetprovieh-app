import { GeoHelper } from "@tomuench/vetprovieh-shared/lib";
import { Coordinate } from "ol/coordinate";

export class GpsCoordinates {
    latitude : number = 0;
    longitude : number = 0;

    /**
     * Default-Constructor
     * @param {number} lat 
     * @param {number} long 
     */
    constructor(lat:number = 0, long:number = 0){
        this.latitude = lat;
        this.longitude = long;
    }

    public static createFromOpenLayers(input: Coordinate): GpsCoordinates {
        return new GpsCoordinates(input[1], input[0])
    }

    /**
     * Equals coordinate from OpenLayer?
     * @param {Coordinate} input 
     */
    public equals(input:Coordinate) : boolean{
        return (this.latitude === input[1]|| this.longitude === input[0]);
    }

    /**
     * Calculate Distance between two GpsCoordinates
     * @param {GpsCoordinates} b 
     */
    public distanceTo(b: GpsCoordinates) : number{
        return GeoHelper.calculateDistance(
            this.latitude,
            this.longitude,
            b.latitude,
            b.longitude);
    }


    /**
     * Load current GPS-Koordinates
     */
    public static get currentGpsCoordinates() : Promise<GpsCoordinates> {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition((result) => {
                resolve(new GpsCoordinates(result.coords.latitude, result.coords.longitude))
            }, (error) => {
                reject(null);
            })
        });
        
    }
}