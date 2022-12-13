export const getFormatDate = (date : string) => new Date(date).toLocaleDateString('en-EN', {
  month: 'long',
  year: 'numeric',
});
