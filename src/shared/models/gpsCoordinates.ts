import {GeoHelper} from '@vetprovieh/vetprovieh-shared';
import {Coordinate} from 'ol/coordinate';

/**
 * Class for GPS-Coordinates
 */
export class GpsCoordinates {
    latitude = 0;
    longitude = 0;

    /**
     * Default-Constructor
     * @param {number} lat
     * @param {number} long
     */
    constructor(lat = 0, long = 0) {
      this.latitude = lat;
      this.longitude = long;
    }

    /**
     * Create from Openlayers
     * @param {Coordinate} input
     * @return {GpsCoordinates}
     */
    public static createFromOpenLayers(input: Coordinate): GpsCoordinates {
      return new GpsCoordinates(input[1], input[0]);
    }

    /**
     * Equals coordinate from OpenLayer?
     * @param {Coordinate} input
     * @return {boolean}
     */
    public equals(input: Coordinate): boolean {
      return (this.latitude === input[1] || this.longitude === input[0]);
    }

    /**
     * Calculate Distance between two GpsCoordinates
     * @param {GpsCoordinates} b
     * @return {number}
     */
    public distanceTo(b: GpsCoordinates): number {
      return GeoHelper.calculateDistance(
          this.latitude,
          this.longitude,
          b.latitude,
          b.longitude);
    }

    /**
     * Load current GPS-Koordinates
     * @return {Promise<GpsCoordinates>}
     */
    public static get currentGpsCoordinates(): Promise<GpsCoordinates> {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((result) => {
          const cords = new GpsCoordinates(result.coords.latitude,
              result.coords.longitude);
          resolve(cords);
        }, (error) => {
          reject(error);
        });
      });
    }

    /**
     * Are the Coordinates empty?
     * @param {GpsCoordinates} coords
     * @return {boolean}
     */
    public static empty(coords: GpsCoordinates): boolean {
      if (coords) {
        return !!coords.latitude && coords.latitude === 0 ||
               !!coords.longitude && coords.longitude === 0;
      } else {
        return false;
      }
    }
}
