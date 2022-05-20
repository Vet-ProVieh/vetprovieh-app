/**
 * Helper for Keycloak
 */
let KEYCLOAK_HELPER = undefined;

class KeycloakHelper {
  static instance() {
    if (!KEYCLOAK_HELPER) {
      KEYCLOAK_HELPER = new KeycloakHelper();
      KEYCLOAK_HELPER.connect();
    }

    return KEYCLOAK_HELPER;
  }

  constructor() {
    this._keycloakInstance = new Keycloak({
      'realm': this.subdomain,
      'auth-server-url': '/auth/',
      'ssl-required': 'none',
      'clientId': 'app',
      'verify-token-audience': true,
      'use-resource-role-mappings': true,
      'confidential-port': 0,
    });

    const _self = this;

    this._keycloakInstance.onAuthSuccess = function() {
      _self.storeTokens();
      while (_self._callbackFunctions.length > 0) {
        const func = _self._callbackFunctions.pop();
        func();
      }
    };
  }


  /**
   * Get current Subdomain
   * @return {string}
   */
  get subdomain() {
    try {
      const domain = window.location.hostname.split('.')[0];
      if (domain == 'localhost') {
        return 'praxisa';
      }
      return domain;
    } catch (ex) {
      return 'unknown';
    }
  }

  init() {
    const token = this._token;
    const refreshToken = this._refreshToken;
    return this._keycloakInstance.init({
      onLoad: 'login-required',
      token,
      refreshToken,
    });
  }

  connect() {
    const instance = this._keycloakInstance;
    console.log('KeycloakHelper: Connecting');
    this.init().then(function(authenticated) {
      if (!authenticated) {
        instance.login({
          scope: 'openid offline_access',
        });
      }
    }).catch(function(error) {
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
    return localStorage.getItem('kc_token');
  }

  get _refreshToken() {
    return localStorage.getItem('kc_refreshToken');
  }

  get authenticated() {
    if (this._token) {
      return this.localTokenValid;
    } else {
      return this.instance.authenticated;
    }
  }

  get localTokenValid() {
    if (this._token) {
      const content = this.parseJwt(this._token);
      const currentTime = Math.round(new Date().getTime() / 1000);
      return content.exp >= currentTime;
    }
    return false;
  }

  parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  updateToken(amount) {
    console.log('KeycloakHelper: UpdateToken');
    const _self = this;
    return new Promise((resolve, reject) => {
      _self.instance.updateToken(amount)
          .then(() => {
            this.storeTokens();
            resolve();
          }).catch(reject);
    });
  }

  attachToken(incomingArgs) {
    console.log('Attach-Token');
    const args = incomingArgs;
    let i = args.length;

    if (i > 1 && args[i - 1]) {
      args[i - 1] = Object.assign({}, args[i - 1], {
        headers: {},
      });
      i--;
    } else {
      args[i] = {
        headers: {},
      };
    }

    if (this.localTokenValid) {
      args[i].headers['Authorization'] = 'Bearer ' + this._token;
    } else {
      args[i].headers['Authorization'] = 'Bearer ' + this.instance.token;
    }

    return args;
  }

  setRequestHeader(request) {
    request.setRequestHeader('Authorization', 'Bearer ' + this.instance.token);
  }

  set onAuthSuccess(callbackFunction) {
    if (this.authenticated) {
      callbackFunction();
    } else {
      this._callbackFunctions.push(callbackFunction);
    }
  }

  _callbackFunctions = [];

  storeTokens() {
    console.log('Storing Tokens');
    localStorage.setItem('kc_token', this.instance.token);
    localStorage.setItem('kc_token_parsed', JSON.stringify(this.instance.tokenParsed));
    localStorage.setItem('kc_refreshToken', this.instance.refreshToken);
  }
}
