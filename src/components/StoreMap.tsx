'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { site } from '../../site.config'

function useFixLeafletIcons() {
  useEffect(() => {
    delete (L.Icon.Default.prototype as { _getIconUrl?: string })._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl:
        'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    })
  }, [])
}

export default function StoreMap() {
  useFixLeafletIcons()

  const { lat, lng, title } = site.store

  return (
    <MapContainer
      center={[lat, lng]}
      zoom={16}
      scrollWheelZoom
      className="z-0 h-full min-h-[280px] w-full rounded-xl lg:rounded-none lg:rounded-r-xl"
      aria-label="Map showing JUCI location"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      <Marker position={[lat, lng]}>
        <Popup>
          <strong className="font-semibold">{title}</strong>
          <br />
          {site.address}
        </Popup>
      </Marker>
    </MapContainer>
  )
}
