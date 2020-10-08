import { BasicShowPage, GeoCoordButton, GeoMap, GpsCoordinates } from "../../../shared";
import { FarmersRepository } from "../../../farmers";
import { VetproviehSelect, VetproviehDetail } from "../../../app/main";
import { WebComponent } from "@tomuench/vetprovieh-shared/lib";
import { LoadedEvent } from "@tomuench/vetprovieh-detail/lib/loaded-event";
import { Barn } from "../../models";
import { GeoEvent } from "../../../shared/models/geo";
import { OpenStreetMapNomatim } from "../../../shared/providers/geo/OpenStreetMapNomatim";
import { IGeoProvider } from "../../../shared/providers/geo/IGeoProvider";
import { textHeights } from "ol/render/canvas";


/**
 * ShowPage
 */
@WebComponent({
    template: "",
    tag: 'vetprovieh-barn'
})
export class BarnsShowPage extends BasicShowPage {

    private geoProvider: IGeoProvider = new OpenStreetMapNomatim();

    constructor() {
        super();
    }

    connectedCallback() {
        console.log("Barn-Page");
        this.detailElement.addEventListener("loadeddata", (loadEvent: any) => {
            if(this.barn.gpsCoordinates == null) this.barn.gpsCoordinates = new GpsCoordinates(0,0);
            this.detailElement.addBeforeSavePromise(() => { return this.loadGeoCoordinates(this.barn) })
            this.bindFarmerSelectField(loadEvent);
            this.bindGeoButton(loadEvent);
        });
    }

    private _disableFarmerSelect(loadEvent: LoadedEvent, selectField: VetproviehSelect) {
        let event = loadEvent as LoadedEvent;
        if ((event.data as Barn).vvvoNumber) {
            selectField.disable();
        }
    }

    private loadGeoCoordinates(barn: Barn): Promise<any> {
        return new Promise((resolve, reject) => {
            console.log(barn);
            if (barn.gpsCoordinates?.latitude === 0 && barn.gpsCoordinates?.longitude === 0) {
                this.geoProvider.loadCoordinates(
                    `${barn.address.streetName} ${barn.address.streetNumber}`,
                    barn.address.postalCode,
                    barn.address.city).then((event) => {
                        this.processGeoEvent(event as GeoEvent);
                        resolve();
                    });
            } else {
                resolve();
            }
        });
    }

    private get barn(): Barn {
        return this.detailElement.currentObject as Barn
    }

    private processGeoEvent(geoEvent: GeoEvent) {
        this.barn.gpsCoordinates.latitude = geoEvent.lat;
        this.barn.gpsCoordinates.longitude = geoEvent.lon;

        this.addToMap(this.barn.gpsCoordinates);
    }

    /**
     * Binding GeoButton for Address
     */
    private bindGeoButton(loadEvent: any) {
        let geoButton = this.detailElement.getByIdFromShadowRoot("geoDeviceButton") as GeoCoordButton;
        if (geoButton) {

            this.addToMap(this.barn.gpsCoordinates);

            geoButton.addEventListener("geo-loaded", (event: any) => {

                this.processGeoEvent(event as GeoEvent);
            });
        } else {
            console.log("GEOBUTTON NOT FOUND");
        }
    }

    /**
     * Puts Coordinate to Map
     * @param {GpsCoordinates} coords 
     */
    private addToMap(coords: GpsCoordinates) {
        let center = new GpsCoordinates(coords.latitude, coords.longitude);
        this.geoMap.gpsCenter = center;
        this.geoMap.clearMarkers();
        this.geoMap.addMarker(center);
    }

    /**
     * Getting GeoMap
     * @return {GeoMap}
     */
    private get geoMap(): GeoMap {
        return this.detailElement.getByIdFromShadowRoot("geoMap") as GeoMap;
    }

    /**
     * Binding 
     */
    private bindFarmerSelectField(loadEvent: any) {
        let selectField: VetproviehSelect = this.detailElement.getByIdFromShadowRoot("farmer") as VetproviehSelect;
        if (selectField) {
            this._disableFarmerSelect(loadEvent as LoadedEvent, selectField);
            selectField.repository = new FarmersRepository();
        }
    }
}