
var keycloakHelper = new KeycloakHelper();


const proxied = window.fetch;
window.fetch = function () {

  var args = keycloakHelper.attachToken(arguments);

  var _self = this;

  return new Promise((resolve, reject) => {
    if (!keycloakHelper.authenticated) {
      keycloakHelper.onAuthSuccess = function () {
        proxied.apply(_self, args).then(resolve).catch(reject);
      };
    } else {
      keycloakHelper.updateToken(30).then(function () {
        proxied.apply(_self, args).then(resolve).catch(reject);
      });
    }
  });

};