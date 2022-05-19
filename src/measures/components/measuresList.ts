import {
  VetproviehBasicList,
} from '@tomuench/vetprovieh-list/lib/vetprovieh-basic-list';
import {VetproviehElement, WebComponent} from '@tomuench/vetprovieh-shared/lib';

// eslint-disable-next-line new-cap
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
                #header {
                    margin-top: 15px;
                }

                </style>

                <!-- SearchControl on Top -->
                <div id="searchControl" class="control">
                    <input id="search" class="input" type="text"
                            placeholder="Bitte Suchbegriff eingeben">
                </div>
                <div id="header" class="is-hidden-touch">
                    <div class="columns is-mobile">
                        <div class="column">
                            <strong>Id</strong>
                        </div>
                        <div class="column">
                            <strong>Abgeschlossen?</strong>
                        </div>
                        <div class="column">
                            <strong>Datum</strong>
                        </div>
                        <div class="column">
                            <strong>Tierhalter / Stall</strong>
                        </div>
                        <div class="column">
                            <strong>Ausgefüllt von</strong>
                        </div>
                    </div>
                </div>
                <!-- Listing Elements here -->
                <div id="listElements" style="margin-top:20px;">
                </div>
                <!-- Pager for Paging through List-->
                <vetprovieh-pager id="pager" page="1" maximum="7">
                </vetprovieh-pager>`,
  tag: 'measures-list',
})
/**
 * Measures-List
 */
export class MeasuresList extends VetproviehBasicList {
   private _sublink = '';

   /**
    * Getter sublink
    * @return {string}
    */
   public get sublink() : string {
     return this._sublink;
   }

   /**
    * setter sublink
    * @param {string} v
    */
   public set sublink(v : string) {
     if (this._sublink !== v) {
       this._sublink = v;
     }
   }

   /**
    * ConnectedCallback
    */
   connectedCallback() {
     super.connectedCallback();
     this.addEventListener('selected', (event) => {
       const customEvent = (event as CustomEvent);
       const href = `show.html?id=${customEvent.detail.id}&${this.sublink}`;
       window.location.href = href;
     });
   }

   /**
     * Getting observed Attributes
     * @return {string[]}
     */
   static get observedAttributes() {
     return ['pagesize', 'searchable', 'pageable', 'sublink'];
   }
}
