export function formatDuration(seconds) {
  if (!seconds || isNaN(seconds)) return "0s";

  if (seconds < 60) {
    return `${seconds}s`;
  }

  const minutes = seconds / 60;
  if (minutes < 60) {
    return `${minutes.toFixed(1)}m`;
  }

  const hours = minutes / 60;
  return `${hours.toFixed(1)}h`;
}
