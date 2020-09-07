import { VetproviehBasicList } from '@tomuench/vetprovieh-list/lib/vetprovieh-basic-list';
import { GpsCoordinates } from '../../shared';
import { Barn } from '../models';
import { WebComponent, VetproviehElement } from '@tomuench/vetprovieh-shared/lib';



/**
 * Barn Selection
 */
@WebComponent({
    template: VetproviehElement.template + `<style>
                :host {
                    display: block;
                }
                #listElements div{
                    cursor: pointer;
                }
                #listElements div:hover {
                    background-color: #F0F0F0 !important;
                }
                </style>
            
                <!-- SearchControl on Top -->
                <div id="searchControl" class="control">
                <input id="search" class="input" type="text" 
                        placeholder="Bitte Suchbegriff eingeben">
                </div>
            
                <!-- Listing Elements here -->
                <div id="listElements" style="margin-top:20px;">
            
                </div>
                <!-- Pager for Paging through List-->
                <vetprovieh-pager id="pager" page="1" maximum="7">
                </vetprovieh-pager>`,
        tag: 'vp-select-barn'
})
export class SelectBarn extends VetproviehBasicList {

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
                console.log(currentDistance);
                return currentDistance;
            } else {
                const distance = barn.gpsCoordinates.distanceTo(this.currentGpsPosition);
                this.calculatedDistances[barn.id] = distance;
                console.log(distance);
                return distance;
            }
        } else {
            console.log("zero");
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