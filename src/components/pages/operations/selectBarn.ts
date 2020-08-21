import { VetproviehList } from '@tomuench/vetprovieh-list/lib/vetprovieh-list';
import { Barn } from '../../models/barn';
import { GpsCoordinates } from '../../models/gpsCoordinates';



/**
 * Barn Selection
 */
export class SelectBarn extends VetproviehList {

    private currentGpsPosition: GpsCoordinates | undefined;

    private calculatedDistances: { [key: number]: number } = {};

    constructor() {
        super();

        this._loadCurrentGpsCoordinates();
        this.calculateDistances();
    }

    /**
     * Calculation Distances with forceReload
     */
    private calculateDistances() {
    /*    setInterval(() => {
            if (this._data) {
                this._data.forEach((b: Barn) => this.calcDistance(b, true));
            }
        },60 * 1000);*/
    }

    /**
     * Calculate and Store Distance for one Barn
     * @param {Barn} barn 
     * @param {Boolean} forceReload 
     * @return {number}
     */
    private calcDistance(barn: Barn, forceReload: Boolean = false): number {
        if (barn && barn.id && this.currentGpsPosition) {
            let currentDistance = this.calculatedDistances[barn.id];
            if (!forceReload && currentDistance >= 0) {
                return currentDistance;
            } else {
                const distance = barn.gpsCoordinates.distanceTo(this.currentGpsPosition);
                this.calculatedDistances[barn.id] = distance;
                return distance;
            }
        } else {
            return 0;
        }
    }

    /**
     * Sorting Data. can be overwritten
     * @param {Array<Barn>} data 
     */
    protected _sort(data: Barn[]) {
        if (this.currentGpsPosition != undefined) {
            data.sort((a: Barn, b: Barn) => {
                const distanceA = this.calcDistance(a);
                const distanceB = this.calcDistance(b);
                return distanceA - distanceB
            });
        } else {
            return data;
        }
    }


    /**
     * Loading current GPS-Coordinates
     */
    private _loadCurrentGpsCoordinates() {
        GpsCoordinates.currentGpsCoordinates
            .then((pos: GpsCoordinates) => {
                this.currentGpsPosition = pos;
            })
    }

}

customElements.define('vp-select-barn', SelectBarn);