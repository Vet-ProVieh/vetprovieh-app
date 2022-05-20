import {VetproviehBasicDetail} from '@tomuench/vetprovieh-detail/lib/index';
import {ViewHelper} from '@tomuench/vetprovieh-shared';
import {
  ElementGroupBinding,
  VetproviehNavParams} from '@tomuench/vetprovieh-shared/lib';
import {BasicModel, RenderType} from '../../models';


/**
 * Dynamisches Formular,
 * welches aus Gruppen und Feldern generiert wird.
 * Es besitzt n Gruppen und Gruppen besitzen
 * wiederum n-Felder. Die Komponenten sind analog dazu aufgebaut
 */
export class DynamicForm<TObject extends BasicModel, TGroup extends BasicModel> extends VetproviehBasicDetail {
  private _groupElements: ElementGroupBinding[] | any[] = [];
  private _fetched = false;
  private groupAttributeName: string;
  private renderType: RenderType;

  /**
   * Default-Konstruktor
   * @param {string} groupAttributeName
   * @param {RenderType} renderType
   */
  constructor(
      groupAttributeName: string,
      renderType: RenderType = RenderType.Single) {
    super();
    this.storeElement = true;
    this.groupAttributeName = groupAttributeName;
    this.renderType = renderType;
  }

  /**
 * Render Element
 */
  render() {
    if (!this._fetched) {
      super.render();
    }
  }

  /**
   * Getting current selected Main-Object
   * @return {T}
   */
  public get currentObject(): TObject {
    return this._currentObject as TObject;
  }

  /**
   * Group-Position from URL
   * Default = 0
   * @return {number}
   */
  public get groupIdParam(): number {
    return parseInt(ViewHelper.getParameter('groupsId') as string) || 0;
  }

  /**
   * Get Group-Objects from currentObject by AttributeName
   * @return {TGroup}
   */
  private get groupsFromObject(): TGroup[] {
    return (this.currentObject as any)[this.groupAttributeName];
  }

  /**
   * Setting group Component
   */
  _setGroupComponent() {
    if (this.renderType === RenderType.Single) {
      if (this.groupsFromObject.length > this.groupIdParam) {
        console.log(`Setting Current-Group=${this.groupIdParam}`);
        const group = this.buildSingleGroup(
            this.groupsFromObject[this.groupIdParam]
        );
        this.appendGroupToDetail(group);
      }
    } else {
      this.groupsFromObject.forEach((groupObject) => {
        const group = this.buildSingleGroup(groupObject);
        this.appendGroupToDetail(group);
      });
    }
  }

  /**
   * Building a GroupComponent
   * must be implemented in Subclass
   * @return {ElementGroupBinding}
   */
  protected buildGroupComponent(): ElementGroupBinding {
    throw new Error('Please define buildGroupComponent in your Child-Class');
  }

  /**
   * Building a Single Group Component for UI
   * @param {any} groupObject
   * @return {ElementGroupBinding}
   */
  protected buildSingleGroup(groupObject: any): ElementGroupBinding {
    const group = this.buildGroupComponent();
    group.object = groupObject;

    return group;
  }

  /**
   * Append Group-Component to HTML-Container
   * @param {ElementGroupBinding} group
   */
  private appendGroupToDetail(group: ElementGroupBinding) {
    const detail = this.getByIdFromShadowRoot('group') as HTMLElement;

    if (detail) {
      this._groupElements.push(group);
      detail.appendChild(group);
    }
  }

  /**
   * Getter storeKey
   * @return {string}
   */
  protected get _storeKey(): string {
    const url = super._storeKey;
    return `${url}?barn_id=${VetproviehNavParams.getUrlParameter('barn_id')}`;
  }

  /**
   * Overwriteable Callback
   * @param {any} data
   * @protected
   */
  protected _afterFetch(data: any) {
    this._fetched = true;
    this._setGroupComponent();
  }

  /**
   * Building a URL
   * @return {string}
   */
  _buildUrl(): string {
    const currentUrl = new URL(window.location.href);

    if (currentUrl.searchParams.has('groupsId')) {
      currentUrl.searchParams.delete('groupsId');
    }
    currentUrl.searchParams.append('groupsId', '');
    return currentUrl.toString();
  }

  /**
  * Attaching Listener to Save and Abort Button
  */
  _attachListenerToButtons() {
    console.log('Plan: Listener to Button');
    const saveButton = this.getByIdFromShadowRoot('saveButton') as HTMLElement;
    const abort = this.getByIdFromShadowRoot('abortButton') as HTMLElement;

    saveButton.addEventListener('click', () => {
      this.save();
    });
    abort.addEventListener('click', () => {
      console.log('cancel');
      // Destroy Cached local Data
      VetproviehNavParams.delete(window.location.href);
      window.history.back();
    });
  }
}
