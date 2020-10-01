
var keycloakHelper = new KeycloakHelper();

const proxied = window.fetch;
window.fetch = function () {

  var _args  = arguments;
  var _self = this;

  return new Promise((resolve, reject) => {
    if (!keycloakHelper.authenticated) {
      keycloakHelper.onAuthSuccess = function () {
        var args = keycloakHelper.attachToken(_args);
        let request = new Request(args[0], args[1])
        proxied(request).then(resolve).catch(reject);
      };
    } else {
      keycloakHelper.updateToken(30).then(function () {
        var args = keycloakHelper.attachToken(_args);
        let request = new Request(args[0], args[1])
        proxied(request).then(resolve).catch(reject);
      });
    }
  });

};