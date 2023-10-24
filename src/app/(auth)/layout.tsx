export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" flex h-full  items-center justify-center md:w-8/12 ">
      <div className="h-1/2 w-11/12 max-w-[900px] rounded-md border bg-orange-100  p-10 shadow-lg">{children}</div>
    </div>
  )
}
