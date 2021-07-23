
import { WebComponent, VetproviehElement } from "@tomuench/vetprovieh-shared/lib";
import { KeyResult } from "../models/keyresult";
import { Objective } from "../models/objective";
import { KeyResultComponent } from "./keyResult";

/**
 * Controller for Page
 * pages/operations/plans/create or edit
 */
@WebComponent({
  template:
    VetproviehElement.template +
    ` 
    <style>
        .dropdown {
            position: relative;
            display: block;
        }

        .dropdown-content {
            display: none;
            position: relative;
            background-color: #f9f9f9;
            min-width: 160px;
            box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
            padding: 12px 16px;
            z-index: 1;
        }

        
    </style>

    <div class="columns is-centered">
        <div class="column is-two-thirds is-centered">
            <div class="card dropdown">
                <header class="card-header">
                    <p class="card-header-title" id="name">
                        Card header
                    </p>
                    <p class="card-header-title">Bis:&nbsp;&nbsp; 
                    <input type="date" id="until" name="trip-start" style="border: none;"
                        value="2018-07-22">
                    
                    </p>
                    <p class="card-header-icon" aria-label="more options" id="btn-dropdown">
                        <span class="icon">
                            <i class="fas fa-angle-down" aria-hidden="true" id="arrow"></i>
                        </span>
                    </p>
                </header>
                <div class="card-content dropdown-content" id="content">
                    <div class="content" id="keyResults">
                    </div>
                    <div class="columns is-gapless">
                        <div class="column">
                            <button class="button is-danger is-fullwidth">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                        <div class="column">
                            <button class="button is-info is-fullwidth">
                                <i class="fas fa-edit"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
  tag: "vp-objective-item",
})
export class ObjectiveItemComponent extends VetproviehElement {

  private _objective:Objective = new Objective();
  
  public get objective() : Objective {
    return this._objective;
  }

  public set objective(val: Objective){
    this._objective = val;
    //UI kann auf Veränderungen reagieren
    this.renderKeyResults();
  }

  private renderKeyResults(){
    let container = this.keyResultsContainer();
    container.innerHTML = "";
    this.objective.keyResults.forEach((keyResult) => {
        this.addKeyResult(keyResult);
    })
  }

  private addKeyResult(keyResult: KeyResult){
    let container = this.keyResultsContainer();
    let keyResultItem = new KeyResultComponent();
    keyResultItem.keyResult = keyResult;
    container.appendChild(keyResultItem);
  }


  constructor() {
    super();
  }

  connectedCallback(){
    /*Styling of dropdowns*/
    let cardBody = this.shadowRoot?.getElementById("content") as HTMLElement;
    let btn = this.shadowRoot?.getElementById("btn-dropdown") as HTMLElement;
    let arrow = this.shadowRoot?.getElementById("arrow") as HTMLElement;
    cardBody.style.display = "none";

    btn.addEventListener("click", () => {
        if(cardBody.style.display == "none"){
            cardBody.style.display = "block";
            arrow.style.transform = "rotate(180deg)";
        }else{
            cardBody.style.display = "none";
            arrow.style.transform = "rotate(0deg)";
        }
    });
    console.log(this.objective);
    this.setAttributes();
  }

  private setAttributes(){
      (this.shadowRoot?.getElementById("name") as HTMLElement).innerText = this.objective.name;
  }

  private keyResultsContainer(){
      return this.shadowRoot?.getElementById("keyResults") as HTMLElement;
  }


  

}
