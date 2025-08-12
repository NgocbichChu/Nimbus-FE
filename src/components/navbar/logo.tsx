export const Logo = () => {
  return (
    <div className="flex items-center object-contain">
      <img
        src="/logoNimbus.svg"
        alt="Logo Light"
        className="h-15 w-auto block dark:hidden "
      />

      <img
        src="/logoNimbusDark.svg"
        alt="Logo Dark"
        className="h-15 w-auto hidden dark:block  bg-white"
      />
    </div>
  )
}

export default Logo
