import { site } from '../../site.config'

export default function HoursTable() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-fg">Opening Hours</h3>
      </div>
      <table className="w-full">
        <thead className="sr-only">
          <tr>
            <th scope="col">Day</th>
            <th scope="col">Hours</th>
          </tr>
        </thead>
        <tbody>
          {site.hours.map((hour, index) => (
            <tr 
              key={index} 
              className={cn(
                'border-b border-gray-100 last:border-0'
              )}
            >
              <td className="px-6 py-4 font-medium text-fg">
                {hour.day}
              </td>
              <td className="px-6 py-4 text-right">
                <span className="text-fg">
                  {hour.open} - {hour.close}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function cn(...classes: (string | undefined | boolean)[]) {
  return classes.filter(Boolean).join(' ')
}
