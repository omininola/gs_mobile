export function getFormatedTime(dateString: string) {
  const date = new Date(dateString);
  const hour = date.getHours().toString().padEnd(2, "0");
  const mins = date.getMinutes().toString().padEnd(2, "0");
  return hour.concat(":", mins);
}

export function getFormatedDate(dateString: string) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  return day.concat("/", month, "/", year);
}
