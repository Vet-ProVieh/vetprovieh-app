import {
  VetproviehElement,
  ViewHelper,
  WebComponent} from '@vetprovieh/vetprovieh-shared';


// eslint-disable-next-line new-cap
@WebComponent({
  template: VetproviehElement.template + `

        <article class="tile is-child box">
            <button id="button" class="button is-danger">
               Neue Version verfügbar. Jetzt aktualisieren
            </button>
        </article>
    `,
  tag: 'update-pwa-button',
})
/**
 * Update PWA-Button
 */
export class UpdatePwaButton extends VetproviehElement {
  /**
   * Clear Cache and Reload
   */
    private clearCacheAndReload = async () => {
      const cacheNames = await caches.keys();

      cacheNames.forEach(async (cacheName) => {
        await caches.delete(cacheName);
      });

      window.location.replace('');
    }

    /**
     * ConnectedCallback
     */
    connectedCallback() {
      super.connectedCallback();

      this.button.addEventListener('click', () => {
        this.clearCacheAndReload()
            .then(() => console.log('succeeded'))
            .catch((error) => console.log(error));
      });

      ViewHelper.toggleVisibility(this, false);

      navigator?.serviceWorker.addEventListener('controllerchange', (e) => {
        console.log(e);
        ViewHelper.toggleVisibility(this, true);
      });
    }


    /**
     * Get Button-Element
     * @return {HTMLButtonElement}
     */
    private get button(): HTMLButtonElement {
      return this.getByIdFromShadowRoot('button') as HTMLButtonElement;
    }
}
