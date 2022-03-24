import {VetproviehElement} from '@tomuench/vetprovieh-shared/lib';


/**
 * Mark a Field in a Form
 */
export class FieldMarker {
  /**
   * Marking Field
   * @param {string} name
   * @param {boolean} final
   * @return {any}
   */
  public markField(name: string, final: boolean): any {
    console.debug(`Marking field: ${name}`);
    const fields = this.detailElement
        .shadowRoot?.querySelectorAll('textarea, input');

    let f;
        fields?.forEach((field: any) => {
          if (field.name.toLocaleLowerCase() === name) {
            field.classList.add('is-link');
            f = field;

            if (final) {
              setTimeout(() => {
                field.classList.remove('is-link');
              }, 1000);
            }
          }
        });
        return f;
  }

  /**
   * Load DetailElement
   * @return {VetproviehElement}
   */
  private get detailElement(): VetproviehElement {
    return (document.getElementById('detail') as VetproviehElement);
  }
}
