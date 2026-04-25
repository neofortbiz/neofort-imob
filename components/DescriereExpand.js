'use client'
import { useState } from 'react'

export default function DescriereExpand({ text }) {
  const [expandat, setExpandat] = useState(false)

  return (
    <div>
      <div className="relative">
        <p className="text-sm text-gray-600 leading-relaxed"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: expandat ? 'unset' : 8,
            WebkitBoxOrient: 'vertical',
            overflow: expandat ? 'visible' : 'hidden',
          }}>
          {text}
        </p>
        {!expandat && (
          <div className="absolute bottom-0 left-0 right-0 h-8"
            style={{ background: 'linear-gradient(transparent, white)' }} />
        )}
      </div>
      <button
        onClick={() => setExpandat(!expandat)}
        className="mt-2 text-xs font-medium flex items-center gap-1 transition-colors"
        style={{ color: '#2d7a3a' }}>
        {expandat ? (
          <>Vezi mai puțin <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="18 15 12 9 6 15"/></svg></>
        ) : (
          <>Citește mai mult <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg></>
        )}
      </button>
    </div>
  )
}
