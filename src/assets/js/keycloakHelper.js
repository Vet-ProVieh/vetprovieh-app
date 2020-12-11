/**
 * Helper for Keycloak
 */
class KeycloakHelper {
  constructor() {
    this._keycloakInstance = Keycloak("/assets/config/keycloak.json");
  }

  init() {
    let token = this._token;
    let refreshToken = this._refreshToken;
    return this._keycloakInstance.init({
      token,
      refreshToken
    });
  }

  connect() {
    let instance = this._keycloakInstance;
    this.init().success(function (authenticated) {
      if (!authenticated) {
        instance.login({
          scope: 'openid offline_access',
        });
      }
    }).catch(function (error) {
      console.log(error);
      console.log('failed to initialize Keycloak');
    });
  }

  logout() {
    this.instance.logout();
  }

  get instance() {
    return this._keycloakInstance;
  }

  set instance(val) {
    if (val != this._keycloakInstance) {
      this._keycloakInstance = val;
    }
  }

  get _token() {
    return localStorage.getItem("kc_token");
  }

  get _refreshToken() {
    return localStorage.getItem('kc_refreshToken');
  }

  get authenticated() {
    return this.instance.authenticated;
  }

  updateToken(amount) {
    var _self = this;
    return new Promise((resolve, reject) => {
      _self.instance.updateToken(amount)
        .then(() => {
          this.storeTokens();
          resolve();
        }).catch(reject);
    })
  }

  attachToken(incomingArgs) {
    var args = incomingArgs;
    var i = args.length;

    if (!args[i]) {
      args[i] = {
        headers: {}
      }
    }
    args[i].headers['Authorization'] = 'Bearer ' + this.instance.token;

    return args;
  }

  setRequestHeader(request) {
    request.setRequestHeader('Authorization','Bearer ' + this.instance.token);
  }

  set onAuthSuccess(callbackFunction) {
    var _self = this;
    this._keycloakInstance.onAuthSuccess = function () {
      _self.storeTokens();
      callbackFunction();
    }
  }

  storeTokens() {
    console.log("Storing Tokens");
    localStorage.setItem("kc_token", this.instance.token);
    localStorage.setItem("kc_refreshToken", this.instance.refreshToken);
  }
}