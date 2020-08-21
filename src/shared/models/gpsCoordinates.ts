import { GeoHelper } from "@tomuench/vetprovieh-shared/lib";

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
                resolve(new GpsCoordinates())
            }, (error) => {
                reject(null);
            })
        });
        
    }
}