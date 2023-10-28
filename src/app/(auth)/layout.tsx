export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="m-4 h-auto w-full max-w-md rounded-md border bg-white p-10 ">{children}</div>
    </div>
  )
}
