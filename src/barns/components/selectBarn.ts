import { VetproviehBasicList } from '@tomuench/vetprovieh-list/lib/vetprovieh-basic-list';
import { GpsCoordinates } from '../../shared';
import { Barn } from '../models';
import { WebComponent, VetproviehElement, GeoHelper } from '@tomuench/vetprovieh-shared/lib';
import { BarnsRepository } from '../repository';



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

    private calculatedDistances: { [key: string]: number } = {};


    constructor() {
        super();

        this.repository = new BarnsRepository();

        this._loadCurrentGpsCoordinates().then((res) => {
            this.calculateDistances();
            this._filterObjects();
        });

    }

    /**
     * Calculation Distances with forceReload
     */
    private calculateDistances() {
        setInterval(() => {
            if (this.objects) {
                this._loadCurrentGpsCoordinates().then((res) => {
                    this.objects.forEach((b: Barn) => this.calcDistance(b, true));
                    this._filterObjects();
                });
            }
        }, 10 * 1000);
    }

    /**
     * Calculate and Store Distance for one Barn
     * @param {Barn} barn 
     * @param {Boolean} forceReload 
     * @return {number}
     */
    private calcDistance(barn: Barn, forceReload: Boolean = false): number {
        if (barn && barn.vvvoNumber && this.currentGpsPosition) {
            let currentDistance = this.calculatedDistances[barn.vvvoNumber];
            if (!forceReload && currentDistance >= 0) {
                (barn as any).distance = Math.round(currentDistance / 10.00) / 100.00;
                return currentDistance;
            } else if (barn.gpsCoordinates) {
                const distance = GeoHelper.calculateDistance(
                    barn.gpsCoordinates.latitude,
                    barn.gpsCoordinates.longitude,
                    this.currentGpsPosition.latitude,
                    this.currentGpsPosition.longitude)
                this.calculatedDistances[barn.vvvoNumber] = distance;
                (barn as any).distance = Math.round(distance / 10.00) / 100.00;
                return distance;
            } else {
                // TODO Really Zero? Without GPS-Coordinates no destination
                return 0;
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
            return data.sort((a: Barn, b: Barn) => {
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
        return new Promise((resolve, reject) => {
            GpsCoordinates.currentGpsCoordinates
                .then((pos: GpsCoordinates) => {
                    this.currentGpsPosition = pos;
                    resolve();
                })
        });
    }

}