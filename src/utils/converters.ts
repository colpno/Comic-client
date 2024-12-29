import moment from 'moment';

export const toDate = (date: string, format: string = 'MM-DD-YYYY') => moment(date).format(format);

export const toSentenceCase = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
