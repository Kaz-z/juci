import { type ClassValue, clsx } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatPhoneForDisplay(phone: string): string {
  // Remove any non-digit characters except +
  const cleaned = phone.replace(/[^\d+]/g, '')
  
  // Format UK phone numbers
  if (cleaned.startsWith('+44')) {
    const digits = cleaned.slice(3)
    if (digits.length === 10) {
      return `+44 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`
    }
  }
  
  return phone
}

export function formatPhoneForTel(phone: string): string {
  // Clean phone number for tel: links
  return phone.replace(/[^\d+]/g, '')
}
