import { useEffect, useState } from 'react'

// 現在地を取得するカスタムフック
const useLocation = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)

  useEffect(() => {
    // 位置情報の取得
    if (navigator.geolocation) {
      // ブラウザが位置情報の取得に対応しているか確認
      navigator.geolocation.getCurrentPosition((position) => {
        // 現在地を取得
        setLocation({
          // 現在地をstateに保存
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      })
    }
  }, []) // 一度だけ実行

  return location // 現在地を返す
}

export default useLocation
