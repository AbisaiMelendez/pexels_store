//import { useState } from 'react'
import './index.css'
import Navbar from './Navbar'
import HeroSection from './HeroSection'
import ProductCard from './ProductCard'
import Footer from './assets/Footer'

function App() {
//const [count, setCount] = useState(0)
  const products = [
    { name: 'Product 1', price: 29.99, image: 'https://i.etsystatic.com/27567438/r/il/722ec6/6231657213/il_794xN.6231657213_fu3j.jpg' },
    { name: 'Product 2', price: 39.99, image: 'https://i.etsystatic.com/27567438/r/il/722ec6/6231657213/il_794xN.6231657213_fu3j.jpg' },
    { name: 'Product 2', price: 39.99, image: 'https://i.etsystatic.com/27567438/r/il/722ec6/6231657213/il_794xN.6231657213_fu3j.jpg' },
    { name: 'Product 2', price: 39.99, image: 'https://i.etsystatic.com/27567438/r/il/722ec6/6231657213/il_794xN.6231657213_fu3j.jpg' },
  ];

  return (
    <>
      <div>
        <Navbar></Navbar>
        <HeroSection></HeroSection>

        <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
        <Footer></Footer>
      </div>

    </>
  )
}

export default App
