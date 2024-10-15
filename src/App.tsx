import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import Navbar from './Navbar'
import HeroSection from './HeroSection'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Navbar></Navbar>
        <HeroSection></HeroSection>
       
      </div>
     
      <div className="bg-blue-500 text-white p-4">
        TailwindCSS is working!
      </div>
      <div className="card">
        <a>Welcome to pexels store</a>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
