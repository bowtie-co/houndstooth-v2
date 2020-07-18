/* global localStorage, sessionStorage */

import EventEmitter from 'eventemitter2';

const { REACT_APP_STORAGE_DRIVER = 'session' } = process.env;

export class Storage extends EventEmitter {
  constructor() {
    super();

    const useSessionDriver = () => /session/ig.test(REACT_APP_STORAGE_DRIVER);

    this.driver = useSessionDriver() ? sessionStorage : localStorage;
  }

  set (key, value) {
    const flatValue = typeof value === 'object' ? JSON.stringify(value) : value;

    // console.debug('STORGE: SET', { key, value, flatValue });

    this.driver.setItem(key, flatValue);

    this.emit('change', { key, value });
    this.emit(`${key}_changed`, value);
  }

  get (key) {
    const storedValue = this.driver.getItem(key);

    try {
      return JSON.parse(storedValue);
    } catch (e) {
      return storedValue;
    }
  }

  getOr (key, other) {
    const storedValue = this.driver.getItem(key);

    if (!storedValue) return other;

    try {
      return JSON.parse(storedValue);
    } catch (e) {
      return storedValue;
    }
  }

  remove (key) {
    this.driver.removeItem(key);

    this.emit('remove', key);
    this.emit(`${key}_removed`);
  }

  clear () {
    this.driver.clear();

    this.emit('clear');
  }
}

export const storage = new Storage();
