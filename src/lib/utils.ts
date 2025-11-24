import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateInput: string, locale: string = "en") {
  const date = new Date(dateInput)
  if (Number.isNaN(date.getTime())) {
    return dateInput
  }

  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short"
  }).format(date)
}
