// //import React from 'react';
// import reactLogo from './assets/react.svg'

// import { Link, useNavigate } from 'react-router-dom';



// const Navbar = () => {
//   const navigate = useNavigate();

//   return (
//     <nav className="bg-white ">
//       <div className="container mx-auto px-4 py-2 flex justify-between items-center">
//         <div className="text-xl font-bold">
//           <a href="https://react.dev" target="_blank">
//             <img src={reactLogo} className="logo react" alt="React logo" />
//           </a>
//           <a>
//             Pexels Store

//           </a>
//         </div>

//         <ul className="flex space-x-6">
//           <li className="hover:text-gray-600">
//             <Link to="/">Home</Link>
//           </li>
//           <li>
//             <Link
//               to="/crear-anuncio"
//               className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded transition duration-300"
//             >
//               Publicar Anuncio
//             </Link>
//           </li>

//           <li className="hover:text-gray-600">
//             <Link to="#">Contact</Link>
//           </li>
//         </ul>

//       </div>
//     </nav>
//   );
// };

// export default Navbar;



// src/Navbar.tsx
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link to="/">Pexels Store</Link>
        </div>
        <ul className="flex space-x-6">
          <li className="hover:text-gray-600">
            <Link to="/">Home</Link>
          </li>
          <li
            className="hover:text-gray-600 cursor-pointer"
            onClick={() => navigate('/crear-anuncio')}
          >
            Publicar Anuncio
          </li>
          <li className="hover:text-gray-600">
            <Link to="#">Contact</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
