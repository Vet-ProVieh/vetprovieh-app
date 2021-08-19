import { WebComponent, VetproviehElement, VetproviehNavParams } from "@tomuench/vetprovieh-shared/lib";
import { ObjectiveModal } from "./objective-modal";
import { Objective } from "../models/objective";
import { ObjectiveItemComponent } from "./objectiveItem";
import { SelectButton } from "../../shared";

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
          <div class="columns padding-15">
              <div class="column">
                <select-button 
                  id="loadMeasure" 
                  param="selectPageMeasure.return" 
                  href="/measures/select.html?barnId=\${this.barnId}" 
                  class="\${this.cssHidden(this.state == 'valuation')}"
                  name="Maßnahmen laden">
                </select-button>              
              </div>
              <div class="column">
                <button id="addMeasure" 
                        class="button is-info is-fullwidth \${this.cssHidden(this.state == 'valuation')}" 
                        type="button">
                        <span class="icon is-small">
                            <i class="fas fa-edit"></i>
                        </span>
                        <span>Maßnahme erstellen</span>
                </button>
              </div>
            </div>
        </div>
        <hr/>
        <div id="objectives" class="padding-15">
          <h4 class="subtitle is-4">Antibiotika Maßnahmen</h4>
          <div id="antibiotics">
            \${this.renderNoMeasures()}
          </div>
          <hr/>
          <h4 class="subtitle is-4">Tierwohl Maßnahmen</h4>
          <div id="welfare">
            \${this.renderNoMeasures()}
          </div>
        </div>
    </div>
    `,
  tag: "vp-objectives",
})
export class ObjectivesComponent extends VetproviehElement {
  static readonly possibleStates = ["execution", "valuation"];

  private _objectives: Objective[] = [];
  private _barnId: string = "";
  private _state : string = "execution";

  /**
   * State shows or hide different inputs.
   * Expected Values: execution, valuation
   * @property {string} state
   */
  public get state() : string {
    return this._state;
  }

  public set state(v : string) {
    if(ObjectivesComponent.possibleStates.includes(v) && this._state !== v) {
      this._state = v;
    }
  }
  

  public get objectives(): Objective[] {
    return this._objectives;
  }

  public set objectives(val: Objective[]) {
    this._objectives = val;
    this.renderObjectives();
  }


  constructor() {
    super(true, false);

    let params = VetproviehNavParams.get("MeasureIntializeParams");
    this.internalBarnId = params.barnId;

    this.render();
  }


  static get observedAttributes() {
    return ["objectives", "state"];
  }


  /**
   * Connected-Callback
   */
  connectedCallback() {
    this.bindManualAddButton();
  }

  public render() {
    super.render();
    this._afterRender();
  }

  public renderNoMeasures(visible = true){
    return `<p class="${visible ? '' : 'is-hidden'}"><i>Keine Maßnahmen angegeben</i></p>`;
  }


  private set internalBarnId(value: string) {
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
    container.innerHTML = this.renderNoMeasures(!this.objectives || this.objectives.length > 0);
    // TODO welfare container
    this.objectives?.forEach((objective) => this.addObjectiveToDom(objective));
  }

  /**
   * Adding Objective to Container
   * @param {Objective} objective 
   */
  private addObjective(objective: Objective) {
    this.objectives.push(objective);
    this.addObjectiveToDom(objective);
  }

  /**
   * Adding objective to Dom
   * @param {Objective} objective 
   */
  private addObjectiveToDom(objective: Objective) {
    let objectiveItem = new ObjectiveItemComponent();
    objectiveItem.objective = objective;
    
    let valuation = (this.state === "valuation");
    objectiveItem.valuation = valuation.toString();
    objectiveItem.editable = (!valuation).toString();

    objectiveItem.addEventListener("delete", (event) => {
      let index = this.objectives.findIndex((x) => x == (event as CustomEvent).detail)
      if (index >= 0) {
        this.objectives.splice(index, 1);
        objectiveItem.remove();

        if(this.objectives.length == 0){
          let container = this.selectContainer(objective);
          if(container) container.querySelector("p")?.classList.remove("is-hidden");
        }
      }
    });

    this.appendToContainer(objective, objectiveItem);
  }

  /**
   * Append to specific container and toggle placeholder text
   * @param {Objective} objective 
   * @param {ObjectiveItemComponent} item 
   */
  private appendToContainer(objective: Objective, item: ObjectiveItemComponent) {
    let container = this.selectContainer(objective);

    if(container) {
      container.querySelector("p")?.classList.add("is-hidden");
      container.appendChild(item);
    }
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


  _afterRender() {

    let selectButton = this.shadowRoot?.querySelector("select-button") as SelectButton;
    setTimeout(() => {
      if (selectButton) {
        this.processSelectButtonAnswer(selectButton);
      }
    }, 1000);
  }


  /**
     * Process answer of select-Button.
     * TODO unterschiedliche Fälle implementieren
     * @param answer 
     */
  private processSelectButtonAnswer(selectButton: SelectButton) {
    let answer = selectButton.recievedParam;

    console.log(answer);
    if (answer) {
      selectButton.scrollIntoView();
      answer.forEach((objective: Objective) => {
          objective.id = undefined;
          this.addObjective(objective);
      })
    }
  }
}
