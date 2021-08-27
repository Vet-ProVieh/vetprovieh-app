
/**
 * GeoEvent for retriving Geo-Coordinates
 */
export class GeoEvent extends Event {
    public lat: number;
    public lon: number;

    /**
     * Constructor
     * @param {number} lat
     * @param {number} lon
     */
    constructor(lat: number, lon: number) {
      super('geo-loaded');
      this.lat = lat;
      this.lon = lon;
    }
}
