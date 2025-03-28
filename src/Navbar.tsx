
// import { Link } from 'react-router-dom';



// src/Navbar.tsx
import { Link } from 'react-router-dom';
import reactLogo from './assets/react.svg'

interface NavbarProps {
  onPublicarClick?: () => void;
}

export default function Navbar({ onPublicarClick }: NavbarProps) {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="text-xl font-bold">
        <a href="https://react.dev" target="_blank">
           <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
          <Link to="/">Pexels Store</Link>
        </div>
        <ul className="flex space-x-6 items-center">
          <li className="hover:text-gray-600">
            <Link to="/">Home</Link>
          </li>
          <li>
            <button
              onClick={onPublicarClick}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
            >
              Publicar Anuncio
            </button>
          </li>
          <li className="hover:text-gray-600">
            <a href="#">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

