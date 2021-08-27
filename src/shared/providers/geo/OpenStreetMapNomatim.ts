import {GeoEvent} from '../../models/geo';
import {IGeoProvider} from './IGeoProvider';

const SEARCH_ENDPOINT = 'https://nominatim.openstreetmap.org/search';

/**
 * Connection to OpenStreetMap
 */
export class OpenStreetMapNomatim implements IGeoProvider {
  /**
     * Load Coordinates from OpenStreetMap API
     * @param {string} street
     * @param {string} zip
     * @param {string} city
     * @return {Promise<GeoEvent>}
     */
  loadCoordinates(street: string,
      zip: string,
      city: string): Promise<GeoEvent> {
    return new Promise((resolve, reject) => {
      fetch(this.buildCordsEndpoint(street, zip, city))
          .then(((response) => response.json()))
          .then((objects) => {
            const e: GeoEvent = new GeoEvent(objects[0].lat, objects[0].lon);
            resolve(e);
          })
          .catch(reject);
    });
  }

  /**
   * Building Coordinates Endpoint
   * @param {string} street
   * @param {string} zip
   * @param {string} city
   * @return {string}
   */
  private buildCordsEndpoint(street: string,
      zip: string,
      city: string) : string {
    let endpoint = `${SEARCH_ENDPOINT}?street=${street}`;
    endpoint += `&postalcode=${zip}&city=${city}&format=json`;
    return endpoint;
  }
}
