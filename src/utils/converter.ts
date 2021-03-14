const ONE_MINUTES = 60;
const ONE_HOUR = 60 * ONE_MINUTES;

export const time2Seconds = (
  hours: number = 0,
  mins: number = 0,
  seconds: number = 0
): number => {
  let result = 0;
  if (hours > 0) {
    result += hours * ONE_HOUR;
  }

  if (mins > 0) {
    result += mins * ONE_MINUTES;
  }

  if (seconds > 0) {
    result += seconds;
  }

  return result;
};

export const seconds2Display = (seconds?: number): string => {
  if (!seconds) {
    return '0';
  }

  let hours = 0;
  let mins = 0;
  if (seconds >= ONE_HOUR) {
    hours = Math.floor(seconds / ONE_HOUR);
    seconds -= hours * ONE_HOUR;
  }

  if (seconds >= ONE_MINUTES) {
    mins = Math.floor(seconds / ONE_MINUTES);
    seconds -= mins * ONE_MINUTES;
  }

  const result = [];
  if (hours) {
    result.push(hours);
  }

  result.push(mins);
  result.push(seconds);

  return result.map((value) => to2Number(value)).join(':');
};

const to2Number = (number: number): string | number => {
  if (number > 9) return number;

  return `0${number}`;
};
