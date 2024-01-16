'use client'
import React, { useEffect, FC } from 'react'
interface ModelViewerProps {
  src: string
  poster?: string
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': MyElementAttributes
    }
    interface MyElementAttributes {
      className?: string
      src: string
      poster?: string
      alt?: string
      ar?: boolean
      scale?: string
      style?: React.CSSProperties
      'auto-rotate'?: boolean
      'camera-controls'?: boolean
    }
  }
}

const ModelViewer: FC<ModelViewerProps> = ({ src, poster }) => {
  useEffect(() => {
    import('@google/model-viewer').catch(console.error)
  }, [])

  return (
    <model-viewer
      style={{ width: '100%', height: '100%' }}
      src={src}
      poster={poster}
      auto-rotate
      camera-orbit="0deg 45deg 90%"
      min-camera-orbit="0deg 0deg 100%"
      max-camera-orbit="720deg 90deg 200%"
      camera-controls
      ar
    ></model-viewer>
  )
}

export default ModelViewer
