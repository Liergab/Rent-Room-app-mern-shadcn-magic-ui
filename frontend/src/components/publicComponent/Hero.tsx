import BoxReveal from "../magicui/box-reveal"

const Hero = () => {
  return (
    <div className='bg-slate-200 dark:bg-zinc-950  border-b dark:border-zinc-900 pt-10 pb-16 px-4 md:px-0'>
        <div className='container mx-auto flex flex-col gap-2'>
            <BoxReveal boxColor={"#80498a"} duration={0.5}>
              <p className="text-5xl font-bold bg-gradient-to-tr from-gray-900 to-fuchsia-700 dark:to-fuchsia-300 bg-clip-text text-transparent ">
              Find your next stay
              </p>
            </BoxReveal>
            <BoxReveal boxColor={"#80498a"} duration={0.5}>
              <p className="text-2xl text-bleached-cedar-900 dark:text-bleached-cedar-100 ">
              Search low prices on hotels for your drean vacations...
              </p>
            </BoxReveal>
        </div>
    </div>
  )
}

export default Hero