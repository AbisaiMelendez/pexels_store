import React from 'react';

const HeroSection = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2">
          <h1 className="text-4xl font-bold mb-4">Discover the Latest Fashion Trends</h1>
          <p className="text-lg mb-4">Shop the best deals on our new collection.</p>
          <button className="bg-blue-500 text-white py-2 px-4 rounded">Shop Now</button>
        </div>
        <div className="md:w-1/2">
          <img src="https://www.pixelstalk.net/wp-content/uploads/2016/06/Photos-Download-Fashion-Wallpaper-High-Resolution.jpg" alt="Fashion" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
