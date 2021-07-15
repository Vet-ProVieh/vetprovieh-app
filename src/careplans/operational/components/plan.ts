import { ViewHelper } from "@tomuench/vetprovieh-shared";
import { VetproviehBasicDetail } from "@tomuench/vetprovieh-detail/lib/index";
import { VpOperationGroup } from "./group";
import { WebComponent, VetproviehElement, VetproviehNavParams, ElementGroupBinding } from "@tomuench/vetprovieh-shared/lib";
import { OperationGroup, OperationPlan } from "../models";
import { ProcessMenu } from "./process-menu";
import { VetproviehSidemenu } from "../../../app/main";
import { Barn, BarnListShow } from "../../../barns";
import { SpeechAssistant } from "../../../shared";
import { DynamicForm } from "../../../shared/components/forms/dynamicForm";

/**
 * Controller for Page
 * pages/operations/plans/create or edit
 */
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
        <div class="container">
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
  tag: "vp-operation-plan",
})
export class VpOperationPlan extends DynamicForm<OperationPlan, OperationGroup> {
  
  constructor() {
    super("opGroups");
    this.storeElement = true;
  }

  /**
   * Building a GroupComponent
   * must be implemented in Subclass
   * @return {ElementGroupBinding}
   */
  protected buildGroupComponent(): ElementGroupBinding {
    if(this.currentObject.barn){
      return new VpOperationGroup(this.currentObject.barn.id as any);
    } else{
      console.log("Could not render GroupElement. Barn is not set")
      return new VpOperationGroup(0 as any);
    }
  }

  /**
   * Overwriteable Callback
   * @param {any} data
   * @protected
   */
  _afterFetch(data: any) {

    this.setBarnIdToComponents();
    
    super._afterFetch(data);

    setTimeout(() => this._setNavigation(), 300);
  }

  private setBarnIdToComponents() {
    let barnUrlId = VetproviehNavParams.getUrlParameter("barn_id");
    console.log("Setting barnid");

    if (barnUrlId != null && barnUrlId != undefined) {
        this.currentObject.barn = {id: parseInt(barnUrlId)};
        this.shadowRoot?.querySelectorAll("barn-list-show").forEach((barnShow: any) => {
          barnShow.barnid = barnUrlId;
        });
        this.rightMenu.shadowRoot?.querySelectorAll("barn-list-show").forEach((barnShow: any) => {
          barnShow.barnid = barnUrlId;
        });
      }
  }

  /**
   * Setting Process-Menu Items and activate current Element
   */
  _setNavigation() {
    let processMenu1 = this.getByIdFromShadowRoot("processMenu") as ProcessMenu;
    let processMenu2 = this.rightMenu.getByIdFromShadowRoot("processMenu2") as ProcessMenu;
    [processMenu1, processMenu2].forEach((processMenu) => {
      if (processMenu) {
        processMenu.objects = this.currentObject.opGroups;
        processMenu.activateElement(this.groupIdParam);
      }
    });

    this.registerResponsiveButtons();

    let assistant = this.getByIdFromShadowRoot("speechAssistant") as SpeechAssistant;
    if (assistant) {
      assistant.activate();
    }
  }

  private get rightMenu(): VetproviehSidemenu {
    return this.getByIdFromShadowRoot("right-menu") as VetproviehSidemenu;
  }

  private registerResponsiveButtons() {
    let openFunc = () => {
      this.rightMenu.dispatchEvent(new Event("toggle"));
    };
    openFunc.bind(this);
    this.openButton.addEventListener("click", openFunc);
  }

  private get openButton(): HTMLElement {
    return this.getByIdFromShadowRoot("openButton") as HTMLElement;
  }
}
