import { BasicShowPage, GeoCoordButton } from "../../../shared";
import { FarmersRepository } from "../../../farmers";
import { VetproviehSelect, VetproviehDetail } from "../../../app/main";
import { WebComponent } from "@tomuench/vetprovieh-shared/lib";
import { LoadedEvent } from "@tomuench/vetprovieh-detail/lib/loaded-event";
import { Barn } from "../../models";
import { GeoEvent } from "../../../shared/models/geo";


/**
 * ShowPage
 */
@WebComponent({
    template: "",
    tag: 'vetprovieh-barn'
})
export class BarnsShowPage extends BasicShowPage {


    constructor() {
        super();
    }

    connectedCallback() {
        console.log("Barn-Page");

        this.detailElement.addEventListener("loadeddata", (loadEvent: any) => {
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

    /**
     * Binding GeoButton for Address
     */
    private bindGeoButton(loadEvent: any) {
        let geoButton = this.detailElement.getByIdFromShadowRoot("geoDeviceButton") as GeoCoordButton;
        if (geoButton) {
            let barn = this.detailElement.currentObject as Barn;

            geoButton.addEventListener("geo-loaded", (event: any) => {
                let geoEvent = event as GeoEvent;
                barn.gpsCoordinates.latitude = geoEvent.lat;
                barn.gpsCoordinates.longitude = geoEvent.lon;
            });
        } else {
            console.log("GEOBUTTON NOT FOUND");
        }
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