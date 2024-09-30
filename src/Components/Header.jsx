import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [randomImage, setRandomImage] = useState("");

  useEffect(() => {
    const images = [
      "/assets/1.png",
      "/assets/2.png",
      "/assets/3.png",
      "/assets/4.png",
    ];
    const randomIndex = Math.floor(Math.random() * images.length);
    setRandomImage(images[randomIndex]);
  }, []);

  return (
    <header
      className="text-center mb-6 hover:cursor-pointer"
      onClick={() => navigate("/")}
    >
      {randomImage && (
        <img
          src={randomImage}
          alt="Header Logo"
          className="w-full max-w-[100px] h-auto mx-auto z-10"
        />
      )}
    </header>
  );
};

export default Header;
