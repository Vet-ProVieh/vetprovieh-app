import {
  IRepository,
  VetproviehNavParams,
  VetproviehTable} from '@vetprovieh/vetprovieh-shared';
import {BasicShowPage} from '../../../shared';

/**
 * page With Read Only
 */
export class PageWithReadOnly extends BasicShowPage {
  /**
     * CurrentView Readonly?
     * @return {boolean}
     */
  protected get readOnly(): boolean {
    return VetproviehNavParams.getUrlParameter('readOnly') == 'true';
  }

  /**
   * Read only Link attached
   * @return {string}
   */
  protected get readOnlyLinkAttached(): string {
    return this.readOnly ? '&readOnly=true' : '';
  }

  /**
   * Mark as read only
   */
  protected markAsReadOnly() {
    if (this.readOnly) {
            this.addButton?.classList.add('is-hidden');
            this.detailElement.readOnly = this.readOnly;
    }

    if (this.currentObjectIsNotPersisted) {
            this.addButton?.classList.add('is-hidden');
    }
  }


  /**
   * get addButton
   * @return {HTMLAnchorElement}
   */
  protected get addButton(): HTMLAnchorElement {
    return this.detailElement
        .getByIdFromShadowRoot('addButton') as HTMLAnchorElement;
  }

  /**
   * Set Template for Table
   * @param {string} templateContent
   * @param {IRepository<any>} repository
   */
  protected setTemplateForTable(
      templateContent: string,
      repository: IRepository<any>) {
    const repeater = this.getTable();
    const template: HTMLTemplateElement = document.createElement('template');
    template.innerHTML = templateContent;
    repeater.listTemplate = template.content;
    repeater.repository = repository;
  }

  /**
     * Get Table from DetailElement
     * @return {VetproviehTable}
     */
  protected getTable(): VetproviehTable {
    return this.detailElement
        .getByIdFromShadowRoot('subItems') as VetproviehTable;
  }
}
