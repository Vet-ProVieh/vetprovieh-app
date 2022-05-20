
export * from './app.module';


// Prüfen ob Service-Worker registrierbar
if ('serviceWorker' in navigator) {
  // Listener zum Laden einfügen
  window.addEventListener('load', () => {
    // von Workbox generierten ServiceWorker registrieren.
    navigator.serviceWorker.register('/wb_service_worker.js')
        .then((registration) => {
          // Register Background-Sync for Post und Puts.
          // Necessary because:
          // - Store Requests to Upload (Files, Careplans and so on)
          (window as any).registration = registration;
        });
  });
}
