import {VetproviehBasicList} from '@tomuench/vetprovieh-list/lib/vetprovieh-basic-list';
import {VetproviehElement, VetproviehTable, WebComponent} from '@tomuench/vetprovieh-shared/lib';

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
                <div id="header">
                </div>
                <!-- Listing Elements here -->
                <div id="listElements" style="margin-top:20px;">

                </div>
                <!-- Pager for Paging through List-->
                <vetprovieh-pager id="pager" page="1" maximum="7">
                </vetprovieh-pager>`,
  tag: 'drugtreatment-table',
})
export class DrugtreatmentTable extends VetproviehTable {
    private _header: HTMLElement;
    constructor() {
      super();
      this._header = this.querySelector('#header') as HTMLElement;
    }

    /**
     * Connected Callback
     */
    connectedCallback() {
      super.connectedCallback();
      if (this._header) this.shadowRoot?.getElementById('header')?.appendChild(this._header);
    }
}
