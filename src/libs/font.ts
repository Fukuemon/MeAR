import { Source_Code_Pro } from 'next/font/google'
import { Noto_Sans_JP } from 'next/font/google'

export const soucecodepro = Source_Code_Pro({
  // 後ほどTailwindCSSで指定する変数名を指定する
  variable: '--font-source-code-pro',
  // 利用したいweightやstyleなど指定する
  weight: ['400', '700'],
  style: 'normal',
  // サブセット
  subsets: ['latin'],
  // 代替フォントを表示する
  display: 'swap'
})

export const notojp = Noto_Sans_JP({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-notojp',
  display: 'swap'
})
