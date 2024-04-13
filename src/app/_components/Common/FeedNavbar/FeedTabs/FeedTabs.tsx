type Props = {
  contents: string[]
}

export function FeedTabs({ contents }: Props) {
  return (
    <div className="flex w-full items-end justify-between px-12 ">
      {contents.map((content) => (
        <div key={content} className="flex items-end justify-end space-x-5">
          <p className="text-center text-base text-text sm:text-3xl">{content}</p>
        </div>
      ))}
    </div>
  )
}
