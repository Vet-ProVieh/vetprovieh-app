import {BasicShowPage, GeoCoordButton, GeoMap, GpsCoordinates} from '../../../shared';
import {FarmersRepository} from '../../../farmers';
import {VetproviehSelect, VetproviehDetail} from '../../../app/main';
import {WebComponent} from '@tomuench/vetprovieh-shared/lib';
import {LoadedEvent} from '@tomuench/vetprovieh-detail/lib/loaded-event';
import {Drugtreatment} from '../../models';
import {GeoEvent} from '../../../shared/models/geo';
import {OpenStreetMapNomatim} from '../../../shared/providers/geo/OpenStreetMapNomatim';
import {IGeoProvider} from '../../../shared/providers/geo/IGeoProvider';
import {textHeights} from 'ol/render/canvas';
import {UserRepository} from '../../../users';
import {User} from '../../../users/models';
import {OpenObjectivesButton} from '../../../measures';


/**
 * ShowPage
 */
@WebComponent({
  template: '',
  tag: 'vetprovieh-drugtreatment',
})
/**
 * Drugtreatment Show Page
 */
export class DrugtreatmentShowPage extends BasicShowPage {

    /**
     * Default-Constructor
     */
    constructor() {
      super();
    }

    /**
     * Callback for Web-Component
     */
    connectedCallback() {
      this.detailElement.addEventListener('loadeddata', (loadEvent: any) => {
        
        
      });
    }

    /**
     * Getting Drugtreatment
     * @return {Drugtreatment}
     */
    private get drugtreatment(): Drugtreatment {
      return this.detailElement.currentObject as Drugtreatment;
    }


    /**
     * Getting GeoMap
     * @return {GeoMap}
     */
    private get geoMap(): GeoMap {
      return this.detailElement.getByIdFromShadowRoot('geoMap') as GeoMap;
    }

}
