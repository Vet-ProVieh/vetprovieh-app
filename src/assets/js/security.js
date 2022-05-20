const keycloakHelper = KeycloakHelper.instance();
if (!keycloakHelper.authenticated) {
  keycloakHelper.onAuthSuccess = function() {
    console.log('Auth was successful');
  };
}

const proxied = window.fetch;
window.fetch = function() {
  return new Promise((resolve, reject) => {
    const _args = arguments;
    keycloakHelper.onAuthSuccess = function() {
      const args = keycloakHelper.attachToken(_args);
      const request = new Request(args[0], args[1]);
      proxied(request).then(resolve).catch(reject);
    };
  });
};


const proxiedOpen = window.XMLHttpRequest.prototype.send;
window.XMLHttpRequest.prototype.send = function() {
  keycloakHelper.setRequestHeader(this);
  return proxiedOpen.apply(this, [].slice.call(arguments));
};
