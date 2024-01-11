import loadImage, { LoadImageOptions } from 'blueimp-load-image'

type LoadImage = (
  file: File | Blob | string,
  callback: (canvas: HTMLCanvasElement) => void,
  options?: LoadImageOptions
) => void

// 画像圧縮処理
export const useCompressImage = () => {
  const compressImage = (file: File, newFileName: string): Promise<File> => {
    return new Promise((resolve, reject) => {
      ;(loadImage as LoadImage)(
        file,
        (canvas: HTMLCanvasElement) => {
          if (!canvas.toBlob) {
            reject(new Error('お使いのブラウザは Canvas.toBlob メソッドをサポートしていません'))
            return
          }

          canvas.toBlob(
            (blob) => {
              if (blob) {
                const newFile = new File([blob], newFileName, {
                  type: 'image/jpeg',
                  lastModified: Date.now()
                })
                resolve(newFile)
              } else {
                reject(new Error('Image compression resulted in null Blob'))
              }
            },
            'image/jpeg',
            0.7
          )
        },
        {
          maxWidth: 1200,
          canvas: true
        }
      )
    })
  }
  return { compressImage }
}
