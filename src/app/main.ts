// Externe Komponenten
export {VetproviehList} from '@tomuench/vetprovieh-list';
export {VetproviehDetail} from '@tomuench/vetprovieh-detail';
export {VetproviehSidemenu} from '@tomuench/vetprovieh-sidemenu';

// Interne Komponenten
export * as Component from '../components/components.module.js';


// Prüfen ob Service-Worker registrierbar
if ('serviceWorker' in navigator) {
  // Listener zum Laden einfügen
  window.addEventListener('load', () => {
    // von Workbox generierten ServiceWorker registrieren.
    navigator.serviceWorker.register('/wb_service_worker.js');
  });
}
