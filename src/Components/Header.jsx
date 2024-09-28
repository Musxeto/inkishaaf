import React from 'react';
import { useNavigate } from 'react-router-dom';
const Header = () => {
    const navigate = useNavigate()
  return (
    <header className="text-center mb-6 hover: cursor-pointer"onClick={()=> navigate("/")}>
      <h1 className="text-2xl sm:text-4xl md:text-4xl lg:text-4xl font-bold text-black">
        INKISHAAF.
      </h1>
    </header>
  );
};

export default Header;
