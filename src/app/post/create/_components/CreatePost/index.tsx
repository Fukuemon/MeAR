'use client'
import { ChangeEvent, useState } from 'react'
import { AiFillMoneyCollect } from 'react-icons/ai'
import { BiCube, BiImageAdd } from 'react-icons/bi'
import { MdRestaurant } from 'react-icons/md'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { DatePicker } from '../../../../_components/Form/DatePicker'
import InputButtonCombo from '../../../../_components/Form/InputButtonCombo'

const CreatePost = () => {
  const [menuText, setMenuText] = useState('')
  const [priceText, setPriceText] = useState('')

  const handleSMenuInput = (e: ChangeEvent<HTMLInputElement>) => {
    setMenuText(e.target.value)
  }

  const handlePriceInput = (e: ChangeEvent<HTMLInputElement>) => {
    setPriceText(e.target.value)
  }

  // メニューボックスのprops
  const MenuProps = {
    inputProps: {
      value: menuText,
      placeholder: '食べたものを入力'
    },
    buttonProps: {
      className: 'bg-green-700 hover:bg-green-900 text-white w-24'
    },
    icon: <MdRestaurant />,
    handleInput: handleSMenuInput,
    handleClick: () => {} // 何もしない)
  }

  // 値段ボックスのprops
  const PriceProps = {
    inputProps: {
      value: priceText,
      placeholder: '値段を入力'
    },
    buttonProps: {
      className: 'bg-green-700 hover:bg-green-900 text-white w-24'
    },
    icon: <AiFillMoneyCollect />,
    handleInput: handlePriceInput,
    handleClick: () => {} // 何もしない)
  }

  return (
    <div>
      <DatePicker />
      {/* //   ファイルアップロード */}
      <div className="py-8 flex space-x-14 items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <label className="w-32 h-32 flex flex-col items-center px-4 py-6 bg-gray-50 text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue">
            <BiImageAdd className="text-4xl" />
            <input type="file" className="hidden" />
          </label>
          <p className="text-sm text-gray-500 pt-2">画像を追加</p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <label className="w-32 h-32 flex flex-col items-center px-4 py-6 bg-gray-50 text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue">
            <input type="file" className="hidden" />
            <BiCube className="text-4xl" />
          </label>
          <p className="text-sm text-gray-500 pt-2">3Dファイルを追加</p>
        </div>
      </div>

      {/* 入力欄 */}
      <div className="flex flex-col gap-y-6 py-4">
        {/* メニューインプット */}
        <InputButtonCombo {...MenuProps} />
        {/* 値段インプット */}
        <InputButtonCombo {...PriceProps} />
      </div>

      {/* 評価 */}

      {/* tag */}
      <Button className="bg-green-500 hover:bg-green-900 text-white"># タグを追加</Button>

      {/* コメント */}
      <div className="flex flex-col gap-y-6 py-4">
        <Textarea className="w-full" placeholder="レビューを入力" rows={5} />
      </div>
    </div>
  )
}

export default CreatePost
