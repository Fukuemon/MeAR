type Props = {
  contents: string[]
  selectedTab: string
  onSelectTab: (tab: string) => void
}

export function FeedTabsPresenter({ contents, selectedTab, onSelectTab }: Props) {
  return (
    <div className="flex w-full justify-center space-x-12">
      {contents.map((tab) => (
        <button
          className={`pb-2 text-start text-base font-medium ${
            tab === selectedTab
              ? 'border-b-4 border-primary  text-primary'
              : ' border-b-4 border-transparent text-gray-400  hover:border-primary hover:text-primary'
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
