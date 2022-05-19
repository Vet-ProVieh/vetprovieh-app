import {LoadedEvent} from '@tomuench/vetprovieh-detail/lib/loaded-event';
import {WebComponent} from '@tomuench/vetprovieh-shared/lib';
import {VetproviehSelect} from '../../../app/main';
import {FarmersRepository} from '../../../farmers';
import {OpenObjectivesButton} from '../../../measures';
import {BasicShowPage, GeoCoordButton, GeoMap, GpsCoordinates} from '../../../shared';
import {GeoEvent} from '../../../shared/models/geo';
import {IGeoProvider} from '../../../shared/providers/geo/IGeoProvider';
import {OpenStreetMapNomatim} from '../../../shared/providers/geo/OpenStreetMapNomatim';
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
     * DEfault-Constructor
     */
    constructor() {
      super();
    }

    /**
     * Callback for Web-Component
     */
    connectedCallback() {
      this.detailElement.addEventListener('loadeddata', (loadEvent: any) => {
        if (this.barn.gpsCoordinates == null) this.barn.gpsCoordinates = new GpsCoordinates(0, 0);
        this.detailElement.addBeforeSavePromise(() => {
          return this.loadGeoCoordinates(this.barn);
        });

        if (this.barn.lastVet == undefined) {
          this.userRepository.loadProfile().then((user) => {
            this.barn.lastVet = user;
          });
        }
        this.bindFarmerSelectField(loadEvent);
        this.bindGeoButton();

            this.detailElement.shadowRoot?.querySelectorAll('open-objectives').forEach((element: any) => {
              const button = element as OpenObjectivesButton;
              button.amount = this.barn.currentMeasure;
              if (this.barn.id) button.barnid = +this.barn.id;
            });
      });
    }

    /**
     * Disable Farmer-Select
     * @param {LoadedEvent} loadEvent
     * @param {VetproviehSelect} selectField
     */
    private _disableFarmerSelect(loadEvent: LoadedEvent, selectField: VetproviehSelect) {
      const event = loadEvent as LoadedEvent;
      if ((event.data as Barn).id) {
        selectField.disable();
      }
    }

    /**
     * Loading Geocords
     * @param {Barn} barn
     * @return {Promise<any>}
     */
    private loadGeoCoordinates(barn: Barn): Promise<any> {
      return new Promise((resolve, reject) => {
        console.log(barn);
        if (barn.gpsCoordinates?.latitude === 0 && barn.gpsCoordinates?.longitude === 0) {
          this.geoProvider.loadCoordinates(
              `${barn.address.streetName} ${barn.address.streetNumber}`,
              barn.address.postalCode,
              barn.address.city).then((event) => {
            this.processGeoEvent(event as GeoEvent);
            resolve(true);
          });
        } else {
          resolve(false);
        }
      });
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
      const geoButton = this.detailElement.getByIdFromShadowRoot('geoDeviceButton') as GeoCoordButton;
      if (geoButton) {
        this.addToMap(this.barn.gpsCoordinates);

        geoButton.addEventListener('geo-loaded', (event: any) => {
          this.processGeoEvent(event as GeoEvent);
        });
      } else {
        console.log('GEOBUTTON NOT FOUND');
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
     * Binding
     * @param {any} loadEvent
     */
    private bindFarmerSelectField(loadEvent: any) {
      const selectField: VetproviehSelect = this.detailElement
          .getByIdFromShadowRoot('farmer') as VetproviehSelect;
      if (selectField) {
        this._disableFarmerSelect(loadEvent as LoadedEvent, selectField);
        selectField.repository = new FarmersRepository();
      }
    }
}
