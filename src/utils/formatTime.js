import es from "date-fns/locale/es";
import { format, getTime, formatDistanceToNow } from "date-fns/";

// ----------------------------------------------------------------------

export function fDate(date, newFormat) {
  const fm = newFormat || "dd MMM yyyy";

  return date
    ? format(new Date(date.replace(/-/g, "/")), fm, { locale: es })
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
