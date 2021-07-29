import { WebComponent, VetproviehElement, VetproviehNavParams } from "@tomuench/vetprovieh-shared/lib";
import { ObjectiveModal } from "./objective-modal";
import { Objective } from "../models/objective";
import { ObjectiveItemComponent } from "./objectiveItem";
import { toStringHDMS } from "ol/coordinate";

/**
 * Controller for Page
 * pages/operations/plans/create or edit
 */
@WebComponent({
  template:
    VetproviehElement.template +
    ` 
    <style>
      .padding-15{
        padding: 15px;
      }
    </style>
    <div id="group">
        <div id="detail" class="container">
          <div class="columns is-mobile padding-15">
              <div class="column">
                <select-button id="loadMeasure" href="/measures/select.html?barnId=\${this.barnId}" name="Maßnahmen laden">
                </select-button>              
              </div>
              <div class="column">
                <button id="addMeasure" 
                        class="button is-info is-fullwidth" 
                        type="button">
                        Maßnahme manuell einfügen
                </button>
              </div>
            </div>
        </div>
        <hr/>
        <div id="objectives" class="padding-15">
          <h4 class="subtitle is-4">Antibiotika Maßnahmen</h4>
          <div id="antibiotics">

          </div>
          <br>
          <h4 class="subtitle is-4">Tierwohl Maßnahmen</h4>
          <div id="welfare">

          </div>
        </div>
    </div>
    `,
  tag: "vp-objectives",
})
export class ObjectivesComponent extends VetproviehElement {

  private _objectives: Objective[] = [];
  private _barnId: string = "";


  public get objectives(): Objective[] {
    return this._objectives;
  }

  public set objectives(val: Objective[]) {
    console.log("set objectives");
    this._objectives = val;
    this.renderObjectives();
  }


  constructor() {
    super(true,false);

    let params = VetproviehNavParams.get("MeasureIntializeParams");
    console.log(params);
    this.barnId = params.barnId;
    
    this.render();
  }

  
  static get observedAttributes() {
    return  ["objectives"];
}


  /**
   * Connected-Callback
   */
  connectedCallback() {
    this.bindManualAddButton();

  }


  private set barnId(value: string) {
    if (this._barnId !== value) {
      this._barnId = value;
    }
  }

  public get barnId(): string {
    return this._barnId;
  }

  /**
   * Rendering objectives First Time
   */
  renderObjectives() {
    let container = this.antibioticsContainer();
    container.innerHTML = "";
    // TODO welfare container
    this.objectives?.forEach((objective) => this.addObjective(objective));
  }

  /**
   * Adding Objective to Container
   * @param {Objective} objective 
   */
  private addObjective(objective: Objective) {
    let objectiveItem = new ObjectiveItemComponent();
    this.objectives.push(objective);
    objectiveItem.objective = objective;
    objectiveItem.addEventListener("delete", (event) => {
      let index = this.objectives.findIndex((x) => x == (event as CustomEvent).detail)
      if (index >= 0) {
        this.objectives.splice(index, 1);
        objectiveItem.remove();
      }
    });
    this.selectContainer(objective)?.appendChild(objectiveItem);
  }

  /**
   * Select Display-Container
   * @param {Objective} objective 
   * @returns {HTMLElement}
   */
  private selectContainer(objective: Objective): HTMLElement {
    if (objective.welfare) {
      return this.welfareContainer();
    } else {
      return this.antibioticsContainer();
    }
  }

  /**
   * Get Objectives-DOM-Element
   * @returns {HTMLDivElement}
   */
  private objectivesContainer(): HTMLDivElement {
    return this.shadowRoot?.getElementById("objectives") as HTMLDivElement;
  }

  /**
   * Get Welfare-DOM-Element
   * @returns {HTMLElement}
   */
  private welfareContainer(): HTMLElement {
    return this.shadowRoot?.getElementById("welfare") as HTMLElement;
  }

  /**
   * Get Antibiotics-DOM-Element
   * @returns {HTMLElement}
   */
  private antibioticsContainer(): HTMLElement {
    return this.shadowRoot?.getElementById("antibiotics") as HTMLElement;
  }

  /**
  * Get Manual-AddButton-DOM-Element
  * @returns {HTMLElement}
  */
  private get manualAddButton(): HTMLButtonElement {
    return this.shadowRoot?.getElementById("addMeasure") as HTMLButtonElement;
  }

  /**
   * Bind Click Event to Manual Add button
   */
  private bindManualAddButton() {
    this.manualAddButton?.addEventListener("click", () => {
      let modal = new ObjectiveModal();
      this.shadowRoot?.getElementById("group")?.append(modal);
      modal.active = true;
      this.configureModal(modal);
    });
  }

  /**
   * Configuring Callback from Modal
   * @param {ObjectiveModal} modal
   */
  private configureModal(modal: ObjectiveModal) {
    modal.addEventListener("save", (event: Event) => {
      let object = (event as CustomEvent).detail;
      if (object) {
        this.addObjective(object);
      }
      modal.remove();
    });
  }


}
