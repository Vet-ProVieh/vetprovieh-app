import {VetproviehNavParams} from '@tomuench/vetprovieh-shared/lib';
import {VetproviehDetail} from '../../../app/main';

/**
 * Basic Show-Page
 */
export class BasicShowPage extends HTMLElement {
  /**
   * Connected-Callback for Web-Component
   */
  public connectedCallback() {
    this.beforeDataLoaded();
    this.detailElement.addEventListener('loadeddata', () => {
      this.afterDataLoaded();
    });
  }

  /**
     * CurrentObject is already saved?
     * @return {boolean}
     */
  protected get currentObjectIsNotPersisted() : boolean {
    return this.currentObject.id == null || this.currentObject.id == undefined;
  }


  /**
     * Lifecycle to Override
     * Executed before Data is loaded
     */
  protected beforeDataLoaded() {
    console.debug('BasicShowPage: beforeDataLoaded Executed');
  }

  /**
     * Lifecycle to Override
     * Executed after Data is loaded
     */
  protected afterDataLoaded() {
    console.debug('BasicShowPage: afterDataLoaded Executed');
  }


  /**
   * Maximale Position ermitteln
   * @param {Array<any>} positions
   * @return {number}
   */
  protected maxPosition(positions: Array<any> = []) : number {
    console.log('maxPosition');

    if (positions.length == 0) {
      return 1;
    } else {
      return Math.max(...positions.map((p: any) => p.position)) + 1;
    }
  }

  /**
   * Setting URL-Parameter to Object
   * @param {any} obj
   * @param {string} param
   * @param {string} attribute
   * @param {Function | undefined} transformFunction
   */
  protected setUrlParameter(obj: any,
      param: string,
      attribute: string,
      transformFunction: Function | undefined = undefined ) {
    const paramValue = VetproviehNavParams.getUrlParameter(param);
    if (paramValue) {
      console.info(`Found UrlParameter '${param}'. Value -> ${paramValue}`);
      if (transformFunction) {
        obj[attribute] = transformFunction(paramValue);
      } else {
        obj[attribute] = paramValue;
      }
    }
  }

  /**
   * Getting CurrentObject from DetailElement
   * @return {any}
   */
  protected get currentObject() : any {
    return this.detailElement.currentObject;
  }

  /**
     * Load Detail-Element from DOM
     * @return {VetproviehDetail}
     */
  protected get detailElement(): VetproviehDetail {
    const detail = document.getElementsByTagName('vetprovieh-detail')[0];
    return detail as VetproviehDetail;
  }
}
