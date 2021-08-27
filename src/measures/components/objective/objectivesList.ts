import {VetproviehBasicList} from '@tomuench/vetprovieh-list/lib/vetprovieh-basic-list';
import {VetproviehElement, VetproviehNavParams, WebComponent} from '@tomuench/vetprovieh-shared/lib';
import {ObjectivesRepository} from '../../repository';

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
                        <div class="column is-1">
                            <strong>Id</strong>
                        </div>
                        <div class="column">
                            <strong>Name</strong>
                        </div>
                        <div class="column is-2">
                            <strong>Bewertung</strong>
                        </div>
                    </div>
                </div>
                <!-- Listing Elements here -->
                <div id="listElements" style="margin-top:20px;">
                </div>
                <!-- Pager for Paging through List-->
                <vetprovieh-pager id="pager" page="1" maximum="7">
                </vetprovieh-pager>`,
  tag: 'objectives-list',
})
export class ObjectivesListComponent extends VetproviehBasicList {
  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this.repository = new ObjectivesRepository(VetproviehNavParams.getUrlParameter('barnId'));
  }

  protected elementSelected(event:any) {
    const checkbox = event.target.querySelector('input[type=\'checkbox\']');
    if (checkbox) checkbox.checked = !checkbox.checked;

    super.elementSelected(event);
  }
}
