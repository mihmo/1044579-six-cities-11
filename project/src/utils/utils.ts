export const getFormatDate = (date : string) => new Date(date).toLocaleDateString('en-EN', {
  month: 'long',
  year: 'numeric',
});

export const setFirstLetterToUppercase = (sting : string) => sting.charAt(0).toUpperCase() + sting.slice(1);

export const getRoundRatingStarsWidthPercent = (rating : number) => Math.round(rating) * 20;
