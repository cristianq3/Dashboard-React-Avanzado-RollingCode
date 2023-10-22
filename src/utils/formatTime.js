import es from "date-fns/locale/es";
import {
  format,
  getTime,
  formatDistanceToNow,
  startOfWeek,
  endOfWeek,
  set,
} from "date-fns/";

// ----------------------------------------------------------------------

export function fDate(date, newFormat) {
  const fm = newFormat || "dd MMM yyyy";

  return date
    ? format(new Date(date.replace(/-/g, "/")), fm, {
        locale: es,
      })
    : "";
}

export function fDateTime(date, newFormat) {
  const fm = newFormat || "dd MMM yyyy p";

  return date ? format(new Date(date), fm, { locale: es }) : "";
}

export function fTimestamp(date) {
  return date ? getTime(new Date(date)) : "";
}

export function fToNow(date) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
        locale: es,
      })
    : "";
}

export function fWeek() {
  // Define your reference date (e.g., today's date)
  const referenceDate = new Date();

  // Get the first day of the week (Monday) for the reference date
  const firstDayOfWeek = startOfWeek(referenceDate, { weekStartsOn: 1 });

  // Get the last day of the week (Sunday) for the reference date
  const lastDayOfWeek = endOfWeek(referenceDate, { weekStartsOn: 1 });

  // Format the first and last day of the week in the desired format
  const formattedFirstDay = format(firstDayOfWeek, "yyyy-MM-dd");
  const formattedLastDay = format(lastDayOfWeek, "yyyy-MM-dd");

  return {
    formattedFirstDay,
    formattedLastDay,
  };
}
