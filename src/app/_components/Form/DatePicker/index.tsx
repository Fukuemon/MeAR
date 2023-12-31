'use client'
import * as React from 'react'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale' // 日本語ロケールをインポート
import { CalendarIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/libs/tailwind/utils'

// onChangeとvalueのプロパティを追加
export function DatePicker({ onChange }: { onChange: (date: Date | undefined) => void }) {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  const handleDateChange = (date: Date | undefined) => {
    setDate(date)
    onChange(date)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn('w-[240px] justify-start text-left font-normal', !date && 'text-muted-foreground')}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP', { locale: ja }) : <span>日付を選択</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={date} onSelect={handleDateChange} initialFocus />
      </PopoverContent>
    </Popover>
  )
}
