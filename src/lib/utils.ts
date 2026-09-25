import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateInput: string, locale: string = "en") {
  if (/^\d{4}$/.test(dateInput)) {
    return dateInput
  }

  const yearMonth = /^(\d{4})-(\d{2})$/.exec(dateInput)
  const date = yearMonth
    ? new Date(Number(yearMonth[1]), Number(yearMonth[2]) - 1, 1)
    : new Date(dateInput)
  if (Number.isNaN(date.getTime())) {
    return dateInput
  }

  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short"
  }).format(date)
}
