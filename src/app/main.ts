// Externe Komponenten
export { VetproviehList } from '@tomuench/vetprovieh-list/lib/vetprovieh-list';
export { VetproviehDetail } from '@tomuench/vetprovieh-detail/lib/index';
export { VetproviehSidemenu } from '@tomuench/vetprovieh-sidemenu/lib/vetprovieh-sidemenu';
export { VetproviehRepeat, ViewHelper } from '@tomuench/vetprovieh-shared/lib/index';

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




/*
const origOpen = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function (method, url) {
  console.log('request started!');

  var _self = this;


if (!keycloak.authenticated) {
    console.log("Not Authenticated. Lets authenticate");
    keycloak.onAuthSuccess = function () {
      console.log("Auth success");
      //this.setRequestHeader('Accept', 'application/json');
      _self.setRequestHeader('Authorization', 'Bearer ' + keycloak.token)
      console.log(keycloak.token);

      origOpen.apply(this, arguments);

    };
  } else {
    keycloak.updateToken(30).then(function () {
      //this.setRequestHeader('Accept', 'application/json');
      _self.setRequestHeader('Authorization', 'Bearer ' + keycloak.token)
      console.log(keycloak.token);

      console.log(method + ": "+ url);
      origOpen(method, url);

    });
  }

};*/
