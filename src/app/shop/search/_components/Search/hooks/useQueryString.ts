import { useCallback } from 'react'

interface SearchParams {
  keyword?: string
  range?: string
  lat?: string
  lng?: string
}

// クエリパラメータを作成するカスタムフック
const useQueryString = () => {
  return useCallback((params: SearchParams) => {
    // useCallbackでメモ化
    const query = new URLSearchParams() // URLSearchParamsをインスタンス化
    Object.entries(params).forEach(([key, value]) => {
      // Object.entriesでオブジェクトを配列に変換
      if (value) query.set(key, value) // 値がある場合はクエリパラメータをセット
    })
    return query.toString() // クエリパラメータを文字列に変換
  }, [])
}

export default useQueryString
