function getWeeksCount(date: Date): number {
  const epoch = new Date("2024-01-01T00:00:00Z");

  const timeDifference = date.getTime() - epoch.getTime();

  const weeksDifference = timeDifference / (1000 * 60 * 60 * 24 * 7);

  return Math.floor(weeksDifference);
}

export function isEvenWeek(data: Date): boolean {
  return getWeeksCount(data) % 2 === 0;
}
