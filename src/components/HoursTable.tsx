import { site } from '../../site.config'

export default function HoursTable() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-fg">Opening Hours</h3>
      </div>
      <p className="px-6 py-4 text-fg">{site.hoursDisplay}</p>
    </div>
  )
}
