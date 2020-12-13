export function validateDateInput(inputDate: Date): boolean {
  inputDate = new Date(inputDate);
  const now: Date = new Date();
  const date = inputDate.getDate();
  const month = inputDate.getMonth();
  const year = inputDate.getFullYear();

  if (
    date < now.getDate() ||
    month < now.getMonth() ||
    year < now.getFullYear()
  ) {
    return false;
  }

  return true;
}
