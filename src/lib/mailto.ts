/** RFC-safe length guard — some clients truncate long mailto URLs. */
const MAX_BODY_CHARS = 65000

export function buildMailtoHref(to: string, subject: string, body: string): string {
  let text = body
  if (text.length > MAX_BODY_CHARS) {
    text = `${text.slice(0, MAX_BODY_CHARS)}\n\n[Message truncated — please shorten and try again.]`
  }
  // encodeURIComponent uses %20 for spaces; URLSearchParams uses +, which many mail
  // clients leave visible in the composed message.
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`
}
