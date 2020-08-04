/**
 * Store the "config" in memory and use this transport to access it
 */
export class Config {
  /**
   * @todo refactor to make private
   */
  data = {};

  /**
   * @param {{}} data
   */
  constructor(data) {
    this.data = data;
  }

  /**
   * @param {[]} fields
   * @returns {{}}
   */
  get(fields) {
    // Return multiple fields
    const result = {};
    fields.forEach((field) => {
      const value = this.data[field];

      if (value === undefined) {
        // eslint-disable-next-line no-console
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
    this.data = {
      ...this.data, ...data,
    };
  }
}

export default Config;
