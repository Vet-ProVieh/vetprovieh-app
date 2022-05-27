import Keycloak from 'keycloak-js';

let KEYCLOAK_HELPER: KeycloakHelper | undefined = undefined;

/**
 * Helper for Keycloak
 */
export class KeycloakHelper {
    private _keycloakInstance : Keycloak.KeycloakInstance ;

    /**
     * Get instance
     * @return {KeycloakHelper}
     */
    static instance() {
      if (!KEYCLOAK_HELPER) {
        KEYCLOAK_HELPER = new KeycloakHelper();
        KEYCLOAK_HELPER.connect();
      }

      return KEYCLOAK_HELPER;
    }

    /**
   * Default-Constructor
   */
    constructor() {
      this._keycloakInstance = Keycloak({
        'realm': this.subdomain,
        'url': '/auth/',
        'clientId': 'app',
      });


      const successFunc = () => {
        this.storeTokens();
        while (this._callbackFunctions.length > 0) {
          const func = this._callbackFunctions.pop();
          if (func) func();
        }
      };
      successFunc.bind(this);

      this._keycloakInstance.onAuthSuccess = successFunc;
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

    /**
     * Initialize Keycloak
     * @return {Keycloak.KeycloakPromise}
     */
    init() {
      const token = this._token;
      const refreshToken = this._refreshToken;
      return this._keycloakInstance.init({
        onLoad: 'login-required',
        token,
        refreshToken,
      });
    }

    /**
     * Connect Keycloak
     */
    connect() {
      const instance = this._keycloakInstance;
      this.init().then(function(authenticated) {
        if (!authenticated) {
          instance.login({
            scope: 'openid offline_access',
          });
        }
      }).catch(function(error : any) {
        console.log(error);
        console.log('failed to initialize Keycloak');
      });
    }

    /**
     * Logout
     */
    logout() {
      this.instance.logout();
    }

    /**
   * Keycloak Instance
   * @return {Keycloak}
   */
    get instance() {
      return this._keycloakInstance;
    }

    /**
   * Setting Keycloak Instance
   * @param {Keycloak.KeycloakInstance} val
   */
    set instance(val : Keycloak.KeycloakInstance) {
      if (val != this._keycloakInstance) {
        this._keycloakInstance = val;
      }
    }

    /**
     * Getting token
     * @return {string | undefined}
     */
    private get _token() : string | undefined {
      return localStorage.getItem('kc_token') || undefined;
    }

    /**
     * Getting refresh token
     * @return {string | undefined}
     */
    get _refreshToken() : string | undefined {
      return localStorage.getItem('kc_refreshToken') || undefined;
    }

    /**
     * User authenticated?
     * @return {boolean}
     */
    get authenticated() : boolean {
      if (this._token) {
        return this.localTokenValid;
      } else {
        return this.instance.authenticated === true;
      }
    }

    /**
     * local token valid?
     * @return {boolean}
     */
    get localTokenValid() {
      if (this._token) {
        const content = this.parseJwt(this._token);
        const currentTime = Math.round(new Date().getTime() / 1000);
        return content.exp >= currentTime;
      }
      return false;
    }

    /**
   * parsing JWT token
   * @param {string} token
   * @return {any}
   */
    parseJwt(token: string) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    }

    /**
   * Updating Token
   * @param {number} amount
   * @return {Promise}
   */
    updateToken(amount: number) {
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

    /**
   * Attaching token
   * @param {any} incomingArgs
   * @return {any}
   */
    attachToken(incomingArgs : any) {
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

    /**
     * Setting request header
     * @param {any} request
     */
    setRequestHeader(request: any) {
      request.setRequestHeader(
          'Authorization',
          'Bearer ' + this.instance.token
      );
    }

    /**
     * On Auth Success callback
     * @param {any} callbackFunction
     */
    set onAuthSuccess(callbackFunction : any) {
      if (this.authenticated) {
        callbackFunction();
      } else {
        this._callbackFunctions.push(callbackFunction);
      }
    }

  _callbackFunctions : any[] = [];

  /**
   * Storing tokens
   */
  private storeTokens() {
    console.log('Storing Tokens');
    localStorage.setItem('kc_token', this.instance.token || '');
    localStorage.setItem(
        'kc_token_parsed',
        JSON.stringify(this.instance.tokenParsed)
    );
    localStorage.setItem(
        'kc_refreshToken',
        this.instance.refreshToken || ''
    );
  }
}
