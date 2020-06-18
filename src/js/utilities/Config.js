/**
 * Store the "config" in memory and use this transport to access it
 */
export class Config {
  _data = {};

  /**
   * @param {{}} data
   */
  constructor(data) {
    this._data = data;
  };

  /**
   * @param {[]} fields
   * @returns {{}}
   */
  get(fields) {
    // Return multiple fields
    const result = {};
    fields.forEach((field) => {
      const value = this._data[field];

      if (value === undefined) {
        console.warn(`'${field}' is not available in the config`);
        // Skip this field (in the loop)
        return;
      }

      // Add the value to the result
      result[field] = JSON.parse(JSON.stringify(value));
    });

    return result;
  }

  /**
   * @param {{}} data
   */
  set(data) {
    this._data = {...this._data, ...data};
  }
}

export default Config;
