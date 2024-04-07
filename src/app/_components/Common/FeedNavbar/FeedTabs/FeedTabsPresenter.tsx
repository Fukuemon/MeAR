type Props = {
  contents: string[]
  selectedTab: string
  onSelectTab: (tab: string) => void
}

export function FeedTabsPresenter({ contents, selectedTab, onSelectTab }: Props) {
  return (
    <div className="flex w-full items-end justify-between px-12">
      {contents.map((tab) => (
        <button
          className={`text-center text-lg font-medium ${
            tab === selectedTab
              ? 'border-b-2 border-primary  text-primary'
              : 'border-b-2 border-transparent text-gray-400  hover:border-primary hover:text-primary'
          }`}
          key={tab}
          onClick={() => onSelectTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}
