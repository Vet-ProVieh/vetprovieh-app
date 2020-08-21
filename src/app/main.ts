
export * from './app.module';


// Prüfen ob Service-Worker registrierbar
if ('serviceWorker' in navigator) {
  // Listener zum Laden einfügen
  window.addEventListener('load', () => {
    // von Workbox generierten ServiceWorker registrieren.
    navigator.serviceWorker.register('/wb_service_worker.js');
  });
}