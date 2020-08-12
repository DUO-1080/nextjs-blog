import { parseISO, format } from "date-fns";

export function Date({ dateString }) {
  const date = parseISO(dateString);
  return <time>{format(date, "LLLL dd, yyyy")}</time>;
}
