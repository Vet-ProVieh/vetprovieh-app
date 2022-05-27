
import {VetproviehElement, ViewHelper, WebComponent}
  from '@vetprovieh/vetprovieh-shared';

// eslint-disable-next-line new-cap
@WebComponent({
  template: VetproviehElement.template + `
                <style>
                  .button.is-floating{
                      position:fixed;
                      width:60px;
                      height:60px;
                      bottom:10px;
                      left:10px;
                      border-radius:100px;
                      text-align:center;
                      font-size:1.6rem;
                      box-shadow:0 .0625em .125em rgba(10,10,10,.05);
                      z-index:1000
                    }
                    .button.is-floating.is-large{
                      width:90px;
                      height:90px;
                      font-size:2.6rem
                    }
                    .button.is-floating.is-medium{
                      width:75px;
                      height:75px;
                      font-size:2.2rem
                    }
                    .button.is-floating.is-small{
                      top:20px;
                      right:20px;
                      width:25px;
                      height:45px;
                      font-size:1.2rem;
                      border-radius:50px
                    }
                </style>
               <a id="button" type="button" class="button is-floating is-info">
                    <i class="fas fa-arrow-alt-circle-left"
                       aria-hidden="true"></i>
               </a>`,
  tag: 'back-button',
})
/**
 * Button to go back
 */
export class BackButton extends VetproviehElement {
  /**
     * Rendering Element
     */
  public render() {
    super.render();

    if (this.showBackButton) {
      this.bindButton();
    } else {
      ViewHelper.toggleVisibility(this.button, false);
    }
  }

  /**
     * Show Back button
     * @return {boolean}
     */
  public get showBackButton(): boolean {
    return window.history.length > 0 &&
            window.location.pathname != '/' &&
            window.location.pathname != '/index.html';
  }

  /**
 * Add EventListener to Button
 */
  private bindButton() {
    this.button.addEventListener('click', () => {
      window.history.back();
    });
  }

  /**
   * Get Button
   * @return {HTMLButtonElement}
   */
  private get button(): HTMLButtonElement {
    return this.getByIdFromShadowRoot('button') as HTMLButtonElement;
  }
}
