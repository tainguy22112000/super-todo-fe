import dayjs from "dayjs";
import localizeFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(localizeFormat);

export const formatDateToDDMMYYY = (date: string) => dayjs(date).format('DD/MM/YYYY');

export const formatDateToDDMMYYWithDayjs = (date: string) => {
  return dayjs(date).format('LLL');
};
