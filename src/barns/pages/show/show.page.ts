import {LoadedEvent} from '@vetprovieh/vetprovieh-detail';
import {WebComponent} from '@vetprovieh/vetprovieh-shared';
import {VetproviehSelect} from '../../../app/main';
import {FarmersRepository} from '../../../farmers';
import {OpenObjectivesButton} from '../../../measures';
import {
  BasicShowPage,
  GeoCoordButton,
  GeoMap,
  GpsCoordinates,
} from '../../../shared';
import {GeoEvent} from '../../../shared/models/geo';
import {IGeoProvider} from '../../../shared/providers/geo/IGeoProvider';
import {
  OpenStreetMapNomatim,
} from '../../../shared/providers/geo/OpenStreetMapNomatim';
import {UserRepository} from '../../../users';
import {Barn} from '../../models';


// eslint-disable-next-line new-cap
@WebComponent({
  template: '',
  tag: 'vetprovieh-barn',
})
/**
 * Barn Show Page
 */
export class BarnsShowPage extends BasicShowPage {
    private geoProvider: IGeoProvider = new OpenStreetMapNomatim();

    private userRepository: UserRepository = new UserRepository();


    /**
     * Callback for Web-Component
     */
    connectedCallback() {
      this.detailElement.addEventListener('loadeddata', (loadEvent: any) => {
        if (this.barn.gpsCoordinates === null) {
          this.barn.gpsCoordinates = new GpsCoordinates(0, 0);
        }
        this.detailElement.addBeforeSavePromise(() => {
          return this.loadGeoCoordinates(this.barn);
        });

        this.setLastUser();
        this.bindFarmerSelectField(loadEvent);
        this.bindGeoButton();

        if (this.detailElement.shadowRoot) {
          this.detailElement
              .shadowRoot.querySelectorAll('open-objectives')
              .forEach((element: any) => {
                const button = element as OpenObjectivesButton;
                button.amount = this.barn.currentMeasure;
                if (this.barn.id) button.barnid = +this.barn.id;
              });
        }
      });
    }

    /**
     * Setting last user to barn
     */
    private async setLastUser() {
      if (this.barn.lastVet === undefined) {
        const user = await this.userRepository.loadProfile();
        this.barn.lastVet = user;
      }
    }

    /**
     * Disable Farmer-Select
     * @param {LoadedEvent} loadEvent
     * @param {VetproviehSelect} selectField
     */
    private _disableFarmerSelect(
        loadEvent: LoadedEvent,
        selectField: VetproviehSelect) {
      if ((loadEvent.data as Barn).id) {
        selectField.disable();
      }
    }

    /**
     * Loading Geocords
     * @param {Barn} barn
     * @return {Promise<any>}
     */
    private async loadGeoCoordinates(barn: Barn): Promise<any> {
      if (barn.gpsCoordinates?.latitude === 0 &&
          barn.gpsCoordinates?.longitude === 0) {
        const event = await this.geoProvider.loadCoordinates(
            `${barn.address.streetName} ${barn.address.streetNumber}`,
            barn.address.postalCode,
            barn.address.city);
        this.processGeoEvent(event);
        return true;
      } else {
        throw new Error('No Coords');
      }
    }

    /**
     * Getting Barn
     * @return {Barn}
     */
    private get barn(): Barn {
      return this.detailElement.currentObject as Barn;
    }

    /**
     * Process GeoEvent for Barn
     * @param {GeoEvent} geoEvent
     */
    private processGeoEvent(geoEvent: GeoEvent) {
      this.barn.gpsCoordinates.latitude = geoEvent.lat;
      this.barn.gpsCoordinates.longitude = geoEvent.lon;

      this.addToMap(this.barn.gpsCoordinates);
    }

    /**
     * Binding GeoButton for Address
     */
    private bindGeoButton() {
      const geoButton = this.detailElement
          .getByIdFromShadowRoot('geoDeviceButton') as GeoCoordButton;
      if (geoButton) {
        this.addToMap(this.barn.gpsCoordinates);

        geoButton.addEventListener('geo-loaded', (event: any) => {
          this.processGeoEvent(event as GeoEvent);
        });
      }
    }

    /**
     * Puts Coordinate to Map
     * @param {GpsCoordinates} coords
     */
    private addToMap(coords: GpsCoordinates) {
      const center = new GpsCoordinates(coords.latitude, coords.longitude);
      this.geoMap.gpsCenter = center;
      this.geoMap.clearMarkers();
      this.geoMap.addMarker();
    }

    /**
     * Getting GeoMap
     * @return {GeoMap}
     */
    private get geoMap(): GeoMap {
      return this.detailElement.getByIdFromShadowRoot('geoMap') as GeoMap;
    }

    /**
     * Get FarmerSelect
     * @return {VetproviehSelect}
     */
    private get farmerSelect(): VetproviehSelect {
      return this.detailElement
          .getByIdFromShadowRoot('farmer') as VetproviehSelect;
    }

    /**
     * Binding
     * @param {any} loadEvent
     */
    private bindFarmerSelectField(loadEvent: any) {
      const selectField = this.farmerSelect;
      if (selectField) {
        this._disableFarmerSelect(loadEvent as LoadedEvent, selectField);
        selectField.repository = new FarmersRepository();
      }
    }
}
