'use client'
import React, { useEffect, FC, CSSProperties, useState } from 'react'
interface ModelViewerProps {
  src: string
  image: string
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

const useResponsiveStyle = () => {
  const [style, setStyle] = useState<CSSProperties>({})

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 900) {
        setStyle({ width: '375px', height: '300px' })
      } else {
        setStyle({ width: '100%', height: '300px' })
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return style
}

const ModelViewer: FC<ModelViewerProps> = ({ src }) => {
  const style = useResponsiveStyle()

  useEffect(() => {
    import('@google/model-viewer').catch(console.error)
  }, [])

  return <model-viewer style={style} className="w-full h-full" src={src} auto-rotate camera-controls ar></model-viewer>
}

export default ModelViewer
