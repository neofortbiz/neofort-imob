'use client'
import { useEffect, useRef } from 'react'

// Culori conform instructiunilor
const STATUS_COLORS = {
  activ:       '#2d7a3a',  // verde
  constructie: '#2563eb',  // albastru
  promotie:    '#dc2626',  // rosu
  vandut:      '#f97316',  // portocaliu - portofoliu
  retras:      '#9ca3af',  // gri
}

const STATUS_LABELS = {
  activ: 'Finalizat', constructie: 'In constructie',
  promotie: 'Promotie', vandut: 'Vandut', retras: 'Retras',
}

function svgPin(color, label, size = 28) {
  const s = size
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s * 1.4}" viewBox="0 0 28 39">
    <filter id="sh"><feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.3"/></filter>
    <path d="M14 0C6.27 0 0 6.27 0 14c0 10.5 14 25 14 25S28 24.5 28 14C28 6.27 21.73 0 14 0z"
      fill="${color}" filter="url(#sh)"/>
    <circle cx="14" cy="14" r="7" fill="white" opacity="0.95"/>
    <text x="14" y="18" text-anchor="middle" font-size="7" font-weight="700"
      font-family="system-ui,sans-serif" fill="${color}">${label}</text>
  </svg>`
  return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)))
}

export default function HartaLeaflet({ activeMarkers, portofoliuMarkers, showPortofoliu, onSelect, selected }) {
  const mapRef = useRef(null)
  const leafletMapRef = useRef(null)
  const markersRef = useRef([])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (leafletMapRef.current) return

    // Importam Leaflet dinamic
    import('leaflet').then(L => {
      // Fix iconite default Leaflet
      delete L.Icon.Default.prototype._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      })

      // Initializam harta centrata pe Bucuresti
      const map = L.map(mapRef.current, {
        center: [44.430, 26.105],
        zoom: 12,
        zoomControl: true,
        scrollWheelZoom: true,
      })

      // OpenStreetMap tile layer - gratuit, fara API key
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map)

      leafletMapRef.current = map
      leafletMapRef.current._L = L

      addMarkers(map, L)
    })

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove()
        leafletMapRef.current = null
      }
    }
  }, [])

  // Actualizam markere cand se schimba datele
  useEffect(() => {
    const map = leafletMapRef.current
    if (!map || !map._L) return
    const L = map._L

    // Stergem markere vechi
    markersRef.current.forEach(m => m.remove())
    markersRef.current = []

    addMarkers(map, L)
  }, [activeMarkers, portofoliuMarkers, showPortofoliu, selected])

  function addMarkers(map, L) {
    const allMarkers = [
      ...activeMarkers,
      ...(showPortofoliu ? portofoliuMarkers : []),
    ]

    allMarkers.forEach(a => {
      if (!a.coords) return
      const [lat, lng] = a.coords
      const color = a.categorie === 'portofoliu'
        ? STATUS_COLORS.vandut
        : (STATUS_COLORS[a.pinColor || a.status] || '#6b7280')

      const isSelected = selected === a.slug
      const size = a.categorie === 'portofoliu' ? 22 : 28
      const iconSize = isSelected ? [size * 1.3, size * 1.3 * 1.4] : [size, size * 1.4]

      const icon = L.icon({
        iconUrl: svgPin(color, String(a.numar), isSelected ? size * 1.3 : size),
        iconSize: iconSize,
        iconAnchor: [iconSize[0] / 2, iconSize[1]],
        popupAnchor: [0, -iconSize[1]],
      })

      const marker = L.marker([lat, lng], { icon })
        .addTo(map)
        .on('click', () => {
          if (onSelect) onSelect(a.slug === selected ? null : a.slug)
        })

      // Popup la click
      const popupContent = `
        <div style="font-family:system-ui,sans-serif;min-width:180px">
          <div style="font-size:12px;font-weight:600;color:#111;margin-bottom:4px">${a.zona}</div>
          <div style="font-size:11px;color:#666;margin-bottom:6px">${a.sector || ''}</div>
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:8px">
            <span style="background:${color};color:white;font-size:9px;padding:2px 6px;border-radius:10px;font-weight:600">
              ${a.categorie === 'portofoliu' ? 'VÂNDUT' : a.dataPredare === 'Finalizat' ? 'FINALIZAT' : 'ÎN CONSTRUCȚIE'}
            </span>
            ${a.pretDeLa ? `<span style="font-size:12px;font-weight:700;color:${color}">${a.pretDeLa.toLocaleString()}€</span>` : ''}
          </div>
          <a href="${a.categorie === 'portofoliu' ? '/portofoliu/' + a.slug : '/ansamblu-rezidential/' + a.slug}"
            style="display:block;text-align:center;background:${color};color:white;padding:6px;border-radius:8px;font-size:11px;font-weight:600;text-decoration:none">
            Vezi detalii →
          </a>
        </div>`

      marker.bindPopup(popupContent, { maxWidth: 220, offset: [0, -iconSize[1] + 5] })

      if (isSelected) {
        setTimeout(() => marker.openPopup(), 50)
        map.panTo([lat, lng], { animate: true })
      }

      markersRef.current.push(marker)
    })
  }

  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        crossOrigin=""
      />
      <div
        ref={mapRef}
        style={{ width: '100%', height: '100%', borderRadius: 'inherit' }}
      />
    </>
  )
}
