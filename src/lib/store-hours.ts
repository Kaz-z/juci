import { site } from '../../site.config'

/** Uses first `site.hours` row (e.g. Mo–Su) for open/close in Europe/London. */
export function isStoreOpenNow(): boolean {
  const h = site.hours[0]
  if (!h) return false

  const timeStr = new Date().toLocaleString('en-GB', {
    timeZone: 'Europe/London',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
  const [hh, mm] = timeStr.split(':').map((n) => parseInt(n, 10))
  if (Number.isNaN(hh) || Number.isNaN(mm)) return false

  const nowM = hh * 60 + mm
  const [openH, openM] = h.open.split(':').map((n) => parseInt(n, 10))
  const [closeH, closeM] = h.close.split(':').map((n) => parseInt(n, 10))
  const openMinutes = openH * 60 + openM
  const closeMinutes = closeH * 60 + closeM

  return nowM >= openMinutes && nowM < closeMinutes
}

export function storeHoursRangeLabel(): string {
  const h = site.hours[0]
  if (!h) return ''
  return `${h.open}–${h.close}`
}
