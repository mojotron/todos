export default class FormatDateModule {
  static #getNumberOfDays(dateInput) {
    const now = new Date();
    const date = new Date(dateInput);
    return Math.floor((date - now) / (24 * 60 * 60 * 1000));
  }
  static #formatDate(dateInput) {
    const date = new Date(dateInput);
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return Intl.DateTimeFormat(navigator.language, options).format(date);
  }

  static formatDateString(dateInput) {
    const days = this.#getNumberOfDays(dateInput);
    if (days < 0) return `deadline passed ${this.#formatDate(dateInput)}`;
    if (days === 0) return 'today';
    if (days === 1) return 'tomorrow';
    if (days < 8) return `${days} days`;
    return this.#formatDate(dateInput);
  }

  static isToday(dateInput) {
    return this.#getNumberOfDays(dateInput) === 0;
  }
  static isInSevenDays(dateInput) {
    const days = this.#getNumberOfDays(dateInput);
    return days < 8 && days > 0;
  }
}
