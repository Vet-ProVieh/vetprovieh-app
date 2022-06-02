import {
  VetproviehElement,
  VetproviehNavParams,
  ViewHelper,
  WebComponent} from '@vetprovieh/vetprovieh-shared';
import {SelectButton} from '../../../shared';
import {Objective} from '../../models/objective';
import {InitializeMeasurePage} from '../../pages';
import {ObjectiveModal} from './objective-modal';
import {ObjectiveItemComponent} from './objectiveItem';

// eslint-disable-next-line new-cap
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
                  class="\${this.cssHidden(this.isHidden)}"
                  name="Maßnahmen laden">
                </select-button>
              </div>
              <div class="column">
                <button id="addMeasure"
 class="button is-info is-light is-fullwidth \${this.cssHidden(this.isHidden)}"
                        type="button">
                        <span class="icon is-small">
                            <i class="fas fa-edit" aria-hidden="true"></i>
                        </span>
                        <span>Maßnahme erstellen</span>
                </button>
              </div>
            </div>
        </div>
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
  tag: 'vp-objectives',
})
/**
 * Controller for Page
 * pages/operations/plans/create or edit
 */
export class ObjectivesComponent extends VetproviehElement {
  static readonly possibleStates = ['execution', 'valuation'];

  private _objectives: Objective[] = [];
  private _barnId = '';
  private _state = 'execution';

  /**
   * Default-Constructor
   */
  constructor() {
    super(true, false);

    const params = VetproviehNavParams
        .get(InitializeMeasurePage.NAVIGATION_KEY);
    this.internalBarnId = params.barnId;

    this.render();
  }

  /**
   * State shows or hide different inputs.
   * Expected Values: execution, valuation
   * @return {string}
   */
  public get state() : string {
    return this._state;
  }

  /**
   * State shows or hide different inputs.
   * Expected Values: execution, valuation
   * @param {string} v
   */
  public set state(v : string) {
    if (ObjectivesComponent.possibleStates.includes(v) && this._state !== v) {
      this._state = v;
      this.toggleVisibility();
    }
  }

  /**
   * Change Visibility of relevant DOM-Objects
   */
  private toggleVisibility() {
    const buttons = [this.manualAddButton, this.selectButton];
    buttons.forEach((button) => {
      if (button) {
        ViewHelper.toggleVisibility(button, !this.isHidden);
      }
    });

    this.shadowRoot?.querySelectorAll('vp-objective-item').forEach((item) => {
      const e = item as ObjectiveItemComponent;
      e.valuation = this.isHidden.toString();
      e.editable = (!this.isHidden).toString();
    });
  }

  /**
   * Is Component hidden
   * @return {boolean}
   */
  public get isHidden() : boolean {
    return this.state==='valuation';
  }

  /**
   * Getter objectives
   * @return {Objective[]}
   */
  public get objectives(): Objective[] {
    return this._objectives;
  }

  /**
   * Setter Objectives
   * @param {Objective[]} val
   */
  public set objectives(val: Objective[]) {
    this._objectives = val;
  }

  /**
 * Get observed Attributes
 * @return {string[]}
 */
  static get observedAttributes() : string[] {
    return ['objectives', 'state'];
  }


  /**
   * Connected-Callback
   */
  connectedCallback() {
    this.render();
  }

  /**
   * Render
   */
  public render() {
    super.render();
    this.renderObjectives();
    this._afterRender();
  }

  /**
   * Render if no measures found
   * @param {boolean} visible
   * @return {string}
   */
  public renderNoMeasures(visible = true) : string {
    return `<p class="${visible ? '' : 'is-hidden'}">
              <i>Keine Maßnahmen angegeben</i>
            </p>`;
  }


  /**
   * Setter internalBarnId
   * @param {string} value
   */
  private set internalBarnId(value: string) {
    if (this._barnId !== value) {
      this._barnId = value;
    }
  }

  /**
   * Getter barnId
   * @return {string}
   */
  public get barnId(): string {
    return this._barnId;
  }

  /**
   * Rendering objectives First Time
   */
  renderObjectives() {
    const container = this.antibioticsContainer();
    container.innerHTML = this.renderNoMeasures(
        !this.objectives || this.objectives.length > 0
    );
    this.objectives?.forEach((objective) => this.addObjectiveToDom(objective));
  }

  /**
   * Adding Objective to Container
   * @param {Objective} objective
   * @param {boolean} openDirectly
   */
  private addObjective(objective: Objective, openDirectly = false) {
    this.objectives.push(objective);
    this.addObjectiveToDom(objective, openDirectly);
  }

  /**
   * Adding objective to Dom
   * @param {Objective} objective
   * @param {boolean} openDirectly
   */
  private addObjectiveToDom(objective: Objective, openDirectly = false) {
    const objectiveItem = new ObjectiveItemComponent();
    objectiveItem.objective = objective;

    const valuation = (this.state === 'valuation');
    objectiveItem.valuation = valuation.toString();
    objectiveItem.editable = (!valuation).toString();

    objectiveItem.addEventListener('delete', (event) => {
      const index = this.objectives
          .findIndex((x) => x===(event as CustomEvent).detail);
      if (index >= 0) {
        this.objectives.splice(index, 1);
        objectiveItem.remove();

        if (this.objectives.length===0) {
          const container = this.selectContainer(objective);
          if (container) {
            container.querySelector('p')?.classList.remove('is-hidden');
          }
        }
      }
    });

    this.appendToContainer(objective, objectiveItem);

    if (openDirectly) {
      objectiveItem.openEditModal();
    }
  }

  /**
   * Append to specific container and toggle placeholder text
   * @param {Objective} objective
   * @param {ObjectiveItemComponent} item
   */
  private appendToContainer(
      objective: Objective,
      item: ObjectiveItemComponent) {
    const container = this.selectContainer(objective);

    if (container) {
      const p = container.querySelector('p');
      if (p) ViewHelper.toggleVisibility(p, false);
      container.appendChild(item);
    }
  }

  /**
   * Select Display-Container
   * @param {Objective} objective
   * @return {HTMLElement}
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
   * @return {HTMLElement}
   */
  private welfareContainer(): HTMLElement {
    return this.shadowRoot?.getElementById('welfare') as HTMLElement;
  }

  /**
   * Get Antibiotics-DOM-Element
   * @return {HTMLElement}
   */
  private antibioticsContainer(): HTMLElement {
    return this.shadowRoot?.getElementById('antibiotics') as HTMLElement;
  }

  /**
  * Get Manual-AddButton-DOM-Element
  * @return {HTMLElement}
  */
  private get manualAddButton(): HTMLButtonElement {
    return this.shadowRoot?.getElementById('addMeasure') as HTMLButtonElement;
  }

  /**
   * Bind Click Event to Manual Add button
   */
  private bindManualAddButton() {
    this.manualAddButton?.addEventListener('click', () => {
      const modal = new ObjectiveModal();
      this.shadowRoot?.getElementById('group')?.append(modal);
      modal.active = true;
      this.configureModal(modal);
    });
  }

  /**
   * Configuring Callback from Modal
   * @param {ObjectiveModal} modal
   */
  private configureModal(modal: ObjectiveModal) {
    modal.addEventListener('save', (event: Event) => {
      const object = (event as CustomEvent).detail;
      if (object) {
        this.addObjective(object);
      }
      modal.remove();
    });
  }

  /**
 * After Render Callback
 */
  private _afterRender() {
    this.bindManualAddButton();
    this.bindSelectButton();
  }


  /**
   * Binding SelectButton to Answer
   */
  private bindSelectButton() {
    const selectButton = this.selectButton;
    setTimeout(() => {
      if (selectButton) {
        this.processSelectButtonAnswer(selectButton);
      }
    }, 1000);
  }


  /**
   * Loading Select-Button frm DOM
   * @return {SelectButton}
   */
  private get selectButton(): SelectButton {
    return this.shadowRoot?.querySelector('select-button') as SelectButton;
  }

  /**
     * Process answer of select-Button.
     * @param {SelectButton} selectButton
     */
  private processSelectButtonAnswer(selectButton: SelectButton) {
    const answer = selectButton.recievedParam;

    if (answer) {
      selectButton.scrollIntoView();
      answer.forEach((objective: Objective) => {
        Objective.reset(objective);
        this.addObjective(objective, answer.length===1);
      });
    }
  }
}
