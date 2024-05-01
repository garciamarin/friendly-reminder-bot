function getWeeksCount(date: Date): number {
  const epoch = new Date("2024-01-01T00:00:00Z");

  // Calculate the time difference in milliseconds between the given date and the epoch
  const timeDifference = date.getTime() - epoch.getTime();

  // Convert the time difference from milliseconds to weeks
  const weeksDifference = timeDifference / (1000 * 60 * 60 * 24 * 7);

  // Return the calculated number of weeks
  return Math.floor(weeksDifference);
}

export function isEvenWeek(data: Date): boolean {
  return getWeeksCount(data) % 2 === 0;
}
