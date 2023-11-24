import React, { ChangeEvent } from 'react'
import { icons } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface Props {
  icon: keyof typeof icons
  type: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  className?: string
}

const InputWithIcon = React.forwardRef<HTMLInputElement, Props>(
  ({ icon, onChange, placeholder, className, type }, ref) => {
    const LucideIcon = icons[icon]
    return (
      <div className={`relative w-[95%] max-w-[500px] rounded-md shadow-sm ${className}`}>
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <LucideIcon className="z-50 h-5 w-5 text-primary" />
        </div>
        <Input
          type={type}
          onChange={onChange}
          placeholder={placeholder}
          ref={ref}
          className="block w-full bg-gray-50 ps-10"
        />
      </div>
    )
  }
)

InputWithIcon.displayName = 'InputWithIcon'

export default InputWithIcon
