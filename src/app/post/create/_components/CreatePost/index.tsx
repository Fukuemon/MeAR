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
      <div className="flex items-center justify-center space-x-14 py-8">
        <div className="flex flex-col items-center justify-center">
          <label className=" flex h-32 w-32 cursor-pointer flex-col items-center rounded-lg border bg-gray-50 px-4 py-6 uppercase tracking-wide text-blue-500 shadow-lg hover:bg-gray-300">
            <BiImageAdd className="text-4xl" />
            <input type="file" className="hidden" />
          </label>
          <p className="pt-2 text-sm text-gray-500">画像を追加</p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <label className="flex h-32 w-32 cursor-pointer flex-col items-center rounded-lg border bg-gray-50 px-4 py-6 uppercase tracking-wide text-blue-500 shadow-lg hover:bg-gray-300">
            <input type="file" className="hidden" />
            <BiCube className="text-4xl" />
          </label>
          <p className="pt-2 text-sm text-gray-500">3Dファイルを追加</p>
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
      <Button className="bg-green-500 text-white hover:bg-green-900"># タグを追加</Button>

      {/* コメント */}
      <div className="flex flex-col gap-y-6 py-4">
        <Textarea className="w-full" placeholder="レビューを入力" rows={5} />
      </div>
    </div>
  )
}

export default CreatePost
