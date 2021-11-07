export default class FormatDateModule {
  static formatDate(dateEpoch) {
    const date = new Date(dateEpoch);
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return Intl.DateTimeFormat(navigator.language, options).format(date);
  }

  static formatDateString(dateEpoch) {
    const now = new Date();
    const date = new Date(dateEpoch);
    const days = Math.floor((date - now) / (24 * 60 * 60 * 1000));
    if (days < 0) return `deadline passed ${formatDate(dateEpoch)}`;
    if (days === 0) return 'today';
    if (days === 1) return 'tomorrow';
    if (days < 8) return `${days} days`;
    return formatDate(dateEpoch);
  }
}
