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
                <div id="header" class="is-hidden-touch">
                    <div class="columns is-mobile">
                        <div class="column">
                            <strong>Id</strong>
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
                        <div class="column is-1">
                            <strong>Aktionen</strong>
                        </div>
                    </div>
                </div>
                <!-- Listing Elements here -->
                <div id="listElements" style="margin-top:20px;">
                </div>
                <!-- Pager for Paging through List-->
                <vetprovieh-pager id="pager" page="1" maximum="7">
                </vetprovieh-pager>`,
    tag: "measures-list"
})
export class MeasuresList extends VetproviehBasicList {
  
    connectedCallback(){
        super.connectedCallback();
        this.addEventListener("selected",(event) => {
            let target = event.target as HTMLElement;
            window.location.href = `show.html?id=${(event as any).data.id}`
        })
    }
}