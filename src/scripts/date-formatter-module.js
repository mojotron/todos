export default class FormatDateModule {
  static formatDate(dateInput) {
    const date = new Date(dateInput);
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return Intl.DateTimeFormat(navigator.language, options).format(date);
  }

  static formatDateString(dateInput) {
    const now = new Date();
    const date = new Date(dateInput);
    const days = Math.floor((date - now) / (24 * 60 * 60 * 1000));
    if (days < 0) return `deadline passed ${this.formatDate(dateInput)}`;
    if (days === 0) return 'today';
    if (days === 1) return 'tomorrow';
    if (days < 8) return `${days} days`;
    return this.formatDate(dateInput);
  }

  static isToday(dateInput) {
    const days = Math.floor(
      (new Date(dateInput) - new Date()) / (24 * 60 * 60 * 1000)
    );
    return days === 0;
  }
  static isInSevenDays(dateInput) {
    const days = Math.floor(
      (new Date(dateInput) - new Date()) / (24 * 60 * 60 * 1000)
    );
    return days < 8 && days > 0;
  }
}
