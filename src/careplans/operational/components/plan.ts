import {
  ElementGroupBinding,
  VetproviehElement,
  VetproviehNavParams,
  WebComponent} from '@tomuench/vetprovieh-shared/lib';
import {VetproviehSidemenu} from '../../../app/main';
import {OpenObjectivesButton} from '../../../measures';
import {SpeechAssistant} from '../../../shared';
import {DynamicForm} from '../../../shared/components/forms/dynamicForm';
import {OperationGroup, OperationPlan} from '../models';
import {VpOperationGroup} from './group';
import {ProcessMenu} from './process-menu';


// eslint-disable-next-line new-cap
@WebComponent({
  template:
    VetproviehElement.template +
    `
    <form id="form">
        <vetprovieh-notification id="notification">
        </vetprovieh-notification>
        <div id="detail" class="container">

        </div>
        <hr/>
        <div class="container sticky-footer">
            <div class="columns is-mobile">
                <div class="column">
                    <input id="abortButton"
                            class="button is-danger is-fullwidth"
                            type="reset" value="Abbrechen">
                </div>
                <div class="column">
                    <input id="saveButton"
                            class="button is-success is-fullwidth"
                            type="button" value="Speichern">
                </div>
            </div>
        </div>
    </form>
    `,
  tag: 'vp-operation-plan',
})
/**
 * Controller for Page
 * pages/operations/plans/create or edit
 */
export class VpOperationPlan
  extends DynamicForm<OperationPlan, OperationGroup> {
  /**
   * Default-Constructor
   */
  constructor() {
    super('opGroups');
    this.storeElement = true;
  }

  /**
   * Building a GroupComponent
   * must be implemented in Subclass
   * @return {ElementGroupBinding}
   */
  protected buildGroupComponent(): ElementGroupBinding {
    if (this.currentObject.barn) {
      return new VpOperationGroup(this.currentObject.barn.id as any);
    } else {
      console.log('Could not render GroupElement. Barn is not set');
      return new VpOperationGroup(0 as any);
    }
  }

  /**
   * Overwriteable Callback
   * @param {any} data
   * @protected
   */
  protected _afterFetch(data: any) {
    this.setBarnIdToComponents();

    super._afterFetch(data);

    setTimeout(() => this._setNavigation(), 300);
  }

  /**
   * Set Barn Id to subcomponents
   */
  private setBarnIdToComponents() {
    const barnUrlId = VetproviehNavParams.getUrlParameter('barn_id');
    console.log('Setting barnid');

    if (barnUrlId != null && barnUrlId != undefined) {
      this.currentObject.barn = {id: parseInt(barnUrlId)};
      this.setBarnId(this.currentObject.barn.id);
    } else if (this.currentObject.barn?.id > 0) {
      this.setBarnId(this.currentObject.barn.id);
    }
  }

  /**
   * Set BarnId
   * @param {number} barnId
   */
  private setBarnId(barnId: number) {
    this.shadowRoot?.querySelectorAll('barn-list-show')
    .forEach((barnShow: any) => {
      barnShow.barnid = barnId;
    });
    this.rightMenu.shadowRoot?.querySelectorAll('barn-list-show')
    .forEach((barnShow: any) => {
      barnShow.barnid = barnId;
    });

    this.openObjectives.barnid = barnId;
  }

  /**
   * Setting Process-Menu Items and activate current Element
   */
  _setNavigation() {
    const processMenu1 = this
        .getByIdFromShadowRoot('processMenu') as ProcessMenu;
    const processMenu2 = this
        .rightMenu.getByIdFromShadowRoot('processMenu2') as ProcessMenu;
    [processMenu1, processMenu2].forEach((processMenu) => {
      if (processMenu) {
        processMenu.objects = this.currentObject.opGroups;
        processMenu.activateElement(this.groupIdParam);
      }
    });

    this.registerResponsiveButtons();

    const assistant = this
        .getByIdFromShadowRoot('speechAssistant') as SpeechAssistant;
    if (assistant) {
      assistant.activate();
    }
  }

  /**
   * Getter RigtMenu
   * @return {VetproviehSidemenu}
   */
  private get rightMenu(): VetproviehSidemenu {
    return this.getByIdFromShadowRoot('right-menu') as VetproviehSidemenu;
  }

  /**
   * Register responsive Buttons
   */
  private registerResponsiveButtons() {
    const openFunc = () => {
      this.rightMenu.dispatchEvent(new Event('toggle'));
    };
    openFunc.bind(this);
    this.openButton.addEventListener('click', openFunc);
  }

  /**
   * Open Button
   * @return {HTMLElement}
   */
  private get openButton(): HTMLElement {
    return this.getByIdFromShadowRoot('openButton') as HTMLElement;
  }

  /**
   * Return button
   * @return {OpenObjectivesButton}
   */
  private get openObjectives(): OpenObjectivesButton {
    return this.getByIdFromShadowRoot('openObjectives') as OpenObjectivesButton;
  }

  /**
 * After save callback
 */
  protected afterSave() {
    if (!window.location.pathname.includes('show')) {
      window.open(
          `/careplans/operational/show.html?id=${this.currentObject.id}`,
          '_self');
    }
  }
}
