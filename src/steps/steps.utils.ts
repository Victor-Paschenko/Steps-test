const day = 24 * 60 * 60;

export function sameDay(timestampDay: number, timestampTo: number) {  
  const isAfterRequiredDate = timestampTo > timestampDay;
  const inSameDay = timestampTo - timestampDay < day;

  return isAfterRequiredDate && inSameDay;
}