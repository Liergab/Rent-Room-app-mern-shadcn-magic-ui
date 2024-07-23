import BoxReveal from "../magicui/box-reveal"

const Hero = () => {
  return (
    <div className='bg-slate-200 dark:bg-zinc-950 text-black dark:text-white border-b dark:border-zinc-900 pt-10 pb-16'>
        <div className='container mx-auto flex flex-col gap-2'>
            <BoxReveal boxColor={"#80498a"} duration={0.5}>
              <p className="text-5xl font-bold ">
              Find your next stay
              </p>
            </BoxReveal>
            <BoxReveal boxColor={"#80498a"} duration={0.5}>
              <p className="text-2xl ">
              Search low prices on hotels for your drean vacations...
              </p>
            </BoxReveal>
        </div>
    </div>
  )
}

export default Hero