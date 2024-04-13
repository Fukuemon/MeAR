import { useAtom } from 'jotai'
import { selectedTabAtom, tabDataAtom } from './FeedTabsAtom'
import { FeedTabsPresenter } from './FeedTabsPresenter'
export function FeedTabsContainer() {
  const [tabContents] = useAtom(tabDataAtom)
  const [selectedTab, setSelectedTab] = useAtom(selectedTabAtom)

  const handleSelectTab = (tab: string) => {
    setSelectedTab(tab)
  }

  return <FeedTabsPresenter contents={tabContents} selectedTab={selectedTab} onSelectTab={handleSelectTab} />
}
