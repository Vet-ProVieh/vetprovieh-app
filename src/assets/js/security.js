var keycloakHelper = new KeycloakHelper();
keycloakHelper.connect();
if (!keycloakHelper.authenticated) {
  keycloakHelper.onAuthSuccess = function () {

  }
}

const proxied = window.fetch;
window.fetch = function () {
  return new Promise((resolve, reject) => {
    let _args = arguments;
    setTimeout(() => {

      keycloakHelper.onAuthSuccess = function () {
        var args = keycloakHelper.attachToken(_args);
        let request = new Request(args[0], args[1])
        proxied(request).then(resolve).catch(reject);
      };
    }, keycloakHelper.authenticated ? 0 : 500);
    // TODO unsauber gelöst. Hier muss noch nachgearbeitet werden.

  });
};


var proxiedOpen = window.XMLHttpRequest.prototype.send;
window.XMLHttpRequest.prototype.send = function () {
  keycloakHelper.setRequestHeader(this);
  return proxiedOpen.apply(this, [].slice.call(arguments));
};