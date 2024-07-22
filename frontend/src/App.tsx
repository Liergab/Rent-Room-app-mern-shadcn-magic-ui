

import './App.css'
import DarkModeToggle from './components/DarModeToggle'
import BlurIn from './components/magicui/blur-in'
import { Button } from './components/ui/button'


function App() {


  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-black dark:text-white"'>
      <DarkModeToggle/>
        <h1 className="text-3xl font-bold underline">
          Hello world!
        </h1>
        <Button>Click me</Button>
        <BlurIn word={"Hello World"}></BlurIn>

    </div>
  
  )
}

export default App
