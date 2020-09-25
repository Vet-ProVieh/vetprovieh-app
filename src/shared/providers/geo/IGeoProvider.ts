import { GeoEvent } from "../../models/geo";

export interface IGeoProvider {
    /**
     * Load Coordinates from OpenStreetMap API
     * @param {string} street 
     * @param {string} zip 
     * @param {string} city 
     * @return {Promise<GeoEvent>}
    */
    loadCoordinates(street: string, zip: string, city: string): Promise<GeoEvent>;
}