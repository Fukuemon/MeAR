import { FC, ReactNode, ChangeEvent, MouseEvent } from 'react'
import { ButtonProps } from '@/components/ui/button'
import { Input, InputProps } from '@/components/ui/input'

interface Props {
  inputProps: InputProps
  buttonProps: ButtonProps
  isButton?: boolean
  icon?: ReactNode
  handleInput: (e: ChangeEvent<HTMLInputElement>) => void
  handleClick?: (e: MouseEvent<HTMLButtonElement>) => void
  children?: ReactNode // children プロパティを追加
}

const InputButtonCombo: FC<Props> = ({ inputProps, icon, handleInput }) => {
  return (
    <div className="container relative flex w-full max-w-sm items-center justify-center space-x-2">
      {/* インプット入力欄 */}
      <Input {...inputProps} type="text" className={`block w-full ${icon && 'pl-10'}`} onChange={handleInput} />

      {/* アイコンが必要なら */}
      {icon && <div className="absolute left-1 top-3 text-xl text-gray-500 dark:text-gray-400">{icon}</div>}
    </div>
  )
}

export default InputButtonCombo
