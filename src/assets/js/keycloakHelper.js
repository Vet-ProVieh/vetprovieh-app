/**
 * Helper for Keycloak
 */
class KeycloakHelper {
    constructor() {
      this._keycloakInstance = Keycloak("/assets/config/keycloak.json");
      let token = this._token;
      let refreshToken = this._refreshToken;
  
      this._keycloakInstance.init({
        onLoad: 'login-required',
        token,
        refreshToken
      }).success(function (authenticated) {}).catch(function (x) {
        console.log('failed to initialize Keycloak');
      });
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
      var _self  = this;
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
  
      if (!args[1]) {
        args[1] = {
          headers: {}
        }
      }
      args[1].headers['Authorization'] = 'Bearer ' + this.instance.token;
  
      return args;
    }
  
    set onAuthSuccess(callbackFunction) {
      var _self  = this;
      this._keycloakInstance.onAuthSuccess = function () {
        _self.storeTokens();
        callbackFunction();
      }
    }
  
    storeTokens() {
      localStorage.setItem("kc_token", this.instance.token);
      localStorage.setItem("kc_refreshToken", this.instance.refreshToken);
    }
  }