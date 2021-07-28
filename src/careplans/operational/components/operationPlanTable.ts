import { VetproviehBasicList } from "@tomuench/vetprovieh-list/lib/vetprovieh-basic-list";
import { VetproviehElement, WebComponent } from "@tomuench/vetprovieh-shared/lib";

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
                    <div class="columns">
                        <div class="column is-1">
                            <strong>Auswahl?</strong>
                        </div>
                        <div class="column is-1">
                            <strong>Datum</strong>
                        </div>
                        <div class="column">
                            <strong>Behandlungsplan</strong>
                        </div>
                        <div class="column">
                            <strong>Landwirt/Stall</strong>
                        </div>
                        <div class="column">
                            <strong>Diagnose</strong>
                        </div>
                        <div class="column">
                            <strong>Behandlung</strong>
                        </div>
                        <div class="column">
                            <strong>Ausgeführt von</strong>
                        </div>
                    </div>
                <!-- Listing Elements here -->
                <div id="listElements" style="margin-top:20px;">
            
                </div>
                <!-- Pager for Paging through List-->
                <vetprovieh-pager id="pager" page="1" maximum="7">
                </vetprovieh-pager>`,
    tag: "opplan-table"
})
export class OperationPlanTable extends VetproviehBasicList {
  
}
