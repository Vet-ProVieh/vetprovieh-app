
export * from './app.module';

import {BackgroundSyncPlugin} from 'workbox-background-sync';
import {registerRoute} from 'workbox-routing';
import {NetworkOnly} from 'workbox-strategies';


// Prüfen ob Service-Worker registrierbar
if ('serviceWorker' in navigator) {
  // Listener zum Laden einfügen
  window.addEventListener('load', () => {
    // von Workbox generierten ServiceWorker registrieren.
    navigator.serviceWorker.register('/wb_service_worker.js').then((registration) => {
      // Register Background-Sync for Post und Puts.
      // Necessary because:
      // - Store Requests to Upload (Files, Careplans and so on)
      (window as any).registration = registration;
      const bgSyncPlugin = new BackgroundSyncPlugin('vetproviehSync', {
        maxRetentionTime: 7 * 24 * 60 // Retry for max of 24 Hours (specified in minutes)
      });
      
      registerRoute(
        /.*\/service\/.*/,
        new NetworkOnly({
          plugins: [bgSyncPlugin as any]
        }),
        'POST'
      );
    });
  });
}