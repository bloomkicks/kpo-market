export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("ru-RU", {dateStyle: "long"}).format(date)
}