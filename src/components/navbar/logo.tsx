export const Logo  = () => {
  return (
      <div className="flex items-center">
    <img
      src="/logoNimbus.svg"
      alt="Logo Light"
      className="h-15 w-auto block dark:hidden object-contain"
    />

    <img
      src="/logoNimbusDark.svg"
      alt="Logo Dark"
      className="h-15 w-auto hidden dark:block object-contain bg-white"
    />
  </div>

  )
}

export default Logo