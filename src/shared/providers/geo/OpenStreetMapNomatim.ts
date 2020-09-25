import { IGeoProvider } from "./IGeoProvider";
import { GeoEvent } from "../../models/geo";

var SEARCH_ENDPOINT = "https://nominatim.openstreetmap.org/search";

export class OpenStreetMapNomatim implements IGeoProvider{

    /**
     * Load Coordinates from OpenStreetMap API
     * @param {string} street 
     * @param {string} zip 
     * @param {string} city 
     * @return {Promise<GeoEvent>}
     */
    loadCoordinates(street: string, zip: string, city: string): Promise<GeoEvent> {
        return new Promise((resolve, reject) => {
            fetch(`${SEARCH_ENDPOINT}?street=${street}&postalcode=${zip}&city=${city}&format=json`)
            .then((response => response.json()))
            .then((object) => {
                let event: GeoEvent = new GeoEvent(object.lat, object.lon);
                resolve(event);
            })
            .catch(reject)
        })
    }
    
}