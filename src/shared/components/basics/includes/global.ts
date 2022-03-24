

/**
 * Global-Helper for different calculations
 */
export class Global {
  /**
   * Checks if an object is null or undefined
   * @param {Object} obj
   * @return {boolean}
   */
  public static isEmpty(obj: Object) : boolean {
    return obj == null || obj == undefined;
  }

  /**
   * Is current Device a mobile Device?
   * @return {boolean}
   */
  public static get isMobile(): boolean {
    return !!navigator
        .userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
  }
}
