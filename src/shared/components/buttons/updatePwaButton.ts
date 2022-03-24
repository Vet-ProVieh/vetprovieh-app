import {VetproviehElement, ViewHelper, WebComponent} from '@tomuench/vetprovieh-shared/lib';


/**
 * Update PWa
 */
@WebComponent({
  template: VetproviehElement.template + `

        <article class="tile is-child box">
            <button id="button" class="button is-danger">Neue Version verfügbar. Jetzt aktualisieren</button>
        </article>
    `,
  tag: 'update-pwa-button',
})
export class UpdatePwaButton extends VetproviehElement {
    private clearCacheAndReload = () => {
      caches.keys().then((cacheNames) => {
        cacheNames.forEach((cacheName) => {
          caches.delete(cacheName);
        });
      });
      setTimeout(function() {
        window.location.replace('');
      }, 300);
    }

    connectedCallback() {
      super.connectedCallback();

      this.button.addEventListener('click', () => {
        this.clearCacheAndReload();
      });

      ViewHelper.toggleVisibility(this, false);

      navigator.serviceWorker.addEventListener('controllerchange', (e) => {
        console.log(e);
        ViewHelper.toggleVisibility(this, true);
      });
    }


    private get button(): HTMLButtonElement {
      return this.getByIdFromShadowRoot('button') as HTMLButtonElement;
    }
}
