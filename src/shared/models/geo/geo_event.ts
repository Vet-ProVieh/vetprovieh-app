
export class GeoEvent extends Event {

    public lat: number;
    public lon: number;

    constructor(lat: number, lon: number){
        super("geo-loaded");
        this.lat = lat;
        this.lon = lon;
    }
}